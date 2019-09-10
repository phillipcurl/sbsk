export const state = () => ({
  siteInfo: [],
  connect: [],
  blogTitle: '',
  theCrumb: '',
  allCats: [],
  results: [],
  resultsnum: [],
  pagination: false
});

export const actions = {
  async nuxtServerInit({ dispatch }) {
    try {
      await dispatch('getSiteInfo');
      await dispatch('blog/fetchBlogData');
      await dispatch('pages/getPages');
    } catch (e) {
      console.log(e);
    }
  },
  getSiteInfo({ state, commit }) {
    try {
      const info = require('~/content/setup/info.json');
      const connect = require('~/content/setup/connect.json');
      commit('SET_INFO', info);
      commit('SET_CONNECT', connect);
    } catch (e) {
      commit('SET_INFO', {});
      commit('SET_CONNECT', {});
    }
  }
};

export const mutations = {
  SET_CRUMB(state, data) {
    state.theCrumb = data;
  },
  SET_INFO(state, data) {
    state.siteInfo = data;
  },
  SET_CONNECT(state, data) {
    state.connect = data;
  },
  SET_RESULTS(state, data) {
    state.results = data;
  },
  SET_TITLE(state, data) {
    state.blogTitle = data;
  },
  paginateOn(state, data) {
    state.pagination = data;
  },
  paginateOff(state, data) {
    state.pagination = data;
  },
  resultsLength(state, data) {
    state.resultsnum = data;
  }
};
