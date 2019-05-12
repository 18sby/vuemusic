import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index'
import Home from '../pages/home'
import Artists from '../pages/artists'
import Search from '../pages/search'
import HotList from '../pages/musiclist/hot_list'
import KingList from '../pages/musiclist/king_list'
import NewsList from '../pages/musiclist/news_list'
import MoreList from '../pages/morelist'
import MusicPlay from '../pages/musicplay'
import ArtistsDetails from '../pages/artistsDetails/artistsDetails'
import { type } from 'os';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/musicplay',
      name:'MusicPlay',
      component:MusicPlay
    },
    {
      path: '/',
      name: 'index',
      // 测试konva
      redirect:'home',
      // redirect:'/konva',
      component: Index,
      children:[
        {
          path:'home',
          component:Home,
          redirect:'home/hot_list',
          children:[
            {
              path:'hot_list',
              component:HotList
            },
            {
              path:'king_list',
              component:KingList
            },
            {
              path:'news_list',
              component:NewsList
            },
          ]
        },
        {
          path:'artists',
          component:Artists
        },
        {
          path:'search',
          component:Search
        },
        {
          path:'more',
          name:'MoreList',
          component:MoreList
        },
        {
          path:'artistsDetails',
          name:'artistsDetails',
          component:ArtistsDetails
        },
      ]
    },
    {
      path: '/konva',
      name: 'konva',
      component: () => import('@/pages/konva.vue')
    }
  ]
})
