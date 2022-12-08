import {util} from "../../common/util";
const circle = require('./icon-echarts-circle.png')
const echarts = require('echarts');
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
        fontSize:fontChart(1.4),
    },
    axisPointer: {
        type: 'shadow'
    },
    formatter(e, v) {
        if (e.name) {
            return e.marker + e.name + ": " + e.value + "<br/>"  + '  ' +  "占比 " + e.percent + '%'
        }
    },
}
const option1 = {
    tooltip: {
        trigger: 'item',
        ...TOOLTIP_STYLE1
    },
    color: ['rgba(0, 81, 204, 1)', 'rgba(0, 137, 230, 1)', 'rgba(0, 168, 143, 1)',
        'rgba(92, 198, 68, 1)', 'rgba(210, 177, 17, 1)', 'rgba(99, 105, 255, 1)'
    ],
    grid: {
        left: '20',
        right: '20',
        bottom: '30',
        top: '60',
    },

    series: [{
            name: '产业用电量',
            type: 'pie',
            radius: ['50%', '85%'],
            avoidLabelOverlap: false,
            itemStyle: {
                normal: {
                    borderWidth: 5,
                    borderColor: "#0B162F"
                    //颜色和背景色一致
                },
            },

            label: {
                fontWeight: 400,
                color: '#A8B7E0',
            },
            data: [
                { value: 33, name: '二氧化硫排放总量' },
                { value: 68, name: '工业废气排放总量' },
                { value: 12, name: '废水排放总量' },
                { value: 21, name: '氨氮排放量' },
                { value: 56, name: '氮氧化物排放量' },
                { value: 76, name: '烟(粉)尘排放总量' },

            ]
        },
        {

            type: 'pie',
            radius: ['35%', '45%'],
            avoidLabelOverlap: false,
            color: 'rgba(35, 80, 133, 0.2700)',
            label: {
                show: false,
                position: 'center'
            },
            itemStyle: {
                borderColor: '#0c1932',
                borderWidth: 2
            },
            emphasis: {
                label: {
                    show: false,
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 100 },
                { value: 33 },
                { value: 33 },

            ]
        }
    ]
};
const option2 = {
    tooltip: {
        trigger: 'axis',
        ...TOOLTIP_STYLE
    },
    title: {
        text: '生态环境和公共设施投资本年完成投资比去年同期增减情况',
        left: 'center',
        top: 20,
        textStyle: {
            fontWeight: 'normal',
            fontSize: fontSize(0.14),
            color: 'rgba(255, 193, 106, 1)'
        }
    },
    grid: {
        left: '50',
        right: '10',
        bottom: '60',
        top: '70',
    },
    xAxis: [{
        type: 'category',
        data: ['杭州', '宁波', '温州', '绍兴', '嘉兴', '湖州', '金华', '台州', '衢州', '丽水', '舟山'],
        axisPointer: {
            type: 'shadow'
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
                fontSize: fontSize(0.12),
            }
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(3, 49, 77, 1)',
            },
        },
    }],
    yAxis: [{
        interval: util.intervalFnc([ 100, 90, 60, 26, 28, 70, 175, 182, 487, 188, 60, 23, 200, 490, 700, 232, 256, 767, 136, 162, 326, 200, 644, 330]),
        max: util.maxFnc([100, 90, 60, 26, 28, 70, 175, 182, 487, 188, 60, 23, 200, 490, 700, 232, 256, 767, 136, 162, 326, 200, 644, 330]),
        type: 'value',
        splitLine: { // 分隔线
            show: true, // 默认显示，属性show控制显示与否
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'rgba(3, 49, 77, 1)',
                width: 1,
                type: 'dashed'
            }
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(3, 49, 77, 1)',
            },
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
                fontSize: fontSize(0.12),

            }
        },
    }, ],
    series: [{
        name: '生态环境投资',
        type: 'bar',
        barWidth: fontSize(0.1),
        //设置柱状图渐变颜色
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 1,
                    color: "rgba(72, 246, 255, 1)" // 100% 处的颜色
                },{
                    offset: 0,
                    color: "rgba(126, 251, 255, 0.1)" // 0% 处的颜色
                }]),

            },

        },
        data: [
            200, 490, 700, 232, 256, 767, 136, 162, 326, 200, 644, 330
        ]
    },
        {
            name: '公共设施投资',
            type: 'bar',
            color: 'rgba(96, 183, 255, 1)',
            barWidth: fontSize(0.1),
            //设置柱状图渐变颜色
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 1,
                        color: "rgba(96, 183, 255, 1)" // 100% 处的颜色
                    },{
                        offset: 0,
                        color: "rgba(96, 183, 255, 0)" // 0% 处的颜色
                    }])
                }
            },
            data: [
                100, 90, 60, 26, 28, 70, 175, 182, 487, 188, 60, 23
            ]
        },
    ]
}

const option3 =  {
    color: ['rgba(255, 142, 238, 1)', 'rgba(46, 154, 245, 1)', 'rgba(67, 97, 238, 1)', 'rgba(58, 13, 163, 1)',
        'rgba(114, 10, 183, 1)', 'rgba(247, 36, 133, 1)', 'rgba(254, 122, 91, 1)', 'rgba(255, 136, 0, 1)',
        'rgba(255, 209, 0, 1)', 'rgba(0, 216, 154, 1)', 'rgba(77, 88, 96, 1)'],
    title: {
        text: '（万吨）',
        left: '18%',
        top: 'center',
        textStyle: {
            fontWeight: 'normal',
            fontSize: fontSize(0.14),
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'item',
        ...TOOLTIP_STYLE
    },
    legend: {
        top: 'center',
        orient: 'vertical',
        icon: 'rect',
        itemWidth: fontSize(0.14),
        itemHeight: fontSize(0.14),
        itemGap: fontSize(0.4),
        right: '8%',
        textStyle: {
            fontSize: fontSize(0.12),
            color: '#fff'
        }
    },
    series: [
        {
            name: '工业排放总量',

            type: 'pie',
            radius: ['46%', '70%'],
            center: ['24%', '50%'],
            avoidLabelOverlap: false,
            label: {
                color: '#fff',
                formatter(e, v) {
                    return e.value
                },
                position: 'inside',
                align: 'center',
                fontSize: fontSize(0.12),
                show: true,
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 10, name: '杭州' },
                { value: 7, name: '宁波' },
                { value: 8, name: '温州' },
                { value: 5, name: '绍兴' },
                { value: 4, name: '嘉兴' },
                { value: 4, name: '湖州' },
                { value: 4, name: '金华' },
                { value: 4, name: '台州' },
                { value: 4, name: '衢州' },
                { value: 4, name: '丽水' },
                { value: 4, name: '舟山' },
            ]
        }
    ]
};
const getIndicatorsEcharts4 = () => {
    return {
        title: {
            text: '',
        },
        tooltip: {
            ...TOOLTIP_STYLE, ...{
                trigger: 'axis',
                formatter: (params) => {
                    let content = ''
                    params.forEach((item, index) => {
                        if(item.seriesName) {
                            if(index === 0) {
                                content += `<div>${item.name}</div>`
                            }
                            content += `<div>${item.marker}${item.seriesName}<span style="margin-left: 20px;">${item.value}</span></div>`
                        }
                    });
                    return content
                }
            }
        },
        legend: {
            icon: 'rect',
            top: 0,
            right: 0,
            itemWidth: 8,
            itemHeight: 8,
            padding: 0,
            textStyle: {
                color: '#BFD1FB',
                fontSize: fontSize(0.14),
                padding: [2, 0, 0, 0],
            },
            data: [{
                name: '供应总量（公顷）',
                itemStyle: {
                    color: 'rgba(251, 255, 3, 1)'
                }
            }, {
                name: '同比增速（%）',
                itemStyle: {
                    color: '#04D99E'
                }
            }],
        },
        grid: {
            left: '40',
            right: '0',
            bottom: '30',
            top: '24',
        },
        yAxis: {
            splitLine: { // 分隔线
                show: true, // 默认显示，属性show控制显示与否
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'rgba(3, 49, 77, 1)',
                    width: 1,
                    type: 'dashed'
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(3, 49, 77, 1)',
                },
            },
            axisLabel: {
                show: true,
                color: 'rgba(112, 151, 215, 1)',
                fontSize: fontSize(0.12),
            },
        },
        xAxis: {
            axisLabel: {
                show: true,
                color: 'rgba(124, 147, 200, 1)',
                fontSize: fontSize(0.12),
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(3, 49, 77, 1)',
                },
            },
            data: ['杭州', '宁波', '温州', '绍兴', '嘉兴', '湖州', '金华', '台州', '衢州', '丽水', '舟山']
        },
        series: [
            {
                // 上半截柱子
                name: '',
                type: 'bar',
                barWidth: '18',
                barGap: '-100%',
                z: 0,
                itemStyle: {
                    //lenged文本
                    opacity: 1,
                    color: function (params) {
                        return new echarts.graphic.LinearGradient(
                            0,
                            0,
                            1,
                            0,
                            [
                                {
                                    offset: 0,
                                    color: 'rgba(51, 80, 165, 0.4000)', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(51, 80, 165, 0.4000)', // 100% 处的颜色
                                },
                            ],
                            false
                        );
                    },
                },
                data: [50, 50, 50, 50, 50],
            },
            {
                //最上面圆片
                name: '',
                type: 'pictorialBar',
                symbolSize: [18, 4],
                symbolOffset: [0, -2],
                z: 3,
                symbolPosition: 'end',
                itemStyle: {
                    color: 'rgba(24, 36, 69, 1)',
                    opacity: 1,
                },
                data: [50, 50, 50, 50, 50],
            },
            {
                // 下半截柱子
                name: '同比增速（%）',
                type: 'bar',
                barWidth: 18,
                barGap: '-100%',
                itemStyle: {
                    //lenged文本
                    opacity: 1,
                    color: function (params) {
                        return new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: '#04D99E', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(0, 255, 169, 0)', // 100% 处的颜色
                                },
                            ],
                            false
                        );
                    },
                },
                data: [32.1, 20.2, 9.5, 4.2, 2.3],
            },
            {
                //数据圆片
                name: '',
                type: 'pictorialBar',
                symbolSize: [18, 4],
                symbolOffset: [0, -2],
                z: 3,
                itemStyle: {
                    opacity: 1,
                    color: 'rgba(185, 243, 255, 1)'
                },
                symbolPosition: 'end',
                data: [32.1, 20.2, 9.5, 4.2, 2.3],
                label: {
                    show: true,
                    position: 'left',
                    distance: -770,
                    formatter: '{c}%'
                },
            },
            {
                name: '供应总量（公顷）',
                type: 'line',
                smooth: false,
                symbol: 'image://' + circle,
                symbolSize: 18,
                itemStyle: {
                    color: 'rgba(251, 255, 3, 1)',
                },
                data: [40, 6, 7, 20, 10, 20, 20, 20, 10]
            }
        ],
    }
}

const option4 = getIndicatorsEcharts4()
const option5 =''
const option6 = 
    {
        tooltip: {
            trigger: 'item',
            ...TOOLTIP_STYLE
        },
        legend: {
            icon: 'rect',
            itemWidth: fontChart(0.7),
            itemHeight: fontChart(0.7),
            right: '0%',
            itemGap: 18,
            orient: 'vertical', //垂直显示
            y: 'center', //延Y轴居中
            textStyle: {
                fontSize: fontChart(1.4),
                color: '#fff'
            },
        },

        color: ['#0263FF', '#FF7723', '#8E30FF', '#EBD662', '#C14E36', '#265FD0', '#177FBE', '#C7B759'],

        grid: {
            left: '0',
            right: '1000',
            bottom: '40',
            top: '50',
        },

        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['30%', '47%'], //性设置图的上下左右的位置
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: '居住用地' },
                { value: 735, name: '公共管理与公共服务设施用地A' },
                { value: 580, name: '商业服务业设施用地' },
                { value: 484, name: '行政办公用地' },
                { value: 300, name: '工业用地' }
            ]
        }]
    }



export { option1 ,option2,option3,option5,option6}