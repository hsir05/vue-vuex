<template lang="html">
  <div class="nursery-rhyme">
    <template v-if="!reqLoading">
      <!-- 倒计时开始进入 -->
      <start-enter v-if="!isTimeWaitFinish"></start-enter>
      <!-- 主体 儿歌开篇 -->
      <openings v-if="beinState === 'wait_item' || beinState === 'delay' || beinState === 'openings'"></openings>
      <!-- 儿歌句子 -->
      <sentence v-else></sentence>
    </template>
    <audio-play :src="currAudioSrc" :autoplay="true" id="nursery"></audio-play>
  </div>
</template>

<script>
import Openings from './openings.vue'
import StartEnter from './start-enter.vue'
import Sentence from './sentence.vue'

import { Indicator } from 'mint-ui'
import { mapState, mapGetters } from 'vuex'
import AuddioAutoPlay from '../../mixins/audio-auto-play.js'
export default {
  mixins: [AuddioAutoPlay],
  components: {
    Openings, StartEnter, Sentence
  },
  created () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    this.$store.dispatch('nurseryRhyme/getNurseryRhyme').then(() => {
      Indicator.close()
      // this.$store.dispatch('nurseryRhyme/delayChildSongs')
      this.$store.dispatch('nurseryRhyme/timeWait').then(() => {
        this.$store.dispatch('nurseryRhyme/delayChildSongs')
        this.playAudio('nursery')// mixin引入
      })
    })
    window.onpopstate = function () { // 当url发生变化时，清除页面所有的定时器
      var end = setTimeout(function () {}, 1)
      var start = (end - 100) > 0 ? end - 100 : 0
      for (var i = start; i <= end; i++) {
        clearTimeout(i)
      }
    }
  },
  computed: {
    ...mapState('nurseryRhyme', ['reqLoading', 'beinState', 'currAudioSrc']),
    ...mapGetters('nurseryRhyme', ['isTimeWaitFinish'])
  }
}
</script>
