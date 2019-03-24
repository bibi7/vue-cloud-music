<template lang="html">
  <div class="lyric-base" :class="show? 'show': null" @click="hide" ref="ly">
    <div v-if="this.lrcArray.length !== 0" class="lyric-text">
      <p v-for="(lyricItem, index) in lrcArray">
        {{lyricItem | removeTime}}
        <span>{{lyricItem | removeLyric}}</span>
      </p>
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
          this.lrcArray.forEach((item, index) => {
            return item.replace(/(\d+:\d+\.\d+)([\D+]+)/g, (match ,$1, $2) => {
              let time = $1.split(':');
              // time formatter with origin format 00:00.00
              let min = time[0]
              let sec = time[1]
              let total = 0
              if (min !== '00') {
                total = Number(min)*60
              }
              if (sec !== '00.00') {
                total += Number(sec)
              }
              console.log('test', total)
              this.totalTime.push(Number(total.toFixed(2)))
            })
          })
          console.log('nowTime', this.totalTime);
          console.log('nowLyric', this.totalLyric);
        } else {
          this.lrc = '暂无歌词'
        }
      })
    },
    unFixedTime(newC, oldC) {
      console.log(newC)
      //TODO too many traversal here
      this.totalTime.forEach(() => {

      })
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
      overflow: auto;
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

        &.active {
          opacity: 1;
        }
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
