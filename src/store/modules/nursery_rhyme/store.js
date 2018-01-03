import REQUEST from '@/api/index.js'
import * as types from './mutation-types'
// import NurseryRhyme from '@/datajson/nursery-rhyme.json'
// import DatahandleMethods from '@/utils/datahandle-methods.js'

const state = {
  reqLoading: false, // 请求加载，true-开始加载
  beinState: 'init', // 进行的状态：init-初始化、wait_item-倒计时、delay-延迟播放背景、openings-儿歌开篇、sentence-句子、end-结束
  waitTime: 3, // 等待时间-3-1\0-go\<0-finish
  currWordsIndex: 0, // 当前高亮单词索引
  isStartSongs: false, // 是否开启儿歌
  progress: 0, // 进度
  currAudioSrc: null, // 当前音频地址
  nurseryRhyme: null, // 儿歌信息
  isShowSentenceCn: false, // 是否显示句子的汉译
  playState: 'init',
  infor: null,
  viewWordDic: null,
  isFinishPic: false,  // 判断是否完成绘本
  currPicPage: 0 // 当前绘画页数：0首页-0以后是内容
}

// getters
const getters = {
  getPicContents (state, getters, rootState, rootGetters) { // 获取内容
    // return [...state.nurseryRhyme.course_content]
    return [...state.nurseryRhyme]
  },
  getPicContentCurrItem (state, getters, rootState, rootGetters) { // 通过当前绘画页数获取某一项
    // console.log(8888)
    // console.log(state.currPicPage)
    return state.currPicPage < 0 ? {} : getters.getPicContentsItem(state.currPicPage)
  },
  getWords (state, getters, rootState, rootGetters) { // 获取儿歌单词相关
    return state.nurseryRhyme ? [...state.nurseryRhyme.words_array] : []
  },
  getPicContentsItem (state, getters, rootState, rootGetters) { // 通过索引获取某一项
    return (index) => {
      return [...state.nurseryRhyme.course_content][index]
    }
  },
  getWordItem (state, getters, rootState, rootGetters) { // 通过索引获取某一项
    return (index) => {
      return [...getters.getWords][index]
    }
  },
  getWordCurrItem (state, getters, rootState, rootGetters) { // 通过当前绘画页数获取某一项
    return state.currWordsIndex < 0 ? {} : getters.getWordItem(state.currWordsIndex)
  },
  isTimeWaitFinish (state, getters, rootState, rootGetters) {
    // return true
    if (state.waitTime < 0) {
      return true
    }
    return false
  }
}

// mutations
const mutations = {
  [types.DATA_RESET] (state) { // 数据重置
    state.reqLoading = false
    state.beinState = 'init'
    state.waitTime = 3
    state.isShowSentenceCn = false
    state.currWordsIndex = 0
    state.isStartSongs = false
    state.isFinishPic = false
    state.viewWordDic = null
    state.progress = 0
    state.currAudioSrc = null
    state.nurseryRhyme = null
    state.playState = 'init'
    state.currPicPage = 0
  },
  [types.REQ_LOADING] (state, { bool }) { // 请求加载
    state.reqLoading = bool
  },
  [types.BEIN_STATER] (state, { status }) { // 进行的状态
    state.beinState = status
  },
  [types.WAIT_TIME] (state, { time }) { // 等待时间
    state.waitTime = time
  },
  [types.IS_SHOW_SENTENCE_CN] (state, { bool }) { // 是否显示句子的汉译
    state.isShowSentenceCn = bool
  },
  [types.VIEW_WORD_DIC] (state, { word }) { // 看单词词典释义
    state.viewWordDic = word
  },
  [types.CURR_WORDS_INDEX] (state, { index }) { // 当前高亮单词索引
    state.currWordsIndex = index
  },
  [types.IS_START_SONGS] (state, { bool }) { // 是否开启儿歌
    state.isStartSongs = bool
  },
  [types.PROGRESS] (state, { progress }) { // 进度
    state.progress = progress
  },
  [types.CURR_AUDIO_SRC] (state, { src }) { // 当前音频地址
    state.currAudioSrc = src
  },
  [types.NURSERY_RHYME] (state, { infor }) { // 儿歌信息
    state.nurseryRhyme = infor
  },
  [types.PLAY_STATE] (state, { status }) { // 是否播放音频
    state.playState = status
  },
  [types.IS_FINISH_PIC] (state, { bool }) { // 判断是否完成绘本
    state.isFinishPic = bool
  },
  [types.CURR_PIC_IDX] (state, { index }) { // 当前绘画页数
    state.currPicPage = index
  }
}

// actions
/* eslint-disable prefer-promise-reject-errors */
const actions = {
  getNurseryRhyme (context) {
    context.commit(types.DATA_RESET) // 数据重置
    context.commit(types.REQ_LOADING, { bool: true }) // 请求加载
    context.commit(types.BEIN_STATER, { status: 'init' }) // 进行的状态-初始化
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      // grade: null, unit: null
      REQUEST.get('weixin_words_view', {kinds: '儿歌', sort: 'create_time'}, r => {
        // context.commit(types.NURSERY_RHYME, { infor: NurseryRhyme.data.list[0] })
        // console.log(NurseryRhyme.data.list[0])
        context.commit(types.NURSERY_RHYME, { infor: r.data.list[0] })
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
    console.log(currPicPage)
    console.log(context.getters.getPicContents)
    if (currPicPage < context.getters.getPicContents.length) {
      context.dispatch('setCurrPicPage', { index: currPicPage }) // 设置当前pic索引
    } else {
      context.commit(types.IS_FINISH_PIC, { bool: true })
    }
  },
  setCurrPicPage (context, { index }) { // 设置当前pic索引
    context.commit(types.CURR_PIC_IDX, { index: index })
  },
  lastPicBooks (context) { // 上一个绘画
    context.commit(types.VIEW_WORD_DIC, { word: null })
    context.commit(types.PLAY_STATE, { status: 'init' })
    let currPicPage = context.state.currPicPage - 1
    if (currPicPage > 0) {
      context.dispatch('setCurrPicPage', { index: currPicPage }) // 设置当前pic索引
      context.dispatch('setProgress') // 设置进度
    } else {
      context.commit(types.DATA_RESET) // 数据重置getNurseryRhyme
      context.dispatch('getNurseryRhyme').then(() => {
        context.dispatch('timeWait').then(() => {
          context.dispatch('delayChildSongs')
        })
      })
    }
  },
  timeWait (context) { // 倒计时
    context.commit(types.BEIN_STATER, { status: 'wait_item' }) // 进行的状态-倒计时
    return new Promise((resolve, reject) => {
      context.commit(types.CURR_AUDIO_SRC, { src: 'static/audio/nursery-rhyme-num-begin.mp3' }) // 请求加载
      let timeWaitInterval = setInterval(r => {
        if (context.state.waitTime < 0) { // 如果计时器结束
          clearInterval(timeWaitInterval)
          // context.dispatch('delayChildSongs')
          resolve()
        } else {
          context.commit(types.WAIT_TIME, { time: context.state.waitTime - 1 })
        }
      }, 1000)
    })
  },
  delayChildSongs (context) { // 延迟5s开始儿歌:等待时间结束后，延迟5s开始儿歌，延迟5s时播放背景音频
    context.commit(types.BEIN_STATER, { status: 'delay' }) // 进行的状态-延迟播放背景
    return new Promise((resolve, reject) => {
      context.commit(types.CURR_AUDIO_SRC, { src: 'static/audio/nursery-rhyme-begin-bgm.mp3' }) // 当前音频地址
      setTimeout(() => {
        context.dispatch('startSongs')
        context.dispatch('setSongsActionRule')
        resolve()
      }, 5000)
    })
  },
  startSongs (context) { // 开始儿歌
    context.commit(types.IS_START_SONGS, { bool: true }) // 是否开启儿歌
  },
  endSongs (context) { // 结束儿歌
    context.commit(types.IS_START_SONGS, { bool: false }) // 是否开启儿歌
  },
  setSongsAction (context, { index }) { // 设置歌曲播放行为
    context.commit(types.CURR_WORDS_INDEX, { index: index }) // 当前高亮单词索引
    let currWrod = context.getters.getWordCurrItem
    context.commit(types.CURR_AUDIO_SRC, { src: process.env.API_PIC + '/' + currWrod.audio_right[0] }) // 当前音频地址
  },
  setSongsProgress (context, { prec, length }) { // 设置进度
    let progress = Math.ceil((prec / length) * 100)
    context.commit(types.PROGRESS, { progress: progress })
  },
  setSongsActionRule (context) { // 设置歌曲播放行为规则
    context.commit(types.BEIN_STATER, { status: 'openings' }) // 进行的状态-儿歌开篇
    return new Promise((resolve, reject) => {
      let a = [0, 1, 2, 1, 2, 1, 0, 2, 1]
      // let a = DatahandleMethods.getRandomIntIndefiniteArray(0, 2, 9)
      // a[0] = 0
      // a[1] = 1
      // a[2] = 2
      let index = 1
      context.dispatch('setSongsAction', { index: 0 })
      context.dispatch('setSongsProgress', { prec: index, length: a.length })
      let setRuleInterval = setInterval(r => {
        if (index >= a.length) { // 如果计时器结束
          clearInterval(setRuleInterval)
          context.dispatch('endSongs')
          context.dispatch('setSentence')
          resolve()
        } else {
          context.dispatch('setSongsAction', { index: a[index] })
          index++
          context.dispatch('setSongsProgress', { prec: index, length: a.length })
        }
      }, 2000)
    })
  },
  setSentence (context) {
    context.commit(types.BEIN_STATER, { status: 'sentence' }) // 进行的状态-句子
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
