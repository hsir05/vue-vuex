module.exports = {
  data () {
    return {
      clickTime: null
    }
  },
  methods: {
    preventClick () { // 防止按钮重复提交
      let nowTime = new Date().getTime()
      let clickBeforeTime = this.clickTime
      if (this.clickTime !== null && nowTime - clickBeforeTime < 1000) {
        console.log('防止重复提交')
        return false
      } else {
        this.clickTime = nowTime
        return true
      }
    }
  }
}
