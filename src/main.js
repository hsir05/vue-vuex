/* eslint-disable import/first */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
Vue.config.productionTip = false

import Vuex from 'vuex'
Vue.use(Vuex)

// 引用外部插件----------------------------
// vue路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routers from '@/router/index.js'
const router = new VueRouter({
  routes: routers
})

// Mint UI
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

// ramda
const ramda = require('ramda')
Vue.prototype.$_ramda = ramda
// 引用外部插件----------------------------

// 引用自定义插件----------------------------
// 请求server的目录
import REQUEST from '@/api/ajax-plug-in.js'
Vue.use(REQUEST, {name: '$REQUEST'}) // ApiAjax
// 引用自定义插件----------------------------

// 配置文件-------------------------------
// 配置碎片
import Config from '@/config'
Vue.prototype.$Config = Config
// 共用常量配置文件
import Constant from '@/config/constant.js'
Vue.prototype.$Constant = Constant
// 需要隐藏的无用的字段
import UnwantedField from '@/config/unwanted-field.js'
Vue.prototype.$UnwantedField = UnwantedField
// 自定义的翻译配置文件
import Translate from '@/config/translate.js'
Vue.prototype.$Translate = Translate
// 配置文件-------------------------------

// 项目工具型函数--------------------------
// 自定义的共用方法
import CustomMethods from './utils/custom-methods.js'
Vue.prototype.$CustomMethods = CustomMethods
// 自定义的数据处理方法
import DatahandleMethod from './utils/datahandle-methods.js'
Vue.prototype.$DatahandleMethod = DatahandleMethod
// 自定义的判断方法
import JudgeMethod from './utils/judge-methods.js'
Object.defineProperty(Vue.prototype, '$JudgeMethod', { value: JudgeMethod })
// 项目工具型函数--------------------------

// 引用自定义全局组件-----------------------
// import Component from '@/global/component.js'
const Component = require('@/global/component.js')
// 引用自定义全局组件-----------------------

// 自定义全局混合--------------------------
// import Methods from '@/global/methods.js'
const Methods = require('@/global/methods.js')
// 自定义全局混合--------------------------

// 自定义全局指令--------------------------
// import Directive from '@/global/directive.js'
const Directive = require('@/global/directive.js')
// 自定义全局指令--------------------------

// 自定义全局过滤--------------------------
// import Filters from './global/filters.js'
const Filters = require('@/global/filters.js')
// 自定义全局过滤--------------------------

import store from '@/store/root.js' // state

import App from '@/App'
/* eslint-disable no-new */
new Vue({
  router,
  component: Component,
  mixins: Methods,
  filters: Filters,
  directive: Directive,
  store: store,
  el: '#app',
  render: (h) => h(App)
})
