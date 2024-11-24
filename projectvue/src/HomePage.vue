<template>
  <div>
    <h1>Posts</h1>
    <div v-for="post in posts" :key="post.id" class="post">
      <p>{{ post.content }}</p>
      <button @click="likePost(post.id)">Like ({{ post.likes }})</button>
    </div>
    <button @click="resetLikes">Reset Likes</button>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.state.posts; // Saad postitused Vuex-st
    }
  },
  methods: {
    likePost(postId) {
      this.$store.commit('incrementLikes', postId); // Nupp, mis suurendab postituse meeldimiste arvu
    },
    resetLikes() {
      this.$store.commit('resetLikes'); // Lähtesta kõikide postituste meeldimised
    }
  }
}
</script>

<style scoped>
button {
  margin-top: 10px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>

