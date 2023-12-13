import * as echarts from 'echarts';

export const initLine01 = (dom) => {
    let option = {
        tooltip: {
            trigger: 'axis',
            // formatter: '{b}：{c}个',
            backgroundColor: 'rgba(0, 0, 0, 0.63)', //设置背景颜色
            textStyle: {
                color: '#fff'
            },
            borderColor: "rgba(255,255,255, .5)",
            // formatter: function(params) {
            //     return params[0].name + '<br/>' +
            //         "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(1, 251, 246, 1)'></span>" +
            //         params[0].seriesName + ' : ' + Number((params[0].value.toFixed(4) / 1).toFixed(2)).toLocaleString() + ' 个<br/>'
            // }
            axisPointer: {
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(0, 255, 233,0)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(255, 255, 255,1)',
                        }, {
                            offset: 1,
                            color: 'rgba(0, 255, 233,0)'
                        }],
                        global: false
                    }
                },
            },
        },
        grid: {
            top: '15%',
            left: '0',
            right: '5%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(68, 82, 100, 1)'
                }
            },
            axisLabel: {
                color: 'rgba(187, 200, 225, 1)',
                fontSize: 16,
                // color: '#fff',
                // rotate: 0,
                // margin: 10,
                interval: 0,
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            data: ['交通', '农业农村', '水利', '能源', '社会民生', '生态环保', '城镇化'],
            boundaryGap: false,
        }],

        yAxis: [{
            show: false,
            type: 'value',
            name: '项目数(个)',
            nameTextStyle: {
                color: '#fff',
                fontSize: '11px',
            },
            min: 0,
            max: 500,
            splitNumber: 6,
            splitLine: {
                show: true,
                interval: '0',
                lineStyle: {
                    color: ['rgba(38, 54, 122, .58)'],
                    type: 'dashed',
                    width: 1
                }
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                // margin: 10,
                fontSize: 12,
                color: 'rgba(198, 207, 255, 1)'
            },
            axisTick: {
                show: false,
            },
        }],
        series: [{
            name: '项目数量',
            type: 'line',
            width: 3,
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
                color: "rgba(0, 215, 229, 1)",
            },
            label: {
                show: true,
                position: 'top',
                color: 'rgba(0, 145, 246, 1)',
                fontSize: 16,
                fontWeight: 'bold'
            },
            itemStyle: {
                color: "#fff",
                borderColor: "rgba(0, 215, 229, 1)",
                borderWidth: 3,
            },
            tooltip: {
                show: true
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'rgba(0,215,229,0.29)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(4,231,160,0)'
                        }
                    ],
                    global: false // 缺省为 false
                }
            },
            data: [300, 242, 260, 350, 400, 402, 360]
        }
        ]
    };
    const chartDom = document.getElementById(dom);
    const myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}

export const initLine02 = (dom) => {
    const GRID = {
        left: '60',
        right: '60',
        bottom: '80',
        top: '62',
    }
    const TOOLTIP_STYLE = {
        backgroundColor: 'rgba(0, 24, 62, 0.6)',
        borderWidth: 0,
        extraCssText: 'box-shadow: 0px 0px 14px 0px rgba(63, 129, 255, 0.8);color: #fff',
        textStyle: {
            color: '#fff',
            fontSize: 14,
        },
        axisPointer: {
            type: 'shadow'
        }
    };
    let option = {
        title: {
            text: '',
        },
        tooltip: {
            ...TOOLTIP_STYLE, ...{
                trigger: 'axis',
            }
        },
        legend: {
            icon: 'rect',
            top: 5,
            right: 0,
            itemWidth: 12,
            itemHeight: 12,
            padding: 0,
            textStyle: {
                color: '#BFD1FB',
                fontSize: 18,
                padding: [2, 0, 0, 10],
            },
            data: [],
        },
        grid: {
            ...GRID
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
                fontSize: 18
            },
        },
        xAxis: {
            axisLabel: {
                show: true,
                color: 'rgba(124, 147, 200, 1)',
                fontSize: 18,
                lineHeight: 90,
                interval: 0,
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
                // 下半截柱子
                name: '',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 12,
                showSymbol: false,
                itemStyle: {
                    color: 'rgba(12, 247, 237, 1)',
                    lineStyle: {
                        color: "rgba(12, 247, 237, 1)",
                        width: 2
                    },
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(28, 252, 247, 0.2000)'
                    },
                        {
                            offset: 1,
                            color: 'rgba(12, 247, 237, 0)'
                        }
                    ], false),
                },
                data: [32.1, 20.2, 9.5, 4.2, 2.3],
            },
        ],
    }
    const chartDom = document.getElementById(dom);
    const myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}

export const initLine03 = (dom) => {
    const GRID = {
        left: '60',
        right: '60',
        bottom: '80',
        top: '62',
    }
    const TOOLTIP_STYLE = {
        backgroundColor: 'rgba(0, 24, 62, 0.6)',
        borderWidth: 0,
        extraCssText: 'box-shadow: 0px 0px 14px 0px rgba(63, 129, 255, 0.8);color: #fff',
        textStyle: {
            color: '#fff',
            fontSize: 14,
        },
        axisPointer: {
            type: 'shadow'
        }
    };
    let option = {
        title: {
            text: '',
        },
        tooltip: {
            ...TOOLTIP_STYLE, ...{
                trigger: 'axis',
            }
        },
        legend: {
            icon: 'rect',
            top: 5,
            right: 0,
            itemWidth: 12,
            itemHeight: 12,
            padding: 0,
            textStyle: {
                color: '#BFD1FB',
                fontSize: 18,
                padding: [2, 0, 0, 10],
            },
            data: ['排污权市场定价交易占比', '排污权二级市场交易同比'],
        },
        grid: {
            ...GRID
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
                fontSize: 18,
            },
        },
        xAxis: {
            axisLabel: {
                show: true,
                color: 'rgba(124, 147, 200, 1)',
                fontSize: 18,
                lineHeight: 90,
                interval: 0,
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
                name: '排污权市场定价交易占比',
                type: 'line',
                smooth: false,
                symbol: 'circle',
                symbolSize: 12,
                itemStyle: {
                    color: 'rgba(255, 151, 58, 1)',
                },
                emphasis: {
                    label: {
                        show: true,
                        color: '#fff',
                        fontSize: 18,
                        formatter: (params) => {
                            return `[${params.value}]`
                        }
                    }
                },
                data: [20, 3, 12, 30, 40, 10, 20, 30, 50]
            },
            {
                name: '排污权二级市场交易同比',
                type: 'line',
                smooth: false,
                symbol: 'circle',
                symbolSize: 12,
                itemStyle: {
                    color: 'rgba(38, 255, 183, 1)',
                },
                emphasis: {
                    label: {
                        show: true,
                        color: '#fff',
                        fontSize: 18,
                        formatter: (params) => {
                            return `[${params.value}]`
                        }
                    }
                },
                data: [40, 6, 7, 20, 10, 20, 20, 20, 10]
            }
        ],
    }
    const chartDom = document.getElementById(dom);
    const myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}
