<template>
   <div class="word-img" >
       <img src="static/img/bg_normal.png" alt="" class="people">
        <!-- <div class="show-word" v-for="(val, index) in getSecondDealWords" v-if="index === 0"> -->
          <div class="show-word" v-for="(val, index) in dat" v-if="index === 0">
            <img :src="preUrl + '/'+ val.pic_right" alt="" class="show-i">

           <div class="pict-w"> <span class="img-w" :class=" judg === k?'addColor': ''" v-for="(k, i) in val.word">{{k}}</span></div>
       </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      judg: '',
      dat: [],
      preUrl: process.env.API_PIC
    }
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getFirstDealWords', 'getSecondDealWords']),
    ...mapState('common/wordsStore', ['step'])
  },
  created () {
    this.wordDeal()
  },
  methods: {
    wordDeal () {
      this.dat.push(this.getSecondDealWords[this.step])
      this.judg = this.getFirstDealWords[this.step].syllable
    }
  }
}
</script>

