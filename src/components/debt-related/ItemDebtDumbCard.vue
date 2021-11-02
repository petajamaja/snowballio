<template>
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
      <p>{{ totalPaid }} / {{ amount }}</p>
    </div>
    <div>
      <p>{{ installment }} Kč / month</p>
      <p>{{ timeTillPaidOff }} months till paid off</p>
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
    "shouldDisplayInterest",
    "totalFeesPaid",
    "description",
    "timeTillPaidOff"
  ],
  computed: {
    ratioPaidOff: function() {
      return this.totalPaid / this.amount;
    },
    percentagePaidOff: function() {
      return this.ratioPaidOff * 100;
    },
    dashOffset: function() {
      return 472 - 472 * this.ratioPaidOff;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.snowball-percentage {
  position: relative;
  color: coral;
  width: 160px;
  margin: 0 auto;
}
.circle-outer {
  padding: 20px;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15),
    -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
}
.circle-inner {
  height: 120px;
  width: 120px;
  border-radius: 50%;
  box-shadow: inset 4px 4px 6px -1px #c7d8e8,
    inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
    0.5px 0.5px 0 rgba(0, 0, 0, 0.15), inset 0 8px 10px -10px #c7d8e8;
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
  margin: 0 auto;
}

@keyframes percentage-animation {
  100% {
    stroke-dashoffset: v-bind(dashOffset);
  }
}
</style>
