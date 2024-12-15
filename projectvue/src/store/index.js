import { createStore } from "vuex";

export default createStore({
  state: {
    posts: JSON.parse(localStorage.getItem("posts")) || [], // Load from localStorage
    isLoading: false,
    error: null,
  },
  getters: {
    getAllPosts: (state) => state.posts,
    getPostById: (state) => (id) => {
      return state.posts.find((post) => post.id === id);
    },
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error,
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
      localStorage.setItem("posts", JSON.stringify(posts)); // Save to localStorage
    },
    INCREMENT_LIKES(state, postId) {
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.likes++;
        localStorage.setItem("posts", JSON.stringify(state.posts)); // Persist updated posts
      }
    },
    RESET_LIKES(state) {
      state.posts.forEach((post) => (post.likes = 0));
      localStorage.setItem("posts", JSON.stringify(state.posts)); // Persist reset posts
    },
  },
  actions: {
    async fetchPosts({ commit, state }) {
      if (state.posts.length > 0) {
        // Skip fetch if posts already exist in state
        return;
      }
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status} - ${response.statusText}`);
        }
        const posts = await response.json();
        commit("SET_POSTS", posts);
      } catch (error) {
        commit("SET_ERROR", error.message);
        console.error("Error fetching posts:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
});
