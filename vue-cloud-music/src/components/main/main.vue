<template lang="html">
  <div>
    <div class="switch">
      <router-link to="/mainPart/recommend">
        <span>个性推荐</span>
      </router-link>
      <router-link to="/mainPart/radio">
        <span>主播电台</span>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'mainPart',
}
</script>

<style lang="less" scoped>
@import '../../common/css/color.less';
@import '../../common/css/fontSize.less';

.switch {
  position: fixed;
  top: 2.5rem;
  width: 100%;
  height: 3rem;
  z-index: 10;
  display: flex;
  justify-content: space-around;
  line-height: 3rem;
  background-color: @themeRed;
  font-size: @normalSize + 0.2rem;

  .router-link-exact-active {
    position: relative;
  }

  .router-link-exact-active::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 3px;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 7px;
    background-color: #fff;
  }
}
</style>
