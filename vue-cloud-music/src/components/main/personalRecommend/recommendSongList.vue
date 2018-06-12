<template>
  <div class="recommendPart">
    <recommendTitle></recommendTitle>
    <recommendList :type="'recommend'"></recommendList>
  </div>
</template>


<script>
  import recommendTitle from '@/components/common/recommendTitle.vue'
  import recommendList from '@/components/common/recommendList.vue'
  export default {
    name: 'recommendSongList',
    components: {
      recommendTitle,
      recommendList,
    },
    mounted () {
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  .recommendPart {
    width: 96%;
    margin: 0 auto;
  }
</style>
