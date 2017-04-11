<template lang="html">
  <div class="container-fluid">
    <h1 class="dashboard_title">Reports</h1>
    <reports-profit></reports-profit>
  </div>
</template>

<script>
import * as environments from '@/helpers/environments.js'
import * as api from '@/helpers/api.js'
import _ from 'lodash'
import moment from 'moment'
import ReportsProfit from '@/components/Reports_Profit'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export default {
  data() {
    return {
      expenses: []
    }
  },
  components: {
    ReportsProfit
  },
  methods: {
    retrieveTransactions() {
      api.send('expenses', {
        method: 'get',
        params: {
          access_token: environments.default.userToken()
        }
      }).then(resp => {
        console.log('expense list: ', resp.data)
        this.expenses = resp.data.data
      }).then(() => {
        let expenseList = this.expenses

        // handle data for monthly profit chart
        let monthLabels = []
        _.each(expenseList, expense => {
          expense.date = moment(expense.date).format('LL')
          let month = expense.date.match(/[\w\-]+/g)[0]
          if (_.indexOf(monthLabels, month) === -1) {
            monthLabels.push(month)
          }
        })

        monthLabels = monthLabels.sort((a, b) => {
          return monthNames.indexOf(a) > monthNames.indexOf(b)
        })

        console.log('month list: ', monthLabels)
      })
    }
  },
  mounted() {
    this.retrieveTransactions()
  }
}
</script>
