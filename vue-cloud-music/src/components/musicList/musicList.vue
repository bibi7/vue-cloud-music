<template>
  <keep-alive>
    <div class="musicList" ref="musicList">
      <div class="listInfo" ref="listInfo">
        <div>
          <div class="main-bg" ref="mainBg"></div>
          <div class="info">
            <div class="info-img">
              <img :src="listMusicImg">
            </div>
            <div class="info-message">
              <div>
                <p class="mes-title">{{name}}</p>
                <div class="creator">
                  <img :src="avatar.imgUrl">
                  <div>
                    <span>{{avatar.nickname}}</span>
                    <i class="iconfont icon-combinedshapefuben"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="choose">
              <div>
                <div class="items">
                  <i class="iconfont icon-pinglun"></i>
                  <span>{{commentCount}}</span>
                </div>
                <div class="items">
                  <i class="iconfont icon-zhuanfa"></i>
                  <span>{{shareCount}}</span>
                </div>
                <div class="items">
                  <i class="iconfont icon-xiazai"></i>
                  <span>下载</span>
                </div>
                <div class="items">
                  <i class="iconfont icon-duoxuan"></i>
                  <span>多选</span>
                </div>
              </div>
            </div>
          </div>
          <playList :radius="true" :info="tracks" :subscribedCount="subscribedCount"></playList>
        </div>
      </div>
      <div class="title">
        <div class="title-bg"></div>
        <div class="title-content">
          <i class="iconfont icon-xiangzuo" @click="back"></i>
          <p>歌单</p>
          <i class="iconfont icon-zhengzaibofang" @click="goPlaying" v-if="!playing"></i>
          <img class="gif" src="../../common/img/playing_red.gif" @click="goPlaying" v-if="playing">
        </div>
      </div>
    </div>
  </keep-alive>
</template>

<script>
  import BScroll from 'better-scroll'
  import {getMusicListInfo} from '@/common/js/axiosType/getAxiosType.js'
  import playList from '@/components/common/playList.vue'
  import {UPDATE_PROGRESS} from '@/store/mutationType.js'
  import {mapMutations} from 'vuex'
  export default {
    name: 'musicList',
    data () {
      return {
        listId: '',
        listMusicImg: '',
        avatar: {},
        name: '',
        subscribedCount: 0,
        commentCount: 0,
        shareCount: 0,
        tracks: [],
        scrollY: 0,
      }
    },
    components: {
      playList,
    },
    methods: {
      //获取歌单id
      getMusicId () {
        this.listId = this.$route.params.id
      },

      //通过歌单id进行歌单列表查询，并进行一些初始化操作
      getMusicListInfo () {
        this.getMusicId();
        getMusicListInfo(this.listId).then(result => {
          console.log(result);
          //歌单封面
          this.listMusicImg = result.data.playlist.coverImgUrl;
          //歌单简述
          this.name = result.data.playlist.name;
          //创建者信息
          this.avatar.imgUrl = result.data.playlist.creator.backgroundUrl;
          this.avatar.nickname = result.data.playlist.creator.nickname;
          //歌曲列表信息
          this.tracks = result.data.playlist.tracks;
          //收藏数量
          this.subscribedCount = result.data.playlist.subscribedCount;
          //评论数量
          this.commentCount = result.data.playlist.commentCount;
          //分享数量
          this.shareCount = result.data.playlist.shareCount;
          //其他的初始化操作
          this.$refs.mainBg.style.background = `url(${this.listMusicImg}) center no-repeat`;
          this.$refs.mainBg.style.backgroundSize = 'cover';
          this.$refs.mainBg.style.filter = 'blur(20px)'
        })
      },
      //回弹初始化
      initWrapper () {
        console.log(this.$refs.listInfo.offsetHeight);
        const scrollWrapper = new BScroll(this.$refs.musicList, {
          scrollY: true,
          click: true,
          probeType: 3
        });

        scrollWrapper.on('scroll', this.onScroll)
      },
      //路由回退
      back () {
        this.$router.back(-1)
      },
      //路由前进
      goPlaying() {
        this.$router.push({
          path: '/playing'
        })
      },
      onScroll (pos) {
        this.scrollY = pos.y
      },
      checkBgHeight () {
        this.bgHeight = this.$refs.mainBg.clientHeight
      },
      ...mapMutations([
        'UPDATE_PROGRESS'
      ])
    },
    computed: {
      //歌曲是否正在播放，决定了左上角的gif是否显示
      playing () {
        return this.$store.state.isPlaying
      }
    },
    watch: {
      scrollY () {
        console.log(this.scrollY)
        console.log(this.bgHeight)
      }
    },
    mounted () {
      this.getMusicListInfo();
      this.initWrapper();
      this.checkBgHeight();
    },
    //在路由切换前上传播放进度
//    beforeRouteLeave (to, from, next) {
//      this.UPDATE_PROGRESS({
//        currentTime: this.$refs.audio.currentTime,
//        address: this.$refs.audio.src,
//        pause: this.$store.state.isPlaying
//      });
//      next()
//    }
  }
</script>


<style lang="less" scoped>
  @import '../../common/css/fontSize.less';
  @import '../../common/css/color.less';

  .musicList {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: #fff;

  .title {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;

    line-height: 2.5rem;
    color: #fff;

    .title-bg {
      height: 2.5rem;
    }

    .title-content {
      position: absolute;
      top: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 0 2%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .listInfo {
    position: fixed;
    top: 2.5rem;
    width: 100%;

    & > div {
      height: 100%;

      .main-bg {
        position: relative;
        height: 70vh;
        margin-top: -30vh;
        width: 106%;
        transform: translateX(-3%)
      }

      .info {
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        top: 7vh;
        width: 94%;
        left: 3%;

        .info-img {
          width: 40%;
          border-radius: 5px;
          position: relative;
          overflow: hidden;

          & > img {
            width: 100%;
          }
        }
        .info-message {
          width: 55%;
          text-align: left;
          display: flex;
          align-items: center;

          .mes-title {
            color: #fff;
            line-height: 1.5rem;
          }

          .creator {
            padding-top: 1rem;
            line-height: 2rem;

            & > img {
              display: inline-block;
              width: 2rem;
              height: 2rem;
              border-radius: 50%;
              vertical-align: bottom;
            }

            & > div:last-child {
              display: inline-block;
              margin-left: 5px;
              font-size: @normalSize;
              color: @themeGray;

              & > i {
                font-size: .5rem;
              }
            }
          }
        }
      }

      .choose {
        width: 100%;
        margin-top: 2vh;

        & > div {
          width: 90%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;

          .items {
            color: #fff;

            & > i {
              font-size: @oneSize + 0.2rem;
            }

            & > span {
              display: block;
              margin-top: 9px;
              font-size: @normalSize;
              color: @themeGray;
            }
          }
        }
      }
    }
  }

  .gif {
    width: 17px;
    height: 17px;
  }

  .audio {
    /*display: none;*/
  }
}

</style>
