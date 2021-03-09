<template>
  <header>
    SNOWBALL.IO
  </header>
  <main>
    <div id="app">
      {{ message }}
    </div>
    <AllDebtsScreen />
    <AddNewDebtButton />
  </main>
  <footer>
    <div class="snowball">
      Read more about snowball method <a href="">here</a>
    </div>
    <div class="contact">
      Created with debt anxiety by
      <a href="https://github.com/petajamaja/">@petajamaja</a>
    </div>
  </footer>
</template>

<script>
import AllDebtsScreen from "./components/AllDebtsScreen.vue";
import AddNewDebtButton from "./components/AddNewDebtButton.vue";

export default {
  name: "App",
  components: {
    AllDebtsScreen,
    AddNewDebtButton
  }
};
</script>

<style>
header {
  background-color: gainsboro;
  height: 60px;
}
footer {
  background-color: teal;
  height: 60px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
