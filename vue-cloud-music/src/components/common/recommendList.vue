<template>
  <div class="mainList">
    <div v-for="(item, index) in info" :style="{width: width}">
      <div class="people" v-if="item.playCount">
        <i class="iconfont icon-headset"></i>
        <span>{{item.playCount}}</span>
      </div>
      <!--两个接口返回的格式不一致，推荐歌单的图片字段为picUrl，精品歌单的图片字段为coverImgUrl，组件复用的时候做一下hack-->
      <img :src="item.picUrl? item.picUrl: item.coverImgUrl" @click="getMusicList(item.id)">
      <span class="description">{{item.name}}</span>
    </div>
  </div>
</template>


<script>
  import {getRecommend, getNewMusic, getHighqualityList} from '@/common/js/axiosType/getAxiosType.js'

  export default {
    name: 'recommendList',
    data () {
      return {
        info: []
      }
    },
    props: {
      type: {
        type: String,
        default: '',
      },
      width: {
        type: String,
        default: ''
      }
    },
    methods: {
      //加载推荐歌单
      _initList () {
        if (this.type === 'recommend') {
          getRecommend().then(result => {
            console.log(result);
            result.data.result.forEach((item, index) => {
              this.fillItem(item, index, 9)
            })
          });
        } else if (this.type === 'highQualityList') {
          getHighqualityList().then(result => {
            result.data.playlists.forEach((item, index) => {
              if (index < 1) return;
              this.fillItem(item, index, 17)
            })
          })
        }
      },
      //歌单通用处理
      fillItem (item, index, limitNumber) {
        if (index < limitNumber) {
          //num: 听歌人数,考虑到小数点，进行分割
          let num = item.playCount.toString().split('.')[0];
          switch (num.length) {
            case 4:
              item.playCount = num;
              break;
            case 5:
              item.playCount = `${num.substring(0, 1)}万`;
              break;
            case 6:
              item.playCount = `${num.substring(0, 2)}万`;
              break;
            case 7:
              item.playCount = `${num.substring(0, 3)}万`;
              break;
            case 8:
              item.playCount = `${num.substring(0, 4)}万`;
              break;
            case 9:
              item.playCount = `${num.substring(0, 1)}.${num.substring(1, 2)}亿`;
              break;
          }
          this.info.push(item)
        }
      },
      //点击歌单
      getMusicList (id) {
        this.$router.push({
          path: `/musicList/${id}`
        })
      },
      //加载最新音乐
      _initNewMusic () {
        if (this.type === 'newMusic') {
          getNewMusic().then(result => console.log(result))
        }
      },
      //初始化宽度
//      _initWidth () {
//        if (this.column === 3) {
//          console.log(this.$refs.divs)
//          this.$refs.items.style.width = '30%'
//        }
//      }
    },
    mounted () {
      this._initList();
//      this._initWidth();
//      this._initNewMusic();
    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/css/fontSize.less';
  @import '../../common/css/color.less';
.mainList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    position: relative;
    border-radius: 5px;
    padding-bottom: 1rem;
    overflow: hidden;

    .people {
      position: absolute;
      top: .2rem;
      right: .5rem;
      color: #fff;
      font-size: @normalSize;
    }

    .description {
      display: block;
      text-align: left;
      padding-left: 2px;
      font-size: @normalSize;
      color: @themeBlack;
      line-height: 1rem;
    }

    & > img {
      width: 100%;
    }
  }
}
</style>
