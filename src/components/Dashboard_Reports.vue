<template lang="html">
  <div class="container-fluid">
    <h1 class="dashboard_title">Reports</h1>
    <reports-profit :data="profitChartData"></reports-profit>
  </div>
</template>

<script>
import * as environments from '@/helpers/environments.js'
import * as api from '@/helpers/api.js'
import * as processor from '@/helpers/processor.js'
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
      expenses: [],
      profitChartData: []
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
        let monthLabels = processor.getMonthLabels(expenseList)

          // handle profit / loss for each month
        let monthProfits = processor.getMonthlyProfits(expenseList, monthLabels)
        this.profitChartData = monthProfits

        console.log('profit by month:', monthProfits)
      })
    }
  },
  mounted() {
    this.retrieveTransactions()
  }
}
</script>
