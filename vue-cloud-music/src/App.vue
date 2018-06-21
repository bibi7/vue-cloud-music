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
