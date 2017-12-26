<template lang="html">
  <div class="nursery-rhyme-layer openings">
    <header-progress :value="progress"></header-progress>
    <!-- 词组 -->
    <div class="change-word-phrase">
      <template v-if="getWordCurrItem && isStartSongs">
        {{getWordCurrItem.word}}
      </template>
    </div>
    <!-- 图片列表 -->
    <ul class="img-list" v-if="getWords.length !== 0">
      <!-- 图片列表子项 -->
      <li v-for="(w, index) in getWords" v-if="index < 3">
        <div class="img-list-item">
          <img :src="preUrl +'/'+w.pic_right[0]" alt="" v-if="index < 3">
          <!-- 遮罩单词信息 -->
          <div v-if="index === currWordsIndex && isStartSongs" class="mask-word-infor">{{w.word}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import HeaderProgress from '@/page/common/header-progress.vue'

import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  components: {
    HeaderProgress
  },
  data () {
    return {
      preUrl: process.env.API_PIC
    }
  },
  computed: {
    ...mapState('nurseryRhyme', ['currWordsIndex', 'isStartSongs', 'progress']),
    ...mapGetters('nurseryRhyme', ['getWords', 'getWordCurrItem'])
  },
  methods: {
    ...mapActions('nurseryRhyme', ['setPullupChange', 'getBottomLoadData'])
  }
}
</script>

<style lang="css">
</style>
