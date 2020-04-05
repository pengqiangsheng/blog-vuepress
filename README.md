# 彭小呆的随笔杂谈

> 记录我成长中的点点滴滴，无论是技术又或者是生活。

## 目录结构

> 共分为这六大模块

- 首页
- 技术 （分享一些技术知识，互相学习。）
- 杂笔 （一些生活的感悟，又或者是一些有趣的事。）
- 特性 （一些我整的小玩意。）
- 开源 （一些我弄的前端的轮子和我的一篇论文。）
- 生态 （友情链接和关于页面。）

> 黎明前的黑暗是最深不见底的黑暗。

![](http://img.pqs.guozhaoxi.top/home.png)


## 基于halcon的光栅投影的三维重构的研究

> 我的那篇论文

地址 => [halcon](https://halcon.inner.ink)

### 介绍

本项目基于halcon这一功能强大的算法包和光栅投影的原理去实现三维重构

### 由来

题目来源来我的本科毕业论文，在我进行研究的过程中发现网上这块的理论知识很多，但是实际操作的完整流程和代码都没有。
在我的努力下终于把这篇论文写完，实验部分也完整的由自己做完，所以想把整个过程都详细的写下来，方便你们学习和研究。

### 学习和交流

可以在本项目中留下issue，会及时回复。

## 变灰
```css
html {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  -webkit-filter: grayscale(1);
}
```