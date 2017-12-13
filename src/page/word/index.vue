<template>
  <div class="word">
    <div class="wrop">
        <ul>
                <li class="word-img" v-for="(item, index) in data"  :style="'transform:'+ 'translateX'+ '(' + num + ');'">
                <img src="static/img/bg_normal.png" alt="">
                  <!-- 1 单词显示 -->
                  <div class="show-word"  v-for="(k,i) in item.syllable" v-show="flag === 1">
                      <span class="show-w"  >{{k}}</span>
                       <!-- 音频 -->
                        <audio :src=" preUrl + item.audio_right[0]" ref="syll" ></audio>
                  </div>
                  <!-- 2.图片 -->
                  <div class="show-img" v-for="(k, i) in item.pic_right" v-if="i === 0 ">
                     <img :src="preUrl + k" alt="" class="show-i">
                     <span class="img-w">{{item.word}}</span>
                     <!-- 音频 -->
                      <audio :src=" preUrl + item.audio_right[0]" ref="syll" ></audio>
                  </div>
              <!-- 3 .选择 -->
                <div class="show-img" v-show="flag === 3">
                      <span class="answer">
                        <i class="answer-sel" ></i>
                        <img src="static/img/bg_voice.png" alt="" class="answer-p" >
                        <audio :src="preUrl + v" v-for="(v, l) in item.audio_right" v-if="l ===0" ></audio>
                      </span>

                       <span class="answer">
                        <i class="answer-sel"></i>
                        <img src="static/img/bg_voice.png" alt="" class="answer-p">
                        <audio :src="preUrl + j" v-for="(j, c) in item.audio_error" v-if="c ===0" ></audio>
                      </span>
                    <span class="img-w">{{item.syllable}}</span>
                </div>

                  <!-- 下一步按钮 -->
                   <div class="step">
                      <span class="next" :class="index === 2?'sure':''" @click="next(index)">
                        <img src="static/img/btn_next.png" v-if="index !== 2"  >
                        <i v-text="index === 2?'确定':''" ></i>
                        </span>
                      <span class="sound" v-if="index !== 2" @click="soundOpen(index)">
                        <img src="static/img/btn_sound.png" alt="" ></span>
                  </div>

                </li>
          </ul>
    </div>



  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import { Indicator, Toast } from 'mint-ui'
export default {
  name: 'words',
  data () {
    return {
      data: [],
      list: [],
      flag: 1,
      num: 0,
      preUrl: process.env.API_PIC
    }
  },
  created () {
    // this.data[0] = this.getAllWords[0].syllable_array[0]
    // this.data[1] = this.getAllWords[0].words_array[0]
    // this.data[2] = this.getAllWords[0].syllable_array[0]
    this.getAllWords.forEach((item, index) => {
      if (this.getAllWords[index].syllable_array && this.getAllWords[index].syllable_array.length !== 0) {
        let i = index + 1
        let k = index + 2
        this.data[index] = this.getAllWords[index].syllable_array[0]
        this.data[i] = this.getAllWords[index].words_array[0]
        this.data[k] = this.getAllWords[index].syllable_array[0]
        console.log(this.data.length)
      }
    })
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getAllWords', 'getDealWords'])
  },
  methods: {
    soundOpen (index) {
      this.$refs.syll[index].play()
    },
    next (index) {
      if (this.data.length - 1 !== index) {
        this.num = parseInt((index + 1) * (-100)) + '%'
        if (this.flag !== 3) {
          this.flag = this.flag + 1
        }
      } else {
        console.log(3)
      }
    }
  }
}
</script>

