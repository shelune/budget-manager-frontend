<template>
  <div id="app" :style="{height: '100%'}">
    <modal-confirm @closeModal="closeModal" :data="modalConfirmation"></modal-confirm>
    <!-- <nav class="navbar-default">
        <div class="container">
            <a href="#0" class="navbar-brand">Budget Manager</a>
            <ul class="nav navbar-nav">
                <li><a href="#">Change Password</a></li>
            </ul>

            <ul class="nav navbar-nav pull-right">
                <li><router-link :to="{name: 'transactions'}">Add</router-link></li>
                <li><router-link :to="{name: 'overview'}">Dashboard</router-link></li>
                <li><a href="#" @click.prevent="openModal">Log Out</a></li>
            </ul>
        </div>
    </nav> -->
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Budget Manager</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><router-link :to="{name: 'transactions'}">Add</router-link></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dashboard <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><router-link :to="{name: 'transactions'}">Transactions</router-link></li>
                <li><router-link :to="{name: 'overview'}">Overview</router-link></li>
                <li><router-link :to="{name: 'reports'}">Reports</router-link></li>
              </ul>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#" @click.prevent="openModal">Log Out</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <section id="wrapper">
        <router-view></router-view>
    </section>
    <footer class="footer-main">
      <div class="container text-right disclaimer">Built with Vue.</div>
    </footer>
  </div>
</template>

<script>
import * as api from '@/helpers/api.js'
import ModalConfirm from '@/components/Modal_Confirm'
import router from './router'

export default {
  name: 'app',
  data () {
    return {
      modalConfirmation: {}
    }
  },
  components: {
    ModalConfirm
  },
  methods: {
    logout() {
      api.logout()
      router.push({
        name: 'login'
      })
    },
    openModal() {
      this.modalConfirmation = {text: 'Please confirm your exit!', show: true}
    },
    closeModal(data) {
      this.modalConfirmation.show = false
      if (data.confirm) {
        this.logout()
      }
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
