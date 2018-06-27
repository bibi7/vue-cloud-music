<template>
  <div class="singleList" :class="{playingNow: index === storeIndex}">
    <img src="../../../common/img/playing_red.gif" v-if="index === storeIndex">
    <div>
      {{name.length < 15? name : `${name.substring(0, 15)}...`}}
    </div>
    <div class="singer">
       &nbsp;&nbsp;-&nbsp;&nbsp;{{singer.length < 15? singer : `${singer.substring(0, 15)}...`}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'singleCollection',
    props: {
      name: {
        type: String,
        default: ''
      },
      singer: {
        type: String,
        default: ''
      },
      songId: {
        type: Number,
        default: 0
      },
      index: {
        type: Number,
        default: 0
      },
      item: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    computed: {
      storeIndex () {
        return this.$store.state.playingIndex
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../common/css/color.less';
  @import '../../../common/css/fontSize.less';
.singleList {
  display: flex;
  align-items: center;
  width: 96%;
  margin: 0 auto;
  border-bottom: 1px #C9C9C9 solid;

  &.playingNow {
    color: @themeRed;
  }

  & > img {
    width: 13px;
    height: 13px;
    margin-right: 10px;
  }

  .singer {
    color: @themeGray;
    font-size: @normalSize;
  }
}

</style>
