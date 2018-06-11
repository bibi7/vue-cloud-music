<template>
  <div class="ban-sli" ref="banSli">
    <div class="slider" ref="slider">
      <div v-for="(item, index) in imgArray" class="slider-in" ref="sliders">
        <img :src="item.picUrl">
      </div>
    </div>
    <div class="dots">
      <div class="dots-in">
        <span v-for="(item, index) in imgArray" :class="{'active' : index === currentIndex}"></span>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import {getBanner} from '@/common/js/axiosType/getAxiosType.js';
export default {
  name: 'slider',
  data () {
    return {
      dots: [],
      imgArray: [],
      currentIndex: 0,
      interval: 4000,
    }
  },
  created () {
    this._getBanner()

  },
  mounted () {
    this._initWidth();
  },
  methods: {
    //获取banner信息
    _getBanner () {
      getBanner().then(result => {
        if (result.status === 200) {
          //获取banner图片地址
          let bannerPicArray = result.data.banners;
          bannerPicArray.forEach(item => this.imgArray.push(item));

          //获取banner数量
          this.bannerLength = result.data.banners.length;
        }
      })
    },
    _initWidth () {
      //初始化宽度
      let slider = document.querySelector('.slider');
      let singleWidth = slider.clientWidth;

      if (this.bannerLength) {
        clearInterval(this.findBannerLength);
        slider.style.width = singleWidth * (this.bannerLength + 2) + 'px';
        //设置每一个banner的宽度
        this.$refs.sliders.forEach(item => {
          item.style.width = singleWidth + 'px'
        });
        this._sliderInit();
      } else {
        this._checkWidth();
      }
    },
    //mounted阶段由于异步api的原因无法获取bannerLength，故用定时器hack一下
    _checkWidth () {
      this.findBannerLength = setInterval(() => {
        if (this.bannerLength) {
          this._initWidth()
        }
      }, 20);
    },
    //初始化滚动函数
    _sliderInit () {
      this.slider = new BScroll(this.$refs.banSli, {
        scrollX: true,  //横向滚动
//        momentum: true,
        snap: {
          loop: true,
          threshold: 0.3,
          speed: 400
        },
        snapSpeed: 400,
        bounce: false,
        stopPropagation: true,
        click: true
      });
      this.slider.on('beforeScrollStart', function () {
        console.log('scroll start!');
      });
      this.slider.on('scrollEnd', this.scrollEnd);
      this._play();
    },
    //无限滚动，四秒一次
    _play () {
      clearInterval(inter);
      let inter = setInterval(() => {
        this.slider.next()
      }, this.interval)
    },
    //滚动的同时更改底部红点
    scrollEnd () {
      let index = this.slider.getCurrentPage().pageX;
      this.currentIndex = index;
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../common/css/color.less';
@import '../../../common/css/common.less';
.ban-sli {
  position: relative;
}
.slider {
  position: relative;
  /*height: 25vh;*/
  overflow: hidden;

  .slider-in {
    float: left;
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.dots {
  position: absolute;
  width: 100%;
  bottom: .5em;

  .dots-in {
    text-align: center;
    & span {
      display: inline-block;
      margin: 0 2px;
      width: 6px;
      height: 6px;
      border-radius:50%;
      background-color: #898598;
      opacity: .5;
      cursor: pointer;
    }

    & span.active {
      background-color: @themeRed;
      opacity: 1;
    }
  }
}
</style>
