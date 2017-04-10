<template lang="html">
  <div class="container-fluid">
    <h1 class="dashboard_title">Overview</h1>
    <table class="table table-striped table-hover ">
      <thead>
        <tr>
          <th>#</th>
          <th v-for="header in tableHeaders">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="expense, index in expenses">
          <td>{{ index + 1 }}</td>
          <td>{{ capitalizeText(expense.amount) }}</td>
          <td>{{ capitalizeText(expense.category) }}</td>
          <td>{{ capitalizeText(expense.expense_type) }}</td>
          <td>{{ formatDate(expense.date) }}</td>
          <td>{{ capitalizeText(expense.comment) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as environments from '@/helpers/environments.js'
import * as api from '@/helpers/api.js'
import moment from 'moment'
import _ from 'lodash'

export default {
  data() {
    return {
      tableHeaders: ['Amount', 'Category', 'Type', 'Date', 'Comment'],
      expenses: []
    }
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
      })
    },
    formatDate(date) {
      return moment(date).format('LL')
    },
    capitalizeText(text) {
      return _.capitalize(text)
    }
  },
  mounted() {
    this.retrieveTransactions()
  }
}
</script>

<style lang="css">
</style>
