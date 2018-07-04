<template>
  <div class="ranking">
    <redHeader>
      <span>排行榜</span>
    </redHeader>
  </div>
</template>

<script>
  import redHeader from '@/components/common/redHeader/redHeader.vue'
  import {getRanking} from '@/common/js/axiosType/getAxiosType.js'
  export default {
    name: 'ranking',
    components: {
      redHeader
    }
  }
</script>

<style lang="less" scoped>
  .ranking {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 20;
  }
</style>
