<template>
      <div class="word-img">
      <img src="static/img/bg_normal.png" alt="">
        <div class="show-word"   >
            <!-- <span class="show-w"  >{{k}}</span> -->
            <audio :src=" preUrl + '/'+ item.audio_right[0]" ref="syll" ></audio>
       </div>
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
  created () {
    console.log(234242)
    console.log(this.item)
  }
}
</script>

