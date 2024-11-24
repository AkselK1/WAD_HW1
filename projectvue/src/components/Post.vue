<template>
  <div class="post">
    <h3>{{ post.title }}</h3>
    <p><strong>Author:</strong> {{ post.author }}</p>
    <p><strong>Created on:</strong> {{ new Date(post.create_time).toLocaleDateString() }}</p>
    <p>{{ post.content }}</p>
    
    <!-- Display tags -->
    <p><strong>Tags:</strong> {{ post.tags.join(", ") }}</p>

    <!-- Display image if available -->
    <img v-if="post.image_url" :src="post.image_url" :alt="post.title" class="post-image"/>

    <!-- Like button -->
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
