<template>
   <div class="word-img" >
       <img src="static/img/bg_normal.png" alt="" class="people">
          <!-- <div class="show-word" v-for="(val, index) in dat" v-if="index === 0">
            <img :src="preUrl + '/'+ v" alt="" class="show-i" v-for="(v, k) in val.pic_right" v-if="k == 0">
            <div class="pict-w">
               <span class="img-w" :class="i >= comparStartLength && i <= comparEndLength ?'addColor': ''" v-for="(k, i) in val.word" >{{k}}</span>
            </div>
          </div> -->
          <!-- 000 -->
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
    ...mapGetters('common/wordsStore', ['getFirstDealWords', 'getSecondDealWords']),
    ...mapState('learnWords', ['step']),
    ...mapGetters('learnWords', ['getIndexWord'])
  },
  created () {

  },
  mounted () {
    document.addEventListener('WeixinJSBridgeReady', () => {
      this.wordDeal()
    }, false)
  },
  methods: {
    wordDeal () {
      this.dat = this.getIndexWord.type
    }
  }
}
</script>

