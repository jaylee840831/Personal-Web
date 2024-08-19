<template>
  <div ref="chart" class="chart">
  </div>
</template>

<script setup>
import * as echarts from 'echarts'

const props = defineProps(['chartOptions']) // 父元件的資料
const chart = ref(null) // 圖表DOM
let myChart = null // 圖表Object

function drawChart (data) {
  const option = {
    series: [
      {
        type: 'gauge',
        radius: '100%',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 240,
        center: ['50%', '50%'],
        splitNumber: 8,
        itemStyle: {
          color: 'red',
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        progress: {
          show: true,
          roundCap: true,
          width: 4
        },
        pointer: {
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
          length: '75%',
          width: 8,
          offsetCenter: [0, '5%']
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 4
          }
        },
        axisTick: {
          splitNumber: 2,
          lineStyle: {
            width: 0,
            color: '#999'
          }
        },
        splitLine: {
          length: 0,
          lineStyle: {
            width: 0,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 0,
          color: 'white',
          fontSize: 8
        },
        title: {
          show: false
        },
        detail: {
          show: false
        },
        data: [
          {
            value: data.value
          }
        ]
      }
    ]
  }
  myChart.setOption(option)
}

watch(() => props.chartOptions, (newValue) => {
  drawChart(newValue)
}, { deep: true })

watchEffect(() => {
  function RWDSetting () {
    if (myChart) myChart.resize()
  }
  // 監聽視窗大小變化
  const handleResize = () => {
    setTimeout(() => {
      RWDSetting()
    }, 200)
  }

  handleResize() // 初始先執行一次監聽視窗大小變化
  window.addEventListener('resize', handleResize)
  return () => {
    window.removeEventListener('resize', handleResize)
  }
})

onMounted(() => {
  myChart = echarts.init(chart.value, null, {
    width: 150,
    height: 150,
    renderer: 'canvas'
  })
  drawChart(props.chartOptions)
})
</script>

<style lang="scss" scoped>
</style>