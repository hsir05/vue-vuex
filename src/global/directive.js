import Vue from 'vue'

// 返回一个变量名的指令
Vue.directive('need-directive', function (el, binding, vnode, oldVnode) {
  // 指令定义函数的钩子函数
  // bind: function () {},
  // inserted: function () {},
  // update: function () {},
  // componentUpdated: function () {},
  // unbind: function () {}
  // console.log(el, binding, vnode, oldVnode)
  // binding: {name：指令名, value：指令的绑定值, expression：绑定值的字符串形式, arg：传给指令的参数}
  // vnode: 可以获取$data,即vue的this
  // console.log(el, binding, vnode, oldVnode)
  // 适用于<span v-need-directive:translate="translate"></span> translate: 'rate'
  // if (Object.prototype.toString.call(binding.arg) !== '[object String]') {
  //   return binding.arg
  // }
  // Vue.directive(binding.arg).bind(el, binding, vnode, oldVnode)

  // 适用于<span v-need-directive="need_directive"></span> need_directive: {directive: 'translate', value: 'rate'}
  if (Object.prototype.toString.call(binding.value) !== '[object Object]') {
    return binding.value
  }
  var needDirective = Vue.directive(binding.value.directive)
  // console.log(needDirective)
  binding.value = binding.value.value
  // console.log(binding)
  needDirective.bind(el, binding, vnode, oldVnode)
  // needDirective.update(el, binding, vnode, oldVnode)
})

/* eslint-disable no-new */
new Vue({
  created () {
  }
})
