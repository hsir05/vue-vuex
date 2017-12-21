import REQUEST from '@/api/index.js'
import * as types from './mutation-types.js'
// import PicbooksList from '@/datajson/picbooks-list.json'

const state = {
  reqLoading: false, // 请求加载，true-开始加载
  page: 0, // 页数
  total: 0, // 总数
  // wrapperHeight: 0, // 整体的高
  pullupStatus: '', // 上拉加载状态变化
  isAllLoaded: false, // 是否全部加载
  picBooksList: [] // 绘本列表
}

// getters
const getters = {
  getPicBooksList (state, getters, rootState, rootGetters) { // 获取绘本列表
    return [...state.picBooksList]
  }
}

// mutations
const mutations = {
  [types.DATA_RESET] (state) { // 数据重置
    state.reqLoading = false
    state.page = 0
    state.total = 0
    // state.wrapperHeight = 0
    state.pullupStatus = ''
    state.isAllLoaded = false
    state.picBooksList = []
  },
  [types.REQ_LOADING] (state, { bool }) { // 请求加载
    state.reqLoading = bool
  },
  [types.PIC_BOOKS_LIST] (state, { list }) { // 绘本列表
    state.picBooksList = list
  },
  [types.PIC_BOOKS_LIST_PUSH] (state, { array }) { // 绘本列表
    for (var i = 0; i < array.length; i++) {
      state.picBooksList.push(array[i])
    }
  },
  [types.PAGE] (state, { page }) { // 页数
    state.page = page
  },
  [types.TOTAL] (state, { total }) { // 总数
    state.total = total
  },
  // [types.WRAPPER_HEIGHT] (state, { height }) { // 整体的高
  //   state.wrapperHeight = height
  // },
  [types.PULLUP_STATUS] (state, { status }) { // 上拉加载状态变化
    state.pullupStatus = status
  },
  [types.IS_ALL_LOADED] (state, { bool }) { // 是否全部加载
    state.isAllLoaded = bool
  }
}

// actions
/* eslint-disable prefer-promise-reject-errors */
const actions = {
  getPicBooksList (context) { // 请求PicBooks
    context.commit(types.DATA_RESET) // 数据重置
    context.commit(types.REQ_LOADING, { bool: true }) // 请求加载
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      REQUEST.get('course', {kinds: '绘本'}, r => {
        // let list = PicbooksList.data.list
        let list = r.data.list
        context.commit(types.PIC_BOOKS_LIST, { list: list }) // 获取绘本列表
        context.commit(types.TOTAL, { total: r.data.total }) // 获取总数
        context.commit(types.REQ_LOADING, { bool: false }) // 请求加载
        resolve()
      })
      // }, 5000)
    })
  },
  setPullupChange (context, status) { // 获取上拉加载状态变化后设置相应的值
    // 状态:
    // pull-组件已经被按下,但按下的距离未达到 topDistance;
    // drop-按下的距离不小于 topDistance,此时释放会触发 top-method;
    // loading-组件已被释放，top-method 正在执行 每当组件的状态发生变化时，loadmore 都会触发 top-status-change 方法，参数为组件目前的状态。
    // console.log(status)
    context.commit(types.PULLUP_STATUS, { status: status })
  },
  getBottomLoadData (context) {
    return new Promise((resolve, reject) => { // 注意：此处需得等待 course 请求完毕后才能调用，不然无法获取相关值，故mt-loadmore组件添加:auto-fill="false"
      let last = context.state.picBooksList.length // 获取最大数
      // console.log('总数:' + context.state.total, '当前最大数:' + last, last < context.state.total)
      if (last === 0) {
        reject('此处需得等待 course 请求完毕后才能调用，不然无法获取相关值')
      }
      if (last < context.state.total) { // 判断是否在总数之内
        context.commit(types.PAGE, { page: context.state.page + 1 })
        // console.log('当前页数：' + context.state.page)
        REQUEST.get('course', {page: context.state.page}, r => {
          context.commit(types.PIC_BOOKS_LIST_PUSH, { array: r.data.list })
          resolve()
        })
      } else {
        context.commit(types.IS_ALL_LOADED, { bool: true })
        resolve()
      }
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
