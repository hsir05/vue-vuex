<template lang="html">
  <div class="games" v-if="!requestLoading">
    <div class="games-head">
      <div class="games-time-box">{{ gamesTime }}s</div>
      <div class="progress-box-layer" style="height">
        <progress-bar :value="progress" bg="rgb(230, 148, 64)"></progress-bar>
      </div>
    </div>
    <div class="games-body-img">
      <img :src="getWordsIndexItem(currWordIndex).pic_right[0]" alt="">
    </div>
    <games-footer></games-footer>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'

import GamesFooter from './games-footer.vue'
export default {
  components: {
    GamesFooter
  },
  created () {
    Indicator.open('加载中...')
    this.$store.dispatch('common/wordsStore/getWords').then(() => {
      this.$store.commit('games/REQUEST_LOADING', { bool: false })
      // this.$store.dispatch('games/openCompete')
      Indicator.close()
    })
  },
  computed: {
    ...mapGetters('common/wordsStore', ['getWordsIndexItem', 'getRandomWordItem']),
    ...mapState('games', ['requestLoading', 'gamesTime', 'progress', 'currWordIndex']),
    ...mapGetters('games', {})
  },
  methods: {
    ...mapMutations('games', []),
    ...mapActions('games', [])
  }
}
</script>

<style lang="scss">
.games {
  display: block; height: calc(100% - 0.2rem); width: calc(100% - 0.2rem); position: relative; margin: 0.1rem;
  border-radius: 0.08rem; background: #fff;
  .games-head {
    width: 100%; height: 0.5rem; display: block; background: #ffc86f;
    .games-time-box {
      width: 0.5rem; height: 0.5rem; background: #67C23A; float: left; line-height: 0.5rem; text-align: center;
      font-size: 0.18rem; color: #fff;
    }
    .progress-box-layer {
      height: 0.15rem; margin: 0.14rem 0.1rem; background-color: #fffcf3; padding: 0.03rem;
      border-radius: 0.05rem; overflow: hidden;
      width: calc(100% - 0.76rem); float: left;
    }
  }
  .games-body-img {
    width: 100%; height: 42vh; position: relative;
    img {
      height: 25.5vh; width: 60vw; position: absolute; top: 50%; left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }
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
