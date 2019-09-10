export const state = () => ({
  blogPosts: [],
  blogTitle: '',
  allTags: [],
  theThumbnail: '',
  theCategory: '',
  allCategories: []
});

export const actions = {
  fetchBlogData({ dispatch }) {
    return Promise.all([
      dispatch('getBlogPosts'),
      dispatch('getCategories'),
      dispatch('getTags')
    ]);
  },
  async getBlogPosts({ state, commit }) {
    try {
      const context = await require.context(
        '~/content/blog/posts/',
        false,
        /\.json$/
      );

      const searchposts = await context.keys().map((key) => ({
        ...context(key),
        _path: `/blog/${key.replace('.json', '').replace('./', '')}`
      }));

      commit('SET_POSTS', searchposts.reverse());
    } catch (error) {
      commit('SET_POSTS', []);
    }
  },

  async getCategories({ state, commit }) {
    try {
      const context = await require.context(
        '~/content/categories/posts/',
        false,
        /\.json$/
      );

      const pages = await context.keys().map((key) => ({
        ...context(key),
        _path: `/category/${key.replace('.json', '').replace('./', '')}`
      }));

      commit('SET_CATEGORIES', pages);
    } catch (e) {
      commit('SET_CATEGORIES', []);
    }
  },
  async getTags({ state, commit }) {
    try {
      const context = await require.context(
        '~/content/tags/posts/',
        false,
        /\.json$/
      );

      const pages = await context.keys().map((key) => ({
        ...context(key),
        _path: `/tagged/${key.replace('.json', '').replace('./', '')}`
      }));

      commit('SET_TAGS', pages);
    } catch (e) {
      commit('SET_TAGS', []);
    }
  }
};

export const mutations = {
  SET_POSTS(state, data) {
    state.blogPosts = data;
  },
  SET_CATEGORIES(state, data) {
    state.allCategories = data;
  },
  SET_POSTCAT(state, data) {
    state.theCategory = data;
  },
  SET_TAGS(state, data) {
    state.allTags = data;
  },
  SET_THUMB(state, data) {
    state.theThumbnail = data;
  },
  SET_TITLE(state, data) {
    state.blogTitle = data;
  }
};
