import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${userData.token}`;
    }
  },
  actions: {
    async register ({ commit }, credentials) {
      const { data } = await axios
        .post('http://localhost:3000/register', credentials);
      console.log('user data is ', data);
      commit('SET_USER_DATA', data);
    },
    async login({ commit }, credentials) {
      const { data } = await axios
        .post('http://localhost:3000/login', credentials);
      console.log('user data is ', data);
      commit('SET_USER_DATA', data);
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    }
  }
});
