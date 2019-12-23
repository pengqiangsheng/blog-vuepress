# 神奇的的打字机 :smile:

> 在你的博客上随心所欲的像你在打字那样输出文本内容

## 效果如下

> 利用[一言API](https://hitokoto.cn/)进行随机句子的展示

<pqs-easy-typer/>


## 代码分析


### 页面部分

- 1. 页面由一个`div`包裹，然后里面有一个图片随机显示接口的`img`元素。
- 2. h2中的`obj.output`就是动态绑定
- 3. ```<span class="typed-cursor">|</span>```中就是光标显示，样式在后面会贴出来

```html
<template>
  <div class="esay-typer-warpper">
    <img src="https://api.ixiaowai.cn/mcapi/mcapi.php" alt="hit">
    <h2 style="border-bottom: none;" id="main-title">{{ obj.output }}<span class="typed-cursor">|</span></h2>
  </div>
</template>
```

### JS 部分

- 1. 首先引入我们的猪角`easy-typer-js`。
- 2. 然后再`data`字段中添加`obj`的配置。
- 3. 在页面准备好的时候，会执行 `init` => `fetchData` => `initTyper` => 实例化`EasyTyper`对象 => 页面显示打字效果。
- 4. 作为一名合格的工程师，我们要在离开页面的时候做定时器的销毁工作，在`beforeDestroy`钩子中调用`typer.close()`方法。
- 5. EasyTyper 参数如何配置呢？耐心点[往下](#让我们瞧瞧实例化easytyper对象时的参数吧)看哦！

```js
<script>
import EasyTyper from 'easy-typer-js'
export default {
  data () {
    return {
      obj: {
        output: '',
        isEnd: false,
        speed: 80,
        singleBack: true,
        sleep: 6000,
        type: 'rollback',
        backSpeed: 40
      },
      typer: null
    }
  },
  mounted() {
    this.init()  
  },
  beforeDestroy() {
    this.typer.close()
  },
  methods: {
    // 初始化
    init() {
      this.fetchData()
    },
    fetchData() {
      fetch('https://v1.hitokoto.cn')
        .then(res => {
          return res.json()
        })
        .then(({ hitokoto, creator }) => {
          const input = `${hitokoto} —— [${creator}]`
          this.initTyper(input, this.fetchData)
        })
        .catch(err => {
          console.error(err)
        })
    },
    initTyper(input, fn, hooks) {
      const obj = this.obj
      this.typer = new EasyTyper(obj, input, fn, hooks)
    }
  }
}
</script>
```

### 光标显示样式

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

## 让我们瞧瞧实例化EasyTyper对象时的参数吧 :eyes:

