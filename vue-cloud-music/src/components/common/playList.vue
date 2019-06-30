<template>
<div class="playList" :class="{'radius':radius}">
  <div class="item itemFirst">
    <i class="iconfont icon-bofangquanbu"></i>
    <div>
      <span @click="playAll">播放全部</span>
      <span class="number">（共{{info.length}}首）</span>
    </div>
    <div>收藏数 （{{subscribedCount}}）</div>
  </div>
  <playItem :itemArray="info" v-on:play-music="playMusic"/>
</div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import playItem from './playItem/playItem'
  import {PLAY_MUSIC} from '@/store/mutationType.js'
  export default {
    name: 'playList',
    components: {
      playItem,
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
    computed: {
      playingName () {
        return this.$store.state.playingName
      },
      indexs () {
        return this.$store.state.playingIndex
      }
    },
    methods: {
      playMusic(obj) {
        document.getElementById('audio').play();
        document.getElementById('audio').pause();
        //提交store
        this.PLAY_MUSIC(obj);
        //路由切换
        this.$router.push({
          path: '/playing'
        })
      },
      playAll() {
        //TODO

      },
      ...mapMutations([
        'PLAY_MUSIC',
      ]),
    },
    watch: {
      info () {
        console.log(this.info);
      }
    },
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
      border-bottom: 1px #EEEFF0 solid;

    }
    & > div:nth-child(3) {
      width: 30%;
      color: #fff;
      font-size: @normalSize;
      white-space: nowrap;
      background: linear-gradient(to right, #FE594A, #D43B31);
      border-bottom: 1px #EEEFF0 solid;


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
        border-bottom: 1px #EEEFF0 solid;

        .songName {
          font-size: @normalSize + 0.3rem;
          color: @themeBlack;
        }

        .songName.nowPlaying {
          color: @themeRed;
        }

        .songderivation {
          color: @themeGray;
        }
        .singer {
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
        border-bottom: 1px #EEEFF0 solid;

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
