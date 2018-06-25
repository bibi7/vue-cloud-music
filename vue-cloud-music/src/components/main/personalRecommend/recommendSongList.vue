<template>
  <div>
    <div class="recommendPart">
      <recommendTitle :name="'推荐歌单'"></recommendTitle>
      <recommendList :type="'recommend'" :width="'32%'"></recommendList>
    </div>
    <div class="recommendPart">
      <recommendTitle :name="'最新音乐'"></recommendTitle>
      <recommendList :type="'newMusic'"></recommendList>
    </div>
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
