// import REQUEST from '@/api/index.js'
import * as types from './mutation-types.js'

const state = {
  requestLoading: true, // 请求加载
  gamesTime: 90, // 游戏倒计时
  gamesFraction: 0, // 游戏分数
  progress: 100, // 进度
  currWordIndex: 0, // 当前单词的索引
  selectFrequency: 0, // 选择次数：1次则为10分，多次则为5分
  gamesData: [],
  gameScore: false  // 游戏得分展示
}

// getters
const getters = {
  getPicContents (state, getters, rootState, rootGetters) { // 获取内容
    return [...state.picBooks.content_list]
  },
  getFirstDealWords (state, getters, rootState, rootGetters) {
    console.log(state.step)
    let dat = {}
    state.words.forEach((item, index) => {
      if (item.syllable_array && item.words_array && index === 0) {
        dat = item.syllable_array
      } else {
        // console.log(index)
      }
    })
    return dat
  },
  getSecondDealWords (state, getters, rootState, rootGetters) {
    let dat = {}
    state.words.forEach((item, index) => {
      if (item.words_array && index === 0) {
        // dat.push(item.syllable_array)
        dat = item.words_array
      }
    })
    return dat
  }
}
// const getters = {
//   getAllDate (state, getters, rootState, rootGetters) {
//     // 获取所有单词
//     return [...state.words]
//   }
// }
// mutations
const mutations = {
  [types.DATA_RESET] (state) { // 数据重置
    state.progress = 100
    state.gamesTime = 90
    state.gamesFraction = 0
    state.gamesData = []
  },
  [types.GAMES_TIME] (state, { time }) { // 游戏倒计时
    state.gamesTime = time
  },
  [types.PROGRESS] (state, { progress }) { // 进度
    state.progress = progress
  },
  [types.GAMES_FRACTION] (state, { fraction }) { // 游戏分数
    state.gamesFraction = fraction
  },
  [types.REQUEST_LOADING] (state, { bool }) { // 游戏分数
    state.requestLoading = bool
  },
  [types.GAMES_SCORE] (state, { bool }) { // 游戏结束得分展示
    state.gameScore = bool
  }
}

// actions
/* eslint-disable prefer-promise-reject-errors */
const actions = {
  openCompete (context) { // 开启竞争:计时和记录得分满100竞争
    let btn = document.getElementById('games-select-right-btn')
    return Promise.race([
      context.dispatch('timeWait'),
      context.dispatch('recordScore', { element: btn, event: 'click' })
    ])
  },
  recordScore (context, { element, event, useCapture = false }) { // 记录得分
    return new Promise((resolve, reject) => {
      function listener (e) {
        if (context.state.gamesFraction >= 100) {
          element.removeEventListener(event, listener, useCapture)
          resolve()
        }
      }
      element.addEventListener('click', listener, useCapture)
      // let currFraction = fraction + context.state.gamesFraction
      // context.commit(types.GAMES_FRACTION, { fraction: currFraction })
    })
  },
  timeWait (context) { // 计时
    return new Promise((resolve, reject) => {
      let timeWaitInterval = setInterval(r => {
        if (context.state.gamesTime <= 0) { // 如果计时器结束
          clearInterval(timeWaitInterval)
          resolve()
        } else {
          context.commit(types.GAMES_TIME, { time: context.state.gamesTime - 1 })
          context.dispatch('setProgress')
        }
      }, 1000)
    })
  },
  setProgress (context) { // 设置进度
    let progress = (context.state.gamesTime / 90) * 100
    context.commit(types.PROGRESS, { progress: progress })
  }
}

export default {
  namespaced: true, // 根据模块注册的路径调整命名
  state,
  getters,
  actions,
  mutations
}
