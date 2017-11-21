var root = '/api/capital'

var request = require('superagent')

function dataType (data) { // 获取数据类型
  return ({}).toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// var httpStatus = {
//   '403': '您没有请求权限'
// }

function filterNull (o) { // 过滤值为null的请求参数数据
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (dataType(o[key]) === 'string') {
      o[key] = o[key].trim()
      if (key === 'asset_id') {
        o[key] = +o[key]
      }
      if (o[key].length === 0) {
        delete o[key]
      }
    } else if (dataType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (dataType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
// function trim (str) {
//   return str.replace(/(^\s*)|(\s*$)/g, '')
// }
function ajaxAgent (method, url, params, success, failure) { // 发送请求并得到响应
  var r = request(method, url).type('text/plain').withCredentials()
  if (params) {
    params = filterNull(params)
    if (method === 'POST' || method === 'PUT') {
      if (dataType(params) === 'object') {
        params = JSON.stringify(params)
      }
      r = r.send(params)
    } else if (method === 'GET' || method === 'DELETE') {
      r = r.query(params)
    }
  }
  r.end(function (err, response) {
    // console.log(err, response)
    if (err) {
      if (response.status === 401) {
        window.location.href = '#/login'
      } else {
        if (failure) {
          failure({data: err.name + ': ' + err.message, http_status: response.status}, response, 'HTTP_ERROR') // err, res, esta
        } else {
          window.alert('api error, HTTP CODE: ' + response.status)
        }
      }
    } else {
      if (response.body.status === 0) {
        if (success) {
          success(response.body, response) // rdata, res
        }
      } else {
        if (failure) {
          failure(response.body, response, 'STATUS_ERROR') // err:, res, esta
        } else {
          window.alert(response.body.data)
        }
      }
    }
  })
}

function testRequestParams (method, url, params, success, failure) { // 验证请求时，传递的参数
  if (Object.prototype.toString.call(success) !== '[object Function]') {
    try {
      throw new Error('成功的回调函数位置接受的是一个Function,但是却得到一个' + dataType(success))
    } catch (e) {
      console.error(e)
      return
    }
  }
  if (failure) {
    if (Object.prototype.toString.call(failure) !== '[object Function]') {
      try {
        throw new Error('失败的回调函数位置接受的是一个Function,但是却得到一个' + dataType(failure))
      } catch (e) {
        console.error(e)
        return
      }
    }
  }
  if (Object.prototype.toString.call(params) === '[object Object]' || params === null) {
    return ajaxAgent(method, url, params, success, failure)
  } else {
    try {
      throw new Error('接受的是一个对象或者为空(即null),但是却得到一个' + dataType(params))
    } catch (e) {
      console.error(e)
    }
  }
}

export default {
  install: function (Vue, options) {
    Object.defineProperty(Vue.prototype, options.name, {
      value: {
        /*
          参数:
          url,
          params-请求参数，
          success-成功的回调函数，参数：返回数据、response响应数据,
          failure-失败的回调函数,参数：返回数据、response响应数据、失败类型（STATUS_ERROR:返回数据状态不为0，HTTP_ERROR:响应状态错误及不为statusCode）
        */
        get: function (url, params, success, failure) {
          testRequestParams('GET', root + '/' + url, params, success, failure)
          // return ajaxAgent('GET', root + '/' + url, params, success, failure)
        },
        post: function (url, params, success, failure) {
          testRequestParams('POST', root + '/' + url, params, success, failure)
          // return ajaxAgent('POST', root + '/' + url, params, success, failure)
        },
        put: function (url, params, success, failure) {
          testRequestParams('PUT', root + '/' + url, params, success, failure)
          // return ajaxAgent('PUT', root + '/' + url, params, success, failure)
        },
        delete: function (url, params, success, failure) {
          testRequestParams('DELETE', root + '/' + url, params, success, failure)
          // return ajaxAgent('DELETE', root + '/' + url, params, success, failure)
        }
      }
    })
  }
}
// import REQUEST from './index.js'
// export default {
//   install: function (Vue, options) {
//     Object.defineProperty(Vue.prototype, '$ApiAjax', { value: REQUEST })
//   }
// }
