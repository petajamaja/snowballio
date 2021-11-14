<template>
  <div id="snowball-item" class="flex-column snowball-item">
    <div class="description-area">
      <h3>
        {{ debtItem.description }}
      </h3>
    </div>
    <div
      v-if="debtItem.totalPaid !== debtItem.amount || debtItem.amount === 0"
      class="fields"
    >
      <ItemDebtDumbCard
        v-if="minifiedVersionOpen"
        :installment="from100(debtItem.installment)"
        :amount="from100(debtItem.amount)"
        :totalInterestPaid="from100(debtItem.totalInterestPaid)"
        :totalPaid="from100(debtItem.totalPaid)"
        :totalFeesPaid="from100(debtItem.totalFeesPaid)"
        :timeTillPaidOff="timeTillPaidOff"
        :shouldDisplayInterest="debtItem.annualInterestRate !== 0"
      >
      </ItemDebtDumbCard>
      <ItemDebtSmartCard
        v-if="!minifiedVersionOpen"
        :index="index"
        :itemDebt="debtItem"
        :thisIsTheMinimalDebt="thisIsTheMinimalDebt"
        :minimumInstallment="minimumInstallment"
      >
      </ItemDebtSmartCard>
      <button class="delete" v-if="!debtIsPaidOff" @click="deleteItemDebt()">
        &#10006;
      </button>
    </div>
    <div v-else>
      <p>You paid this debt off completely!</p>
      <p>
        Total money paid :
        {{
          from100(
            debtItem.totalPaid +
              debtItem.totalFeesPaid +
              debtItem.totalInterestPaid
          )
        }}
      </p>
    </div>
  </div>
</template>

<script>
import PaymentCalendar from "../payment-related/PaymentCalendar.js";
import ItemDebtDumbCard from "./ItemDebtDumbCard.vue";
import ItemDebtSmartCard from "./ItemDebtSmartCard.vue";
import utils from "../../utils.js";

export default {
  name: "ItemDebt",
  props: [
    "index",
    "today",
    "itemDebt",
    "thisIsTheMinimalDebt",
    "debtIsPaidOff",
    "minimumInstallment"
  ],
  data() {
    return {
      debtItem: utils.deepCopy(this.itemDebt),
      lastInterestChargeDate: null,
      minifiedVersionOpen: true
    };
  },
  created() {
    this.readLastInterestChargeDate();
    this.chargeInterestIfApplicable();
  },
  methods: {
    ...utils,
    deleteItemDebt: function() {
      this.emitter.emit("delete-item-debt", {
        debtIndex: this.index,
        debtId: this.debtItem.id
      });
    },
    /**
     * Under assumption that the user logs in at least once per month
     */
    shouldChargeInterest: function(today) {
      // we don't charge interest for interest-free debts
      if (this.debtItem.annualInterestRate === 0) return false;
      return (
        (this.lastInterestChargeDate === null ||
          today.getMonth() > this.lastInterestChargeDate.getMonth() ||
          today.getYear() > this.lastInterestChargeDate.getYear()) &&
        today.getDate() >= this.debtItem.monthlyDueDate
      );
    },
    chargeInterestIfApplicable: function() {
      if (this.shouldChargeInterest(this.today)) {
        this.emitter.emit("charge-interest-for-debt", {
          debtIndex: this.index,
          chargeDate: new Date(
            this.today.getFullYear(),
            this.today.getMonth(),
            this.debtItem.monthlyDueDate,
            0,
            0
          ),
          sum: this.monthlyInterest
        });
      }
    },
    amountPaidByMonth: function(month) {
      if (this.amountIsZeroOrLess) {
        return undefined;
      }
      return this.paymentCalendar.getAmountPaidByMonth(month);
    },
    readLastInterestChargeDate() {
      if (this.debtItem.annualInterestRate !== 0) {
        let lastInterestChargedDates = JSON.parse(
          utils.getFromLocalStorage("lastInterestChargeDates")
        );
        if (lastInterestChargedDates !== null) {
          let lastInterestCharged =
            lastInterestChargedDates[this.debtItem.id] || null;
          if (lastInterestCharged !== null) {
            this.lastInterestChargeDate = new Date(lastInterestCharged);
          }
        }
      }
    }
  },
  computed: {
    monthlyInterestRate: function() {
      let toBeRounded = this.debtItem.annualInterestRate / 100 / 12;
      return Math.round((toBeRounded + Number.EPSILON) * 1000) / 1000;
    },
    /**
     * Actual amount remaining to be paid + the next fee
     */
    balance: function() {
      return (
        this.debtItem.amount -
        this.debtItem.totalPaid +
        this.debtItem.totalInterestPaid +
        this.debtItem.totalFeesPaid
      );
    },
    /**
     * Calculated strictly based on the monthly balance
     */
    monthlyInterest: function() {
      return this.monthlyInterestRate * this.balance;
    },
    timeTillPaidOff: function() {
      if (this.debtItem.amount <= 0) {
        return undefined;
      }
      return this.paymentCalendar.getRemainingTime();
    },
    /**
     * Generates a payment calendar for loans with interest.
     * Only takes into account the remaining months, what's paid
     * is already paid!
     */
    paymentCalendar: function() {
      if (this.debtItem.amount <= 0) {
        return {};
      }
      return new PaymentCalendar(this.debtItem);
    }
  },
  components: {
    ItemDebtDumbCard,
    ItemDebtSmartCard
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.description-area {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #4f68c2;
}

button {
  background-color: #798595;
  color: #ffe0cb;
}
.delete {
  position: absolute;
  right: 20px;
  top: 20px;
  color: #ffe0cb;
  border: none;
}
.fields {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.snowball-item {
  position: relative;
  background-color: white;
  margin: 5px;
  padding: 10px;
  flex: 1;
  max-width: 50%;
  flex-basis: 25%;
  border-radius: 20px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}
</style>
