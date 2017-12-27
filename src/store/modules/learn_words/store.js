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
  showEnd: false,
  // 000
  index: 0,
  moreIndex: 0,
  reationLength: null,
  wordLength: null
}

// getters
const getters = {
  getIndexWord (state, getters, rootState, rootGetters) {
    let length = state.words[0].course_content[state.index].syllable.relation.length
    if (length > 1 && state.moreIndex < length) {
      let dat = []
      dat = state.words[0].course_content[state.index]
      dat.syllable.relation.length = 0
      dat.type.length = 0
      // dat.syllable.relation = state.words[0].course_content[state.index].syllable.relation[state.moreIndex]
      console.log(state.words[0].course_content[state.index])
      dat.type.push(state.words[0].course_content[state.index].type[state.moreIndex])
      return dat
    } else {
      return state.words[0].course_content[state.index]
    }
  }
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
    // 000
    state.index = 0
    state.moreIndex = 0
    state.reationLength = null
    state.wordLength = null
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
  },
  // 000
  [types.WORDS] (state, { words }) {
    // words
    state.words = words
  },
  [types.INDEX] (state, {index}) {
    state.index = index
  },
  [types.RELATlENGTH] (state, {reationLength}) {
    state.reationLength = reationLength
  },
  [types.MOREINDEX] (state, {moreIndex}) {
    state.moreIndex = moreIndex
  },
  [types.WORDlENGTH] (state, {wordLength}) {
    state.wordLength = wordLength
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
  // 000
  getWordsId (context) {
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
