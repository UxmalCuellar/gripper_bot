<template>
  <div id="app">
    <Gripper/>
  </div>
</template>

<script>
import Gripper from "./components/Gripper.vue";

export default {
  name: "app",
  components: {
    Gripper
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
