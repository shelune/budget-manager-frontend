<template lang="html">
  <div class="sidebar_wrapper">
    <ul class="sidebar sidebar-main">
      <li>
        <router-link :to="{name: 'transactions'}">Transactions</router-link>
      </li>
      <li>
        <router-link :to="{name: 'overview'}">Overview</router-link>
      </li>
      <li>
        <a href="#">Reports</a>
      </li>
      <li>
        <a href="#">Transactions</a>
      </li>
      <li>
        <a href="#">Settings</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>
