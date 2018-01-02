<template>
  <div class="learn-word">
    <div class="wrop">
          <span class="head-bg">
            <img src="static/img/heabg.png" alt="" class="head-bg-img" width="100%" height="100%">
          </span>
         <!-- 1 单词显示 -->
         <words-show v-if="flag === 1"></words-show>

          <!-- 2.图片 -->
          <picture-show v-if="flag === 2"></picture-show>

          <!-- 3 .选择 -->
          <select-show v-if="flag === 3"></select-show>

             <!-- 4 .end -->
          <end v-if="showEnd"></end>

          <!-- 下一步按钮 -->
          <next-btn  v-if="autoPlay"></next-btn>

    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Indicator, Toast } from 'mint-ui'
import WordsShow from './words-show.vue'
import PictureShow from './picture-show.vue'
import SelectShow from './select-show.vue'
import end from './end'
import NextBtn from './next-btn.vue'
export default {
  components: {WordsShow, PictureShow, SelectShow, end, NextBtn},
  data () {
    return {}
  },
  created () {
    this.$store.commit('learnWords/DATA_RESET')
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    this.$store.dispatch('learnWords/getWordsId').then(() => {
      Indicator.close()
      if (this.words.length === 0) {
        Toast({message: '没有多的数据了，请稍后重试!', position: 'center', duration: 3000})
      } else {
        this.$store.commit('learnWords/AUTO_PLAY', { bool: true })
        let length = this.words[0].course_content[this.index].syllable.relation.length
        let len = this.words[0].course_content.length
        this.$store.commit('learnWords/RELATlENGTH', {reationLength: length})
        this.$store.commit('learnWords/WORDlENGTH', {wordLength: len})
      }
    }).catch((err) => {
      Toast({message: '请求失败，数据错误，请稍候重试!', position: 'center', duration: 3000})
      console.log(err)
    })
  },
  computed: {
    ...mapState('learnWords', ['autoPlay', 'index', 'words', 'flag', 'showEnd'])
  },
  methods: {}
}
</script>
