import CustomMethods from './custom-methods.js'
import JudgeMethods from './judge-methods.js'
export default {
  arrayObjectOrder (array, basis) { // 排序
    // array:[{}]格式数组;basis:排序依据
    // console.log(this.judgeType(basis, 'string') && this.judgeType(array, 'array'))
    if (JudgeMethods.judgeBaseType(basis, 'string') && JudgeMethods.judgeBaseType(array, 'array')) {
      let order
      for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j <= array.length - 1; j++) {
          // console.log(array[i][basis], array[j][basis])
          if (array[i][basis] > array[j][basis]) {
            order = array[i]
            array[i] = array[j]
            array[j] = order
          }
        }
      }
      return array
    } else {
      console.log('请传入正确的参数')
    }
  },
  arrayItemMoveFirst (value, array) {
    if (array.indexOf(value) === -1) return []
    var index = array.indexOf(value)
    array.splice(index, 1)
    array.unshift(value)
    return array
  },
  delObjSurplusAttr (data, condition) { // 删除对象多余的属性
    /*
      参数：object是对象，condition是数组
    */
    // if (object.constructor !== Object) { return }
    // if (condition.constructor !== Array) { return }
    if (!condition) { return data }
    var object = CustomMethods.deepCopy(data)
    for (var i = 0; i < condition.length; i++) {
      delete object[condition[i]]
    }
    return object
  },
  removeSpace (str) { // 去除空格
    /* str */
    if (str.constructor !== String) { return }
    var strArr = str.split(' ')
    var newStr = ''
    for (let i = 0; i < strArr.length; i++) {
      newStr = newStr + strArr[i]
    }
    return newStr
  },
  removeRepeat (array, contrast) {
    // 数组去重：使用于普通数组和对象对称数组
    /*
      说明：array是[1, 2, 3]数组和[{}, {}, {}], 当时用[{}, {}, {}]类型数组时，contrast为对比去重的{}项的字段
    */
    // console.log(array, contrast)
    if (array.length !== 0) {
      var res = [array[0]]
      for (var o = 1; o < array.length; o++) {
        var repeat = false
        for (var t = 0; t < res.length; t++) {
          if (contrast !== undefined) {
            if (array[o][contrast] === array[t][contrast]) {
              repeat = true
              break
            }
          } else {
            if (array[o] === array[t]) {
              repeat = true
              break
            }
          }
        }
        if (!repeat) {
          res.push(array[o])
        }
      }
      // console.log(res)
      return res
    } else {
      return array
    }
  },
  byteConvert (byteSize) { // byte转换
    if (byteSize === 0) return '0 B'
    var KB = 1024
    var byteUnit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    var power = Math.floor(Math.log(byteSize) / Math.log(KB)) // log() 方法可返回一个数的自然对数
    // console.log(Math.log(byteSize), Math.log(KB))
    // console.log(power)
    // console.log((byteSize / Math.pow(KB, power)).toPrecision(4) + ' ' + byteUnit[power])
    // Math.pow(x, y)-x 的 y 次幂
    return (byteSize / Math.pow(KB, power)).toPrecision(4) + ' ' + byteUnit[power] // toPrecision() 方法可在对象的值超出指定位数时将其转换为指数计数法
    // 另一种方法------------------------------------------------
    // var convert = byteSize
    // for (var i = 0; i < byteUnit.length; i++) {
    //   if (convert > KB) {
    //     convert = convert / KB
    //     console.log(convert)
    //   } else {
    //     convert = Math.floor((convert * 100)) / 100
    //     console.log(convert)
    //     return convert + ' ' + byteUnit[i]
    //   }
    // }
  },
  switchDateYYTM (dateValue) { // 转换时间格式为:YYYY-MM-DD
    if (!dateValue) { return '-' }
    // 把Date对象的值转换为YYYY-MM-DD日期类型
    var date = new Date(dateValue)
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month < 10) { month = '0' + month }
    if (strDate < 10) { strDate = '0' + strDate }
    var currentdate = date.getFullYear() + '-' + month + '-' + strDate
    return currentdate
  },
  switchDateYYTMhms (dateValue) { // getNowFormatDate
    if (!dateValue) { return '-' }
    // 把Date对象的值转换为YYYY-MM-DD hh:mm:ss日期类型
    var date = new Date(dateValue)
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month < 10) { month = '0' + month }
    if (strDate < 10) { strDate = '0' + strDate }
    var currentdate = date.getFullYear() + '-' + month + '-' + strDate + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    return currentdate
  },
  intervalTimeStampYYTMhms (timeStamp) { // 间隔时间戳转换为时分秒
    if (timeStamp === 0) return '0s'
    var days = parseInt(timeStamp / (1000 * 60 * 60 * 24))
    var hours = parseInt((timeStamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = parseInt((timeStamp % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = (timeStamp % (1000 * 60)) / 1000

    return (days === 0 ? '' : days + '天') +
      (hours === 0 ? '' : hours + ' 小时 ') +
      (minutes === 0 ? '' : minutes + ' 分钟 ') +
      (seconds === 0 ? '' : seconds + ' 秒 ')
  },
  getTimeInfo (dateValue) { // 获取时间信息-返回对象
    if (!dateValue) { return {} }
    var date = new Date(dateValue)
    var month = date.getMonth() + 1 // 月份
    var day = date.getDate() // 日期
    if (month < 10) { month = '0' + month }
    if (day < 10) { day = '0' + day }
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    var weekArray = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

    var dateInfo = {
      year: date.getFullYear(), // 年
      month: month,
      day: day,
      hours: date.getHours(), // 时
      minutes: minutes,
      seconds: seconds,
      week: weekArray[date.getDay()]
    }
    return dateInfo
  },
  strAnalyseURL (str) { // 从字符串中解析出url
    // "这是一个字符串 https://www.baidu.com/ http://www.baidu.com/?fdsajlkfd/#dfdaslfd/fdsaf 里面有这个网址 http://fanyi.baidu.com"
    let urlRegex = /(http|https|ftp|rtsp|mms):\/\/\S*/g
    let matchArray = []
    let isUrl = str.search(urlRegex) !== -1 // 是否存在url
    let execArray
    let lastIndex = 0
    // console.log(isUrl)
    while ((execArray = urlRegex.exec(str)) !== null) {
      // let matchLength = execArray[0].length
      // let endIndex = Number(execArray.index) + matchLength
      let lastContent = str.slice(lastIndex, execArray.index)
      matchArray.push({init_index: execArray.index, end_index: urlRegex.lastIndex, url: execArray[0], last_content: lastContent})
      lastIndex = urlRegex.lastIndex
    }
    let cullStr = str.replace(/\s*(http|https|ftp|rtsp|mms):\/\/\S*/g, req => {
      /* eslint-disable no-return-assign */
      return req = ''
    }) // 剔除后的字符串
    // console.log(matchArray)
    // console.log(cullStr)
    return {
      macth: matchArray, // 匹配的解析结果
      cull: cullStr, // 裁剪后的字符串
      init: str, // 初始字符串
      is_url: isUrl // 是否存在url
    }
  }
}
