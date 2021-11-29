<template>
  <button @click="payOffAllMinimumAmounts"></button>
</template>

<script>
export default {
  name: "MakeExtraPaymentButton",
  methods: {
    payOffAllMinimumAmounts: function() {
      this.emitter.emit("pay-off-all-minimum-amounts");
    }
  }
};
</script>

<style scoped>
button {
  background-color: white;
  background: url("../../assets/payment_button_pic.svg");
  background-repeat: no-repeat;
  background-position: center;
  border: 0px;
  border-radius: 50%;
  width: 20vw;
  height: 20vw;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}
</style>
