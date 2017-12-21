<template>
    <div class="step">
        <span class="next" :class="flag === 3?'sure':''" @click="next(flag)" >
          <img src="static/img/btn_next.png" v-if="flag !== 3">
          <i v-if="flag === 3" :class="seIndex===null?'chanColor':''">确定</i>
          <!-- 正确音效 -->
          <audio src="/static/audio/right.wav" ref="right" > </audio>
           <!-- 错误音效 -->
          <audio src="/static/audio/error.wav" ref="error" > </audio>
        </span>
        <span class="sound" v-if="flag !== 3" @click="soundOpen(flag)">
          <img src="static/img/btn_sound.png" alt="" >
        </span>
        <div v-for="(item, index) in getFirstDealWords"  v-if="flag === 1 && index === 0">
            <audio :src="preUrl + '/'+ val" ref="syll" v-for="(val, k) in item.audio_right" autoplay="autoplay" v-if="flag && k === 0"></audio>
        </div>
        <div v-for="(item, i) in getSecondDealWords" v-if="flag ===2 && i === 0">
            <audio :src="preUrl + '/'+ val" ref="syll" v-for="(val, k) in item.audio_right"  autoplay="autoplay" v-if="flag && k === 0"></audio>
        </div>

  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      preUrl: process.env.API_PIC
    }
  },
  created () {
  },
  mounted () {
    this.soundOpen()
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getFirstDealWords', 'getSecondDealWords']),
    ...mapState('learnWords', ['flag', 'seIndex', 'rightIndex', 'rightShow']),
    ...mapState('common/wordsStore', ['step'])
  },
  methods: {
    next (index) {
      if (this.flag !== 3) {
        let flags = null
        flags = this.flag === 1 ? flags = 2 : (this.flag === 2 ? flags = 3 : flags = 1)
        this.$store.commit('learnWords/FLAG', { flag: flags })
      } else {
        if (this.seIndex !== null && this.seIndex === this.rightIndex) {
          this.$store.commit('learnWords/RIGHTSHOW', { rightShow: {bool: true} })
          this.$refs.right.play()
          setTimeout(() => {
            let flags = null
            flags = this.flag === 1 ? flags = 2 : (this.flag === 2 ? flags = 3 : flags = 1)
            this.$store.commit('learnWords/FLAG', { flag: flags })
            this.$store.commit('learnWords/SEINDEX', {seIndex: null})
            this.$store.commit('learnWords/RIGHTINDEX', { rightIndex: null })
          }, 1000)
        } else {
          this.$refs.error.play()
        }
      }
    },
    soundOpen () {
      if (this.$refs.syll) {
        this.$refs.syll[0].play()
      }
    }
  }
}
</script>
