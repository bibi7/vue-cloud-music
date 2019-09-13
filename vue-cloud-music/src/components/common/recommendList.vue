<template>
  <div class="mainList">
    <div v-for="(item, index) in info" :style="{width: width}" v-if="info.length !== 0">
      <div class="people" v-if="item.playCount">
        <i class="iconfont icon-headset"></i>
        <span>{{item.playCount}}</span>
      </div>
      <!--两个接口返回的格式不一致，推荐歌单的图片字段为picUrl，精品歌单的图片字段为coverImgUrl，组件复用的时候做一下hack-->
      <img v-lazy="item.picUrl? item.picUrl: item.coverImgUrl" @click="getMusicList(item.id)">
      <span class="description">{{item.name.length < 15? item.name : `${item.name.substring(0, 15)}...`}}</span>
    </div>
  </div>
</template>


<script>
  import {getRecommend, getNewMusic, getHighqualityList, newAlbum} from '@/common/js/axiosType/getAxiosType'
  import storageManager from '@/common/js/utils/storageUtils'
  export default {
    name: 'recommendList',
    data () {
      return {
        info: [],
//        albums: []
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
      //加载首页推荐歌单，一般首页歌单不经常变动，做个小尝试，缓存local半小时
      _initList (cacheObj) {
        if (this.type === 'recommend') {
          if (cacheObj !== null) {
            cacheObj = JSON.parse(cacheObj)
            cacheObj.data.result.forEach((item, index) => {
                this.fillItem(item, index, 21)
              })
          } else {
            getRecommend().then(result => {
              storageManager.setLocalStorage(this.type, result, '30m')
              result.data.result.forEach((item, index) => {
                this.fillItem(item, index, 21)
              })
            });
          }
        } else if (this.type === 'highQualityList') {
          storageManager.setLocalStorage(this.type, result, '30m')
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
    },
    mounted () {
      const listCache = storageManager.getLocalStorage(this.type)
      this._initList(listCache);
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
      // display:-webkit-box;
      text-align: left;
      padding-left: 2px;
      font-size: @normalSize;
      color: @themeBlack;
      line-height: 1.2rem;
      // text-overflow: ellipsis;
      // -webkit-line-clamp:2;
      // -webkit-box-orient:vertical;
      // overflow: hidden;
    }

    & > img {
      width: 100%;
      animation: imgShow .25s linear
    }
  }
}

@keyframes imgShow {
  0% {
    opacity: 0
  }
  80% {
    opacity: 1
  }
}
</style>
