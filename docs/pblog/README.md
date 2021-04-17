# P-BLOG博客框架使用介绍
## pblog是什么？

> 它是什么？pblog是一个静态博客生成器，源于作者的一时突发奇想。

## Github地址
[pblog](https://github.com/pengqiangsheng/pblog)

## pblog在线地址
[pblog](https://pblog.inner.ink)

## 静态博客框器

> 就是类似于`hexo`或者是`vuepress`这类的博客框架，可以把你写好的`md`文件编译输出成浏览器可识别的`html`文件，最后串起来生成一个博客网站。

## 使用

怎么使用？

> 你需要全局安装`p-blog`

## 安装

```shell
yarn global add p-blog
or
npm install p-blog -g
```

## 命令

- `pblog` 生成博客
- `pblog -s` 生成博客后启动本地web服务预览（端口默认80，没做冲突兼容）

## `pblog`命令的背后

哦，也许你想进一步了解它做了什么？

当你输入`pblog`，进行回车之后

- 首先它会读取你当前项目根目录下的`post`文件夹下所有md格式的文章
- 之后进行模板渲染
- 最后输出html文件

> 哇，是不是很简单，so easy!


## 配置文件 `pblog.config.js`

> 有时候，你可能需要自定义一些选项，比如网站的标题，还有一些样式或者脚本等等，它就显得必要了。(非必需)

你需要在项目根目录下新建一个`pblog.config.js`文件，然后使用AMD规范导出一个对象。

```js
module.exports = {
  title: '彭小呆的博客',
  move: '黎明前的黑暗是最深不见底的黑暗',
  css: [],
  script: [],
}
// title: 网页标题
// move: 主页显示的一句话
// css/script: 可放相对于public目录下的文件或者是外链的一个数组，比如你有这样的一个文件：public/css/my.css， 那你应该写成'./css/my.css'
// template: 自定义模板的文件夹绝对路径（首页名称为index.pug, 文章页面模板名称为post.pug）
```

目前有6大字段可以配置哦！

- title
- move
- logo
- css
- script
- template

> 特别注意：如果你没有想改动主题模板的话，请不要配置`template`字段，因为它可能导致一些意外。


## 自定义模板

> 哦，也许你认为我的主题太过于简约了，但是大道至简。

从此刻起你需要配置`template`字段

提供一个放置模板文件的文件夹路径（物理绝对路径）

比如：你写好了`index.pug`和`post.pug`两个模板，放在了项目的根目录下的`custom-tamplate`文件夹下，那么要怎么配置这个字段呢？

```js
const { resolve } = require('fs')
module.exports = {
  // 省略其他字段
  template: resolve(__dirname, `custom-tamplate`)
}
```

对，你就要这样配置咯，不管你用什么方法，总之，你要让这个`template`字段的值是这样的：

`D:/项目目录/custom-tamplate`

对的，物理绝对路径！！

## 模板变量

> 当你开始尝试自定义模板，模板变量变得尤为重要，因为这些是pblog提供的内容变量。

`post.pug`:

- link 链接对象
  - prev 上一篇
  - next 下一篇
- title 标题
- markdown 内容
- list_css css数组
- list_script script数组
- list_doc 文章列表

`index.pug`:

- logo 首页显示的Pblog
- move 一句话
- readme 根目录下的README.md转化后的内容
- history 根目录下的history.md转化后的内容
- title
- list_doc
- list_css
- list_script

这些模板变量，会提供到相应的pug页面，你可以用一个或多个，或者一个不用，都没有问题

## 自定义主题

> 主题相对于比较简单，覆盖最后输出目录`dist/theme/css`下的3个文件即可。

- reset.css
- highlight.css
- markdown.css

覆盖，保持原有的名字，is ok？

## 二、手摸手一起来实现pblog

## 2.1 静态博客框架流程

> 首先我们需要明白整个流程是怎么跑的？

- 1.拿到`md`文件 ==> 解析 ==> 字符串
- 2.模板渲染，将`md`字符串插入到`html`页面中适合的位置
- 3.输出`html`文件和静态资源到`dist`目录

总的来说就是这么3步走！

## 2.2 解析md文件

so easy，`github`上随便搜一下`markdown`关键词，找个星星最多的，看一下文档，然后就可以来模拟了。

![](https://user-gold-cdn.xitu.io/2020/4/11/1716894fcaab00c1?w=990&h=542&f=png&s=55813)

这是我找到：[marked.org文档链接](https://marked.js.org/#/README.md)

使用起来还是比较简单：
```js
const marked = require('marked');
const markdownString = '# 这是一级标题'
const str = marked(markdownString));
console.log(str)
// <h1>这是一级标题</h1>
```
就这么简单，大家可以在nodejs在运行一下，so easy！

## 2.2 模板渲染

> 模板渲染，可能很多后端的小朋友应该知道了，结合`express`或者`koa`去做服务端渲染`html`页面

没错，就是用的这个，我用的是`pug`


![](https://user-gold-cdn.xitu.io/2020/4/11/1716899b3b28e776?w=669&h=374&f=png&s=80301)

就是这头巴哥犬没错了。

开玩笑啦，[pug模板引擎中文文档](https://pugjs.bootcss.com/api/getting-started.html)

使用起来也很简单：
```js
//- template.pug
p #{name}的 Pug 代码！
```
```js
const pug = require('pug');

// 编译这份代码
const compiledFunction = pug.compileFile('template.pug');

// 渲染一组数据
console.log(compiledFunction({
  name: '李莉'
}));
// "<p>李莉的 Pug 代码！</p>"

// 渲染另外一组数据
console.log(compiledFunction({
  name: '张伟'
}));
// "<p>张伟的 Pug 代码！</p>"
```

以上代码应该是很容易理解的。

## 2.3 文件读写

> 在nodejs中文件读写是一个常规操作，所以我们必须先掌握一下。

主要就是通过`fs`模块导出的相关方法：

- readFile 读取一个文件
- writeFile 写入一个文件

如果加上`sync`就变成了同步读取：

- readFileSync 同步读取一个文件
- writeFileSync 异步读取一个文件

```js
const fs = require('fs')
// 异步读取
fs.readFile('README.md', 'utf-8', (err, data) => {
  if(err){
    throw new Error(err)
  }else {
    console.log(data)
  }
})
// 同步读取
const data = fs.readFileSync('README.md', 'utf-8')
```

> 有的小伙伴可能是一个纯前端开发者，你会觉得后端可能很难，其实nodejs就是前端开发者去接触后端开发最容易上手的语言了。

这样咱们完成了对`README.md`文件的读取，写入同样也很简单，同步异步方法看情况使用（两者取其一，或兼得）。

```js
// 同步写入
fs.writeFileSync('test.md', '# 我想说你很美丽', 'utf-8')
// 异步写入
fs.writeFile('test.md', '# 我想说你很美丽', (err) => {
  if(err){
    throw new Error(err)
  }else {
    console.log('写入完成')
  }
})
```

更多关于`fs`模块方法我就不介绍了，大家查阅nodejs文档即可。

> 如果你掌握了以上3个知识点，那么，恭喜你，可以进行第一章节的开发了。

## 三、章节

## 3.1 第一章节：组装一个简单的读md写html程序

```js
// index.js
const fs = require('fs')
const marked = require('marked')
// 读取一个md文件
const markdownString = fs.readFileSync('README.md', 'utf-8')
// markdown --> html
const html = marked(markdownString)
// 写入index.html
fs.writeFile('index.html', html, (err) => {
  if(err){
    throw new Error(err)
  }else {
    console.log('写入完成')
  }
})
```

如果你准备好了，那么运行它`node index.js`，如果一切顺利，你会看到目录下多了一个`index.html`文件，里面的内容不再是`md`语法，而是你熟知的`html`标签了。双击这个`index.html`可以在浏览器运行查看效果。

## 3.2 第二章节：结合`pug`模板引擎渲染html页面

```js
// index.pug
doctype html
html(lang="en")
    head
        title #{title}
    body
        .markdown-body !{content}
```
```js
const fs = require('fs')
const pug = require('pug')
const marked = require('marked')
const markdownString = fs.readFileSync('README.md', 'utf-8')
// 读取一个模板
const compiledFunction = pug.compileFile('index.pug');
// md --> html
const markdownHtml = marked(markdownString)
// 将mdHtml内容插入到模板中content的位置
const html = compiledFunction({
  title: '第一个pug页面'
  content: markdownHtml
})
// 输出文件
fs.writeFile('index.html', html, (err) => {
  if(err){
    throw new Error(err)
  }else {
    console.log('写入完成')
  }
})
```

运行以上程序，在生成的`index.html`中，你就会看到结构比较完整的一个`html`页面了。


## 3.3 未完待续


