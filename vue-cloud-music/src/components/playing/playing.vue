<template>
  <keep-alive>
    <div class="playing black">
      <div class="play-bg" ref="bg"></div>
      <div class="header">
        <i class="iconfont icon-xiangzuo" @click="back"></i>
        <p>{{name.length < 25? name:`${name.substring(0, 25)}...`}}</p>
        <i class="iconfont icon-zhuanfa" v-on:click.stop="notSupport"></i>
      </div>
      <div class="main" @click="showLyric">
        <div :class="!isLyricShow ? 'show' : ''">
          <img src="../../common/img/blackRecord.png">
          <div class="img-center">
            <img :src="musicImg">
          </div>
        </div>
        <section class="section-lyric">
          <lyric :show="isLyricShow" v-on:hide.stop="hideLyric"/>
        </section>
        <div class="head" :class="!isLyricShow ? 'show' : ''">
          <div></div>
          <img src="../../common/img/stylus.png" ref="stylus" :class="{'rotate':isPauseMusic}">
        </div>
        <div class="other" :class="!isLyricShow ? 'show' : ''">
          <div>
            <i class="iconfont icon-aixin likes" v-on:click.stop="likes" :class="{active: isLike}"></i>
          </div>
          <div>
            <i class="iconfont icon-xiazai" v-on:click.stop="notSupport"></i>
          </div>
          <div class="comment">
            <i class="iconfont icon-pinglun" v-on:click.stop="goComment"></i>
            <!--<span>999</span>-->
          </div>
          <div>
            <i class="iconfont icon-gengduo" v-on:click.stop="notSupport"></i>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="progress">
          <span>{{current}}</span>
          <div class="progress-bar" @touchend.prevent="touchend" @touchmove.prevent="touchmove" ref="progress">
            <div>
              <div class="real-progress" ref="progressReal">
                <div class="circle">
                  <div class="small-circle" ref="small"></div>
                </div>
              </div>
            </div>
          </div>
          <span>{{duration}}</span>
        </div>
        <div class="choose">
          <i class="iconfont icon-shunxubofang" v-if="playMode === 0" @click="updateMode"></i>
          <i class="iconfont icon-danquxunhuan1" v-if="playMode === 1" @click="updateMode"></i>
          <i class="iconfont icon-suiji2" v-if="playMode === 2" @click="updateMode"></i>
          <i class="iconfont icon-shangyishou" @click="prev"></i>
          <i class="iconfont icon-bofangquanbu" @click="play" v-if="!isPauseMusic"></i>
          <i class="iconfont icon-zanting" @click="pause" v-if="isPauseMusic"></i>
          <i class="iconfont icon-shangyishou1" @click="next"></i>
          <i class="iconfont icon-Group" @click="showList"></i>
        </div>
      </div>
      <div class="list" :class="{active: isShowList}">
        <div>
          <div class="listHeader" ref="listHeader">
            <div>
              <span>列表歌曲</span>
              <span>({{listInfo.length}})</span>
            </div>
            <div>
              <!--<span>收藏全部</span>-->
            </div>
          </div>
          <div class="listContainer" ref="listContainer">
            <div>
              <div v-for="(item, index) in listInfo" :key="item.id" @click="switchPlay(item, index)">
                <singleCollection :name="item.name" :singer="item.ar[0].name" :songId="item.id" :item="item" :index="index"></singleCollection>
              </div>
            </div>
          </div>
          <div class="listFooter" ref="listFooter" @click="closeList">
            <span>关闭</span>
          </div>
        </div>
      </div>
      <!-- <popBox :clickText="likeText" /> -->
    </div>
  </keep-alive>
</template>

<script>

import {getMusicUrl} from '@/common/js/axiosType/getAxiosType.js';
import {PLAY_PREV, PLAY_NEXT, UPDATE_PROGRESS, PLAY_IRREGULAR, PLAY_MODE, PLAY, PAUSE, JUMP, PLAY_MUSIC, LIKE} from '@/store/mutationType.js';
import {imgChche, toast} from '@/common/js/utils/utils.js';
import {mapMutations} from 'vuex';
// import popBox from '@/components/common/popBox/popBox.vue';
import BScroll from 'better-scroll';
import lyric from '@/components/lyric/lyric.vue'
import singleCollection from '@/components/common/singleCollection/singleCollection.vue';
export default {
  name: 'playing',
  data () {
    return {
      musicUrl: '',
      audio: '',
      isShowList: false,
      isShow: false,
      isLyricShow: false,
      // imgReady: false
    }
  },
  mounted () {
    this.initSong();
  },
  components: {
    singleCollection,
    // popBox,
    lyric,
  },
  computed: {
    //歌曲在列表中的index
    index () {
      return this.$store.state.playingIndex;
    },
    //歌曲id
    id () {
      return this.$store.state.playingId;
    },
    //歌曲名
    name () {
      return this.$store.state.playingName;
    },
    //歌曲背景图
    musicImg () {
      return this.$store.state.playImg;
    },
    //播放模式
    playMode () {
      return this.$store.state.playMode;
    },
    //当前播放长度
    current () {
      return this.$store.state.currentTime;
    },
    //总长度
    duration () {
      return this.$store.state.duration;
    },
    //是否暂停
    isPauseMusic () {
      return this.$store.state.isPlaying;
    },
    //歌单列表信息
    listInfo () {
      return this.$store.state.playList;
    },
    //正在播放的歌曲整体
    playingItem () {
      return this.$store.state.playItem;
    },
    //已收藏的歌曲
    collectionList () {
      return this.$store.state.collectionList.list;
    },
    //已收藏的歌曲们的id
    collctionIdList () {
      return this.$store.state.collectionList.id;
    },
    //该歌曲是否已喜欢
    isLike () {
      return this.collctionIdList.indexOf(this.id) !== -1;
    },
    //歌手
    singerName () {
      return this.$store.state.singerName
    },
    //未修正歌曲长度
    unFixDuration () {
      return this.$store.state.unFixedDuration
    }
  },
  methods: {
    //路由回退
    back () {
      this.$router.back(-1);
    },
    showLyric(e) {
      this.isLyricShow = true
    },
    hideLyric(e) {
      this.isLyricShow = false
    },
    notSupport() {
      toast('敬请期待')
    },
    goComment () {
      this.$router.push({
        path: `/listComment/${this.id}`,
        query: {
          img: this.musicImg,
          name: this.name,
          singerName: this.singerName,
          songSingle: true
        }
      })
    },
    initSong () {
      this.computeProgress();
      //初始化歌曲地址
      getMusicUrl(this.id).then(result => {
        this.musicUrl = result.data.data[0].url;
      });

      this.$refs.bg.style.background = `url(${this.musicImg}) no-repeat`;
    },
    computeProgress() {
      let value = this.$store.state.unFixedTime / this.$store.state.unFixedDuration;
      value = `${(value * 100).toFixed(2)}%`;
      this.$refs.progressReal.style.width = value;
    },
    //中断播放
    pause() {
      this.PAUSE()
    },
    //继续播放
    play() {
      this.PLAY()
    },
    //上一首
    prev() {
      this.PLAY_PREV();
    },
    //下一首
    next() {
      this.PLAY_NEXT();
    },
    //进度条跳到指定位置
    jump() {
      const progress = this.$refs.progress;
      progress.addEventListener('click', (e) => {
        let offsetX = e.offsetX;
        let width = progress.clientWidth;
        let percentage = `${(offsetX / width).toFixed(4) * 100}%`;
        let current = (percentage.split('%')[0] / 100) * this.unFixDuration;
        this.JUMP(current)
      })
    },
    //向store提交播放模式
    updateMode () {
      if (this.playMode === 0) {
        this.PLAY_MODE(1);
      } else if (this.playMode === 1) {
        this.PLAY_MODE(2);
      }else if (this.playMode === 2) {
        this.PLAY_MODE(0);
      }
    },
    //显示歌单列表
    showList () {
      this.isShowList = true;
      this.initWrapper()
    },
    closeList () {
      this.isShowList = false
    },
    //由于display为none，一开始载入不能够获取直接的高度，所以无法滚动，先采取hack的方式延迟100毫秒再获取。
    initWrapper () {
      setTimeout(() => {
        this.wrapper = new BScroll(this.$refs.listContainer, {
          scrollY: true,
          click: true
        })
      }, 100)
    },
    //切歌_(:з」∠)_
    switchPlay (item, index) {
      if (item.id === this.$store.state.playingId) {
        return
      }
      this.PLAY_MUSIC({item: item, index: index})
    },
    //点击喜欢该歌曲
    likes () {
      this.LIKE({item: this.playingItem, id: this.id});
      const storeSong = this.$store.state.collectionList;
      if (storeSong.id.includes(this.id)) {
        // this.likeText = '已喜欢！_(:з」∠)_';
        toast('已喜欢！_(:з」∠)_')
        return;
      }
      // this.likeText = '取消喜欢QAQ';
      toast('取消喜欢QAQ')
    },
    //拉动进度条
    touchmove (e) {
      const progress = this.$refs.progress;
      const realProgress = this.$refs.progressReal;
      const width = progress.clientWidth;
      const margin = e.target.offsetLeft;
      const newOffset = e.changedTouches[0].pageX - margin;
      if (newOffset > 0) {
        let percentage = ((newOffset / width).toFixed(4));
        if (percentage < 1) {
          realProgress.style.width = `${percentage * 100}%`;
          this.move = percentage * this.unFixDuration
        }
      }
    },
    touchend () {
      this.JUMP(this.move)
    },
    ...mapMutations([
      'PLAY_MUSIC',
      'PLAY_NEXT',
      'PLAY_PREV',
      'PLAY_IRREGULAR',
      'PLAY_MODE',
      'PLAY',
      'PAUSE',
      'JUMP',
      'LIKE'
    ])
  },
  watch: {
    current () {
      this.computeProgress();
    },
    musicImg () {
      imgChche(this.musicImg, () => {
        this.$refs.bg.style.background = `url(${this.musicImg}) no-repeat`;
      })
    },
  }
}

</script>

<style lang="less" scoped>
  @import '../../common/css/color.less';
  @import '../../common/css/fontSize.less';
.playing {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  &.black {
    background-color: #000;
  }
  &.white {
    background-color: #fff;
  }

  .list {
    display: none;
    position: fixed;
    height: 60vh;
    left: 0;
    right: 0;
    bottom: 0;
    color: @themeBlack;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    background-color: @listBg;
    animation: showList .4s cubic-bezier(0, 0.97, 0.55, 1.07);
    animation-fill-mode: forwards;

    &.active {
      display: block;
    }

    & > div {
      overflow: hidden;
      height: 100%;
    }

    .listHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 96%;
      height: 12%;
      padding: 0 2%;
      border-bottom: 1px #C9C9C9 solid;
    }

    .listContainer {
      overflow: hidden;
      height: 75%;
      line-height: 3rem;
    }

    .listFooter {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 13%;
      border-top: 1px #C9C9C9 solid;

      & > span {
        font-size: @oneSize + 0.2rem;
        display: block;
      }
    }
  }

  .main {
    position: fixed;
    display: flex;
    align-items: center;
    transition: all .3s linear;
    flex-wrap: wrap;
    justify-content: center;
    height: 68vh;
    top: 3rem;
    width: 100%;
    overflow: hidden;

    .section-lyric {
      position: absolute;
      overflow: hidden;
      height: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .head {
      display: block;
      // z-index: -1;
      opacity: 0;
      position: absolute;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background-color: #F7F7F8;
      top: 0;
      left: 50%;
      transition: all .3s linear;
      transform: translate(-50%, -50%);
      /*opacity: .8;*/

      &.show {
        opacity: 1;
      }

      & > div {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #DEDEDF;
        transform: translate(-50%, -50%);
      }


      & > img {
        position: absolute;
        top: 12px;
        left: 15px;
        transition: all .2s linear;
        transform-origin: 0 0;
      }

      & > img.rotate {
        transform: rotate(40deg);
      }
    }

    .other > div {
      position: relative;

      .comment {
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    .other i {
      font-size: @oneHalfSize + 0.5rem;

      &.likes.active {
        color: @themeRed;
      }
    }
    & > div:first-child {
      opacity: 0;
      position: relative;
      width: 80%;
      transition: all .3s linear;

      &.show {
        opacity: 1;
      }

      & > img:first-child {
        width: 100%;
        animation: rotate 25s linear infinite;
      }

      .img-center {
        position: absolute;
        width: 65%;
        height: 65%;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        overflow: hidden;
        transform: translate(-50%, -50%);

        & > img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 50%;
          animation: rotate 25s linear infinite;
        }
      }
    }
    & > div:last-child {
      z-index: 1;
      color: #C3AEB0;
      position: absolute;
      bottom: 0;
      width: 85%;
      opacity: 0;
      display: none;
      transition: all .3s linear;
      justify-content: space-between;

      &.show {
        display: flex;
        opacity: 1;
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 4.5vh;
    width: 96%;
    padding: 0 2%;

    .progress {
      width: 100%;
      display: flex;
      margin-bottom: 1.7rem;
      align-items: center;
      justify-content: space-between;

      .progress-bar {
        height: 2px;
        width: 80%;
        cursor: pointer;
        padding: 20px 0;

        & > div {
          background-color: #a6a6a6;
          width: 100%;
          height: 2px;

          .real-progress {
            position: relative;
            width: 0;
            height: 100%;
            background-color: #d81e06;

            .circle {
              position: absolute;
              right: -10px;
              top: 50%;
              width: 14px;
              height: 14px;
              border-radius: 50%;
              transform: translateY(-50%);
              background-color: #fff;

              .small-circle {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 4px;
                height: 5px;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                background-color: #D33A31;
              }
            }
          }
        }
      }

      & > span:first-child {
        width: 8%;
        font-size: @normalSize;
        color: #fff;
      }
      & > span:last-child {
        width: 8%;
        font-size: @normalSize;
        color: #fff;
      }
    }
    .choose {
      height: 2.5rem;
      margin: 0 auto;
      width: 94%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > i {
        font-size: 1.5rem;
        color: #fff;
      }

      & > i:nth-child(3) {
        font-size: 2.5rem;
        height: 2.5rem;
      }
    }
  }

  .play-bg {
    position: fixed;
    width: 120%;
    height: 120%;
    background-size: cover!important;
    filter: blur(55px);
    transform: translate(-10%, -10%);
    transition: all 1s cubic-bezier(0.38, 0.15, 0.63, 0.92);
  }

  .header {
    display: flex;
    color: #fff;
    position: relative;
    justify-content: space-between;
    line-height: 3rem;
    font-size: @oneHalfSize - 0.2rem;
    height: 3rem;
    background-color: transparent;
    padding: 0 1rem;

    & > i {
      font-size: @oneHalfSize;
    }
  }
}

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes showList {
    0% {
      top: 100vh;
      opacity: .3;
    }
    100% {
      top: 40vh;
      opacity: .98;
    }
  }

</style>
