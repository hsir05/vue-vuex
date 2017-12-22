<template lang="html">
  <div class="picbook-finish">
    <div class="picbook-finish-layer">
      <div class="picbook-finish-img">
        <img src="static/img/goodjob.png" alt="">
      </div>
      <!-- 绘本结束面板 -->
      <div class="picbook-finish-panel">
        <div class="btn-cont-img fl" @click="DATA_RESET">重新开始</div>
        <div class="btn-cont-img fr" @click="$router.push('/picture_books/list')">完成学习</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('pictureBooks/details', []),
    ...mapGetters('pictureBooks/details', {})
  },
  methods: {
    ...mapMutations('pictureBooks/details', ['DATA_RESET']),
    ...mapActions('pictureBooks/details', [])
  }
}
</script>

<style lang="css">
</style>
