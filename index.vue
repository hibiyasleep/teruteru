<template>
  <div>
    <nav v-if="opened_window === 'hello'" @click="close">
      {{ name }} v{{ version }} '{{ releasename }}'
      <br /> 날씨 아이콘을 클릭해서 메뉴를 열 수 있습니다.
    </nav>
    <overlay />
    <settings v-if="opened_window === 'settings'"/>
  </div>
</template>

<script>

import { mapState } from 'vuex'

import packageinfo from './package.json'

import Overlay from './components/overlay'
import Settings from './components/settings'

export default {
  components: {
    Overlay,
    Settings
  },
  data: () => ({
    name: packageinfo.name,
    version: packageinfo.version,
    releasename: packageinfo.releasename
  }),
  methods: {
    close() { this.$store.commit('ui/close') }
  },
  computed: {
    ...mapState('ui', [ 'opened_window' ])
  },
  mounted() {
    if(packageinfo.version !== this.$store.state.settings.last_version) {
      this.$store.commit('settings/set', {
        k: 'last_version',
        v: packageinfo.version
      })
    }
  }
}

</script>

<style lang="sass">

@import styles/variables
@import styles/index
@import styles/elements

.weather-wrap
  display: flex
  margin: 0
  padding: 0
  list-style: none

</style>
