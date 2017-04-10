export default {
  master_key: 'kJ1JTzp94noxqW9AYvbnvRI7ZXeqpn2q',
  userId: '',
  userToken: function() {
    const token = localStorage.getItem('tmptoken')
    return token
  },
  userId: function() {
    const userId = localStorage.getItem('userId')
    return userId
  },
  authenticated: function() {
    const token = localStorage.getItem('tmptoken')
    if (token && token.length > 0) {
      return true
    }
    return false
  }
}
