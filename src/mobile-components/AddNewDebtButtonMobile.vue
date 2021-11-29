<template>
  <button @click="addDebt"></button>
</template>

<script>
export default {
  name: "AddNewDebtButtonMobile",
  methods: {
    addDebt: function() {
      this.emitter.emit("add-item-debt");
    }
  }
};
</script>

<style scoped>
button {
  background: url("../assets/add_debt.svg");
  border: 0px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-bottom: 25px;
}
</style>
