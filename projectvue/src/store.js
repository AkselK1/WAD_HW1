// store.js
export const store = {
    state() {
      return {
        posts: [
          { id: 1, content: 'Post 1 content', likes: 0 },
          { id: 2, content: 'Post 2 content', likes: 0 },
          { id: 3, content: 'Post 3 content', likes: 0 },
          // Lisage siia vähemalt 10 postitust
        ]
      };
    },
    mutations: {
      incrementLikes(state, postId) {
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          post.likes++;
        }
      },
      resetLikes(state) {
        state.posts.forEach(post => {
          post.likes = 0;
        });
      }
    }
  };
  