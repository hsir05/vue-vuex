<template lang="html">
  <header class="header-progress">
    <img src="/static/img/pragress.png" alt="">
   <img src="/static/img/bg_head_kid.png" class="bg-head-kid">
    <div class="progress-number">{{value}}</div>
    <div v-if="isProgress" class="progress-box-layer">
      <progress-bar :value="value" bg="rgb(106, 167, 24)"></progress-bar>
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
    // progNumber: {
    //   type: Number,
    //   default: 50
    // },
    isProgress: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
header.header-progress {
  display: block; height: 1.68rem; width: 100%; padding: 0 0.37333rem; box-sizing: border-box;
  position: fixed; top: 0; left: 0;
  img { width: 100%; height: 100%; }
  .progress-number {
    height: 0.65rem; width: 1rem; position: absolute; left: 2rem; top: 0.37333rem;
    line-height: 0.65rem; text-align: center; color: #fff; font-size: 0.48rem; overflow: hidden;
  }
  .progress-box-layer {
    width: 4.26667rem; height: 0.65333rem;
    position: absolute; top: 0.37333rem; right: 1.89333rem;
  }
    .bg-head-kid{
     width: 1.37333rem;
    height: 1.28rem;
    position: absolute;
    right: 0.69rem;
    top:0.10rem;
  }
}

</style>
