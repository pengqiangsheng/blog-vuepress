# 纯前端人脸实时识别 :rocket:

## 效果如下

![](../blog/images/live-video/live.gif)


## 代码分析

### 页面部分

- 1.第一部分主要是一个video来放视频流，然后加上一个自定义的遮罩层。
- 2.第二部分放canvas去截取视频中的一帧图像。
- 3.第三部分是img标签存放canvasToImage的结果。
- 4.最后一部分是一些调试信息，方便真机观看。

```html
    <div class="video-wrapper">
      <!-- 视频遮罩层 -->
      <div class="wrapper">
        <div id="imgTip"><h2>正在检测人脸中...</h2></div>
        <img class="img-wrapper" id="imgWrap" src="./face-wrapper.jpg"/>
        <!--拍照按钮-->
        <button id="capture" style="display: none;">拍照</button>
        <button id="closeBtn" onclick="closeStream()">关闭摄像头</button>
        <button id="openBtn" style="display: none;" onclick="openStream()">开启摄像头</button>
      </div>
      <!-- video用于显示媒体设备的视频流，自动播放 -->
      <video id="video" autoplay ></video>
    </div>
    <!-- 描绘video截图 -->
    <h1>Canvas Info</h1>
    <div class="canvas-wrapper">
      <canvas id="canvas" width="320" height="480"></canvas>
    </div>
    <h1>Img Info</h1>
    <!-- canvas 转换成 img -->
    <div id="imgView"></div>
    <!-- 错误提示，用于移动端观察 -->
    <h1>Error Info</h1>
    <div id="errorTip"></div>
    <!-- 设备信息 -->
    <h1>Device Info</h1>
    <div id="device" style="text-align: center;"></div>
```

### js部分

- 1.摄像部分
- 2.人脸识别部分

```js
    // 定义全局变量
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const imgView = document.getElementById("imgView");
    const errorTip = document.getElementById("errorTip");
    const imgWrap = document.getElementById('imgWrap');
    const device = document.getElementById('device');
    const capture = document.getElementById('capture');
    const imgTip = document.getElementById('imgTip');
    const closeBtn = document.getElementById('closeBtn');

    // 判断是否拍照
    let flag = 0
    let tipFlag = 0
    // 视频流实例
    let streamIns = null;
    
    // 新建一个tracker实例
    const tracker = new tracking.ObjectTracker(['face']); // 可选 face, eye, mouth, 需要引入相应的js
    
    // 设置步长
    tracker.setStepSize(1.7);
    
    // 绑定监听方法
    tracker.on('track', handleTracked);
    
    // 开始追踪
    tracking.track('#video', tracker);

    const SECOND = 1000
    // 10s后移除监听
    setTimeout(removeTracker, 10 * SECOND);
    
    // 处理追踪事件
    function handleTracked(event) {
      if (event.data.length === 0) {
        // 没有检测到
        console.log('没有检测到人脸');
      } else {
        // 提示用户已经检测到人脸
        if(!tipFlag) {
          imgTip.innerText = '检测人脸成功，正在拍照，请保持不动2秒！';
        }
        
        // 1秒后拍照，仅拍一次
        if(!flag) {
          flag = 1;
          setTimeout(() => {
            // 模拟btn点击事件
            capture.click();
            imgTip.innerText = '拍照完成！';
            tipFlag = 1
          }, 1000);
        }
        
        // 人脸数据点阵处理
        event.data.forEach(window.plot)
      }
    }

    // 移除监听事件
    function removeTracker() {
      errorTip.innerText = '移除追踪'
      tracker.removeListener('track', handleTracked)
    }

    // 绘制追踪框
    window.plot = function({x, y, width: w, height: h}) {
      // 创建框对象
      const rect = document.createElement('div');
      document.querySelector('.video-wrapper').appendChild(rect);
      rect.classList.add('rect');
      rect.style.width = w + 'px';
      rect.style.height = h + 'px';
      rect.style.left = (video.offsetLeft + x) + 'px';
      rect.style.top = (video.offsetTop + y) + 'px';

      // 显示追踪点到页面上
      device.innerText = "x:" + x + "y:" + y + "h:" +h + "w:" + w;
    };

    // 关闭摄像
    function closeStream() {
      errorTip.innerText = "我点击了关闭；视频流对象：" + streamIns
      try {
        streamIns.enabled = false;
        streamIns.getTracks()[0].stop();
        streamIns.getVideoTracks()[0].stop();
        closeBtn.style.display = 'none';
        openBtn.style.display = 'block';
      } catch(e) {
        throw new Error(e);
      }
    }
    
    // 开启摄像
    function openStream() {
      window.location.reload()
    }

    // 访问用户媒体设备的兼容方法
    function getUserMedia(constrains,success,error){
      if(navigator.mediaDevices.getUserMedia){
        //最新标准API
        navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
      } else if (navigator.webkitGetUserMedia){
        //webkit内核浏览器
        navigator.webkitGetUserMedia(constrains).then(success).catch(error);
      } else if (navigator.mozGetUserMedia){
        //Firefox浏览器
        navagator.mozGetUserMedia(constrains).then(success).catch(error);
      } else if (navigator.getUserMedia){
        //旧版API
        navigator.getUserMedia(constrains).then(success).catch(error);
      }
    }
    
    // 成功的回调函数
    function success(stream){
      streamIns = stream
      //兼容webkit内核浏览器
      const CompatibleURL = window.URL || window.webkitURL;
      //将视频流设置为video元素的源
      try {
        video.src = CompatibleURL.createObjectURL(stream);
      } catch (e) {
        throw new Error(e);
        video.srcObject = stream;
      }
      // 播放视频
      video.play();
    }
    
    // 异常的回调函数
    function error(error){
      errorTip.innerText = '访问用户媒体设备失败：' + error;
      throw new Error("访问用户媒体设备失败：" + error.name + error.message);
    }
    
    // 保存成png格式的图片
    function saveAsPNG(canvas) {
      return canvas.toDataURL("image/png");
    }
    
    // canvas to Image
    function convertCanvasToImage(canvas) {
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      return image;
    }
    
    // 注册拍照按钮的单击事件
    document.getElementById("capture").addEventListener("click",function(){
      //绘制画面
      context.drawImage(video,0,0,320,480);
      // 保持图片为base64格式
      const imgUrl = saveAsPNG(canvas);
      // 显示图片
      imgView.appendChild(convertCanvasToImage(canvas));
    });
    
    // js运行入口
    (function init() {
      if (navigator.mediaDevices.getUserMedia
        || navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia
      ) {
        //调用用户媒体设备，访问摄像头
        getUserMedia({
          video: {
            width: 1920,
            height: 1080,
            facingMode: "user" // 前置优先
          }
        }, success, error);
      } else {
        errorTip.innerText = '你的浏览器不支持访问用户媒体设备';
        alert("你的浏览器不支持访问用户媒体设备");
      }
    })()
```