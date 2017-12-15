'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  API_ADDR: '"/api/aiwei/stat"',
  API_PIC: '"/aiwei"',
  NODE_ENV: '"development"'
})
