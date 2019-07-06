<template>
  <div id="app">
    <appHeader></appHeader>
    <router-view></router-view>
    <audios></audios>
  </div>
</template>

<script>
import appHeader from './components/header/header.vue';
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
  methods: {
    firstPlay () {
      alert(1)
      let music = document.querySelector('#audio')
      music.play()
      if (music.src !== '') {
        this.stop = true
      }
    }
  },
  watch: {
    stop () {
      let app = document.querySelector('#app')
      app.removeEventListener('touchend', this.firstPlay)
    }
  },
  components: {
    appHeader,
    audios
  }
}
</script>

<style lang="less">
@import './common/css/icon/iconfont.css';
@import './common/css/reset.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
