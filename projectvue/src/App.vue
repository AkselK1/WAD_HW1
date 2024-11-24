<template>
  <div id="app">
    <router-view /> <!-- This renders the current route's component -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Add any global styles here */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
