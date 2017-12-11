<template lang="html">
  <div class="huiben-finish">
    <div class="huiben-finish-img">
      <img src="http://ali.bczcdn.com/pap/build/static/media/goodjob.98301119.png" alt="">
    </div>
    <!-- 绘本结束面板 -->
    <div class="huiben-finish-panel">
      <div class="huiben-finish-btn" @click="DATA_RESET">
        <i class="btn-icon base-icon-color fa fa-refresh"></i>
      </div>
      <div class="huiben-finish-btn" @click="$router.push('')">
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('pictureBooks', []),
    ...mapGetters('pictureBooks', {})
  },
  methods: {
    ...mapMutations('pictureBooks', ['DATA_RESET']),
    ...mapActions('pictureBooks', [])
  }
}
</script>

<style lang="css">
</style>
