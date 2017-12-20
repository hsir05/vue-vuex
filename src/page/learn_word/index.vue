<template>
  <div class="learn-word">
    <div class="wrop">

         <!-- 1 单词显示 -->
         <words-show v-if="flag === 1"></words-show>

          <!-- 2.图片 -->
          <picture-show v-if="flag === 2"></picture-show>

          <!-- 3 .选择 -->
          <select-show v-if="flag === 3"></select-show>

          <!-- 下一步按钮 -->
          <next-btn  v-if="autoPlay"></next-btn>

    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import WordsShow from './words-show.vue'
import PictureShow from './picture-show.vue'
import SelectShow from './select-show.vue'
import NextBtn from './next-btn.vue'
import { Indicator } from 'mint-ui'
export default {
  components: {WordsShow, PictureShow, SelectShow, NextBtn},
  data () {
    return {}
  },
  created () {
    Indicator.open('加载中...')
    this.$store.dispatch('common/wordsStore/getWords', {kinds: '单词'}).then(() => {
      Indicator.close()
      this.$store.commit('learnWords/AUTO_PLAY', { bool: true })
    })
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getAllWords', 'getFirstDealWords', 'getWordItem']),
    ...mapState('learnWords', ['autoPlay', 'flag'])
  },
  methods: {
  }
}
</script>
