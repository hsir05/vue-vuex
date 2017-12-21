<template lang="html">
  <div class="picbook-details">
    <template v-if="!reqLoading">
      <picture-head></picture-head>
      <!-- 封面 -->
      <pic-cover v-if="isCoverPic"></pic-cover>
      <!-- 内容 -->
      <pic-content v-else></pic-content>
      <!-- 底部按钮 -->
      <picture-footer></picture-footer>
      <!-- 完成弹框 -->
      <pic-finish v-if="isFinishPic"></pic-finish>
    </template>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { mapState, mapGetters } from 'vuex'

// import PictureHead from '@/page/common/headhome-progress.vue'
import PictureHead from './picture-head.vue'
import PicCover from './pic-cover'
import PicContent from './pic-content'
import PicFinish from './pic-finish'
import PictureFooter from './picture-footer.vue'
export default {
  components: {
    PictureHead, PicCover, PicContent, PicFinish, PictureFooter
  },
  data () {
    return {
      id: this.$route.params.id
    }
  },
  created () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    this.$store.dispatch('pictureBooks/details/getPicBook', { id: this.$route.params.id }).then(() => {
      Indicator.close()
    })
    this.$store.dispatch('common/wordsStore/getWords')
  },
  computed: {
    ...mapState('pictureBooks/details', ['reqLoading', 'progress', 'isFinishPic']),
    ...mapGetters('pictureBooks/details', ['isCoverPic'])
  }
}
</script>

<style lang="scss">

</style>
