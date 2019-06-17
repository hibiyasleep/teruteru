import Vue from 'vue'
import Vuex from 'vuex'

const _state = () => ({
  pwd: 0,
  last_version: null,
  align_right: false,
  abstime: false,
  hide_seconds: false,
  show_current_weather: true,
  predict_length: 5,
  ui_scale: 5,
  pinned_regions: [ 399 ]
})

export default {
  state: _state(),
  mutations: {
    setpwd(state, [ id ]) {
      state.pwd = parseInt(id, 16)
    },
    set(state, { k, v }) {
      Vue.set(state, k, v)
    },
    move_up_pinned(state, index) {
      const [ item ] = state.pinned_regions.splice(index, 1)
      state.pinned_regions.splice(index - 1, 0, item)
    },
    add_pin(state, pwd) {
      state.pinned_regions.splice(0, 0, pwd)
    },
    remove_pin(state, index) {
      state.pinned_regions.splice(index, 1)
    }
  },
  getters: {
  },
  actions: {
    update_style({ state }) {
      window.document.body.parentElement.style.fontSize = (parseInt(state.ui_scale) + 12) + 'px'
    }
  },
  namespaced: true
}
