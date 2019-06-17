import Vue from 'vue'
import Vuex from 'vuex'

import Weather from './data/Weather.json'
import WeatherRate from './data/WeatherRate.json'
import WeatherTerritory from './data/WeatherTerritory.json'

import index from './index.vue'
import store from './store'

// import install from './lib/util'

import detectLayer from './lib/layer'
import initateLayer from './store/_initateLayer'

// install(Vue)

// https://stackoverflow.com/questions/36170425/detect-click-outside-element
// TODO: move into another module
// Vue.directive('click-outside', {
//   bind(el, binding, vnode) {
//     el.clickOutsideEvent = function (event) {
//       if (!(el == event.target || el.contains(event.target))) {
//         vnode.context[binding.expression](event)
//       }
//     }
//     document.body.addEventListener('click', el.clickOutsideEvent)
//   },
//   unbind(el) {
//     document.body.removeEventListener('click', el.clickOutsideEvent)
//   }
// })

Vue.prototype.$w = {
  list: Weather,
  rate: WeatherRate,
  territory: WeatherTerritory
}

const vm = window.rootvm = new Vue({
  components: { index },
  el: '#vue-root',
  store,
  template: '<index />',
  watch: {
    ['$store.state.settings.ui_scale'](to, from) {
      this.$store.dispatch('settings/update_style')
    }
  },
  mounted() {
    this.$store.dispatch('settings/update_style')
    setInterval(() => store.commit('weather/tick'), 200)
  }
})

const layer = window.layer = Vue.prototype.$layer = new (detectLayer())
initateLayer(layer)

// if(process.env.NODE_ENV === 'development') {
//   layer.emit('data', dummy)
// }
