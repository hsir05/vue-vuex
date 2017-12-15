<template lang="html">
  <div class="picbook-details">
    <picture-head :value="progress"></picture-head>
    <pic-cover v-if="isCoverPic"></pic-cover>
    <!-- <pic-content v-else></pic-content> -->
    <picture-footer></picture-footer>
    <pic-finish v-if="isFinishPic"></pic-finish>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import PictureHead from '@/page/common/headhome-progress.vue'
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
    this.$store.dispatch('pictureBooks/details/getPicBook', { id: this.$route.params.id })
  },
  computed: {
    ...mapState('pictureBooks/details', ['progress', 'isFinishPic']),
    ...mapGetters('pictureBooks/details', ['isCoverPic'])
  }
}
</script>

<style lang="scss">

</style>
