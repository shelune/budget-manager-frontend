<template>
<div class="col-sm-4 col-sm-offset-4">
  <h2>Log In</h2>
  <form class="form">
    <div class="form-group">
      <label for="email" class="sr-only control-label">Email</label>
      <input id="email" type="text" class="form-control" placeholder="Username" v-model="credentials.email">
    </div>
    <div class="form-group">
      <label for="password" class="sr-only control-label">Username</label>
      <input id="password" type="password" class="form-control" placeholder="Password" v-model="credentials.password">
    </div>
    <div class="alert alert-danger" v-if="error">

    </div>
    <button class="btn btn-primary" type="submit" @click.prevent="submit">Register</button>
    <a href="#0" class="pull-right">Login</a>
  </form>
</div>
</template>

<script>
import * as api from '@/helpers/api.js'
import axios from 'axios'
import qs from 'qs'

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      error: false,
      errorMsg: {}
    }
  },
  methods: {
    submit() {
      api.login(this.credentials).then(data => {
        console.log(data)
      })


      /* THIS WORKS
      api.send('users', {
        data: {
          email: this.credentials.email,
          password: this.credentials.password,
          access_token: 'kJ1JTzp94noxqW9AYvbnvRI7ZXeqpn2q'
        }
      }).then(data => {
        console.log(data)
      })
      */
    }
  }
}
</script>
