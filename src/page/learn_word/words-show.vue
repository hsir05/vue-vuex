<template>
    <!-- <div class="show-word"  v-for="(k,i) in item.syllable" > -->
        <div class="show-word"   >
          asdfasdfsadf
        <!-- <span class="show-w"  >{{k}}</span> -->
        <!-- 音频 -->
        <!-- <audio :src=" preUrl + '/'+ item.audio_right[0]" ref="syll" ></audio> -->
        </div>
    <!-- </div> -->
</template>
<script>
export default {
  props: ['item'],
  data () {
    return {
      preUrl: process.env.API_PIC
    }
  },
  created () {
    console.log(234242)
    console.log(this.item)
  }
}
</script>

