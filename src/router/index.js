import Frame from '@/frame/frame.vue'

// 首页
import Main from '@/page/common/main.vue'
// 单词
import LearnWords from '@/page/learn_word/index.vue'
// 绘本
import PictureBooksList from '@/page/picture_books/list.vue'
import PictureBooksDetails from '@/page/picture_books/details.vue'
// 游戏
import Games from '@/page/games/index.vue'
// 儿歌
import NurseryRhyme from '@/page/nursery_rhyme/index.vue'
// 404
import NotFound from '@/page/common/404.vue'
// finish
import Finish from '@/page/common/finish.vue'
export default [
  {
    path: '/',
    component: Main,
    name: '主页'
    // children: [
    //   {path: '', component: MainHome}
    // ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  {
    path: '/finish',
    component: Finish,
    name: 'finish',
    hidden: true
  },
  {
    path: '/learn_word',
    component: LearnWords,
    name: '记单词'
  },
  {
    path: '/nursery_rhyme',
    component: NurseryRhyme,
    name: '儿歌'
  },
  {
    path: '/picture_books',
    component: Frame,
    children: [
      {path: 'list', component: PictureBooksList},
      {path: 'details/:id', component: PictureBooksDetails}
    ]
  },
  {
    path: '/games',
    component: Games,
    name: '游戏'
  },
  {
    path: '*',
    hidden: true,
    redirect: {
      path: '/404'
    }
  }
]
