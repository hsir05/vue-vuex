<template>
    <div class="game-img-wrop" >
      <div class="game-t-img" >
        <ul >
          <li v-for="(pict, p) in picts" class="show-cal" :class="'img-'+p">
              <img :src="preUrl +'/'+ pict.url"   width="100%"height="100%">
          </li>
        </ul>
      </div>
      <div class="game-wo">
        <span class="first " ref="animat" :class="'first-' + i + ' ' " v-for="(val, i) in showWord"  @click="pictSel(i)"> {{val}}</span>
      </div>
        <!-- <audio :src="preUrl +'/'+audi" :id="'randomAud' + n" v-for="(audi, n) in game[this.num[1]].audio_right" v-if="n === 0" ></audio> -->
        <audio src="static/audio/right.wav" ref="succ"></audio>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui'
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
import PreventClickMixin from '../../mixins/prevent-click.js'
export default {
  mixins: [PreventClickMixin],
  data () {
    return {
      game: [],
      num: [],
      pictNum: '',
      preUrl: process.env.API_PIC,
      picts: [],
      showWord: [],
      showScore: {
        score: 0,
        show: false
      }
    }
  },
  created () {
    Indicator.open('加载中...')
    this.$store.dispatch('common/wordsStore/getWords', {kinds: '游戏'}).then(() => {
      this.dealGame(this.getAllWords)
      for (let i = 0; i < 3; i++) {
        this.random(this.game, this.picts)
      }
      this.addWord()
      this.$store.commit('games/REQUEST_LOADING', { bool: false })
      Indicator.close()
    })
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getWordsIndexItem', 'getAllWords', 'getRandomWordItem']),
    ...mapState('games', ['requestLoading', 'gamesTime', 'gamesFraction', 'gameScore', 'progress', 'currWordIndex']),
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
    },
    pictSel (par) {  // 对点击按钮作出反应
     /* @picts  储存随积图片数组
      *点击单词时判断是否与图片对应
      *@selword 图片对应的单词
      * @selBtnWord 按钮对应的单词
        *@this.preventClick()  公用mixin 防止重复点击
      */
      if (this.preventClick()) {
        if (this.gamesFraction !== 100 || this.progress) {
          let selword = this.game[parseInt(this.picts[1].flag)].word
          let selBtnWord = this.showWord[par]

          if (selBtnWord === selword) {
            this.$refs.succ.play()
            this.$refs.animat[par].classList.add('animat-true')
            setTimeout(() => {
              this.$refs.animat[par].classList.remove('animat-true')
            }, 200)
            setTimeout(() => {
              this.picts.shift()
              this.showWord.splice(par, 1)
              this.random(this.game, this.picts)
              this.addWord() // right  run
              this.showScore.score += 10
              this.$store.commit('games/GAMES_FRACTION', {fraction: this.showScore.score})
            }, 600)
          } else {
            console.log('不对应')
            this.$refs.animat[par].classList.add('animat-false')
            setTimeout(() => {
              this.$refs.animat[par].classList.remove('animat-false')
            }, 200)
          }
        } else {
        // 分值达到100
          this.$store.commit('games/GAMES_SCORE', {bool: true})
        }
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
        let m = Math.floor(Math.random() * (this.game.length)) // 游戏中产生随机单词
        let randomFirst = Math.floor(Math.random() * 2) // 随机单词位置

        this.showWord[randomFirst] = this.game[this.num[1]].word // 正确单词
        if (randomFirst === 0) {
          this.showWord[1] = this.game[m].word
        } else {
          this.showWord[0] = this.game[m].word
        }
      }
    }
  }
}
</script>
