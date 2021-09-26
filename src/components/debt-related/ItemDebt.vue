<template>
  <div id="snowball-item" class="flex-column snowball-item">
    <div class="description-area">
      <h2 v-show="!descriptionEditInputOpen" @click="toggleDescriptionEdit()">
        {{ debtItem.description }}
      </h2>
      <input
        v-show="descriptionEditInputOpen"
        id="name-input"
        class="name-input"
        v-model="debtItem.description"
        @change="toggleDescriptionEdit()"
      />
      <button class="edit-icon" @click="toggleDescriptionEdit()"></button>
    </div>
    <div
      v-if="debtItem.totalPaid !== debtItem.amount || debtItem.amount === 0"
      class="fields"
    >
      <form id="item-debt-fill-form" @change="sendModifiedObjectUp()">
        <label for="amount-input">Total amount</label>
        <input
          type="number"
          id="amount-input"
          class="amount-input"
          v-bind:value="from100(debtItem.amount)"
          v-on:input="setAmount($event)"
        />
        <p v-if="amountIsZeroOrLess" class="error">
          Debt amount must be positive
        </p>
        <label for="installment-input">Montly minimum payment</label>
        <input
          type="number"
          id="installment-input"
          class="installment-input"
          v-bind:value="from100(debtItem.installment)"
          v-on:input="setInstallment($event)"
        />
        <p v-if="installmentIsZeroOrLess && thisIsTheMinimalDebt" class="error">
          First debt payment must be positive!
        </p>
        <p
          v-if="
            (installmentIsEmpty || installmentIsLessThanZero) &&
              !thisIsTheMinimalDebt
          "
          class="error"
        >
          Payment must be zero or more!
        </p>
        <InterestAccordion>
          <form @change="sendModifiedObjectUp()">
            <label for="annual-interest-input">Annual interest:</label>
            <input
              type="number"
              id="annual-interest-input"
              class="annual-interest-input"
              v-model.number="debtItem.annualInterestRate"
            />
            <p v-if="!annualInterestIsWithinLimits" class="error">
              Interest should be between 0 and 99%! 
            </p>
            <label for="fixed-fees-input">Fixed fees: </label>
            <input
              type="number"
              id="fixed-fees-input"
              class="fixed-fees-input"
              v-bind:value="from100(debtItem.fixedMonthlyFees)"
              v-on:input="setFees($event)"
            />
            <label for="due-date-input">Charged on: </label>
            <input
              type="number"
              id="due-date-input"
              class="due-date-input"
              v-model.number="debtItem.monthlyDueDate"
            />
            <p v-if="!dateIsWithinLimits" class="error">
              There are only 28 to 31 days in each month, you know..?
            </p>
          </form>
        </InterestAccordion>
        <div>
          <p>Already paid off:</p>
          <p>{{ debtItem.totalPaid }}</p>
        </div>
        <div v-if="debtItem.annualInterestRate !== 0">
          <p>Total interest paid:</p>
          <p>{{ debtItem.totalInterestPaid }}</p>
        </div>
        <div v-if="debtItem.annualInterestRate !== 0">
          <p>Total fees paid:</p>
          <p>{{ debtItem.totalFeesPaid }}</p>
        </div>
      </form>
    </div>
    <div v-else>
      <p>You paid this debt off completely!</p>
      <p>Total money paid : {{ debtItem.totalPaid }}</p>
    </div>
    <button class="delete" v-if="!debtIsPaidOff" @click="deleteItemDebt()">
      &#10006;
    </button>
  </div>
</template>

<script>
import InterestAccordion from "./InterestAccordion.vue";
import PaymentCalendar from "../payment-related/PaymentCalendar.js";
import utils from "../../utils.js";

export default {
  name: "ItemDebt",
  props: [
    "index",
    "today",
    "itemDebt",
    "thisIsTheMinimalDebt",
    "debtIsPaidOff"
  ],
  data() {
    return {
      debtItem: utils.deepCopy(this.itemDebt),
      descriptionEditInputOpen: false,
      lastInterestChargeDate: null
    };
  },
  created() {
    // if no interest has been charged before, it will remain not identified
    let lastInterestCharged = utils.getFromLocalStorage(
      "lastInterestChargeDateForDebt" + this.debtItem.id
    );
    if (lastInterestCharged !== null) {
      this.lastInterestChargeDate = new Date(lastInterestCharged);
    }
    if (this.shouldChargeInterest(this.today)) {
      this.emitter.emit("charge-interest-for-debt", {
        debtIndex: this.index,
        chargeDate: this.today,
        sum: this.monthlyInterest
      });
    }
  },
  watch: {
    thisIsTheMinimalDebt: function() {
      if (!this.allFieldsPassValidation)
        this.emitter.emit("there-is-error-in-debt", this.debtItem.id);
    }
  },
  methods: {
    ...utils,
    setInstallment(event) {
      this.debtItem.installment = utils.to100(event.target.value);
    },
    setFees(event) {
      this.debtItem.fixedMonthlyFees = utils.to100(event.target.value);
    },
    setAmount(event) {
      this.debtItem.amount = utils.to100(event.target.value);
    },
    sendModifiedObjectUp: function() {
      if (this.allFieldsPassValidation) {
        this.emitter.emit("update-item-debt", {
          index: this.index,
          updatedItem: this.debtItem
        });
        this.emitter.emit("removed-error-in-debt", this.debtItem.id);
      } else {
        this.emitter.emit("there-is-error-in-debt", this.debtItem.id);
      }
    },
    deleteItemDebt: function() {
      this.emitter.emit("delete-item-debt", {
        debtIndex: this.index,
        debtId: this.debtItem.id
      });
    },
    toggleDescriptionEdit: function() {
      this.descriptionEditInputOpen = !this.descriptionEditInputOpen;
    },
    /**
     * Under assumption that the user logs in at least once per month
     */
    shouldChargeInterest: function(today) {
      return (
        (this.lastInterestChargeDate === null ||
          today.getMonth() > this.lastInterestChargeDate.getMonth() ||
          today.getYear() > this.lastInterestChargeDate.getYear()) &&
        today.getDate() >= this.debtItem.monthlyDueDate
      );
    },
    amountPaidByMonth: function(month) {
      if (this.amountIsZeroOrLess) {
        return undefined;
      }
      return this.paymentCalendar.getAmountPaidByMonth(month);
    }
  },
  computed: {
    amountIsZeroOrLess: function() {
      return this.debtItem.amount <= 0;
    },
    amountIsEmpty: function() {
      return this.debtItem.amount === "";
    },
    installmentIsZeroOrLess: function() {
      return this.debtItem.installment <= 0;
    },
    installmentIsEmpty: function() {
      return this.debtItem.installment === "";
    },
    installmentIsLessThanZero: function() {
      return this.debtItem.installment < 0;
    },
    annualInterestIsWithinLimits: function() {
      return ( this.debtItem.annualInterestRate >= 0 && 
               this.debtItem.annualInterestRate < 100 );
    },
    dateIsWithinLimits: function() {
      return ( this.debtItem.monthlyDueDate >= 1 && 
               this.debtItem.monthlyDueDate <= 28 );
    },
    allFieldsPassValidation: function() {
      return (
        !this.amountIsZeroOrLess &&
        !this.amountIsEmpty &&
        !this.installmentIsEmpty &&
        !this.installmentIsLessThanZero &&
        !(this.installmentIsZeroOrLess && this.thisIsTheMinimalDebt) &&
        this.annualInterestIsWithinLimits &&
        this.dateIsWithinLimits
      );
    },
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
      if (this.amountIsZeroOrLess) {
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
      if (this.amountIsZeroOrLess) {
        return {};
      }
      return new PaymentCalendar(this.debtItem);
    }
  },
  components: {
    InterestAccordion
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
}
.name-input {
  background: white;
  border: none;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
.error {
  color: crimson;
  font-weight: bold;
  font-size: 14px;
}
.edit-icon {
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM3ZE-2k1nS_nzIYmVJRY4TuBaUn6o1Nj8Og&usqp=CAU");
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 10px;
}
.active-border {
  position: relative;
  text-align: center;
  width: 110px;
  height: 110px;
  border-radius: 100%;
  background-color: #39b4cc;
  background-image: linear-gradient(91deg, transparent 50%, #a2ecfb 50%),
    linear-gradient(90deg, #a2ecfb 50%, transparent 50%);
}

.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.name,
.amount {
  font-family: "Fredoka One", cursive;
}
input {
  display: flex;
  flex-direction: row;
}

input,
input:focus {
  background-color: white;
  border: 1px solid grey;
  margin-right: 5px;
  border-radius: 10px;
  min-height: 30px;
  font-size: 20px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 10px;
  padding-right: 10px;
  align-content: center;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
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
}
.snowball-item {
  position: relative;
  background-color: white;
  margin: 5px;
  padding: 10px;
  flex: 1;
  max-width: 50%;
  flex-basis: 25%;
}
</style>
