export default {
  master_key: 'kJ1JTzp94noxqW9AYvbnvRI7ZXeqpn2q',
  authenticated: function () {
    const token = localStorage.getItem('tmptoken')
    if (token && token.length > 0) {
      return true
    }
    return false
  }
}
