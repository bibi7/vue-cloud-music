<template>
  <div class="mainList">
    <div v-for="(item, index) in info">
      <div class="people">
        <i class="iconfont icon-headset"></i>
        <span>{{item.playCount}}</span>
      </div>
      <img :src="item.picUrl">
      <span class="description">{{item.name}}</span>
    </div>
  </div>
</template>


<script>
  import {getRecommend} from '@/common/js/axiosType/getAxiosType.js'

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
      }
    },
    methods: {
      _initList () {
        if (this.type === 'recommend') {
          getRecommend().then(result => {
            console.log(result);
            result.data.result.forEach((item, index) => {
              if (index < 6) {
                //num: 听歌人数,考虑到小数点，进行分割
                let num = item.playCount.toString().split('.')[0];
                switch (num.length) {
                  case 6:
                    item.playCount = `${num.substring(0, 2)}万`;
                    break;
                  case 7:
                    item.playCount = `${num.substring(0, 3)}万`;
                    break;
                  case 8:
                    item.playCount = `${num.substring(0, 3)}万`;
                    break;
                  case 9:
                    item.playCount = `${num.substring(0, 1)}.${num.substring(1, 2)}亿`;
                    break;
                }
                this.info.push(item)
              }
            })
          });
        }
      }
    },
    mounted () {
      this._initList();
      console.log(this.info)
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
    width: 32%;
    padding-bottom: .5rem;
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
