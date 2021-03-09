<template>
  <div class="snowball-item">
    <div class="fields">
      <p class="name">{{ name }}</p>
      <div class="amount">{{ amount }}</div>
      <button>PAY OFF</button>
    </div>
    <button class="delete">&#10006;</button>
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
.name {
  font-family: "Fredoka One", cursive;
}
button {
  background-color: teal;
}
.delete {
  align-self: flex-start;
  color: #ffe0cb;
  border: none;
}
.fields {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.snowball-item {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  align-items: stretch;
  align-content: flex-start;
  margin: 5px;
  padding: 10px;
  flex: 1;
  flex-basis: 52%;
}
</style>
