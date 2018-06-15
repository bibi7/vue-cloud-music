import Vue from 'vue'
import Vuex from 'vuex'
import {PLAY_MUSIC, PLAY_NEXT, PLAY_PREV} from "./mutationType";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //正在播放的歌曲名称
    playingName: '',

    //正在播放的歌曲id
    playingId: '',

    //歌曲播放进度
    playProgress: '',

    //当前播放歌曲索引
    playingIndex: '',

    //当前播放的歌单列表
    playList: {},

    //背景图片
    playImg: '',

    //播放模式
    playMode: '',

    //歌曲总长度
    playTotalLength: '',

    //歌曲播放长度
    playCurrentLength: '',

  },
  mutations: {
    //****[播放音乐]****
    [PLAY_MUSIC] (state, obj) {
      state.playingId = obj.item.id;
      state.playingIndex = obj.index;
      state.playImg = obj.item.al.picUrl;
      state.playingName = obj.item.name;
      state.playList = obj.list;
      console.log(state.playingIndex)
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
    }
  }
});
