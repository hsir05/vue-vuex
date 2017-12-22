<template lang="html">
    <div class="game-b">
            <div class="games">
              <header-progress :value="progress"></header-progress>
               <div class="games-head">

               </div>
              <!-- 图片循环展示 -->
              <picture-show  v-if="!gameScore"></picture-show>
            </div>
            <!-- 得分展示 -->
            <get-score  v-if="gameScore"></get-score>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui'
import { mapActions, mapState, mapGetters } from 'vuex'

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
    ...mapGetters('common/wordsStore', ['getRandomWordItem']),
    ...mapState('games', ['requestLoading', 'gamesTime', 'gamesFraction', 'gameScore', 'progress']),
    ...mapGetters('games', {})
  },
  created () {
    this.$store.dispatch('games/openCompete')
  },
  methods: {
    ...mapActions('games', ['openCompete'])
  }
}
</script>

