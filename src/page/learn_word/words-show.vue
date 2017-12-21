<template>
      <div class="word-img">
         <img src="static/img/bg_normal.png" alt="" class="people">
        <div class="show-word" v-for="item in dat">
            <span class="show-w"  >{{item.syllable}}</span>
       </div>
      </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      preUrl: process.env.API_PIC,
      dat: []
    }
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getAllWords', 'getFirstDealWords']),
    ...mapState('common/wordsStore', ['step'])
  },
  created () {
    this.$store.dispatch('common/wordsStore/getWords', {kinds: '单词'}).then(() => {
      this.dat.push(this.getFirstDealWords[this.step])
    })
  }
}
</script>

