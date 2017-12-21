<template>
     <div class="show-score" >
          <div class="get-score">
                <div class="star-wrop">
                    <img :src ="star" v-for="star in stars" class="star"  >
                </div>
              <img src="static/img/show_score.png" class="score_bg">
              <span class="wrop-score">{{gamesFraction}}</span>
              <div class="btn-score-w">
                        <span class="btn-score">
                            <img src="static/img/btn_crad.png" width="100%"height="100%">
                          <a @click="start" href="javascript:;">重新开始</a>
                        </span>
                      <span class="btn-score2">
                          <img src="static/img/btn_crad.png" width="100%"height="100%">
                          <router-link to="/picture_books/list" >进入绘本</router-link>
                      </span>
              </div>
          </div>
       </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      stars: []
    }
  },
  created () {
  },
  computed: {
    ...mapState('games', ['gamesFraction'])
  },
  mounted () {
    this.dealStars(this.gamesFraction)
  },
  methods: {
    start () {
      location.reload()
    },
    dealStars (n) {
      switch (n) {
        case 0:
        case 20:
        case 10:
          this.stars = ['static/img/left2.png', 'static/img/center2.png', 'static/img/right2.png']
          break
        case 30:
        case 40:
        case 50:
          this.stars = ['static/img/left2.png', 'static/img/center.png', 'static/img/right2.png']
          break
        case 60:
        case 70:
        case 80:
        case 90:
          this.stars = ['static/img/left.png', 'static/img/center2.png', 'static/img/right.png']
          break
        case 100:
          this.stars = ['static/img/left.png', 'static/img/center.png', 'static/img/right.png']
          break
        default:
      }
    }
  }
}
</script>
