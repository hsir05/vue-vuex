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

          <div v-for="(item, index) in getIndexWord.syllable.audio_right"  v-if="flag === 1 && index === 0">
            <audio :src="preUrl + '/'+ item" ref="syll" id ="audio1" v-for="(val, k) in item"  v-if="flag && k === 0"></audio>
        </div>

          <div v-for="(item, i) in audioSecond.audio_right" v-if="flag === 2">
            <audio :src="preUrl + '/'+ item" ref="syll" id ="audio2"    v-if="flag && i === 0"></audio>
        </div>

  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import PreventClickMixin from '../../mixins/prevent-click.js'
import AuddioAutoPlay from '../../mixins/audio-auto-play.js'
export default {
  mixins: [PreventClickMixin, AuddioAutoPlay],
  data () {
    return {
      preUrl: process.env.API_PIC,
      audioSecond: '',
      dat: []
    }
  },
  created () {},
  mounted () {
    this.soundOpen()
    // this.playAudio()
    if (document.getElementById('audio1')) {
         this.playAudio('audio1')
      } else {
        this.playAudio('audio2')
      }
    if (this.getIndexWord.syllable.relation.length > 1) {
      this.audioSecond = this.getIndexWord.type[this.moreIndex]
    } else {
      this.audioSecond = this.getIndexWord.type[0]
    }
  },
  watch: {
    flag () {
      setTimeout(() => {
        this.soundOpen()
      })
      if (this.flag === 1) {
        console.log(11)
         this.playAudio('audio1')
      } else if (this.flag === 2) {
        console.log(22)
        this.playAudio('audio2')
      }
      if (this.getIndexWord.syllable.relation.length > 1) {
        this.audioSecond = this.getIndexWord.type[this.moreIndex]
      } else {
        this.audioSecond = this.getIndexWord.type[0]
      }
    }

  },
  computed: {
    ...mapGetters('learnWords', ['getIndexWord']),
    ...mapState('learnWords', ['flag', 'seIndex', 'step', 'words', 'index', 'wordLength', 'reationLength', 'moreIndex', 'rightIndex', 'rightShow'])
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
            this.$refs.right.play()
            this.$store.commit('learnWords/RIGHTSHOW', {rightShow: 0})
            setTimeout(() => {
              let flags = null
              flags = this.flag === 1 ? flags = 2 : (this.flag === 2 ? flags = 3 : flags = 1)
              this.$store.commit('learnWords/FLAG', { flag: flags })
              this.$store.commit('learnWords/SEINDEX', {seIndex: null})
              this.$store.commit('learnWords/RIGHTINDEX', { rightIndex: null })
              this.$store.commit('learnWords/RIGHTSHOW', {rightShow: 2})
              // 000
              if (this.reationLength <= 1) {  // 说明关联单词是一个
                if (this.index < this.wordLength) {
                  this.$store.commit('learnWords/INDEX', { index: this.index + 1 })
                  let length = this.words[0].course_content[this.index].syllable.relation.length
                  this.$store.commit('learnWords/RELATlENGTH', {reationLength: length})
                } else {
                  this.$store.commit('learnWords/SHOWEND', { bool: true })
                }
              } else { // 多个关联单词
                if (this.moreIndex + 1 < this.words[0].course_content[this.index].syllable.relation.length) {
                  this.$store.commit('learnWords/MOREINDEX', { moreIndex: this.moreIndex + 1 })
                } else {
                  if (this.index + 1 < this.wordLength) {
                    this.$store.commit('learnWords/INDEX', { index: this.index + 1 })
                    this.$store.commit('learnWords/MOREINDEX', { moreIndex: 0 })
                  } else {
                    this.$store.commit('learnWords/SHOWEND', { bool: true })
                  }
                }
              }
            }, 1000)
          } else { // 选择错误
           this.$store.commit('learnWords/RIGHTSHOW', {rightShow: 1})
            this.$refs.error.play()
          }
        }
      }
    },
    soundOpen () { // 播放音频
      if (this.$refs.syll[0]) {
        this.$refs.syll[0].play()
      }
    }
  }
}
</script>
