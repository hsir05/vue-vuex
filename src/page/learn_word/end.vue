<template lang="html">
  <div class="picbook-finish">
    <div class="picbook-finish-layer">
      <div class="picbook-finish-img">
        <img src="static/img/goodjob.png" alt="">
      </div>
      <!-- 绘本结束面板 -->
      <div class="picbook-finish-panel">
        <div class="btn-cont-img fl" @click="reStart">重新开始</div>
        <div class="btn-cont-img fr" @click="$router.push('/games')">进入游戏</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Indicator } from 'mint-ui'
export default {
  computed: {
  },
  methods: {
    reStart () {
      this.$store.commit('learnWords/DATA_RESET')
      // this.$store.commit('learnWords/AUTO_PLAY', {bool: true})
      // Indicator.open({text: '加载中...', spinnerType: 'fading-circle'})
      // this.$store.dispatch('learnWords/getWordsId').then(() => {
      //   Indicator.close()
      // })
    }
  }
}
</script>

<style lang="css">
</style>
