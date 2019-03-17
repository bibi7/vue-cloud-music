<template lang="html">
  <div class="lyric-base" :class="show? 'show': null" @click="hide" ref="ly">
    <div class="lyric-text">
      
      {{lrc}}
    </div>
  </div>
</template>

<script>
import { getSongLyric } from '@/common/js/axiosType/getAxiosType'
export default {
  name: 'lyric',
  data() {
    return {
      lrc: ''
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
  methods: {
    hide(e) {
      this.$emit('hide', e)
    }
  },
  watch: {
    id(newId, oldId) {
      getSongLyric(this.id).then((result) => {
        console.log(result)
        if (result.data.lrc) {
          this.lrc = result.data.lrc.lyric
        } else {
          this.lrc = '暂无歌词'
        }
      })
      console.log(`new is : ${newId}`)
      console.log(`old is : ${oldId}`)
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

    .lyric-text {
      height: 100%;
      color: #fff;
    }

    &.show {
      display: block;
    }
  }
</style>
