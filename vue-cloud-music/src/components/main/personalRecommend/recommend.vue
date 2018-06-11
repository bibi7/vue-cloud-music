<template lang="html">
  <div class="recommend">
    <div class="red-bg"></div>
    <div class="banner">
      <slider></slider>
    </div>
  </div>
</template>

<script>
  import slider from '../slider/slider.vue'

export default {
  name: 'recommend',
  components: {
    slider,
  }
}
</script>

<style lang="less">
.recommend {
  position: relative;
  margin-top: 5.5rem;

  .red-bg {
    position: absolute;
    top: -30vh;
    z-index: -10;
    width: 100%;
    height: 50vh;
    background-color: #D44439;
  }

  .banner {
    width: 96%;
    margin: 0 auto;
    color: #fff;
    overflow: hidden;
    border-radius: 5px;
  }
}
</style>
