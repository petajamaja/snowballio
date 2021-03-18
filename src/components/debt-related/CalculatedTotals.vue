<template>
  <div class="calculated-totals">
    <p>Total debt: {{ totalDebtSum }}</p>
    <p>Months till smallest debt paid off:</p>
  </div>
</template>

<script>
export default {
  name: "CalculatedTotals",
  props: ["totalDebtSum"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calculated-totals {
  background-color: white;
}
</style>
