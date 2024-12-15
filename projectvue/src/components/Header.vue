<template>
  <header>
    <nav>
      <!-- Show Home link only if authenticated -->
      <router-link v-if="isAuthenticated" to="/">Home</router-link>

      <!-- Show Signup and Login links if not authenticated -->
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>

      <router-link to="/contact">Contact Us</router-link>

      <!-- Show logout button if authenticated -->
      <button v-if="isAuthenticated" @click="logout">Logout</button>
    </nav>
  </header>
</template>
  
  <script>
  export default {
    name: "AppHeader",
  };
  </script>
  
  <style scoped>
  header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: #f8f8f8;
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
  </style>
  
  