import Vue from 'vue'
import Translate from '@/config/translate.js'

// Vue.mixin 方式实质就是就是在 vue 初始化对象的时候，把 Vue.mixin 的参数 复制到了初始化对象中（具体可以参考源码）即和$data\$refs\$options
Vue.mixin({
  methods: {
    $_translate (keys) { // element翻译方法
      let translate = Translate[keys] ? Translate[keys] : keys
      return translate
    }
  }
})
