<template>
  <main id="main" class="scroll-hide">
    <div id="action-buttons" class="flex-row">
      <AddNewDebtButton />
    </div>
    <AllDebtsScreen :itemDebts="itemDebts" @delete-item-debt="deleteItemDebt($event, index)"/>
  </main>
</template>

<script>
import AllDebtsScreen from "../debt-related/AllDebtsScreen.vue";
import AddNewDebtButton from "../debt-related/AddNewDebtButton.vue";

export default {
  name: "MainScreen",
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
    AllDebtsScreen,
    AddNewDebtButton
  }
};
</script>
<style>
#main {
  flex: auto;
  padding-top: 40px;
  padding-bottom: 40px;
  width: 60%;
  margin: 0 auto;
}

.scroll-hide {
  padding-left: 16px;
  overflow: auto;
  /* this will hide the scrollbar in mozilla based browsers */
  overflow: -moz-scrollbars-none;
  /* this will hide the scrollbar in internet explorers */
  -ms-overflow-style: none;
}

/* this will hide the scrollbar in webkit based browsers - safari, chrome, etc */
.scroll-hide::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}

@media only screen and (max-width: 600px) {
  #main {
    width: 100%;
  }
}
</style>
