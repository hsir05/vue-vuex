<template lang="html">
  <div class="sentence-words">
    <!-- :class="{'sentence-word-light': currentTime > playTimeChunk[index].start && currentTime < playTimeChunk[index].end}" -->
    <div v-for="(words, index) in sentence.split(' ')" v-text="words" class="sentence-word-group" @click="wordsEvent(words)"
      :class="{'sentence-word-light': wordLightAble(index)}"
    ></div>
    <!-- @timeupdate="timeupdateEvent" @loadeddata="loadeddataEvent" @progress="progressEvent" -->
    <audio :id="audio_id" @ended="endedEvent" @play="playEvent" @pause="pauseEvent" controls>
      <source :src="audio" type="audio/mpeg">
      不支持播放音频
    </audio>
  </div>
</template>

<script>
export default {
  props: {
    // playState: {
    //   type: String,
    //   default: 'init' // init-初始状态，play-播放状态，pause-暂停状态，ended-结束状态
    // },
    sentence: String,
    audio: String,
    playTimeChunk: {
      type: Array,
      default: []
    }
  },
  created () {
    this.audio_id = 'sentence-words-id-' + new Date().getTime()
  },
  data () {
    return {
      audio_id: 'sentence-words-id',
      currentTime: 0, // 播放音频的当前时间
      play_state: 'init' // init-初始状态，play-播放状态，pause-暂停状态，ended-结束状态
    }
  },
  watch: {
    audio () { // 当音频地址发生改变时
      let playMedia = document.getElementById(this.audio_id)
      if (!playMedia.paused) { // 如果音频地址发生改变时，当前音频还在播放，则让其播放结束
        playMedia.currentTime = playMedia.duration // 当前音频时间设置为总时间
      }
      this.audio_id = 'sentence-words-id-' + new Date().getTime()
      this.play_state = 'init'
      playMedia.src = this.audio // 必须在此修改当前播放来源，不然playMedia.currentSrc则始终为加载的第一个
    }
  },
  methods: {
    wordLightAble (index) {
      if (this.playTimeChunk[index] === null || this.playTimeChunk[index] === undefined) {
        return false
      }
      return this.currentTime > this.playTimeChunk[index].start && this.currentTime < this.playTimeChunk[index].end
    },
    wordsEvent (word) {
      if (word !== null && word !== undefined) {
        let w = word.split('').filter(w => {
          return new RegExp(/^[a-zA-Z]+$/).test(w)
        }).join('')
        this.$emit('wordsEvent', w)
      }
    },
    panelAudio () { // init-play-pause-ended
      // console.log(this.play_state)
      switch (this.play_state) {
        case 'init':
          this.play_state = 'play'
          this.play()
          break
        case 'pause':
          this.play_state = 'play'
          this.play()
          break
        case 'play':
          this.play_state = 'pause'
          this.pause()
          break
        case 'ended':
          this.play_state = 'init'
          break
        default:
      }
    },
    play () { // 播放
      let playMedia = document.getElementById(this.audio_id)
      // console.log('play', playMedia.currentSrc)
      playMedia.play()
      let playCurrTime = setInterval(() => {
        if (playMedia.ended) {
          clearInterval(playCurrTime)
        }
        this.currentTime = playMedia.currentTime
      }, 50)
    },
    pause () { // 暂停
      let playMedia = document.getElementById(this.audio_id)
      // console.log('pause', playMedia)
      playMedia.pause()
    },
    endedEvent () { // 结束
      // console.log('播放结束')
      this.$emit('endedEvent', 'ended')
      this.play_state = 'init'
    },
    playEvent () { // 播放事件
      // console.log('播放开始')
      this.$emit('playEvent', 'play')
    },
    pauseEvent () { // 暂停事件
      // console.log('播放暂停')
      this.$emit('pauseEvent', 'pause')
    }
    // timeupdateEvent (event) { // 播放时间变化事件
    //   console.log('当目前的播放位置已更改时：currentTime')
    //   var playMedia = document.getElementById(this.audio_id)
    //   this.currentTime = playMedia.currentTime // 有跳词问题
    //   console.log(playMedia.currentTime)
    // },
    // loadeddataEvent () {
    //   console.log('当前帧的数据已加载，但没有足够的数据来播放下一帧，跳出加载下一帧')
    // },
    // progressEvent (event) {
    //   console.log('加载进度条：buffered')
    //   var playMedia = document.getElementById(this.audio_id)
    //   console.log(playMedia.buffered)
    //   console.log(playMedia.buffered.start())
    //   console.log(playMedia.buffered.end())
    // }
  }
}
</script>

<style lang="scss">
.sentence-words { // 句子词组
  display: block; line-height: 1;
  .sentence-word-group {
    display: inline-block; margin: 0 0.03rem; line-height: 1; padding: 0.03rem;
    // background: #fff;
  }
  .sentence-word-light {
    color: red;
  }
}
</style>
