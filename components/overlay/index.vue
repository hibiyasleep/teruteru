<template>
  <main :class="[ 'region-list', 'align-' + (align_right? 'right' : 'left') ]">
    <region :id="pwd" v-if="pwd" v-slot="slot">
      <li class="weather-cell button" @click="open('settings')">
        <button class="weather-shaped-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M13.3 8l-.1.7 1.5 1.1c.1.1.2.3 0 .5l-1.3 2.4c-.1.2-.3.2-.5.2l-1.7-.7-1.2.7-.3 1.8c0 .2-.1.3-.3.3H6.6a.4.4 0 0 1-.3-.3L6 12.9a5 5 0 0 1-1.2-.7l-1.7.7c-.2 0-.4 0-.5-.2l-1.4-2.4.1-.5 1.5-1.1a5 5 0 0 1 0-1.4L1.3 6.2a.4.4 0 0 1 0-.5l1.3-2.4c.1-.2.3-.2.5-.2l1.7.7L6 3.2l.3-2s.1-.2.3-.2h2.8c.2 0 .3.1.3.3L10 3l1.2.7 1.7-.7c.2 0 .4 0 .5.2l1.4 2.4-.1.5-1.5 1.1V8M8 6a2 2 0 0 0-2 2c0 1.1.9 2 2 2s2-.9 2-2a2 2 0 0 0-2-2z" />
          </svg>
        </button>
        <label>
          설정
        </label>
      </li>
      <li
        @click="pinpwd"
        :class="[ 'weather-cell button', { disabled: pwd_already_pinned || slot.staticWeather }]">
        <button class="weather-shaped-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M7 1h2v6h6v2h-6v6h-2v-6h-6v-2h6z" />
          </svg>
        </button>
        <label>
          고정
        </label>
      </li>
    </region>
    <template v-if="ui_state !== 'settings'">
      <region v-for="(region, index) in pinned_regions" :id="region" :key="region">
        <li
          @click="move_up_pinned(index)"
          :class="[ 'weather-cell button', { disabled: index === 0 } ]">
          <button class="weather-shaped-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="M8 2l8,8l-2,2l-6,-6l-6,6l-2,-2" />
            </svg>
          </button>
          <label>
            위로
          </label>
        </li>
        <li
          @click="remove_pin(index)"
          class="weather-cell button">
          <button class="weather-shaped-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="M1 7h14v2h-14z" />
            </svg>
          </button>
          <label>
            제거
          </label>
        </li>
      </region>
    </template>
  </main>
</template>


<script>

import { mapState, mapMutations } from 'vuex'

import step from '../../lib/step.js'

import Region from './region.vue'

export default {
  components: {
    Region
  },
  data: () => ({
    // search: '',
    now: Date.now()
  }),
  methods: {
    ...mapMutations('ui', [
      'open'
    ]),
    ...mapMutations('settings', [
      'move_up_pinned',
      'add_pin',
      'remove_pin'
    ]),
    pinpwd() {
      if(this.pinned_regions.indexOf(this.pwd) !== -1) {
        return
      }
      this.add_pin(this.pwd)
    }
  },
  computed: {
    ...mapState('ui', [
      'ui_state'
    ]),
    ...mapState('settings', [
      'pwd',
      'align_right',
      'pinned_regions'
    ]),
    remain() {
      return (1400000 - (this.now % 1400000)) / 1000
    },
    now_floor() {
      return this.now - (this.now % (70 * 60 * 1000))
    },
    pwd_already_pinned() {
      return this.pinned_regions.indexOf(this.pwd) !== -1
    }
  },
  mounted() {
    setInterval(() => this.now = Date.now(), 200)
  }
}

</script>

<style lang="sass">

.region-list.align-right
  text-align: right

  .weather-wrap
    justify-content: flex-end

</style>
