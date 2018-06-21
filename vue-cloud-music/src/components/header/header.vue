<template lang="html">
  <div>
    <div class="header">
      <!--前往我的播放列表-->
      <router-link to="/playList">
        <i class="iconfont icon-menu"></i>
      </router-link>
      <p>网易云音乐</p>
      <!--前往正在播放-->
      <router-link to="/playing">
        <i class="iconfont icon-zhengzaibofang" v-if="!playing"></i>
        <img class="gif" src="../../common/img/playing_white.gif" v-if="playing">
      </router-link>
    </div>
  </div>
</template>

<script>
import playList from '../playList/playList.vue'
export default {
  name: 'header_',
  computed: {
    playing () {
      return this.$store.state.isPlaying
    }
  }
}
</script>

<style lang="less">
@import '../../common/css/icon/iconfont.css';
@import '../../common/css/color.less';
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 2.5rem;
  padding: 0 1rem;
  line-height: 2.5rem;
  z-index: 10;
  color: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: @themeRed;


  .gif {
    width: 17px;
    height: 17px;
  }
}
</style>
