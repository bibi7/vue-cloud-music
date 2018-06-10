import Vue from 'vue'
import Router from 'vue-router'
import playList from '@/components/playList/playList.vue'
import playing from '@/components/playing/playing.vue'
import mainPart from '@/components/main/main.vue'
import recommend from '@/components/main/personalRecommend/recommend.vue'
import radio from '@/components/main/streamerRadio/radio.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/mainPart'
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
      path: '/playList',
      component: playList
    },
    {
      path: '/playing',
      component: playing
    }
  ]
})
