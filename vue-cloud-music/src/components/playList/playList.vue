<template lang="html">
  <!--我喜欢-->
  <div class="list">
    <div class="collection-header">
      <div class="">
        <div>
          <i class="iconfont icon-xiangzuo" @click="back"></i>
        </div>
        <div class="">
          <span>我喜欢</span>
        </div>
        <div class="">
          <i class="iconfont icon-zhengzaibofang" @click="goPlaying" v-if="!playing"></i>
          <img class="gif" src="../../common/img/playing_white.gif" @click="goPlaying" v-if="playing">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playList',
  data () {
    return {

    }
  },
  mounted () {
    console.log(this.collectionList)
  },
  computed: {
    playing () {
      return this.$store.state.isPlaying
    },
    collectionList () {
      return this.$store.state.collectionList.list
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    goPlaying () {
      this.$router.push({
        path: '/playing'
      })
    }
  }
}
</script>

<style lang="less">
@import '../../common/css/color.less';
@import '../../common/css/fontSize.less';
.list {
  position: fixed;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  .collection-header {
    background-color: @themeRed;

    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      width: 96%;
      margin: 0 auto;
      height: 2.5rem;

      .gif {
        width: 17px;
        height: 17px;
      }
    }
  }
}
</style>
