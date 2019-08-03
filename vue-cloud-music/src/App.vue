<template>
  <div id="app">
    <!-- <appHeader></appHeader> -->
    <redHeader :fixed="true">
      <span>网易云音乐</span>
    </redHeader>
    <router-view></router-view>
    <audios></audios>
    <div id="toast" class="toast" @animationend="toastEnd"></div>
  </div>
</template>

<script>
import appHeader from './components/header/header.vue';
import redHeader from './components/common/redHeader/redHeader.vue';
import audios from './components/playing/audio.vue';
export default {
  name: 'App',
  data () {
    return {
      stop: false
    }
  },
  mounted () {
    let app = document.querySelector('#app')
    app.addEventListener('touchend', this.firstPlay)
  },
  beforeRouteLeave(to, from, next) {
    // alert(111);
  },
  methods: {
    firstPlay () {
      let music = document.querySelector('#audio')
      music.play()
      if (music.src !== '') {
        this.stop = true
      }
    },
    toastEnd() {
      let toast = document.querySelector('#toast')
      toast.classList.remove('show')
    }
  },
  watch: {
    stop () {
      let app = document.querySelector('#app')
      app.removeEventListener('touchend', this.firstPlay)
    }
  },
  components: {
    redHeader,
    appHeader,
    audios
  }
}
</script>

<style lang="less">
@import './common/css/icon/iconfont.css';
@import './common/css/reset.css';
@import './common/css/common.less';

.toast {
  position: fixed;
  border-radius: 10px;
  display: none;
  padding: 20px;
  top: 50%;
  left: 50%;
  opacity: .8;
  background-color: #000;
  transform: translate(-50%, -50%);
  font-size: .9rem;
  color: #fff;
  z-index: 10;

  &.show {
    display: block;
    animation-fill-mode: backwards;
    animation: fade 2s linear;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
