import REQUEST from '@/api/index.js'
import * as types from './mutation-types'

const state = {
  words: []
}

// getters
const getters = {
  getAllWords (state, getters, rootState, rootGetters) {
    // 获取所有单词
    return [...state.words]
  },
  getWordsIndexItem (state, getters, rootState, rootGetters) {
    // 通过索引获取某一项单词信息
    return index => {
      return [...state.words][index]
    }
  }, // 获取处理后的数据
  getDealWords (state, getters, rootState, rootGetters) {
    // console.log(state)
    // let data = [
    //   [{syllable: 'e', pic_photo: 'upload/753.png', audio_right: '234234.mp3'},
    //   {syllable: 'one', pic_photo: 'upload/753.png', relation: 'one', audio_right: '234.mp3'},
    //   {syllable: 'e', pic_photo: 'upload/753.png', audio_error: '234.mp3'}],

    //   [{syllable: 'e', pic_photo: 'upload/753.png', audio_right: '234234.mp3'},
    //   {syllable: 'vet', pic_photo: 'upload/753.png', relation: 'one', audio_right: '234.mp3'},
    //   {syllable: 'e', pic_photo: 'upload/753.png', audio_error: '234.mp3'}]
    // ]
    // console.log(data)

    return [...state.words]
  },
  getWordsIdItem (state, getters, rootState, rootGetters) {
    // 通过id获取某一项单词信息
    return id => {
      return [...state.words].find(w => {
        return w.id === id
      })
    }
  },
  getWordItem (state, getters, rootState, rootGetters) {
    // 通过单词获取某一项单词信息
    return word => {
      return [...state.words].find(w => {
        return w.word === word
      })
    }
  },
  getRandomWordItem (state, getters, rootState, rootGetters) {
    // 随机获取某一项单词信息
    return idx => {
      function getRandomIndex (idx) {
        let index = Math.floor(Math.random() * state.words.length)
        // console.log(index, state.words.length)
        if (index === idx) {
          return getRandomIndex(idx)
        }
        return index
      }
      let i = getRandomIndex(idx)
      return [...state.words][i]
    }
  }
}

// mutations
const mutations = {
  [types.DATA_RESET] (state) {
    // 数据重置
    state.words = []
  },
  [types.WORDS] (state, { words }) {
    // words
    state.words = words
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
        // let list = r.data.list.map(l => {
        //   let item = { ...l }
        //   item['word_photo'] = [...item.pic_right]
        //   // item['word_photo'] = [...item.pic_right.slice(1)]
        //   item['main_photo'] = [item.pic_right[0]]
        //   item['contrast_photo'] = [...item.pic_error]
        //   item['word_audio'] = [...item.audio_right]
        //   item['contrast_audio'] = [...item.audio_error]
        //   delete item.pic_error
        //   delete item.pic_right
        //   delete item.audio_error
        //   delete item.audio_right
        //   return item
        // })
        // console.log(list)
        context.commit(types.WORDS, { words: r.data.list })
        // context.commit(types.WORDS, { words: [{word: 'Oh', cn: '噢'}] })
        resolve()
        // setTimeout(() => {
        //   resolve()
        // }, 1000)
      })
    })
  }
}

export default {
  namespaced: true, // 根据模块注册的路径调整命名
  state,
  getters,
  actions,
  mutations
}
