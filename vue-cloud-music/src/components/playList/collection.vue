<template lang="html">
  <!--我喜欢-->
  <div class="list">
    <div class="collection-header" ref="collectionHeader">
      <div>
        <div>
          <i class="iconfont icon-xiangzuo" @click="back"></i>
        </div>
        <div>
          <span>我喜欢</span>
        </div>
        <div>
          <i class="iconfont icon-zhengzaibofang" @click="goPlaying" v-if="!playing"></i>
          <img class="gif" src="../../common/img/playing_white.gif" @click="goPlaying" v-if="playing">
        </div>
      </div>
    </div>
    <div class="container" v-if="collectionList.length !== 0" ref="container">
      <div>
        <div class="item"  v-for="(item, index) in collectionList" @click="playMusic({item: item, index: index, list: collectionList})">
          <div>
            <div class="item-img">
              <img :src="item.al.picUrl">
            </div>
          </div>
          <div>
            <div class="item-mid">
              <img class="gifs" src="../../common/img/playing_red.gif" v-if="item.id === id">
              <div class="">
                <div :class="{playing: id === item.id}">
                  {{item.name}}
                </div>
                <div class="item-info">
                  {{item.ar[0].name}} - {{item.al.name}}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="item-like">
              <i class="iconfont icon-aixin like"></i>
            </div>
          </div>
        </div>
        <div class="total">
          <span>共计{{collectionList.length}}首已喜欢_(:з」∠)_</span>
        </div>
      </div>
    </div>
    <div class="none-list" v-else>
      <div>
        <span>哎呀，列表是空的呢！</span>
        <span>看起来你还没有添加已喜欢的歌曲噢QAQ</span>
        <span>快快行动起来！⸜(* ॑꒳ ॑* )⸝</span>
      </div>
      <span class="tips">tips: 在播放页点击小红心</span>
    </div>
  </div>
</template>

<script>
import {PLAY_MUSIC} from '@/store/mutationType.js'
import BScroll from 'better-scroll'
import {mapMutations} from 'vuex'
export default {
  name: 'playList',
  data () {
    return {

    }
  },
  mounted () {
    this.resetHeight();
    if (this.collectionList.length !== 0) {
      this.initScroll();
    }
  },
  computed: {
    playing () {
      return this.$store.state.isPlaying
    },
    collectionList () {
      return this.$store.state.collectionList.list
    },
    id () {
      return this.$store.state.playingId
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
    },
    //提交store
    playMusic (obj) {
      this.PLAY_MUSIC(obj)
      this.goPlaying();
    },
    //初始化回弹
    initScroll () {
      return new BScroll(this.$refs.container, {
        scrollY: true,
        click: true
      });
    },
    //重新计算隐藏高度
    resetHeight () {
      const headerHeight = this.$refs.collectionHeader.clientHeight;
      const container = this.$refs.container;
      container.style.height = `${container.clientHeight - headerHeight}px`
    },
    ...mapMutations([
      'PLAY_MUSIC'
    ])
  }
}
</script>

<style lang="less" scoped>
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

  .container {
    width: 96%;
    height: 100%;
    overflow: hidden;
    margin: 0 auto;

    & > div {
      padding-bottom: 1px;
      & > div:first-child {
        border-top: 1px #EEEFF0 solid;
      }

      .item {
        width: 100%;
        height: 3rem;
        border-bottom: 1px #EEEFF0 solid;
        display: flex;
        align-items: center;
        // justify-content: space-between;

        & > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        & > div:first-child {
          width: 10%;
        }

        & > div:nth-child(2) {
          width: 80%;
          justify-content: flex-start;
        }

        & > div:nth-child(3) {
          width: 10%;
        }

        .item-img {
          width: 2.5rem;
          overflow: hidden;

          & > img {
            width: 100%;
            border-radius: 5px;
          }
        }

        .item-mid {
          display: flex;
          align-items: center;
          text-align: left;
          margin-left: 1rem;

          .playing {
            color: @themeRed;
          }
          .item-info {
            margin-top: 6px;
            color: @themeGray;
            font-size: @normalSize;
          }
        }

        .item-like {
          color: @themeRed;
        }
      }

      .total {
        margin: 20px;
        font-size: 0.8rem;
        color: @themeRed;
      }
    }
  }

  .none-list {
    color: @themeRed;
    font-size: 0.8rem;

    & > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      & > span {
        white-space: nowrap;
        line-height: 2rem;
        display: block;
      }
    }

    .tips {
      color: @themeGray;
      position: fixed;
      bottom: 20px;
      right: 20px;
    }
  }
}
.gifs {
  width: 13px;
  height: 13px;
  margin-right: 10px;
}
</style>
