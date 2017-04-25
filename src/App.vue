<template>
  <div id="app" :style="{height: '100%'}">
    <modal-confirm @closeModal="closeModal" :data="modalConfirmation"></modal-confirm>
    <nav class="navbar-default">
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
