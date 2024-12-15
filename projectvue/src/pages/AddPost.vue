<template>
    <div class="add-post-page">
      <Header />
      <main class="main-content">
        <div class="add-post-container">
          <h2>Add a New Post</h2>
          <form @submit.prevent="addPost" class="add-post-form">
            <div class="form-group">
              <textarea
                v-model="postContent"
                placeholder="Write your post here..."
                required
                class="form-input textarea"
              ></textarea>
            </div>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <button type="submit" class="button">Submit Post</button>
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
    name: "AddPost",
    components: {
      Header,
      Footer,
    },
    data() {
      return {
        postContent: "",
        errorMessage: "",
      };
    },
    methods: {
      async addPost() {
        if (this.postContent.trim() === "") {
          this.errorMessage = "Post content cannot be empty.";
          return;
        }
  
        try {
          // Replace this mock API call with your backend API
          const authToken = localStorage.getItem("authToken");
          const response = await fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`, // JWT token for authentication
            },
            body: JSON.stringify({
              content: this.postContent,
              date: new Date().toISOString(),
            }),
          });
  
          if (response.ok) {
            alert("Post added successfully!");
            this.$router.push("/"); // Redirect to homepage
          } else {
            const data = await response.json();
            this.errorMessage = data.message || "Failed to add the post.";
          }
        } catch (error) {
          this.errorMessage = "An error occurred. Please try again later.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .add-post-page {
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
  
  .add-post-container {
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
  
  .add-post-form {
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
  
  .form-input.textarea {
    min-height: 120px;
    resize: vertical;
  }
  
  .form-input:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
  
  .button {
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
  
  .error-message {
    color: #dc3545;
    font-size: 0.9rem;
    margin-top: -1rem;
    margin-bottom: 1rem;
  }
  </style>
  