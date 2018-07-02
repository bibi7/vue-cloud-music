<template>
  <!--与header组件其实重复了，后期需要合并起来-->
  <div class="red-header" :class="{tr : transparent, fixed: fixed}">
    <div>
      <div>
        <i class="iconfont icon-xiangzuo" @click="back"></i>
      </div>
      <div>
        <slot></slot>
      </div>
      <div>
        <i class="iconfont icon-zhengzaibofang" @click="goPlaying" v-if="!playing"></i>
        <img class="gif" src="../../../common/img/playing_white.gif" @click="goPlaying" v-if="playing">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'redHeader',
    props: {
      transparent: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      playing () {
        return this.$store.state.isPlaying
      },
    },
    methods: {
      goPlaying () {
        this.$router.push({
          path: '/playing'
        })
      },
      back () {
        this.$router.back(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../common/css/color.less';
  @import '../../../common/css/fontSize.less';

  .red-header {
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

    &.tr {
      background-color: transparent;
    }

    &.fixed {
      position: fixed;
      top: 0;
      width: 100%;
    }
  }
</style>
