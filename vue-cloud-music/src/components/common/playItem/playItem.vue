<template lang="html">
  <!--通用歌曲item组件-->
  <div>
    <div class="listItem" v-for="(item, index) in itemArray" @click="playMusic({item: item, index: index, list: itemArray})">
      <div>
        <span v-if="item.id !== id">{{index + 1}}</span>
        <img class="gif" src="../../common/img/playing_red.gif" v-if="item.id === id">
      </div>
      <div>
        <div>
          <span class="songName" :class="{nowPlaying: item.id === id}">{{item.name.length < 20? item.name: item.name.substring(0, 20) + '...'}}</span>
          <!--<span class="songderivation" v-show="item.alia[0]">（{{item.alia[0]}}）</span>-->
          <p class="singer">{{item.ar[0].name}} - {{item.al.name.length < 15? item.al.name: item.al.name.substring(0, 15) + '...'}}</p>
        </div>
      </div>
      <i class="iconfont icon-gengduo"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playItem',
  props: {
    itemArray: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
  data() {
    return {
      musicArray: []
    }
  },
  methods: {
    playMusic(musicItem) {
      this.$emit('playMusic')
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
