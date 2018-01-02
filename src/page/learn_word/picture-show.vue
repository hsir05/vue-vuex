<template>
   <div class="word-img" >
       <img src="static/img/bg_normal.png" alt="" class="people">

           <div class="show-word" v-for="(val, index) in dat" v-if="index === 0">
            <img :src="preUrl + '/'+ v" alt="" class="show-i" v-for="(v, k) in val.pic_right" v-if="k == 0">
            <div class="pict-w">
               <span class="img-w" :class="i >= comparStartLength && i <= comparEndLength ?'addColor': ''" v-for="(k, i) in val.word" >{{k}}</span>
            </div>
          </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      comparEndLength: null,
      comparStartLength: null,
      dat: [],
      preUrl: process.env.API_PIC
    }
  },
  computed: {
    ...mapState('learnWords', ['moreIndex']),
    ...mapGetters('learnWords', ['getIndexWord'])
  },
  created () {
    this.wordDeal()
  },
  methods: {
    wordDeal () {
      if (this.getIndexWord.syllable.relation.length > 1) {
        this.dat.push(this.getIndexWord.type[this.moreIndex])
      } else {
        this.dat = this.getIndexWord.type
      }
      let str = this.getIndexWord.syllable.syllable
      let string = this.dat[0].word
      if (str.length > 1) {
        this.comparStartLength = string.indexOf(str)
        this.comparEndLength = this.comparStartLength + str.length
      } else {
        this.comparEndLength = null
      }
    }
  }
}
</script>
    
