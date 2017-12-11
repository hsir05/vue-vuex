import Vue from 'vue'
import Vuex from 'vuex'
import wordsStore from './modules/common/words/store.js'
import pictureBooks from './modules/picture_books/picture-books-store.js'
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
    pictureBooks,
    games
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
