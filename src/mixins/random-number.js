module.exports = {
  data () {
    return {}
  },
  methods: {
    randomNumber (length) {
      return Math.floor(Math.random() * (length))
    }
  }
}
/* 使用时传入一个长度
*/
