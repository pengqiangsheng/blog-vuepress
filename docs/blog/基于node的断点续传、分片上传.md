---
title: 基于node的断点续传、分片上传
date: 2019-07-22 09:09:52
tags: [node,js]
toc: true 
categories: node
---
## 基于Node的分片上传
[2019.7.21.上传代码] 代码入口==>[传送门](https://github.com/pengqiangsheng/node-cut-upload) 
[2019.7.22.更新]支持断点续传

### 一、声明
1.本项目基于[会说话的鱼](https://segmentfault.com/u/sunhk)的源码
2.本人做了大量实验和修改

### 二、使用方法：
+ `npm install`安装所有的依赖
+ `npm run start`启动服务，并自动打开浏览器
#### 注意:*node的版本要>=7.6*, 因为里面使用了async和await语法，目前node的LTS版本已经是8.9.0，所以请各位放心使用
#### 详细的原理和步骤，请参见文章：[Node+H5实现大文件分片上传](https://segmentfault.com/a/1190000008899001)

### 三、运行效果
![](./images/node/1.png)

![](./images/node/2.png)

![](./images/node/3.png)

### 四、断点续传效果
#### 实验1
![](./images/node/cut-1.png)

可以看到点击完暂停后是停在了第73片上面
![](./images/node/cut-2.png)

然后点击继续后上传会先验证停在那个位置，看控制台那边返回了一个73的array，说明已经上传了73片，然后继续上传剩余的。

#### 实验2
如果上传文件到一半，突然停电了，或者网络断了，死机了，不管是什么原因导致你又要重新打开页面上传，首先会处理第一步验证文件的MD5，然后得到服务器返回的已上传文件块分片列表，已经上传的部分不会重复上传，只会传还没有上传的。具体实验可以自行测试，我都是测试过的，都是ok的。
