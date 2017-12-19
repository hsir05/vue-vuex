<template lang="html">
    <div class="game-b">
            <div class="games">
          <div class="games-head">
            <img src="static/img/pragress.png">
            <img src="static/img/bg_head_kid.png" class="bg-head">
            <!--分值 -->
            <div class="games-time-box">{{gamesFraction}}</div>
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

           <!-- 图片循环展示 -->
          <picture-show ></picture-show>
        </div>

        <!-- 得分展示 -->
        <get-score  v-if="gameScore"></get-score>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui'
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'

import GamesFooter from './games-footer.vue'
import PictureShow from './picture-show.vue'
import GetScore from './get-score.vue'
export default {
  components: { GamesFooter, Swipe, SwipeItem, GetScore, PictureShow },
  data () {
    return {
      game: [],
      preUrl: process.env.API_PIC
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getWordsIndexItem', 'getAllWords', 'getRandomWordItem']),
    ...mapState('games', ['requestLoading', 'gamesTime', 'gamesFraction', 'gameScore', 'progress', 'currWordIndex']),
    ...mapGetters('games', {})
  },
  methods: {
    ...mapMutations('games', []),
    ...mapActions('games', [])
  }
}
</script>

