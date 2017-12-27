import REQUEST from '@/api/index.js'
import * as types from './mutation-types'

const state = {
  words: [],
  step: 0,  // 显示单词
  autoPlay: false, // 显示下一步按钮rightIndex
  flag: 1, //  步骤控制共3步
  seIndex: null, // 选择答案的序号
  rightIndex: null, // 正确答案的序号
  rightShow: false, // 答案的选择正确与否
  showEnd: false
}

// getters
const getters = {
}

// mutations
const mutations = {
  [types.DATA_RESET] (state) {
    // 数据重置
    state.autoPlay = false // 显示下一步按钮rightIndex
    state.flag = 1//  步骤控制共3步
    state.seIndex = null// 选择答案的序号
    state.rightIndex = null// 正确答案的序号
    state.rightShow = false // 答案的选择正确与否
    state.step = 0
    state.showEnd = false
  },
  [types.AUTO_PLAY] (state, {bool}) {
    state.autoPlay = bool
  },
  [types.SHOWEND] (state, {bool}) {
    state.showEnd = bool
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
  },
  [types.STEP] (state, {step}) {
    state.step = step
  }
}

// actions
/* eslint-disable prefer-promise-reject-errors */
const actions = {
  getWords (context) {
    // 请求works
    context.commit(types.DATA_RESET) // 数据重置
    return new Promise((resolve, reject) => {
      REQUEST.get('weixin_words_view', {kinds: '单词'}, r => {
        context.commit(types.WORDS, { words: r.data.list })
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
