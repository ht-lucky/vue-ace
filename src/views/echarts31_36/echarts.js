import { util } from "../../common/util";
const circle = require('./icon-echarts-circle.png')
const echarts = require('echarts');
// 散点图
var dataset = {
    dimensions: ["部门", "收件量"],
    source: [
        { 部门: "部门1", 收件量: 1523, 平均时长: 1 },
        { 部门: "部门2", 收件量: 5223, 平均时长: 2 },
        { 部门: "部门3", 收件量: 2123, 平均时长: 2 },
        { 部门: "部门4", 收件量: 4123, 平均时长: 2 },
        { 部门: "部门5", 收件量: 3123, 平均时长: 3 },
        { 部门: "部门6", 收件量: 7123, 平均时长: 4 },
        { 部门: "部门7", 收件量: 6123, 平均时长: 1 },
        { 部门: "部门8", 收件量: 5123, 平均时长: 3 },
        { 部门: "部门9", 收件量: 3123, 平均时长: 3 },
        { 部门: "部门10", 收件量: 7123, 平均时长: 4 },
        { 部门: "部门11", 收件量: 5123, 平均时长: 1 },
    ]
}
let color = ['#5B8FF988']
function series() {
    const s = []
    for (var i = 0; i < dataset.dimensions.length - 1; i++) {
        const dim = dataset.dimensions[(i + 1)]
        s.push({
            type: 'scatter',
            symbolSize: function (data) {
                return data['平均时长'] * 10
                const size = Math.sqrt(data[dim])
                let retSize = 0
                if (size < 5000) {
                    retSize = size / 2
                } else {
                    retSize = size / 5e2
                }
                //  控制散点大小
                return retSize >= 80 ? 80 : retSize < 10 ? retSize + 5 : retSize
            },
            // symbolSize:data[dim],
            emphasis: {
                label: {
                    show: false,
                    position: 'bottom'
                }
            },
            itemStyle: {
                color: color[i],
                // borderColor:borderColor[i]
            }
        });

    }
    return s
}
const TOOLTIP_STYLE = {
    backgroundColor: 'rgba(0, 24, 62, 0.6)',
    borderWidth: 0,
    extraCssText: 'box-shadow: 0px 0px 14px 0px rgba(63, 129, 255, 0.8);color: #fff',
    textStyle: {
        color: '#fff',
        fontSize: fontSize(0.14),
    },
    axisPointer: {
        type: 'shadow'
    }
};
// 字体适配1
function fontSize(res) {
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1920);
    return res * fontSize;
}
// 字体适配2
function fontChart(res) {
    //获取到屏幕的宽度
    const clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    if (!clientWidth) return; // 报错拦截：
    let fontSize = 10 * (clientWidth / 1920);
    return res * fontSize;
}
var maxData = 2000;
const TOOLTIP_STYLE1 = {
    backgroundColor: 'rgba(0, 24, 62, 0.6)',
    borderWidth: 0,
    extraCssText: 'box-shadow: 0px 0px 14px 0px rgba(63, 129, 255, 0.8);color: #fff',
    textStyle: {
        color: '#fff',
        fontSize: fontChart(1.4),
    },
    axisPointer: {
        type: 'shadow'
    },
    formatter(e, v) {
        if (e.name) {
            return e.marker + e.name + ": " + e.value + "<br/>" + '  ' + "占比 " + e.percent + '%'
        }
    },
}
const option1 = {
    legend: {
        data: [{
            name: '亿元以上',
            itemStyle: {
                color: '#FFD949'
            },
        }, {
            name: '10亿元以上',
            itemStyle: {
                color: '#00FFB0'
            },
        }],
        show: true,
        top: 10,
        right: 20,
        itemWidth: 10,
        itemHeight: 10,
        selectedMode: false,
        textStyle: {
            color: 'rgba(255, 255, 255, 1)',
            fontSize: 14,
            padding: [0, 8, 0, 8]
        }
    },
    grid: {
        top: '23%',
        left: '2%',
        right: '2%',
        bottom: '0',
        containLabel: true,
    },
    tooltip: {
        ...TOOLTIP_STYLE,
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: 'rgb(126,199,255)',
            },
        },
    },
    xAxis: {
        splitLine: {
            show: false,
        },
        axisLabel: {
            color: "#ffffff",
            fontSize: 12,
            interval: 'auto', // x轴间距
            rotate: 20
        },
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(152, 212, 255, .5)',
            }
        },
        data: ["乡镇名称", "乡镇名称2", "乡镇名称3", "乡镇名称4", "乡镇名称5"]
    }, yAxis: [{
        axisTick: {
            show: false
        },
        axisLabel: {
            show: true,
            fontSize: 12,
            color: "#fff",
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: 'rgba(152, 212, 255, .5)',
            }
        },
        splitLine: {
            type: 'dashed',
            lineStyle: {
                color: 'rgba(152, 212, 255, .1)',
            }
        },
        nameTextStyle: {
            color: "#fff    ",
            fontWeight: 400,
            fontSize: 12,
        },
    }, {
        show: true,
        max: 100,
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
            textStyle: { fontSize: 16, color: '#fff' },
            formatter: params => {
                return `${params}%`
            }
        }
    }], series: [
        {
        type: 'pictorialBar',
        symbolPosition: 'end',
        data: [1000, 600, 700, 900, 400],
        symbol: 'diamond',
        symbolOffset: ['-28%', '-50%'],
        symbolSize: [20, 10],
        itemStyle: {
            borderColor: 'rgba(255, 217, 73, 1)',
            color: 'rgba(255, 217, 73, 1)'
        },
        tooltip: {
            show: false
        },
        legend: {
            show: false,
        }
    },
     {
        z: 1,
        type: 'bar',
        name: '亿元以上',
        barWidth: 20,
        barGap: '-50%',
        data: [1000, 600, 700, 900, 400],
        itemStyle: {
            color: {
                type: 'linear',
                x: 0, x2: 1, y: 0, y2: 0,
                colorStops: [
                    { offset: 0, color: 'rgba(255, 217, 73, .7)' },
                    { offset: 0.5, color: 'rgba(255, 217, 73, .7)' },
                    { offset: 0.5, color: 'rgba(255, 217, 73, .3)' },
                    { offset: 1, color: 'rgba(255, 217, 73, .3)' }
                ]
            }
        },
    }, 
    {
        type: 'pictorialBar',
        symbolPosition: 'end',
        data: [700, 800, 900, 500, 500],
        symbol: 'diamond',
        symbolOffset: ['22%', '-50%'],
        symbolSize: [20, 10],
        tooltip: {
            show: false
        },
        legend: {
            show: false,
        },
        itemStyle: {
            borderColor: '#32ffee',
            color: '#32ffee'
        },
    },
     {
        z: 2,
        type: 'bar',
        name: '10亿元以上',
        barWidth: 20,
        data: [700, 800, 900, 500, 500],
        itemStyle: {
            color: {
                type: 'linear',
                x: 0, x2: 1, y: 0, y2: 0,
                colorStops: [
                    { offset: 0, color: 'rgba(29, 245, 160, .7)' },
                    { offset: 0.5, color: 'rgba(29, 245, 160, .7)' },
                    { offset: 0.5, color: 'rgba(29, 245, 160, .3)' },
                    { offset: 1, color: 'rgba(29, 245, 160, .3)' }
                ]
            }
        },
    }
    ]
};
const option2 = {
    tooltip: {
        ...TOOLTIP_STYLE,
        formatter(e) {
            return  e.seriesName +  Math.abs(e.value)
        }
    },
    backgroundColor: 'rgb(15,54,95)',
    grid: [
        {
            show: false,
            left: '30',
            top: fontSize(0.2),
            bottom: fontSize(1.5),
        },
        {
            show: false,
            left: '30',
            top: '50',
            bottom: '55%',
        },
        {
            show: false,
            left: '30',
            top: fontSize(1.4),
            bottom: '24',
        },
    ],
    yAxis: [
        {
            type: 'value',
            name: '亿元以上',
            nameLocation: 'center',
            nameTextStyle: {
                color: '#fff',
                align: 'center',
                padding: -10,
                fontSize: 12,
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
                color: "#fff",
            },
            splitNumber: 3,
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#087FBE'

                }
            },
        },
        {
            gridIndex: 1,
            show: false,
        },
        {
            name: '亿元以下',
            nameLocation: 'center',
            nameTextStyle: {
                align: 'center',
                color: '#fff',
                padding: -10,
                fontSize: 12,
            },
            gridIndex: 2,
            type: 'value',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
                color: "#fff",
            },
            splitNumber: 3,
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#087FBE'
                }
            },
        },
    ],
    xAxis: [
        {
            gridIndex: 0,
            show: false,
            data: ['乡镇1', '乡镇2', '乡镇3', '乡镇4'],

            axisLine: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
        },
        {
            gridIndex: 1,
            type: 'category',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
                interval: 0,
                align: 'auto',
                verticalAlign: 'middle',
                textStyle: {
                    color: "#fff",
                    fontSize: 16,
                    align: 'center',
                    backgroundColor: '#4B95D8',
                    padding: 2
                },
            },
            data: ['乡镇1', '乡镇2', '乡镇3', '乡镇4'],
        },
        {
            gridIndex: 2,
            show: false,
            data: ['乡镇1', '乡镇2', '乡镇3', '乡镇4'],
            axisLine: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
        },
    ],
    series: [
        {
            name: '亿元以上',
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: [4,9,20,32],
            barWidth: 20,
            label: {
                show: true,
                fontSize: 14,
                position: 'top',
                color: '#fff'
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
                        {
                            offset: 0,
                            color: 'rgba(33,221,252,1)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(33,221,252,0.3)',
                        },
                    ]),
                    opacity: 0.8,
                },
            },
        },
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    color: 'rgba(255,255,255,0.1)',
                },
            },
            silent: true,
            barWidth: 50,
            barGap: '-175%',
            data: [32,32,32,32],
        },
        {
            name: '上部圆',
            type: 'pictorialBar',
            silent: true,
            symbolSize: [20, 8],
            symbolOffset: [-7.5, -4],
            symbolPosition: 'end',
            z: 12,
            color: '#5BFCF4',
            data: [4,9,20,32],
        },
        {
            name: '底部圆',
            type: 'pictorialBar',
            silent: true,
            symbolSize: [20, 8],
            symbolOffset: [-7.5, 4],
            z: 12,
            color: '#5BFCF4',
            data: [4,9,20,32],
        },
        {
            name: '亿元以下',
            type: 'bar',
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: [-4,-9,-20,-32],
            barWidth: 20,
            label: {
                show: true,
                fontSize: 14,
                position: 'bottom',
                formatter(e) {
                    return Math.abs(e.value)
                },
                color: '#fff'
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
                        {
                            offset: 0,
                            color: 'rgba(246,113,113,0.3)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(246,113,113,1)',
                        },
                    ]),
                },
            },
        },
        {
            type: 'bar',
            xAxisIndex: 2,
            yAxisIndex: 2,
            itemStyle: {
                normal: {
                    color: 'rgba(255,255,255,0.1)',
                },
            },
            silent: true,
            barWidth: 50,
            barGap: '-175%',
            data: [-32,-32,-32,-32],

        },
        {
            name: '上部圆',
            xAxisIndex: 2,
            yAxisIndex: 2,
            type: 'pictorialBar',
            silent: true,
            symbolSize: [20, 8],
            symbolOffset: [-7.5, 4],
            symbolPosition: 'end',
            z: 12,
            color: 'rgba(246,113,113,0.8)',
            data:  [-4,-9,-20,-32],
        },
        {
            name: '底部圆',
            xAxisIndex: 2,
            yAxisIndex: 2,
            type: 'pictorialBar',
            silent: true,
            symbolSize: [20, 8],
            symbolOffset: [-7.5, -4],
            z: 12,
            color: 'rgba(246,113,113,1)',
            data:  [-4,-9,-20,-32],
        },
    ],
}

const option3 = {
    tooltip: {
        ...TOOLTIP_STYLE
    },
    grid: {
        top: '23%',
        left: '2%',
        right: '2%',
        bottom: '0',
        containLabel: true,
    },
    xAxis: {
        type: 'category',
        splitLine: {
            show: false,
        },
        axisLabel: {
            color: "#ffffff",
            fontSize: 12,
            interval: 'auto', // x轴间距
            rotate: 20
        },
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(152, 212, 255, .5)',
            }
        },
        data: ['部门1', '部门2', '部门3', '部门4']
    },
    yAxis: {
        type: 'value',
        interval: 100,
        axisTick: {
            show: false
        },
        axisLabel: {
            show: true,
            fontSize: 12,
            color: "#fff",
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: 'rgba(152, 212, 255, .5)',
            }
        },
        splitLine: {
            type: 'dashed',
            lineStyle: {
                color: 'rgba(152, 212, 255, .1)',
            }
        },
        nameTextStyle: {
            color: "#fff",
            fontWeight: 400,
            fontSize: 12,
        },
    },
    series: [
        {
            data: [80, 200, 150, 300],
            type: "pictorialBar",
            markPoint: {
                data: [],
                tooltip: {
                    show: false,
                },
                zIndex: 11,
                symbolSize: [40, 20],
                label: {
                    offset: [0, 0, 0, 0],
                    show: true,
                    fontSize: fontSize(0.12),
                    color: '#fff',
                    padding: [40, 0, 0, 0],
                },
                symbolOffset: [0, -20]
            },
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                    offset: 0,
                    color: 'rgba(51, 198, 255, 1)'
                }, {
                    offset: 1,
                    color: 'rgba(51, 198, 255, 0)'
                }])
            },
            zlevel: 2,
            symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
        },
        {
            type: "bar",
            barWidth: 40,
            barGap: "-100%",
            data: [400, 400, 400, 400], //背景阴影长度
            itemStyle: {
                normal: {
                    color: "rgba(255,255,255,0.1)",
                    barBorderRadius: [0, 0, 0, 0],
                },
            },
            tooltip: {
                show: false,
            },
            zlevel: 1
        },
    ]
};
const option4 = {}
const option5 = {}
const option6 = {}



export { option1, option2, option3, option4, option5, option6 }