<template>
  <div class="payment-actions">
    <p>
      Total minimum installments to pay monthly:
      {{ totalMinimumMonthlyPayment }}
    </p>
    <p>Extra money to spend monthly:</p>
  </div>
</template>

<script>
export default {
  name: "PaymentActionsScreen",
  props: ["totalMinimumMonthlyPayment"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.payment-actions {
  background-color: white;
}
</style>
