<template>
<div class="playList" :class="{'radius':radius}">
  <div class="item itemFirst">
    <i class="iconfont icon-bofangquanbu"></i>
    <div>
      <span>播放全部</span>
      <span class="number">（共{{info.length}}首）</span>
    </div>
    <div>+ 收藏 （{{subscribedCount}}）</div>
  </div>
  <div class="listItem" v-for="(item, index) in info">
    <div>
      <span>{{index + 1}}</span>
    </div>
    <div>
      <div>
        <span class="songName">{{item.name}}</span>
        <span class="songderivation" v-show="item.alias[0]">（{{item.alias[0]}}）</span>
        <p class="singer">{{item.album.artists[0].name}} - {{item.album.name}}</p>
      </div>
    </div>
    <i class="iconfont icon-gengduo"></i>
  </div>
</div>
</template>

<script>
  export default {
    name: 'playList',
    data () {
      return {
        musicInfo: [],
      }
    },
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
    methods: {

    },
    watch: {
      info () {
        console.log(this.info);
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
    height: 3.5rem;

    & > i:first-child {
      width: 10%;
      font-size: 1.2rem;
      border-bottom: 1px transparent solid;
    }

    & > div:nth-child(2) {
      width: 60%;
      text-align: left;
      border-bottom: 1px #cdcdcd solid;

    }
    & > div:nth-child(3) {
      width: 30%;
      color: #fff;
      font-size: @normalSize;
      white-space: nowrap;
      background: linear-gradient(to right, #FE594A, #D43B31);
      border-bottom: 1px #cdcdcd solid;


    }
    .number {
      position: absolute;
      color: @themeGray;
      font-size: @songsNumber;
    }
  }

  .listItem {
    display: flex;
    align-items: center;
    height: 3.5rem;

      & > div:first-child {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 10%;
        height: 100%;
        color: @themeGray;
      }

      & > div:nth-child(2) {
        display: flex;
        align-items: center;
        width: 80%;
        height: 100%;
        text-align: left;
        border-bottom: 1px #cdcdcd solid;

        .songName{
          font-size: @normalSize + 0.3rem;
          color: @themeBlack;
        }
        .songderivation{
          color: @themeGray;
        }
        .singer{
          color: @themeGray;
          margin-top: 8px;
          font-size: @normalSize - 0.1rem;
        }
      }
      & > i:nth-child(3) {
        display: flex;
        align-items: center;
        color: @themeGray;
        font-size: @oneHalfSize - 0.2rem;
        width: 10%;
        height: 100%;
        border-bottom: 1px #cdcdcd solid;

      }
  }

  .itemFirst {
    line-height: 3.5rem;
  }
}
.radius {
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
