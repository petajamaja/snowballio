<template>
  <div class="snowballs">
    <ItemDebt v-for="(itemDebt,index) in itemDebts" 
              :key="itemDebt.id" 
              :itemDebt="itemDebt" 
              @delete-item-debt="deleteItemDebtEmitToSource($event, index)"/>
  </div>
</template>

<script>
import ItemDebt from "./ItemDebt.vue";
export default {
  name: "AllDebtsScreen",
  props: ["itemDebts"],
  components: {
    ItemDebt
  },
  methods: {
    deleteItemDebtEmitToSource($event, index){
      this.$emit('delete-item-debt', index);
    }
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
