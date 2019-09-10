export const state = () => ({
  allPages: []
});

export const actions = {
  async getPages({ state, commit }) {
    try {
      const context = await require.context(
        '~/content/page/posts/',
        false,
        /\.json$/
      );

      const pages = await context.keys().map((key) => ({
        ...context(key),
        _path: `/${key.replace('.json', '').replace('./', '')}`
      }));

      commit('SET_PAGES', pages);
    } catch (e) {
      commit('SET_PAGES', []);
    }
  }
};

export const mutations = {
  SET_PAGES(state, data) {
    state.allPages = data;
  }
};
