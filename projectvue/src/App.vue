<template>
  <div id="app">
    <AppHeader /> <!-- Kasutame AppHeader komponenti -->
    <router-view></router-view>
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
/* Siia saad lisada oma stiili */
</style>
