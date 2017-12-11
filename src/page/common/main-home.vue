<template>
  <div class="main-home">
    <div class="cover-wrap">
      <div class="pic-cover-layer">
        <img src="//ali.bczcdn.com/pap/8__164_20161020180336_12803_c.jpg" alt="">
      </div>
      <h6 class="cover-title">Soap Boat</h6>
    </div>
    <!-- 信息 -->
    <div class="study-sub-tasks base-prompt-color">
      <div class="sub-tasks-item">
        <div class="sub-tasks-num">10</div>
        <div>单词</div>
      </div>
      <div class="sub-tasks-item">
        <div class="sub-tasks-num">14</div>
        <div>评论</div>
      </div>
    </div>
    <!-- 功能 -->
    <div class="study-function">
      <div class="func-menu-line">
        <button class="func-button btn-yellow">学单词</button>
        <button class="func-button btn-yellow" @click="$router.push('/games')">游戏</button>
      </div>
      <div class="func-menu-line">
        <button class="func-button btn-orange" @click="$router.push('/picture_books')">绘本</button>
        <button class="func-button btn-orange">闯关</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>
