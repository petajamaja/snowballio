<template>
  <button @click="makeExtraPayment">MAKE EXTRA PAYMENT</button>
</template>

<script>
import utils from "../../utils";
export default {
  name: "MakeExtraPaymentButton",
  props: ["extraPayment"],
  methods: {
    ...utils,
    makeExtraPayment: function() {
      if (this.extraPayment > 0)
        this.emitter.emit("make-extra-payment", utils.to100(this.extraPayment));
    }
  }
};
</script>

<style scoped></style>
