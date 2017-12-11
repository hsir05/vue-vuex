<template lang="html">
  <div class="progress-bar" :style="progressLineStyle"></div>
</template>

<script>
export default {
  props: {
    value: null,
    bg: String
  },
  computed: {
    progressLineStyle () {
      var ret = {}
      if (this.value >= 0 && this.value <= 100) {
        ret.width = this.value + '%'
      } else if (this.value < 0) {
        ret.width = '0%'
      } else {
        ret.width = '100%'
      }
      if (this.bg) {
        ret.backgroundColor = this.bg
      }
      return ret
    }
  }
}
</script>

<style lang="scss">
.progress-bar {
  transition: width .2s; height: 100%; border-radius: 3px;
  background-image: linear-gradient(to top right,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent);
  background-size: .2rem .2rem
}
</style>
