<template lang="html">
  <footer class="picbook-footer">
    <div class="btn-cont-img white-bg last" @click="lastPicBooks">
      <img src="static/img/btn_back.png" alt="">
    </div>
    <div class="btn-cont-img white-bg next" @click="nextPicBooks">
      <img src="static/img/btn_next.png" alt="">
    </div>
    <!-- 封面禁用音频 -->
    <div v-if="isCoverPic" class="btn-cont-img white-bg audio">
      <img src="static/img/btn_sound_disable.png" alt="">
    </div>
    <div v-else class="btn-cont-img white-bg audio" @click="panelAudio">
      <img src="static/img/btn_sound.png" alt="">
    </div>
  </footer>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('pictureBooks/details', ['playState']),
    ...mapGetters('pictureBooks/details', ['isCoverPic'])
  },
  methods: {
    ...mapMutations('pictureBooks/details', {}),
    ...mapActions('pictureBooks/details', ['lastPicBooks', 'nextPicBooks']),
    panelAudio () {
      console.log(this.playState)
      switch (this.playState) {
        case 'init':
          this.$store.commit('pictureBooks/details/PLAY_STATE', { status: 'play' })
          break
        case 'pause':
          this.$store.commit('pictureBooks/details/PLAY_STATE', { status: 'play' })
          break
        case 'play':
          this.$store.commit('pictureBooks/details/PLAY_STATE', { status: 'pause' })
          break
        case 'ended':
          this.$store.commit('pictureBooks/details/PLAY_STATE', { status: 'init' })
          break
        default:
      }
    }
  }
}
</script>

<style lang="scss">
</style>
