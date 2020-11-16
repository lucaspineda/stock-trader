import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/index.vue'
import Portfolio from '../components/portfolio/index.vue'
import Stocks from '../components/stocks/index.vue'
import Auth from '../components/auth/index.vue'


Vue.use(VueRouter)

const router =  new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/portfolio',
      component: Portfolio
    },
    {
      path: '/stocks',
      component: Stocks
    },
    {
      path: '/auth',
      component: Auth,
      meta: { noHeader: true }
    },
    ]
})

router.beforeEach((to, from, next) => {
  const loggedInLocalStorage = localStorage.getItem('loggedIn')
  let loggedIn = JSON.parse(loggedInLocalStorage)
  if (!loggedIn && to.path !== '/auth') {
    next('/auth')
  }
  else {
    next()
  }
})

export default router