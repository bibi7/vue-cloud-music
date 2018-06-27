<template>
  <div class="comment" ref="comment">
    <redHeader ref="header">
      <span>评论</span>
    </redHeader>
    <div class="wrapper" ref="wrapper">
      <div>
        <div class="info">
          <div>
            <div class="img">
              <img :src="imgUrl">
            </div>
            <div class="list-info">
              <div>
                <span class="isSongSheet" v-if="isSongSheet">歌单</span>
                <span>{{name.length > 12? `${name.substring(0, 12)}...` : name}}</span>
              </div>
              <span class="by">by</span>
              <span class="nick-name" v-if="nickName">{{nickName}}</span>
              <span class="nick-name" v-if="singerName">{{singerName}}</span>
            </div>
          </div>
        </div>
        <div class="h-comment">
          <div class="h">
            <span>精彩评论</span>
          </div>
          <div class="h-content" v-for="(item, index) in hotComment">
            <div>
              <div class="l">
                <div>
                  <img :src="item.user.avatarUrl">
                  <i class="iconfont icon-pingjiaxingxing"></i>
                </div>
              </div>
              <div class="r">
                <div class="r-title">
                  <p>{{item.user.nickname}}</p>
                  <span v-if="item.user.nickname === nickName">(作者)</span>
                  <span>{{getTime(item.time)}}</span>
                  <div class="like">
                    <i class="iconfont icon-dianzan-choose"></i>
                    <span>{{item.likedCount}}</span>
                  </div>
                </div>
                <div class="content">
                  <pre>{{item.content}}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-comment">
          <div class="h">
            <span>最新评论</span>
          </div>
          <div class="h-content" v-for="(item, index) in newComment">
            <div>
              <div class="l">
                <div>
                  <img :src="item.user.avatarUrl">
                </div>
              </div>
              <div class="r">
                <div class="r-title">
                  <p>{{item.user.nickname}}</p>
                  <span>{{getTime(item.time)}}</span>
                  <div class="like">
                    <i class="iconfont icon-dianzan"></i>
                    <span>{{item.likedCount}}</span>
                  </div>
                </div>
                <div class="content">
                  <pre>{{item.content}}</pre>
                </div>
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
  import {getSongSheetComment, getMusicComment} from '@/common/js/axiosType/getAxiosType.js'
  export default {
    name: 'listComment',
    data () {
      return {
        hotComment: [],
        newComment: []
      }
    },
    components: {
      redHeader,
    },
    computed: {
      id () {
        return this.$route.params.id
      },
      imgUrl () {
        return this.$route.query.img
      },
      name () {
        return this.$route.query.name
      },
      nickName () {
        return this.$route.query.nickName
      },
      singerName () {
        return this.$route.query.singerName
      },
      isSongSheet () {
        return this.$route.query.songSheet
      },
      isSongSingle () {
        return this.$route.query.songSingle
      }
    },
    methods: {
      getSongSheetComment (id) {
        getSongSheetComment(id).then(result => {
          console.log(result);
          this.hotComment = result.data.hotComments
          this.newComment = result.data.comments
        })
      },
      getSongSingleComment (id) {
        getMusicComment(id).then(result => {
          console.log(result)
          this.hotComment = result.data.hotComments
          this.newComment = result.data.comments
        })
      },
      initWrapper () {
        const wrapper = this.$refs.wrapper;
        wrapper.style.height = `${this.$refs.comment.clientHeight - this.$refs.header.$el.clientHeight}px`;
        return new BScroll(this.$refs.wrapper, {
          scrollY: true,
          click: true,
        });
      },
      getTime(num) {
        let commentTime;
        const now = new Date();
        const thatTime = new Date(num);
        const hour = thatTime.getHours();
        let min = thatTime.getMinutes();
        const day = thatTime.getDate();
        const month = thatTime.getMonth();
        const year = thatTime.getFullYear();
        if (min < 10) {
          min = `0${min}`
        }
        //跨年评论
        if (now.getTime() - num > 259200000 && now.getFullYear() !== thatTime.getFullYear()) {
          commentTime = `${year}年${month + 1}月${day}日`
        }
        //本年评论
        if (now.getTime() - num > 259200000 && now.getFullYear() === thatTime.getFullYear()) {
          commentTime = `${month + 1}月${day}日`
        }
        //前天的评论
        if (now.getTime() - num < 259200000) {
          commentTime = `前天 ${hour}:${min}`
        }
        //昨天的评论
        if (now.getTime() - num < 172800000) {
          commentTime = `昨天 ${hour}:${min}`
        }
        //今天内的评论
        if (now.getDate() === thatTime.getDate() && now.getTime() - num < 86400000) {
          commentTime = `${hour}:${min}`
        }
        //一小时前的评论
        if(now.getTime() - num < 3600000) {
          let before = Math.round((now.getTime() - num) / 60000);
          if (before === 0) {
            commentTime = '刚刚'
            return commentTime
          }
          commentTime = `${before}分钟前`
        }
        return commentTime
      }
    },
    mounted () {
      console.log(this.id);
      console.log(this.$route.query);
      if (this.isSongSheet) {
        this.getSongSheetComment(this.id);
      }
      if (this.isSongSingle) {
        this.getSongSingleComment(this.id)
      }
      this.initWrapper();
    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/css/color.less';
  @import '../../common/css/fontSize.less';
  .comment {
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

      .info {
        width: 96%;
        padding: 0 2%;

        & > div {
          display: flex;
          align-items: center;
          padding: 12px 0;
          text-align: left;

          .img {
            width: 22%;

            & > img {
              display: block;
              border-radius: 5px;
              width: 100%;
            }
          }
          .list-info {
            margin-left: 10px;

            & > div:first-child {
              margin-bottom: 8px;
            }

            .isSongSheet {
              display: inline-block;
              padding: 2px;
              color: @themeRed;
              border: 1px @themeRed solid;
              font-size: .7rem;
            }

            .by {
              color: @themeGray;
              font-size: .7rem;
            }
            .nick-name {
              color: #668EB9;
              font-size: .8rem;
            }
          }
        }
      }

      .h-comment {
        .h {
          width: 96%;
          padding: 0 2%;
          text-align: left;
          background-color: #EEEFF0;
          color: @themeBlack;
          font-size: .8rem;
          line-height: 1.7rem;
        }

        .h-content {
          width: 96%;
          padding: 0 2%;

          & > div {
            padding-top: 10px;
            display: flex;

            .l {
              width: 13.5%;

              & > div {
                position: relative;
                width: 75%;
                margin: 0 auto;

                & > img {
                  display: block;
                  border-radius: 50%;
                  width: 100%;
                }

                & > i {
                  position: absolute;
                  bottom: 0;
                  right: -3px;
                  font-size: .9rem;
                  color: #FDF679;
                }
              }

            }
            .r {
              width: 86.5%;

              .r-title {
                position: relative;
                padding-top: 4px;
                text-align: left;

                & > p {
                  font-size: .8rem;
                  color: @themeBlack;
                }

                & > span {
                  display: inline-block;
                  margin-top: 4px;
                  font-size: .7rem;
                  color: @themeGray;
                }

                .like {
                  position: absolute;
                  top: 0;
                  right: 0;
                  font-size: .8rem;
                  color: @themeGray;

                  & > i.active {
                    color: @themeRed;
                  }
                }
              }

              .content {
                padding: 15px 0;
                border-bottom: 1px #F4F5F6 solid;

                & > pre {
                  white-space: pre-wrap;
                  line-height: 1.6rem;
                  font-size: .8rem;
                  text-align: left;
                  color: @themeBlack;
                }
              }
            }
          }
        }
      }
    }

  }
</style>
