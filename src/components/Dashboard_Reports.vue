<template lang="html">
  <div class="container-fluid">
    <h1 class="dashboard_title">Reports</h1>
    <reports-profit :data="profitChartData"></reports-profit>
    <reports-categories type="Expenses" category-id="expense-categories" :data="categoriesExpense"></reports-categories>
    <reports-categories type="Incomes" category-id="income-categories" :data="categoriesIncome"></reports-categories>
  </div>
</template>

<script>
import * as environments from '@/helpers/environments.js'
import * as api from '@/helpers/api.js'
import * as processor from '@/helpers/processor.js'
import _ from 'lodash'
import moment from 'moment'
import ReportsProfit from '@/components/Reports_Profit'
import ReportsCategories from '@/components/Reports_Categories'

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
      profitChartData: [],
      categoriesExpense: {},
      categoriesIncome: {}
    }
  },
  components: {
    ReportsProfit,
    ReportsCategories
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
    },
    retrieveCategories(mode) {
      api.send('categories', {
        route_params: {
          mode: _.capitalize(mode)
        },
        params: {
          access_token: environments.default.userToken()
        }
      })
      .then(resp => {
        console.log('show categories: ', resp)
        if (mode === 'expense') {
          this.categoriesExpense = resp.data.data
        } else if (mode === 'income') {
          this.categoriesIncome = resp.data.data
        }
      })
    }
  },
  mounted() {
    this.retrieveTransactions()
    this.retrieveCategories('expense')
    this.retrieveCategories('income')
  }
}
</script>
