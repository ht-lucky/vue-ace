import * as echarts from 'echarts'
import {fontSize, TOOLTIP_STYLE, GRID, _cnDic, _divisor} from "../../utils";
import {max} from 'lodash';

export const initPie01 = (dom) => {
    var chartDom = document.getElementById(dom);
    var myChart = echarts.init(chartDom);
    const getRandomDataValue = () => {
        return parseInt(Math.random() * 100)
    }
    let data = [
        {
            name: 'a',
            value: getRandomDataValue()
        },
        {
            name: 'b',
            value: getRandomDataValue()
        },
        {
            name: 'c',
            value: getRandomDataValue()
        },
        {
            name: 'd',
            value: getRandomDataValue()
        },
        {
            name: 'e',
            value: getRandomDataValue()
        },
        {
            name: 'f',
            value: getRandomDataValue()
        }
    ]
    let option = {
        tooltip: {
            ...TOOLTIP_STYLE, ...{
                trigger: 'item'
            }
        },
        legend: {
            type: window.innerWidth < 1440 ? 'scroll' : 'plain',
            orient: 'vertical',
            icon: 'rect',
            top: 40,
            right: 0,
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 18,
            pageIconSize: 8,
            pageIconColor: 'rgba(191, 209, 251, 1)',
            pageTextStyle: {
                color: 'rgba(191, 209, 251, 1)'
            },
            textStyle: {
                rich: {
                    a: {
                        color: 'rgba(191, 209, 251, 1)',
                        align: 'center',
                        fontSize: fontSize(0.14)
                    },
                    b: {
                        color: 'rgba(191, 209, 251, 1)',
                        align: 'center',
                        fontSize: fontSize(0.14),
                    },
                },
            },
            formatter: function (name) {
                let filterData = data.filter(item => item.name === name);
                return "{a|" + name + "}  " + "{b|" + filterData[0].value + "}";
            },
            data: data.map(item => item.name),
        },
        title: {
            textStyle: {
                color: '#fff',
                fontSize: fontSize(0.28)
            },
            subtextStyle: {
                color: 'rgba(125, 152, 191, 1)'
            },
            left: 'center',
            top: '38%'
        },
        color: [
            'rgba(8, 134, 249, 1)',
            'rgba(47, 254, 202, 1)',
            'rgba(255, 227, 150, 1)',
            'rgba(248, 174, 70, 1)',
            'rgba(247, 87, 87, 1)',
            'rgba(25, 209, 249, 1)',
            'rgba(255, 253, 105, 1)',
            'rgba(8, 134, 249, 1)',
            'rgba(223, 52, 255, 1)',
            'rgba(255, 52, 52, 1)',
            'rgba(25, 206, 255, 1)',
        ],
        series: [
            {
                type: 'pie',
                radius: ['55%', '70%'],
                center: ['22%', '50%'], //性设置图的上下左右的位置
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                itemStyle: {
                    borderColor: '#03193f',
                    borderWidth: 6,
                },
                emphasis: {
                    label: {
                        rich: {
                            a: {
                                color: '#fff',
                                align: 'center',
                                fontSize: fontSize(0.20),
                                fontWeight: "bold",
                                padding: [0, 0, 5, 0]
                            },
                            b: {
                                color: '#BAE6FF',
                                align: 'center',
                                fontSize: fontSize(0.14)
                            }
                        },
                        formatter: '{b} : {d}%', //带当前图例名 + 百分比
                        textStyle: {
                            // 牵引线上的文字的样式
                            color: '#fff',
                            align: 'center',
                            fontSize: fontSize(0.20),
                            fontWeight: "bold",
                            padding: [0, 0, 5, 0]
                        },
                        show: true,
                    }
                },

                labelLine: {
                    show: false
                },
                data: [
                    ...data
                ]
            },
        ]
    }
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}

export const initPie02 = (dom) => {
    let data = [
        {
            value: 200, name: '本月新增账户', itemStyle: {color: '#00e3f4'},
            label: {show: true},
            labelLine: {show: true},
            emphasis: {
                scaleSize: 10
            },
        },
        {
            value: 500 - 200, value2: 500, name: '累计登记账户', itemStyle: {
                color: '#0080ff'
            }
        },
    ]
    let dataTotal = [
        {value: 500, name: '累计登记账户', itemStyle: {color: '#0080ff'}},
    ]
    let title = '账户'
    let option = {
        title: {
            text: title,
            x: 'center',
            y: '36%',
            textStyle: {
                fontSize: 20
            },
        },
        tooltip: [{
            trigger: 'item',
            show: true,
            formatter: (params) => {
                // '{a|{b}}\n{b|{c}}\n{hr|}'
                return `${params.marker}${params.name}  ${params.data.value2 || params.data.value}`
            },
        }],
        series: [
            {
                z: 3,
                name: '',
                type: 'pie',
                selectedOffset: 20,
                radius: ['37%', '58%'],
                center: ['50%', '50%'],
                emphasis: {
                    scaleSize: 0
                },
                itemStyle: {
                    borderRadius: 0
                },
                label: {
                    show: false,
                    position: 'outside',
                    width: 100,
                    // overflow: 'truncate',
                    formatter: (params) => {
                        // '{a|{b}}\n{b|{c}}\n{hr|}'
                        return `{a|${params.name ? params.name.slice(0, 4) : ''}}\n{c|${params.name ? params.name.slice(4) : ''}}\n{b|${params.data.value2 || params.value}}\n{hr${params.dataIndex}|}`
                    },
                    rich: {
                        hr0: {
                            backgroundColor: data[0].itemStyle.color,
                            borderRadius: 5,
                            width: 5,
                            height: 5,
                            padding: [5, 5, 0, -20]
                        },
                        hr1: {
                            backgroundColor: data[1].itemStyle.color,
                            borderRadius: 5,
                            width: 5,
                            height: 5,
                            padding: [5, 5, 0, -20]
                        },
                        a: {
                            padding: [5, 5, -18, 5],
                            color: '#a3a3a3',
                            fontSize: 14
                        },
                        c: {
                            padding: [5, 5, -52, 5],
                            color: '#a3a3a3',
                            fontSize: 14,
                            textAlign: 'left',
                        },
                        b: {
                            padding: [-30, 5, -15, 5],
                            fontSize: 18,
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    show: false,
                    length: 24,
                    length2: 22,
                    lineStyle: {
                        width: 1
                    },
                },
                data: [...data]
            },
            {
                name: '',
                type: 'pie',
                selectedOffset: 20,
                radius: ['35%', '60%'],
                center: ['50%', '50%'],
                emphasis: {
                    scaleSize: 0
                },
                itemStyle: {
                    borderRadius: 0
                },
                label: {
                    show: true,
                    position: 'center',
                    width: 100,
                    // overflow: 'truncate',
                    formatter: (params) => {
                        // '{a|{b}}\n{b|{c}}\n{hr|}'
                        return `{b|${params.data.value2 || params.value}}\n{a|${params.name}}`
                    },
                    rich: {
                        // hr0: {
                        //     backgroundColor: dataTotal[0].itemStyle.color,
                        //     borderRadius: 5,
                        //     width: 5,
                        //     height: 5,
                        //     padding: [5, 5, 0, -20]
                        // },
                        a: {
                            padding: [5, 0, 0, 0],
                            color: '#a3a3a3',
                            fontSize: 14
                        },
                        // c: {
                        //     padding: [5, 5, -52, 5],
                        //     color: '#a3a3a3',
                        //     fontSize: 14,
                        //     textAlign: 'left',
                        // },
                        b: {
                            padding: [10, 0, 0, 0],
                            fontSize: 20,
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    length: 24,
                    length2: 22,
                    lineStyle: {
                        width: 1
                    },
                },
                data: [...dataTotal]
            }
        ]
    };
    const chartDom = document.getElementById(dom);
    const chart = echarts.init(chartDom);
    option && chart.setOption(option);
    window.addEventListener("resize", () => {
        chart.resize();
    });
}

export const initPie03 = (dom) => {
    let obj = {
        title: '调节服务\n总数',
        data: [
            {
                value: 80,
                name: '固碳',
                itemStyle: {
                    color: 'rgba(236, 81, 92, 1)'
                },
            },
            {
                value: 20,
                name: '释氧',
                itemStyle: {
                    color: 'rgba(121, 90, 234, 1)'
                }
            },
            {
                value: 40,
                name: '土壤保持',
                itemStyle: {
                    color: 'rgba(15, 181, 242, 1)'
                }
            },
            {
                value: 20,
                name: '水源涵养',
                itemStyle: {
                    color: 'rgba(76, 212, 168, 1)'
                }
            },
            {
                value: 60,
                name: '洪水调蓄',
                itemStyle: {
                    color: 'rgba(250, 183, 37, 1)'
                }
            },
            {
                value: 76,
                name: '气候调节',
                itemStyle: {
                    color: 'rgba(255, 210, 0, 1)'
                }
            },
            {
                value: 80,
                name: '空气净化',
                itemStyle: {
                    color: 'rgba(90, 104, 234, 1)'
                }
            },
            {
                value: 28,
                name: '水环境净化',
                itemStyle: {
                    color: 'rgba(15, 242, 229, 1)'
                }
            },
        ]
    }
    let option = {
        title: {
            text: obj.title,
            left: '49.5%',
            top: '40%',
            textAlign: 'center',
            textStyle: {
                fontSize: fontSize(0.18),
                fontFamily: 'Source Han Sans CN',
                fontWeight: 500,
                color: '#fff',
                textAlign: 'center',
                lineHeight: fontSize(0.29),
            },
        },
        tooltip: [{
            trigger: 'item',
            show: true,
            formatter: (params) => {
                return `${params.marker}${params.name}  ${params.data.value}`
            },
        }],
        legend: {
            icon: 'rect',
            left: 20,
            bottom: 12,
            itemWidth: 10,
            itemHeight: 10,
            padding: 0,
            textStyle: {
                color: '#fff',
                fontSize: fontSize(0.14),
                fontFamily: 'Source Han Sans CN',
                fontWeight: 400,
                padding: [0, 0, 0, 10],
            },
            data: obj.data.map(item => item.name),
        },
        series: [
            {
                name: '',
                type: 'pie',
                roseType: 'radius',
                selectedOffset: 20,
                radius: ['30%', '65%'],
                center: ['50%', '48%'],
                emphasis: {
                    scaleSize: 0
                },
                itemStyle: {
                    borderRadius: 0
                },
                label: {
                    show: true,
                    position: 'outside',
                    width: 100,
                    overflow: 'truncate',
                    formatter: (params) => {
                        // '{a|{b}}\n{b|{c}}\n{hr|}'
                        // return `{a|${params.name}}\n{b|${params.data.value2 || params.value}}`
                        return `{b|${params.percent}%}`
                    },
                    rich: {
                        b: {
                            fontSize: fontSize(0.16),
                            fontFamily: 'Source Han Sans CN',
                            fontWeight: 400,
                            color: 'rgba(190, 228, 248, 1)',
                            padding: [-20, -50, 0, -50]
                        }
                    }
                },
                labelLine: {
                    show: true,
                    length: 8,
                    length2: 50,
                    lineStyle: {
                        width: 1,
                        color: 'rgba(190, 228, 248, 1)'
                    },
                },
                data: [...obj.data]
            }
        ]
    };

    const chartDom = document.getElementById(dom);
    const chart = echarts.init(chartDom);
    option && chart.setOption(option);
    window.addEventListener("resize", () => {
        chart.resize();
    });
}

export const initPie04 = (dom) => {
    let mockData = [
        {
            "value": 13106,
            "name": "购物服务"
        },
        {
            "value": 6629,
            "name": "餐饮服务"
        },
        {
            "value": 6457,
            "name": "交通设施服务"
        },
        {
            "value": 5915,
            "name": "通行设施"
        },
        {
            "value": 37698,
            "name": "其他服务"
        }
    ]
    const chartDom = document.getElementById(dom);
    const myChart = echarts.init(chartDom);
    let colorArr = [['#FFD33B', '#F06B1D'], ['#B792F1', '#801ED6'], ['#B792F1', '#19BCE3'], ['#3D7DFF', '#1947E3'], ['#FF433D', '#E36719']]
    let data = mockData.map((item, index) => {
        item.index = index;
        let colorOption = {
            itemStyle: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: colorArr[index][1]
                }, {
                    offset: 1,
                    color: colorArr[index][0]
                }]),
                shadowOffsetX: 0,
                shadowOffsetY: 2,
                shadowBlur: 10,
                shadowColor: 'rgba(20, 33, 56, 1)'
            },
        }
        return {...item, ...colorOption}
    })
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['25%', '55%'],
                center: ['50%', '46%'],
                labelLine: {
                    length: 20,
                    length2: 20,
                    lineStyle: {
                        width: 2,
                        color: '#33B9E2'
                    }
                },
                label: {
                    formatter: (params) => {
                        console.log(params)
                        let unit = '%'
                        return `{per|${params.percent}}{f|${unit}}\n{icon${params.data.index}|}{b|${params.name}}`
                    },
                    backgroundColor: 'transparent',
                    borderColor: '#2EA8D0',
                    borderWidth: 1,
                    borderRadius: 4,
                    padding: [4, 4, 4, 4],
                    // shadowColor: "rgba(143, 239, 252, 0.5)",
                    // shadowBlur: 22,
                    // shadowOffsetX: -2,
                    // shadowOffsetY: -2,
                    rich: {
                        b: {
                            color: '#C3CDE5',
                            fontSize: 14,
                            lineHeight: 15,
                            padding: [0, 0, 0, 10]
                        },
                        per: {
                            color: '#fff',
                            fontSize: 22,
                            fontWeight: 500,
                            lineHeight: 33,
                            align: 'center'
                        },
                        f: {
                            color: '#fff',
                            fontSize: 14,
                            fontWeight: 500,
                            lineHeight: 33,
                            align: 'center'
                        },
                        icon0: {
                            width: 10,
                            height: 10,
                            backgroundColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: colorArr[0][1]
                            }, {
                                offset: 1,
                                color: colorArr[0][0]
                            }]),
                            borderRadius: 2,
                            shadowOffsetX: 2,
                            shadowOffsetY: 2,
                            shadowBlur: 10,
                            shadowColor: 'rgba(20, 33, 56, 0.28)',
                        },
                        icon1: {
                            width: 10,
                            height: 10,
                            backgroundColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: colorArr[1][1]
                            }, {
                                offset: 1,
                                color: colorArr[1][0]
                            }]),
                            borderRadius: 2,
                            shadowOffsetX: 2,
                            shadowOffsetY: 2,
                            shadowBlur: 10,
                            shadowColor: 'rgba(20, 33, 56, 0.28)',
                        },
                        icon2: {
                            width: 10,
                            height: 10,
                            backgroundColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: colorArr[2][1]
                            }, {
                                offset: 1,
                                color: colorArr[2][0]
                            }]),
                            borderRadius: 2,
                            shadowOffsetX: 2,
                            shadowOffsetY: 2,
                            shadowBlur: 10,
                            shadowColor: 'rgba(20, 33, 56, 0.28)',
                        },
                        icon3: {
                            width: 10,
                            height: 10,
                            backgroundColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: colorArr[3][1]
                            }, {
                                offset: 1,
                                color: colorArr[3][0]
                            }]),
                            borderRadius: 2,
                            shadowOffsetX: 2,
                            shadowOffsetY: 2,
                            shadowBlur: 10,
                            shadowColor: 'rgba(20, 33, 56, 0.28)',
                        },
                        icon4: {
                            width: 10,
                            height: 10,
                            backgroundColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: colorArr[4][1]
                            }, {
                                offset: 1,
                                color: colorArr[4][0]
                            }]),
                            borderRadius: 2,
                            shadowOffsetX: 2,
                            shadowOffsetY: 2,
                            shadowBlur: 10,
                            shadowColor: 'rgba(20, 33, 56, 0.28)',
                        }
                    }
                },
                data: [...data]
            }
        ]
    };

    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    });
}

export const initPie05 = (dom) => {
    var chartDom = document.getElementById(dom);
    var myChart = echarts.init(chartDom);
    let datas = [];
    // for (let item of res.data.list) {
    //     datas.push({value: item.riskCount, name: item.riskName})
    // }
    datas = [
        {value: 1548, name: '账号风险'},
        {value: 679, name: '接口风险', selected: true},
        {value: 679, name: '接口风险2'},
        {value: 679, name: '接口风险3'},
        {value: 679, name: '接口风险4'},
        {value: 679, name: '接口风险5'},
        {value: 679, name: '接口风险6'},
        {value: 775, name: '数据风险'},
        {value: 679, name: '接口风险5'},
        {value: 679, name: '接口风险6'},
        {value: 775, name: '数据风险'},
    ]
    const total = datas.reduce((a, b) => {
        return (typeof a === 'number' ? a : a.value) + b.value;
    })
    const colorList = [
        '#0E83F2',
        '#06C977',
        '#32CFFF',
        '#FF63D3',
        '#FFE396',
        '#F75757',
        '#FF51D1',
        '#FDFF51',
        '#D6A3D3'];
    // const option = {
    //     tooltip: {
    //         trigger: 'item',
    //         formatter: '{a} <br/>{b}: {c} ({d}%)'
    //     },
    //     grid: {
    //         left: '2%',
    //         right: '2%',
    //         bottom: '5%',
    //         top: '30%',
    //         containLabel: true
    //     },
    //     color: ['#00DBC4', '#FF74BC', '#FFAE00', '#0060DC', '#F4734F', '#EBFF00'],
    // };
    let series = [],
        length = datas.length, maxRaduis = [90, 5],
        radiusWidth = 10;
    datas.forEach((info, i) => {
        //计算环宽
        let outRadius = (85 - i * 10),
            radius = [outRadius + '%', (outRadius + 5) + '%'],
            center = ['25%', '50%'];
        console.log(radius)
        series.push({
            type: 'pie',
            itemStyle: {
                borderCap: 'round',
                borderRadius: 10,
            },
            name: '',
            // roundCap: true,
            // coordinateSystem: 'polar',
            radius,
            center,
            // label: {
            //   show: true,
            //   position: 'inside',
            //   fontSize: 12,
            //   color: '#333',
            //   padding: [0, 0, 0, (parseInt(info.name.length / 2 * 20) + 40)],
            //   formatter: ('显示：'+info.name),
            // },
            labelLine: {
                show: false,
            },
            data: [{
                value: 0,
                itemStyle: {
                    color: colorList[i],
                }
            }, {
                value: info.value,
                name: info.name,
                itemStyle: {
                    color: colorList[i],
                },
                label: {
                    show: false
                }
            }, {
                value: total - info.value,
                itemStyle: {
                    color: 'rgba(0,0,0,0)',
                },
                tooltip: {
                    show: false
                },
                label: {
                    show: false
                }
            }]
        });
        series.push({
            type: 'pie',
            silent: true,
            z: 1,
            radius,
            center,
            label: {
                show: false
            },
            data: [{
                value: 10,
                itemStyle: {
                    color: 'rgba(56,56,80,0.5)',
                },
                tooltip: {
                    show: false
                },
            }]
        });
    })

    let option = {
        color: colorList,
        legend: {
            orient: 'vertical',
            right: '4%',
            top: '4%',
            data: datas.map(item => item.name),
            textStyle: { //图例文字的样式
                color: '#F6F6F6',
                lineHeight: 18,
                fontSize: 14
            },
            formatter: function (name) {
                let obj = datas.filter(item => item.name === name);
                if (obj && obj.length > 0) {
                    return `${name && name.length > 12 ? name.slice(0, 14) + '\n' + name.slice(14) : name} （${obj[0].value}）`;
                } else {
                    return name;
                }
            },
            icon: 'circle',
            itemGap: 10,
            itemWidth: 10,
            itemHeight: 10,
            type: 'scroll',
            pageIconColor: '#fff',
            pageIconSize: 14,
            pageTextStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        grid: {
            left: '2%',
            right: '2%',
            bottom: '5%',
            top: '30%',
            containLabel: true
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series,
    };
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}
