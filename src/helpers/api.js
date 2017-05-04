import _ from 'lodash'
import qs from 'qs'
import Vue from 'vue'
import axios from 'axios'
import environments from '@/helpers/environments'

const baseUrl = 'https://budget-manager-backend-v3.herokuapp.com'
// const baseUrl = 'http://0.0.0.0:8080'
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
    method: 'get, put, delete'
  },
  categories: {
    url: '/expenses/categories{mode}',
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
    data: {},
    params: {}
  })

  // populate method
  let method = options.method

  // populate url
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
    data: options.data,
    params: options.params
  }).then((resp) => {
    let result = {success: true, data: resp}
    return result
  }, error => {
    let result = {success: false, data: error}
    return result
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
  }).then(resp => {
    if (resp && resp.data.token) {
      localStorage.setItem('tmptoken', resp.data.token)
    }
    return resp
  }, error => {
    return error
  })
}

export function logout() {
  localStorage.removeItem('tmptoken')
}
