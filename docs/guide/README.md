---
title: 介绍
meta:
  - name: description
    content: 一种基于halcon的光栅投影的三维重构的研究
  - name: keywords
    content: halcon 光栅投影 三维重构
---
# Hello VuePress

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

# Emoji :tada: :100:
:tada: :100:

# 目录
[[toc]]

::: tip
This is a tip
:::

<!-- <ClientOnly>
  <demo-1></demo-1>
</ClientOnly> -->

<demo-1></demo-1>

[inner.ink](http://inner.ink)

 <Badge text="beta" type="warn"/> <Badge text="0.10.1+"/> <Badge text="默认主题"/>

 <p class="demo" :class="$style.example"></p>

<style module>
.example {
  color: #41b883;
}
</style>

<script>
export default {
  props: ['slot-key'],
  mounted () {
    document.querySelector(`.${this.$style.example}`)
      .textContent = '这个块是被内联的脚本渲染的，样式也采用了内联样式。'
  }
}
</script>

### Badge <Badge text="beta" type="warn"/> <Badge text="0.10.1+"/>

# Hello VuePress

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

# Emoji :tada: :100:
:tada: :100:

# 目录
[[toc]]

::: tip
This is a tip
:::

<!-- <ClientOnly>
  <demo-1></demo-1>
</ClientOnly> -->

<demo-1></demo-1>

[inner.ink](http://inner.ink)

 <Badge text="beta" type="warn"/> <Badge text="0.10.1+"/> <Badge text="默认主题"/>



### Badge <Badge text="beta" type="warn"/> <Badge text="0.10.1+"/>