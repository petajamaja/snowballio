<template>
  <div v-if="!allInputsCorrect">
    <p>
      To start paying debt off, please make sure all amounts are set correctly!
    </p>
  </div>
  <div v-else-if="!allDebtIsPaidOff" class="payment-actions">
    <div class="minimum-payment">
      <p>
        Minimum payment: <span class="number">{{ minimum }}</span>
      </p>
      <button @click="$emit('pay-off-all-minimum-amounts')">PAY IT OFF!</button>
    </div>
    <p>OR</p>
    <div class="extra-payment">
      <input id="extra-amount" type="text" />
      <button>MAKE EXTRA PAYMENT</button>
    </div>
  </div>
  <p v-else>
    "Congratulations! You paid off all your debt! You have
    {{ carryOverMoney }} remaining money!"
  </p>
</template>

<script>
export default {
  name: "PaymentActionCall",
  props: ["minimum", "allDebtIsPaidOff", "carryOverMoney", "allInputsCorrect"]
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
