<template lang="html">
  <div class="picbook-content picbook-body">
    <div class="picbook-body-img">
      <div class="picbook-body-img-bg white-bg">
        <img :src="getPicContentCurrItem.pic_photo" alt="">
        <!-- <img :src="$Constant.GET_FILE_URL + getPicContentCurrItem.pic_photo[0]" alt=""> -->
      </div>
    </div>
    <!-- 单独单词 -->
    <div class="picbook-body-word">
      <template v-if="viewWordDic && getWordItem(viewWordDic)">
        <word-paraphrase :value="viewWordDic" :word-infor="getWordItem(viewWordDic)"></word-paraphrase>
      </template>
    </div>
    <!-- 句子 -->
    <div class="picbook-sentence-wrapper">
      <!-- 句子词组 -->
      <sentence-words class="picbook-sentence" :sentence="getPicContentCurrItem.sentence" @wordsEvent="wordsEvent"
        :audio="getPicContentCurrItem.sentence_audio" :play-time-chunk="getPicContentCurrItem.play_time_chunk"
        ref="sentenceWords"
        @pauseEvent="playAudioEvent" @playEvent="playAudioEvent" @endedEvent="playAudioEvent"
      ></sentence-words>
      <!-- 句子控制面板 -->
      <div class="picbook-sentence-control-panel">
        <div class="picbook-sentence-btn" @click="changeSentenceCnVisual">
          <img src="/static/img/cn_en.png" alt="">
        </div>
      </div>
      <!-- 翻译 -->
      <div v-show="isShowSentenceCn" class="picbook-sentence-cn">{{getPicContentCurrItem.ch}}</div>
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
  watch: {
    playState () {
      console.log('content:' + this.playState)
      if (this.playState !== 'ended' && this.playState !== 'init') {
        this.$refs.sentenceWords.panelAudio()
      }
      if (this.playState === 'ended') {
        this.$store.commit('pictureBooks/details/PLAY_STATE', { status: 'init' })
      }
    }
  },
  computed: {
    ...mapState('pictureBooks/details', ['viewWordDic', 'isShowSentenceCn', 'playState']),
    ...mapGetters('pictureBooks/details', ['getPicContentCurrItem']),
    ...mapGetters('common/wordsStore', ['getWordItem'])
  },
  methods: {
    ...mapMutations('pictureBooks/details', {}),
    ...mapActions('pictureBooks/details', ['changeSentenceCnVisual']),
    // panelAudio () {
    //   this.$refs.sentenceWords.panelAudio()
    // },
    playAudioEvent (status) {
      this.$store.commit('pictureBooks/details/PLAY_STATE', { status: status })
    },
    wordsEvent (word) {
      this.$store.commit('pictureBooks/details/VIEW_WORD_DIC', { word: word })
    }
  }
}
</script>

<style lang="css">
</style>
