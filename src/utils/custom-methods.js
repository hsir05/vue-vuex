import Constant from '@/config/constant.js' // 常量
export default {
  closeCurWindow () { // 关闭当前窗口
    window.opener = null
    window.open('', '_self')
    window.close()
  },
  getPhotoURL (photo, size) {
    let arr = photo.split('/')
    let popUrl = arr.pop()
    let thumb = Constant.GET_FILE_URL + arr.join('/') + '/' + size + '/' + popUrl
    return thumb
  },
  dataType (data) { // 获取数据类型
    return ({}).toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
  },
  getCurHistory () {
    return window.history.length
  },
  clearAllInterval () { // 清除页面所有的定时器
    var end = setTimeout(function () {}, 1)
    var start = (end - 100) > 0 ? end - 100 : 0
    for (var i = start; i <= end; i++) {
      clearTimeout(i)
    }
  },
  deepCopy (data) { // 深拷贝
    /* 参数：data-需要深拷贝的数据 */
    if (!data) { return } // 如果为null或者undefined
    if (data.constructor === Array) {
      return data.concat()
    }
    return JSON.parse(JSON.stringify(data))
  }
}
