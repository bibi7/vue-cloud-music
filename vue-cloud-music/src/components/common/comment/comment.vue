<template lang="html">
  <div class="h-comment" v-if="commentObject.length !== 0">
    <div class="h">
      <span>{{title}}</span>
    </div>
    <div class="h-content" v-for="(item, index) in commentObject">
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
            <div class="like"
                 :class="searchLike(item.commentId)"
                 @click="commentLike(item.commentId, $event, index)"
                 ref="likeRef">
              <i class="iconfont icon-dianzan"></i>
              <span>{{item.likedCount}}</span>
            </div>
          </div>
          <div class="content">
            <pre>{{item.content}}</pre>
            <div class="reply" v-if="item.beReplied[0]">
              <span @click="goUser(item.beReplied[0].user.userId)">@{{item.beReplied[0].user.nickname}}：</span>
              <span>{{item.beReplied[0].content}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span v-if="more != ''" class="more" @click="wantMore">{{more}}</span>
  </div>
</template>

<script>
import storageManager from '@/common/js/utils/utils'
export default {
  name: 'comment',
  data() {
    return {
      more: '',
      wantFrequency: 0,
    }
  },
  props: {
    title: {
      type: String,
      default: '默认评论'
    },
    commentObject: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  beforeMount() {
    if (this.title === '最新评论') {
      this.more = '查看更多...'
    }
  },
  methods: {
    commentLike(commentId, event, index) {
      return Promise.resolve().then(() => {
        // 尝试着用localStorage的方式，
        // 虽然是持久化了，
        // 但是还是store更方便。
        console.log('commentId' ,commentId);
        let commentLike = storageManager.getLocalStorage('commentLike')
        if (commentLike) {
          commentLike = JSON.parse(commentLike)
          const {
            likeList
          } = commentLike
          if (likeList.includes(commentId)) {
            const likeIndex = likeList.indexOf(commentId)
            likeList.splice(likeIndex, 1)
          } else {
            likeList.push(commentId)
          }
          storageManager.setLocalStorage('commentLike', commentLike)
          console.log('commentLike', commentLike);
        } else {
          storageManager.setLocalStorage('commentLike', {
            likeList: [
              commentId
            ]
          })
        }
      })
      .then(() => {
        this.searchLike(commentId, event, index)
      })
    },
    goUser (id) {
      this.$router.push({
        path: `/userInfo/${id}`
      })
    },
    searchLike(commentId, event, index) {
      let commentLike = storageManager.getLocalStorage('commentLike')
      if (commentLike) commentLike = JSON.parse(commentLike)
      if (event) {
        const dom = this.$refs.likeRef[index]
        if (commentLike.likeList.includes(commentId)) {
          dom.classList.add('active')
        } else {
          dom.classList.remove('active')
        }
      } else {
        if (commentLike.likeList.includes(commentId)) return 'active'
      }
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
    },
    wantMore() {
      this.wantFrequency++;
      console.log(this.wantFrequency * 20)
      this.$emit('wantMore', {frequency: this.wantFrequency * 20})
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../common/css/color.less';
@import '../../../common/css/fontSize.less';
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
            margin-top: 8px;
            font-size: .7rem;
            color: @themeGray;
          }

          .like {
            position: absolute;
            top: 0;
            right: 0;
            font-size: .8rem;
            color: @themeGray;

            &.active > i {
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

          .reply {
            border: 1px #DBDCDD solid;
            background-color: #FDFEFE;
            padding: 5px 10px;
            margin-top: 5px;
            font-size: .8rem;
            text-align: left;
            line-height: 1.6rem;

            & > span:first-child {
              color: #789BC1;
            }

            & > span:nth-child(2) {
              color: @themeGray;
            }
          }
        }
      }
    }
  }
  .more {
    display: block;
    padding: 1rem;
    color: #668EB9;
    font-size: .8rem;
  }
}
</style>
