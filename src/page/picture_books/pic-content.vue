<template lang="html">
  <div class="huiben-content huiben-body">
    <div class="huiben-body-img">
      <img :src="getPicContentCurrItem.pic_photo" alt="">
    </div>
    <!-- 单独单词 -->
    <div class="huiben-body-word">
      <!-- <template v-if="viewWordDic && getWordItem(viewWordDic)">
        <word-paraphrase :value="viewWordDic" :word-infor="getWordItem(viewWordDic)"></word-paraphrase>
      </template> -->
    </div>
    <!-- 句子 -->
    <div class="huiben-body-sentence">
      <!-- 句子内容 -->
      <div class="huiben-sentence-content">
        <!-- 句子词组 -->
        <sentence-words :sentence="getPicContentCurrItem.sentence" @wordsEvent="wordsEvent"
          :audio="getPicContentCurrItem.sentence_audio" :play-time-chunk="getPicContentCurrItem.play_time_chunk"
          ref="sentenceWords"
        ></sentence-words>
        <!-- 翻译 -->
        <div v-show="isShowSentenceCn" class="huiben-sentence-cn">{{getPicContentCurrItem.ch}}</div>
      </div>
      <!-- 句子控制面板 -->
      <div class="huiben-sentence-control-panel">
        <div class="huiben-sentence-btn" @click="panelAudio">
          <i class="btn-icon base-icon-color fa fa-volume-up"></i>
        </div>
        <div class="huiben-sentence-btn" @click="changeSentenceCnVisual">
          <i class="btn-icon base-icon-color fa fa-refresh"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'

import SentenceWords from '@/page/common/sentence-words.vue'
import WordParaphrase from '@/page/common/word-paraphrase.vue'
export default {
  components: {
    SentenceWords, WordParaphrase
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('pictureBooks', ['viewWordDic', 'isShowSentenceCn']),
    ...mapGetters('pictureBooks', ['getPicContentCurrItem']),
    ...mapGetters('common/wordsStore', ['getWordItem'])
  },
  methods: {
    ...mapMutations('pictureBooks', {}),
    ...mapActions('pictureBooks', ['changeSentenceCnVisual']),
    panelAudio () {
      this.$refs.sentenceWords.panelAudio()
    },
    wordsEvent (word) {
      this.$store.commit('pictureBooks/VIEW_WORD_DIC', { word: word })
    }
  }
}
</script>

<style lang="css">
</style>
