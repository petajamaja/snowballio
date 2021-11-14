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
@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&Montserrat:wght@400;700&family=Roboto+Mono:wght@300&family=Roboto");

html {
  font-size: 112.5%; /*18px*/
}
body {
  height: 100%;
  min-height: 100vh;
  margin: 0;
  background: white;
  color: #556292;
  font-weight: 400;
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  background-color: #c7d8e8;
}

p {
  margin-bottom: 1rem;
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: bold;
  line-height: 1.3;
}

h1 {
  margin-top: 0;
  font-size: 1.802rem;
}

h2 {
  font-size: 1.602rem;
}

h3 {
  font-size: 1.424rem;
}

h4 {
  font-size: 1.266rem;
}

h5 {
  font-size: 1.125rem;
}

small,
.text_small {
  font-size: 0.889rem;
}
</style>
