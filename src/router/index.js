// import Frame from '@/frame/frame.vue'

// 首页
import MainHome from '@/page/common/main-home.vue'

export default [
  {
    path: '/',
    component: MainHome,
    children: [
      {path: '', component: MainHome}
    ]
  }
]
