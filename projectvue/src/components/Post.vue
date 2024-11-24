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
    <p><button @click="likePost">Like ({{ post.likes }})</button></p>
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
  max-width: 400px; /* Set a max width */
  width: 100%; /* Ensure it takes up full width on smaller screens */
  margin-left: auto; /* Center the post container horizontally */
  margin-right: auto; /* Center the post container horizontally */
  border-radius: 8px; /* Optional: Add rounded corners for a cleaner look */
}

.post h3 {
  font-size: 1.5rem; /* Smaller title font size */
  margin-bottom: 0.5rem;
}

.post p {
  font-size: 1rem; /* Adjust font size for readability */
  line-height: 1.5;
}

button {
  margin-top: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem; /* Slightly smaller button text */
  cursor: pointer;
  border-radius: 5px; /* Optional: Rounded button */
}

button:hover {
  background-color: #0056b3; /* Change color on hover */
}

.post-image {
  max-width: 100%; /* Ensure the image does not overflow the container */
  height: auto;
  border-radius: 4px; /* Optional: rounded corners for the image */
}
</style>

