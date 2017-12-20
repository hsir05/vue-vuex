<template>
    <div class="step">
        <span class="next" :class="flag === 3?'sure':''" @click="next(flag)" >
          <img src="static/img/btn_next.png" v-if="flag !== 3">
          <i v-if="flag === 3" :class="seIndex===null?'chanColor':''">确定</i>
        </span>
        <span class="sound" v-if="flag !== 3" @click="soundOpen(flag)">
          <img src="static/img/btn_sound.png" alt="" >
        </span>
        <div v-for="item in getFirstDealWords"  v-if="flag === 1">
            <audio :src="preUrl + '/'+ val" ref="syll" v-for="(val, k) in item.audio_right" v-if="flag"></audio>
        </div>
      <div v-for="item in getSecondDealWords" v-if="flag ===2">
            <audio :src="preUrl + '/'+ val" ref="syll" v-for="(val, k) in item.audio_right" v-if="flag"></audio>
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
    ...mapState('learnWords', ['flag', 'seIndex', 'rightIndex', 'rightShow'])
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
          setTimeout(() => {
            let flags = null
            flags = this.flag === 1 ? flags = 2 : (this.flag === 2 ? flags = 3 : flags = 1)
            this.$store.commit('learnWords/FLAG', { flag: flags })
            this.$store.commit('learnWords/SEINDEX', {seIndex: null})
            this.$store.commit('learnWords/RIGHTINDEX', { rightIndex: null })
          }, 2000)
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
