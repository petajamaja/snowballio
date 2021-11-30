<template>
  <div v-if="!allInputsCorrect">
    <p>
      To start paying debt off, please make sure all amounts are set correctly!
    </p>
  </div>
  <div v-else-if="!allDebtIsPaidOff" class="payment-actions">
    <div v-if="!monthlyMinimumPaid" class="minimum-payment">
      <p>
        Minimum payment: <span class="number">{{ from100(minimum) }}</span>
      </p>
      <MakeMinimumPaymentButton />
    </div>
    <div v-else>
      <p>This month minimum payments made!</p>
    </div>
    <p>OR</p>
    <div class="extra-payment">
      <input type="number" id="extra-amount" v-model.number="extraPayment" />
      <p v-show="extraPayment <= 0" class="error">Amount must be positive!</p>
      <MakeExtraPaymentButton :extraPayment="extraPayment" />
    </div>
  </div>
  <p v-else>
    "Congratulations! You paid off all your debt! You have
    {{ carryOverMoney }} remaining money!"
  </p>
</template>

<script>
import MakeMinimumPaymentButton from "./MakeMinimumPaymentButton.vue";
import MakeExtraPaymentButton from "./MakeExtraPaymentButton.vue";

export default {
  name: "PaymentActionCall",
  props: [
    "minimum",
    "allDebtIsPaidOff",
    "carryOverMoney",
    "allInputsCorrect",
    "monthlyMinimumPaid"
  ],
  data() {
    return {
      extraPayment: 0
    };
  },
  components: { MakeMinimumPaymentButton, MakeExtraPaymentButton }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.payment-actions {
  padding: 4em;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
