<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      
      <!-- Only show signup and login links if not authenticated -->
      <router-link v-if="!isAuthenticated" to="/signup">Signup</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
      <router-link to="/contact">Contact Us</router-link>

      <!-- Show logout button if authenticated -->
      <button v-if="isAuthenticated" @click="logout" class="logout-btn">Logout</button>
    </nav>
  </header>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: "AppHeader",
  setup() {
    const isAuthenticated = ref(localStorage.getItem("authToken") !== null);

    watch(() => localStorage.getItem("authToken"), (newValue) => {
      isAuthenticated.value = newValue !== null;
    });

    const logout = () => {
      localStorage.removeItem("authToken");
      isAuthenticated.value = false;
    };

    return {
      isAuthenticated,
      logout
    };
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f8f8;
  align-items: center; /* Align items vertically in the center */
}

nav {
  display: flex;
  justify-content: space-between;
  width: 100%; /* Make sure nav takes full width */
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #007bff;
  padding: 0.5rem 1rem; 
  border-radius: 4px; 
  transition: background-color 0.3s ease; 
}

nav a:hover {
  background-color: #007bff; 
  color: white; 
}

nav a.router-link-active {
  font-weight: bold;
}

nav a.router-link-active:hover {
  background-color: #0056b3; 
}

.logout-btn {
  margin-left: auto; /* Push the logout button to the right */
  padding: 0.5rem 1rem;
  background-color: #dc3545; /* Red background for the logout button */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #c82333; /* Darker red on hover */
}

.logout-btn:focus {
  outline: none; /* Remove outline on focus */
}
</style>
