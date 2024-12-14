<template>
    <div class="login-page">
      <Header />
      <main class="main-content">
        <div class="login-container">
          <h2>Login to Your Account</h2>
          <form @submit.prevent="loginUser" class="login-form">
            <div class="form-group">
              <input 
                type="email" 
                v-model="email" 
                placeholder="Email" 
                required 
                class="form-input"
              />
            </div>
            <div class="form-group">
              <input 
                type="password" 
                v-model="password" 
                placeholder="Password" 
                required 
                class="form-input"
              />
            </div>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <div class="button-row">
              <button type="submit" class="button">Login</button>
              <button type="button" @click="redirectToSignup" class="button secondary">Signup</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
  
  export default {
    name: "LoginPage",
    components: {
      Header,
      Footer,
    },
    data() {
      return {
        email: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      loginUser() {
        if (!this.validateForm()) {
          this.errorMessage = "Invalid email or password.";
          return;
        }
  
        // Mock authentication (replace this with actual API call)
        if (this.email === "user@example.com" && this.password === "Password123") {
          alert("Login successful!");
          this.$router.push("/home"); // Redirect to the homepage
        } else {
          this.errorMessage = "Invalid email or password.";
        }
      },
      validateForm() {
        return this.email.includes("@") && this.password.length >= 8;
      },
      redirectToSignup() {
        this.$router.push("/signup"); // Redirect to the signup page
      },
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: white;
  }
  
  .main-content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem 1rem;
  }
  
  .login-container {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background: white;
    border-radius: 10px;
  }
  
  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-input {
    padding: 0.8rem;
    border: 2px solid #e1e1e1;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }
  
  .form-input:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
  
  .button-row {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  
  .button {
    flex: 1;
    background-color: #4a90e2;
    color: white;
    padding: 0.8rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease;
  }
  
  .button:hover {
    background-color: #357abd;
  }
  
  .button.secondary {
    background-color: #f0f0f0;
    color: #333;
  }
  
  .button.secondary:hover {
    background-color: #e0e0e0;
  }
  
  .error-message {
    color: #dc3545;
    font-size: 0.9rem;
    margin-top: -1rem;
    margin-bottom: 1rem;
  }
  
  /* Responsive Design */
  @media (max-width: 480px) {
    .login-container {
      padding: 1.5rem;
    }
  
    h2 {
      font-size: 1.5rem;
    }
  
    .button-row {
      flex-direction: column;
      gap: 0.8rem;
    }
  }
  </style>
  
  