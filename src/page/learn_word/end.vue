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
import { Indicator } from 'mint-ui'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('learnWords', ['autoPlay', 'index', 'words', 'flag', 'showEnd', 'reationLength'])
  },
  methods: {
    reStart () {
      this.$store.commit('learnWords/DATA_RESET')
      Indicator.open({text: '加载中...', spinnerType: 'fading-circle'})
      this.$store.dispatch('learnWords/getWordsId').then(() => {
        this.$store.commit('learnWords/AUTO_PLAY', {bool: true})
        let length = this.words[0].course_content[this.index].syllable.relation.length
        let len = this.words[0].course_content.length
        this.$store.commit('learnWords/RELATlENGTH', {reationLength: length})
        this.$store.commit('learnWords/WORDlENGTH', {wordLength: len})
        Indicator.close()
      })
    }
  }
}
</script>

<style lang="css">
</style>
