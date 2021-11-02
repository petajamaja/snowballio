<template>
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
      First debt payment must be positive
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
      {{ from100(minimumInstallment) }}
    </p>
    <p
      v-if="
        (installmentIsEmpty || installmentIsLessThanZero) &&
          !thisIsTheMinimalDebt
      "
      class="error"
    >
      Payment must be zero or more
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
        Interest should be between 0 and 99%
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
        Date can't be more than 28
      </p>
    </form>
  </InterestAccordion>
</template>

<script>
import utils from "../../utils.js";
import InterestAccordion from "./InterestAccordion.vue";

export default {
  name: "ItemDebtFullCard",
  props: ["index", "itemDebt", "thisIsTheMinimalDebt", "minimumInstallment"],
  components: {
    InterestAccordion
  },
  data() {
    return {
      debtItem: this.itemDebt
    };
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
    }
  },
  computed: {
    /**
     * Forms validation conditions
     */
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
