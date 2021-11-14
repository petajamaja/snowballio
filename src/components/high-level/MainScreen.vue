<template>
  <main id="main" class="scroll-hide">
    <div id="action-buttons" class="flex-row">
      <PaymentActionCall
        :minimum="totalMinimumMonthlyPayment"
        :carryOverMoney="remainingMoneyToCarryOver"
        :allInputsCorrect="allInputsCorrect"
        :allDebtIsPaidOff="allDebtIsPaidOff"
        :monthlyMinimumPaid="monthlyMinimumPaid"
      />
      <AddNewDebtButton />
      <DownloadUploadButtons />
    </div>
    <AllDebtsScreen
      :itemDebts="activeDebts"
      :today="today"
      :key="updateAllDebtsScreenKey"
      :paidOffDebts="paidOffDebts"
      :installmentAbsoluteMinimum="minimumInstallmentCanNotGetSmallerThanThis"
    />
    <CalculatedTotals
      :totalDebtSum="totalDebtSum"
      :paidOff="totalPaidOff"
      :monthsTillSmallestDebtOut="monthsTillSmallestDebtOutIfNoExtraMoney"
      :monthsTillAllDebtOut="monthsTillAllDebtOutIfNoExtraMoney"
      :allInputsCorrect="allInputsCorrect"
    />
  </main>
</template>

<script>
import DownloadUploadButtons from "./DownloadUploadButtons.vue";
import AllDebtsScreen from "../debt-related/AllDebtsScreen.vue";
import AddNewDebtButton from "../debt-related/AddNewDebtButton.vue";
import CalculatedTotals from "../debt-related/CalculatedTotals.vue";
import PaymentActionCall from "../payment-related/PaymentActionCall.vue";
import PaymentCalendar from "../payment-related/PaymentCalendar.js";
import SnowballState from "./state.js";
import utils from "../../utils.js";

export default {
  name: "MainScreen",
  data() {
    return {
      activeDebts: [],
      paidOffDebts: [],
      today: null,
      paymentHistory: [],
      monthlyMinimumPaid: false,
      lastMinimumPaymentDate: null,
      remainingMoneyToCarryOver: 0,
      validationErrors: [],
      minimumInstallmentCanNotGetSmallerThanThis: 0,
      updateAllDebtsScreenKey: 0,
      globalIdCounter: 0,
      state: null
    };
  },
  created() {
    this.today = new Date();
    this.state = new SnowballState();
    this.lastMinimumPaymentDate = this.state.lastMinPaymentDate;
    // reset ability to make minimum payments if a new month has started
    this.monthlyMinimumPaid = this.minimumPaymentDoneThisMonth(this.today);
    this.paidOffDebts = this.loadPaidOffDebts();
    this.activeDebts = this.loadActiveDebts();
    this.minimumInstallmentCanNotGetSmallerThanThis = this.state.minimumInstallmentCanNotGetSmallerThanThis;
    this.globalIdCounter = this.state.globalIdCounter;

    this.emitter.on("there-is-error-in-debt", errenousDebtId => {
      let index = this.validationErrors.indexOf(errenousDebtId);
      if (index === -1) this.validationErrors.push(errenousDebtId);
    });
    this.emitter.on("removed-error-in-debt", debtId => {
      this.removeValidationErrors(debtId);
    });
    this.emitter.on("pay-off-all-minimum-amounts", () => {
      this.payOffMinimumMonthlyInstallments();
    });
    this.emitter.on("make-extra-payment", amount => {
      this.makeExtraPayment(amount);
    });
    this.emitter.on(
      "charge-interest-for-debt",
      ({ debtIndex, chargeDate, sum }) => {
        this.chargeInterestForDebt(debtIndex, chargeDate, sum);
      }
    );
    this.emitter.on("add-item-debt", () => {
      this.addItemDebt();
    });
    this.emitter.on("delete-item-debt", ({ debtIndex, debtId }) => {
      this.deleteItemDebt(debtIndex, debtId);
    });
    this.emitter.on("update-item-debt", update => {
      this.updateItemDebt(update);
    });
    this.emitter.on("save-state-to-local-machine", () => {
      this.state.export();
    });
    this.emitter.on("upload-state-from-local-machine", input => {
      this.state.import(
        input,
        this.updateValuesFromState,
        this.forceUpdateDebtScreen
      );
    });
  },
  methods: {
    loadActiveDebts: function() {
      let debts = this.state.activeDebts;
      if (debts !== null) return JSON.parse(debts);
      if (this.paidOffDebts.length === 0) return [];
    },
    loadPaidOffDebts: function() {
      let paidOffDebts = this.state.paidOffDebts;
      return paidOffDebts === null ? [] : JSON.parse(paidOffDebts);
    },
    saveActiveDebtsToLocalStorage: function() {
      this.state.activeDebts = this.activeDebts;
    },
    savePaidOffDebtsToLocalStorage: function() {
      this.state.paidOffDebts = this.paidOffDebts;
    },
    sortDebtsBasedOnAmount: function(debtA, debtB) {
      return debtA.amount - debtB.amount;
    },
    deleteItemDebt: function(debtIndex, debtId) {
      this.removeValidationErrors(debtId);
      if (this.activeDebts[debtIndex].totalPaid !== 0) {
        this.removeAllRelatedPaymentHistoryForDebt(debtId);
        this.remainingMoneyToCarryOver += this.activeDebts[debtIndex].totalPaid;
      }
      if (this.activeDebts[debtIndex].annualInterestRate !== 0) {
        this.removeAllRelatedInterestChargeDatesForDebt(debtId);
      }
      this.activeDebts.splice(debtIndex, 1);
      this.saveActiveDebtsToLocalStorage();
    },
    addItemDebt: function() {
      this.activeDebts.push({
        id: this.globalIdCounter,
        description: "New debt",
        amount: utils.to100(8000),
        annualInterestRate: 0,
        installment: utils.to100(500),
        monthlyDueDate: 26,
        fixedMonthlyFees: 0,
        totalPaid: 0,
        totalFeesPaid: 0,
        totalInterestPaid: 0
      });
      this.globalIdCounter += 1;
      this.state.globalIdCounter = this.globalIdCounter;
      this.activeDebts.sort(this.sortDebtsBasedOnAmount);
      this.saveActiveDebtsToLocalStorage();
    },
    updateItemDebt: function(update) {
      this.activeDebts[update.index] = utils.deepCopy(update.updatedItem);
      this.activeDebts.sort(this.sortDebtsBasedOnAmount);
      this.saveActiveDebtsToLocalStorage();
      this.forceUpdateDebtScreen();
    },
    payOffDebtAtIndex: function(debtIndex) {
      let debtPaidOff = this.activeDebts[debtIndex];
      this.remainingMoneyToCarryOver +=
        debtPaidOff.totalPaid - debtPaidOff.amount;
      debtPaidOff.totalPaid = debtPaidOff.amount;
      this.paidOffDebts.push(debtPaidOff);
      this.activeDebts.splice(debtIndex, 1);
      let debtIsNotTheLastOne = this.activeDebts.length > 0;
      if (debtIsNotTheLastOne) {
        this.reallocateCarryOverMoneyToFirstDebt();
        this.increaseNextDebtMinPaymentBy(debtPaidOff.installment);
      }
      this.saveActiveDebtsToLocalStorage();
      this.savePaidOffDebtsToLocalStorage();
    },
    makePaymentOfType: function(type, amount) {
      let firstDebt = this.activeDebts[0];
      firstDebt.totalPaid += amount;
      this.saveToPaymentHistory(amount, firstDebt.id, type);
      this.remainingMoneyToCarryOver = 0;
      if (firstDebt.totalPaid >= firstDebt.amount) {
        this.payOffDebtAtIndex(0);
      }
      this.saveActiveDebtsToLocalStorage();
    },
    reallocateCarryOverMoneyToFirstDebt: function() {
      this.makePaymentOfType("carry", this.remainingMoneyToCarryOver);
    },
    increaseNextDebtMinPaymentBy: function(sum) {
      this.activeDebts[0].installment += sum;
      this.minimumInstallmentCanNotGetSmallerThanThis = this.activeDebts[0].installment;
      this.state.minimumInstallmentCanNotGetSmallerThanThis = this.minimumInstallmentCanNotGetSmallerThanThis;
      this.forceUpdateDebtScreen();
    },
    makeExtraPayment: function(amount) {
      this.makePaymentOfType("extra", amount);
    },
    payOffMinimumDebtInstallment: function(debt, debtIndex) {
      debt.totalPaid += debt.installment;
      this.saveToPaymentHistory(debt.installment, debt.id, "minimum");
      if (debt.totalPaid >= debt.amount) {
        this.payOffDebtAtIndex(debtIndex);
      }
    },
    payOffMinimumMonthlyInstallments: function() {
      this.activeDebts.forEach(this.payOffMinimumDebtInstallment, this);
      this.lastMinimumPaymentDate = new Date();
      this.monthlyMinimumPaid = true;
      this.state.lastMinPaymentDate = this.lastMinimumPaymentDate;
      this.saveActiveDebtsToLocalStorage();
    },
    minimumPaymentDoneThisMonth: function(currentDate) {
      if (this.lastMinimumPaymentDate === null) return false;
      let currentMonth = currentDate.getMonth();
      let currentYear = currentDate.getFullYear();
      return (
        currentYear === this.lastMinimumPaymentDate.getFullYear() &&
        currentMonth === this.lastMinimumPaymentDate.getMonth()
      );
    },
    chargeInterestForDebt: function(debtIndex, chargeDate, sum) {
      let debt = this.activeDebts[debtIndex];
      debt.totalInterestPaid += sum;
      debt.totalFeesPaid += debt.fixedMonthlyFees;
      let lastInterestChargeDates = this.state.lastInterestChargeDates || {};
      lastInterestChargeDates[debt.id.toString()] = chargeDate;
      this.state.lastInterestChargeDates = lastInterestChargeDates;
      this.saveActiveDebtsToLocalStorage();
      this.forceUpdateDebtScreen();
    },
    saveToPaymentHistory: function(amount, debtId, type) {
      // this is when there is no interest
      if (type === "interest" && amount === 0) return;
      let currentMonth = this.today.getMonth();
      let currentYear = this.today.getFullYear();
      let paymentHistoryThisYear = this.paymentHistory.find(
        yearPayments => yearPayments.year === currentYear
      );
      if (
        paymentHistoryThisYear !== undefined &&
        paymentHistoryThisYear !== null
      ) {
        let paymentHistoryThisMonth = paymentHistoryThisYear.paymentsMonthly.find(
          monthPayments => monthPayments.month === currentMonth
        );
        if (
          paymentHistoryThisMonth !== undefined &&
          paymentHistoryThisYear !== null
        ) {
          // just add the payment to an existing month
          paymentHistoryThisMonth.payments.push({
            debtId: debtId,
            amount: amount,
            type: type
          });
        } else {
          // add the month to an existing year
          paymentHistoryThisYear.paymentsMonthly.push({
            month: currentMonth,
            payments: [
              {
                debtId: debtId,
                amount: amount,
                type: type
              }
            ]
          });
        }
      } else {
        // add the year to history
        this.paymentHistory.push({
          year: currentYear,
          paymentsMonthly: [
            {
              month: currentMonth,
              payments: [
                {
                  debtId: debtId,
                  amount: amount,
                  type: type
                }
              ]
            }
          ]
        });
      }
      this.state.paymentHistory = this.paymentHistory;
    },
    removeAllRelatedPaymentHistoryForDebt: function(debtId) {
      this.paymentHistory = this.paymentHistory.filter(year => {
        year.paymentsMonthly = year.paymentsMonthly.filter(month => {
          month.payments = month.payments.filter(
            payment => payment.debtId !== debtId
          );
          return month.payments.length !== 0;
        });
        return year.paymentsMonthly.length !== 0;
      });
      this.state.paymentHistory = this.paymentHistory;
    },
    removeAllRelatedInterestChargeDatesForDebt: function(debtId) {
      let dates = this.state.lastInterestChargeDates;
      if (dates !== null) {
        delete dates[debtId];
        this.state.lastInterestChargeDates = dates;
      }
    },
    removeValidationErrors: function(debtId) {
      let index = this.validationErrors.indexOf(debtId);
      if (index !== -1) this.validationErrors.splice(index, 1);
    },
    forceUpdateDebtScreen() {
      this.updateAllDebtsScreenKey += 1;
    },
    updateValuesFromState() {
      this.activeDebts = utils.deepCopy(this.state.activeDebts);
      this.paidOffDebts = utils.deepCopy(this.state.paidOffDebts);
      this.paymentHistory = utils.deepCopy(this.state.paymentHistory);
      this.minimumInstallmentCanNotGetSmallerThanThis = this.state.minimumInstallmentCanNotGetSmallerThanThis;
      this.lastMinimumPaymentDate = this.state.lastMinPaymentDate;
      this.globalIdCounter = this.state.globalIdCounter;
    }
  },
  computed: {
    totalMinimumMonthlyPayment: function() {
      if (this.allDebtsAreDeletedOrPaidOff || this.validationErrors.length)
        return 0;
      return this.activeDebts.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue.installment;
      }, 0);
    },
    totalPaidOff: function() {
      let debts = this.allDebtIsPaidOff
        ? this.paidOffDebts
        : this.activeDebts
            .concat(this.paidOffDebts)
            .filter(item => item !== null);
      return debts.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue.totalPaid;
      }, 0);
    },
    totalDebtSum: function() {
      if (this.allDebtsAreDeletedOrPaidOff || this.validationErrors.length)
        return 0;
      return this.activeDebts.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue.amount - currentValue.totalPaid;
      }, 0);
    },
    monthsTillSmallestDebtOutIfNoExtraMoney: function() {
      if (this.allDebtsAreDeletedOrPaidOff || this.validationErrors.length)
        return 0;
      let smallestDebt = this.activeDebts[0];
      // installment never zero, errors handled above
      return Math.ceil(
        (smallestDebt.amount - smallestDebt.totalPaid) /
          smallestDebt.installment
      );
    },
    monthsTillAllDebtOutIfNoExtraMoney: function() {
      if (
        this.allDebtsAreDeletedOrPaidOff ||
        this.totalMinimumMonthlyPayment <= 0
      )
        return 0;
      let debtsCopy = utils.deepCopy(this.activeDebts);
      let totalTime = 0;
      for (let index = 0; index < debtsCopy.length; index++) {
        let debt = debtsCopy[index];
        let initialInstallment = debt.installment;
        let paymentPlan = new PaymentCalendar(debt);
        // only add time if there are actual installments to be made!
        if (!paymentPlan.hasOnlyCarryOver()) {
          totalTime += paymentPlan.getRemainingTime();
        }
        if (index != debtsCopy.length - 1) {
          let nextDebt = debtsCopy[index + 1];
          let nextDebtPaymentPlan = new PaymentCalendar(nextDebt);
          nextDebt.totalPaid += nextDebtPaymentPlan.getAmountPaidByMonth(
            totalTime
          );
          nextDebt.totalPaid += paymentPlan.getCarryOver();
          nextDebt.installment += initialInstallment;
        }
      }
      return totalTime;
    },
    allDebtIsPaidOff: function() {
      return this.activeDebts.length === 0 && this.paidOffDebts.length > 0;
    },
    allDebtsAreDeletedOrPaidOff: function() {
      return this.activeDebts.length === 0;
    },
    allInputsCorrect: function() {
      return (
        this.allDebtsAreDeletedOrPaidOff || this.validationErrors.length == 0
      );
    }
  },
  components: {
    AllDebtsScreen,
    AddNewDebtButton,
    PaymentActionCall,
    CalculatedTotals,
    DownloadUploadButtons
  }
};
</script>
<style>
#main {
  flex: auto;
  padding-top: 40px;
  padding-bottom: 40px;
  width: 90%;
  margin: 0 auto;
}

.scroll-hide {
  padding-left: 16px;
  overflow: auto;
  /* this will hide the scrollbar in mozilla based browsers */
  overflow: -moz-scrollbars-none;
  /* this will hide the scrollbar in internet explorers */
  -ms-overflow-style: none;
}

/* this will hide the scrollbar in webkit based browsers - safari, chrome, etc */
.scroll-hide::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}

@media only screen and (max-width: 600px) {
  #main {
    width: 100%;
  }
}
</style>
