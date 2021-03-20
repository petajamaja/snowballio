<template>
  <main id="main" class="scroll-hide">
    <div id="action-buttons" class="flex-row">
      <AddNewDebtButton @add-item-debt="addItemDebt()" />
    </div>
    <AllDebtsScreen
      :itemDebts="itemDebts"
      @delete-item-debt="deleteItemDebt($event, index)"
      @update-item-debt="updateItemDebt($event, update)"
    />
    <CalculatedTotals
      :totalDebtSum="totalDebtSum"
      :paidOff="totalPaidOff"
      :monthsTillSmallestDebtOut="monthsTillSmallestDebtOutIfNoExtraMoney"
      :monthsTillAllDebtOut="monthsTillAllDebtOutIfNoExtraMoney"
    />
  </main>
</template>

<script>
import AllDebtsScreen from "../debt-related/AllDebtsScreen.vue";
import AddNewDebtButton from "../debt-related/AddNewDebtButton.vue";
import CalculatedTotals from "../debt-related/CalculatedTotals.vue";
import PaymentActionsScreen from "../payment-related/PaymentActionsScreen.vue";

export default {
  name: "MainScreen",
  data() {
    return {
      itemDebts: [
        {
          id: 0,
          description: "Placeholder debt",
          amount: 8000,
          interest: 0,
          installment: 50,
          totalPaid: 0
        }
      ],
      installment: Number,
      monthlyInstallments: [],
      sumToSpendEveryMonth: Number
    };
  },
  methods: {
    deleteItemDebt: function(index) {
      this.itemDebts.splice(index, 1);
    },
    addItemDebt: function() {
      this.itemDebts.push({
        id: this.itemDebts.length,
        description: "New debt",
        amount: 8000,
        interest: 0,
        installment: 50,
        totalPaid: 0
      });
    },
    updateItemDebt: function(update) {
      this.itemDebts[update.index] = update.updatedItem;
    }
  },
  computed: {
    totalMinimumMonthlyPayment: function() {
      return this.itemDebts.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue.installment;
      }, 0);
    },
    totalPaidOff: function() {
      return this.itemDebts.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue.totalPaid;
      }, 0);
    },
    totalDebtSum: function() {
      return this.itemDebts.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue.amount;
      }, 0);
    },
    monthsTillSmallestDebtOutIfNoExtraMoney: function() {
      let smallestDebt = this.itemDebts[0];
      // installment never zero
      return Math.round(smallestDebt.amount / smallestDebt.installment);
    },
    monthsTillAllDebtOutIfNoExtraMoney: function() {
      // totalMinimumMonthlyPayment >= smallestDebt.installment > 0
      return Math.round(this.totalDebtSum / this.totalMinimumMonthlyPayment);
    }
  },
  components: {
    AllDebtsScreen,
    AddNewDebtButton,
    PaymentActionsScreen,
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
