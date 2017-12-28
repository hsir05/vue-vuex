<template>
       <div class="word-img" v-if="flag == 1 && autoPlay">
         <img src="static/img/bg_normal.png" alt="" class="people">
        <div class="show-word" >
            <span class="show-w"  >{{getIndexWord.syllable.syllable}}</span>
       </div>
      </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
// import { Indicator } from 'mint-ui'
export default {
  data () {
    return {
      preUrl: process.env.API_PIC
    }
  },
  computed: {
    ...mapGetters('learnWords', ['getIndexWord']),
    ...mapState('learnWords', ['flag', 'words', 'step', 'wordLength', 'autoPlay', 'seIndex', 'rightIndex', 'rightShow', 'index', 'moreIndex'])
  },
  created () {
    let length = this.words[0].course_content[this.index].syllable.relation.length
    let len = this.words[0].course_content.length
    this.$store.commit('learnWords/RELATlENGTH', {reationLength: length})
    this.$store.commit('learnWords/WORDlENGTH', {wordLength: len})
    // this.$store.dispatch('learnWords/getWordsId').then(() => {
    //   Indicator.close()
    //   this.$store.commit('learnWords/AUTO_PLAY', { bool: true })
    //   let length = this.words[0].course_content[this.index].syllable.relation.length
    //   let len = this.words[0].course_content.length
    //   this.$store.commit('learnWords/RELATlENGTH', {reationLength: length})
    //   this.$store.commit('learnWords/WORDlENGTH', {wordLength: len})
    // })
  }
}
</script>

