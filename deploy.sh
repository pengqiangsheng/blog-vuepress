#!/bin/bash

#终止一个错误
set -e

#构建
yarn docs:build

#进入生成的构建文件夹
cd docs/.vuepress/dist


# echo 'blog.guozhaoxi.top' > CNAME
git init
git add -A
git commit -m 'deploy'

git push -f https://gitee.com/redqueen/blog.git master
