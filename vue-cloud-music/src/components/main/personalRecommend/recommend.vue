<template lang="html">
  <div class="recommend">
    <div class="wrapper" ref="wrapper">
      <div>
        <div class="red-bg"></div>
        <div class="banner">
          <slider></slider>
        </div>
        <navigation></navigation>
        <recommendSongList></recommendSongList>
        <audio class="audio" ref="audio"></audio>
      </div>
    </div>
  </div>
</template>

<script>
  import slider from '../slider/slider.vue';
  import BScroll from 'better-scroll';
  import navigation from './recommendNavigate.vue';
  import recommendSongList from '@/components/main/personalRecommend/recommendSongList.vue'
  import {UPDATE_PROGRESS} from '@/store/mutationType.js'
  import {mapMutations} from 'vuex'
  export default {
  name: 'recommend',
  mounted () {
    this._initScroll();
    this.checkMusicBackground();
  },
    //在路由切换前上传播放进度
  beforeRouteLeave (to, from, next) {
    this.UPDATE_PROGRESS({
      currentTime: this.$refs.audio.currentTime,
      address: this.$refs.audio.src,
      pause: this.$store.state.isPlaying
    });
    next()
  },
  methods: {
    _initScroll () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true
      })
    },
    //checkMusicBackground在多处地方都曾使用，后期需要封装起来
    checkMusicBackground () {
      if (this.$store.state.isPlaying) {
        let address = this.$store.state.playAddress;
        let current = this.$store.state.currentTime;
        console.log(address);
        if (current !== '' && address !== '') {
          this.$refs.audio.src = address;
          this.$refs.audio.currentTime = current;
          this.$refs.audio.play();
        }
      }
    },
    ...mapMutations([
      'UPDATE_PROGRESS'
    ])
  },
  components: {
    slider,
    navigation,
    recommendSongList,
  }
}
</script>

<style lang="less" scoped>
.recommend {
  position: fixed;
  top: 5.5rem;
  width: 100%;
  bottom: 0;

  .wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .audio {
      display: none;
    }
  }

  .red-bg {
    position: absolute;
    top: -30vh;
    z-index: -10;
    width: 100%;
    height: 50vh;
    background-color: #D44439;
  }

  .banner {
    width: 96%;
    margin: 0 auto;
    color: #fff;
    overflow: hidden;
    border-radius: 5px;
  }
}
</style>
