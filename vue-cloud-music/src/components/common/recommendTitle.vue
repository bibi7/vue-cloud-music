<template>
  <div class="recommendTitle">
    <p>{{name}}</p>
    <i class="iconfont icon-combinedshapefuben"></i>
  </div>
</template>


<script>
  export default {
    name: 'recommendTitle',
    props: {
      name: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="less" scoped>
  .recommendTitle {
    text-align: left;
  }
  .recommendTitle p {
    display: inline-block;
    text-align: left;
    line-height: 2.5rem;
  }
</style>
