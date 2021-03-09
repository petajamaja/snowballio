<template>
  <Header />
  <MainScreen />
  <Footer />
</template>

<script>
import Header from "./components/high-level/Header.vue";
import MainScreen from "./components/high-level/MainScreen.vue";
import Footer from "./components/high-level/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    MainScreen,
    Footer
  }
};
</script>
<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
