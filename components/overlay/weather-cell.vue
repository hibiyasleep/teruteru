<template>
  <li class="weather-cell">
    <img :src="`./assets/icon/${weather.image}.png`" :alt="weathername" />
    <label class="hover"> {{ weathername }} </label>
    <label v-if="step === -1">
      ---
    </label>
    <label v-else-if="abstime">
      {{ abs }}
    </label>
    <label v-else>
      {{ m }}<template v-if="!hide_seconds">:{{ s }}</template>
    </label>
  </li>
</template>

<script>

import calculateStep from '../../lib/step.js'

export default {
  props: {
    rate: Array,
    step: Number,
    remain: Number
  },
  computed: {
    hide_seconds() {
      return this.$store.state.settings.hide_seconds
    },
    abstime() {
      return this.$store.state.settings.abstime
    },
    _step() {
      // console.log(new Date(this.step))
      return calculateStep(0, this.step)
    },
    weathername() {
      if(!this.rate) {
        return
      }

      let incr = 0
      for(let [ weather, prob ] of this.rate) {
        incr += prob
        if(incr >= this._step) {
          return weather
        }
      }
      return '???'
    },
    weather() {
      return this.$w.list[this.weathername]
    },
    abs() {
      const d = new Date()
      const t = d / 1000 + this.remain - (d.getTimezoneOffset() * 60)
      const h = ~~((t / 60 / 60) % 24)
      const m = ~~((t / 60) % 60)
      return [h, m].map(_ => ('00' + _).slice(-2)).join(':')
    },
    m() {
      let r = ~~(this.remain / 60)
      if(!r && this.remain < 0) {
        return '-0'
      } else {
        return r
      }
    },
    s() {
      const v = Math.abs(~~(this.remain % 60))
      return ('00' + v).slice(-2)
    }
  }
}

</script>

<style lang="sass">

.weather-cell
  display: flex
  flex-direction: column
  align-items: center
  text-align: center

  width: 2.75rem

  color: $primary

  .hover
    display: none

  > label
    @include text-thick-shadow

    color: $secondary
    font-size: 0.875rem
    line-height: 1rem
    text-align: right
    word-break: keep-all
    white-space: nowrap
    letter-spacing: -0.3px

  &.button > label
    margin-right: 0

  img:hover
    ~ .hover
      display: inline-block
    ~ label
      display: none

</style>
