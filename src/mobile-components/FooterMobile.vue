<template>
  <footer>
    <HomeButton />
    <MakeMinimumPaymentButton class="pay-min" />
    <AddNewDebtButtonMobile class="add-debt" />
  </footer>
</template>

<script>
import AddNewDebtButtonMobile from "./AddNewDebtButtonMobile.vue";
import MakeMinimumPaymentButton from "../components/payment-related/MakeMinimumPaymentButton.vue";
import HomeButton from "./HomeButton.vue";
export default {
  name: "Footer",
  components: {
    AddNewDebtButtonMobile,
    MakeMinimumPaymentButton,
    HomeButton
  }
};
</script>

<style scoped>
footer {
  background-color: white;
  min-height: 60px;
  max-height: 60px;
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: rgba(50, 50, 105, 0.15) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
}
button {
  margin: 0 auto;
}
.pay-min {
  margin: 0 auto;
  margin-bottom: 60px;
  background-color: white;
}
</style>
