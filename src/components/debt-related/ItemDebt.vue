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
            !installmentMoreThanMinimum &&
              thisIsTheMinimalDebt &&
              !installmentIsZeroOrLess
          "
          class="error"
        >
          First debt payment can't be less than
          {{ from100(minimumInstallment) }}!
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
      </form>
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
      <div class="totals">
        <div class="snowball-percentage">
          <div class="circle-outer">
            <div class="circle-inner">
              <div class="percentage-num">{{ percentagePaidOff }}%</div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="160px"
            height="160px"
          >
            <defs>
              <linearGradient id="gradient">
                <stop offset="0%" stop-color="#00FFE5" />
                <stop offset="100%" stop-color="#673ab7" />
              </linearGradient>
            </defs>
            <circle cx="80" cy="80" r="70" stroke-linecap="round" />
          </svg>
        </div>
        <div>
          <p>Already paid off:</p>
          <p>{{ from100(debtItem.totalPaid) }}</p>
        </div>
        <div v-if="debtItem.annualInterestRate !== 0">
          <p>Total interest paid:</p>
          <p>{{ from100(debtItem.totalInterestPaid) }}</p>
        </div>
        <div v-if="debtItem.annualInterestRate !== 0">
          <p>Total fees paid:</p>
          <p>{{ from100(debtItem.totalFeesPaid) }}</p>
        </div>
      </div>
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
    "debtIsPaidOff",
    "minimumInstallment"
  ],
  data() {
    return {
      debtItem: utils.deepCopy(this.itemDebt),
      descriptionEditInputOpen: false,
      lastInterestChargeDate: null
    };
  },
  created() {
    this.readLastInterestChargeDate();
    this.chargeInterestIfApplicable();
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
      if (!this.descriptionEditInputOpen) this.sendModifiedObjectUp();
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
    amountIsZeroOrLess: function() {
      return this.debtItem.amount <= 0;
    },
    amountIsEmpty: function() {
      return this.debtItem.amount === "";
    },
    installmentIsZeroOrLess: function() {
      return this.debtItem.installment <= 0;
    },
    installmentMoreThanMinimum: function() {
      if (!this.thisIsTheMinimalDebt) return true;
      return this.debtItem.installment >= this.minimumInstallment;
    },
    installmentIsEmpty: function() {
      return this.debtItem.installment === "";
    },
    installmentIsLessThanZero: function() {
      return this.debtItem.installment < 0;
    },
    annualInterestIsWithinLimits: function() {
      return (
        this.debtItem.annualInterestRate >= 0 &&
        this.debtItem.annualInterestRate < 100
      );
    },
    dateIsWithinLimits: function() {
      return (
        this.debtItem.monthlyDueDate >= 1 && this.debtItem.monthlyDueDate <= 28
      );
    },
    allFieldsPassValidation: function() {
      return (
        !this.amountIsZeroOrLess &&
        !this.amountIsEmpty &&
        !this.installmentIsEmpty &&
        !this.installmentIsLessThanZero &&
        this.installmentMoreThanMinimum &&
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
    },
    ratioPaidOff: function() {
      return this.debtItem.totalPaid / this.debtItem.amount;
    },
    percentagePaidOff: function() {
      return this.ratioPaidOff * 100;
    },
    dashOffset: function() {
      return 472 - 472 * this.ratioPaidOff;
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
}
.snowball-percentage {
  position: relative;
  color: coral;
}
.circle-outer {
  padding: 20px;
  border-radius: 50%;
  box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15),
    -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
}
.circle-inner {
  height: 120px;
  width: 120px;
  border-radius: 50%;
  box-shadow: inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
    inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
    0.5px 0.5px 0 rgba(0, 0, 0, 0.15), inset 0 8px 10px -10px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

circle {
  fill: none;
  stroke: url(#gradient);
  stroke-width: 20px;
  stroke-dasharray: 472;
  stroke-dashoffset: 472;
  animation: percentage-animation 2s linear forwards;
}

svg {
  position: absolute;
  top: 0;
  left: 0;
}

@keyframes percentage-animation {
  100% {
    stroke-dashoffset: v-bind(dashOffset);
  }
}
</style>
