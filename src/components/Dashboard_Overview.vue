<template lang="html">
  <div class="container-fluid page-overview">
    <modal-confirm @closeModal="closeRemoveModal" :data="modalConfirmation"></modal-confirm>
    <h1 class="dashboard_title">Overview</h1>
    <div class="row overview_general">
      <div class="col-sm-4 overview_total">
        <h2>Total income</h2>
        <p class="text-info">{{ this.totalIncome > 0 ? '+' : '' }}{{ this.totalIncome }}</p>
      </div>
      <div class="col-sm-4 overview_monthlyIncome">
        <h2>This month's income</h2>
        <p class="text-success">+{{ this.thisMonth.income }}</p>
      </div>
      <div class="col-sm-4 overview_monthlyExpense">
        <h2>This month's expense</h2>
        <p class="text-danger">-{{ this.thisMonth.expense }}</p>
      </div>
    </div>
    <table class="table table-striped table-hover table-responsive">
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
import * as environments from '@/helpers/environments'
import * as api from '@/helpers/api.js'
import * as processor from '@/helpers/processor'
import moment from 'moment'
import _ from 'lodash'

export default {
  data() {
    return {
      tableHeaders: ['Amount', 'Category', 'Type', 'Date', 'Comment', 'Remove'],
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
        processor.getThisMonth(this.thisMonth, this.expenses)
      })
    },
    getTotalIncome(expenses) {
      this.totalIncome = _.reduce(expenses, (sum, next) => {
        return next.expense_type === 'expense' ? sum - next.amount : sum + next.amount
      }, 0)
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
