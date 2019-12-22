# vue-qrcode-directive
<a href="https://www.npmjs.com/package/vue-qrcode-directive"><img src="https://img.shields.io/npm/v/vue-qrcode-directive.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/vue-qrcode-directive"><img src="https://img.shields.io/npm/l/vue-qrcode-directive.svg" alt="License"></a>
<a href="https://npmcharts.com/compare/vue-qrcode-directive?minimal=true"><img src="https://img.shields.io/npm/dm/vue-qrcode-directive.svg" alt="Downloads"></a>
> 一种使用Vue指令去解析二维码的插件,
> 安装使用起来十分方便，只要在元素上使用**v-qr**指令即可

# 如何在前端解析并且显示二维码？

首先我们要明白二维码是什么？

> 二维码就是将我们能看懂的文字语言，以机器语言的形式存储了起来。其中黑色小方块代表的是1，白色小方块代表的是0，黑白相间的图案其实就是一串编码，扫码的过程就是翻译这些编码的过程。还要值得注意的地方就是，在它的边上都有三个大方块，这主要是在起定位作用。三个点能确定一个面，这能保证我们在扫码时，不管手机怎样放置都能得到特定的信息。

## 一、安装

```sh
npm install vue-qrcode-directive --save
```
or
```sh
yarn add vue-qrcode-directive
```

## 二、在main.js中注册

```js
import qrcode from 'vue-qrcode-directive'
Vue.use(qrcode)
```
## 三、在元素上使用v-qr指令
```js
<template>	
  <div v-qr="options" v-if="options" />
</template>
<script>
export default {
  data() {
    return {
      options: 'www.baidu.com'
    }
  }
}
</script>
```

## options参数配置

### 简易配置

```js
options: '我是二维码的内容'
```
即直接提供二维码的数据即可

### 以对象的形式提供
```js
options: {
  text: '我是二维码的内容',
  render: "canvas",
  width: 256,
  height: 256,
  typeNumber: -1,
  correctLevel: 2,
  background: "#ffffff",
  foreground: "#000000"
}
```

| 参数                   | 含义                          | 默认值        |
| --------------------- | ----------------------------- | ------------- |
| `text`                | 二维码中的内容                  | NA           |
| `render`              | 渲染的方式，canvas或者table     | canvas       |
| `width`               | 二维码的宽度                   | 256           |
| `height`              | 二维码的高度                   | 256           |
| `correctLevel`        | 校正级                        | 2             |
| `typeNumber`          | 类型码                        | -1            |
| `background`          | 背景色                        | #ffffff       |
| `foreground`          | 前景色                        | #000000       |

你只需要提供options对象，就可以覆盖默认的配置。

### 注意
- options.text是一个必填字段，因为是二维码的内容来源。
- 请确保options的正确性，确保text字段中有数据然后再进行渲染
- 就像我下面的写法一样
```js
<div v-qr="options" v-if="options" />
```
## 实例

![](https://user-gold-cdn.xitu.io/2019/11/22/16e923718373b52a?imageView2/2/w/480/h/480/q/85/interlace/1)
![](https://user-gold-cdn.xitu.io/2019/11/22/16e92301be397d61?imageView2/2/w/480/h/480/q/85/interlace/1)

## 了解更多
请前往[Github](https://github.com/pengqiangsheng/vue-qrcode-directive)上深入了解更多关于qrcode解析的原理

## 支持我
如果这个插件能帮到你，可以在[vue-qrcode-directive](https://github.com/pengqiangsheng/vue-qrcode-directive)给我一个star。
> 每一个star都是对我付出的认可

