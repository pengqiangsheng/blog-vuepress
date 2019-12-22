# easy-typer-js
<a href="https://www.npmjs.com/package/easy-typer-js"><img src="https://img.shields.io/npm/v/easy-typer-js.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/easy-typer-js"><img src="https://img.shields.io/npm/l/easy-typer-js.svg" alt="License"></a>
<a href="https://npmcharts.com/compare/easy-typer-js?minimal=true"><img src="https://img.shields.io/npm/dm/easy-typer-js.svg" alt="Downloads"></a>

> 功能十分强大打字机插件，兼容原生JS和MVVM类框架（Vue,React,angular），随心所欲的输出任何你想输出的内容。
# 一、效果展示
![](https://user-gold-cdn.xitu.io/2019/12/21/16f27c7653b345ee?w=1920&h=1080&f=gif&s=3531097)
> easy-typer-js是一个轻量级的插件, 用于实现页面文字的打字机效果. 它使用起来非常简单, 只需要几行代码就能实现高大上的打字机效果.而且对MVVM框架支持完美，还兼容原生JS.

# 二. 使用easy-typer-js

## 1. 引入easy-typer-js
- 方法1: ES6模块化引入(官方推荐)
```js
// 安装
npm install easy-typer-js --save
或者
yarn add easy-typer-js
```
```js
// 引入
import EasyTyper from 'easy-typer-js'
// 实例化
const typed = new EasyTyper(obj, input, fn, hooks)
```

- 方法2: 常规导入

```js
// 下载至本地
<script src="./easy-typer-js"></script>

//cdn导入
<script src="https://cdn.jsdelivr.net/npm/easy-typer-js@1.0.1/easyTyper.min.js"></script>
```

## 2.实践出真理

### 2.1 在MVVM类框架中使用（Vue）

```html
<template>	
  <div>
    {{ obj.output }}
    <span class="easy-typed-cursor">|</span>
  </div>
</template>
```
```js
<script>
import EasyTyper from 'easy-typer-js'
export default {
  name: 'home',
  data() {
    return {
      obj: {
        output: '',
        isEnd: false,
        speed: 80,
        singleBack: 1,
        sleep: 6000,
        type: 'rollback',
        backSpeed: 40
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.fetchData()
    },
    fetchData() {
        // 一言Api进行打字机循环输出效果
      fetch('https://v1.hitokoto.cn')
        .then(res => {
            return res.json()
        })
        .then(({ hitokoto }) => {
            this.initTyped(hitokoto)
        .catch(err => {
            console.error(err)
        })
    },
    initTyped(input, fn, hooks) {
      const obj = this.obj
      const typed = new EasyTyper(obj, input, fn, hooks)
    }
  }
}
</script>
```
```stylus
<style lang="stylus">
  .typed-cursor
    margin-left: 10px
    opacity: 1
    -webkit-animation: blink 0.7s infinite
    -moz-animation: blink 0.7s infinite
    animation: blink 0.7s infinite
  @keyframes blink
    0%
      opacity: 1
    50%
      opacity: 0
    100%
      opacity: 1
  
  @-webkit-keyframes blink
    0%
      opacity: 1
    50%
      opacity: 0
    100%
      opacity: 1
  
  @-moz-keyframes blink
    0%
      opacity: 1
    50%
      opacity: 0
    100%
      opacity: 1
</style>

```

> 效果如下就是首页你们可以看到的啦！:pig:


### 2.2原生实例

```html
<div id="output"></div>
<script src="../lib/esayTyper.js"></script>
```
```js

const obj = {
output: '', // 输出内容  使用MVVM框架时可以直接使用
type: 'normal',
isEnd: false,
speed: 80,
backSpeed: 40,
sleep: 3000,
singleBack: true
}
const typing = new easyTyper(obj, `黎明前的黑暗是最深不见底的黑暗！`, (instance)=>{
// 回调函数 如果这里使用了递归调用会一直循环打印，需要在外部触发停止
// 此回调用于获取新的数据然后重新输出
instance.input = `天不生我彭小呆，万古长青一生狂！`
instance.play()
}, (output, instance)=>{
// 钩子函数，每一帧的数据获取和实例easy-typer-js的获取
document.getElementById('output').innerHTML = `${output}<span class="easy-typed-cursor">|</span>`
})
// 12秒后停止
let timer = setTimeout(() => {
clearTimeout(timer)
timer = null
typing.close()
alert('stop!')
}, 12000)

```

> 效果如下

![](https://user-gold-cdn.xitu.io/2019/12/21/16f27f240fff13bd?w=1920&h=1080&f=gif&s=6786978)


# 三、参数解析 ( Parameter configuration )

## 3.1 new EasyTyper(obj, input, fn, hooks)

|参数|	说明	|回调 | 是否必须|
|---|-------|-----|------|
|`obj`|	配置对象 |	无 | 必须一定有且格式要对，十分严格，比起教导主任毫不逊色|
|`input`|	内容输入 |	无 | 可以没有，会有小彩蛋|
|`fn`|	完成一次output输出后的回调函数 |	当前easy-typer-js实例instance | 否 |
|`hooks`|	钩子 钩在每一帧将要完成的时间片段上 | 当前帧输出的内容、当前easy-typer-js实例instance | 否 |

> 回调函数与钩子函数使用方法如下（仅供参考）
### 3.1.1 在原生JS中使用
```js
  const typing = new EasyTyper(obj, `黎明前的黑暗是最深不见底的黑暗！`, 
  instance => {
    // 回调函数
    // 此回调一般用于获取新的数据然后循环输出
    // instance { 实例EasyTyper }
    console.log(instance) // 打印出实例对象
  }, (output, instance)=>{
    // 钩子函数
    // output { 当前帧的输出内容 }
    // instance { 实例EasyTyper }
    // 通过钩子函数动态更新dom元素
    document.getElementById('output').innerHTML = `${output}`
  })

```
### 3.1.2 在Vue中使用

```html
<template>	
  // 动态绑定
  <div>{{ obj.output }}</div>
</template>
<script>
import EasyTyper from 'easy-typer-js'
export default {
  name: 'home',
  data() {
    return {
      obj: {
        output: '',
        // 其他参数省略
      }
    }
  },
  mounted() {
    const typed = new EasyTyper(this.obj, `我将要被打字机输出`)
  }
}
</script>
```

## 3.2 obj配置

| 参数(params)          | 含义(meaning)                                    | 类型(type)  |
| --------------------- | ----------------------------------------------- | ---------------- |
| `output`              | 输出内容,使用MVVM框架时直接使用 { obj.output }  |      string          |
| `type`                | 下一次的行为 'roolback', 'normal', 'custom'       |      string(有且仅有此三种)    |
| `isEnd`               | 全局控制是否终止                                  |      boolean         |
| `speed`               | 打字速度                                         |      number          |
| `backSpeed`           | 回滚速度                                          |      number          |
| `sleep`               | 完整输出完一句话后，睡眠一定时间后触发回滚事件           |       number         |
| `singleBack`          | 单次的回滚（优先级高于type）                       |      boolean         |

obj配置对象校验非常严格，对象的字段和类型都要遵从以上格式，否则你会在控制台看到一个非常显眼的error！




## 3.3 暴露出可直接调用方法

|方法名|	说明	|参数 |
|---|-------|-----|
|`close`|	停止打字 |	无 |
|`sleep`|	单独可以调用睡眠线程，可以使用在任何地方 | ms(毫秒) |

## 3.4 源码
源码都在GitHub上开源了，可以自行查看，后续还会继续更新。
# 四、更多请查阅

- easy-typer-js官网: [https://docs.inner.ink/typer/](https://docs.inner.ink/typer/)
- Github文档地址: [https://github.com/pengqiangsheng/easy-typer-js](https://github.com/pengqiangsheng/easy-typer-js)
- CDN地址: [https://cdn.jsdelivr.net/npm/easy-typer-js@1.0.1/easyTyper.min.js](https://cdn.jsdelivr.net/npm/easy-typer-js@1.0.1/easyTyper.min.js)


# 五、计划更新内容
- 1.可以输出不仅是文字还有dom元素
- 2.给输出的文字加动画特效
- 3.输出时加上敲字的声音

# 六、邀赞👍
如果这篇文章能够帮到你什么，希望能花一点时间帮我点个赞👍b(￣▽￣)d。
=.=[戳我点赞](https://github.com/pengqiangsheng/easy-typer-js)😊