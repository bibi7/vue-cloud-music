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
        <comment :title="'热门评论'" :commentObject="hotComment"/>
        <comment :title="'最新评论'" :commentObject="newComment" v-on:wantMore="wantMore"/>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import redHeader from '@/components/common/redHeader/redHeader.vue'
  import comment from '@/components/common/comment/comment.vue'
  import {getSongSheetComment, getMusicComment} from '@/common/js/axiosType/getAxiosType.js'
  export default {
    name: 'listComment',
    data () {
      return {
        type: '',
        hotComment: [],
        newComment: []
      }
    },
    components: {
      redHeader,
      comment,
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
      wantMore(obj) {
        if (this.type === 'songSheet') {
          getSongSheetComment(this.id, obj.frequency).then(result => {
            this.newComment.push(...result.data.comments)
          })
        } else {
          getMusicComment(this.id, obj.frequency).then(result => {
            this.newComment.push(...result.data.comments)
          })
        }
      },
      getSongSheetComment (id) {
        getSongSheetComment(id).then(result => {
          this.hotComment = result.data.hotComments
          this.newComment = result.data.comments
          this.type = 'songSheet'
        })
      },
      getSongSingleComment (id) {
        getMusicComment(id).then(result => {
          this.hotComment = result.data.hotComments
          this.newComment = result.data.comments
          this.type = 'songSingle'
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
      goUser (id) {
        this.$router.push({
          path: `/userInfo/${id}`
        })
      },
    },
    mounted () {
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
    }

  }
</style>
