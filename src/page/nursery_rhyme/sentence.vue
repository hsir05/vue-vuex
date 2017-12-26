<template lang="html">
  <div class="picbook-details">
    <template v-if="!reqLoading">
      <!-- 内容 -->
      <pic-content></pic-content>
      <!-- 底部按钮 -->
      <picture-footer ></picture-footer>
      <!-- 完成弹框 -->
      <pic-finish v-if="isFinishPic"></pic-finish>
    </template>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { mapState, mapGetters } from 'vuex'

import PicContent from './pic-content'
import PicFinish from './pic-finish'
import PictureFooter from './picture-footer.vue'
export default {
  components: {
    PicContent, PicFinish, PictureFooter
  },
  data () {
    return {
      id: this.$route.params.id
    }
  },
  created () {
    // Indicator.open({
    //   text: '加载中...',
    //   spinnerType: 'fading-circle'
    // })
    // this.$store.dispatch('nurseryRhyme/getNurseryRhyme', { id: this.$route.params.id }).then(() => {
    Indicator.close()
    // })
    this.$store.dispatch('common/wordsStore/getWords')
  },
  computed: {
    ...mapState('nurseryRhyme', ['reqLoading', 'currWordsIndex', 'nurseryRhyme', 'isFinishPic', 'progress']),
    ...mapGetters('nurseryRhyme', ['getWords', 'getWordCurrItem'])
  }
}
</script>

