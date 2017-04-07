<template lang="html">
  <div class="container-fluid board-transactions">
    <h1 class="dashboard_title">Transactions</h1>
    <div class="row">
      <div class="col-sm-12">
        <form class="form-horizontal">
          <fieldset>
            <legend>Add new transaction</legend>
            <div class="form-group">
              <label for="amount" class="control-label">Amount</label>
              <div class="">
                <input v-model="transaction.amount" type="number" min="1" class="form-control" id="amount" placeholder="Amount">
              </div>
              <label for="category" class="control-label">Category</label>
              <div class="">
                <input v-model="transaction.category" type="text" class="form-control" id="category" placeholder="Category">
              </div>
            </div>
            <div class="form-group">
              <label for="date" class="control-label">Date</label>
              <div class="">
                <input v-model="transaction.date" type="date" class="form-control" id="date">
              </div>
            </div>
            <div class="form-group">
              <label for="comment" class="control-label">Comment</label>
              <div class="">
                <input v-model="transaction.comment" type="text" class="form-control" id="comment" placeholder="Comment">
              </div>
            </div>
            <div class="form-group">
              <label for="expenseType" class="control-label">Expense</label>
              <input type="radio" v-model="transaction.expenseType" value="expense" id="expenseType-expense">
              <label for="expenseType" class="control-label">Income</label>
              <input type="radio" v-model="transaction.expenseType" value="income" id="expenseType-income">
            </div>
            <div class="form-group">
              <button type="reset" class="btn btn-default">Reset</button>
              <button @click.prevent="submit" class="btn btn-primary">Submit</button>
            </div>
          </fieldset>
        </form>
      </div>
      <div class="col-sm-12">
        <div class="alert alert-success" v-if="success.state">
          <p><span>{{ success.msg }}</span></p>
        </div>
        <div class="alert alert-danger" v-if="error.state">
          <p><span>{{ error.msg }}</span></p>
        </div>
      </div>
    </div>
    <div class="row">

    </div>
  </div>
</template>

<script>
import * as DatePicker from 'vue-datepicker/vue-datepicker-es6.vue'
import * as api from '@/helpers/api.js'
import router from '@/router'

export default {
  data() {
    return {
      transaction: {
        amount: 0,
        category: '',
        date: '',
        comment: '',
        expenseType: '',
        access_token: ''
      },
      error: {
        state: false,
        msg: ''
      },
      success: {
        state: false,
        msg: ''
      }
    }
  },
  components: {
    DatePicker
  },
  methods: {
    submit() {
      this.transaction.access_token = localStorage.getItem('tmptoken')
      console.log(this.transaction)

      api.send('expenses', {
        method: 'post',
        data: this.transaction
      }).then(resp => {
        router.push({
          name: 'overview'
        })
      })

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
