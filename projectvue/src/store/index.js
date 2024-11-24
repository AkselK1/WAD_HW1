import { createStore } from "vuex";

export default createStore({
  state: {
    posts: [], // Empty initial state
    isLoading: false, // Add loading state
    error: null // Add error handling
  },
  getters: {
    // Add getters to access store data
    getAllPosts: (state) => state.posts,
    getPostById: (state) => (id) => {
      return state.posts.find(post => post.id === id);
    },
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
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
    },
    INCREMENT_LIKES(state, postId) {
      const post = state.posts.find(post => post.id === postId);
      if (post) post.likes++;
    },
    RESET_LIKES(state) {
      state.posts.forEach(post => (post.likes = 0));
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const response = await import('./posts.json');
        commit('SET_POSTS', response.default);
      } catch (error) {
        commit('SET_ERROR', error.message);
        console.error("Error fetching posts:", error);
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
});