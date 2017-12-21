import REQUEST from '@/api/index.js'
import * as types from './mutation-types.js'
import huiben from '@/datajson/huiben.json'

const state = {
  reqLoading: false, // 请求加载，true-开始加载
  viewWordDic: null, // 看单词词典释义
  isShowSentenceCn: false, // 是否显示句子的汉译
  progress: 0, // 进度
  isFinishPic: false, // 判断是否完成绘本
  currPicPage: 0, // 当前绘画页数：0首页-0以后是内容
  picbook: null, // 绘本列表子项的内容
  playState: 'init' // 是否播放音频
}

// getters
const getters = {
  getPicContents (state, getters, rootState, rootGetters) { // 获取内容
    return [...state.picbook.course_content]
  },
  getPageTotal (state, getters, rootState, rootGetters) { // 获取内容总页数
    return state.picbook.course_content.length
  },
  getPicCover (state, getters, rootState, rootGetters) { // 获取绘画封面信息
    return state.picbook ? {title: state.picbook.title, cover_img_url: state.picbook.cover_img_url} : {}
  },
  getPicContentsItem (state, getters, rootState, rootGetters) { // 通过索引获取某一项
    return (index) => {
      return [...state.picbook.course_content][index]
    }
  },
  getPicContentCurrItem (state, getters, rootState, rootGetters) { // 通过当前绘画页数获取某一项
    return state.currPicPage <= 0 ? {} : getters.getPicContentsItem(state.currPicPage - 1)
  },
  isCoverPic (state, getters, rootState, rootGetters) { // 是否封面
    if (state.currPicPage === 0) {
      return true
    }
    return false
  }
}

// mutations
const mutations = {
  [types.DATA_RESET] (state) { // 数据重置
    state.reqLoading = false
    state.viewWordDic = null
    state.isShowSentenceCn = false
    state.progress = 0
    state.isFinishPic = false
    state.currPicPage = 0
    state.playState = 'init'
  },
  [types.REQ_LOADING] (state, { bool }) { // 请求加载
    state.reqLoading = bool
  },
  [types.VIEW_WORD_DIC] (state, { word }) { // 看单词词典释义
    state.viewWordDic = word
  },
  [types.IS_SHOW_SENTENCE_CN] (state, { bool }) { // 是否显示句子的汉译
    state.isShowSentenceCn = bool
  },
  [types.PROGRESS] (state, { progress }) { // 进度
    state.progress = progress
  },
  [types.IS_FINISH_PIC] (state, { bool }) { // 判断是否完成绘本
    state.isFinishPic = bool
  },
  [types.CURR_PIC_IDX] (state, { index }) { // 当前绘画页数
    state.currPicPage = index
  },
  [types.PICBOOK] (state, { picbook }) { // picbook
    state.picbook = picbook
  },
  [types.PLAY_STATE] (state, { status }) { // 是否播放音频
    state.playState = status
  }
}

// actions
/* eslint-disable prefer-promise-reject-errors */
const actions = {
  getPicBook (context, { id }) { // 通过 id 请求绘本列表子项的内容
    context.commit(types.DATA_RESET) // 数据重置
    context.commit(types.REQ_LOADING, { bool: true }) // 请求加载
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      REQUEST.get('course/' + id, null, r => {
        r.data.course_content = huiben.data.content_list
        context.commit(types.PICBOOK, { picbook: r.data })
        context.commit(types.REQ_LOADING, { bool: false }) // 请求加载
        resolve()
      })
      // }, 5000)
    })
  },
  nextPicBooks (context) { // 下一个绘画
    context.commit(types.VIEW_WORD_DIC, { word: null })
    context.commit(types.PLAY_STATE, { status: 'init' })
    let currPicPage = context.state.currPicPage + 1
    if (currPicPage <= context.getters.getPicContents.length) {
      context.dispatch('setCurrPicPage', { index: currPicPage }) // 设置当前pic索引
      context.dispatch('setProgress') // 设置进度
    } else {
      context.commit(types.IS_FINISH_PIC, { bool: true })
    }
  },
  lastPicBooks (context) { // 上一个绘画
    context.commit(types.VIEW_WORD_DIC, { word: null })
    context.commit(types.PLAY_STATE, { status: 'init' })
    let currPicPage = context.state.currPicPage - 1
    if (currPicPage > 0) {
      context.dispatch('setCurrPicPage', { index: currPicPage }) // 设置当前pic索引
      context.dispatch('setProgress') // 设置进度
    } else {
      context.commit(types.DATA_RESET) // 数据重置
    }
  },
  setCurrPicPage (context, { index }) { // 设置当前pic索引
    context.commit(types.CURR_PIC_IDX, { index: index })
  },
  setProgress (context) { // 设置进度
    let progress = (context.state.currPicPage / (context.getters.getPicContents.length + 1)) * 100
    context.commit(types.PROGRESS, { progress: progress })
  },
  changeSentenceCnVisual (context) { // 改变句子的汉译的可见
    context.commit(types.IS_SHOW_SENTENCE_CN, { bool: !context.state.isShowSentenceCn })
  }
}

export default {
  namespaced: true, // 根据模块注册的路径调整命名
  state,
  getters,
  actions,
  mutations
}
