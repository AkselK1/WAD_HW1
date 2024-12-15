<template>
  <div v-if="!isLoading">
    <div v-if="post" class="post-card">
      <!-- Post Header Section -->
      <div class="post-header">
        <div class="post-title-section">
          <h2 class="post-title">{{ post.title }}</h2>
          <div class="post-meta">
            <div class="author-date">
              <span class="author">{{ post.author }}</span>
              <span class="date-divider">•</span>
              <span class="date">{{ formatDate(post.create_time) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="post.image_url" class="post-image-container">
        <img :src="post.image_url" :alt="post.title" class="post-image" />
      </div>

      <div class="post-content">
        <p>{{ post.content }}</p>
      </div>

      <div class="post-footer">
        <div class="tags-container">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="tag"
          >
            #{{ tag }}
          </span>
        </div>
        <button
          @click="likePost"
          class="like-button"
          :class="{ 'liked': isLiked }"
        >
          <span class="heart-icon">{{ isLiked ? "❤️" : "🤍" }}</span>
          <span class="likes-count">{{ post.likes }}</span>
        </button>
      </div>

      <!-- New Buttons -->
      <div class="post-actions">
        <button @click="editPost" class="button edit-button">Edit</button>
        <button @click="deletePost" class="button delete-button">Delete</button>
        <button @click="goBack" class="button back-button">Back to Home</button>
      </div>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
  <div v-else class="loading-spinner">Loading post...</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppPost",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isLiked: false,
    };
  },
  computed: {
    ...mapGetters(["getPostById", "getIsLoading", "getError"]),
    post() {
      return this.getPostById(this.postId);
    },
    isLoading() {
      return this.getIsLoading;
    },
    error() {
      return this.getError;
    },
  },
  methods: {
    likePost() {
      if (!this.isLiked) {
        this.$store.commit("INCREMENT_LIKES", this.postId);
        this.isLiked = true;
      }
    },
    async editPost() {
      const newContent = prompt("Edit your post content:", this.post.content);
      if (newContent !== null && newContent.trim() !== "") {
        try {
          await this.$store.dispatch("updatePost", {
            id: this.postId,
            newContent,
          });
          alert("Post updated successfully!");
        } catch (error) {
          alert("Failed to update post. Please try again.");
        }
      }
    },
    async deletePost() {
      if (confirm("Are you sure you want to delete this post?")) {
        try {
          await this.$store.dispatch("deletePost", this.postId);
          alert("Post deleted successfully!");
          this.goBack();
        } catch (error) {
          alert("Failed to delete post. Please try again.");
        }
      }
    },
    goBack() {
      this.$router.push("/");
    },
    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("en-US", options);
    },
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === "RESET_LIKES") {
        this.isLiked = false;
      }
    });
  },
};
</script>

<style scoped>
/* Existing styles omitted for brevity */

.post-actions {
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  border-top: 1px solid #eee;
}

.button {
  padding: 10px 16px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.edit-button {
  background-color: #4caf50;
  color: white;
}

.edit-button:hover {
  background-color: #45a049;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #e41e1e;
}

.back-button {
  background-color: #2196f3;
  color: white;
}

.back-button:hover {
  background-color: #1e88e5;
}
</style>
