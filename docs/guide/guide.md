---
title: 介绍
meta:
  - name: description
    content: 一种基于halcon的光栅投影的三维重构的研究
  - name: keywords
    content: halcon 光栅投影 三维重构
---
## 总体思路

- 1.首先对基本的三维检测技术有个基本的了解
- 2.对halcon进行理解和基本运用
- 3.掌握相机标定的原理
- 4.重点对基于光栅投影的相位轮廓术的深入学习和理解应用

## 分步骤进行
本文以halcon快速标定和相移法为基石，重点研究了基于halcon光栅投影的快速三维检测系统。针对检测的精度与速度需求，本文采用的基于halcon的快速标定加上相位轮廓术配合光栅投影，通过matlab计算相移，检测精度高，且检测速度较快。本文的主要内容如下：

- [三维检测技术方法的概述](./principle.md)
- [halcon的简介](./halcon.md)
- [光栅投影的生成](./raster-generation.md)
- [相位轮廓术的原理](./principle.md)
- [解包裹](./unwrapper.md)
- [使用halcon进行相机标定](./calibration.md)
- [实际操作](./getting-started.md)
- [一些我在研究过程中的参考文献和资料](./reference.md)

### 持续高产中 <Badge text="ing" type="warn"/> :battery: