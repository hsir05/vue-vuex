<template lang="html">
  <div class="picture-books">
    <template v-if="!reqLoading">
      <!-- 绘本阅读 -->
      <header class="picture-books-read">
        <img src="static/img/picture_books_read.png" alt="">
      </header>
      <!-- 列表盒子 -->
      <div class="picture-books-box">
        <!-- 列表内容 -->
        <div class="picture-books-lists" ref="picture-wrapper">
          <!-- bottomLoadingText="正在加载中..." bottomPullText="上拉加载更多..." -->
          <mt-loadmore :top-method="topLoad"
            :bottom-method="bottomLoad" @bottom-status-change="setPullupChange"
            :bottom-all-loaded="isAllLoaded" ref="piclist-loadmore" :auto-fill="false"
            bottomPullText="上拉加载更多..."
          >
            <!-- 列表子项 -->
            <template v-for="(item, index) in getPicBooksList">
              <div class="picture-books-item white-bg">
                <div class="item-img">
                  <img :src="$Constant.GET_FILE_URL + item.cover_img_url[0]" alt="">
                </div>
                <div class="item-infor">
                  <h3 v-text="item.title"></h3>
                  <router-link :to="'/picture_books/details/' + item.id">
                    <button>开始阅读</button>
                  </router-link>
                </div>
              </div>
            </template>
            <!-- <div slot="bottom" class="picture-books-bottom">
              <span v-show="pullupStatus !== 'loading'"></span>
              <span v-show="pullupStatus === 'loading'">
                <mt-spinner type="fading-circle"></mt-spinner>
              </span>
            </div> -->
          </mt-loadmore>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  created () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    this.$store.dispatch('pictureBooks/list/getPicBooksList').then(() => {
      Indicator.close()
    })
  },
  computed: {
    ...mapState('pictureBooks/list', ['reqLoading', 'page', 'total', 'wrapperHeight', 'pullupStatus', 'isAllLoaded']),
    ...mapGetters('pictureBooks/list', ['getPicBooksList'])
  },
  methods: {
    ...mapActions('pictureBooks/list', ['setPullupChange', 'getBottomLoadData']),
    topLoad () {
      this.$refs['piclist-loadmore'].onTopLoaded()
      window.location.reload()
    },
    bottomLoad () {
      this.$store.dispatch('pictureBooks/list/getBottomLoadData').then(() => {
        this.$refs['piclist-loadmore'].onBottomLoaded()
      }, (reject) => console.error(reject))
    }
  }
}
</script>

<style>
</style>
