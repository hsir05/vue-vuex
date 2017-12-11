<template lang="html">
  <div class="huiben-cover huiben-body">
    <div class="huiben-body-img">
      <img :src="getPicCover.cover_img_url" alt="">
    </div>
    <h6 class="huiben-body-title">{{ getPicCover.title }}</h6>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('pictureBooks', []),
    ...mapGetters('pictureBooks', ['getPicCover'])
  },
  methods: {
    ...mapMutations('pictureBooks', {}),
    ...mapActions('pictureBooks', [])
  }
}
</script>

<style lang="css">
</style>
