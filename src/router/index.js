// import Frame from '@/frame/frame.vue'

// 首页
import Main from '@/page/common/main.vue'
// 单词
import Words from '@/page/word/index.vue'
// 绘本
import PictureBooks from '@/page/picture_books/index.vue'
// 游戏
import Games from '@/page/games/index.vue'
// 404
import NotFound from '@/page/common/404.vue'

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
    path: '/words',
    component: Words,
    name: '记单词'
  },
  {
    path: '/picture_books',
    component: PictureBooks
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
