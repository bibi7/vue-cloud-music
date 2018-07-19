<template>
  <div class="user" ref="user">
    <div ref="wrapper" class="wrapper">
      <div>
        <div class="main-info" ref="main">
          <div class="bg" ref="bg"></div>
          <div class="info-container">
            <div>
              <div class="top">
                <div class="top-l">
                  <img :src="userImg">
                </div>
                <div class="top-r">
                  <div>
                    <span>+关注</span>
                  </div>
                </div>
              </div>
              <div class="under">
                <div class="userName">
                  <p>{{userName}}</p>
                </div>
                <div class="follow">
                  <span>关注 {{following}}</span>
                  <span></span>
                  <span>粉丝 {{followers}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="listen-info">
          <div class="top">
            <div>
              <div class="in" v-for="tab in tabs"
                   @click="currentTab = tab.en">
                <span :class="{active: currentTab === tab.en}">
                  {{tab.name}}
                </span>
                <span v-if="tab.name === '音乐'" class="count">{{playlistCount}}</span>
              </div>
            </div>
          </div>
          <component :is="currentTab" :aboutInfo="aboutInfo" :songList="songList" @updateScroll="initWrapper"></component>
        </div>
      </div>
    </div>
    <redHeader :transparent="true" :fixed="true" ref="header">
      <span>{{userName}}</span>
    </redHeader>
    <loading :class="{hide: !hide, none: isLoadingDone}"></loading>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import redHeader from '@/components/common/redHeader/redHeader.vue'
  import {getUserDetail} from '@/common/js/axiosType/getAxiosType.js'
  import userSongList from '@/components/userInfo/userSongList.vue'
  import userAbout from '@/components/userInfo/userAbout.vue'
  import loading from '@/components/common/loading/loading.vue'
  export default {
    name: 'userInfo',
    data () {
      return {
        userName: '',
        backgroundImg: '',
        userImg: '',
        following: '',
        followers: '',
        located: '',
        playlistCount: '',
        scrollY: 0,
        tabs: [
          {
          name: '音乐',
          en: 'userSongList'
          },{
          name: '关于TA',
          en: 'userAbout'
          }
        ],
        currentTab: 'userSongList',
        aboutInfo: {},
        songList: {
          //songList传递空对象给props后，子组件无法第一时间更新数据，需要事先在对象中初始化。
          //之所以aboutInfo不用初始化是因为默认显示songList，等到切换aboutInfo相当于组件重载了一次，所传递的对象已经是数据填充好了的对象。
          userId: 0,
          playlistCount: 0,
          playlistBeSubscribedCount: 0,
        },
        isLoadingDone: false,
        hide: true,
      }
    },
    computed: {
      userId () {
        return this.$route.params.userId
      }
    },
    components: {
      redHeader,
      userSongList,
      userAbout,
      loading,
    },
    methods: {
      initInfo (id) {
        getUserDetail(id).then(result => {
          console.log(result);
          const data = result.data.profile;
          this.userName = data.nickname;
          this.backgroundImg = data.backgroundUrl;
          this.userImg = data.avatarUrl;
          this.following = data.follows;
          this.followers = data.followeds;
          this.playlistCount = data.playlistCount;
          this.aboutInfo.level = result.data.level;
          this.aboutInfo.signature = data.signature;
          this.checkGender(data.gender);
          this.checkBirthday(data.birthday);
          this.checkRegion(data.city);
          this.songList.playlistCount = data.playlistCount;
          this.songList.playlistBeSubscribedCount = data.playlistBeSubscribedCount;
          this.songList.userId = data.userId;
        })
        .then(() => {
          this.initBackground()
        })
        .then(setTimeout(() => {
            this.hide = false
          }, 300))
        .then(setTimeout(() => {
          this.isLoadingDone = true
        }, 500))
      },
      initBackground () {
        this.$refs.bg.style.background = `url(${this.backgroundImg})`
      },
      checkGender (gender) {
        if (gender === 1) {
          this.aboutInfo.gender = '男';
          return;
        }
        this.aboutInfo.gender = '女'
      },
      onScroll (pos) {
        if (pos.y < 0) {
          this.scrollY = pos.y
        }
      },
      checkBirthday(birthday) {
        const year = new Date(birthday).getFullYear();
        console.log(year);
        if (year < 2000) {
          if (year < 2000 && year >= 1990) {
            return this.aboutInfo.age = '90后'
          }
          if (year < 1990 && year >= 1980) {
            return this.aboutInfo.age = '80后'
          }
          if (year < 1980 && year >= 1970) {
            return this.aboutInfo.age = '70后'
          }
          //应该特么不会还有50后吧
          if (year < 1970 && year >= 1960) {
            return this.aboutInfo.age = '60后'
          }
        }
        return this.aboutInfo.age = '00后'
      },
      //这个函数也太长了！！！！！
      checkRegion (region) {
        console.log(region);
        const regionNumber = region.toString().substring(0, 3);
        switch (regionNumber) {
          case '110':
            this.aboutInfo.region = '北京';
            break;
          case '120':
            this.aboutInfo.region = '天津';
            break;
          case '130':
            this.aboutInfo.region = '河北';
            break;
          case '140':
            this.aboutInfo.region = '山西';
            break;
          case '150':
            this.aboutInfo.region = '内蒙古';
            break;
          case '210':
            this.aboutInfo.region = '辽宁';
            break;
          case '220':
            this.aboutInfo.region = '吉林';
            break;
          case '230':
            this.aboutInfo.region = '黑龙江';
            break;
          case '310':
            this.aboutInfo.region = '上海';
            break;
          case '320':
            this.aboutInfo.region = '江苏';
            break;
          case '330':
            this.aboutInfo.region = '浙江';
            break;
          case '340':
            this.aboutInfo.region = '安徽';
            break;
          case '350':
            this.aboutInfo.region = '福建';
            break;
          case '360':
            this.aboutInfo.region = '江西';
            break;
          case '370':
            this.aboutInfo.region = '山东';
            break;
          case '410':
            this.aboutInfo.region = '河南';
            break;
          case '420':
            this.aboutInfo.region = '湖北';
            break;
          case '430':
            this.aboutInfo.region = '湖南';
            break;
          case '440':
            this.aboutInfo.region = '广东';
            break;
          case '450':
            this.aboutInfo.region = '广西';
            break;
          case '460':
            this.aboutInfo.region = '海南';
            break;
          case '500':
            this.aboutInfo.region = '重庆';
            break;
          case '510':
            this.aboutInfo.region = '四川';
            break;
          case '520':
            this.aboutInfo.region = '贵州';
            break;
          case '530':
            this.aboutInfo.region = '云南';
            break;
          case '540':
            this.aboutInfo.region = '西藏';
            break;
          case '610':
            this.aboutInfo.region = '陕西';
            break;
          case '620':
            this.aboutInfo.region = '甘肃';
            break;
          case '630':
            this.aboutInfo.region = '青海';
            break;
          case '640':
            this.aboutInfo.region = '宁夏';
            break;
          case '650':
            this.aboutInfo.region = '新疆';
            break;
          case '710':
            this.aboutInfo.region = '台湾';
            break;
          case '810':
            this.aboutInfo.region = '香港';
            break;
          case '910':
            this.aboutInfo.region = '澳门';
            break;
          default:
            this.aboutInfo.region = '海外';
            break;
        }
      },
      initWrapper () {
        console.log(this.$refs.wrapper.clientHeight) //依旧无法明白这里的高度，需要setTimeout一下才是真正高度
        setTimeout(() => {
          console.log(this.$refs.wrapper.clientHeight)
          const v =  new BScroll(this.$refs.user, {
            scrollY: true,
            click: true,
            probeType: 3
          });

          v.on('scroll', this.onScroll)
        }, 300)
      },
    },
    mounted () {
      setTimeout(this.initInfo(this.userId), 150);
//      this.initWrapper();
    },
    watch: {
        scrollY () {
        const bgHeight = this.$refs.bg.clientHeight;
        const realHeight = (bgHeight / 7) * 4;
        const value = (Math.abs(this.scrollY) - 40) / realHeight;
        if (value < 1) {
          this.$refs.header.$el.style.backgroundColor = `rgba(212, 68, 57, ${value})`
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/css/fontSize.less';
  @import '../../common/css/color.less';
  .user {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: #fff;

    .wrapper {
      position: relative;
      z-index: -1;
    }

    .main-info {
      position: relative;
      height: 40vh;
      /*margin-top: -2.5rem;*/
      z-index: -1;

      .bg {
        position: absolute;
        width: 100%;
        margin-top: -30vh;
        height: 70vh;
        background-size: cover!important;
        z-index: -1;
      }

      .info-container {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding-top: 2.5rem;

        & > div {
          padding: 0 1rem;
          width: 100%;

          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .top-l {
              width: 24%;

              & > img {
                display: block;
                border-radius: 50%;
                width: 100%;
              }
            }

            .top-r {
              width: 80px;
              line-height: 2rem;
              border-radius: 5px;
              background: linear-gradient(to right, #FE594A, #D43B31);

              & span {
                color: #fff;
                font-size: .8rem;
                display: block;
                width: 100%;
                letter-spacing: 5px;
              }
            }
          }
          .under {
            margin-top: 1rem;

            .userName {
              color: #fff;
              text-align: left;
              font-size: 1.4rem;
            }

            .follow {
              color: #CDCDCE;
              display: flex;
              font-size: .8rem;

              & > span {
                line-height: 2rem;
              }

              & > span:nth-child(2) {
                position: relative;
                margin: 0 10px;

                &::after {
                  position: absolute;
                  top: 50%;
                  left: 0;
                  transform: translateY(-50%);
                  content: '';
                  display: block;
                  width: 1px;
                  height: 12px;
                  background-color: @themeGray;
                }
              }
            }
          }
        }
      }
    }
    .listen-info {
      position: relative;
      margin-top: -10px;
      background-color: #fff;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;

      .top {
        color: @themeBlack;
        border-bottom: 1px #EBECF7 solid;


        & > div {
          display: flex;
          justify-content: space-around;

          .in {
            & > span {
              display: inline-block;
              position: relative;
              line-height: 2.5rem;

              &.active {
                color: @themeRed;

                &::after {
                  content: '';
                  display: block;
                  position: absolute;
                  bottom: 4px;
                  left: 50%;
                  transform: translateX(-50%);
                  height: 3px;
                  width: 25px;
                  border-radius: 5px;
                  background-color: @themeRed;
                }
              }
            }

            .count {
              color: @themeGray;
              font-size: .6rem;
            }
          }
        }
      }
    }
  }
</style>
