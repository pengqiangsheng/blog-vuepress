---
title: 关于php执行shell命令的一些体会
date: 2019-04-19 18:21:29
tags: [CentOs,Linux,php,shell]
toc: true 
categories: php
---
# 关于php执行shell命令不得不提的一些东西
## 前言
这几天刚新买了一台阿里云香港的轻量应用服务器
![](关于php执行shell命令的一些体会/1.png)
价钱还不错，24CNY一月，30Mbs带宽，1024G流量每月。
这是我的推荐码的入口[阿里云服务器入口](https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=hp167aqc)
咳咳。。。拉回正题，我就开始配了一个lnmp，然后搭了一个docker下的gogs，然后搞了一个webhooks钩子。
之前我那台华东2的服务器配的是lamp+docker+gogs，可以自动部署代码上线。所以按照之前的步骤，我一步一步的走啊走啊，然后神奇的发现我的php执行不了shell脚本。
然后我各种度娘，google之类，发现说是php.ini里面有个字段叫做disable_funtions把php可以执行的shell函数都禁掉了，只要删掉想要的函数，就可以执行了。
之后我打开我的php.ini，然后找啊找，仍是没找到，然后我把这个php.ini整个内容复制到我的win10的word里面，查找这个字段，还是找不到。然后又去百度，然后搜啊搜，找啊找。搞了5、6个小时吧。
我都要崩溃了。后来把，我去群里问了个大神，大神一顿操作噼里啪啦，然后说让我把ip给他，他登入我服务器帮我找原因，3秒钟后，大神在php.ini的305行找到了这个字段。
顿时，我无语了，我找了这么久都没找到。哎。。懵逼的一天。
![](关于php执行shell命令的一些体会/2.png)
然后我把shell_exec()从监狱里释放出来，然后在我的领地上，使用这个魔法，成功了，可以执行脚本了。
然后就是要给www提升一下权限，让它可以代我去执行各种骚操作
![](关于php执行shell命令的一些体会/3.png)
具体整个自动部署的教程链接在这里-->[自动部署](http://gitku.cn:8083/)
### 骚啊骚 搞了我一天
![](关于php执行shell命令的一些体会/huanhu.gif)