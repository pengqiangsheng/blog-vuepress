---
title: 小飞机ss/ssr的部署方法
date: 2019-05-02 15:51:33
tags: [ssr,ss,小飞机]
toc: true 
categories: Linux
---
# 一、什么是小飞机呀？
> 小飞机就是可以飞出去的东西啦（fq）懂了吧。

# 二、如何部署

## 1.首先你需要一台云服务器或者一台vps

## 2.开始安装

```shell
yum update -y
yum install unzip zip -y
yum install wget -y
wget -N –no-check-certificate https://raw.githubusercontent.com/Moexin/Easy-SSR-Bash-Python-The-Final/master/ssr.zip
unzip ssr.zip
cd SSR*
bash install.sh
```

## 3.开启服务并设置用户端口

```shell
cd /usr/local/SSR*
./serve.sh ==> 开启服务
./user.sh ==> 设置用户
```

## 4.复制添加用户成功后的一段ssr链接

我框起来那部分复制一下，然后保存起来

![](小飞机ss-ssr的部署方法/1.png)

## 5.客户端连接小飞机

### 1.Android

首先在手机里复制一下刚刚那个ssr链接

然后打开**shadowsocks R**软件后，点击标题那里，下图黄色框框

![](小飞机ss-ssr的部署方法/2.png)

然后点击右下角的+号，接着点击import from Clipboard

![](小飞机ss-ssr的部署方法/3.png)

会弹出一个框，点确认ok

![](小飞机ss-ssr的部署方法/4.png)

然后选中这个节点后会回到主界面，点击右上角的小飞机，即刻飞行！

google页面

![](小飞机ss-ssr的部署方法/5.jpg)

Yutobe页面

![](小飞机ss-ssr的部署方法/6.jpg)

### 2.Window

双击打开shadowsock-R软件后，在状态栏中找到小飞机图标。
然后右键选择从剪贴板导入，然后确定即可

![](小飞机ss-ssr的部署方法/9.png)
![](小飞机ss-ssr的部署方法/7.png)
![](小飞机ss-ssr的部署方法/8.png)

系统代理模式选择PAC

![](小飞机ss-ssr的部署方法/12.png)

代理规则绕过局域网和大陆

![](小飞机ss-ssr的部署方法/13.png)

google页面

![](小飞机ss-ssr的部署方法/10.png)

twitch页面

![](小飞机ss-ssr的部署方法/11.png)

### 3.iphone和mac也有各自的客户端

后续整理

### 4.各类客户端下载地址

后续整理，如有需要先email我

![](https://inner.ink/pqs/img/huanhu.gif)