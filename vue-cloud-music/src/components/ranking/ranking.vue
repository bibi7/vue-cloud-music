<template>
  <div class="ranking" ref="ranking">
    <redHeader ref="header">
      <span>排行榜</span>
    </redHeader>
    <div class="container" ref="wrapper">
      <div>
        <div class="title">
          <span>云音乐官方榜</span>
        </div>
        <div>
          <div class="item" v-for="item in list" @click="goMusicList(item.id)">
            <div class="img">
              <img :src="item.imgUrl">
            </div>
            <div class="top">
              <div v-for="(items, index) in item.topThree">
                <span>{{index + 1}}. {{items.name}} - {{items.ar[0].name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import redHeader from '@/components/common/redHeader/redHeader.vue'
  import {getRanking} from '@/common/js/axiosType/getAxiosType.js'
  const rankRange = [0, 1, 2, 3, 4, 5, 6];

  export default {
    name: 'ranking',
    data () {
      return {
        list: []
      }
    },
    components: {
      redHeader
    },
    methods: {
      initList () {
        rankRange.forEach(item => {
          getRanking(item).then(result => {
            const item = {};
            item.imgUrl = result.data.playlist.coverImgUrl;
            item.topThree = result.data.playlist.tracks.slice(0, 3);
            item.id = result.data.playlist.id;
            this.list.push(item);
          })
        });
      },
      initWrapper () {
        const wrapper = this.$refs.wrapper;
        const header = this.$refs.header.$el.clientHeight;
        wrapper.style.height = `${this.$refs.ranking.clientHeight - header}px`;
        return new BScroll(this.$refs.wrapper, {
          scrollY: true,
          click: true,
        })
      },
      goMusicList (id) {
        this.$router.push({
          path: `/musicList/${id}`,
//          query: {
//            time: 0
//          }
        })
      }
    },
    mounted () {
      this.initList();
      this.initWrapper();
    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/css/fontSize.less';
  @import '../../common/css/color.less';
  .ranking {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 20;

    .container {
      position: relative;
      z-index: -1;
      width: 98%;
      margin-left: 2%;

      & > div {
        overflow: hidden;
      }

      .title {
        line-height: 3rem;
        text-align: left;
        font-weight: bold;
        color: @themeBlack;

        & + div {
          padding-top: 1px;
        }
      }

      .item {
        display: flex;
        margin-top: 5px;

        .img {
          width: 33%;

          & > img {
            display: block;
            width: 100%;
            border-radius: 5px;
          }
        }
        .top {
          box-sizing: border-box;
          width: 67%;
          padding: 10px 0 10px 10px;
          color: @themeGray;
          font-size: .8rem;
          display: flex;
          text-align: left;
          flex-direction: column;
          justify-content: space-around;
        }
      }
    }
  }
</style>
