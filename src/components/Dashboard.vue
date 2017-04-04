<template lang="html">
  <div class="container">
    <dashboard-sidebar></dashboard-sidebar>
  </div>
</template>

<script>
import DashboardOverview from '@/components/Dashboard_Overview'
import DashboardSidebar from '@/components/Dashboard_Sidebar'

export default {
  components: {
    DashboardSidebar,
    DashboardOverview
  }
}
</script>

<style lang="scss" scoped>

</style>
