<template lang="html">
  <div class="panel panel-primary panel-chart">
    <div class="panel-heading">
      <h3 class="panel-title">Expenses By Categories</h3>
    </div>
    <div class="panel-body">
      <div class="chart-categories">
        <canvas id="chart-categories" width="400" height="400"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/helpers/api.js'
import moment from 'moment'
import _ from 'lodash'
import VueCharts from 'vue-chartjs'

export default {
  data() {
    return {
      labels: [],
      values: [],
      pieData: [],
    }
  },
  props: ['data'],
  watch: {
    data() {
      this.renderData()
      this.renderCategoryChart()
    }
  },
  methods: {
    renderData() {
      _.map(this.data, (category) => {
        this.labels.push(category.name)
        this.values.push(category.total)
      })
    },
    renderCategoryChart() {
      const ctxProfit = document.getElementById("chart-categories")

      const profitChart = new Chart(ctxProfit, {
        type: 'doughnut',
        data: {
          labels: this.labels,
          datasets: [{
            data: this.values,
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                '#eea247',
                '#e57264',
                '#aeb698',
                '#955751',
                '#e9e6c7',
                '#1f817f'
            ]
          }]
        }
      });
    }
  },
  mounted() {
    this.renderData()
    this.renderCategoryChart()
  }
}
</script>
