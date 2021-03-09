<template>
  <div>
    <ItemDebt name="loan 1" v-bind:amount="20000" v-bind:amountPaid="0" />
    <ItemDebt name="loan 2" v-bind:amount="4000" v-bind:amountPaid="0" />
    <ItemDebt name="loan 3" v-bind:amount="8000" v-bind:amountPaid="0" />
    <ItemDebt name="loan 4" v-bind:amount="14000" v-bind:amountPaid="0" />
    <ItemDebt name="loan 5" v-bind:amount="20000" v-bind:amountPaid="0" />
  </div>
</template>

<script>
import ItemDebt from "./ItemDebt.vue";
export default {
  name: "AllDebtsScreen",
  props: {},
  components: {
    ItemDebt
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  background-color: teal;
}
</style>
