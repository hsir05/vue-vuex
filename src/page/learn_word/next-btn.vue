<template>
    <div class="step">
            <span class="next" :class="index === 2?'sure':''" @click="next(index)">
              <img src="static/img/btn_next.png" v-if="index !== 2">
              <i v-text="index === 2 ? '确定' : ''" ></i>
            </span>
            <span class="sound" v-if="index !== 2" @click="soundOpen(index)">
              <img src="static/img/btn_sound.png" alt="" >
            </span>
          </div>
</template>
<script>
export default {
  props: ['item'],
  data () {
    return {}
  },
  created () {}
}
</script>
