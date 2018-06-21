import Vue from 'vue'
import Vuex from 'vuex'
import {PLAY_MUSIC, PLAY_NEXT, PLAY_PREV, PLAY_IRREGULAR, PLAY_MODE, UPDATE_CURRENTTIME, UPDATE_DURATION, PLAY, PAUSE, JUMP} from "./mutationType";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //正在播放的歌曲名称
    playingName: '',

    //正在播放的歌曲id
    playingId: '',

    //当前播放歌曲索引
    playingIndex: '',

    //当前播放的歌单列表
    playList: {},

    //背景图片
    playImg: '',

    //播放模式, 0顺序播放，1单曲循环，2随机播放
    playMode: 0,

    //歌曲当前长度
    currentTime: '',

    //歌曲总长度
    duration: '',

    unFixedTime: '',

    unFixedDuration: '',

    //歌曲地址
    playAddress: '',

    //是否正在播放
    isPlaying: false,

    jump: '',

  },
  mutations: {
    //****[播放音乐]****
    [PLAY_MUSIC] (state, obj) {
      if (state.playingId !== obj.item.id) {
        state.currentTime = '';
      }
      state.playingId = obj.item.id;
      state.playingIndex = obj.index;
      state.playImg = obj.item.al.picUrl;
      state.playingName = obj.item.name;
      state.playList = obj.list;
      state.isPlaying = true;
    },

    //****[上一首]****
    [PLAY_NEXT] (state) {
      let index = state.playingIndex;
      //如果歌单中有下一首
      if (state.playList[index + 1]) {
        index = index + 1;
      } else {
        index = 0;
      }
      state.playingIndex = index;
      state.playingId = state.playList[index].id;
      state.playImg = state.playList[index].al.picUrl;
      state.playingName = state.playList[index].name;
    },

    //****[下一首]****
    [PLAY_PREV] (state) {
      let index = state.playingIndex;
      //如果歌单中有上一首
      if (index === 0) {
        index = state.playList.length - 1;
      } else {
        index = index - 1;
      }
      state.playingIndex = index;
      state.playingId = state.playList[index].id;
      state.playImg = state.playList[index].al.picUrl;
      state.playingName = state.playList[index].name;
    },

    //****[更新进度]****
    [UPDATE_CURRENTTIME] (state, obj) {
      state.currentTime = obj.current;
      state.unFixedTime = obj.unFixedTime;
    },

    //****[更新歌曲总时间]****
    [UPDATE_DURATION] (state, obj) {
      state.duration = obj.duration;
      state.unFixedDuration = obj.unFixedDuration;
    },

    //****[播放]****
    [PLAY] (state) {
      state.isPlaying = true
    },

    //****[暂停]****
    [PAUSE] (state) {
      state.isPlaying = false
    },

    //****[歌曲跳跃]****
    [JUMP] (state, jump) {
      state.jump = jump
    },

    //随机播放
    [PLAY_IRREGULAR] (state) {
      const length = state.playList.length;
      const index = Math.round(Math.random() * length);
      state.playingIndex = index;
      state.playingId = state.playList[index].id;
      state.playImg = state.playList[index].al.picUrl;
      state.playingName = state.playList[index].name;
    },

    //更改播放模式
    [PLAY_MODE] (state, modeNumber) {
      state.playMode = modeNumber
    }
    //这个store还是存在了一些重复的代码，需要优化，做个mark
  }
});
