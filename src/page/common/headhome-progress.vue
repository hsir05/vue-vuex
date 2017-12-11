<template lang="html">
  <header class="headhome-progress">
    <div class="home-btn" @click="$router.push('/')">
      <i class="btn-icon base-icon-color fa fa-home"></i>
    </div>
    <div v-if="isProgress" class="progress-box-layer">
      <progress-bar :value="value" bg="rgb(230, 148, 64)"></progress-bar>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 50
    },
    isProgress: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
header.headhome-progress {
  display: block; height: 0.44rem; padding: 0.11rem 0.66rem;
  .home-btn {
    height: 0.44rem; width: 0.44rem;
    position: fixed; top: 0.11rem; left: 0.11rem; z-index: 100;
  }
  .btn-icon {
    font-size: 0.24rem; width: 100%; height: 100%; line-height: 0.44rem; text-align: center;
    display: block; position: relative; background: #fff; border-radius: 40%;
  }
  .progress-box-layer {
    height: 0.1rem; margin: 0.13rem 0; background-color: #fffcf3; padding: 0.03rem;
    border: 0.01rem solid #fff; border-radius: 0.05rem; overflow: hidden;
    // height: .3rem; margin: .25rem 0; background-color: #fffcf3;
    // border: .06rem solid #fff; border-radius: .1rem; overflow: hidden;
  }
}

</style>
