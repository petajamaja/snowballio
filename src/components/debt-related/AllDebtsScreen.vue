<template>
  <div class="snowballs">
    <ItemDebt
      v-for="(itemDebt, index) in itemDebts"
      :key="itemDebt.id"
      :itemDebt="itemDebt"
      :thisIsTheMinimalDebt="index === 0"
      @delete-item-debt="deleteItemDebtEmitToSource($event, index)"
      @update-item-debt="updateItemDebtEmitToSource($event, index)"
    />
  </div>
  <p>====================================</p>
  <div class="snowballs">
    <ItemDebt
      v-for="itemDebt in paidOffDebts"
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
  },
  methods: {
    deleteItemDebtEmitToSource: function($event, index) {
      this.$emit("delete-item-debt", index);
    },
    updateItemDebtEmitToSource: function(updatedItem, index) {
      this.$emit("update-item-debt", {
        updatedItem: updatedItem,
        index: index
      });
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
