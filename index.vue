<template>
  <div>
    <nav v-if="ui_state === 'hello' || ui_state === 'updated' || !pwd" @click="close">
      {{ name }} v{{ version }} '{{ releasename }}'
      <br />
      <label v-if="!pwd">
        위치를 확인할 수 없습니다.
      </label>
      <label v-else-if="ui_state === 'updated'">
        업데이트되었습니다.
      </label>
      <label v-else>
        날씨 아이콘을 클릭해서 메뉴를 열 수 있습니다.
      </label>
    </nav>
    <overlay />
    <settings v-if="ui_state === 'settings'"/>
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
    ...mapState('ui', [ 'ui_state' ])
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


</style>
