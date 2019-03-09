<template lang="html">
  <div class="lyric-base" :class="show? 'show': null" @click="hide">
    <div class="">
      this song's id is
      {{id}}
    </div>
    <div class="">
      css show is
      {{show}}
    </div>
  </div>
</template>

<script>
import { getSongLyric } from '@/common/js/axiosType/getAxiosType'
export default {
  name: 'lyric',
  props: {
    show: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    id: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  methods: {
    hide() {
      this.$emit('hide')
    }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
  .lyric-base {
    display: none;
    position: fixed;
    padding-top: 3rem;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &.show {
      display: block;
    }
  }
</style>
