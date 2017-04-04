<template>
  <div id="app">
    <nav class="navbar-default">
        <div class="container">
            <a href="#0" class="navbar-brand">Budget Manager</a>
            <ul class="nav navbar-nav">
                <li><a href="#">Change Password</a></li>
            </ul>

            <ul class="nav navbar-nav pull-right">
                <li><router-link :to="{name: 'dashboard'}" href="#">Dashboard</router-link></li>
                <li><a href="#" @click.prevent="logout">Log Out</a></li>
            </ul>
        </div>
    </nav>
    <div class="container">
        <router-view></router-view>
    </div>
    <hr>
    <footer class="text-center">
        Built with Vue.
    </footer>
  </div>
</template>

<script>
import * as api from '@/helpers/api.js'
import router from './router'

export default {
  name: 'app',
  methods: {
    logout() {
      api.logout()
      router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style lang="scss">
  $icon-font-path: '~bootstrap-sass/assets/fonts/bootstrap/';
  @import "./styles/vnd/_variables.scss";
  @import "~bootstrap-sass/assets/stylesheets/_bootstrap.scss";
  @import "./styles/vnd/_bootswatch.scss";
  @import "./styles/all.scss";
</style>
