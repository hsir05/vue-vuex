<template>
      <div class="word-img">
         <img src="static/img/bg_normal.png" alt="" class="people">
        <div class="show-word" v-for="item in getFirstDealWords">
            <span class="show-w"  >{{item.syllable}}</span>
       </div>
      </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      preUrl: process.env.API_PIC
    }
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getAllWords', 'getFirstDealWords'])
  },
  created () {
    this.$store.dispatch('common/wordsStore/getWords', {kinds: '单词'}).then(() => {
    })
  }
}
</script>

