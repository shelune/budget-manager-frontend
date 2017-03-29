<template>
  <div id="app">
    <nav class="navbar-default">
        <div class="container">
            <a href="#0" class="navbar-brand"><img src="https://placehold.it/300x60" alt="logo"></a>
            <ul class="nav navbar-nav">
                <li><a href="#">Register</a></li>
            </ul>

            <ul class="nav navbar-nav pull-right">
                <li><a href="#">Dashboard</a></li>
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
export default {
  name: 'app'
}
</script>

<style lang="scss">
  $icon-font-path: '~bootstrap-sass/assets/fonts/bootstrap/';
  @import "~bootstrap-sass/assets/stylesheets/_bootstrap.scss";
  @import "./static/styles/vnd/_all.scss";
  @import "./styles/all.scss";
</style>
