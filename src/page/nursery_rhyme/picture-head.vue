<template lang="html">
  <div class="picture-head">
    <img class="home-btn" src="static/img/home.png" alt="" @click="$router.push('/')">
    <div v-if="!isCoverPic" class="picture-infor-sign">{{currPicPage}}/{{getPageTotal}}</div>
    <!-- <div class="home-btn white-bg" @click="$router.push('/')">
      <i class="base-i_cr fa fa-home"></i>
    </div>
    <div v-if="isCoverPic" class="picture-infor-sign">封面</div>
    <div v-else class="picture-infor-sign">{{currPicPage}}/{{getPageTotal}}</div> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('pictureBooks/details', ['currPicPage']),
    ...mapGetters('pictureBooks/details', ['getPageTotal', 'isCoverPic'])
  }
}
</script>

<style lang="css">
</style>
