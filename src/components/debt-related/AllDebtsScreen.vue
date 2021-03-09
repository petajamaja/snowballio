<template>
  <div class="snowballs">
    <ItemDebt name="Loan 1" v-bind:amount="20000" v-bind:amountPaid="0" />
    <ItemDebt name="Loan 2" v-bind:amount="4000" v-bind:amountPaid="0" />
    <ItemDebt name="Loan 3" v-bind:amount="8000" v-bind:amountPaid="0" />
    <ItemDebt name="Loan 4" v-bind:amount="14000" v-bind:amountPaid="0" />
    <ItemDebt name="Loan 5" v-bind:amount="20000" v-bind:amountPaid="0" />
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
.snowballs {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
button {
  background-color: #ffe0cb;
}
</style>
