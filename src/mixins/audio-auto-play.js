module.exports = {
  data () {
    return {}
  },
  methods: {
    playAudio (ElemId) {
      if (window.WeixinJSBridge) {
        wx.getNetworkType({
          success: function (res) {
            document.getElementById(ElemId).play()
          },
          fail: function (res) {
            document.getElementById(ElemId).play()
          }
        })
      } else {
        document.addEventListener('WeixinJSBridgeReady', function () {
          wx.getNetworkType({
            success: function (res) {
              document.getElementById(ElemId).play()
            },
            fail: function (res) {
              document.getElementById(ElemId).play()
            }
          })
        }, false)
      }
    }
  }
}
/* 解决ios微信下自动播放问题
*使用此方法必须传入音频的id  -- ElemId
*且在项目中引入 <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
*/
