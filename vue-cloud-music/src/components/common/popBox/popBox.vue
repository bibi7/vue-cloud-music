<template lang="html">
  <!--
    show置为block激活animation，animationEnd时display置为none
    fade与faded用于animation尚未结束时重新开始
  -->
  <div class="popBox" :class="[show ? 'show': '', fade ? 'fade' : 'faded']" @animationend="animationend" ref="popBox">
    <p>{{clickText}}</p>
  </div>
</template>

<script>
export default {
  name: 'popBox',
  data() {
    return {
      show: false,
      fade: true,
    }
  },
  props: {
    clickText: {
      type: String,
      default: 'some info',
    }
  },
  methods: {
    animationend() {
      this.show = false;
    }
  },
  watch: {
    clickText(newValue, oldValue) {
      if(this.$refs.popBox.classList.contains('fade')) {
        this.fade = false
      } else {
        this.fade = true
      }
      this.show = true;
    }
  },
}
</script>

<style lang="less" scoped>
  .popBox {
    position: fixed;
    border-radius: 10px;
    display: none;
    padding: 20px;
    top: 50%;
    left: 50%;
    opacity: .8;
    background-color: #000;
    transform: translate(-50%, -50%);

    p {
      font-size: .9rem;
      color: #fff;
    }

    &.fade {
      animation: fade 2s linear;
      animation-fill-mode: forwards;
    }

    &.faded {
      animation: faded 2s linear;
      animation-fill-mode: forwards;
    }

    &.show {
      display: block
    }

    @keyframes faded {
      0% {
        opacity: .8
      }
      50% {
        opacity: .8
      }
      80% {
        opacity: .5
      }
      100% {
        opacity: 0
      }
    }

    @keyframes fade {
      0% {
        opacity: .8
      }
      50% {
        opacity: .8
      }
      80% {
        opacity: .5
      }
      100% {
        opacity: 0
      }
    }
  }
</style>
