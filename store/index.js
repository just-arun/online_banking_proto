
import axios from 'axios'

export const state = () => ({
  authUser: null,
  respond: null,
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user;
  },
  INIT_RES: function (state, res) {
    state.respond = res;
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  async login({ commit }, { name, pwd, otp }) {
    try {
      const { data } = await axios.post('/api/login/otp', { name, pwd, otp })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async loginf({ commit }, { name, pwd }) {
    try {
      const { data } = await axios.post('/api/login', { name, pwd })
      commit('INIT_RES', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Auth failed')
      }
      throw error
    }
  },

  async logout({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  }

}


