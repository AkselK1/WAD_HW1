import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import SignupPage from "@/pages/SignupPage.vue";

const routes = [
  { path: "/", component: MainPage },
  { path: "/signup", component: SignupPage },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
