<template>
  <div class="totals">
    <div>
      <p>{{ totalPaid }} / {{ amount }}</p>
      <p>{{ installment }} Kč / month</p>
      <p v-if="shouldDisplayInterest">Interest this month : {{ interest }}</p>
      <p v-if="shouldDisplayInterest">
        Total interest paid : {{ totalInterestPaid }}
      </p>
      <p v-if="shouldDisplayInterest">Total fees paid : {{ totalFeesPaid }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemDebtMinifiedCard",
  props: [
    "installment",
    "amount",
    "totalPaid",
    "totalInterestPaid",
    "interest",
    "shouldDisplayInterest",
    "totalFeesPaid",
    "description",
    "timeTillPaidOff"
  ]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.totals {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.numbers {
  text-align: left;
  margin: 0 auto;
}
</style>
