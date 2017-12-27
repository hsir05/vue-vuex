<template>
      <!-- <div class="word-img" v-if="dat.length !== 0">
         <img src="static/img/bg_normal.png" alt="" class="people">
        <div class="show-word" v-for="item in dat">
            <span class="show-w"  >{{item.syllable}}</span>
       </div>
      </div> -->

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
      preUrl: process.env.API_PIC,
      dat: [],
      datIndex: {}
    }
  },
  computed: {
    // ...mapGetters('common/wordsStore', ['getAllWords', 'getFirstDealWords']),
    ...mapGetters('learnWords', ['getIndexWord']),
    ...mapState('learnWords', ['flag', 'words', 'step', 'autoPlay', 'seIndex', 'rightIndex', 'rightShow', 'index', 'moreIndex'])
  },
  created () {
    // Indicator.open({
    //   text: '加载中...',
    //   spinnerType: 'fading-circle'
    // })
    // this.$store.dispatch('common/wordsStore/getWords').then(() => {
    //   this.$store.commit('learnWords/AUTO_PLAY', { bool: true })
    //   // let arr = []
    //   // arr = this.getFirstDealWords.reverse()
    //   // this.dat.push(arr[this.step])
    //   this.dat.push(this.getFirstDealWords[this.step])
    //   Indicator.close()
    // })
    // this.$store.dispatch('learnWords/getWordsId').then(() => {
    //   this.$store.commit('learnWords/AUTO_PLAY', { bool: true })
    //   let length = this.words[0].course_content[this.index].syllable.relation.length
    //   let len = this.words[0].course_content.length
    //   this.$store.commit('learnWords/RELATlENGTH', {reationLength: length})
    //   this.$store.commit('learnWords/WORDlENGTH', {wordLength: len})
    //   Indicator.close()
    // })
  }
}
</script>

