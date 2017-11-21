export default {
  judgeBaseType (judge, type) { // 判断类型:如果你要判断的是基本数据类型或JavaScript内置对象，使用toString； 如果要判断的时自定义类型，请使用instanceof
    // console.log(judge, type)
    let arr = ['object', 'null', 'undefined', 'array', 'number', 'string', 'boolean']
    if (arr.indexOf(type) === -1) {
      console.log('请传入正确的type类型')
      return
    }
    if (({}).toString.call(judge).match(/\s([a-zA-Z]+)/)[1].toLowerCase() === type) {
      return true
    }
    return false
  },
  judgeIsNullObj (data) { // 判断对象是否为空
    /**/
    // 第一种方法
    // for (var i in data) { // 如果不为空，则会执行到这一步，返回true
    //   return true
    // }
    // return false // 如果为空,返回false
    // 第二种方法
    // if (Object.keys(data).length === 0) {
    //   return false // 如果为空,返回false
    // }
    // return true // 如果不为空，则会执行到这一步，返回true
    // 第三种方法
    if (JSON.stringify(data) === '{}') {
      return false // 如果为空,返回false
    }
    return true // 如果不为空，则会执行到这一步，返回true
  },
  judgeFileFormat (strValue, allowFormat) { // 判断文件允许格式是否正确
    /* strValue：需要判断的filename(字符串)；allowFormat：允许的格式(数组) */
    if (strValue.constructor === String) { // 判断字符串形式
      if (strValue.indexOf('.') === -1) {
        return false
      }
      if (allowFormat.lenght === 0) { return false }
      let arrSplit = strValue.split('.')
      // 如果在allowFormat中找到了匹配的值则return-true，不然没有找到则返回false
      for (var item = 0; item < allowFormat.length; item++) {
        if (arrSplit[arrSplit.length - 1].toLowerCase() === allowFormat[item].toLowerCase()) {
          return true
        }
      }
      return false
    } else {
      return false
    }
  },
  judgeIsDate (objValue) {
    // 判断对象的值是不是Date即日期类型
    if (objValue instanceof Date) { // 如果是，则会执行到这一步，返回true
      return true
    }
    return false // 如果不是,返回false
  },
  // 自定义正则表达式验证
  customRegExp (Regexp, value) {
    /*
      说明：customRegExp进行自定义正则表达式验证，参数：Regexp(必填)-正则表达式,value(必填)-要验证的内容
    */
    if (new RegExp(Regexp).test(value)) {
      return true
    }
    return false
  },
  validatorDateYYTM (dateObjValue) {
    // 判断是否符合YYYY-MM-DD模式的，如果是则返回true
    if (new RegExp(/^(\d{4})-(\d{2})-(\d{2})$/).test(dateObjValue)) {
      return true
    }
    return false // 如果不是,返回false
  },
  isLeapYear () { // 判断是否为闰年
    // 闰年能被4整除且不能被100整除，或能被400整除
    return (this.getYear() % 4 === 0 && ((this.getYear() % 100 !== 0) || (this.getYear() % 400 === 0)))
  },
  isEnglish (value) {
    // 判断是否为英文的，如果是则返回true
    if (new RegExp(/^[a-zA-Z]+$/).test(value)) {
      return true
    }
    return false // 如果不是,返回false
  },
  isChinese (value) {
    // 判断是否为中文的，如果是则返回true
    if (new RegExp(/^[\u4e00-\u9fa5]+$/).test(value)) {
      return true
    }
    return false // 如果不是,返回false
  },
  arrayOneof (value, validList) {
    if (validList.indexOf(value) !== -1) {
      return true
    }
    return false
  },
  judgeIsUrl (str) { // 判断字符串是不是url-http://www.jb51.net/article/96151.htm
    /* eslint-disable operator-linebreak */
    /* eslint-disable quotes */
    /* eslint-disable no-useless-escape */
    var urlRegexStr = "^((https|http|ftp|rtsp|mms)?://)"
      + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
      + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
      + "|" // 允许IP和DOMAIN（域名）
      + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
      + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
      + "[a-z]{2,6})" // first level domain- .com or .museum
      + "(:[0-9]{1,4})?" // 端口- :80
      + "((/?)|" // a slash isn't required if there is no file name
      + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
    var urlRegex = new RegExp(urlRegexStr, 'g')
    return urlRegex.test(str)
  }
}
