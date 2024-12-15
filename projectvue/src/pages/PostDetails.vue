<template>
    <div class="post-details-page">
      <Header />
      <main class="main-content">
        <div class="post-details-container">
          <h2>Post Details</h2>
          <div v-if="loading" class="loading">Loading post...</div>
          <div v-else>
            <textarea
              v-model="postContent"
              class="form-input textarea"
              placeholder="Post content"
              :readonly="!isEditing"
            ></textarea>
            <div class="button-row">
              <button
                v-if="!isEditing"
                @click="enableEditing"
                class="button secondary"
              >
                Edit
              </button>
              <button
                v-if="isEditing"
                @click="updatePost"
                class="button"
              >
                Save Changes
              </button>
              <button
                @click="deletePost"
                class="button danger"
              >
                Delete Post
              </button>
            </div>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
  
  export default {
    name: "PostDetails",
    components: {
      Header,
      Footer,
    },
    data() {
      return {
        postContent: "",
        isEditing: false,
        loading: true,
        errorMessage: "",
      };
    },
    methods: {
      async fetchPost() {
        try {
          const postId = this.$route.params.id; // Get post ID from route
          const authToken = localStorage.getItem("authToken");
          const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch post.");
          }
  
          const post = await response.json();
          this.postContent = post.content;
          this.loading = false;
        } catch (error) {
          this.errorMessage = error.message || "An error occurred.";
          this.loading = false;
        }
      },
      enableEditing() {
        this.isEditing = true;
      },
      async updatePost() {
        try {
          const postId = this.$route.params.id;
          const authToken = localStorage.getItem("authToken");
          const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ content: this.postContent }),
          });
  
          if (!response.ok) {
            throw new Error("Failed to update the post.");
          }
  
          alert("Post updated successfully!");
          this.isEditing = false;
        } catch (error) {
          this.errorMessage = error.message || "An error occurred.";
        }
      },
      async deletePost() {
        if (!confirm("Are you sure you want to delete this post?")) return;
  
        try {
          const postId = this.$route.params.id;
          const authToken = localStorage.getItem("authToken");
          const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
  
          if (!response.ok) {
            throw new Error("Failed to delete the post.");
          }
  
          alert("Post deleted successfully!");
          this.$router.push("/"); // Redirect to the homepage
        } catch (error) {
          this.errorMessage = error.message || "An error occurred.";
        }
      },
    },
    created() {
      this.fetchPost();
    },
  };
  </script>
  
  <style scoped>
  .post-details-page {
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
  
  .post-details-container {
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
  
  textarea.form-input.textarea {
    width: 100%;
    min-height: 150px;
    resize: vertical;
    padding: 0.8rem;
    border: 2px solid #e1e1e1;
    border-radius: 6px;
    font-size: 1rem;
  }
  
  textarea:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
  
  .button-row {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    justify-content: space-between;
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
  
  .button.secondary {
    background-color: #f0f0f0;
    color: #333;
  }
  
  .button.danger {
    background-color: #dc3545;
  }
  
  .error-message {
    color: #dc3545;
    font-size: 0.9rem;
    margin-top: 1rem;
  }
  
  .loading {
    text-align: center;
    color: #555;
  }
  </style>
  