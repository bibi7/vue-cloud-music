<template lang="html">
  <div class="lyric-base" :class="show? 'show': null" @click="hide" ref="ly">
    <div v-if="this.lrcArray.length !== 0" class="lyric-text">
      <p v-for="(lyricItem, index) in lrcArray">
        {{lyricItem | removeTime}}
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
    }
  },
  computed: {
    id () {
      return this.$store.state.playingId;
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
  },
  methods: {
    hide(e) {
      this.$emit('hide', e)
    }
  },
  filters: {
    removeTime(str) {
      return str.replace(/\[\d+:\d+\.\d+\]/g, '')
    }
  },
  watch: {
    id(newId, oldId) {
      getSongLyric(this.id).then((result) => {
        console.log(result)
        if (result.data.lrc) {
          const split = '\n'
          this.lrc = result.data.lrc.lyric
          this.lrcArray = this.lrc.split(split)
          console.log('lrcArray', this.lrcArray);
        } else {
          this.lrc = '暂无歌词'
        }
      })
      console.log(`new is : ${newId}`)
      console.log(`old is : ${oldId}`)
      console.log(this.lrc);
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
      padding: .5rem 1rem;
      height: 100%;
      color: #fff;

      p {
        line-height: 2.5rem;
        color: #fff;
        opacity: .5;
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
