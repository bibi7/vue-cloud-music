import Vue from 'vue'
import Router from 'vue-router'
import collection from '@/components/playList/collection.vue'
import playing from '@/components/playing/playing.vue'
import mainPart from '@/components/main/main.vue'
import recommend from '@/components/main/personalRecommend/recommend.vue'
import radio from '@/components/main/streamerRadio/radio.vue'
import musicList from '@/components/musicList/musicList.vue'
import homePageMusicList from '@/components/homePageMusicList/homePageMusicList.vue'
import listComment from '@/components/listComment/listComment.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/mainPart/recommend'
    },
    {
      path: '/mainPart',
      component: mainPart,
      children: [
        {
          path: 'recommend',
          component: recommend
        },
        {
          path: 'radio',
          component: radio
        }
      ]
    },
    {
      path: '/collection',
      component: collection
    },
    {
      path: '/playing/',
      component: playing
    },
    {
      path: '/musicList/:id',
      component: musicList,
    },
    {
      path: '/homePageMusicList',
      component: homePageMusicList
    },
    {
      path: '/listComment/:id',
      component: listComment
    }
  ]
})
