<template>
    <div>
        <div class="wrap">
            <div class="box">31<div id="chartsId7_1"></div>
            </div>
            <div class="box">32<div id="chartsId7_2"></div>
            </div>
            <div class="box">33<div id="chartsId7_3"></div>
            </div>
        </div>
        <div class="wrap">
            <div class="box">34<div id="chartsId7_4"></div>
            </div>
            <div class="box">35<div id="chartsId7_5"></div>
            </div>
            <div class="box">36 <div id="chartsId7_6"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { option1, option2, option3, option4, option5, option6 } from './echarts'
const _symbol = require('./label-bg.svg');
export default {
    components: {
    },
    data() {
        return {
            chart1: "",
            chart2: "",
            chart3: "",
            chart4: "",
            chart5: "",
            chart6: "",
        }
    },
    methods: {
        initEcharts() {

            // 第1个图表
            this.chart1 = this.$echarts.init(document.getElementById('chartsId7_1'));
            this.chart1.setOption(option1);
            // 第2个图表
            this.chart2 = this.$echarts.init(document.getElementById('chartsId7_2'));
            this.chart2.setOption(option2);

            // 第3个图表
            let _markPoint2 = [{
                value: 'NO.1', xAxis: 0, yAxis: 400, symbol: 'image://' + _symbol,
            }, { value: 'NO.1', xAxis: 1, yAxis: 400, symbol: 'image://' + _symbol },
            {
                value: 'NO.1', xAxis: 2, yAxis: 400, symbol: 'image://' + _symbol,
            }, { value: 'NO.1', xAxis: 3, yAxis: 400, symbol: 'image://' + _symbol, },
            { value: 'NO.1', xAxis: 4, yAxis: 400, symbol: 'image://' + _symbol, }];
            option3.series[0].markPoint.data = _markPoint2;
            this.chart3 = this.$echarts.init(document.getElementById('chartsId7_3'));
            this.chart3.setOption(option3);
            // 第4个图表
            option4.series[0].data = option4.series[0].data?.map(item => {
                return {
                    value: item,
                    label: {
                        // 设置显示label
                        show: true,
                        // 设置label的位置
                        position: item > 10 ? 'inside' : 'top',
                        color: item > 10 ? 'rgb(255,255,255)' : 'rgba(150, 150, 150, 1)',

                    }
                }
            })
            this.chart4 = this.$echarts.init(document.getElementById('chartsId7_4'));
            this.chart4.setOption(option4);
            // 第5个图表
            this.chart5 = this.$echarts.init(document.getElementById('chartsId7_5'));
            this.chart5.setOption(option5);
            // 第6个图表
            this.chart6 = this.$echarts.init(document.getElementById('chartsId7_6'));
            this.chart6.setOption(option6);


            window.addEventListener("resize", () => {
                this.chart1.resize();
                this.chart2.resize();
                this.chart3.resize();
                this.chart5.resize();
                this.chart6.resize();
            });
        }
    },
    mounted() {
        this.initEcharts()
    }
}
</script>

<style lang="less" scoped>
.wrap {
    width: 1920px;
    display: flex;
    justify-content: space-evenly;
    // padding-top: 100px;
    padding-bottom: 50px;

    #chartsId7_1,
    #chartsId7_2,
    #chartsId7_4,
    #chartsId7_3,
    #chartsId7_5,
    #chartsId7_6 {
        width: 540px;
        height: 378px;
    }

    .box {
        color: #fff;
        width: 540px;
        min-height: 368px;
        background: rgba(2, 80, 150, 0.1);
        border: 2px solid;
        border-image: linear-gradient(225deg, rgba(5, 183, 237, 0), rgba(76, 142, 246, 0.47), rgba(2, 128, 215, 0)) 2 2;
    }
}</style>