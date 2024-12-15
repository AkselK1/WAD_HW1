<template>
  <div class="main-container">
    <Header />

    <main class="content">
      <div v-if="!isLoading" class="posts-container">
        <Post v-for="post in posts" 
              :key="post.id" 
              :post="post" />
      </div>

      <div v-else class="loading-container">
        <div class="loading-spinner">Loading posts...</div>
      </div>

      <div v-if="error" class="error-container">
        {{ error }}
      </div>

      <div class="actions">
        <router-link to="/addPost" class="action-button">Add Post</router-link>
        <button @click="deleteAllPosts" class="action-button danger">
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
import { mapGetters } from 'vuex';

export default {
  name: "MainPage",
  components: { Header, Footer, Post },
  computed: {
    ...mapGetters(['getAllPosts', 'getIsLoading', 'getError']),
    posts() {
      return this.getAllPosts;
    },
    isLoading() {
      return this.getIsLoading;
    },
    error() {
      return this.getError;
    }
  },
  methods: {
    async deleteAllPosts() {
  const confirmation = confirm("Are you sure you want to delete all posts?");
  if (!confirmation) return;

  try {
    console.log(localStorage.getItem("authToken"));
    // Loop through all posts and send DELETE requests
    const deletePromises = this.posts.map(post =>
    
      fetch(`http://localhost:3000/api/posts/${post.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      })
    );

    await Promise.all(deletePromises); // Wait for all delete requests
    alert("All posts deleted successfully.");
    this.$store.dispatch("fetchPosts"); // Refresh the posts list
  } catch (error) {
    console.error("Error deleting posts:", error);
    alert("Failed to delete all posts. Please try again.");
  }
}
  },
  created() {
    this.$store.dispatch("fetchPosts");
  }
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

.reset-button {
  display: block;
  margin: 40px auto;
  padding: 12px 24px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.reset-button:hover {
  background-color: #5a6268;
}
.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
}

.action-button {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.action-button:hover {
  background-color: #0056b3;
}

.action-button.danger {
  background-color: #dc3545;
}

.action-button.danger:hover {
  background-color: #a71d2a;
}

</style>