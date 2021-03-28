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
    </div>
    <AllDebtsScreen :itemDebts="activeDebts" :paidOffDebts="paidOffDebts" />
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
import AllDebtsScreen from "../debt-related/AllDebtsScreen.vue";
import AddNewDebtButton from "../debt-related/AddNewDebtButton.vue";
import CalculatedTotals from "../debt-related/CalculatedTotals.vue";
import PaymentActionCall from "../payment-related/PaymentActionCall.vue";

export default {
  name: "MainScreen",
  data() {
    return {
      activeDebts: [
        {
          id: 0,
          description: "Placeholder debt",
          amount: 8000,
          interest: 0,
          installment: 5000,
          totalPaid: 0
        }
      ],
      paidOffDebts: [],
      installment: Number,
      paymentHistory: [],
      monthlyMinimumPaid: false,
      lastMinimumPaymentDate: Date,
      sumToSpendEveryMonth: Number,
      remainingMoneyToCarryOver: 0,
      validationErrors: []
    };
  },
  mounted() {
    this.lastMinimumPaymentDate = this.getLastMinimumPaymentDateFromLocalStorage();
    // reset ability to make minimum payments if a new month has started
    this.monthlyMinimumPaid = this.minimumPaymentDoneThisMonth(new Date());

    this.emitter.on("there-is-error-in-debt", errenousDebtId => {
      this.validationErrors.push(errenousDebtId);
    });
    this.emitter.on("removed-error-in-debt", debtId => {
      this.removeValidationErrors(debtId);
    });
    this.emitter.on("pay-off-all-minimum-amounts", () => {
      this.payOffMinimumMonthlyInstallments();
    });
    this.emitter.on("add-item-debt", () => {
      this.addItemDebt();
    });
    this.emitter.on("delete-item-debt", ({ debtIndex, debtId }) => {
      this.deleteItemDebt(debtIndex, debtId);
    });
    this.emitter.on("update-item-debt", update => {
      this.updateItemDebt(update);
    });
  },
  methods: {
    sortDebtsBasedOnAmount: function(debtA, debtB) {
      return debtA.amount - debtB.amount;
    },
    deleteItemDebt: function(debtIndex, debtId) {
      this.removeValidationErrors(debtId);
      if (this.activeDebts[debtIndex].totalPaid !== 0) {
        this.removeAllRelatedPaymentHistoryForDebt(debtId);
        this.remainingMoneyToCarryOver += this.activeDebts[debtIndex].totalPaid;
      }
      this.activeDebts.splice(debtIndex, 1);
    },
    addItemDebt: function() {
      this.activeDebts.push({
        id: this.activeDebts.length,
        description: "New debt",
        amount: 8000,
        interest: 0,
        installment: 5000,
        totalPaid: 0
      });
      this.activeDebts.sort(this.sortDebtsBasedOnAmount);
    },
    updateItemDebt: function(update) {
      this.activeDebts[update.index] = update.updatedItem;
      this.activeDebts.sort(this.sortDebtsBasedOnAmount);
    },
    payOffDebtAtIndex: function(debtIndex) {
      let debtPaidOff = this.activeDebts[debtIndex];
      this.remainingMoneyToCarryOver +=
        debtPaidOff.totalPaid - debtPaidOff.amount;
      debtPaidOff.totalPaid = debtPaidOff.amount;
      this.paidOffDebts.push(debtPaidOff);
      this.deleteItemDebt(debtIndex);
      let debtIsNotTheLastOne = this.activeDebts.length > 0;
      if (debtIsNotTheLastOne) {
        this.reallocateCarryOverMoneyToFirstDebt();
      }
    },
    reallocateCarryOverMoneyToFirstDebt: function() {
      let firstDebt = this.activeDebts[0];
      firstDebt.totalPaid += this.remainingMoneyToCarryOver;
      this.saveToPaymentHistory(
        this.remainingMoneyToCarryOver,
        firstDebt.id,
        "carry"
      );
      this.remainingMoneyToCarryOver = 0;
      if (firstDebt.totalPaid >= firstDebt.amount) {
        this.payOffDebtAtIndex(0);
      }
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
      localStorage.setItem("lastMinPaymentDate", this.lastMinimumPaymentDate);
    },
    minimumPaymentDoneThisMonth: function(currentDate) {
      if (!this.lastMinimumPaymentDate) return true;
      let currentMonth = currentDate.getMonth();
      let currentYear = currentDate.getFullYear();
      return (
        currentYear === this.lastMinimumPaymentDate.getFullYear() &&
        currentMonth === this.lastMinimumPaymentDate.getMonth()
      );
    },
    saveToPaymentHistory: function(amount, debtId, type) {
      let today = new Date();
      let currentMonth = today.getMonth();
      let currentYear = today.getFullYear();
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
    },
    removeValidationErrors: function(debtId) {
      let index = this.validationErrors.indexOf(debtId);
      if (index !== -1) this.validationErrors.splice(index, 1);
    },
    getLastMinimumPaymentDateFromLocalStorage: function() {
      return new Date(localStorage.getItem("lastMinPaymentDate"));
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
        : this.activeDebts.concat(this.paidOffDebts);
      return debts.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue.totalPaid;
      }, 0);
    },
    totalDebtSum: function() {
      if (this.allDebtsAreDeletedOrPaidOff || this.validationErrors.length)
        return 0;
      return this.activeDebts.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue.amount;
      }, 0);
    },
    monthsTillSmallestDebtOutIfNoExtraMoney: function() {
      if (this.allDebtsAreDeletedOrPaidOff || this.validationErrors.length)
        return 0;
      let smallestDebt = this.activeDebts[0];
      // installment never zero, errors handled above
      return Math.round(smallestDebt.amount / smallestDebt.installment);
    },
    monthsTillAllDebtOutIfNoExtraMoney: function() {
      if (
        this.allDebtsAreDeletedOrPaidOff ||
        this.totalMinimumMonthlyPayment <= 0
      )
        return 0;
      // totalMinimumMonthlyPayment >= smallestDebt.installment > 0
      return Math.round(this.totalDebtSum / this.totalMinimumMonthlyPayment);
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
    CalculatedTotals
  }
};
</script>
<style>
#main {
  flex: auto;
  padding-top: 40px;
  padding-bottom: 40px;
  width: 60%;
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
