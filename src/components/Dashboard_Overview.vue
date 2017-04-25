<template lang="html">
  <div class="container-fluid page-overview">
    <modal-confirm @closeModal="closeRemoveModal" :data="modalConfirmation"></modal-confirm>
    <h1 class="dashboard_title">Overview</h1>
    <div class="row overview_general">
      <div class="col-sm-4">
        <h2>Total income</h2>
        <p>{{ this.totalIncome }}</p>
      </div>
      <div class="col-sm-4">
        <h2>This month's income</h2>
        <p>+{{ this.thisMonth.income }}</p>
      </div>
      <div class="col-sm-4">
        <h2>This month's expense</h2>
        <p>-{{ this.thisMonth.expense }}</p>
      </div>
    </div>
    <table class="table table-striped table-hover">
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
          <td><button class="btn btn-danger" @click.prevent="openRemoveModal(expense.id)">Remove</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ModalConfirm from '@/components/Modal_Confirm'
import * as environments from '@/helpers/environments.js'
import * as api from '@/helpers/api.js'
import moment from 'moment'
import _ from 'lodash'

export default {
  data() {
    return {
      tableHeaders: ['Amount', 'Category', 'Type', 'Date', 'Comment'],
      expenses: [],
      modalConfirmation: {},
      totalIncome: 0,
      thisMonth: {income: 0, expense: 0}
    }
  },
  components: {
    ModalConfirm
  },
  methods: {
    retrieveTransactions() {
      api.send('expenses', {
        method: 'get',
        params: {
          access_token: environments.default.userToken()
        }
      }).then(resp => {
        this.expenses = _.reverse(resp.data.data)
        console.log('expense list: ', this.expenses)
        this.getTotalIncome(this.expenses)
        this.getThisMonth(this.expenses)
      })
    },
    getTotalIncome(expenses) {
      this.totalIncome = _.reduce(expenses, (sum, next) => {
        return next.expense_type === 'expense' ? sum + next.amount : sum - next.amount
      }, 0)
    },
    getThisMonth(expenseList) {
      const today = moment().toDate()
      console.log('today:', today)

      let incomes = _.filter(expenseList, (expense) => {
        return expense.expense_type === 'income'
      })

      let expenses = _.filter(expenseList, (expense) => {
        return expense.expense_type === 'expense'
      })

      this.thisMonth.income = _.reduce(incomes, (sum, next) => {
        return moment(next.date).isSame(today, 'month') ? sum + next.amount : sum + 0
      }, 0)

      this.thisMonth.expense = _.reduce(expenses, (sum, next) => {
        return moment(next.date).isSame(today, 'month') ? sum + next.amount : sum + 0
      }, 0)

      console.log('this month expense:', this.thisMonth.expense)
    },
    formatDate(date) {
      return moment(date).format('LL')
    },
    capitalizeText(text) {
      return _.capitalize(text)
    },
    openRemoveModal(expenseId) {
      this.modalConfirmation = {text: 'Please confirm your deletion!', expenseId: expenseId, show: true}
    },
    closeRemoveModal(data) {
      this.modalConfirmation.show = false
      if (data.confirm) {
        this.remove(data.expenseId)
      }
    },
    remove(expenseId) {
      console.log('expense id: ', expenseId)
      api.send('expense', {
        method: 'delete',
        data: {
          access_token: environments.default.userToken()
        },
        route_params: {
          expense_id: expenseId
        }
      }).then(resp => {
        if (resp.success) {
          this.retrieveTransactions()
        }
      })
    }
  },
  mounted() {
    this.retrieveTransactions()
  }
}
</script>

<style lang="css">
</style>
