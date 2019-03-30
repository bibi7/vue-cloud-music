<template lang="html">
  <div class="lyric-base" :class="show? 'show': null" @click="hide" ref="ly">
    <div v-if="this.lrcArray.length !== 0" class="lyric-text">
      <div ref="lyIn" class="lyin">
        <p v-for="(lyricItem, index) in lrcArray" :class="activeItem === index ? 'activeItem' : null">
          {{lyricItem | removeTime}}
          <!-- <span>{{lyricItem | removeLyric}}</span> -->
        </p>
      </div>
    </div>
    <div v-else class="no-lyric">
      <p>{{lrc}}</p>
    </div>
  </div>
</template>

<script>
import { getSongLyric } from '@/common/js/axiosType/getAxiosType'
import '../../common/css/common.less'
export default {
  name: 'lyric',
  data() {
    return {
      lrc: '',
      middleHeight: '',
      cHeight: 0,
      sHeight: 0,
      isForEaching: false,
      activeItem: 0,
      lrcArray: [],
      totalTime: [],
      totalLyric: [],
    }
  },
  computed: {
    id () {
      return this.$store.state.playingId;
    },
    // 当前进度
    current() {
      return this.$store.state.current;
    },
    // 总长度
    unFixedDuration () {
      return this.$store.state.unFixedDuration;
    },
    unFixedTime() {
      return this.$store.state.unFixedTime;
    }
  },
  props: {
    show: {
      type: Boolean,
      default: () => {
        return false
      }
    },
  },
  mounted() {
    this.middleHeight = this.$refs.ly.clientHeight / 2;
    console.log('body.clientHeight',document.body.clientHeight)
  },
  methods: {
    hide(e) {
      this.$emit('hide', e)
    }
  },
  filters: {
    removeTime(str) {
      return str.replace(/\[\d+:\d+\.\d+\]/g, '')
    },
    removeLyric(str) {
      return str.replace(/(\[\d+:\d+\.\d+\])([\D+]+)/g, (match ,$1, $2) => {
        return $1
      })
    }
  },
  watch: {
    id(newId, oldId) {
      getSongLyric(this.id).then((result) => {
        if (result.data.lrc) {
          const split = '\n'
          this.lrc = result.data.lrc.lyric
          this.lrcArray = this.lrc.split(split)
          this.totalLyric = this.lrcArray.map((item, index) => {
            return item.replace(/\[\d+:\d+\.\d+\]/g, '')
          })
          this.totalTime = [];
          this.lrcArray.forEach((item, index) => {
            if (/(\d+:\d+\.\d+)([\D+]+)/g.test(item)) {
              return item.replace(/(\d+:\d+\.\d+)([\D+]+)/g, (match ,$1, $2) => {
                let time = $1.split(':');
                // time formatter with origin format 00:00.00
                if (time.length > 0) {
                  let min = time[0]
                  let sec = time[1]
                  let total = 0
                  if (min !== '00') {
                    total = Number(min)*60
                  }
                  if (sec !== '00.00') {
                    total += Number(sec)
                  }
                  this.totalTime.push(Number(total.toFixed(2)))
                }
              })
            } else {
              this.totalTime.push(null)
            }
          })
          console.log('nowTime', this.totalTime);
          console.log('nowLyric', this.totalLyric);
        } else {
          this.lrc = '暂无歌词'
        }
      }).then(() => {
        this.sHeight = 0;
        this.cHeight = 0;
        this.activeItem = null;
        this.$refs.lyIn.style.transform = `translateY(0px)`
        console.log('updated transform is =>' ,this.$refs.lyIn.style.transform);
      })
    },
    unFixedTime(newC, oldC) {
      if (this.isForEaching) {
        return
      } else {
        // TODO too many traversal here
        for (let i = 0; i < this.totalTime.length; i++) {
          this.isForEaching = true
          if (this.totalTime[i] !== null && newC > this.totalTime[i]) {
            this.activeItem = i
          }
        }
        this.isForEaching = false
      }
    },
    activeItem(newActive, oldActive) {
      // always got the previous activeItem DOM
      // so setTimeout to let this functiin into microtask to avoid it
      setTimeout(() => {
        const item = document.getElementsByClassName('activeItem')[0]
        if (item) {
          const marginTop = item.offsetTop;
          const scrollTop = item.scrollTop;
          this.cHeight = marginTop - scrollTop;
          if (this.cHeight > this.middleHeight) {
            this.sHeight = this.cHeight - this.middleHeight
            console.log('scroll height =>', this.sHeight)
            this.$refs.lyIn.style.transform = `translateY(-${this.sHeight}px)`
          }
        }
      }, 0)
    }
  }
}
</script>

<style lang="less" scoped>
  .lyric-base {
    display: none;
    height: 100%;
    z-index: 10;
    transition: all .3s linear;
    animation: fade10 .3s linear;

    .lyric-text {
      overflow: hidden;
      padding: .5rem 1rem;
      height: 100%;
      color: #fff;

      p {
        line-height: 2.5rem;
        color: #fff;
        opacity: .5;

        span {
          display: none;
        }

        &.activeItem {
          opacity: 1;
        }
      }

      .lyin {
        transition: all .3s linear;
      }
    }

    .no-lyric {
      height: 100%;
      color: #fff;
      opacity: .7;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &.show {
      display: block;
    }
  }
</style>
