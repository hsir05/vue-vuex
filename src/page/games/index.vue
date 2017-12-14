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
        <!-- 得分展示 -->
        <div class="show-score">
         <div class="get-score">
              <div class="star-wrop">
                   <img :src ="star" v-for="star in stars" class="star"  width="60px"height="60px">
              </div>
             <img src="static/img/show_score.png" class="score_bg">
             <span class="wrop-score">{{this.score}}</span>
             <div class="btn-score-w">
                      <span class="btn-score">
                          <img src="static/img/btn_crad.png" width="100%"height="100%">
                         <a @click="start" href="javascript:;">重新开始</a>
                    </span>
                    <span class="btn-score2">
                        <img src="static/img/btn_crad.png" width="100%"height="100%">
                         <router-link to="/picture_books" >进入绘本</router-link>
                    </span>
           </div>
   </div>


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
      score: 0,
      game: [],
      num: [],
      stars: ['static/img/bg_star_right.png', 'static/img/bg_star_right.png', 'static/img/bg_star_right.png'],
      k: '',
      pictNum: '',
      preUrl: process.env.API_PIC,
      picts: [],
      showWord: []
    }
  },
  created () {
    Indicator.open('加载中...')
    this.$store.dispatch('common/wordsStore/getWords').then(() => {
      this.dealGame(this.getAllWords)
      for (let i = 0; i < 3; i++) {
        this.random(this.game, this.picts)
      }
      this.addWord()
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
    /* @picts  储存随积图片数组
    *点击单词时判断是否与图片对应
    *@selword 图片对应的单词
   *@selBtnWord 按钮对应的单词
    */
      if (this.score !== 100) {
        let selword = this.game[parseInt(this.picts[1].flag)].word
        let selBtnWord = this.showWord[par]
        if (selBtnWord === selword) {
          this.picts.shift()
          this.random(this.game, this.picts)
          this.addWord() // right  run
          this.score += 10
        } else {
          console.log('不对应')
        }
      } else {
       // 分值达到100
      }
    },
    random (par, param) {
      /*
      * 随机函数,添加随机图片
      *n值为随机图片在this.game中index
      */
      let n = Math.floor(Math.random() * (par.length)) // 随机数
      let m = Math.floor(Math.random() * (par[n].pic_right.length))  // 随机图片
      param.push({url: par[n].pic_right[m], flag: n})
      if (this.num.length >= 3) {
        this.num.shift()
      }
      this.num.push(n)
    },
    addWord () {
      /* @showWord 存储单词数组
      *根据随机图片添加单词
      *单词初始化时只允许添加2个，且必须有一个是图片对应的单词
      */
      if (this.game[this.num[1]].word) {
        this.showWord[1] = this.game[this.num[1]].word

        let m = Math.floor(Math.random() * (this.game.length))
        if (m === this.num[1]) {
          this.addWord()
        } else {
          this.showWord[0] = this.game[m].word
        }
      }
    },
    start () {
      console.log(234)
      location.reload()
    }
  }
}
</script>

