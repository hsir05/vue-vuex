<template>
   <div class="word-img" >
       <img src="static/img/bg_normal.png" alt="" class="people">
        <div class="show-word" v-for="val in getSecondDealWords">
            <img :src="preUrl + '/'+ val.pic_right" alt="" class="show-i">
            <span class="img-w" :class=" judg === k?'addColor': ''" v-for="(k, i) in val.word">{{k}}</span>
       </div>{{this.wordDeal()}}
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      judg: '',
      preUrl: process.env.API_PIC
    }
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getFirstDealWords', 'getSecondDealWords'])
  },
  created () {
    console.log(this.getFirstDealWords)
  },
  methods: {
    wordDeal () {
      this.judg = this.getFirstDealWords[0].syllable
    }
  }
}
</script>

