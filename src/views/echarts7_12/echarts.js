import {util} from "../../common/util";
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
function fontSize(res) {
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1920);
    return res * fontSize;
}
// 字体适配
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
let TOOLTIP_STYLE1 = {
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
    formatter(params) {
        let toolVal = '';
        toolVal = params[0].marker +" " + '适龄人口占比：' + params[0].data
        return toolVal
        // console.log(params)
    }
}
const option1 = {
    tooltip: {
        trigger: 'axis',
        ...TOOLTIP_STYLE1
    },
    grid: {
        left: '50',
        right: '10',
        bottom: '50',
        top: '40',
    },
    // legend: {
    //     top: '6%',
    //     right: '1%',
    //     icon: 'circle',
    //     textStyle: {
    //         fontSize: fontChart(1.4),
    //         color: '#fff'
    //     },
    //     data: ['失业人口', '适龄人口占比']
    // },
    xAxis: [{
        type: 'category',
        data: ['商业用地', '综合用地', '住宅用地', '工业用地', '其他用地'],
        axisPointer: {
            type: 'shadow'
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
                fontSize: fontChart(1.2),

            }
        },
    }],
    yAxis: [{
        interval: util.intervalFnc([200, 490, 700, 232, 256, 767, 136, 162, 326, 200, 644, 330]),
        max: util.maxFnc([200, 490, 700, 232, 256, 767, 136, 162, 326, 200, 644, 330]),
        show: true,
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
            symbol: ['none', 'arrow'], // 轴线两端箭头，两个值，none表示没有箭头，arrow表示有箭头
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
                fontSize:fontChart(1.2),

            }
        },
    }, ],
    series: [{
        name: '失业人口',
        type: 'bar',
        tooltip: {
            valueFormatter: function(value) {
                return value + ' ml';
            }
        },
        barWidth: fontChart(1.8),
        //设置柱状图渐变颜色
        itemStyle: {
            normal: {
                // 柱状图颜色
                color: params => {
                    //  colorList是每根柱子的颜色，一组是一个渐变
                    var colorList = [
                        ['rgba(2,99,255,0)', 'rgba(2,99,255,1)'],
                        ['rgba(2,99,255,0)', 'rgba(2,99,255,1)'],
                        ['rgba(255,119,35, 0)', 'rgba(255,119,35, 1)'],
                        ['rgba(142,48,255, 0)', 'rgba(142,48,255, 1)'],
                        ['rgba(55,179,53, 0)', 'rgba(55,179,53, 1)'],
                        ['rgba(185,46,42, 0)', 'rgba(185,46,42, 1)'],
                        ['#F75271', '#754ABF']
                    ]
                    var index = params.dataIndex
                    // 柱子个数超过colorList设置的个数，循环使用
                    if (index >= colorList.length) {
                        index = index - colorList.length
                    }
                    // 这里的this.$echarts是项目中的echarts示例，改成对应的名字就好
                    return new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 1,
                        color: colorList[index][1]
                    }, {
                        offset: 0,
                        color: colorList[index][0]
                    }])
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#fff',
                        fontSize: fontChart(1.2),
                    }
                }
            }
        },
        data: [
            200, 490, 700, 232, 256, 767, 136, 162, 326, 200, 644, 330
        ]
    }, ]
};
const option2 = {
    color: ['#F4A715'],
    tooltip: {
        ...TOOLTIP_STYLE, ...{
            trigger: 'axis',
        }
    },
    legend: {
        top: '6%',
        right: '1%',
        itemHeight: fontSize(0.12),
        textStyle: {
            fontSize: fontSize(0.14),
            color: '#fff'
        },
        data: [{name: '地块数量', icon: 'circle',}, {name: '地块面积'}]
    },

    grid: {
        left: '40',
        right: '50',
        bottom: '62',
        top: '54',
    },
    xAxis: {
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
                fontSize: fontSize(0.12),
            }
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(3, 49, 77, 1)',
            },
        },
        data: ['杭州', '宁波', '温州', '绍兴', '嘉兴', '湖州', '金华', '台州', '衢州', '丽水', '舟山']
    },
    yAxis: [{
        type: 'value',
        interval: util.intervalFnc([220, 182, 191, 234, 290, 330, 310, 220, 182, 211, 254]),
        max: util.maxFnc([220, 182, 191, 234, 290, 330, 310, 220, 182, 211, 254]),
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
            symbol: ['none', 'arrow'],     // 轴线两端箭头，两个值，none表示没有箭头，arrow表示有箭头
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
                fontSize: fontSize(0.12),
            }
        },
    },
        {
            type: 'value',
            min: 0,
            interval: util.intervalFnc([120, 100, 50, 200, 136, 110, 120, 150, 170, 136, 213]),
            max: util.maxFnc([120, 100, 50, 200, 136, 110, 120, 150, 170, 136, 213]),
            splitLine: {
                show: false,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(3, 49, 77, 1)',
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(3, 49, 77, 1)',
                },
                symbol: ['none', 'arrow'],     // 轴线两端箭头，两个值，none表示没有箭头，arrow表示有箭头
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff',
                    fontSize: fontSize(0.12),
                }
            },
        },

    ],
    series: [{
        name: '地块数量',
        type: 'bar',
        barWidth: fontSize(0.16),
        label: {
            fontSize: fontSize(0.16),
            fontWeight: 'bold',
            color: '#fff',
            show: true,
            position: 'top',
            backgroundColor: 'transparent',
        },
        itemStyle: {
            normal: {
                borderWidth: 1,
                borderColor: '#18CEE2',
                barBorderRadius: fontSize(0.03),
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                        {offset: 0, color: 'rgba(0, 213, 255, 1)'},
                        {offset: 1, color: 'rgba(0, 171, 255, 1)'}
                    ]
                )
            },

        },
        data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 211, 254,]
    }, {
        name: '地块数量',
        tooltip: {
            show: false
        },
        type: 'pictorialBar',
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                        {offset: 1, color: 'rgba(0, 121, 182, 0.8)'},
                        {offset: 1, color: 'rgba(0, 121, 182, 0.8)'}
                    ]
                ),
                borderWidth: 1,
                borderColor: '#18CEE2'
            }
        },
        symbol: 'circle',
        symbolSize: [fontSize(0.16), fontSize(0.05)],
        symbolPosition: 'end',
        data: [221, 183, 192, 235, 291, 331, 312, 221, 182, 212, 255],
        z: 3
    }, {
        name: '地块面积',
        type: 'line',
        symbol: 'none',
        yAxisIndex: 1,
        lineStyle: {
            color: '#F4A715'
        },
        areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(244, 167, 21, 0.5)'
            },
                {
                    offset: 1,
                    color: 'rgba(244, 167, 21, 0.1)'
                }
            ])
        },
        emphasis: {
            focus: 'series'
        },
        data: [120, 100, 50, 200, 136, 110, 120, 150, 170, 136, 213]
    }]

};

const option3 = {
    tooltip: {
        ...TOOLTIP_STYLE, ...{
            trigger: 'axis',
        },
        axisPointer: {
            type: 'none'
        },
        formatter: function (params) {
            return params[0].marker +  params[0].name + ': ' + params[0].value;
        }
    },
    grid: {
        top: '50',
        left: '1%',
        right: '4%',
        bottom: '55',
        containLabel: true
    },
    xAxis: {
        data: ['项目1', '项目2', '项目3', '项目4', '项目5', '项目6'],
        axisTick: {show: false},
        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(3, 49, 77, 1)',
            },
        },
        axisLabel: {
            color: '#fff'
        }
    },
    yAxis: {
        interval: util.intervalFnc([123, 60, 25, 71, 33, 51]),
        max: util.maxFnc([123, 60, 25, 71, 33, 51]),
        min: 0,
        splitNumber: 4,
        axisLabel: {
            color: '#fff',
            fontSize: fontSize(0.12)
        },
        splitLine: {
            lineStyle: {
                type: 'dashed',
                color: 'rgba(3, 49, 77, 1)',
            }
        },

        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(3, 49, 77, 1)',
            },
            symbol: ['none', 'arrow'],     // 轴线两端箭头，两个值，none表示没有箭头，arrow表示有箭头
        }
    },
    series: [
        {
            label: {
                show: true,
                position: 'top',
                fontSize: fontSize(0.12),
                color: '#fff'
            },
            name: 'hill',
            type: 'pictorialBar',
            barCategoryGap: '-20%',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {offset: 0, color: 'rgba(228, 187, 40, 1)'},
                    {offset: 1, color: 'rgba(205, 166, 29, 0.3)'}
                ])
            },
            emphasis: {
                itemStyle: {
                    opacity: 1
                }
            },

            data: [123, 60, 25, 71, 33, 51],
            z: 10
        }
    ]
};
const option4={
    color: ['rgba(0, 157, 226, 1)'],
    tooltip: {
        ...TOOLTIP_STYLE, ...{
            trigger: 'axis',
        },

        axisPointer: {
            label: {
                show: true
            },
            type: 'line',
            axis: 'x',
            lineStyle: {
                type: 'solid',
                color: 'rgba(255, 219, 166, 1)',
                shadowBlur: {
                    shadowColor: 'rgba(255, 255, 255, 0.1200)',
                    shadowBlur: 10
                }

            }
        }
    },
    grid: {
        left: '1%',
        right: '4%',
        bottom: '10',
        top: '60',
        containLabel: true
    },
    xAxis: [
        {
            axisTick: {show: false},
            axisLabel: {
                color: '#fff'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(3, 49, 77, 1)',
                },
            },
            data: ['杭州', '宁波', '温州', '绍兴', '嘉兴', '湖州', '金华', '台州', '衢州', '丽水', '台州']
        }
    ],
    yAxis: [
        {
            interval: util.intervalFnc([120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90]),
            max: util.maxFnc([120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90]),
            min: 0,
            splitNumber: 4,
            axisLabel: {
                color: '#fff',
                fontSize: fontSize(0.12)
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(3, 49, 77, 1)',
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(3, 49, 77, 1)',
                },
                symbol: ['none', 'arrow'],     // 轴线两端箭头，两个值，none表示没有箭头，arrow表示有箭头
            }
        }
    ],
    series: [
        {
            name: '',
            symbol: "none",
            type: 'line',
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(0, 157, 226, 1)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 157, 226, 0.2)'
                    }
                ])
            },

            data: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90]
        },

    ]
}
const TOOLTIP_STYLE5 = {
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
    formatter(params) {
        let toolVal = '';
        toolVal = params[0].marker +" " + '适龄人口占比：' + params[0].data
        return toolVal
    }
}
const option5 = {
    tooltip: {
        trigger: 'axis',
        ...TOOLTIP_STYLE5
    },

    grid: {
        left: '50',
        right: '10',
        bottom: '40',
        top: '40',
    },

    legend: {
        top: '6%',
        right: '1%',
        icon: 'circle',
        textStyle: {
            fontSize:fontChart(1.4),
            color: '#fff'
        },
        data: ['失业人口', '适龄人口占比']
    },
    xAxis: [{
        type: 'category',
        data: ['杭州', '宁波', '温州', '绍兴', '嘉兴', '湖州', '金华', '台州', '衢州', '丽水', '舟山'],
        axisPointer: {
            type: 'shadow'
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
                fontSize:fontChart(1.4),

            }
        },
    }],
    yAxis: [{
        interval: util.intervalFnc([200, 490, 700, 232, 256, 767, 136, 162, 326, 200, 644, 330]),
        max: util.maxFnc([200, 490, 700, 232, 256, 767, 136, 162, 326, 200, 644, 330]),
        show: true,
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
            symbol: ['none', 'arrow'], // 轴线两端箭头，两个值，none表示没有箭头，arrow表示有箭头
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
                fontSize: fontChart(1.2),

            }
        },
    }, ],
    series: [{
            name: '失业人口',
            type: 'bar',
            tooltip: {
                valueFormatter: function(value) {
                    return value + ' ml';
                }
            },
            barWidth:fontChart(1.6),
            //设置柱状图渐变颜色
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 1,
                        color: "#3883C0" // 0% 处的颜色
                    }, {
                        offset: 0,
                        color: "#67DAD3" // 100% 处的颜色
                    }], false),
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#67DAD3',
                            fontSize:fontChart(1.2),
                        }
                    }
                },
            },
            data: [
                200, 490, 700, 232, 256, 767, 136, 162, 326, 200, 644, 330
            ]
        },
    ]
};

const option6 = {
    tooltip: {
        ...TOOLTIP_STYLE, ...{
            trigger: 'axis',
        }
    },
    color: ['rgba(84, 56, 161, 1)', 'rgba(74, 204, 126, 1)', 'rgba(35, 80, 198, 1)'],
    legend: {
        top: '6%',
        right: '10%',
        icon: 'circle',
        itemHeight: fontSize(0.12),
        textStyle: {
            fontSize: fontSize(0.14),
            color: '#fff'
        },
        data: ['本科', '硕士', '博士']
    },

    grid: {
        left: '1%',
        right: '4%',
        bottom: '35',
        containLabel: true
    },
    xAxis: [
        {
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#fff',
                fontSize: fontSize(0.12)
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(3, 49, 77, 1)',
                },
            },
            type: 'category',
            boundaryGap: false,
            data: ['杭州', '宁波', '温州', '绍兴', '嘉兴', '湖州', '金华', '台州', '衢州', '丽水', '舟山']
        }
    ],
    yAxis: [
        {
            interval: util.intervalFnc([150, 232, 201, 154, 190, 330, 410, 154, 190,
                330, 100,320, 332, 301, 334, 390, 330, 320, 301, 334, 390, 330]),
            max: util.maxFnc([150, 232, 201, 154, 190, 330, 410, 154, 190, 330,
                100,320, 332, 301, 334, 390, 330, 320, 301, 334, 390, 330]),
            type: 'value',
            axisLabel: {
                color: '#fff',
                fontSize: fontSize(0.12)
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(3, 49, 77, 1)',
                },
                symbol: ['none', 'arrow'],     // 轴线两端箭头，两个值，none表示没有箭头，arrow表示有箭头
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(3, 49, 77, 1)',
                }
            },
        }
    ],
    series: [
        {
            smooth: true,
            symbol: "none",
            name: '本科',
            type: 'line',
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(84, 56, 161, 1)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(84, 56, 161, 0.2)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410, 154, 190, 330, 100]
        },
        {
            smooth: true,
            symbol: "none",
            name: '硕士',
            type: 'line',
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(74, 204, 126, 1)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(74, 204, 126, 0.2)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320, 301, 334, 390, 330]
        },
        {
            smooth: true,
            symbol: "none",
            name: '博士',
            type: 'line',
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(35, 80, 198, 1)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(35, 80, 198, 0.2)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [120, 132, 101, 234, 190, 130, 132, 234, 190, 130, 132]
        }
    ]
}


export { option1 ,option2,option3,option4,option5,option6}