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
          <img src="../../common/img/666.png">
          <div class="img-center">
            <img :src="musicImg" @click="pas">
          </div>
        </div>
        <div>
          <div>
            <i class="iconfont icon-headset"></i>
          </div>
          <div>
            <i class="iconfont icon-headset"></i>
          </div>
          <div>
            <i class="iconfont icon-headset"></i>
          </div>
          <div>
            <i class="iconfont icon-headset"></i>
          </div>
        </div>
      </div>
      <div class="footer">
        <div>
          <audio :src="musicUrl" controls="controls" ref="audio" autoplay="autoplay" style="position: absolute; transform: translateY(-6rem)"></audio>
        </div>
        <div>
          <i class="iconfont icon-shunxubofang"></i>
          <i class="iconfont icon-shangyishou"></i>
          <i class="iconfont icon-bofangquanbu"></i>
          <i class="iconfont icon-shangyishou1"></i>
          <i class="iconfont icon-Group"></i>
        </div>
      </div>
    </div>
  </keep-alive>
</template>

<script>
  import {getMusicUrl} from '@/common/js/axiosType/getAxiosType.js';
export default {
  name: 'playing',
  data () {
    return {
      name: '',
      id: '',
      musicUrl: '',
      musicImg: '',
      audio: '',
    }
  },
  mounted () {
    this.initSong();
    this.controlAudio();
  },
  methods: {
    back () {
      this.$router.back(-1);
    },
    initSong () {
      //初始化歌曲名
      this.name = this.$store.state.playingName;
      //初始化歌曲id
      this.id = this.$store.state.playingId;
      //初始化封面
      this.musicImg = this.$store.state.playImg;

      //初始化歌曲地址
      getMusicUrl(this.id).then(result => {
        this.musicUrl = result.data.data[0].url;
        console.log(this.musicUrl)
      });

      this.$refs.bg.style.background = `url(${this.musicImg}) no-repeat`;
    },
    //控制音频的操作
    controlAudio () {
      this.audio = this.$refs.audio;
    },
    pas () {
      this.audio.pause();
    }
  }
}
</script>

<style lang="less" scoped>
.playing {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  .main {
    position: fixed;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    height: 76vh;
    top: 3rem;
    width: 100%;

    & > div:first-child {
      position: relative;
      width: 77%;

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
    bottom: 2rem;
    width: 96%;
    margin: 0 2%;

    & > div {
      margin: 0 auto;
      width: 94%;
      display: flex;
      align-items: center;
      justify-content: space-between;

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
    /*border-bottom: 1px #312822 solid;*/
    /*background: linear-gradient(to bottom, #000 50%, #fff);*/
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
