<template>
  <header class="hero">
    <img src="http://api.mtyqx.cn/api/random.php" alt="hero">
      <h2 style="border-bottom: none;" id="main-title">{{ obj.output }}<span class="typed-cursor">|</span></h2>
      <p class="description">
        「{{ creator }}」
      </p> 
      <p class="action">
        <a href="/about" class="nav-link action-button">探索 →</a>
      </p>
      <div id='test'>
      </div>
    </header>
</template>
<script>
import EasyTyped from 'easy-typer-js'
export default {
  name: 'home',
  data() {
    return {
      hitokoto: '黎明前的黑暗是最深不见底的黑暗',
      creator: '彭小呆',
      obj: {
        output: '',
        isEnd: false,
        speed: 80,
        singleBack: true,
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
      fetch('https://v1.hitokoto.cn')
        .then(res => {
          return res.json()
        })
        .then(({ hitokoto, creator }) => {
          this.creator = creator
          this.hitokoto = hitokoto
          this.initTyped(hitokoto, this.fetchData)
        })
        .catch(err => {
          console.error(err)
        })
    },
    initTyped(input, fn, hooks) {
      const obj = this.obj
      const typed = new EasyTyped(obj, input, fn, hooks)
    }
  }
}
</script>
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
