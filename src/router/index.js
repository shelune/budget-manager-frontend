import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import DashboardOverview from '@/components/Dashboard_Overview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'overview',
          component: DashboardOverview
        },
        /*
        {
          path: 'reports',
          component: DashboardReports
        },
        {
          path: 'transactions',
          component: DashboardTransactions
        },
        {

        }
        */
      ]
    }
  ]
})
