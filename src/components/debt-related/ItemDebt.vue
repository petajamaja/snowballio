<template>
  <div id="snowball-item" class="flex-column snowball-item">
    <div class="description-area">
      <h2>{{ description }}</h2>
      <button class="edit-icon"></button>
    </div>
    <div v-if="totalPaid !== amount || amount === 0" class="fields">
      <form id="item-debt-fill-form" @change="sendModifiedObjectUp()">
        <label for="name-input">Description</label>
        <input id="name-input" class="name-input" v-model="description" />
        <label for="amount-input">Total amount</label>
        <input
          type="number"
          id="amount-input"
          class="amount-input"
          v-model.number="amount"
        />
        <p v-if="amountIsZero" class="error">Debt amount must be positive</p>
        <label for="interest-input">Interest</label>
        <input
          type="number"
          id="interest-input"
          class="interest-input"
          v-model.number="interest"
        />
        <label for="installment-input">Montly minimum payment</label>
        <input
          type="number"
          id="installment-input"
          class="installment-input"
          v-model.number="installment"
        />
        <p v-if="installmentIsZero && thisIsTheMinimalDebt" class="error">
          First debt payment must be positive!
        </p>
        <div>
          <p>Already paid off:</p>
          <p>{{ itemDebt.totalPaid }}</p>
        </div>
      </form>
    </div>
    <div v-else>
      <p>You paid this debt off completely!</p>
      <p>Total money paid : {{ totalPaid }}</p>
    </div>
    <button class="delete" v-if="!debtIsPaidOff" @click="deleteItemDebt()">
      &#10006;
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemDebt",
  props: ["index", "itemDebt", "thisIsTheMinimalDebt", "debtIsPaidOff"],
  data() {
    return {
      id: this.itemDebt.id,
      description: this.itemDebt.description,
      amount: this.itemDebt.amount,
      interest: this.itemDebt.interest,
      installment: this.itemDebt.installment,
      totalPaid: this.itemDebt.totalPaid
    };
  },
  watch: {
    thisIsTheMinimalDebt: function() {
      if (!this.allFieldsPassValidation)
        this.emitter.emit("there-is-error-in-debt", this.id);
    }
  },
  methods: {
    sendModifiedObjectUp: function() {
      if (this.allFieldsPassValidation) {
        this.emitter.emit("update-item-debt", {
          index: this.index,
          updatedItem: this.$data
        });
        this.emitter.emit("removed-error-in-debt", this.id);
      } else {
        this.emitter.emit("there-is-error-in-debt", this.id);
      }
    },
    deleteItemDebt: function() {
      this.emitter.emit("delete-item-debt", {
        debtIndex: this.index,
        debtId: this.id
      });
    }
  },
  computed: {
    amountIsZero: function() {
      return this.amount === 0;
    },
    installmentIsZero: function() {
      return this.installment === 0;
    },
    allFieldsPassValidation: function() {
      return (
        !this.amountIsZero &&
        !(this.installmentIsZero && this.thisIsTheMinimalDebt)
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.description-area {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.error {
  color: crimson;
  font-weight: bold;
  font-size: 14px;
}
.edit-icon {
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM3ZE-2k1nS_nzIYmVJRY4TuBaUn6o1Nj8Og&usqp=CAU");
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 10px;
}
.active-border {
  position: relative;
  text-align: center;
  width: 110px;
  height: 110px;
  border-radius: 100%;
  background-color: #39b4cc;
  background-image: linear-gradient(91deg, transparent 50%, #a2ecfb 50%),
    linear-gradient(90deg, #a2ecfb 50%, transparent 50%);
}

.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.name,
.amount {
  font-family: "Fredoka One", cursive;
}
input {
  display: flex;
  flex-direction: row;
}

input,
input:focus {
  background-color: white;
  border: 1px solid grey;
  margin-right: 5px;
  border-radius: 10px;
  min-height: 30px;
  font-size: 20px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 10px;
  padding-right: 10px;
  align-content: center;
}
button {
  background-color: #798595;
  color: #ffe0cb;
}
.delete {
  position: absolute;
  right: 20px;
  top: 20px;
  color: #ffe0cb;
  border: none;
}
.fields {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.snowball-item {
  position: relative;
  background-color: white;
  margin: 5px;
  padding: 10px;
  flex: 1;
  max-width: 50%;
  flex-basis: 25%;
}
</style>
