---
title: hexo生成博文插入图片的办法
date: 2018-08-17 17:43:48
tags: hexo
toc: true 
categories: hexo
---
# hexo生成博文插入图片的办法
***
## 一.首先进入Hexo

### 1.把主页配置文件`_config.yml` 里的`post_asset_folder`这个选项设置为`true`

### 2.在你的hexo目录下执行命令
>`$ npm install hexo-asset-image--save`
>这是下载安装一个可以上传本地图片的插件，来自[CodeFalling](https://github.com/CodeFalling/hexo-asset-image)

### 3.等待安装完成后
>再运行`$ hexo new "xxx"`来生成md博文时
>可以看到/source/posts文件夹内除了xxx.md文件还有一个同名的文件夹

### 4.最后在xxx.md博文中想引入图片时
>先把图片复制到xxx这个文件夹中
>然后只需要在xxx.md中按照markdown的格式引入图片
>`![你想输入的替代文字](xxx/图片名.jpg)`

## 二.注意事项

### 1.路径问题
>注意： xxx是这个md文件的名字，也是同名文件夹的名字
>只需要有文件夹名字即可，不需要有什么绝对路径
>你想引入的图片就只需要放入xxx这个文件夹内就好了，很像引用相对路径

### 2.打开Chrome控制台查看图片真正的路径
>最后检查一下，`$ hexo g`生成页面后
>进入public\2018\08\17\index.html文件中查看相关字段
>可以发现html标签内的语句是`<img src="2018/08/17/xxx/图片名.jpg">`
>而不是`<img src="xxx/图片名.jpg>`
>这很重要,关乎你的网页是否可以真正加载你想插入的图片
