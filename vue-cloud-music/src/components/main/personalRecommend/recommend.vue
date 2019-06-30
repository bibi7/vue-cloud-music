<template>
  <div class="recommend">
    <div class="wrapper" ref="wrapper">
      <div>
        <div class="red-bg"></div>
        <div class="banner">
          <keep-alive>
            <slider></slider>
          </keep-alive>
        </div>
        <navigation></navigation>
        <recommendSongList></recommendSongList>
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
    // this._initScroll();
  },
  methods: {
    // _initScroll () {
    //   this.scroll = new BScroll(this.$refs.wrapper, {
    //     scrollY: true,
    //     click: true
    //   })
    // },
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
  // position: fixed;
  position: relative;
  top: 5.5rem;
  width: 100%;
  bottom: 0;

  .wrapper {
    width: 100%;
    height: 100%;
    // overflow: hidden;
  }

  .red-bg {
    position: absolute;
    top: -25rem;
    z-index: -10;
    width: 100%;
    height: 32rem;
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
