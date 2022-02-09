<template>
  <header class="hero">
    <dog-cute ref="DogCute" v-if="random === 1"/>
    <dog-coding v-else-if="random === 2" />
    <img v-else src="https://api.ixiaowai.cn/mcapi/mcapi.php" alt="hero" />
      <h2 style="border-bottom: none;" id="main-title">{{ obj.output }}<span class="typed-cursor">|</span></h2>
      <p class="description">
        「{{ creator }}」
      </p> 
      <p class="action">
        <a href="/about.html" class="nav-link action-button">探索 →</a> <a href="/typer/" class="nav-link action-button" style="margin-left:20px;">打字原理 →</a>
      </p>
      <div class="my-footer">
        <div class="text-center">Copyright © 2022-2023  彭小呆</div>
        <div class="text-center">大力感谢<a href="https://www.sfxyun.cn/">神枫云互联</a>15RMB/年vps</div>
      </div>
    </header>
</template>
<script>
import EasyTyper from 'easy-typer-js'
import DogCoding from '../DogCoding'
import DogCute from '../DogCute'
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};
export default {
  name: 'home',
  components: {
    DogCoding,
    DogCute
  },
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
        backSpeed: 40,
        sentencePause: false
      },
      typer: null,
      random: 0
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
      // this.getImage()
      this.fetchData()
      this.getRandom()
    },
    getRandom() {
      this.random = [1,2,3,1].random()
    },
    getImage() {
      fetch('https://api.dujin.org/pic/')
        .then(res => console.log(res))
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
          this.$refs.DogCute && this.$refs.DogCute.random()
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
  .my-footer
    width 100%
    font-size: 1rem;
    line-height: 1.3;
    color: #6a8bad;
    .text-center
      text-align center
      padding 0px 0px 5px 0px
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
