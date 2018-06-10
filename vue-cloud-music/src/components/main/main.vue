<template lang="html">
  <div>
    <div class="swtich">
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
  name: 'mainPart'
}
</script>

<style lang="less">
@import '../../common/css/color.less';
.swtich {
  position: fixed;
  top: 2.5rem;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-around;
  line-height: 3rem;
  background-color: @themeRed;
  font-size: .7rem;
}
</style>
