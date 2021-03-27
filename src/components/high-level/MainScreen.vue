<template>
  <main id="main" class="scroll-hide">
    <div id="action-buttons" class="flex-row">
      <PaymentActionCall
        :minimum="totalMinimumMonthlyPayment"
        :carryOverMoney="remainingMoneyToCarryOver"
        :allInputsCorrect="allInputsCorrect"
        :allDebtIsPaidOff="allDebtIsPaidOff"
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
      monthlyInstallments: [],
      sumToSpendEveryMonth: Number,
      remainingMoneyToCarryOver: 0,
      validationErrors: []
    };
  },
  mounted() {
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
    payOffDebtAtIndex: function(debt, debtIndex) {
      this.remainingMoneyToCarryOver += debt.totalPaid - debt.amount;
      debt.totalPaid = debt.amount;
      let debtIsNotTheLastOne = this.activeDebts.length !== debtIndex + 1;
      if (debtIsNotTheLastOne) {
        this.activeDebts[
          debtIndex + 1
        ].totalPaid += this.remainingMoneyToCarryOver;
      } else {
        this.isAllDebtPaidOff = true;
      }
      this.paidOffDebts.push(this.activeDebts[debtIndex]);
      this.deleteItemDebt(debtIndex);
    },
    payOffMinimumDebtInstallment: function(debt, debtIndex) {
      debt.totalPaid += debt.installment;
      if (debt.totalPaid >= debt.amount) {
        this.payOffDebtAtIndex(debt, debtIndex);
      }
    },
    payOffMinimumMonthlyInstallments: function() {
      this.activeDebts.forEach(this.payOffMinimumDebtInstallment, this);
    },
    removeValidationErrors: function(debtId) {
      let index = this.validationErrors.indexOf(debtId);
      if (index !== -1) this.validationErrors.splice(index, 1);
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
