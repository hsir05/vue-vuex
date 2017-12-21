<template lang="html">
    <div class="game-b">
            <div class="games">
              <header-progress :value="progress"></header-progress>
                <div class="games-head">
                  <!-- <img src="static/img/pragress.png">
                  <img src="static/img/bg_head_kid.png" class="bg-head"> -->
                  <!--分值 -->
                  <!-- <div class="games-time-box">{{gamesFraction}}</div> -->
                  <!-- 进度条 -->
                  <!-- <div class="progress-box-layer" >
                    <progress-bar :value="progress" bg="rgb(106, 167, 24)"></progress-bar>
                  </div> -->
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
import HeaderProgress from '@/page/common/header-progress.vue'
export default {
  components: { GamesFooter, Swipe, SwipeItem, GetScore, PictureShow, HeaderProgress },
  data () {
    return {
    }
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

