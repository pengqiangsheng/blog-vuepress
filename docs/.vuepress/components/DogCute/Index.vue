<template>
  <mochi-box shiba="random" ref="MochiBox"> 
    <h2>おどろき</h2>
    <h3>投食</h3>
    <p>来领养我呀</p>
  </mochi-box>
</template>

<script>
import MochiBox from './components/MochiBox'
export default {
  name: 'DogCute',
  components: {
    MochiBox
  },
  methods: {
    random() {
      this.$refs.MochiBox.randomize()
    }
  }
}
</script>

<style scoped>
@import './css/index.css';
</style>