<template>
  <button @click="this.emitter.emit('add-item-debt')">ADD DEBT</button>
</template>

<script>
export default {
  name: "AddNewDebtButton"
};
</script>

<style scoped></style>
