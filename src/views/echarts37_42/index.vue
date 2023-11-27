<template>
    <div>
        
        <div class="wrap">
            <div class="box">
                
                37<div :id="echartsOptions[0].el" class="echarts"></div>
            </div>
            <div class="box">38<div id="chartsId9_2"></div>
            </div>
            <div class="box">39<div id="chartsId9_3"></div>
            </div>
        </div>
        <div class="wrap">
            <div class="box">40<div id="chartsId9_4"></div>
            </div>
            <div class="box">41<div id="chartsId9_5"></div>
            </div>
            <div class="box">42<div id="chartsId9_6"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { option1, option2, option3, option4, option5, option6 } from './echarts'
const _symbol = require('./label-bg.svg');
import * as echarts from 'echarts'
import "echarts-liquidfill";

import {useFontSize} from '../utils'
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
            echartsOptions: [
                {
                    el: 'personEcharts',
                    backgroundColor: 'rgba(255,215,77,0.2)',
                    color: [{
                        type: 'linear',
                        x: 0, x2: 0, y: 0, y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#FFC652',
                            },
                            {
                                offset: 1,
                                color: '#B13500',
                            }
                        ]
                    }],
                    borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(251, 190, 77, 1)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(251, 190, 77, 0)'
                        }
                    ])
                }
            ],
            echartsList: [
                {
                    value: 0.75,
                    name: '个人数评',
                    subs: [
                        { name: '工作会议', value: 31 },
                        { name: '报告提交', value: 31 },
                        { name: '考勤管理', value: 31 },
                        { name: '学习培训', value: 31 },
                        { name: '群众走访', value: 31 },
                        { name: '事件到场', value: 31 },
                        { name: '任务完成', value: 31 },
                    ]
                },
                {
                    value: 0.55,
                    name: '群众评价',
                    subs: [
                        { name: '熟悉程度', value: 31 },
                        { name: '态度作风', value: 31 },
                        { name: '问题处理', value: 31 },
                        { name: '矛盾调处', value: 31 },
                        { name: '政策宣讲', value: 31 },
                    ]
                },
                {
                    value: 0.35,
                    name: '专项考察',
                    subs: [
                        { name: '组织纪律', value: 31 },
                        { name: '问题协调', value: 31 },
                        { name: '任务推进', value: 31 },
                        { name: '党群联系', value: 31 },
                    ]
                }
            ],
            chartList: {}

        }
    },
    methods: {
        initEcharts2(params) {
            const option = created(params)

            function created(data) {
                const round = (num) => {
                    return Math.round(num * 100) / 100
                }
                return {
                    series: [
                        {
                            type: 'liquidFill',
                            radius: '80%',
                            center: ['50%', '50%'],
                            data: [data.value, data.value, data.value], // data个数代表波浪数
                            backgroundStyle: {
                                borderWidth: 0,
                                color: params.backgroundColor ?? 'rgb(255,0,255,0.1)',
                            },
                            // 修改波浪颜色
                            color: params.color,
                            // color:['yellow','red','pink'],  每个波浪不同颜色，颜色数组长度为对应的波浪个数
                            label: {
                                formatter: `{size|${round(data.value * 100)}}\n{name|${data.name}}`,
                                rich: {
                                    size: {
                                        fontSize: useFontSize(0.3),
                                        fontWeight: 'bold',
                                        fontFamily: 'LINESeedSans, LINESeedSans',
                                        color: '#FFFFFF',
                                        padding: [0, 0, 5, 0]
                                    },
                                    name: {
                                        fontSize: useFontSize(0.14),
                                        color: '#FFFFFF'
                                    }
                                }
                            },
                            labelLayout: {
                                y: '50%'
                            },
                            outline: {
                                show: false,
                            },
                        },
                        {
                            type: 'pie',
                            center: ['50%', '50%'],
                            radius: ['91%', '93%'],
                            data: [
                                {
                                    name: '',
                                    value: 500,
                                    labelLine: {
                                        show: false,
                                    },
                                    itemStyle: {
                                        color: params.borderColor ?? 'rgba(2, 180, 255, 1)',
                                    }
                                },
                            ],
                        },
                    ],
                }
            }

            const dom = document.getElementById(params.el);
            const chart = echarts.init(dom);
            option && chart.setOption(option);
            this.chartList[`chart${params.index}`] = chart
            window.onresize = () => {
                Object.keys(this.chartList).forEach(key => {
                    this.chartList[key]?.resize()
                })
            }
        },
        initEcharts() {

            // // 第1个图表
            // this.chart1 = this.$echarts.init(document.getElementById('chartsId9_1'));
            // this.chart1.setOption(option1);
            // 第2个图表
            this.chart2 = this.$echarts.init(document.getElementById('chartsId9_2'));
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
            this.chart3 = this.$echarts.init(document.getElementById('chartsId9_3'));
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
            this.chart4 = this.$echarts.init(document.getElementById('chartsId9_4'));
            this.chart4.setOption(option4);
          

            // 第6个图表
            this.chart6 = this.$echarts.init(document.getElementById('chartsId9_6'));
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
        this.echartsList.forEach((item, index) => {
            this.initEcharts2({
                ...this.echartsOptions[index],
                ...item,
                index,
            })
        })
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

    #chartsId9_1,
    .echarts,
    #chartsId9_2,
    #chartsId9_4,
    #chartsId9_3,
    #chartsId9_5,
    #chartsId9_6 {
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

    .evaluate-index__item {
        height: 368px;
        overflow: scroll;
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