<template lang="html">
    <div class="game-b">
  <div class="games" v-if="!requestLoading">
    <div class="games-head">
      <img src="static/img/pragress.png">
      <img src="static/img/bg_head_kid.png" class="bg-head">
      <!--分值 -->
      <div class="games-time-box">{{score}}</div>
      <!-- <div class="games-time-box">{{ gamesTime }}</div> -->
      <!-- 进度条 -->
      <div class="progress-box-layer" >
        <progress-bar :value="progress" bg="rgb(106, 167, 24)"></progress-bar>
      </div>
    </div>
    <!-- 11111 -->
    <div class="games-body-img" v-if="1">
      <!-- <img :src="getWordsIndexItem(currWordIndex).pic_right[0]" alt=""> -->
         <div class="game-word">apple</div>
         <div class="game-img">
           <img src=" ">
         </div>
          <div class="game-img">
           <img src=" ">
         </div>
          <div class="game-img">
           <img src=" ">
         </div>
    </div>
<!-- 22222 -->
    <div class="game-img-wrop" v-if="0">
      <div class="game-t-img">
        <mt-swipe :auto="0" :show-indicators="false" :continuous="false">
            <mt-swipe-item>
              <img src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"></mt-swipe-item>
            <mt-swipe-item>
              <img src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100">
            </mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>
      </mt-swipe>
      </div>
      <div class="game-wo">
        <span class="first">one</span>  <span>twe</span>
      </div>
    </div>
    <!-- <games-footer></games-footer> -->
  </div>
    </div>
</template>

<script>
import { Indicator, Swipe, SwipeItem } from 'mint-ui'
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'

import GamesFooter from './games-footer.vue'
export default {
  components: {
    GamesFooter,
    Swipe,
    SwipeItem
  },
  data () {
    return {
      score: '0',
      game: []
    }
  },
  created () {
    Indicator.open('加载中...')
    this.$store.dispatch('common/wordsStore/getWords').then(() => {
      // this.game = this.getAllWords
      // console.log(this.game)
      this.dealGame(this.getAllWords)
      this.$store.commit('games/REQUEST_LOADING', { bool: false })
      // this.$store.dispatch('games/openCompete')
      Indicator.close()
    })
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getWordsIndexItem', 'getAllWords', 'getRandomWordItem']),
    ...mapState('games', ['requestLoading', 'gamesTime', 'progress', 'currWordIndex']),
    ...mapGetters('games', {})
  },
  methods: {
    ...mapMutations('games', []),
    ...mapActions('games', []),
    dealGame (par) {
      par.forEach((item, index) => {
        // this.game[index] = item.words_array
        if (item.words_array && item.words_array.length !== 0) {
          item.words_array.forEach((k, i) => {
            this.game.push(k)
            console.log(k)
          })
        }
      })
      console.log(this.game)
    }
  }
}
</script>

<style lang="scss">
.games {
  .games-footer {
    width: 2.88rem; display: block; padding: 0.26rem;
    zoom: 1;
  	&:before, &:after {content: ""; display: table;}
  	&:after {clear: both;}
    .games-footer-btn {
      margin: 0.055rem 0.12rem; width: 1.18rem; height: 10vh; border-radius: 0.05rem;
      border: 0.01rem solid #f2a813; float: left;
      background: #ffeac8; float: left; line-height: 10vh; text-align: center; font-size: 22px;
    }
  }
}
</style>
