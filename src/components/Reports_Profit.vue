<template lang="html">
  <div class="panel panel-primary panel-chart">
    <div class="panel-heading">
      <h3 class="panel-title">Profit Trend Chart</h3>
    </div>
    <div class="panel-body">
      <div class="chart-profit">
        <canvas id="chart-profit" width="400" height="400"></canvas>
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
      profitsData: []
    }
  },
  props: ['data'],
  watch: {
    data() {
      this.renderData()
      this.renderProfitChart()
    }
  },
  methods: {
    renderData() {
      _.map(this.data, month => {
        this.labels.push(month.stamp)
        this.profitsData.push(month.value)
      })
    },
    renderProfitChart() {
      console.log('labels:', this.labels)
      console.log('profits: ', this.profitsData)
      const ctxProfit = document.getElementById("chart-profit")
      const profitChart = new Chart(ctxProfit, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Profit / Loss',
            data: this.profitsData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
      });
    }
  },
  mounted() {
    const chartOptions = {
      labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Income',
          data: []
        }
      ]
    }
    this.renderProfitChart()
  }
}
</script>
