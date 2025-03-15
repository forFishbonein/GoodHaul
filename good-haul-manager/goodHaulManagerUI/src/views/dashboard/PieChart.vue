<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getIndexPieData } from "@/api/gh/indexPage.js";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      pieData: [
        { value: 0, name: '待支付订金' },
        { value: 0, name: '等待接单' },
        { value: 0, name: '司机正在赶来' },
        { value: 0, name: '正在装载运输' },
        { value: 0, name: '待支付尾款' },
        { value: 0, name: '订单已结束' },
        { value: 0, name: '订单已取消' }
      ],
    }
  },
  mounted() {
    getIndexPieData().then((res)=>{
      let result = res.data;
      let nameList = ['wait-paydeposit', 'wait-receive', 'on-way', 'load-transport', 'wait-payremain', 'finished', 'canceled'];
      for(let key in result){
        let index = nameList.indexOf(key);
        if(index!==-1){
          this.pieData[index].value = result[key];
        }
      }
      console.log(this.pieData);
      this.initChart();
    })
    // this.$nextTick(() => {
    //   this.initChart()
    // })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['待支付订金', '等待接单', '司机正在赶来', '正在装载运输', '待支付尾款', '订单已结束', '订单已取消']
        },
        series: [
          {
            name: '相关订单数量',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: this.pieData,
            // [
            //   { value: 320, name: 'Industries' },
            //   { value: 240, name: 'Technology' },
            //   { value: 149, name: 'Forex' },
            //   { value: 100, name: 'Gold' },
            //   { value: 59, name: 'Forecasts' }
            // ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
