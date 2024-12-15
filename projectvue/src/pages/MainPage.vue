<template>
  <div class="main-container">
    <Header />
    
    <main class="content">
      <div v-if="!isLoading" class="posts-container">
        <Post v-for="post in posts" 
              :key="post.id" 
              :postId="post.id" />
      </div>
      
      <div v-else class="loading-container">
        <div class="loading-spinner">Loading posts...</div>
      </div>
      
      <div v-if="error" class="error-container">
        {{ error }}
      </div>
      
      <div class="actions-container">
        <button @click="addPost" class="action-button add-button">
          Add Post
        </button>
        <button @click="resetLikes" class="action-button reset-button">
          Reset All Likes
        </button>
        <button @click="deleteAllPosts" class="action-button delete-all-button">
          Delete All Posts
        </button>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Post from "@/components/Post.vue";
import { mapGetters } from "vuex";

export default {
  name: "MainPage",
  components: { Header, Footer, Post },
  computed: {
    ...mapGetters(["getAllPosts", "getIsLoading", "getError"]),
    posts() {
      return this.getAllPosts;
    },
    isLoading() {
      return this.getIsLoading;
    },
    error() {
      return this.getError;
    },
  },
  methods: {
    resetLikes() {
      this.$store.commit("RESET_LIKES");
    },
    addPost() {
      this.$router.push("/addPost"); // Navigate to AddPost page
    },
    async deleteAllPosts() {
  const confirmation = confirm("Are you sure you want to delete all posts?");
  if (confirmation) {
    try {
      const authToken = localStorage.getItem("authToken");
      console.log("Sending DELETE request to: http://localhost:3000/api/posts");

      const response = await fetch("http://localhost:3000/api/posts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        alert("All posts deleted successfully!");
        this.$store.commit("SET_POSTS", []); // Clear posts in Vuex store
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete posts.");
      }
    } catch (error) {
      console.error("Error deleting posts:", error);
      alert("An error occurred. Please try again later.");
    }
  }
},

  },
  created() {
    this.$store.dispatch("fetchPosts");
  },
};
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.posts-container {
  display: grid;
  gap: 32px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.loading-spinner {
  color: #666;
  font-size: 18px;
}

.error-container {
  text-align: center;
  color: #dc3545;
  padding: 20px;
  background: white;
  border-radius: 8px;
  margin: 20px 0;
}

.actions-container {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
}

.action-button {
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.add-button {
  background-color: #28a745;
  color: white;
}

.add-button:hover {
  background-color: #218838;
}

.reset-button {
  background-color: #6c757d;
  color: white;
}

.reset-button:hover {
  background-color: #5a6268;
}

.delete-all-button {
  background-color: #dc3545;
  color: white;
}

.delete-all-button:hover {
  background-color: #c82333;
}
</style>
