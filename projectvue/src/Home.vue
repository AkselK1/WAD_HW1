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
    // Saad postitused Vuex-st
    posts() {
      return this.$store.state.posts;
    }
  },
  methods: {
    // Postituse "like" nupp
    likePost(postId) {
      this.$store.commit('incrementLikes', postId);
    },
    // Lähtesta kõikide postituste meeldimised
    resetLikes() {
      this.$store.commit('resetLikes');
    }
  }
}
</script>
