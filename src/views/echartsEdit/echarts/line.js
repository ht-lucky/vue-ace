import * as echarts from 'echarts';
import { fontSize, TOOLTIP_STYLE, GRID, _cnDic, _divisor, intervalFnc, maxFnc, fontChart } from "../../utils";
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
export const initLine04 = (dom) => {
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
    let option = {
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
                interval: intervalFnc([150, 232, 201, 154, 190, 330, 410, 154, 190,
                    330, 100, 320, 332, 301, 334, 390, 330, 320, 301, 334, 390, 330]),
                max: maxFnc([150, 232, 201, 154, 190, 330, 410, 154, 190, 330,
                    100, 320, 332, 301, 334, 390, 330, 320, 301, 334, 390, 330]),
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
    const chartDom = document.getElementById(dom);
    const myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}
export const initLine05 = (dom) => {
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
    let option = {
        tooltip: {
            trigger: 'axis',
            ...TOOLTIP_STYLE
        },
        grid: {
            left: '50',
            right: '10',
            bottom: '60',
            top: '30',
        },
        xAxis: {
            boundaryGap: true, // 默认，坐标轴留白策略
            axisLine: { // 坐标轴轴线相关设置。数学上的x轴
                show: true,
                lineStyle: {
                    color: 'rgba(3, 49, 77, 1)'
                }
            },


            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff',
                    fontSize: fontChart(1.2),
                }
            },

            splitLine: {
                show: false
            },
            axisTick: {
                show: false,
                alignWithLabel: true
            },
            data: ['杭州', '宁波', '温州', '绍兴', '嘉兴', '湖州', '金华', '台州', '衢州', '丽水', '舟山']
        },
        yAxis: {
            type: 'value',
            // name: '适龄人口占比',
            splitLine: { // 分隔线
                show: true, // 默认显示，属性show控制显示与否
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'rgba(3, 49, 77, 1)',
                    width: 1,
                    type: 'dashed'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff',
                    fontSize: fontChart(1.2),
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(3, 49, 77, 1)'
                },
                symbol: ['none', 'arrow'] // 轴线两端箭头，两个值，none表示没有箭头，arrow表示有箭头
            }
        },
        series: [
            //     {
            //     type: 'scatter',
            //     symbolSize: 5,
            //     itemStyle: {
            //         color: 'rgba(155, 210, 255, 1)'
            //     },
            //     silent: true,
            //     tooltip: {
            //         show: false
            //     },
            //     data: [2000, 1800, 2800, 900, 1600, 2000, 1800, 2800, 900, 1600, 888]
            // },
            {
                // showSymbol:false,
                type: 'line',
                symbol: 'circle',
                symbolSize: 20,
                symbol: 'path://M401.066667 426.666667h264.533333l-98.133333-170.666667h-68.266667l-98.133333 170.666667z m4.266666 42.666666l128 324.266667 128-324.266667h-256z m452.266667-42.666666l-123.733333-170.666667h-119.466667l98.133333 170.666667h145.066667z m21.333333 42.666666h-170.666666l-123.733334 311.466667 294.4-311.466667zM209.066667 426.666667h140.8l98.133333-170.666667H332.8l-123.733333 170.666667z m-21.333334 42.666666l294.4 311.466667L362.666667 469.333333H187.733333z m345.6 426.666667L128 465.066667 307.2 213.333333h448l179.2 251.733334L533.333333 896z',
                lineStyle: {
                    color: 'rgba(70, 84, 106, 1)'
                },
                itemStyle: {
                    color: 'rgba(3, 127, 255, 1)',
                    borderWidth: 1,
                    borderColor: 'rgba(3, 127, 255, 1)'
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'rgba(192, 219, 239, 1)'
                    }
                },

                data: [2000, 1800, 2800, 900, 1600, 2000, 1800, 2800, 900, 1600, 888]
            }]

    };
    const chartDom = document.getElementById(dom);
    const myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}
export const initLine06 = (dom) => {
    let symbolList = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow',
        'image://https://img1.baidu.com/it/u=2305450569,1175342556&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        'path://M19.1933327,10.8957556 C19.4554348,10.69545 19.783595,10.5782499 20.1138862,10.5889045 C20.3632028,10.5825117 20.6103884,10.6507009 20.8277413,10.7700319 C20.9364178,10.8275665 21.0344397,10.9064102 21.1345925,10.9788612 C23.6959473,12.8412772 26.2551713,14.7058242 28.8165261,16.5661094 C29.0402717,16.7259277 29.2192682,16.9454115 29.3236829,17.1989899 C29.5282503,17.6805758 29.4494066,18.2644453 29.1319009,18.677842 C28.9465116,18.9314204 28.6716241,19.1189406 28.3690348,19.204177 C28.2582274,19.2382716 28.1431583,19.2489261 28.03022,19.2638425 C28.0323509,21.6568554 28.0323509,24.0477374 28.03022,26.4407502 C28.3136311,26.4620593 28.5927804,26.5622121 28.8207879,26.7348159 C29.0956754,26.9393834 29.295981,27.2419727 29.3748247,27.5743948 C29.4557993,27.9196023 29.4174429,28.2946427 29.249101,28.6078866 C29.0466645,29.0084978 28.6481841,29.3025635 28.2070856,29.385669 C28.0259582,29.4218945 27.8405689,29.409109 27.6573106,29.4112399 L12.0675669,29.4112399 C11.8139885,29.409109 11.5582792,29.3430508 11.3366645,29.2151961 C11.0298133,29.0425924 10.7911513,28.7549194 10.6739512,28.4246282 C10.5865838,28.1859662 10.5674056,27.9238642 10.6100239,27.6724167 C10.6696894,27.3101618 10.8721259,26.9756088 11.1619298,26.7518632 C11.4474718,26.5259867 11.8161194,26.4194411 12.1762433,26.4386193 C12.1783742,24.0456064 12.1762433,21.6547245 12.1762433,19.2617116 C11.8907013,19.2446643 11.609421,19.1487733 11.3771518,18.9783005 C11.0148969,18.7119366 10.7890204,18.2772308 10.7719731,17.8297395 C10.7421403,17.3524155 10.9744096,16.8729605 11.3579736,16.5895494 C13.9747321,14.6930388 16.5829669,12.7943972 19.1933327,10.8957556 M19.8709624,15.0084136 C19.5513257,15.0510318 19.2615219,15.261992 19.1230127,15.5539267 C18.8779579,16.0717381 18.637165,16.5895494 18.3921102,17.1073607 C18.3537539,17.124408 18.3111356,17.1265389 18.2727792,17.1329317 C17.776277,17.2075135 17.2797748,17.2842263 16.7854035,17.3588082 C16.6490252,17.3801173 16.5169087,17.4312592 16.4018395,17.5058411 C16.103512,17.6933612 15.9245155,18.0513542 15.9500864,18.4029545 C15.9650028,18.6416165 16.0672865,18.8738858 16.2377594,19.0422278 C16.5787051,19.3938281 16.9239127,19.7432975 17.2648584,20.0948977 C17.3160003,20.1503014 17.3777967,20.1971815 17.4161531,20.2611088 C17.3287857,20.8108838 17.2371566,21.3606588 17.1476583,21.9104338 C17.1178256,22.0702521 17.1135637,22.238594 17.156182,22.3962814 C17.2243711,22.6562526 17.4033676,22.8863909 17.6398987,23.0142456 C17.8615134,23.1357075 18.1300082,23.1655403 18.375063,23.1016129 C18.5497977,23.0568638 18.6989614,22.9503183 18.8587797,22.8672127 C19.2295582,22.6626453 19.6024676,22.455947 19.9732461,22.2513795 C19.9924243,22.2428559 20.0158643,22.2215468 20.0371734,22.2364631 C20.5081047,22.4964343 20.979036,22.7564054 21.4478364,23.0163765 C21.7525566,23.1825875 22.1446442,23.171933 22.4387099,22.9865438 C22.7178593,22.8182018 22.9032485,22.502827 22.9096412,22.1746667 C22.916034,22.0105866 22.8734157,21.8486374 22.8499757,21.6866881 C22.7732629,21.2072332 22.6901574,20.7277783 22.6177064,20.2461924 C22.9714376,19.8860685 23.3230379,19.5238136 23.6767691,19.1615588 C23.7705292,19.0635369 23.8728129,18.9719077 23.9410021,18.8547076 C24.0795113,18.630962 24.1221295,18.3518127 24.0582022,18.0982343 C23.9878821,17.8041686 23.774791,17.5484593 23.4977726,17.4269974 C23.344347,17.3566773 23.1738742,17.3438918 23.0076631,17.3183209 C22.55591,17.2480009 22.102026,17.1819426 21.648142,17.1094917 C21.5970002,17.0327789 21.5671674,16.9432806 21.5245492,16.862306 C21.3476836,16.4872657 21.170818,16.1100945 20.9939524,15.7350542 C20.932156,15.6050686 20.8788832,15.4686903 20.7829922,15.3578829 C20.5677702,15.09365 20.2076463,14.9551408 19.8709624,15.0084136 M15.4450606,25.5010185 C15.3086823,25.5308513 15.1872203,25.6224805 15.1211621,25.7439424 C15.0359257,25.895237 15.0401875,26.0912808 15.1296858,26.2404446 C15.2000058,26.3597756 15.3214677,26.445012 15.457846,26.470583 C15.5239043,26.4833684 15.5920934,26.4791066 15.6602826,26.4791066 L24.4779916,26.4791066 C24.5973226,26.4791066 24.7166536,26.4343575 24.8061519,26.3533829 C24.9340065,26.2404446 24.993672,26.0593172 24.9617084,25.8931061 C24.9340065,25.729026 24.8146755,25.5841241 24.659119,25.5244586 C24.5483117,25.4754476 24.4268498,25.4924949 24.3096497,25.490364 L15.5473443,25.490364 C15.5132497,25.490364 15.4791551,25.4924949 15.4450606,25.5010185 L15.4450606,25.5010185 Z M19.0612163,18.0236524 C19.3851147,17.3545464 19.6919659,16.6747858 20.0158643,16.0035489 C20.30993,16.6279058 20.6018648,17.2522627 20.8959305,17.8787505 C20.9172396,17.9256305 20.9364178,17.9725105 20.9641196,18.0172597 C21.170818,18.057747 21.3817782,18.0833179 21.5906074,18.1174125 C22.0871096,18.1941253 22.5836119,18.2687071 23.0801141,18.3454199 C22.5729573,18.8717549 22.0594078,19.3938281 21.5479892,19.9180321 C21.6694511,20.6574582 21.790913,21.3947534 21.9081131,22.1341794 C21.2752326,21.7932337 20.6508757,21.4373716 20.0179952,21.0942949 C19.9604606,21.1092113 19.9135806,21.1475677 19.8624387,21.1731386 C19.2807001,21.4927753 18.7032232,21.8188046 18.1193537,22.1320485 C18.2344228,21.3926224 18.3622775,20.6553273 18.4773467,19.9159012 C17.9701899,19.3895663 17.4566404,18.869624 16.9494836,18.3454199 C17.4523786,18.2644453 17.9552735,18.1919944 18.4581685,18.1131507 C18.6584741,18.0833179 18.8587797,18.0470924 19.0612163,18.0236524 L19.0612163,18.0236524 Z',
        'path://M170.688 128h682.624c23.616 0 42.688 19.072 42.688 42.688v682.624a42.688 42.688 0 0 1-42.688 42.688H170.688A42.688 42.688 0 0 1 128 853.312V170.688C128 147.072 147.072 128 170.688 128z m42.624 85.312v597.376h597.376V213.312H213.312z',
        'path://M505.668923 74.919385c-17.142154 19.282708-34.282338 44.994954-100.688738 149.962831-32.143754 53.5552-59.984738 102.829292-85.698954 152.103385-49.274092 96.407631-98.548185 227.089723-98.548185 310.636308 2.140554 72.847754 29.993354 134.973046 85.698954 186.387692C364.266338 925.426215 430.682585 951.138462 509.950031 951.138462s147.822277-25.712246 203.52-79.267446c57.844185-53.565046 85.698954-115.688369 83.5584-188.526277C797.026462 462.684554 503.518523 72.778831 505.668923 74.919385z',
        'path://M739.81 378.75c0.32-4.72 0.48-9.39 0.48-14.05 0-59.18-23.05-114.82-64.89-156.67-41.85-41.85-97.49-64.89-156.67-64.89-59.18 0-114.82 23.05-156.67 64.89s-64.89 97.49-64.89 156.67c0 4.66 0.16 9.33 0.48 14.05C186.6 383.07 97.6 474.76 97.6 586.85c0 114.83 93.42 208.26 208.26 208.26H731.6c114.83 0 208.26-93.42 208.26-208.26 0-112.09-89-203.78-200.05-208.1z',
        'path://M486.4 0h48.64v125.44H486.4zM234.8544 78.9504l42.112-24.32 62.72 108.6464-42.112 24.32zM58.0608 275.8144l24.32-42.1376 108.6464 62.72-24.32 42.1376zM0 486.4h125.44v48.64H0zM55.8592 746.7264l108.6464-62.72 24.32 42.1376-108.6464 62.72zM235.6736 940.416l62.72-108.6208 42.1376 24.32-62.72 108.6208zM486.4 896h48.64v125.44H486.4zM683.8528 857.0112l42.1376-24.32 62.72 108.6208-42.1376 24.32zM833.8688 724.3776l24.32-42.1376 108.6208 62.7456-24.32 42.1376zM896 486.4h125.44v48.64H896zM833.8944 297.6512l108.6464-62.72 24.32 42.1376-108.672 62.72zM684.288 164.608l62.72-108.6208 42.112 24.32-62.72 108.6464z',
        'path://M533.504 268.288q33.792-41.984 71.68-75.776 32.768-27.648 74.24-50.176t86.528-19.456q63.488 5.12 105.984 30.208t67.584 63.488 34.304 87.04 6.144 99.84-17.92 97.792-36.864 87.04-48.64 74.752-53.248 61.952q-40.96 41.984-85.504 78.336t-84.992 62.464-73.728 41.472-51.712 15.36q-20.48 1.024-52.224-14.336t-69.632-41.472-79.872-61.952-82.944-75.776q-26.624-25.6-57.344-59.392t-57.856-74.24-46.592-87.552-21.504-100.352 11.264-99.84 39.936-83.456 65.536-61.952 88.064-35.328q24.576-5.12 49.152-1.536t48.128 12.288 45.056 22.016 40.96 27.648q45.056 33.792 86.016 80.896z',
        'path://M659.655431 521.588015q23.970037-6.71161 46.022472-13.423221 19.17603-5.752809 39.310861-11.505618t33.558052-10.546816l-13.423221 50.816479q-5.752809 21.093633-10.546816 31.640449-9.588015 25.88764-22.531835 47.940075t-24.449438 38.35206q-13.423221 19.17603-27.805243 35.475655l-117.932584 35.475655 96.838951 17.258427q-19.17603 16.299625-41.228464 33.558052-19.17603 14.382022-43.625468 30.202247t-51.29588 29.243446-59.925094 13.902622-62.801498-4.314607q-34.516854-4.794007-69.033708-16.299625 10.546816-16.299625 23.011236-36.434457 10.546816-17.258427 25.40824-40.749064t31.161049-52.254682q46.022472-77.662921 89.168539-152.449438t77.662921-135.191011q39.310861-69.992509 75.745318-132.314607-45.06367 51.775281-94.921348 116.014981-43.146067 54.651685-95.88015 129.917603t-107.385768 164.434457q-11.505618 18.217228-25.88764 42.187266t-30.202247 50.816479-32.599251 55.131086-33.078652 55.131086q-38.35206 62.322097-78.621723 130.397004 0.958801-20.134831 7.670412-51.775281 5.752809-26.846442 19.17603-67.116105t38.35206-94.921348q16.299625-34.516854 24.928839-53.692884t13.423221-29.722846q4.794007-11.505618 7.670412-15.340824-4.794007-5.752809-1.917603-23.011236 1.917603-15.340824 11.026217-44.58427t31.161049-81.977528q22.052434-53.692884 58.007491-115.535581t81.018727-122.726592 97.797753-117.932584 107.865169-101.153558 110.262172-72.389513 106.906367-32.11985q0.958801 33.558052-6.71161 88.689139t-19.17603 117.932584-25.88764 127.520599-27.805243 117.453184z',
        'path://M525.963636 93.090909c225.745455 6.981818 404.945455 193.163636 404.945455 418.909091 0 230.4-188.509091 418.909091-418.909091 418.909091-174.545455 0-323.490909-107.054545-386.327273-256H139.636364c230.4 0 418.909091-188.509091 418.909091-418.909091 0-58.181818-11.636364-111.709091-32.581819-162.909091m0-93.090909c-30.254545 0-58.181818 13.963636-76.8 39.563636-18.618182 25.6-20.945455 60.509091-9.309091 88.436364 16.290909 41.890909 25.6 83.781818 25.6 128 0 179.2-146.618182 325.818182-325.818181 325.818182h-11.636364-2.327273c-30.254545 0-58.181818 13.963636-76.8 39.563636-18.618182 25.6-20.945455 60.509091-9.309091 88.436364C121.018182 900.654545 304.872727 1024 512 1024c281.6 0 512-230.4 512-512C1024 235.054545 807.563636 9.309091 528.290909 0h-2.327273z',
        'path://M981.333333 697.813333a183.68 183.68 0 0 0 18.346667-141.226666 189.44 189.44 0 0 0-153.6-136.106667A186.88 186.88 0 0 0 603.52 178.346667a189.226667 189.226667 0 0 0-136.106667-153.6 184.533333 184.533333 0 0 0-226.986666 130.346666L118.613333 617.173333a205.866667 205.866667 0 0 0-40.106666 31.146667 210.133333 210.133333 0 0 0 297.173333 296.96 205.866667 205.866667 0 0 0 31.146667-39.893333l462.08-121.813334A182.186667 182.186667 0 0 0 981.333333 697.813333z m-207.146666-448a144.426667 144.426667 0 0 1 20.266666 178.346667l-497.92 341.333333-42.666666-42.666666 341.333333-497.92a144.426667 144.426667 0 0 1 178.56 21.333333zM281.6 165.973333a139.946667 139.946667 0 0 1 65.92-85.333333 141.226667 141.226667 0 0 1 108.586667-14.08 143.573333 143.573333 0 0 1 64 37.12 145.706667 145.706667 0 0 1 42.666666 99.413333L223.786667 697.173333l-64-64z m-170.666667 747.946667a166.613333 166.613333 0 0 1-1.28-234.666667A162.133333 162.133333 0 0 1 128 661.333333l234.666667 234.666667a162.133333 162.133333 0 0 1-16.426667 19.413333 166.613333 166.613333 0 0 1-236.16-1.493333z m747.946667-170.666667l-466.986667 122.026667-64-64 493.226667-339.626667a145.706667 145.706667 0 0 1 136.96 106.666667 141.44 141.44 0 0 1-14.08 108.586667 139.946667 139.946667 0 0 1-85.973333 65.493333z',
        'path://M401.066667 426.666667h264.533333l-98.133333-170.666667h-68.266667l-98.133333 170.666667z m4.266666 42.666666l128 324.266667 128-324.266667h-256z m452.266667-42.666666l-123.733333-170.666667h-119.466667l98.133333 170.666667h145.066667z m21.333333 42.666666h-170.666666l-123.733334 311.466667 294.4-311.466667zM209.066667 426.666667h140.8l98.133333-170.666667H332.8l-123.733333 170.666667z m-21.333334 42.666666l294.4 311.466667L362.666667 469.333333H187.733333z m345.6 426.666667L128 465.066667 307.2 213.333333h448l179.2 251.733334L533.333333 896z'
    ]
    let _symbol = 'https://img1.baidu.com/it/u=2305450569,1175342556&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    let _markPoint2 = [{
        value: 'NO.1', xAxis: 0, yAxis: 300, symbol: 'image://' + _symbol,
    }, { value: 'NO.2', xAxis: 1, yAxis: 300, symbol: 'image://' + _symbol },
    {
        value: 'NO.3', xAxis: 2, yAxis: 300, symbol: 'image://' + _symbol,
    }, { value: 'NO.4', xAxis: 3, yAxis: 300, symbol: symbolList[1], },
    { value: 'NO.1', xAxis: 4, yAxis: 300, symbol: symbolList[3] }];


    const option = {
        tooltip: {
            trigger: 'axis',
            ...TOOLTIP_STYLE
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
                symbol: symbolList[7],
                symbolSize: 20,
                markPoint: {
                    data: _markPoint2,
                    tooltip: {
                        show: false,
                    },
                    zIndex: 11,
                    symbolSize: [40, 20],
                    label: {
                        offset: [0, 0, 0, 0],
                        show: true,
                        fontSize: 12,
                        color: '#f00',
                        padding: [40, 0, 0, 0],
                    },
                    symbolOffset: [0, -20]
                },
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
export const initLine07 = (dom) => {

    const option = {
        color: ['#26FFB7', '#FF7272', '#6370FF'],
        tooltip: {
            trigger: 'axis',
            ...TOOLTIP_STYLE,
            axisPointer: {
                type: 'cross',
            }
        },
        legend: {
            data: ['部门1', '部门2', '部门3'],
            top: '4',
            icon: 'rect',
            itemHeight: 10,
            itemWidth: 10,
            textStyle: {
                fontSize: fontSize(0.18),
                color: '#BFD1FB',
            },
        },
        grid: {
            top: '34',
            left: '10',
            right: '10',
            bottom: '10',
            containLabel: true
        },
    
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
            axisLabel: {
                textStyle: {
                    color: '#F1F6FF'
                },
            },
            axisTick: false,
            axisLine: {
                lineStyle: {
                    color: "#4976D7"
                }
            },
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#4976D7'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#A3C7FF'
                },
            },
        },
        series: [
            {
                name: '部门1',
                type: 'line',
                step: 'start',
                showSymbol: false,
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '部门2',
                type: 'line',
                step: 'middle',
                showSymbol: false,
    
                data: [220, 282, 201, 234, 290, 430, 410]
            },
            {
                name: '部门3',
                type: 'line',
                step: 'end',
                showSymbol: false,
                data: [450, 432, 401, 454, 590, 530, 510]
            }
        ]
    }
    const chartDom = document.getElementById(dom);
    const myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}
