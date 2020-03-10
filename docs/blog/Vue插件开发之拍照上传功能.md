# Vue插件开发之拍照上传功能

## 一、前言

> 因为最近做H5项目，需要拍照上传照片的功能。

于是就写了一个传统的Vue组件，功能实现都没问题，可是用着用着发现了问题：

- 1.传统组件引用需要先import，然后放到components，然后放在template，很繁琐。
- 2.项目不同，UI设计不同，需要改样式代码。

多个项目都有拍照上传功能，但是界面样式都不一样，每次还要临时改样式。

所以本着偷懒的原则，把这个组件**拍照上传到客户端这部分功能**和**UI**给单独**分离**开出来，单独写成一个插件，即用即插。

优点：
- 1.和UI分离，单独使用，保留核心功能，提高了复用性。
- 2.使用形式为this.$useUpload，十分方便，无需像组件引入那样，便捷性大大提升！

## 二、开始编写上传组件

### 2.1使用jsx语法更加简洁

```js
// upload-basic.vue
export default {
  name: 'UploadBasic',
  methods: {
      _changeFile(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        const self = this
        
        reader.onloadend = function() {
          const result = this.result;
          const img = new Image();
          img.src = result;
          img.onload = function() {
            self.$el.appendChild(img)
          }
        }
        
        reader.readAsDataURL(file);
      }
  }
  render() {
      return (
        <input ref="upBIuput" type="file" accept="image/*" onChange={(e) => {this._changeFile(e)}}/>
      )
  }
}
```
上面代码很简单，主要就是在页面上渲染一个input元素，这个input用于文件的上传，在手机上点击后的效果就是唤醒系统的相机和相册（2选1）

当你上传图片，或者拍照上传后，就会触发**onChange**事件，通过e.target.files[0]就可以拿到当前上传的文件（这里指照片）。

接着我使用了一个**FileReader**去读取文件的内容，将文件格式转换成**base64**位的形式，然后赋值到**img**的**src**属性上，当图片加载完毕后，通过this.$el.appenChild()方法把img这个DOM元素渲染到页面上进行图片的预览。

这样就实现了拍照上传到浏览器并且预览，然后后续可以通过把file塞到formData对象中上传到后端服务器（这部分内容不提）。

### 2.2 把input隐藏掉

因为我们一般上传都有一个很好看的UI界面对吧，不需要这个丑丑的input，所以我们只需要加一句样式代码去隐藏这个input。

```js
<input ref="upBIuput" style="display:none;" type="file" accept="image/*" onChange={(e) => {this._changeFile(e)}}/>
```
这样按钮就隐藏了，而且不占文档流，但是按钮是存在的。

把按钮隐藏了，我们怎么触发它的上传事件呢？

很简单，因为我们使用了一个ref属性，可以去获取到input的DOM对象。我们只需要模拟按钮点击事件即可：
```js
this.$refs.upBInput.click()
```
我们把这句话包裹一层函数，需要的地方调用即可。
```js
methods: {
  upload() {
    this.$refs.upBInput.click()
  }  
}
```
我们写好一个漂亮的上传UI界面后，绑定一个click事件为this.upload()就可以触发上传了。

这样效果也达到了，但是还是没有和UI分离，引入的时候也需要引入这个组件。想达到一开始说的效果怎么办呢？

## 三、抽离上传功能

> 这就要用到我们Vue中的插件功能了。

另起一个文件，以index.js命名。

```js
// index.js
import Vue from 'vue'
import uploadComponent from './upload-basic.vue'

// 使用Vue构造器去创建一个上传组件的子类
const uploadBasic = Vue.extend(uploadComponent)
// 创建一个div
const createDiv = () => document.createElement("div")

function useUpload(callback) {
  // 创建一个上传组件类的实例化对象，这个uploadVm你可以认为就是上面那个组件
  const uploadVm = new uploadBasic()
  // 挂载目标
  let uploadEl = createDiv()
  // 将实例化对象挂载到uploadEl中
  uploadVm.$mount(uploadEl)
  // 触发上传操作，这个upload()方法就是我们刚刚封装的
  uploadVm.upload()
  // 绑定一个finish事件去通知我们上传完成了
  uploadVm.$on('finish', data => {

    uploadVm.$nextTick(() => {
      // 上传完成后，做销毁工作
      uploadVm.$destroy()
      uploadEl = null
    })
    // 通过callback回调函数将我们需要的内容回调出去，供外部环境使用
    if(callback) callback(data)
  })
}

// 注册这个插件，挂载到prototype上
export default {
  install: function (Vue, options) {
    Vue.prototype.$useUpload = function () {
      // [].splice.call(类数组对象, 0) 这个方法是将一个类数组对象拷贝一份转换成一个Array
      // 通过...解构变成这个函数的参数
      useUpload(...([].splice.call(arguments, 0)))
    }
  }
}
```
现在我们定义好了一个上传组件的插件，但是我们组件中并没与去emit一个叫finish的事件，所以我们需要回到组件中去写这个。

```
// upload-basic.vue
// 重构一下这个函数
_changeFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    const self = this
    
    reader.onloadend = function() {
      // 这个this指代的是reader实例
      // result就是一个base64格式的文本
      const result = this.result;
      
      // 当reader实例读取文件完毕后，咱们把这个result和file都emit出去
      self.emit('finish', {
        base64: result,
        file: file
      })
    }
    
    reader.readAsDataURL(file);
  }
```

现在，我们的组件upload-basic.vue和插件index.js都写好了，将它们放到一个uploadPlugin文件夹中。

## 四、在main.js中引用


```js
// main.js
import uploadPlugin from './uploadPlugin/index'

Vue.use(uploadPlugin)
```

接着到需要的页面中：
```js
// 业务1.vue
<template>
  <div>
    <h2 @click="handleClick">点击上传</h2>
    <img src="imgUrl" />
  </div>
</template>
<script>
export default {
 data() {
   return {
     imgUrl: ''
   }
 },
 methods: {
    handleClick() {
      this.$useUpload(data => {
        this.imgUrl = data.base64;
        console.log('文件：', data.file)
      }) 
    }
 },
}
</script>
```
以上这个例子，当你点击“上传文件”这个h2标签时，就会去调用我们封装好的上传组件，然后放到img中显示，后续要上传到后端也可以。

这样非常方便的，你就可以在Vue组件中任意去调用这个全局的方法去使用上传功能，通过回调函数中的data对象可以拿到上传文件的file和base64。

## 五、优点

> 就如我刚开始说的那样。

- 1.和UI分离，单独使用，保留核心功能，提高了复用性。
- 2.使用形式为this.$useUpload，十分方便，无需像组件引入那样，便捷性大大提升！

## 六、后话

- 1.其实我们常用的element-ui中弹窗，提示等组件都有这种调用的形式，不知道小伙伴们发现没有？（包括其他UI框架）
- 2.它们实现的原理都是通过Vue.extend()构造的，不信你可以去看看它们的源码。
- 3.我们一起完成的这个上传组件其实功能还十分的简单，小伙伴们可以自行扩展完善。
- 4.移动端拍照上传，图片会莫名的旋转，不是我们想要的那样，所以后面还需要将角度不正常的图片旋转过来然后给用户预览，不然体验十分差劲。（我已经写好了，嘿嘿。）
- 5.后面更新，放上实际真机运行效果给大家看看。