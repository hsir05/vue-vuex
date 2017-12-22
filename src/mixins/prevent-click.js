module.exports = {
  data () {
    return {
      clickTime: null
    }
  },
  methods: {
    /*
    *@interTime 调用函数时传入的间隔时间参数，默认间隔时间为 1000ms
    */
    preventClick (interTime) { // 防止按钮重复提交
      let intervalTime = interTime || 1000
      let nowTime = new Date().getTime()
      let clickAfterTime = this.clickTime
      if (this.clickTime !== null && nowTime - clickAfterTime < intervalTime) {
        console.log('防止重复提交')
        return false
      } else {
        this.clickTime = nowTime
        return true
      }
    }
  }
}
