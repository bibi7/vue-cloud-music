import Vue from 'vue'
import Vuex from 'vuex'
import {PLAY_MUSIC} from "./mutationType";

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
    playMode: ''
  },
  mutations: {
    [PLAY_MUSIC] (state, obj) {
      state.playingId = obj.item.id;
      state.playingIndex = obj.index;
      state.playImg = obj.item.al.picUrl;
      state.playingName = obj.item.name;
      state.playList = obj.list;
    }
  }
});
