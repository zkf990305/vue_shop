import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/User/Login/index.vue'
import Home from '../pages/Home/index.vue';
import Welcome from '../pages/Home/Welcome/index.vue'
import Users from '../pages/Home/Users/index.vue';
import Roles from "../pages/Home/Power/Roles/index.vue";
import Rights from "../pages/Home/Power/Rights/index.vue"
import GoodsCate from "../pages/Home/Goods/Cate/index.vue"
import GoodsList from "../pages/Home/Goods/List/index.vue"
import CateParams from "../pages/Home/Goods/Params/index.vue"
import AddGood from "../pages/Home/Goods/List/Add/index.vue"
import Orders from '../pages/Home/Goods/List/Order/index.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/rights',
        component: Rights
      }, {
        path: '/categories',
        component: GoodsCate
      }, {
        path: '/goods',
        component: GoodsList
      }, {
        path: '/goods/add',
        component: AddGood
      }, {
        path: '/params',
        component: CateParams
      }
    ]
  }
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]


const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行  next('/login') 强制跳转
  if (to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login')
  next()
})
export default router