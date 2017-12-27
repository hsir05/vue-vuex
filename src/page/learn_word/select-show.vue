<template>
        <div class="word-img" >
            <img src="static/img/bg_normal.png" alt="" class="people" v-if="!rightShow">
             <img src="static/img/bg_good.png" alt="" class="people" v-else>
            <div class="show-word" >

                  <div class="answer " v-for="(item, index) in answerShow">
                        <i class="answer-sel answer-init" ref="checkSel"  @click="selAnswer(index)"></i>
                       <img src="static/img/bg_voice.png" alt="" class="answer-p" ref="animat" @click="showAudio(index)">
                        <audio :src="preUrl + '/'+ item.url" ref="selRight"></audio>
                </div>

                  <span class="img-step3"  v-for="val in dat">
                    {{val.word}}
                  </span>
          </div>
        </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      answerShow: [{url: ''}, {url: ''}],
      preUrl: process.env.API_PIC,
      m: '',
      dat: []
    }
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getFirstDealWords', 'getSecondDealWords']),
    ...mapState('learnWords', ['flag', 'seIndex', 'rightIndex', 'rightShow']),
    ...mapState('learnWords', ['step'])
  },
  watch: {
    step () {
      this.answer()
    }
  },
  created () {
    this.answer()
    // this.dat.push(this.getFirstDealWords[this.step])
    this.dat.push(this.getSecondDealWords[this.step])
    // if (this.getFirstDealWords.length - 1 !== this.step) {
    //   this.$store.commit('learnWords/STEP', { step: this.step + 1 })
    // } else {
    //   this.$store.commit('learnWords/STEP', { step: 0 })
    // }
  },
  methods: {
    selAnswer (index) {  // 选择答案时对按钮的样式做出更改
      this.$refs.checkSel[index].classList.forEach((item, k) => {
        if (item === 'answer-init') {
          this.$refs.checkSel[index].classList.remove('answer-init')
        }
      })
      if (index === 0) {
        this.$refs.checkSel[1].classList.add('answer-init')
      } else {
        this.$refs.checkSel[0].classList.add('answer-init')
      }
      this.$store.commit('learnWords/SEINDEX', {seIndex: index})
      this.$store.commit('learnWords/RIGHTINDEX', { rightIndex: this.m })
    },
    showAudio (index) {  // 选择正确之后添加的样式
      this.$refs.selRight[index].play()
      this.$refs.animat[index].classList.add('sel-answer')
      setTimeout(() => {
        this.$refs.animat[index].classList.remove('sel-answer')
      }, 200)
      this.selAnswer(index)
    },
    answer () {  // 产生随机答案
      console.log(this.answerShow)
      this.m = Math.floor(Math.random() * 2)
      // if (this.m === 0) {
      //   this.answerShow[this.m].url = this.getFirstDealWords[0].audio_right[0]
      //   console.log(this.getFirstDealWords[0].audio_right[0])
      //   this.answerShow[1].url = this.getFirstDealWords[0].audio_error[0]
      // } else {
      //   this.answerShow[this.m].url = this.getFirstDealWords[0].audio_right[0]
      //   this.answerShow[0].url = this.getFirstDealWords[0].audio_error[0]
      // }
      if (this.m === 0) {
        this.answerShow[this.m].url = this.getSecondDealWords[this.step].audio_right[0]
        this.answerShow[1].url = this.getSecondDealWords[this.step].audio_error[0]
      } else {
        this.answerShow[this.m].url = this.getSecondDealWords[this.step].audio_right[0]
        this.answerShow[0].url = this.getSecondDealWords[this.step].audio_error[0]
      }
    }
  }
}
</script>

