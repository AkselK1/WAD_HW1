<template>
    <div>
      <Header /> <!-- Include the Header component -->
      <form @submit.prevent="validatePassword">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Signup</button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </form>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from "@/components/Header.vue"; // Import Header component
  import Footer from "@/components/Footer.vue"; // Import Footer component
  
  export default {
    name: "SignupPage",
    components: {
      Header, // Register the Header component
      Footer, // Register the Footer component
    },
    data() {
      return {
        username: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      validatePassword() {
        const conditions = [
          [this.password.length >= 8 && this.password.length <= 15, "Password must be 8-15 characters long."],
          [/[A-Z]/.test(this.password), "Password must include at least one uppercase letter."],
          [/.*[a-z].*[a-z].*/.test(this.password), "Password must include at least two lowercase letters."],
          [/[0-9]/.test(this.password), "Password must include at least one numeric value."],
          [/^[A-Z]/.test(this.password), "Password must start with an uppercase letter."],
          [/_/.test(this.password), "Password must include the character '_'."],
        ];
        const errors = conditions.filter(([isValid]) => !isValid).map(([, message]) => message);
        this.errorMessage = errors.join(" ");
        if (!errors.length) alert("Signup successful!");
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: auto;
  }
  button {
    margin-top: 1rem;
  }
  p {
    color: red;
  }
  </style>
  
  