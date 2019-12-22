<template>
  <p class="pqs-a-word">
      <span><slot></slot></span>
  </p>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus">
.pqs-a-word
  font-weight 600
  color #fff
  width 100%
  text-align center
  background-color #53a8ff
  padding 0.6em 1.2em
  border-radius 5px
  display inline-block
  box-sizing border-box
  margin 1em 0 !important
</style>