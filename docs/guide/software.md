# 软件系统

::: warning
需要有matlab和halcon的基础理解与运用
:::

## 具体步骤

可以分为以下：

- MatLab生成光栅图像
- 光栅的投影
- 图像的采集
- 图像的预处理
- 图像包裹相位的获取
- 图像连续相位的获取
- 求解出相位差
- 相似三角形对比
- 高度信息的获取

### 流程图

![](./images/3-3.png)

## 分析

软件系统使用了halcon软件与matlab软件进行交叉处理

### Matlab:

- 1.生成光栅
- 2.获取包裹相位
- 3.解包裹
- 4.求解相位差
- 5.还原高度

### Halcon:

- 1.标定
- 2.采集被光栅调制的被测物体的图像
- 3.图像做预处理

### 软件下载及使用

halcon:
- [51halcon](https://www.51halcon.com/) <Badge text="推荐"/>

matlab:
- [matlab中文论坛](https://www.ilovematlab.cn/)<Badge text="推荐"/> 
