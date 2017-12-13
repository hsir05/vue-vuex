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
    <div class="games-body-img" v-if="0">
      <!-- <img :src="getWordsIndexItem(currWordIndex).pic_right[0]" alt=""> -->
         <div class="game-word">{{this.game[0].word}}</div>
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
    <div class="game-img-wrop" v-if="1">
      <div class="game-t-img" >
        <ul >
          <li v-for="(pict, p) in picts" class="show-cal" :class="'img-'+p">
              <img :src="preUrl + pict.url"   width="100%"height="100%">
          </li>
        </ul>
      </div>
      <div class="game-wo">
        <span class="first" :class="'first-' + i" v-for="(val, i) in showWord"  @click="pictSel(i)"> {{val}}</span>
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
      game: [],
      num: '',
      pictNum: '',
      preUrl: process.env.API_PIC,
      picts: [],
      showWord: ['one', 'total']
    }
  },
  created () {
    Indicator.open('加载中...')
    this.$store.dispatch('common/wordsStore/getWords').then(() => {
      this.dealGame(this.getAllWords)
      for (let i = 0; i < 3; i++) {
        this.random(this.game, this.picts)
      }
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
        if (item.words_array && item.words_array.length !== 0) {
          item.words_array.forEach((k, i) => {
            this.game.push(k)
          })
        }
      })
      console.log(this.game)
    },
    pictSel (par) {
      let selword = this.game[parseInt(this.picts[1].flag)].word
      if (this.picts[par] === selword) {
        this.picts.shift()
        this.random(this.game, this.picts)
      } else {

      }
    },
    random (par, param) { // 随机函数,返回n
      let n = Math.floor(Math.random() * (par.length)) // 随机数
      let m = Math.floor(Math.random() * (par[n].pic_right.length))  // 随机图片
      param.push({url: par[n].pic_right[m], flag: n})
      this.num = n
    },
    addWord () {
    }
  }
}
</script>

