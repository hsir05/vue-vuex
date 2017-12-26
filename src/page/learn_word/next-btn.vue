<template>
    <div class="step">
        <span class="next" :class="flag === 3?'sure':''" @click="next(flag)" >
          <img src="static/img/btn_next.png" v-if="flag !== 3">
          <i v-if="flag === 3" :class="seIndex===null?'chanColor':''">确定</i>
          <!-- 正确音效 -->
          <audio src="static/audio/right.wav" ref="right" > </audio>
           <!-- 错误音效 -->
          <audio src="static/audio/error.wav" ref="error" > </audio>
        </span>
        <span class="sound" v-if="flag !== 3" @click="soundOpen(flag)">
          <img src="static/img/btn_sound.png" alt="" >
        </span>
        <div v-for="(item, index) in getFirstDealWords"  v-if="flag === 1 && index === 0">
            <audio :src="preUrl + '/'+ val" ref="syll" v-for="(val, k) in item.audio_right" autoplay="autoplay" v-if="flag && k === 0"></audio>
        </div>
        <!-- <div v-for="(item, i) in audioSecond" v-if="flag ===2 && i === 0">{{item.audio_right}}
            <audio :src="preUrl + '/'+ val" ref="syll" v-for="(val, k) in item.audio_right" controls  autoplay="autoplay" v-if="flag && k === 0"></audio>
        </div> -->
          <div v-for="(item, i) in audioSecond.audio_right" v-if="flag ===2 ">
            <audio :src="preUrl + '/'+ item" ref="syll"   autoplay="autoplay" v-if="flag && i === 0"></audio>
        </div>

  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import PreventClickMixin from '../../mixins/prevent-click.js'
export default {
  mixins: [PreventClickMixin],
  data () {
    return {
      preUrl: process.env.API_PIC,
      audioSecond: ''
    }
  },
  created () {
  },
  mounted () {
    this.soundOpen()
    this.audioSecond = this.getSecondDealWords[this.step]
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getFirstDealWords', 'getSecondDealWords']),
    ...mapState('learnWords', ['flag', 'seIndex', 'rightIndex', 'rightShow']),
    ...mapState('learnWords', ['step'])
  },
  methods: {
    next (index) {
    /* @this.preventClick()  公用mixin 防止重复点击
     */
      if (this.preventClick()) {
        if (this.flag !== 3) { // 第一步  第二部时执行
          let flags = null
          flags = this.flag === 1 ? flags = 2 : (this.flag === 2 ? flags = 3 : flags = 1)
          this.$store.commit('learnWords/FLAG', { flag: flags })
        } else { // 第三步 执行。
          if (this.seIndex !== null && this.seIndex === this.rightIndex) { // 答案选择正确之后
            this.$store.commit('learnWords/RIGHTSHOW', {bool: true})
            this.$refs.right.play()
            setTimeout(() => {
              let flags = null
              flags = this.flag === 1 ? flags = 2 : (this.flag === 2 ? flags = 3 : flags = 1)
              this.$store.commit('learnWords/FLAG', { flag: flags })
              this.$store.commit('learnWords/SEINDEX', {seIndex: null})
              this.$store.commit('learnWords/RIGHTINDEX', { rightIndex: null })
              this.$store.commit('learnWords/RIGHTSHOW', {bool: false})
            }, 1000)
          } else { // 选择错误
            this.$refs.error.play()
          }
        }
      }
    },
    soundOpen () { // 音频播放
      if (this.$refs.syll) {
        this.$refs.syll[0].play()
      }
    }
  }
}
</script>
