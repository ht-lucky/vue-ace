<template>
  <div class="home">
    <echarts1_6></echarts1_6>
    <echarts7_12></echarts7_12>
    <echarts13_18></echarts13_18>
    <echarts19_24></echarts19_24>
    <echart25_30></echart25_30>
    <echarts31_36></echarts31_36>
  </div>
</template>

<script>
// @ is an alias to /src
import echarts1_6 from './echarts1_6/index.vue'
import echarts7_12 from './echarts7_12/index.vue'
import echarts13_18 from './echarts13_18/index.vue'
import echarts19_24 from './echarts19_24/index.vue'
import echart25_30 from './echarts25_30/index.vue'
import echarts31_36 from './echarts31_36/index.vue'

export default {
  name: 'HomeView',
  components: {
    echarts1_6,
    echarts7_12,
    echarts13_18,
    echarts19_24,
    echart25_30,
    echarts31_36,
  }
}
</script>
<style lang="less" scoped>
.home{
    padding-top: 100px;
    // background: linear-gradient(rgba(40,140,234,0.3), rgba(40,140,234, 0)), url('../assets/home-bgc.png') no-repeat ;
    background-image: url(../assets/home-bgc.png);

    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100vw;
    min-height: 100vh;

}
</style>
