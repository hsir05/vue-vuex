<template>
      <div class="show-img" >
        <!-- <span class="answer">
          <i class="answer-sel" ></i>
          <img src="static/img/bg_voice.png" alt="" class="answer-p" >
          <audio :src="preUrl + '/'+ v" v-for="(v, l) in item.audio_right" v-if="l ===0" ></audio>
        </span>
        <span class="answer">
          <i class="answer-sel"></i>
          <img src="static/img/bg_voice.png" alt="" class="answer-p">
          <audio :src="preUrl + '/'+ j" v-for="(j, c) in item.audio_error" v-if="c ===0" ></audio>
        </span>
        <span class="img-w">{{item.syllable}}</span> -->
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

