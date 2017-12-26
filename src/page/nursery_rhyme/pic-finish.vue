<template lang="html">
  <div class="picbook-finish">
    <div class="picbook-finish-layer">
      <div class="picbook-finish-img">
        <img src="static/img/goodjob.png" alt="">
      </div>
      <!-- 绘本结束面板 -->
      <div class="picbook-finish-panel">
        <div class="btn-cont-img fl" @click="reStart">重新开始</div>
        <div class="btn-cont-img fr" @click="$router.push('/picture_books/list')">完成学习</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('nurseryRhyme', []),
    ...mapGetters('nurseryRhyme', {})
  },
  methods: {
    ...mapMutations('nurseryRhyme', ['DATA_RESET']),
    ...mapActions('nurseryRhyme', []),
    reStart () {
      this.$store.commit('nurseryRhyme/DATA_RESET')
      this.$store.dispatch('nurseryRhyme/getNurseryRhyme').then(() => {
        this.$store.dispatch('nurseryRhyme/timeWait').then(() => {
          this.$store.dispatch('nurseryRhyme/delayChildSongs')
        })
      })
    }
  }
}
</script>

<style lang="css">
</style>
