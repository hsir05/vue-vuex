import REQUEST from '@/api/index.js'
import * as types from './mutation-types'

const state = {
  autoPlay: false,
  flag: 1,
  seIndex: null,
  rightIndex: null,
  rightShow: false
}

// getters
const getters = {
}

// mutations
const mutations = {
  [types.DATA_RESET] (state) {
    // 数据重置
  },
  [types.AUTO_PLAY] (state, {bool}) {
    state.autoPlay = bool
  },
  [types.FLAG] (state, {flag}) {
    state.flag = flag
  },
  [types.SEINDEX] (state, {seIndex}) {
    state.seIndex = seIndex
  },
  [types.RIGHTINDEX] (state, {rightIndex}) {
    state.rightIndex = rightIndex
  },
  [types.RIGHTSHOW] (state, {bool}) {
    state.rightShow = bool
  }
}

// actions
/* eslint-disable prefer-promise-reject-errors */
const actions = {
  getWords (context) {
    // 请求works
    context.commit(types.DATA_RESET) // 数据重置
    return new Promise((resolve, reject) => {
      REQUEST.get('weixin_words_view', null, r => {
        // context.commit(types.WORDS, { words: r.data.list })
        resolve()
      })
    })
  },
  getShowContent (context, flag) {
    console.log(flag)
  }
}

export default {
  namespaced: true, // 根据模块注册的路径调整命名
  state,
  getters,
  actions,
  mutations
}
