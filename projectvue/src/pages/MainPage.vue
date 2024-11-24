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
      
      <button @click="resetLikes" class="reset-button">
        Reset All Likes
      </button>
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
    resetLikes() {
      this.$store.commit("RESET_LIKES");
    }
  },
  created() {
    this.$store.dispatch('fetchPosts');
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
</style>