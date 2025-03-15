<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getIndexRaddarData } from "@/api/gh/indexPage.js";
const animationDuration = 3000

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
      raddarData: [
            {
              value: [0,0,0,0,0,0],
              name: '小面'
            },
            {
              value: [0,0,0,0,0,0],
              name: '中面'
            },
            {
              value: [0,0,0,0,0,0],
              name: '小货'
            },
            {
              value: [0,0,0,0,0,0],
              name: '中货'
            },
            {
              value: [0,0,0,0,0,0],
              name: '5米2'
            },
            {
              value: [0,0,0,0,0,0],
              name: '6米8'
            }
          ],
    }
  },
  mounted() {
    getIndexRaddarData().then((res)=>{
      console.log(res);
      let result = res.data;
      let nameList = ['Small', 'Middle', 'STruck', 'MTruck', 'FiveTwo', 'SixEight'];
      let nameList2 = ['wait-paydeposit', 'wait-receive', 'on-way', 'load-transport', 'wait-payremain', 'finished', 'canceled'];
      for (let key in result) {
        let index = nameList.indexOf(key);
        if(index!==-1){
          let obj = result[key]
          for (let item in obj) {
          let index2 = nameList2.indexOf(item);
            if(index2!==-1){
              this.raddarData[index].value.splice(index2,1,obj[item])
            }
          }
        }
      }
      console.log(this.raddarData);
      this.initChart()
    })
    // this.$nextTick(() => {

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
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            { name: '待支付订金', max: 50 },
            { name: '等待接单', max: 50 },
            { name: '司机正在赶来', max: 50 },
            { name: '正在装载运输', max: 50 },
            { name: '待支付尾款', max: 50 },
            { name: '订单已结束', max: 50 },
            { name: '订单已取消', max: 50 }
          ]
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['小面', '中面', '小货', '中货', '5米2', '6米8']
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: this.raddarData,
          // [
          //   {
          //     value: [5000, 7000, 12000, 11000, 15000, 14000],
          //     name: 'Allocated Budget'
          //   },
          //   {
          //     value: [4000, 9000, 15000, 15000, 13000, 11000],
          //     name: 'Expected Spending'
          //   },
          //   {
          //     value: [5500, 11000, 12000, 15000, 12000, 12000],
          //     name: 'Actual Spending'
          //   }
          // ],
          animationDuration: animationDuration
        }]
      })
    }
  }
}
</script>
