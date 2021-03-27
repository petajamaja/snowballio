<template>
  <div v-if="allInputsCorrect" class="calculated-totals">
    <p>Total debt: {{ totalDebtSum }}</p>
    <p>Total paid off: {{ paidOff }}</p>
    <p>Months till smallest debt paid off: {{ monthsTillSmallestDebtOut }}</p>
    <p>Months till all debt paid off: {{ monthsTillAllDebtOut }}</p>
  </div>
  <div v-else>
    <p>
      To see the statistics, please make sure all amounts are set correctly!
    </p>
  </div>
</template>

<script>
export default {
  name: "CalculatedTotals",
  props: [
    "totalDebtSum",
    "paidOff",
    "monthsTillSmallestDebtOut",
    "monthsTillAllDebtOut",
    "allInputsCorrect"
  ]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calculated-totals {
  background-color: white;
}
</style>
