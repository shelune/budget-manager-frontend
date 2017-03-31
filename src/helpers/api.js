import _ from 'lodash'
import Vue from 'vue'
import axios from 'axios'

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

  console.log('url: ', url, 'method:', method, 'data:', options.data)

  return Vue.http[method](url, options.data)
  .catch(error => {
    console.log('got error from axios: ', error)
  })
}

export function login(credentials) {
  return Vue.http.post(baseUrl + '/auth', {
    email: 'user2@user.com',
    password: 'password',
    access_token: 'kJ1JTzp94noxqW9AYvbnvRI7ZXeqpn2q'
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    emulateJSON: true
  })
}
