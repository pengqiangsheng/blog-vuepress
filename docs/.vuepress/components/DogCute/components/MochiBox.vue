<template>
  <div class="MochiBox /" :class="[my_shiba, { pop: my_pop }]" @click="randomize" tabindex="0">
    <MochiShiba 
      :size="my_size"
      :mood="my_mood" 
      :leftEye="my_leftEye" 
      :rightEye="my_rightEye" 
      :leftEar="my_leftEar" 
      :rightEar="my_rightEar"
      :blush="my_blush"
    />
    <div class="MochiContent">
      <slot></slot>
    </div>
    <MochiPaws :size="size" />
  </div>
</template>

<script>
import MochiShiba from './MochiShiba'
import MochiPaws from './MochiPaws'
export default {
  name: 'MochiBox',
  components: {
    MochiShiba,
    MochiPaws
  },
  data: () => ({
    my_shiba: "okaka",
    my_size: "medium",
    my_mood: "drool",
    my_leftEye: "open",
    my_rightEye: "open",
    my_leftEar: "up",
    my_rightEar: "flat",
    my_blush: false,
    my_pop: true,
    timer: null
  }),
  props: {
    shiba: { type: String, default: "okaka" },
    size: { type: String, default: "medium" },
    mood: { type: String, default: "" },
    leftEye: { type: String, default: "open" },
    rightEye: { type: String, default: "open" },
    leftEar: { type: String, default: "up" },
    rightEar: { type: String, default: "flat" },
    blush: { type: Boolean, default: false },
    pop: { type: Boolean, default: true }
  },
  mounted() {
    this.disapper()
    if( this.shiba !== "random" ) {
      ['shiba',
      'size',
      'mood',
      'leftEye',
      'rightEye',
      'leftEar',
      'rightEar',
      'blush',
      'pop'].forEach(key => {
        this[`my_${key}`] = this[key]
      })
    }
  },
  methods: {
    randomize() {
      if ( this.canRandom ) {
        this.my_shiba = ["ume", "sesame", "tuna", "okaka", "anko", "kinako", "sakura", "monaka"].random();
        this.my_mood = ["", "happy", "content", "excited", "cheeky", "drool", "cute", "gleam"].random();
        this.my_leftEye = ["open", "wink", "shy", "laugh"].random();
        this.my_rightEye = ["open", "wink", "shy", "laugh"].random();
        this.my_leftEar = ["up", "down", "flat", "middle"].random();
        this.my_rightEar = ["up", "down", "flat", "middle"].random();
        this.my_blush = [true, false].random();
        this.my_pop = true
        this.disapper()
      }
    },
    disapper() {
      const time = 3000 + Math.random() * 2000;
      !this.timer && (this.timer = setTimeout(() => {
        this.my_pop = false;
        clearTimeout(this.timer)
        this.timer = null
      }, time))
    }
  },
  created() {
    if ( this.shiba === "random" ) {
      this.canRandom = true;
      this.randomize();
    }
  }
}
</script>

<style>

</style>