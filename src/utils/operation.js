// function precision (...needles) {
//   console.log(needles)
// }

function precision (...needles) { // 找到最长的小数位数
  let digits = needles.map(n => {
    return getPrecision(n)
  })
  return Math.max(...digits)
}

function getPrecision (value) { // 计算小数位位数
  const valueString = value.toString()
  const dotPosition = valueString.indexOf('.')
  let precision = 0
  if (dotPosition !== -1) {
    precision = valueString.length - dotPosition - 1
  }
  return precision
}

function toPrecision (num, precision) { // 获取浮点数
  return parseFloat(parseFloat(Number(num).toFixed(precision)))
}

function _addition (..._addend) {
  return _addend.reduce((result, num) => {
    return result + num
  }, 0)
}
// let result = 0
// for (var i = 0; i < _addend.length; i++) {
//   result += _addend[i]
// }
// return result

function _subtraction (_minuend, _subtrahend) {
  return _minuend - _subtrahend
}

export default {
  // addition(1.0001, 2.0002, 3.0003, 4.0004) -> 10.001
  addition (...addend) { // 加方法
    const maxDecimalPlace = precision(...addend) // 获取最大的小数位
    // console.log(maxDecimalPlace)
    let toAddend = addend.map(a => {
      return toPrecision(a, maxDecimalPlace)
    })
    let result = _addition(...toAddend)
    // console.log(result)
    return toPrecision(result, maxDecimalPlace)
  },
  // subtraction(10.0072, 2.0022) -> 8.005
  // subtraction(10.008901, 2.0009) -> 8.00801
  // (minuend-被减数, subtrahend-减数)
  subtraction (minuend, subtrahend) {
    const maxDecimalPlace = precision(minuend, subtrahend) // 获取最大的小数位
    // console.log(maxDecimalPlace)
    let toMinuend = toPrecision(minuend, maxDecimalPlace)
    let toSubtrahend = toPrecision(subtrahend, maxDecimalPlace)
    // console.log(toMinuend, toSubtrahend)
    let result = _subtraction(toMinuend, toSubtrahend)
    // console.log(result)
    return toPrecision(result, maxDecimalPlace)
  }
}
