import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: '/demo',
    name: 'demo',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/echartsEdit/demo')
    }
  },
  {
    path: '/demoAce',
    name: 'demoAce',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/echartsEdit/demoAce')
    }
  },
  {
    path: '/',
    name: 'echartsEdit',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/echartsEdit')
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
