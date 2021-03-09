<template>
  <footer>
    <div class="snowball">
      Read more about snowball method&nbsp;
      <a
        href="https://www.daveramsey.com/blog/how-the-debt-snowball-method-works"
        >here</a
      >
    </div>
    <div class="contact">
      Created with debt anxiety by&nbsp;
      <a href="https://github.com/petajamaja/">@petajamaja</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
footer {
  display: flex;
  flex-flow: column;
  align-items: stretch;
  justify-content: center;
  background-color: white;
  min-height: 120px;
  flex: none;
}
.snowball {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 2;
  font-family: "Roboto Mono", monospace;
  font-size: 20px;
}
.contact {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: auto;
  flex-grow: 1;
  background-color: #798595;
  color: rgb(0, 255, 229);
  font-family: "Roboto Mono", monospace;
  font-size: 20px;
}

.snowball a {
  color: orange;
}

a {
  color: #ffe0cb;
}
</style>
