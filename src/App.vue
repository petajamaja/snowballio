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
@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&family=Roboto+Mono:wght@300&display=swap");
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  color: #2c3e50;
  height: 100%;
}
</style>
