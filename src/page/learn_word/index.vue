<template>
  <div class="learn-word">
    <div class="wrop">
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
import { Indicator } from 'mint-ui'
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
      this.$store.commit('learnWords/AUTO_PLAY', { bool: true })
      let length = this.words[0].course_content[this.index].syllable.relation.length
      let len = this.words[0].course_content.length
      this.$store.commit('learnWords/RELATlENGTH', {reationLength: length})
      this.$store.commit('learnWords/WORDlENGTH', {wordLength: len})
    })
  },
  computed: {
    // ...mapGetters('common/wordsStore', ['getAllWords', 'getFirstDealWords']),
    ...mapState('learnWords', ['autoPlay', 'index', 'words', 'flag', 'showEnd'])
  },
  methods: {}
}
</script>
