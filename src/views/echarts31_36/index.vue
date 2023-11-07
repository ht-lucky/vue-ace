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
            <div class="box">
                35<div id="chartsId7_5"></div>
                <div class="legend">
                    <div class="legend-item" @mouseover="mouseoverHandlerCategory(item.name)"
                        v-for="(item, index) in categoryList" :key="index">
                        <div class="item-icon" :style="{ background: item.color }"></div>
                        <div class="item-name">{{ item.name ? item.name.replace('工业', '') : item.name }}</div>
                        <div class="item-value">{{ item.value }}个</div>
                    </div>
                </div>
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
            categoryList: [
                { name: 'label1', num: 'num1', value: '111' },
                { name: 'label2', num: 'num2', value: '222' },
                { name: 'label3', num: 'num3', value: '333' },
                { name: 'label4', num: 'num4', value: '444' },
                { name: 'label5', num: 'num5', value: '555' },
            ],
        }
    },
    methods: {
        mouseoverHandlerCategory(text) {
            let allIndex = this.categoryList.map((item, index) => index);
            this.categoryList.forEach((item, index) => {
                if (item.name === text) {
                    if (this.timerCategory) {
                        clearInterval(this.timerCategory);
                        this.timerCategory = null;
                    }
                    this.chartCategory.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: allIndex,
                    })
                    this.chartCategory.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: index,
                    })
                }
            });
        },
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
            let allIndex = this.categoryList.map((item,index) => index)
            this.chart5 = this.$echarts.init(document.getElementById('chartsId7_5'));
            this.chartCategory = this.chart5;
            this.chartCategory.on('mouseover', (event) => {
                if (this.timerCategory) {
                    clearInterval(this.timerCategory);
                    this.timerCategory = null;
                }
                this.chartCategory.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: allIndex,
                })
                this.chartCategory.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: event.dataIndex,
                })
            });

            this.chartCategory.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: allIndex,
            })
            this.chartCategory.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0,
            })

            if (this.timerCategory) {
                clearInterval(this.timerCategory);
                this.timer = null;
            }
            let n = 1;
            this.timerCategory = setInterval(() => {
                // console.log(n);
                if (n === this.categoryList.length) {
                    n = 0;
                }
                this.chartCategory.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: allIndex,
                })
                this.chartCategory.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: n,
                })
                n++;
            }, 1000)

            this.$once('hook:beforeDestroy', () => {
                clearInterval(this.timerCategory);
                this.timerCategory = null;
            })
            let data = [
                {name:'lable1',value:111},
                {name:'lable2',value:222},
                {name:'lable3',value:333},
                {name:'lable4',value:444},
                {name:'lable5',value:555},
            ]
            let {option, arr} = option5(data)
            this.chart5.setOption(option);
            // this.chart5.setOption(option5);

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
        position: relative;
    }
}

.legend {
    position: absolute;
    // top: 8.8889vh;
    top: 96px;
    right: 5px;
    max-height: 200px;
    overflow-y: auto;

    &::-webkit-scrollbar-thumb {
        height: 60px;
        background: transparent;
        border-radius: 5px;
        border: none;
    }

    &::-webkit-scrollbar {
        width: 7px;
    }

    &-item {
        color: #fff;
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        .item-icon {
            width: 8px;
            height: 8px;
            border-radius: 100%;
            margin-right: 8px;
        }

        .item-name {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #E3ECFF;
            line-height: 16px;
            margin-right: 10px;
        }

        .item-value {
            font-size: 16px;
            font-family: Futura-Heavy, Futura;
            font-weight: 800;
            color: #F8AE46;
            line-height: 16px;
            margin-top: 5px;
        }
    }
}
</style>