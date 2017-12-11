<template lang="html">
  <div>
    <mt-button type="default" @click="analysisAudioWav">default</mt-button>
  </div>
</template>

<script>
export default {
  methods: {
    analysisAudioWav () {
      var url = '/wav/163532-O-0031-4006095509-S.wav'
      var xmlhttp = null
      if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        /* eslint-disable no-new */
        xmlhttp = new window.XMLHttpRequest()
      } else { // code for IE6, IE5
        /* eslint-disable no-new */
        xmlhttp = new window.ActiveXObject('Microsoft.XMLHTTP')
      }
      xmlhttp.open('GET', url, true)
      xmlhttp.withCredentials = true

      // recent browsers
      if ('responseType' in xmlhttp) {
        xmlhttp.responseType = 'arraybuffer'
      }

      // older browser
      if (xmlhttp.overrideMimeType) {
        xmlhttp.overrideMimeType('text/plain; charset=x-user-defined')
      }
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          var file = xmlhttp.response || xmlhttp.responseText

          var blob = new Blob([file], {type: 'audio/WAVE'})
          console.log(blob)
          var fr = new FileReader()
          // fr.readAsText(blob)
          // fr.onload = function (e) {
          //   console.log(e.target.result)
          // }
          fr.readAsArrayBuffer(blob)
          fr.onload = function (e) {
            // console.log(e)
            console.log(e.target.result)
            var buffer = e.target.result
            var dv = new DataView(buffer, 0) // 参数：一个现有的ArrayBuffer、视图实例引用的buffer的字节偏移量.如果没有指定,buffer视图会以首字节作为开始、字节数组中元素的个数。如果未指定，视图的长度将会以buffer的长度匹配
            console.log(dv)
            var arr = new Uint8Array(buffer)
            console.log(arr)
            // console.log(dv.getUint32(4, true) + 8)
            // dv.setInt16(1, 42);
            // dv.getInt16(1);
            // console.log(dv.getUint8(5)<<8);
            // console.log(dv.getUint8(4));
            // var data = buffer.slice((dv.getUint8(6)<<16)+(dv.getUint8(5)<<8)+dv.getUint8(4) + 8, buffer.byteLength+1);
            // var data = buffer.slice(dv.getUint32(4, true) + 8, buffer.byteLength + 1)
            // console.log(data)
            // console.log(arrayBufferToString(data))
            // document.getElementById('divs').innerHTML = arrayBufferToString(data)
          }
        }
      }
      xmlhttp.send()
    }
  }
}
</script>

<style lang="css">
</style>
