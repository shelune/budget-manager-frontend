import _ from 'lodash'
import qs from 'qs'
import Vue from 'vue'
import axios from 'axios'
import environments from '@/helpers/environments'

const baseUrl = 'https://desolate-dawn-70418.herokuapp.com'
//const baseUrl = 'http://0.0.0.0:8080'
const endpoints = {
  login: {
    url: '/auth',
    method: 'post'
  },
  users: {
    url: '/users',
    method: 'post, get'
  },
  user: {
    url: '/users/{user_id}',
    method: 'get'
  },
  expenses: {
    url: '/expenses',
    method: 'post, get'
  },
  expense: {
    url: '/expenses/{expense_id}',
    method: 'get'
  }
}

export function send(name, options = {}) {
  if (!_.has(endpoints, name)) {
    throw new Error('route not present')
  }

  options = _.defaults(options, {
    method: null,
    route_params: {},
    data: {}
  })

  let method = options.method
  let url = baseUrl + endpoints[name].url
  _.each(options.route_params, (value, key) => {
    url = url.replace(`{${key}}`, value)
  })

  if (method === null) {
    method = endpoints[name].method

    if (method.includes(',')) {
      method = _.split(method, ',')[0]
    }
  }

  return axios({
    method: method,
    url: url,
    data: options.data
  }).catch(error => {
    console.log('got error from axios: ', error)
  }).then(resp => {
    if (resp.statusText == 'OK') {
      return resp
    }
  })
}

export function login(credentials) {
  return axios({
    url: baseUrl + '/auth',
    method: 'post',
    data: {
      access_token: 'kJ1JTzp94noxqW9AYvbnvRI7ZXeqpn2q',
    },
    auth: {
      username: credentials.email,
      password: credentials.password
    }
  }).catch(error => {
    console.log('got error when logging in: ', error)
  }).then(resp => {
    if (resp && resp.data.token) {
      localStorage.setItem('tmptoken', resp.data.token)
    }
  })
}

export function logout() {
  localStorage.removeItem('tmptoken')
}
