<template>
  <keep-alive>
    <div class="playing">
      <div class="play-bg" ref="bg"></div>
      <div class="header">
        <i class="iconfont icon-xiangzuo" @click="back"></i>
        <p>{{name}}</p>
        <i class="iconfont icon-zhuanfa"></i>
      </div>
      <div class="main">
        <div>
          <img src="../../common/img/blackRecord.png">
          <div class="img-center">
            <img :src="musicImg">
          </div>
        </div>
        <div class="head">
          <div></div>
          <img src="../../common/img/stylus.png" ref="stylus" :class="{'rotate':pauseMusic}">
        </div>
        <div class="other">
          <div>
            <i class="iconfont icon-xin"></i>
          </div>
          <div>
            <i class="iconfont icon-xiazai"></i>
          </div>
          <div>
            <i class="iconfont icon-pinglun"></i>
          </div>
          <div>
            <i class="iconfont icon-gengduo"></i>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="progress">
          <span>{{current}}</span>
          <div class="progress-bar" ref="progress" @click="jump">
            <div class="real-progress" ref="progressReal">
              <div class="circle">
                <div class="small-circle"></div>
              </div>
            </div>
          </div>
          <span>{{duration}}</span>
        </div>
        <div class="choose">
          <i class="iconfont icon-shunxubofang" v-if="playMode === 0" @click="updateMode"></i>
          <i class="iconfont icon-danquxunhuan" v-if="playMode === 1" @click="updateMode"></i>
          <i class="iconfont icon-suiji2" v-if="playMode === 2" @click="updateMode"></i>
          <i class="iconfont icon-shangyishou" @click="prev"></i>
          <i class="iconfont icon-bofangquanbu" @click="play" v-if="!pauseMusic"></i>
          <i class="iconfont icon-zanting" @click="pause" v-if="pauseMusic"></i>
          <i class="iconfont icon-shangyishou1" @click="next"></i>
          <i class="iconfont icon-Group"></i>
        </div>
      </div>
      <div class="list">

      </div>
    </div>
  </keep-alive>
</template>

<script>

import {getMusicUrl} from '@/common/js/axiosType/getAxiosType.js';
import {PLAY_PREV, PLAY_NEXT, UPDATE_PROGRESS, PLAY_IRREGULAR, PLAY_MODE, PLAY, PAUSE, JUMP} from '@/store/mutationType.js'
import {mapMutations} from 'vuex'
export default {
  name: 'playing',
  data () {
    return {
      musicUrl: '',
      audio: '',
    }
  },
  mounted () {
    this.initSong();
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
    current () {
      return this.$store.state.currentTime;
    },
    duration () {
      return this.$store.state.duration;
    },
    pauseMusic () {
      return this.$store.state.isPlaying;

    }
  },
  methods: {
    //确认后台播放的进度
    checkMusicBackground () {
      if (this.$store.state.currentTime !== '' && this.$store.state.playAddress !== '') {
        this.audio.src = this.$store.state.playAddress;
        this.audio.currentTime = parseFloat(this.$store.state.currentTime);
      }
    },
    //路由回退，上传播放进度
    back () {
      this.$router.back(-1);
    },
    initSong () {
      //初始化歌曲地址
      getMusicUrl(this.id).then(result => {
        console.log(result);
        this.musicUrl = result.data.data[0].url;
        console.log(this.musicUrl)
      });

      this.$refs.bg.style.background = `url(${this.musicImg}) no-repeat`;
    },
    //中断播放
    pause () {
      this.PAUSE()
    },
    //继续播放
    play () {
      this.PLAY()
    },
    //上一首
    prev () {
      this.PLAY_PREV();
    },
    //下一首
    next () {
      this.PLAY_NEXT();
    },
    //进度条跳到指定位置
    jump () {
      const progress = this.$refs.progress;
      const progressReal = this.$refs.progressReal;
      progress.addEventListener('click', (e) => {
        let offsetX = e.offsetX;
        let width = progress.clientWidth;
        let percentage = `${(offsetX / width).toFixed(4) * 100}%`;
        let current = (percentage.split('%')[0] / 100) * this.$store.state.unFixedDuration;
        this.JUMP(current)
      })
    },
    //进度条更新进度
    updateProgress () {
      let value = this.$store.state.unFixedTime / this.this.$store.state.unFixedDuration;
      value = `${(value * 100).toFixed(2)}%`;
      this.$refs.progressReal.style.width = value;
    },
    //播放结束按照播放模式选择下一首曲目
    checkMode () {
      switch (this.playMode) {
        //顺序播放，直接向store提交下一首
        case 0:
          this.PLAY_NEXT();
          this.initSong();
          this.pauseMusic = false;
          break;
        //单曲循环，这里偷懒直接把进度条拉到最开始的地方
        case 1:
          this.audio.currentTime = 0;
          this.play();
          break;
        //随机播放，向store提交请求
        case 2:
          this.PLAY_IRREGULAR();
          this.initSong();
          this.pauseMusic = false;
          break;
      }
    },
    //向store提交播放模式
    updateMode () {
      if (this.playMode === 0) this.PLAY_MODE(1);
      else if (this.playMode === 1) this.PLAY_MODE(2);
      else if (this.playMode === 2) this.PLAY_MODE(0);
    },
    ...mapMutations([
      'PLAY_NEXT',
      'PLAY_PREV',
      'PLAY_IRREGULAR',
      'PLAY_MODE',
      'PLAY',
      'PAUSE',
      'JUMP'
    ])
  },
  watch: {
    current () {
      let value = this.$store.state.unFixedTime / this.$store.state.unFixedDuration;
      console.log(value)
      value = `${(value * 100).toFixed(2)}%`;
      this.$refs.progressReal.style.width = value;
    },
    musicImg () {
      this.$refs.bg.style.background = `url(${this.musicImg}) no-repeat`;
    }
  }
}

</script>

<style lang="less" scoped>
  @import '../../common/css/color.less';
  @import '../../common/css/fontSize.less';
.playing {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  .list {
    position: absolute;

  }

  .main {
    position: fixed;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    height: 76vh;
    top: 3rem;
    width: 100%;
    overflow: hidden;

    .head {
      position: absolute;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background-color: #F7F7F8;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      /*opacity: .8;*/

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

    .other i {
      font-size: @oneHalfSize + 0.3rem;
    }

    & > div:first-child {
      position: relative;
      width: 85%;

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
          animation: rotate 25s linear infinite;
        }
      }
    }

    & > div:last-child {
      color: #C3AEB0;
      position: absolute;
      bottom: 0;
      width: 65%;
      display: flex;
      justify-content: space-between;
    }
  }

  .footer {
    position: absolute;
    bottom: 2.5vh;
    width: 96%;
    margin: 0 2%;

    .progress {
      width: 100%;
      display: flex;
      margin-bottom: .7rem;
      align-items: center;
      justify-content: space-between;

      .progress-bar {
        height: 2px;
        width: 72%;
        background-color: #a6a6a6;
        cursor: pointer;

        .real-progress {
          position: relative;
          width: 0;
          height: 100%;
          transition: width .3s linear;
          background-color: #d81e06;

          .circle {
            position: absolute;
            right: -10px;
            top: 50%;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            transform: translateY(-50%);
            background-color: #fff;

            .small-circle {
              position: absolute;
              top: 50%;
              left: 50%;
              width: 5px;
              height: 5px;
              border-radius: 50%;
              transform: translate(-50%, -50%);
              background-color: #D33A31;
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
      margin: 0 auto;
      width: 94%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      /*& > div {*/
        /*width: 1.2rem;*/
        /*height: 1.2rem;*/
        /*overflow: hidden;*/
        /*& > i {*/
          /*font-size: 1.2rem;*/
          /*color: #fff;*/
        /*}*/
      /*}*/

      & > i {
        font-size: 1.2rem;
        color: #fff;
      }

      & > i:nth-child(3) {
        font-size: 2rem;
      }
    }
  }

  .play-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: cover!important;
    filter: blur(60px);
  }

  .header {
    line-height: 3rem;
    height: 3rem;
    background-color: transparent;
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
</style>
