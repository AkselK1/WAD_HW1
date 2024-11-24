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
        <img :src="post.image_url" :alt="post.title" class="post-image"/>
      </div>

      <div class="post-content">
        <p>{{ post.content }}</p>
      </div>

      <div class="post-footer">
        <div class="tags-container">
          <span v-for="tag in post.tags" 
                :key="tag" 
                class="tag">
            #{{ tag }}
          </span>
        </div>
        
        <button
          @click="likePost"
          class="like-button"
          :class="{ 'liked': isLiked }"
        >
          <span class="heart-icon">{{ isLiked ? '❤️' : '🤍' }}</span>
          <span class="likes-count">{{ post.likes }}</span>
        </button>
      </div>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
  <div v-else class="loading-spinner">
    Loading post...
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "AppPost",
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isLiked: false
    }
  },
  computed: {
    ...mapGetters(['getPostById', 'getIsLoading', 'getError']),
    post() {
      return this.getPostById(this.postId);
    },
    isLoading() {
      return this.getIsLoading;
    },
    error() {
      return this.getError;
    }
  },
  methods: {
    likePost() {
      if (!this.isLiked) {
        this.$store.commit("INCREMENT_LIKES", this.postId);
        this.isLiked = true;
      }
    },
    formatDate(dateString) {
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
      return new Date(dateString).toLocaleDateString('en-US', options)
    }
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'RESET_LIKES') {
        this.isLiked = false;
      }
    })
  }
};
</script>

<style scoped>
.post-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 24px auto;
  max-width: 800px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.post-header {
  padding: 20px 24px;
}

.post-title-section {
  margin-bottom: 8px;
}

.post-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.post-meta {
  color: #666;
  font-size: 14px;
}

.author-date {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author {
  font-weight: 600;
  color: #444;
}

.date-divider {
  color: #999;
}

.post-image-container {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-image:hover {
  transform: scale(1.02);
}

.post-content {
  padding: 24px;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

.post-footer {
  padding: 16px 24px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tags-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: #f5f5f5;
  color: #666;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.tag:hover {
  background: #eeeeee;
}

.like-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.like-button:hover {
  transform: scale(1.1);
}

.heart-icon {
  font-size: 20px;
}

.likes-count {
  font-weight: 600;
  color: #666;
}

.error-message {
  color: #dc3545;
  text-align: center;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  margin: 20px auto;
  max-width: 800px;
}

.loading-spinner {
  text-align: center;
  padding: 40px;
  color: #666;
}

.posts {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8f9fa;
}
</style>