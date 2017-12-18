<template>
  <div class="main">
    <h2>学前班 第一单元 <img src="static/img/btn_Modify.png" alt=""></h2>
    <div class="wechat">
      <img src="static/img/main_we.png" alt="" width="95%"height="100%">
    </div>
    <div class="linksBtn">
      <!-- 记单词 -->
      <div class="links-worp links-word">
        <router-link to="/learn_word" >
          <img src="/static/img/word.png" alt=""class="btn-img">
        </router-link>
      </div>
      <!-- 游戏 -->
      <div class="links-worp links-game">
        <router-link to="/games" class="">
          <img src="static/img/game.png" alt="" class="btn-img">
        </router-link>
      </div>
      <!-- 儿歌 -->
      <div class="links-worp links-song">
        <router-link to="/word">
          <img src="static/img/song.png" alt="" class="btn-img">
        </router-link>
      </div>
      <!-- 绘本 -->
      <div class="links-worp links-book">
        <router-link to="/picture_books/list">
          <img src="static/img/book.png" alt="" class="btn-img">
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('common/wordsStore/getWords').then(() => {
      // this.$store.commit('words/REQUEST_LOADING', { bool: false })
    })
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getAllWords'])
  },
  methods: {
    ...mapActions('getWords', ['words'])
  }
}
</script>
