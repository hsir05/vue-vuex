import REQUEST from '@/api/index.js'
import * as types from './mutation-types.js'

const state = {
  viewWordDic: null, // 看单词词典释义
  isShowSentenceCn: false, // 是否显示句子的汉译
  progress: 0, // 进度
  isFinishPic: false, // 判断是否完成绘本
  currPicPage: 0, // 当前绘画页数：0首页-0以后是内容
  // isCoverPic: true, // 是否封面-IS_COVER_PIC
  picBooksContent: null // 绘本列表子项的内容
}

// getters
const getters = {
  getPicContents (state, getters, rootState, rootGetters) { // 获取内容
    return [...state.picBooks.content_list]
  },
  getPicCover (state, getters, rootState, rootGetters) { // 获取绘画封面信息
    return state.picBooks ? {title: state.picBooks.title, cover_img_url: state.picBooks.cover_img_url} : {}
  },
  getPicContentsItem (state, getters, rootState, rootGetters) { // 通过索引获取某一项
    return (index) => {
      return [...state.picBooks.content_list][index]
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
    state.progress = 0
    state.isFinishPic = false
    state.currPicPage = 0
    // state.isCoverPic = true
  },
  [types.PIC_BOOKS_CONTENT] (state, { content }) { // PicBooks
    state.picBooksContent = content
  },
  [types.PROGRESS] (state, { progress }) { // 进度
    state.progress = progress
  },
  [types.CURR_PIC_IDX] (state, { index }) { // 当前pic索引
    state.currPicPage = index
  },
  [types.IS_FINISH_PIC] (state, { bool }) { // 当前pic是否完成
    state.isFinishPic = bool
  // },
  // [types.IS_COVER_PIC] (state, { bool }) { // 是否封面
  //   state.isCoverPic = bool
  },
  [types.VIEW_WORD_DIC] (state, { word }) { // 当前pic索引
    state.viewWordDic = word
  },
  [types.IS_SHOW_SENTENCE_CN] (state, { bool }) { // 当前pic索引
    state.isShowSentenceCn = bool
  }
}

// actions
/* eslint-disable prefer-promise-reject-errors */
const actions = {
  getPicBooksDetails (context, { id }) { // 请求PicBooks
    context.commit(types.DATA_RESET) // 数据重置
    return new Promise((resolve, reject) => {
      REQUEST.get('course/' + id, null, r => {
        console.log(r)
        // context.commit(types.PIC_BOOKS_CONTENT, { picBooks: r.data })
        resolve()
      })
    })
  },
  nextPicBooks (context) { // 下一个绘画
    context.commit(types.VIEW_WORD_DIC, { word: null })
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
