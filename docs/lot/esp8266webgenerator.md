# ESP8266/32网站快速开发脚手架 ||  MQTT Web Client

> ESP8266/32网站快速开发脚手架 和 mqtt web客户端 二合一

# 功能

> 如果你熟悉Vue并且会用Vue进行网站开发，那么你可以使用第二个功能

- 1. 生成mqtt web客户端并编译成`arduino`文件
- 2. esp8266/32 网站快速开发脚手架

# 特色

> 集成了编译功能，将打包好的`web app`通过转`七牛cdn`的方式编译成`arduino`代码，最后输出到根目录下的`output`文件夹内。

你只需要将`output/webServer.ino`烧写到您的esp8266/32上即可运行mqtt web客户端，打开串口输出的ip地址一切就大功告成了。

# 使用方法

软件需要：

- [NodeJS安装地址](https://nodejs.org/zh-cn/)
- [yarn安装地址](https://yarn.bootcss.com/)
- [Git安装地址](https://git-scm.com/)

> 确保你安装好了以上环境

- 1.将本项目克隆到本地
- 2.安装依赖（需要node.js环境和yarn）运行`yarn`
- 3.运行`yarn bqf`
- 4.拷贝根目录下的`output/webServer.ino`进行烧写
- 5.查看串口输出的ip地址
- 6.在浏览器输出上面的ip地址
- 7.请看完这篇文档确保你不会出错[首次使用必看](#第一次使用请看)

# 指令说明
- dev 运行开发
- build 打包
- build:stage 预发布打包，有vconsole
- view 预发布打包并在本地启动一个web服务器
- http 进入打包目录并启动web服务器
- qiniu 用七牛云对dist里面的静态文件进行上传
- format 格式化html的内容并输出到`output`目录下
- bqf 将`build:stage` `qiniu` `format` 按顺序进行

# 第一次使用请看！！！！

在根目录下将 `config.json.back` 文件改名成 `config.json`，并填入以下信息：

```json
{
  "perfix": "", // 文件前缀
  "domain": "", // 七牛云空间域名
  "accessKey": "", // 七牛云Ak
  "secretKey": "", // 七牛云Sk
  "bucket": "" // 七牛云对象存储空间名
}
```

七牛云的秘钥在右上角`我的` -> `秘钥管理` 中获取
找不到的话先登录七牛云然后在浏览器输入[https://portal.qiniu.com/user/key](https://portal.qiniu.com/user/key)

# 脚手架框架组成

本脚手架基于Vue + Vant + NodeJs + 七牛云CDN 技术栈，请确保你会使用这些框架进行开发。

- Vue.js(读音 /vjuː/, 类似于 view) 是一套构建用户界面的渐进式框架。
- Vant 是有赞前端团队开源的移动端组件库，是业界主流的移动端组件库之一。
- NodeJs简单的说 Node.js 就是运行在服务端的 JavaScript ，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。

# 脚手架原理
原理就是利用单页面的优势，将需要加载的css、js资源通过cdn的方式来加载，目的是为了减缓服务端的压力和内存空间（特指esp32/8266微型开发板的空间），在整个webServer中esp8266/32只承担了分发路由的功能，将index.html输出到客户端，而通过脚手架的打包后，index.html里面的内容是恒定可控的（只有一个<div id=app>的标签，还有一部分<meta>标签，以及固定的内嵌js代码段），其所占用的字节非常小，非常适合在esp8266/32中使用。利用脚手架可以通过Vue框架的优势迅速开发出各种web应用的页面，而且配合Vant页面非常美观好看，然后通过以下命令进行`yarn bqf`

`流程：进行打包 ---> 上传静态文件到七牛云 ---> 编译html ---> 生成ino文件 ---> 进行烧写 ---> enjoy`

# 项目地址

[https://github.com/pengqiangsheng/esp8266_web_generator](https://github.com/pengqiangsheng/esp8266_web_generator)

# 版本

遵循MIT协议