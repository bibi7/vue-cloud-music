<template>
  <div class="navigation-out">
    <div class="navigation">
      <div>
        <i class="iconfont icon-fm"></i>
        <span>私人FM</span>
      </div>
      <div>
        <i class="iconfont icon-rili"></i>
        <span>每日推荐</span>
      </div>
      <div>
        <i class="iconfont icon-gedan"></i>
        <span>歌单</span>
      </div>
      <div>
        <i class="iconfont icon-paihangbang"></i>
        <span>排行榜</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'navigate',
    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  @import '../../../common/css/icon/iconfont.css';
  @import '../../../common/css/color.less';
  @import '../../../common/css/fontSize.less';
  .navigation-out {
    padding: 1rem 5% 2rem;
    box-sizing: border-box;
    border-bottom: 1px #cdcdcd solid;

    .navigation {
      display: flex;
      justify-content: space-between;

      & > div {
        position: relative;
        color: @themeRed;

        & > i {
          display: block;
          padding: 8px;
          border: 1px @themeRed solid;
          border-radius: 50%;
          font-size: @oneHalfSize;
        }

        & > span {
          position: absolute;
          left: 50%;
          margin-top: 7px;
          white-space: nowrap;
          transform: translateX(-50%);
          font-size: @normalSize;
          color: @themeBlack;
        }
      }
    }
  }

</style>
