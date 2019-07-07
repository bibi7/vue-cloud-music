<template>
  <div class="loading" :class="isLoadingDone ? 'hide' : ''">
    <div>
      <img src="../../../common/img/playing_red.gif" class="gif">
      <span>{{show}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    props: {
      isLoadingDone: {
        type: Boolean,
        defualt: function () {
          return {}
        }
      }
    },
    data () {
      return {
        desc: [
          '机甲强冷却中，移往舰载口...',
          '主舰炮过热，需要重载...',
          '等我打完这场仗就回家跟你结婚',
          '警告，我们未能穿透敌方装甲！',
          '人间不值得',
          '你看什么看呢你看看看看',
          '剑来！',
          '三秒后给你变个魔术',
          '我这人最讨厌两点，第一不会数数的人'
        ],
        show: ''
      }
    },
    methods: {
      switchInfo () {
        const index = Math.floor(Math.random() * this.desc.length);
        this.show = this.desc[index]
      }
    },
    created() {
      this.switchInfo()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../common/css/color.less';
  .loading {
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    color: @themeRed;

    &.none {
      display: none;
    }

    &.hide {
      display: none;
      animation: hide .2s cubic-bezier(0.21, 0.95, 1, 1.06);
      animation-fill-mode: forwards;
    }

    & > div {
      display: flex;
      width: 100%;
      height: 100%;
      font-size: 0.8rem;
      align-items: center;
      justify-content: center;
      animation: loading .2s cubic-bezier(0.21, 0.95, 1, 1.06);

      .gif {
        width: 18px;
        height: 18px;
        margin-right: 8px;
      }
    }
  }

  @keyframes loading {
    0% {
      opacity: .3;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes hide {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
</style>
