<template>
  <div class="snowballs">
    <ItemDebt v-for="(itemDebt,index) in itemDebts" 
              :key="itemDebt.id" 
              :itemDebt="itemDebt" 
              @delete-item-debt="deleteItemDebt(index)"/>
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
          "id": 0,
          "description": "Loan 1",
          "amount": 20000,
          "interest": 5,
          "installment": 100,
          "totalPaid": 0
        },
        { 
          "id": 1,
          "description": "Loan 2",
          "amount": 8000,
          "interest": 0,
          "installment": 100,
          "totalPaid": 0
        },
        { "id": 2,
          "description": "Loan 3",
          "amount": 8000,
          "interest": 0,
          "installment": 100,
          "totalPaid": 0
        },
        { "id": 3,
          "description": "Loan 4",
          "amount": 8000,
          "interest": 0,
          "installment": 100,
          "totalPaid": 0
        },
        { "id": 4,
          "description": "Loan 5",
          "amount": 8000,
          "interest": 0,
          "installment": 100,
          "totalPaid": 0
        },
      ]
    }
  },
  methods: {
    deleteItemDebt : function(index){
      this.itemDebts.splice(index, 1);
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
