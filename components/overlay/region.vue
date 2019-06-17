<template>
  <div class="region-wrap">
    <header>
      <label> {{ pwd.region[2] }} </label>
    </header>
    <ul class="weather-wrap">
      <slot
        v-if="ui_state === 'edit'"
        :static-weather="rate.length <= 1"></slot>
      <template v-if="rate.length > 1">
        <weather-cell
          v-for="index in (predict_length + show_current_weather)"
          :key="index"
          :rate="rate"
          :step="now_floor + ((index + 0 + show_current_weather) * 70 * 60 * 1000 / 3)"
          :remain="remain + (index - 1 - show_current_weather) * 70 / 3 * 60"
          @click.native="toggle_edit_mode" />
      </template>
      <weather-cell :rate="rate" :step="-1" v-else />
    </ul>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

import WeatherCell from './weather-cell.vue'

export default {
  components: {
    WeatherCell
  },
  props: {
    id: Number
  },
  methods: {
    toggle_edit_mode() {
      const state = this.$store.state.ui.ui_state
      if(state === 'edit') {
        this.$store.commit('ui/close')
      } else if(state === 'hello' || !state) {
        this.$store.commit('ui/open', 'edit')
      }
    }
  },
  computed: {
    ...mapGetters('weather', [
      'now_floor',
      'remain'
    ]),
    ...mapState('ui', [
      'ui_state'
    ]),
    ...mapState('settings', [
      'show_current_weather',
      'predict_length'
    ]),
    pwd() {
      return this.$w.territory[this.id]
    },
    rate() {
      return this.$w.rate[this.pwd.rate]
    }
  }
}

</script>

<style lang="sass">

.region-wrap
  margin: 0 0 0 0.75rem
  color: $primary
  height: 4.375rem

  header
    label
      @include text-thick-shadow($dy: 0.5rem)

  .weather-message
    color: $primary
    padding-left: 1rem

    > span
      @include text-thick-shadow($dy: 0.75rem)

.weather-wrap
  display: flex
  margin: 0
  padding: 0
  list-style: none

.weather-cell.disabled
  .weather-shaped-button
    fill: rgba(255, 255, 255, 0.1)

  label
    color: transparentize($secondary, 0.66)

</style>
