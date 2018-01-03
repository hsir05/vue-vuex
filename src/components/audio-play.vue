<template lang="html">
  <audio :id="audio_id" :src="src" @ended="endedEvent" @play="playEvent"   @pause="pauseEvent"
    :controls="controls" :autoplay="autoplay"
  >
    不支持播放音频
  </audio>
</template>

<script>
export default {
  props: {
    src: String,
    controls: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      audio_id: 'audio-play-id',
      currentTime: 0, // 播放音频的当前时间
      play_state: 'init' // init-初始状态，play-播放状态，pause-暂停状态，ended-结束状态
    }
  },
  created () {
    this.audio_id = 'audio-play-id-' + new Date().getTime()
  },
  mounted () {
    // let playMedia = document.getElementById(this.audio_id)
    // playMedia.autoplay = this.autoplay
    // playMedia.load()
  },
  watch: {
    src () { // 当音频地址发生改变时
      let playMedia = document.getElementById(this.audio_id)
      if (playMedia && !playMedia.paused) { // 如果音频地址发生改变时，当前音频还在播放，则让其播放结束
        playMedia.currentTime = playMedia.duration // 当前音频时间设置为总时间
      }
      this.audio_id = 'audio-play-id-' + new Date().getTime()
      this.play_state = 'init'
      playMedia.src = this.src // 必须在此修改当前播放来源，不然playMedia.currentSrc则始终为加载的第一个
    }
  },
  methods: {
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
      this.playAudio(this.audio_id)
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
  }
}
</script>

<style lang="css">
</style>
