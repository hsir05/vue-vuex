<template>
       <div class="word-img" v-if="flag == 1 && autoPlay">
         <img src="static/img/bg_normal.png" alt="" class="people">
        <div class="show-word">
            <span class="show-w"  >{{getIndexWord.syllable.syllable}}</span>
       </div>
      </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      preUrl: process.env.API_PIC
    }
  },
  computed: {
    ...mapGetters('learnWords', ['getIndexWord']),
    ...mapState('learnWords', ['flag', 'autoPlay'])
  },
  created () {}
}
</script>

