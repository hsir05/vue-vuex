import Vue from 'vue'
import Vuex from 'vuex'
import wordsStore from './modules/common/words/store.js'
// 绘本模块
import PictureBooksList from './modules/picture_books/list/store.js'
import PictureBooksDetails from './modules/picture_books/details/store.js'
// 学单词
import LearnWords from './modules/learn_words/store.js'
// 儿歌
import NurseryRhyme from './modules/nursery_rhyme/store.js'
//
import games from './modules/games/games-store.js'
import * as actions from './actions'
import * as getters from './getters'
// import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    common: {
      namespaced: true, // 根据模块注册的路径调整命名
      modules: {
        wordsStore
      }
    },
    pictureBooks: { // 绘本模块
      namespaced: true, // 根据模块注册的路径调整命名
      modules: {
        list: PictureBooksList,
        details: PictureBooksDetails
      }
    },
    learnWords: LearnWords,
    nurseryRhyme: NurseryRhyme,
    games
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
