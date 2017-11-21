export default {
  CURRENT_WORK_DIR: process.env.CURRENT_WORK_DIR, // 当前脚本的工作目录的路径
  GIT_COMMIT_VERSION: process.env.GIT_COMMIT_VERSION, // 获取git版本
  UPLOAD_URL: process.env.API_ADDR + '/upload', // action-上传的地址
  GET_FILE_URL: process.env.API_ADDR + '/sfile/' // 文件存入地址
}
