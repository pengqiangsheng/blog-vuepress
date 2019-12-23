<template>
  <div class="esay-typer-warpper">
    <img src="https://api.ixiaowai.cn/mcapi/mcapi.php" alt="hero">
    <h2 style="border-bottom: none;" id="main-title">{{ obj.output }}<span class="typed-cursor">|</span></h2>
  </div>
</template>

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
          this.initTyped(input, this.fetchData)
        })
        .catch(err => {
          console.error(err)
        })
    },
    initTyped(input, fn, hooks) {
      const obj = this.obj
      this.typer = new EasyTyper(obj, input, fn, hooks)
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