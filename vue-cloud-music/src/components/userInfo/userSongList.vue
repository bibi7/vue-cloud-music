<template>
  <div class="songList">
    <div class="list-title">
      <div>
        <div class="list">
          <span>歌单({{songList.playlistCount}})</span>
        </div>
        <div class="collection">
          <span>共被收藏{{initCollectionNumber(songList.playlistBeSubscribedCount)}}次</span>
        </div>
      </div>
    </div>
    <div class="list-container">
      <div class="list-item" v-for="(item, index) in list" @click="goList(item.id)">
        <div class="item-img">
          <img :src="item.coverImgUrl">
        </div>
        <div class="r">
          <div>
            <div class="title">
              <span>{{item.name.length < 15? item.name: `${item.name.substring(0, 15)}...`}}</span>
            </div>
            <div class="info">
              <span>{{item.trackCount}}首，播放{{initCollectionNumber(item.playCount)}}次</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getUserPlaylist} from '@/common/js/axiosType/getAxiosType.js'
  export default {
    name: 'userSongList',
    data () {
      return {
        list: []
      }
    },
    computed: {
      userId () {
        return this.songList.userId
      }
    },
    props: {
      songList: {
        type: Object,
        default: function () {
          return {}
        }
      },
    },
    methods: {
      initCollectionNumber (num) {
        if (num > 100000 && num < 1000000) {
          return `${num.toString().substring(0, 2)}.${num.toString().substring(2, 3)}万`
        }
        if (num >= 1000000 && num < 10000000) {
          return `${num.toString().substring(0, 3)}.${num.toString().substring(3, 4)}万`
        }
        if (num > 10000000) {
          return `${num.toString().substring(0, 4)}.${num.toString().substring(4, 5)}万`
        }

        return num
      },
      getUserSongList (result) {
        console.log(result)
        this.list = result.data.playlist
      },
      goList (id) {
        this.$router.push({
          path: `/musicList/${id}`
        })
      },
      updateScroll () {
        this.$emit('updateScroll')
      }
    },
    mounted () {
      console.log(this.userId);
      getUserPlaylist(this.userId).then(result => {
        this.getUserSongList(result)
      })
    },
    watch: {
      userId (newValue, oldValue) {
        getUserPlaylist(newValue).then(result => {
          this.getUserSongList(result)
        })
        .then(this.updateScroll())
        .then(() => {
          this.$emit('goRemoveLoading')
        })
      }
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

    .list-container {
      width: 98%;
      margin-left: 2%;
      background-color: #fff;

      .list-item {
        display: flex;
        align-items: center;
        position: relative;

        & > div:nth-child(2) {
          padding-left: 10px;
        }

        .item-img {
          width: 15%;
          padding: 5px 0;

          & > img {
            display: block;
            border-radius: 5px;
            width: 100%;
          }
        }

        .r {
          position: absolute;
          display: flex;
          align-items: center;
          top: 0;
          bottom: 0;
          right: 0;
          left: 16%;
          border-bottom: 1px #EBECF7 solid;

          .title {
            color: @themeBlack;
          }
          .info {
            text-align: left;
            margin-top: 10px;
            color: @themeGray;
            font-size: .7rem;
          }
        }


      }
    }
  }
</style>
