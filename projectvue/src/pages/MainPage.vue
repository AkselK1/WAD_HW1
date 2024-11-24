<template>
  <div>
    <Header />
    <div v-if="!isLoading" class="posts">
      <Post v-for="post in posts" :key="post.id" :postId="post.id" />
    </div>
    <div v-else class="loading">
      Loading posts...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <button @click="resetLikes">Reset All Likes</button>
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
    // Fetch posts through Vuex store
    this.$store.dispatch('fetchPosts');
  }
};
</script>