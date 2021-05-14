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

# 版本

遵循MIT协议