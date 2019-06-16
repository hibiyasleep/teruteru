import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import ui from './ui'
import weather from './weather'
import settings from './settings'

export default new Vuex.Store({
  modules: {
    ui,
    weather,
    settings
  },
  plugins: [
    createPersistedState({
      key: 'portable-pop-settings#beta',
      paths: [ 'settings' ]
    })
  ]
})
