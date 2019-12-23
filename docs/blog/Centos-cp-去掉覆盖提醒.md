---
title: CentOs cp 去掉覆盖提醒
date: 2019-04-19 10:14:50
tags: [CentOs,Linux]
toc: true 
categories: Linux
---
# CentOS中cp -f 复制强制覆盖的命令总是无效？
***
原因是Linux下默认cp命令是有别名的(alias cp='cp -i')，无法在复制时强制覆盖，即使你用 -f 参数也无法强制覆盖文件

- 1.取消cp的alias(暂时生效)
    `# unalias cp`
    `# cp -rf /blog`
- 2.加反斜杠 \cp 执行cp命令时不走alias
    `# \cp -rf /blog`
- 3.interesting的方法
    `# yes|cp -rf /blog`

这波操作，大家学会了没？学会的扣1，O(∩_∩)O哈哈~