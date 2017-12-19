<template>
   <!-- <div class="show-img" v-for="(k, i) in item.pic_right" v-if="i !== 0 "> -->
   <div class="show-img" >
     asdfasf
          <!-- <img :src="preUrl + '/'+ k" alt="" class="show-i">
          <span class="img-w">{{item.word}}</span> -->
          <!-- 音频 -->
          <!-- <audio :src=" preUrl +'/'+ item.audio_right[0]" ref="syll" ></audio> -->
  </div>
</template>
<script>
export default {
  props: ['item'],
  data () {
    return {
      preUrl: process.env.API_PIC
    }
  },
  created () {}
}
</script>

