<template>
  <mochi-box shiba="random" ref="MochiBox" @disapper="change"> 
    <h2>おどろき</h2>
    <h3>{{ action }}</h3>
    <h4>{{ text }}</h4>
  </mochi-box>
</template>

<script>
import EasyTyper from 'easy-typer-js'
import MochiBox from './components/MochiBox'
export default {
  name: 'DogCute',
  components: {
    MochiBox
  },
  data: () => ({
    action: '投食',
    text: '主人，我饿啦！'
  }),
  methods: {
    random() {
      this.$refs.MochiBox.randomize()
    },
    change(val) {
      this.text = val ? '主人，我饿啦！' : '饿死宝宝了，溜溜球！'
      this.action = val ? '投食' : '召唤'
    }
  }
}
</script>

<style scoped>
@import './css/index.css';
</style>