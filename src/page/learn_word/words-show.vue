<template>
      <div class="word-img" v-if="dat.length !== 0">
         <img src="static/img/bg_normal.png" alt="" class="people">
        <div class="show-word" v-for="item in dat">
            <span class="show-w"  >{{item.syllable}}</span>
       </div>
      </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { Indicator } from 'mint-ui'
export default {
  data () {
    return {
      preUrl: process.env.API_PIC,
      dat: []
    }
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getAllWords', 'getFirstDealWords']),
    ...mapState('learnWords', ['step'])
  },
  created () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    this.$store.dispatch('common/wordsStore/getWords').then(() => {
      this.$store.commit('learnWords/AUTO_PLAY', { bool: true })
      let arr = []
      arr = this.getFirstDealWords.reverse()
      this.dat.push(arr[this.step])
      Indicator.close()
    })
  }
}
</script>

