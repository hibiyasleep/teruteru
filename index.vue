<template>
  <div class="root">
    <nav v-if="ui_state === 'hello' || ui_state === 'updated' || !pwd" @click="$store.commit('ui/open', pwd? null : 'settings')">
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
    open(w) { this.$store.commit('ui/open') }
  },
  computed: {
    ...mapState('settings', [ 'pwd' ]),
    ...mapState('ui', [ 'ui_state' ])
  },
  mounted() {
    const lv = this.$store.state.settings.last_version
    if(lv !== packageinfo.version) {
      this.$store.commit('ui/open', lv? 'updated' : 'hello')
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

html, body, #vue-root, .root
  height: 100%

.root
  display: flex
  flex-direction: column
  align-items: stretch
</style>
