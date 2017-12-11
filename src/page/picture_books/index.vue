<template lang="html">
  <div class="picture-books">
    <picture-head :value="progress"></picture-head>
    <!-- <analysis-audio></analysis-audio> -->
    <pic-cover v-if="isCoverPic"></pic-cover>
    <pic-content v-else></pic-content>
    <picture-footer></picture-footer>
    <pic-finish v-if="isFinishPic"></pic-finish>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

// import AnalysisAudio from '@/page/common/analysis-audio.vue'
import PictureHead from '@/page/common/headhome-progress.vue'
import PicCover from './pic-cover'
import PicContent from './pic-content'
import PicFinish from './pic-finish'
import PictureFooter from './picture-footer.vue'
export default {
  components: {
    PictureHead, PicCover, PicContent, PicFinish, PictureFooter
  },
  created () {
    this.$store.dispatch('common/wordsStore/getWords')
    this.$store.dispatch('pictureBooks/getPicBooks')
  },
  computed: {
    ...mapState('pictureBooks', [
      'progress',
      'isFinishPic'
    ]),
    ...mapGetters('pictureBooks', ['isCoverPic'])
  }
}
</script>

<style lang="scss">
.picture-books {
  display: block; height: 100%; width: 100%; position: relative;
  .huiben-body {
    display: block; width: 100%; min-height: calc(100vh - 1.43rem); position: relative;
    .huiben-body-img { // 图片
      width: 100%; max-height: 2.85rem; text-align: center;
      img {
        max-width: 100%; height: 2.85rem;
      }
    }
    .huiben-body-title { // 标题
      padding: 0.07rem 0.12rem; height: 0.34rem; line-height: 0.34rem; text-align: center;
      font-size: 0.24rem;
    }
    .huiben-body-word {
      display: block; height: 0.3rem; overflow: hidden;
      div {
        color: #8b572a; padding: 0.05rem; margin: 0 0.1rem; background: #fff; line-height: 0.2rem;
        box-sizing: border-box; font-size: 18px; display: block; height: 0.3rem;
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      }
    }
    .huiben-body-sentence { // 句子
      min-height: calc(100vh - 1.43rem - 2.85rem - 0.3rem); padding: 0; box-sizing: border-box;
      display: table;width: 100%;
      .huiben-sentence-content { // 句子内容
        padding: 0.07rem 0.14rem; width: calc(100% - 0.94rem);
        display: table-cell; word-break:break-all;
        .huiben-sentence-cn { // 翻译
          margin-top: 0.05rem; font-size: 0.17rem;
        }
      }
      .huiben-sentence-control-panel { // 句子控制面板
        width: 0.48rem; padding: 0 0.09rem; display: table-cell;
        .huiben-sentence-btn {
          width: 0.48rem; height: 0.48rem; margin: 0.09rem 0; border-radius: 45%;
          background: #fff; line-height: 0.48rem; text-align: center; font-size: 28px;
        }
      }
    }
  }
  .huiben-cover { // 绘画封面
    padding: 0.22rem 0; box-sizing: border-box;
  }
  .huiben-content {

  }

  footer.huiben-footer {
    // position: fixed; bottom: 0; left: 0;
    width: 100%; display: block; padding: 0.11rem 0;
    zoom: 1;
  	&:before, &:after {content: ""; display: table;}
  	&:after {clear: both;}
    .huiben-footer-btn {
      margin: 0.055rem 0.09rem; width: 45%; height: 0.44rem; border-radius: 0.2rem;
      background: #fff; float: left; line-height: 0.44rem; text-align: center; font-size: 22px;
    }
  }

  .huiben-finish {
    position: fixed; top: 0; left: 0; bottom: 0; right: 0; background: rgba(#000, 0.7); z-index: 101;
    padding: 1rem 0;
    .huiben-finish-img {
      width: 80%; height: 3.4rem; margin: 0 auto; background: #fff; max-width: 13rem;
      img {
        width: 100%; height: 100%;
      }
    }
    .huiben-finish-panel {
      width: 100%; display: block; padding: 0.11rem 0;
      zoom: 1;
      &:before, &:after {content: ""; display: table;}
    	&:after {clear: both;}
      .huiben-finish-btn {
        margin: 0.055rem 0.09rem; width: 45%; height: 0.44rem; border-radius: 0.2rem; display: inline-block;
        background: #fff; line-height: 0.44rem; text-align: center; font-size: 22px; float: left;
      }
    }
  }
}
</style>
