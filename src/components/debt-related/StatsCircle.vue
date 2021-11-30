<template>
  <div class="snowball-percentage">
    <div class="circle-outer">
      <div class="circle-inner">
        <div class="percentage-num">{{ percentagePaidOff }}%</div>
      </div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="120px"
      height="120px"
    >
      <defs>
        <linearGradient id="gradient" data-v-3737831a="">
          <stop offset="0%" stop-color="#BBD6E7" data-v-3737831a=""></stop>
          <stop offset="100%" stop-color="#64BFC5" data-v-3737831a=""></stop>
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="55" stroke-linecap="round" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "StatsCircle",
  props: ["amount", "totalPaid"],
  computed: {
    ratioPaidOff: function() {
      return this.totalPaid / this.amount;
    },
    percentagePaidOff: function() {
      return Math.round(this.ratioPaidOff * 100);
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
  width: 120px;
  margin: 20px auto;
}
.circle-outer {
  padding: 10px;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
  box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15),
    -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
}
.circle-inner {
  height: 100px;
  width: 100px;
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
  stroke-width: 10px;
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
