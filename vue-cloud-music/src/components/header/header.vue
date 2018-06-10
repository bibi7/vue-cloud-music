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
        <i class="iconfont icon-zhengzaibofang"></i>
      </router-link>

    </div>
  </div>
</template>

<script>
import playList from '../playList/playList.vue'
export default {
  name: 'header_',
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
  color: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: @themeRed;
}
</style>
