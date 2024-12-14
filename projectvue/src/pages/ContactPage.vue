<template>
  <div class="contact-us-page">
    <Header />
    <main class="main-content">
      <div class="contact-us-container">
        <h2>Contact Us</h2>
        <p class="description">
          We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
        </p>
        <div class="contact-info">
          <p><strong>Email:</strong> support@example.com</p>
          <p><strong>Phone:</strong> +1 234 567 890</p>
          <p><strong>Address:</strong> 123 Example Street, City, Country</p>
        </div>
        <h3>Send Us a Message</h3>
        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <input 
              type="text" 
              v-model="name" 
              placeholder="Your Name" 
              required 
              class="form-input"
            />
          </div>
          <div class="form-group">
            <input 
              type="email" 
              v-model="email" 
              placeholder="Your Email" 
              required 
              class="form-input"
            />
          </div>
          <div class="form-group">
            <textarea 
              v-model="message" 
              placeholder="Your Message" 
              rows="5" 
              required 
              class="form-input"
            ></textarea>
          </div>
          <button type="submit" class="submit-button">Send Message</button>
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
  name: "ContactUsPage",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },
  methods: {
    submitForm() {
      alert(`Thank you, ${this.name}. Your message has been sent!`);
      this.name = "";
      this.email = "";
      this.message = "";
    },
  },
};
</script>

<style scoped>
.contact-us-page {
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

.contact-us-container {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background: white;
  border-radius: 10px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

h3 {
  color: #333;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.description {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.contact-info {
  text-align: left;
  margin-bottom: 2rem;
  line-height: 1.6;
  font-size: 1rem;
}

.contact-form {
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

/* Responsive Design */
@media (max-width: 480px) {
  .contact-us-container {
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>
