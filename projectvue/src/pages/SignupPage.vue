<template>
  <div class="signup-page">
    <Header />
    <main class="main-content">
      <div class="signup-container">
        <h2>Create Account</h2>
        <form @submit.prevent="validatePassword" class="signup-form">
          <div class="form-group">
            <input 
              type="text" 
              v-model="username" 
              placeholder="Username" 
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
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          </div>
          <button type="submit" class="submit-button">Sign Up</button>
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
  name: "SignupPage",
  components: {
    Header,
    Footer,
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
        [/[A-Z]/.test(this.password), "Password must include at least one uppercase alphabet character."],
        [/.*[a-z].*[a-z].*/.test(this.password), "Password must include at least two lowercase alphabet characters."],
        [/[0-9]/.test(this.password), "Password must include at least one numeric value."],
        [/^[A-Z]/.test(this.password), "Password must start with an uppercase alphabet character."],
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
.signup-page {
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

.signup-container {
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

.signup-form {
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

.submit-button {
  background-color: #4a90e2;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: #357abd;
}

.error-message {
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* Responsive Design */
@media (max-width: 480px) {
  .signup-container {
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>