import _ from 'lodash'
import axios from 'axios'

const baseUrl = 'https://desolate-dawn-70418.herokuapp.com'
const endpoints = {
  login: {
    url: '/auth',
    method: 'post'
  },
  users: {
    url: '/users',
    method: 'post, get'
  },
  expenses: {
    url: '/expenses',
    method: 'post, get'
  }
}

function send(name, options = {}) {
  if (!_.has(this.endpoints, name) {
    throw new Error('route not present')
  })

  options = _.defaults(options, {
    method: null,
    route_params: {},
    params: {},
    data: {}
  })

  const method = options.method
  const url = this.baseUrl + this.endpoints[name].url
  _.map(options.route_params, (value, key) => {
    url = url.replace(`{${key}}`, value)
  })

  if (method === null) {
    method = this.endpoints[name].method

    if (method.includes(',')) {
      method = _.split(method, ',')[0]
    }
  }

  return axios({
    method: method,
    url: url
    data: options.data
  })
  .catch(error => {
    console.log('got error from axios: ', error)
  })
}
