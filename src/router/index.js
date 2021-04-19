import Vue from 'vue'
import VueRouter from 'vue-router'

import detail from './detail'
import charts from './charts'
import account from './account';

Vue.use(VueRouter)

const routes = [
  ...detail,
  ...charts,
  ...account, {
    path: '/',
    redirect: '/detail',
  }, {
    path: '/book',
    name: 'book',
    component: () => import('../pages/book/index.vue'),
  }, {
    path: '/descriptor',
    name: 'descriptor',
    component: () => import('../pages/descriptor.vue'),
    props: true,
  }, {
    path: '/modify',
    name: 'modify',
    component: () => import('../pages/modify/index.vue')
  }, {
    // 用户模块: 登录 注册 都是用一个组件
    path: '/login',
    name: 'login',
    component: () => import('../pages/user/index.vue'),
    meta: { login: true }
  }, {
    path: '*',
    name: 'no-found',
    component: () => import('../pages/page404.vue')
  }]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  // 在进入路由之前对用户是否登录进行校验
  if (to.path !== '/login') {
    const id = localStorage.getItem('uid')
    if (id) {
      next()
    } else {
      next({
        path: '/login',
      })
    }
  } else {
    next()
  }
})

export default router
