<template>
  <div>
    <Header />
    <div class="posts">
      <Post v-for="post in posts" :key="post.id" :postId="post.id" />
    </div>
    <button @click="resetLikes">Reset All Likes</button>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Post from "@/components/Post.vue";

export default {
  name: "MainPage",
  components: { Header, Footer, Post },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
  methods: {
    resetLikes() {
      this.$store.commit("resetLikes");
    },
  },
};
</script>

<style scoped>
.posts {
  display: flex;
  flex-direction: column;
}
button {
  margin: 1rem auto;
  display: block;
}
</style>
