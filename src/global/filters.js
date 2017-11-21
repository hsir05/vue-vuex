import Vue from 'vue'
// import CustomMethods from '@/utils/custom-methods.js'
import DatahandleMethod from '@/utils/datahandle-methods.js'
// import Translate from '@/config/translate.js'
import UnwantedField from '@/config/unwanted-field.js'

// 设置并获取需要的过滤
Vue.filter('needArrayFilter', function (data, filterArray) {
  // 使用:needArrayFilter([{filter: String, arg: Array}, {filter: String, arg: Array} ...])
  if (!filterArray) { return data }
  if (Object.prototype.toString.call(filterArray) !== '[object Array]') {
    try {
      throw new Error('接受的是一个数组,但是却得到一个' + typeof filterArray)
    } catch (e) {
      console.error(e)
      return data
    }
  }
  // console.log(filterArray)
  var filterData = data
  for (var i = 0; i < filterArray.length; i++) {
    // console.log(filterArray[i].filter, filterArray[i].arg)
    if (!Vue.filter(filterArray[i].filter)) { // 如果没有找到该过滤
      try {
        throw new Error(filterArray[i].filter + '过滤不存在,请自行构写这个过滤')
      } catch (e) {
        // console.error(e)
        console.warn(e.name + ':' + e.message)
        continue
      }
    }
    const needles = filterArray[i].arg ? filterArray[i].arg : []
    filterData = Vue.filter(filterArray[i].filter)(filterData, ...needles)
  }
  // console.log(filterData)
  return filterData
})

// 设置并获取需要的过滤
Vue.filter('needFilter', function (data, filterName) {
  if (filterName.constructor !== String) {
    return data
  }
  return Vue.filter(filterName)(data)
})

// 移除多余对象的字段
Vue.filter('unwantedField', function (object, unfieldKey) {
  // console.log(object, unfieldKey)
  if (JSON.stringify(object) === '{}') { return object }
  if (!unfieldKey) { return object }
  if (UnwantedField[unfieldKey]) {
    return DatahandleMethod.delObjSurplusAttr(object, UnwantedField[unfieldKey])
  }
  return object
})
