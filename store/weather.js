import Vue from 'vue'
import Vuex from 'vuex'

const _state = () => ({
  now: Date.now()
})

export default {
  state: _state(),
  mutations: {
    tick(state) {
      state.now = Date.now()
    }
  },
  getters: {
    now_floor: state => 70 * 60 * 1000 * Math.floor(state.now / (70 * 60 * 1000)),
    remain: state => (1400000 - (state.now % 1400000)) / 1000
  },
  actions: {
  },
  namespaced: true
}
