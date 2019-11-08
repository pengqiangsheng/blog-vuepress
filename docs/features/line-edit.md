# 文本编辑器 :rocket:

## 特性 <Badge text="features"/> 

- 1.在编辑时能显示行号 <Badge text="超牛逼"/> 
- 2.使用vue封装成单独组件 <Badge text="可拓展性，维护性强"/> 
- 3.开箱即用 <Badge text="代码简单"/> 

## 开始使用吧 :pig_nose:

<pqs-line-edit/>


## 源码解析

### 动态显示行号

```js
// 设置行号
line(n) {
    let num = ''
    for (let i = 1; i <= n; i++) {
    num += i + this.suffix
    }
    this.barValue = num
},
```

### 使用watch监听value的变化
```js
// 监听变化
watch: {
    value(val) {
        let str = val
        str = str.replace(/\r/gi, '')
        str = str.split('\n')
        const n = str.length
        this.line(n)
    }
},
```


### 持续高产中 :pig: