import { createStore } from "vuex";

export default createStore({
  state: {
    posts: Array.from({ length: 10 }, (v, i) => ({
      id: i + 1,
      title: `Post Title ${i + 1}`,
      body: `Post content for post ${i + 1}.`,
      likes: 0,
    })),
  },
  mutations: {
    incrementLikes(state, postId) {
      const post = state.posts.find(post => post.id === postId);
      if (post) post.likes++;
    },
    resetLikes(state) {
      state.posts.forEach(post => (post.likes = 0));
    },
  },
});
