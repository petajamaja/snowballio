<template>
  <div class="calculated-totals">
    <p>Total debt: {{ totalDebtSum }}</p>
    <p>Total paid off: {{ paidOff }}</p>
    <p>Months till smallest debt paid off: {{ monthsTillSmallestDebtOut }}</p>
    <p>Months till all debt paid off: {{ monthsTillAllDebtOut }}</p>
  </div>
</template>

<script>
export default {
  name: "CalculatedTotals",
  props: [
    "totalDebtSum",
    "paidOff",
    "monthsTillSmallestDebtOut",
    "monthsTillAllDebtOut"
  ]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calculated-totals {
  background-color: white;
}
</style>
