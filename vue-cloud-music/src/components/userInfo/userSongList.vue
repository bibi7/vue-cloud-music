<template>
  <div class="songList">
    <div class="list-title">
      <div>
        <div class="list">
          <span>歌单({{songList.playlistCount}})</span>
        </div>
        <div class="collection">
          <span>共被收藏{{num}}次</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'userSongList',
    data () {
      return {
        num: this.songList.playlistBeSubscribedCount
      }
    },
    props: {
      songList: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    methods: {
      initCollectionNumber () {
        if (this.num > 100000 && this.num < 1000000) {
          this.num = `${this.num.toString().substring(0, 2)}.${this.num.toString().substring(2, 3)}万`
        }
        if (this.num >= 1000000 && this.num < 10000000) {
          this.num = `${this.num.toString().substring(0, 3)}.${this.num.toString().substring(3, 4)}万`
        }
        if (this.num > 10000000) {
          this.num = `${this.num.toString().substring(0, 4)}.${this.num.toString().substring(4, 5)}万`
        }
      }
    },
    mounted () {
      this.initCollectionNumber();
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/css/fontSize.less';
  @import '../../common/css/color.less';
  .songList {
    .list-title {
      background-color: #EEEFF0;

      & > div {
        display: flex;
        justify-content: space-between;
        width: 96%;
        margin: 0 auto;

        & span {
          font-size: .8rem;
          line-height: 2rem;
        }

        .list {
          color: @themeBlack;
        }
        .collection {
          color: @themeGray;
        }
      }
    }
  }
</style>
