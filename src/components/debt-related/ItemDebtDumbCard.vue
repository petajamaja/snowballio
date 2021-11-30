<template>
  <div class="totals">
    <StatsCircle :amount="amount" :totalPaid="totalPaid" />
    <div>
      <p>{{ totalPaid }} / {{ amount }}</p>
    </div>
    <div>
      <p>{{ installment }} Kč / month</p>
      <p>{{ timeTillPaidOff }} months till paid off</p>
    </div>
  </div>
</template>

<script>
import StatsCircle from "./StatsCircle.vue";

export default {
  name: "ItemDebtMinifiedCard",
  props: [
    "installment",
    "amount",
    "totalPaid",
    "totalInterestPaid",
    "shouldDisplayInterest",
    "totalFeesPaid",
    "description",
    "timeTillPaidOff"
  ],
  components: {
    StatsCircle
  }
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
