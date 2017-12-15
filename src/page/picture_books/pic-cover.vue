<template lang="html">
  <div class="picbook-cover picbook-body">
    <div class="picbook-body-img">
      <template v-if="getPicCover.cover_img_url">
        <img :src="$Constant.GET_FILE_URL + getPicCover.cover_img_url[0]" alt="">
      </template>
    </div>
    <h6 class="picbook-body-title">{{ getPicCover.title }}</h6>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('pictureBooks', []),
    ...mapGetters('pictureBooks/details', ['getPicCover'])
  },
  methods: {
    ...mapMutations('pictureBooks', {}),
    ...mapActions('pictureBooks', [])
  }
}
</script>

<style lang="css">
</style>
