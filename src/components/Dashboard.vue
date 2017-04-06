<template lang="html">
  <div class="container">
    <dashboard-sidebar></dashboard-sidebar>
    <section class="wrapper-main">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import DashboardSidebar from '@/components/Dashboard_Sidebar'

export default {
  components: {
    DashboardSidebar
  }
}
</script>

<style lang="scss" scoped>

</style>
