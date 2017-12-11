import HuibenJson from '@/datajson/huiben.json'
import WordsJson from '@/datajson/words.json'

const huiben = HuibenJson
const words = WordsJson

export default {
  get: function (url, params, success, failure) {
    setTimeout(() => {
      if (url === 'huiben') {
        success(huiben)
      }
      if (url === 'words') {
        success(words)
      }
      // failure({'data': '错误', 'status': 1})
    }, 1100)
  },
  post: function (url, params, success, failure) {
    return []
  },
  put: function (url, params, success, failure) {
    return []
  },
  delete: function (url, params, success, failure) {
    return []
  }
}
