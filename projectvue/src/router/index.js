import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import ContactPage from "@/pages/ContactPage.vue";
import AddPost from "@/pages/AddPost.vue"; 
import PostDetails from "@/pages/PostDetails.vue"; 

// Mock function to check if the user is authenticated (replace with real logic)
function isAuthenticated() {
  return localStorage.getItem("authToken") !== null;
}

const routes = [
  {
    path: "/",
    component: MainPage,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next("/login");
      }
    },
  },
  { path: "/signup", component: SignupPage },
  { path: "/login", component: LoginPage },
  { path: "/contact", component: ContactPage },
  {
    path: "/addPost",
    component: AddPost,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/post/:id",
    component: PostDetails,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next("/login");
      }
    },
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

