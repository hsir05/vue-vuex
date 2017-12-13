'use strict'

// 获取git版本
var fs = require("fs")
// 当前脚本的工作目录的路径
var cwd = '"' + process.cwd() + '"' // process-node全局模块用来与当前进程互动，可以通过全局变量process访问，不必使用require命令加载。它是一个EventEmitter对象的实例。process.cwd()表示返回运行当前脚本的工作目录的路径
var gitHEAD = fs.readFileSync('.git/HEAD', 'utf-8').trim() // ref: refs/heads/develop
var ref = gitHEAD.split(': ')[1] // refs/heads/develop
var develop = gitHEAD.split('/')[2] // 环境：develop
var gitVersion = fs.readFileSync('.git/' + ref, 'utf-8').trim() // git版本号，例如：6ceb0ab5059d01fd444cf4e78467cc2dd1184a66
var gitCommitVersion = '"' + develop + ': ' + gitVersion + '"' // 例如dev环境: "develop: 6ceb0ab5059d01fd444cf4e78467cc2dd1184a66"
module.exports = {
  CURRENT_WORK_DIR: cwd, // 当前脚本的工作目录的路径
  GIT_COMMIT_VERSION: gitCommitVersion, // 获取git版本
  API_ADDR: '"/api/capital"',
  API_PIC: '"/aiwei/"',
  NODE_ENV: '"production"'
}
