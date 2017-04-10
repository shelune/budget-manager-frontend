<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>{{ mode == 'login' ? 'Log In' : 'Register' }}</h2>
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
        <p><span>{{ errorMsg }}</span></p>
      </div>
      <div class="alert alert-success" v-if="success">
        <p><span>{{ successMsg }}</span></p>
      </div>
      <button class="btn btn-primary" v-if="mode == 'login'" type="submit" @click.prevent="submitLogin">Login</button>
      <button class="btn btn-primary" v-if="mode == 'register'" @click.prevent="submitRegister">Register</button>
      <a href="#0" class="pull-right" @click.prevent="modeTo('login')" v-if="mode == 'register'">Login</a>
      <a href="#0" class="pull-right" @click.prevent="modeTo('register')" v-if="mode == 'login'">Register</a>
    </form>
  </div>
</template>

<script>
import * as api from '@/helpers/api.js'
import environments from '@/helpers/environments'
import axios from 'axios'
import qs from 'qs'
import _ from 'lodash'

import router from '@/router'

export default {
  data() {
    return {
      mode: 'login',
      credentials: {
        email: '',
        password: ''
      },
      error: false,
      success: false,
      errorMsg: '',
      successMsg: '',
    }
  },
  methods: {
    submitLogin() {
      api.login(this.credentials).then(resp => {
        if (environments.authenticated()) {
          this.error = false
          localStorage.setItem('userId', resp.data.user.id)
          router.push({
            name: 'overview'
          })
        } else {
          this.error = true
          this.errorMsg = 'Unable to log in with these credentials.'
        }
      })
    },
    submitRegister() {
      api.send('users', {
        data: {
          email: this.credentials.email,
          password: this.credentials.password,
          access_token: 'kJ1JTzp94noxqW9AYvbnvRI7ZXeqpn2q'
        }
      }).then(resp => {
        console.log(resp)
        if (resp.success) {
          this.error = false
          this.success = true
          this.successMsg = _.capitalize(resp.data.statusText) + '. Please log in!'
        } else {
          this.success = false
          this.error = true
          this.errorMsg = _.capitalize(resp.data.response.data.message)
        }
      })
    },
    modeTo(mode) {
      this.mode = mode
    }
  }
}
</script>
