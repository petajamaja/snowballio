<template>
  <main id="main">
    <AllDebtsScreen />
    <AddNewDebtButton />
  </main>
</template>

<script>
import AllDebtsScreen from "../debt-related/AllDebtsScreen.vue";
import AddNewDebtButton from "../debt-related/AddNewDebtButton.vue";

export default {
  name: "MainScreen",
  components: {
    AllDebtsScreen,
    AddNewDebtButton
  }
};
</script>
<style>
#main {
  flex: auto;
  overflow: auto;
  background-color: #c7d8e8;
  padding-top: 40px;
  padding-bottom: 40px;
}
</style>
