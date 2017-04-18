<template lang="html">
  <div class="panel panel-primary col-sm-6">
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
      _.forOwn(this.data, (value, key) => {
        this.labels.push(key)
        this.values.push(value)
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
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
          }]
        }
      });

      console.log('pie data:', this.pieData)
    }
  },
  mounted() {
    this.renderData()
    this.renderCategoryChart()
  }
}
</script>
