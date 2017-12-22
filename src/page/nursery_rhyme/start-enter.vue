<template lang="html">
  <div class="start-enter">
    <img v-if="waitTime === 3" src="static/img/3.png" alt="">
    <img v-else-if="waitTime === 2" src="static/img/2.png" alt="">
    <img v-else-if="waitTime === 1" src="static/img/1.png" alt="">
    <img v-else src="static/img/go.png" alt="">
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('nurseryRhyme', ['waitTime'])
  },
  mounted () {
    // this.$store.dispatch('nurseryRhyme/timeWait')
  }
}
</script>

<style lang="css">
</style>
