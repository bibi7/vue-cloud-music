<template>
  <div class="homePageMusicList" ref="homePageMusicList">
    <redHeader ref="header">
      <span>歌单</span>
    </redHeader>
    <div class="wrapper" ref="wrapper">
      <div>
        <div ref="bg" class="bg"></div>
        <div class="title">
          <div class="title-info">
            <div class="coverImg">
              <img :src="titleImg">
            </div>
            <div>
              <div class="info-name">
                <i class="iconfont icon-pingjiaxingxing"></i>
                <span>精品歌单</span>
              </div>
              <div class="info-desc">
                <p>{{titleInfo}}</p>
                <p>{{titleShortInfo}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="li-container">
          <recommendTitle :name="'精品歌单列表'"></recommendTitle>
          <recommendList :type="'highQualityList'" :width="'48%'"></recommendList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import redHeader from '@/components/common/redHeader/redHeader.vue'
  import {getHighqualityList} from '@/common/js/axiosType/getAxiosType.js'
  import recommendTitle from '@/components/common/recommendTitle.vue'
  import recommendList from '@/components/common/recommendList.vue'
  export default {
    name: 'homePageMusicList',
    data () {
      return {
        titleImg: '',
        titleInfo: '',
        titleShortInfo: '',
      }
    },
    methods: {
      initData () {
        getHighqualityList().then(result => {
          console.log(result)
          this.titleImg = result.data.playlists[0].coverImgUrl
          this.titleInfo = result.data.playlists[0].name
          this.titleShortInfo = result.data.playlists[0].copywriter

          this.$refs.bg.style.background = `url(${this.titleImg}) center no-repeat`;
          this.$refs.bg.style.backgroundSize = 'cover';
          this.$refs.bg.style.filter = 'blur(8px)';
        })
      },
      initWrapper () {
        const wrapper = this.$refs.wrapper;
        wrapper.style.height = `${this.$refs.homePageMusicList.clientHeight - this.$refs.header.$el.clientHeight}px`;
        return new BScroll(this.$refs.wrapper, {
          scrollY: true,
          click: true,
        });
      }
    },
    components: {
      redHeader,
      recommendTitle,
      recommendList
    },
    mounted () {
      this.initData();
      this.initWrapper();
    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/css/color.less';
  @import '../../common/css/fontSize.less';

.homePageMusicList {
  position: fixed;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  .wrapper {
    position: relative;
    overflow: hidden;

    & > div:first-child {
      position: relative;

      .bg {
        position: absolute;
        width: 100%;
        margin-top: -45vh;
        height: 70vh;
        z-index: -1;
      }

      .title {
        position: relative;
        top: 0;
        color: #F5F5F5;
        display: flex;
        align-items: center;
        width: 96%;
        padding: 0 2%;
        height: 25vh;

        .title-info {
          display: flex;
          /*align-items: center;*/

          & > div:nth-child(2) {
            text-align: left;
            position: relative;
          }

          .info-name {
            font-size: 1.2rem;
            margin: 9px 0 10px 0;

            & > i {
              font-size: 1.3rem;
              color: #FDF679;
            }
          }

          .info-desc {
            position: absolute;
            top: 50%;
            transform: translateY(-28%);

            & > p:first-child {
              font-size: 1rem;
              margin-top: 5px;
              white-space: nowrap;
            }

            & > p:last-child {
              margin-top: 10px;
              font-size: 0.7rem;
              color: @themeGray;
            }
          }
          .coverImg {
            width: 32%;
            margin-right: 10px;
            border-radius: 5px;
            overflow: hidden;

            & > img {
              width: 100%;
            }
          }
        }
      }

      .li-container {
        width: 96%;
        padding: 0 2%;
        background-color: #fff;
      }
    }

  }
}

</style>
