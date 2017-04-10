import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import DashboardOverview from '@/components/Dashboard_Overview'
import DashboardTransactions from '@/components/Dashboard_Transactions'

import environments from '@/helpers/environments'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      },
      beforeEnter: (to, from, next) => {
        if (environments.authenticated()) {
          next()
        } else {
          console.log('not authenticated, redirecting')
          next('/login')
        }
      },
      children: [
        {
          path: 'transactions',
          name: 'transactions',
          component: DashboardTransactions
        },
        {
          path: 'overview',
          name: 'overview',
          component: DashboardOverview
        }
      ]
    },
    {
      path: '*',
      redirect: 'login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('going to: ', to)
  if (to.meta.requiresAuth) {
    console.log('authenticated: ', environments.authenticated())
    if (!environments.authenticated()) {
      next('/login')
    } else {
      next()
    }
  }
  if (to.name === 'login') {
    if (environments.authenticated()) {
      next({
        name: 'overview'
      })
    }
  }
  next()
})

export default router
