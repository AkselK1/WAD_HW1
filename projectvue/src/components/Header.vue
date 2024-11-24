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
    padding: 0.5rem 1rem; /* Add padding to make the background area larger */
    border-radius: 4px; /* Optional: Rounded corners for the hover background */
    transition: background-color 0.3s ease; /* Smooth transition for background color */
  }
  
  nav a:hover {
    background-color: #007bff; /* Change background color on hover */
    color: white; /* Change text color when hovering */
  }
  
  /* Apply bold font style for the active link */
  nav a.router-link-active {
    font-weight: bold;
  }
  
  /* Optional: Style for active link when hovered */
  nav a.router-link-active:hover {
    background-color: #0056b3; /* Darker shade for active link on hover */
  }
  </style>
  
  