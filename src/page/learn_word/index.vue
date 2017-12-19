<template>
  <div class="learn-word">
    <div class="wrop">
      <ul>
        <li class="word-img" v-for="(item, index) in dat"  :style="'transform:'+ 'translateX'+ '(' + num + ');'">

            <!-- 1 单词显示 -->
             <words-show :item="item" v-if="flag === 1"></words-show>
            <!-- 2.图片 -->
            <!-- <picture-show :item="item"></picture-show> -->
            <!-- 3 .选择 -->
            <!-- <select-show :item="item"></select-show> -->
           <!-- 下一步按钮 -->
           <!-- <next-btn :index="index"></next-btn> -->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import WordsShow from './words-show.vue'
import PictureShow from './picture-show.vue'
import SelectShow from './select-show.vue'
import NextBtn from './next-btn.vue'
import { Indicator } from 'mint-ui'
export default {
  components: {WordsShow, PictureShow, SelectShow, NextBtn},
  name: 'words',
  data () {
    return {
      dat: [],
      list: [],
      flag: 1,
      num: 0,
      preUrl: process.env.API_PIC
    }
  },
  created () {
    Indicator.open('加载中...')
    this.$store.dispatch('common/wordsStore/getWords', {kinds: '单词'}).then(() => {
      Indicator.close()
      this.getAllWords.forEach((item, index) => {
        if (this.getAllWords[index].syllable_array && this.getAllWords[index].syllable_array.length !== 0) {
          let i = index + 1
          let k = index + 2
          this.dat[index] = this.getAllWords[index].syllable_array[0]
          this.dat[i] = this.getAllWords[index].words_array[0]
          this.dat[k] = this.getAllWords[index].syllable_array[0]
        }
      })
      this.flag = 1
    })
    this.getShowContent()
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getAllWords', 'getDealWords'])
  },
  methods: {
    soundOpen (index) {
      this.$refs.syll[index].play()
    },
    next (index) {
      if (this.dat.length - 1 !== index) {
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
