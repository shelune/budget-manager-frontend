<template lang="html">
  <div class="panel panel-primary panelChart panelChart-full">
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
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                '#eea247',
                '#e57264',
                '#aeb698',
                '#955751',
                '#e9e6c7',
                '#1f817f'
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
