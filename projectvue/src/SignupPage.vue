<template>
  <div class="signup-container">
    <!-- Header Component -->
    <div class="header">
      <h1>Create Account</h1>
      <p class="subtitle">Start your journey with us today</p>
    </div>
    
    <!-- Navigation Links -->
    <div class="navigation">
      <p>
        Already have an account? 
        <router-link to="/login" class="link">Login</router-link>
      </p>
    </div>

    <!-- Email Input -->
    <div class="form-group">
      <label for="email">Email</label>
      <div class="input-container">
        <input 
          type="email" 
          v-model="email" 
          id="email" 
          placeholder="Enter your email"
        />
      </div>
    </div>

    <!-- Password Input -->
    <div class="form-group">
      <label for="password">Password</label>
      <div class="input-container">
        <input 
          type="password" 
          v-model="password" 
          id="password" 
          placeholder="Enter your password"
        />
      </div>
      <p v-if="passwordError" class="error">
        <span class="error-icon">⚠️</span>
        {{ passwordError }}
      </p>
      <p class="password-hint">Password must contain: 8-14 characters, uppercase & lowercase letters, a number, and an underscore</p>
    </div>

    <!-- Sign Up Button -->
    <div class="form-group">
      <button @click="submitForm" class="submit-btn">
        Create Account
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupPage",
  data() {
    return {
      email: '',
      password: '',
      passwordError: ''
    };
  },
  methods: {
    validatePassword() {
      const password = this.password;
      const regex = /^(?=.*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d)(?=.*_).{8,14}$/;
      if (!regex.test(password)) {
        this.passwordError = 'The password is not valid. Ensure it meets all the requirements.';
        return false;
      }
      this.passwordError = '';
      return true;
    },
    submitForm() {
      if (this.validatePassword()) {
        alert('Form submitted!');
      }
    }
  }
}
</script>

<style scoped>
.signup-container {
  max-width: 450px;
  margin: 40px auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  background: white;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.subtitle {
  color: #666;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.navigation {
  text-align: center;
  margin-bottom: 2rem;
  color: #666;
}

.link {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.link:hover {
  color: #2980b9;
  text-decoration: underline;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
  font-size: 0.95rem;
}

.input-container {
  position: relative;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
  color: #2c3e50;
}

input::placeholder {
  color: #999;
}

input:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.submit-btn:hover {
  background-color: #2980b9;
}

.submit-btn:active {
  transform: translateY(1px);
}

.error {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-icon {
  font-size: 1rem;
}

.password-hint {
  color: #666;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  line-height: 1.4;
}

/* Add responsiveness */
@media (max-width: 500px) {
  .signup-container {
    margin: 20px;
    padding: 1.5rem;
  }

  .header h1 {
    font-size: 1.75rem;
  }
}
</style>