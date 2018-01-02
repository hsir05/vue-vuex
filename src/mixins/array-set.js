module.exports = {
  data () {
    return {}
  },
  methods: {
    arraySet (arr) {
      let ret = []
      let json = {}
      let length = arr.length
      for (var i = 0; i < length; i++) {
        let val = arr[i].id
        if (!json[val]) {
          json[val] = 1
          ret.push(arr[i])
        }
      }
      return ret
    }
  }
}
/*
*该方法用于一维数组的去重，使用传入一个数组，将返回一个去重后的数组
*
*/
