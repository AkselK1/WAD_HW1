<template>
  <div class="post">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
    <button @click="likePost">Like ({{ post.likes }})</button>
  </div>
</template>

<script>
export default {
  name: "AppPost",
  props: ["postId"],
  computed: {
    post() {
      return this.$store.state.posts.find(post => post.id === this.postId);
    },
  },
  methods: {
    likePost() {
      this.$store.commit("incrementLikes", this.postId);
    },
  },
};
</script>

<style scoped>
.post {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
}
button {
  margin-top: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
}
</style>
