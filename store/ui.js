import Vue from 'vue'
import Vuex from 'vuex'

const _state = () => ({
  ui_state: 'hello'
})

export default {
  state: _state(),
  mutations: {
    open(state, window) {
      state.ui_state = window
    },
    close(state) {
      state.ui_state = null
    }
  },
  getters: {
  },
  actions: {
  },
  namespaced: true
}
