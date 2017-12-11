<template lang="html">
  <div class="word-analysis">
    {{value}}
    <template v-if="wordInfor">
      : {{wordInfor.cn}}
    </template>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    wordInfor: null
  }
}
</script>

<style lang="css">
</style>
