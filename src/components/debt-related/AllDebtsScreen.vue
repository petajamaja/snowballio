<template>
  <div class="snowballs">
    <ItemDebt
      v-for="(itemDebt, index) in itemDebts"
      :index="index"
      :key="itemDebt.id"
      :itemDebt="itemDebt"
      :thisIsTheMinimalDebt="index === 0"
    />
  </div>
  <p>====================================</p>
  <div class="snowballs">
    <ItemDebt
      v-for="(itemDebt, index) in paidOffDebts"
      :index="index"
      :key="itemDebt.id"
      :itemDebt="itemDebt"
      :debtIsPaidOff="true"
      :thisIsTheMinimalDebt="false"
    />
  </div>
</template>

<script>
import ItemDebt from "./ItemDebt.vue";
export default {
  name: "AllDebtsScreen",
  props: ["itemDebts", "paidOffDebts"],
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
