<template>
  <div id="app">
    <AppHeader /> <!-- Kasutame AppHeader komponenti -->
    <router-view></router-view> <!-- Kuva vastavalt aktiveeritud lehte -->
    <SiteFooter /> <!-- Kasutame SiteFooter komponenti -->
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import SiteFooter from './components/SiteFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    SiteFooter
  }
}
</script>

<style>
/* Siin saad lisada oma stiili */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>

