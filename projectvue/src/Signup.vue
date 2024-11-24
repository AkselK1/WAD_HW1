<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password">
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
    // Parooli valideerimine
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
    // Vormi saatmine
    submitForm() {
      if (this.validatePassword()) {
        alert('Form submitted!');
        // Siin saad edasi käsitleda vormi esitamist
      }
    }
  }
}
</script>
