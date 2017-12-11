// import Frame from '@/frame/frame.vue'

// 首页
import MainHome from '@/page/common/main-home.vue'
import PictureBooks from '@/page/picture_books/index.vue'
import Games from '@/page/games/index.vue'

export default [
  {
    path: '/',
    component: MainHome
    // children: [
    //   {path: '', component: MainHome}
    // ]
  },
  {
    path: '/picture_books',
    component: PictureBooks
  },
  {
    path: '/games',
    component: Games
  }
]
