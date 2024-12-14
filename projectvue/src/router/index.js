import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import ContactPage from "@/pages/ContactPage.vue";

// Mock function to check if the user is authenticated (replace with real logic)
function isAuthenticated() {
  return localStorage.getItem('authToken') !== null; // Check if there's a stored token
}

const routes = [
  {
    path: "/",
    component: MainPage,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next(); // Allow access to the home page
      } else {
        next("/login"); // Redirect to login page if not authenticated
      }
    },
  },
  { path: "/signup", component: SignupPage },
  { path: "/login", component: LoginPage },
  { path: "/contact", component: ContactPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
