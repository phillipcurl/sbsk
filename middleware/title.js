export default function({ store }) {
  store.commit('SET_TITLE', '');
  store.commit('SET_RESULTS', null);
  // store.commit('SET_NAVHEIGHT', 0);
  store.commit('SET_CRUMB', '');
  store.commit('blog/SET_POSTCAT', '');
  store.commit('blog/SET_THUMB', '');
  store.commit('paginateOn', false);
  if (store.state.menuIsActive === !false) {
    store.commit('setMenuState', false);
  }
}
