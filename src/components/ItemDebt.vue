<template>
  <div>
    <p>{{ name }}</p>
    <p>{{ amount }}</p>
    <button>PAY OFF</button>
    <button>DELETE</button>
  </div>
</template>

<script>
export default {
  name: "ItemDebt",
  props: {
    name: String,
    amount: Number,
    amountPaid: Number
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  background-color: teal;
}
div {
  position: relative;
  display: flex;
}
</style>
