<template>
    <div class="game-img-wrop" >
      <div class="game-t-img" >
        <ul >
          <li v-for="(pict, p) in picts" class="show-cal" :class="'img-'+p" v-if="pict">
                <transition name="slide-fade" >
                  <img :src="preUrl +'/'+ pict.url"   width="65%"height="100%" @click="clickPict(p)" v-if="show">
              </transition>
          </li>
        </ul>
      </div>
      <div class="game-wo">
        <span class="first " ref="animat" :class="'first-' + i + ' ' " v-for="(val, i) in showWord"  @click="pictSel(i)"> {{val}}</span>
      </div>
        <audio src="static/audio/right.mp3" ref="succ"></audio>
        <audio src="static/audio/error.mp3" ref="error"></audio>
        <audio :src="preUrl +'/'+ rightAudio" id="clickpictAudio" autoplay ref="clickpictAudio"></audio>
    </div>
</template>
<script>
import { Indicator, Toast } from 'mint-ui'
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
import PreventClickMixin from '../../mixins/prevent-click.js'
import AuddioAutoPlay from '../../mixins/audio-auto-play.js'
export default {
  mixins: [PreventClickMixin, AuddioAutoPlay],
  data () {
    return {
      game: [],
      num: [],
      show: true,
      rightAudio: '',
      pictNum: '',
      preUrl: process.env.API_PIC,
      picts: [],
      showWord: []
    }
  },
  created () {
    this.init()
  },
  watch: {
    picts () {
      // console.log(333)
    }
  },
  computed: {
    ...mapState('games', ['requestLoading', 'words', 'gamesTime', 'gamesFraction', 'gameScore', 'progress', 'currWordIndex']),
    ...mapGetters('games', ['getAllWords'])
  },
  mounted () {},
  methods: {
    ...mapMutations('games', []),
    ...mapActions('games', ['openCompete']),
    init () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.$store.dispatch('games/getWords').then(() => {
        if (this.words.length === 0) {
          Toast({message: '没有数据了，请稍后重试', position: 'center', duration: 3000})
        }
        this.dealGame(this.getAllWords)
        for (let i = 0; i < 3; i++) {
          this.random(this.game, this.picts)
        }
        this.addWord()
        this.$store.dispatch('games/openCompete')
        this.$store.commit('games/REQUEST_LOADING', { bool: false })
        this.$store.commit('games/DATA_RESET')
        Indicator.close()
      }).catch((err) => {
        // Toast({message: '请求失败或数据错误，请稍候重试!', position: 'center', duration: 3000})
        Indicator.close()
        console.log(err)
      })
    },
    dealGame (par) { // 要展示的单词
      let arr = []
      par.forEach((item, index) => {
        if (item.words_array && item.words_array.length !== 0) {
          item.words_array.forEach((k, i) => {
            arr.push(k)
          })
        }
      })
      this.game = this.distinct(arr)
    },
    distinct (arr) { //  去重
      let ret = []
      let json = {}
      let length = arr.length
      for (var i = 0; i < length; i++) {
        let val = arr[i].id
        if (!json[val]) {
          json[val] = 1
          ret.push(arr[i])
        }
      }
      return ret
    },
    clickPict (index) {
      if (index === 1) {
        document.getElementById('clickpictAudio').play()
      }
    },
    pictSel (par) {  // 对点击按钮作出反应
     /* @picts  储存随积图片数组
      *点击单词时判断是否与图片对应
      *@selword 图片对应的单词
      * @selBtnWord 按钮对应的单词
        *@this.preventClick()  公用mixin 防止重复点击
      */
      if (this.preventClick(1000)) {
        if (this.gamesFraction !== 100) {
          this.selAnswer(par)
        } else if (!this.progress) {
          // 进度为0
          this.$store.commit('games/GAMES_SCORE', {bool: true})
        } else {
        // 分值达到100
          this.$store.commit('games/GAMES_SCORE', {bool: true})
        }
      }
    },
    selAnswer (par) {
      let selword = this.game[parseInt(this.picts[1].flag)].word
      let selBtnWord = this.showWord[par]
      if (selBtnWord === selword) {
        this.$refs.succ.PlaybackRate = 2
        this.$refs.succ.play()
        this.$refs.animat[par].classList.add('animat-true')
        setTimeout(() => {
          this.$refs.animat[par].classList.remove('animat-true')
        }, 200)
        setTimeout(() => {
          this.picts.shift()
          this.random(this.game, this.picts)
          this.addWord() // right  run
          this.$store.commit('games/GAMES_FRACTION', {fraction: this.gamesFraction + 10})
        }, 600)
      } else {
        console.log('错误答案')
        this.$refs.error.PlaybackRate = 2
        this.$refs.error.play()
        this.$refs.animat[par].classList.add('animat-false')
        setTimeout(() => {
          this.$refs.animat[par].classList.remove('animat-false')
        }, 200)
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
      this.showWord.length = 0
      if (this.game[this.num[1]].word) {
        // let m = Math.floor(Math.random() * (this.game.length)) // 游戏中产生随机单词
        let randomFirst = Math.floor(Math.random() * 2) // 随机单词位置

        this.showWord[randomFirst] = this.game[this.num[1]].word // 正确单词
        let n = this.num[1]
        if (n === 0) {
          n = n + 1
        } else if (n === this.game.length) {
          n = n - 1
        } else {
          n = n - 1
        }
        if (randomFirst === 0) {
          this.showWord[1] = this.game[n].word
        } else {
          this.showWord[0] = this.game[n].word
        }
        this.rightAudio = this.game[this.num[1]].audio_right[0] // 点击图片正确音频
        this.playAudio('clickpictAudio')
        // this.clickPict(1)
      }
    }
  }
}
</script>
