<template lang="html">
  <footer class="huiben-footer">
    <div class="huiben-footer-btn" @click="lastPicBooks">
      <i class="btn-icon base-icon-color fa fa-arrow-left"></i>
    </div>
    <div class="huiben-footer-btn" @click="nextPicBooks">
      <i class="btn-icon base-icon-color fa fa-arrow-right"></i>
    </div>
  </footer>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('pictureBooks', []),
    ...mapGetters('pictureBooks', {})
  },
  methods: {
    ...mapMutations('pictureBooks', {}),
    ...mapActions('pictureBooks', [
      'lastPicBooks',
      'nextPicBooks'
    ])
  }
}
</script>

<style lang="scss">
</style>
