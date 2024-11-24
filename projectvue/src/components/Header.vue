<template>
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/signup">Signup</router-link>
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
  
  