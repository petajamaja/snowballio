<template>
  <div class="accordion">
    <div class="title" @click="open = !open">
      <p>INTEREST SETTINGS</p>
      <div v-if="open" class="arrow arrow-up">&#708;</div>
      <div v-if="!open" class="arrow arrow-down">&#709;</div>
    </div>
    <transition name="accordion">
      <div class="content" v-show="open">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "InterestAccordion",
  data() {
    return {
      open: false
    };
  }
};
</script>

<style scoped>
.arrow {
  font-size: 26px;
}
input {
  display: flex;
  flex-direction: column;
}

input,
input:focus {
  background-color: white;
  border: 1px solid rgb(202, 196, 196);
  margin-right: 5px;
  border-radius: 10px;
  min-height: 30px;
  font-size: 20px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 10px;
  padding-right: 10px;
  align-content: center;
}

.title {
  background-color: white;
  border: 1px solid black;
  margin: 2em;
  align-content: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
</style>
