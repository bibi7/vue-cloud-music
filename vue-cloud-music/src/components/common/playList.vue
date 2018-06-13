<template>
<div class="playList" :class="{'radius':radius}">
  <div class="item itemFirst">
    <i class="iconfont icon-bofang"></i>
    <div>
      <span>播放全部</span>
      <span class="number">（共{{info.length}}首）</span>
    </div>
    <div>+ 收藏 （{{subscribedCount}}）</div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'playList',
    props: {
      radius: {
        type: Boolean,
        default: false,
      },
      info: {
        type: Array,
        default: function () {
          return []
        }
      },
      subscribedCount: {
        type: Number,
        default: 0,
      }
    },
    data () {
      return {

      }
    },
    methods: {

    },
    watch: {
      info () {
        console.log(111);
        console.log(this.info)
      }
    }
  }

</script>

<style lang="less" scoped>
  @import '../../common/css/fontSize.less';
  @import '../../common/css/color.less';
.playList {
  position: relative;
  width: 100%;
  background-color: #fff;

  .item {
    display: flex;
    align-items: center;
    height: 2.5rem;

    & > i:first-child {
      width: 10%;
    }

    & > div:nth-child(2) {
      width: 60%;
      text-align: left;
    }
    & > div:nth-child(3) {
      width: 30%;
      color: #fff;
      font-size: @normalSize;
      white-space: nowrap;
      background: linear-gradient(to right, #FE594A, #D43B31);
    }
    .number {
      color: @themeGray;
      font-size: @songsNumber;
    }
  }

  .itemFirst {
    line-height: 2.5rem;
  }
}
.radius {
  overflow: hidden;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
