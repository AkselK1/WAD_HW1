<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" />
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        // Siin saad edasi käsitleda vormi esitamist
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
  font-size: 14px;
}

form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
