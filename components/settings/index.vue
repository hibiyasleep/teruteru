<template>
  <main class="settings-wrap">
    <header>
      <button class="weather-shaped-button close" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path d="M3 1.6 l5,5 l5,-5 l1.4,1.4 l-5,5 l5,5 l-1.4,1.4 l-5,-5 l-5,5 l-1.4,-1.4 l5,-5 l-5,-5z" />
        </svg>
      </button>
      <div class="title">
        <h1> {{ name }} </h1>
        <h2> {{ version }} '{{ releasename }}' </h2>
      </div>
      <ul class="nav">
        <li @click="() => $refs.changelog.scrollIntoView()">
          <img class="weather-icon" src="../../assets/icon/060277.png" />
        </li>
        <!-- Changelog -->
        <li @click="() => $refs.common.scrollIntoView()">
          <img class="weather-icon" src="../../assets/icon/060218.png" />
        </li>
        <!-- 기본 -->
        <li @click="() => $refs.credits.scrollIntoView()">
          <img class="weather-icon" src="../../assets/icon/060269.png" />
        </li>
        <!-- Credits -->
      </ul>
    </header>
    <div class="content">
      <section>
        <header ref="changelog">
          <img class="weather-icon" src="../../assets/icon/060277.png" />
          Changelog
        </header>
        <p class="changelog">
          <img class="weather-icon" src="../../assets/icon/060201.png" />
          <b> 0.1.1 'Virtual Sunrise' </b>
          <ul>
            <li> 설정 페이지 아이콘 문제 수정 </li>
            <li> 위치 확인불가 오류 추가 </li>
            <li> 정렬 방향 설정 추가 </li>
            <li> 크기조절 추가 </li>
          </ul>
        </p>
        <p class="changelog">
          <img class="weather-icon" src="../../assets/icon/060216.png" />
          <b> 0.1.0 'snow storm' </b>
          <ul>
            <li> 첫 릴리즈 </li>
          </ul>
        </p>
      </section>
      <section>
        <header ref="common">
          <img class="weather-icon" src="../../assets/icon/060218.png" />
          기본
        </header>
        <label class="settings-block">
          <input
            type="checkbox"
            class="weather-shaped-button"
            v-model="show_current_weather" />
          현재 날씨도 표시하기
        </label>
        <label class="settings-block">
          <input
            type="checkbox"
            class="weather-shaped-button"
            v-model="abstime" />
          절대 시간으로 표시
        </label>
        <label class="settings-block">
          <input
            type="checkbox"
            class="weather-shaped-button"
            v-model="hide_seconds" />
          초 단위 숨기기
        </label>
        <label class="settings-block">
          <input
            type="number"
            min="1" max="10"
            class="weather-shaped-button"
            v-model="predict_length"
            @click="adjust_number('predict_length', +1)"
            @click.right.prevent="adjust_number('predict_length', -1)" />
          예보할 단위시간 수
          <i>(좌/우클릭으로 조정)</i>
        </label>
        <label class="settings-block">
          <input
            type="number"
            min="1" max="10"
            class="weather-shaped-button"
            v-model="ui_scale"
            @click="adjust_number('ui_scale', +1)"
            @click.right.prevent="adjust_number('ui_scale', -1)" />
          인터페이스 크기
          <i>(좌/우클릭으로 조정; 기본 4)</i>
        </label>
        <label class="settings-block">
          <input
            type="checkbox"
            class="weather-shaped-button"
            v-model="align_right" />
          오른쪽 정렬
        </label>
      </section>
      <section>
        <header ref="credits">
          <img class="weather-icon" src="../../assets/icon/060269.png" />
          Credits
        </header>
        <label class="settings-block">
          <img class="weather-icon" src="../../assets/icon/060256.png" />
          히비야 <i> @hibiyasleep </i>
        </label>
        <header>
          <img class="weather-icon" src="../../assets/icon/060214.png" />
          Special Thanks
        </header>
        <label class="settings-block">
          <img class="weather-icon" src="../../assets/icon/060260.png" />
          모카 <i> @Life_is_FF14 </i>
        </label>
      </section>
    </div>
  </main>
</template>

<script>

import packageinfo from '../../package.json'

const _computedGetter = (keys) => {
  let o = {}
  for(let key of keys) {
    o[key] = {
      get() { return this.$store.state.settings[key] },
      set(v) { this.$store.commit('settings/set', { k: key, v })}
    }
  }
  return o
}

export default {
  data: () => ({
    name: packageinfo.name,
    version: packageinfo.version,
    releasename: packageinfo.releasename
  }),
  methods: {
    adjust_number(key, delta) {
      let after = parseInt(this[key]) + delta
      if(after < 1 || 10 < after) {
        return
      }
      this[key] = after
    },
    scroll_to(el) {
      console.log(this.$refs[el])
    },
    close() {
      this.$store.commit('ui/close')
    }
  },
  computed: {
    ..._computedGetter([
      'hide_seconds',
      'abstime',
      'show_current_weather',
      'predict_length',
      'ui_scale',
      'align_right'
    ])
  }
}

</script>

<style lang="sass">

.settings-wrap
  flex-grow: 100000
  background: rgba(0, 0, 0, 0.25)

  > header
    display: flex
    align-items: center
    position: relative
    height: 3.125rem
    padding: 0.25rem 0.5rem

    background: rgba(0, 0, 0, 0.25)

    .close
      margin-right: 0.5rem

    .title
      flex-grow: 1

      h1, h2
        margin: 0
        padding: 0
        font-weight: inherit

      h1
        color: $primary
        font-size: 1.25rem
        margin-top: -0.25rem

      h2
        font-size: 0.875rem

    .nav
      list-style: none

      margin: 0
      padding: 0

      li
        display: inline-block

  .content
    height: calc(100% - 3.125rem)
    padding: 0.5rem
    overflow-y: scroll

  section
    margin-bottom: 0.75rem
    background-image: linear-gradient(to right, #666, #666)
    background-size: 0.25rem calc(100% - 1.5rem)
    background-position: 0.875rem center
    background-repeat: no-repeat

    header, .changelog, .settings-block
      display: block
      margin: 0
      line-height: 2rem
      vertical-align: top

      i
        font-style: normal
        font-size: 0.75em
        opacity: 0.5

    header
      font-weight: 600

    .changelog

      ul
        line-height: 1.5rem
        margin: 0 0 0 2.25rem
        padding: 0
        list-style: none

        li
        font-size: 0.875rem

    .settings-block
      font-size: 0.875rem

    .weather-shaped-button, img
      vertical-align: top

</style>
