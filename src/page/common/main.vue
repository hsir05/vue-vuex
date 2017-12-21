<template>
  <div class="main">
    <h2>学前班 一单元 <img src="static/img/btn_Modify.png" alt="" @click="showSelGrade"></h2>
   <div class="show-select" v-if="showSel">
     <div class="wrop"></div>
     <div class="sele">
        <span class="sel-init sel-grade">学前班</span>
        <span class="sel-init sel-unit">一单元</span>
       <img src="static/img/sel_grade.png" alt="">
       <span class="start" @click="showSelGrade">开始</span>
       <!-- <label>年级</label>
       <select name="grade" >
             <option value="学前班">学前班</option>
       </select>
       <label>单元</label>
       <select name="unit" >
         <option value="一单元">一单元</option>
       </select> -->
     </div>
   </div>
    <div class="wechat">
      <img src="static/img/main_we.png" alt="" width="95%"height="100%">
    </div>
    <div class="linksBtn">
      <!-- 记单词 -->
      <div class="links-worp links-word">
        <router-link to="/learn_word" >
          <img src="static/img/word.png" alt=""class="btn-img">
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
        <router-link to="/nursery_rhyme">
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
      showSel: true
    }
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getAllWords'])
  },
  methods: {
    ...mapActions('getWords', ['words']),
    showSelGrade () {
      this.showSel = !this.showSel
    }
  }
}
</script>
