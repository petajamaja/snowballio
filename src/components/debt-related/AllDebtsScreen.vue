<template>
  <div class="snowballs">
      <ItemDebt v-for="(itemDebt, index) in itemDebts" 
          :key="index" 
          :itemDebt="itemDebt" />
  </div>
</template>

<script>
import ItemDebt from "./ItemDebt.vue";
export default {
  name: "AllDebtsScreen",
  props: {},
  data() {
    return {
      itemDebts: [
        {
          "description": "Loan 1",
          "amount": 20000,
          "interest": 5,
          "installment": 100,
          "totalPaid": 0
        },
        {
          "description": "Loan 2",
          "amount": 8000,
          "interest": 0,
          "installment": 100,
          "totalPaid": 0
        },
        {
          "description": "Loan 3",
          "amount": 8000,
          "interest": 0,
          "installment": 100,
          "totalPaid": 0
        },
        {
          "description": "Loan 4",
          "amount": 8000,
          "interest": 0,
          "installment": 100,
          "totalPaid": 0
        },
        {
          "description": "Loan 5",
          "amount": 8000,
          "interest": 0,
          "installment": 100,
          "totalPaid": 0
        },
      ]
    }
  },
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
