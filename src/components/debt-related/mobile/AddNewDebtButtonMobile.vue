<template>
  <button @click="this.emitter.emit('add-item-debt')">+</button>
</template>

<script>
export default {
  name: "AddNewDebtButtonMobile",
  methods: {
    addDebt: function(){
      this.emitter.emit('add-item-debt');
    }
  }
};
</script>

<style scoped>
button {
  background-color: white;
  border: 0px;
  border-radius: 50%;
  width: 20vw;
  height: 20vw;
}
</style>
