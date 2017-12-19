<template lang="html">
  <div class="nursery-rhyme">
    <template v-if="!reqLoading">
      <!-- 倒计时开始进入 -->
      <start-enter v-if="!isTimeWaitFinish"></start-enter>
      <!-- 主体 儿歌开篇 -->
      <openings v-if="beinState === 'wait_item' || beinState === 'delay' || beinState === 'openings'"></openings>
      <!-- 儿歌句子 -->
      <sentence></sentence>
    </template>
    <audio-play :src="currAudioSrc" :autoplay="true"></audio-play>
  </div>
</template>

<script>
import Openings from './openings.vue'
import StartEnter from './start-enter.vue'
import Sentence from './sentence.vue'

import { Indicator } from 'mint-ui'
import { mapState, mapGetters } from 'vuex'
export default {
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
      this.$store.dispatch('nurseryRhyme/delayChildSongs')
      // this.$store.dispatch('nurseryRhyme/timeWait').then(() => {
      //   this.$store.dispatch('nurseryRhyme/delayChildSongs')
      // })
    })
  },
  computed: {
    ...mapState('nurseryRhyme', ['reqLoading', 'beinState', 'currAudioSrc']),
    ...mapGetters('nurseryRhyme', ['isTimeWaitFinish'])
  }
}
</script>

<style lang="css">
</style>
