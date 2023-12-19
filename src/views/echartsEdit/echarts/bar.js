import * as echarts from 'echarts'
import {fontSize, TOOLTIP_STYLE, GRID, _cnDic, _divisor} from "../../utils";
import {max} from 'lodash';
import 'echarts-liquidfill';

export const initBar01 = (dom) => {
    // 绘制左侧面
    const CubeLeft = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0
        },
        buildPath: function (ctx, shape) {
            // 会canvas的应该都能看得懂，shape是从custom传入的
            const xAxisPoint = shape.xAxisPoint
            const c0 = [shape.x, shape.y]
            const c1 = [shape.x - 13, shape.y - 13]
            const c2 = [xAxisPoint[0] - 13, xAxisPoint[1] - 13]
            const c3 = [xAxisPoint[0], xAxisPoint[1]]
            ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
        }
    })
    // 绘制右侧面
    const CubeRight = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0
        },
        buildPath: function (ctx, shape) {
            const xAxisPoint = shape.xAxisPoint
            const c1 = [shape.x, shape.y]
            const c2 = [xAxisPoint[0], xAxisPoint[1]]
            const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9]
            const c4 = [shape.x + 18, shape.y - 9]
            ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
    })
    // 绘制顶面
    const CubeTop = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0,
        },
        buildPath: function (ctx, shape) {
            const c1 = [shape.x, shape.y]
            const c2 = [shape.x + 18, shape.y - 9]
            const c3 = [shape.x + 5, shape.y - 22]
            const c4 = [shape.x - 13, shape.y - 13]
            ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
    })
    // 注册三个面图形
    echarts.graphic.registerShape('CubeLeft', CubeLeft)
    echarts.graphic.registerShape('CubeRight', CubeRight)
    echarts.graphic.registerShape('CubeTop', CubeTop)

    let keyframeAnimation = function (api, location, delay) {
        return [{
            // 呼吸效果的缩放动画
            duration: 900,
            loop: false,
            delay: delay || 0,
            easing: function (k) {
                return k * k * k * k;
            },
            keyframes: [{
                percent: 0,
                shape: {
                    api,
                    xValue: api.value(0),
                    yValue: 0,
                    x: location[0],
                    y: api.coord([api.value(0), 0])[1],
                    xAxisPoint: api.coord([api.value(0), 0])
                },
            }, {
                percent: 1,
                shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0])
                },
            }],
        }]
    }

    const MAX = [1200, 1200, 1200, 1200, 1200, 1200, 1200]
    const VALUE = [1110.9, 260.8, 204.2, 504.9, 740.5, 600.3, 119.0]
    let option = {
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.63)', //设置背景颜色
            textStyle: {
                color: '#fff'
            },
            borderColor: "rgba(255,255,255, .5)",
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params, ticket, callback) {
                const item = params[1]
                return item.name + ' : ' + item.value;
            }
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '15%',
            top: '20%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#445264'
                }
            },
            offset: 5,
            axisTick: {
                show: false,
                length: 9,
                alignWithLabel: true,
                lineStyle: {
                    color: '#445264'
                }
            },
            axisLabel: {
                show: true,
                fontSize: fontSize(0.16),
                color: '#BBC8E1'
            },
        },
        yAxis: {
            min: 0,
            max: 1200,
            interval: 200,
            type: 'value',
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'white'
                }
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: "dashed",
                    color: "rgba(255,255,255,0.1)"
                },
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                fontSize: fontSize(0.16),
            },
        },
        series: [
            {
                type: 'custom',
                renderItem: function (params, api) {
                    const location = api.coord([api.value(0), api.value(1)])
                    return {
                        type: 'group',
                        children: [{
                            type: 'CubeLeft',
                            shape: {
                                api,
                                x: location[0],
                                y: location[1],
                                xAxisPoint: api.coord([api.value(0), 0])
                            },
                            keyframeAnimation: keyframeAnimation(api, location),
                            style: {
                                fill: '#1C317C'
                            },
                        }, {
                            type: 'CubeRight',
                            shape: {
                                api,
                                x: location[0],
                                y: location[1],
                                xAxisPoint: api.coord([api.value(0), 0])
                            },
                            keyframeAnimation: keyframeAnimation(api, location),
                            style: {
                                fill: '#1C317C'
                            }
                        }, {
                            type: 'CubeTop',
                            shape: {
                                api,
                                x: location[0],
                                y: location[1],
                                xAxisPoint: api.coord([api.value(0), 0])
                            },
                            keyframeAnimation: keyframeAnimation(api, location),
                            style: {
                                fill: '#1C317C'
                            }
                        }]
                    }
                },
                data: MAX
            }, {
                type: 'custom',
                renderItem: (params, api) => {
                    const location = api.coord([api.value(0), api.value(1)])
                    console.log(api, api.value(0), api.value(1))
                    return {
                        type: 'group',
                        children: [{
                            type: 'CubeLeft',
                            shape: {
                                api,
                                xValue: api.value(0),
                                yValue: api.value(1),
                                x: location[0],
                                y: location[1],
                                xAxisPoint: api.coord([api.value(0), 0])
                            },
                            keyframeAnimation: keyframeAnimation(api, location, 150),
                            style: {
                                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#28B4F0'
                                },
                                    {
                                        offset: 0.8,
                                        color: '#305DBA'
                                    }
                                ])
                            }
                        }, {
                            type: 'CubeRight',
                            shape: {
                                api,
                                xValue: api.value(0),
                                yValue: api.value(1),
                                x: location[0],
                                y: location[1],
                                xAxisPoint: api.coord([api.value(0), 0])
                            },
                            keyframeAnimation: keyframeAnimation(api, location, 150),
                            style: {
                                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#39C4FF'
                                },
                                    {
                                        offset: 0.8,
                                        color: '#2866E5'
                                    }
                                ])
                            }
                        }, {
                            type: 'CubeTop',
                            shape: {
                                api,
                                xValue: api.value(0),
                                yValue: api.value(1),
                                x: location[0],
                                y: location[1],
                                xAxisPoint: api.coord([api.value(0), 0])
                            },
                            keyframeAnimation: keyframeAnimation(api, location, 150),
                            style: {
                                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#2BCAF6'
                                },
                                    {
                                        offset: 1,
                                        color: '#2BCAF6'
                                    }
                                ])
                            }
                        }]
                    }
                },
                data: VALUE
            }, {
                type: 'bar',
                itemStyle: {
                    color: 'transparent',
                },
                label: {
                    show: true,
                    position: 'top',
                    color: '#00D7E5',
                    fontSize: fontSize(0.16),
                    fontWeight: 'bold',
                    fontFamily: 'DINAlternate-Bold, DINAlternate',
                    distance: 25,
                },
                tooltip: {},
                data: VALUE
            }]
    }
    var chartDom = document.getElementById(dom);
    var myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}

export const initBar02 = (dom) => {
    let option = {
        title: {
            text: '',
        },
        tooltip: {
            ...TOOLTIP_STYLE, ...{
                trigger: 'axis',
                formatter: (params) => {
                    let content = ''
                    params.forEach((item, index) => {
                        if (item.seriesName) {
                            if (index === 0) {
                                content += `<div>${item.name}</div>`
                            }
                            if ((params.length > 1 && (index === 2 || index === 5)) || params.length === 1) {
                                content += `<div>${item.marker}${item.seriesName}<span style="margin-left: 20px;">${item.value}</span></div>`
                            }
                        }
                    });
                    return content
                }
            }
        },
        // legend: [{
        //   icon: 'rect',
        //   top: 0,
        //   right: 0,
        //   itemWidth: 12,
        //   itemHeight: 12,
        //   padding: 0,
        //   textStyle: {
        //     color: '#BFD1FB',
        //     fontSize: fontSize(0.18),
        //     padding: [2, 0, 0, 10],
        //   },
        //   data: [{
        //     name: '同比增速（%）',
        //     itemStyle: {
        //       color: 'rgba(251, 255, 3, 1)'
        //     }
        //   }],
        // }, {
        //   icon: 'rect',
        //   top: 0,
        //   left: 0,
        //   itemWidth: 12,
        //   itemHeight: 12,
        //   padding: 0,
        //   textStyle: {
        //     color: '#BFD1FB',
        //     fontSize: fontSize(0.18),
        //     padding: [2, 0, 0, 10],
        //   },
        //   data: [{
        //     name: '供应总量（公顷）',
        //     itemStyle: {
        //       color: 'rgba(0, 202, 255, 1)'
        //     }
        //   }],
        // }],
        grid: {
            ...GRID
        },
        yAxis: [{
            splitLine: { // 分隔线
                show: true, // 默认显示，属性show控制显示与否
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'rgba(92, 128, 206, 0.5)',
                    width: 2,
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
                formatter(e) {
                    if (_cnDic[option.maxLength]) {
                        if (option.maxLength === 5) {
                            return (e === 0 ? 0 : (e / (_divisor[option.maxLength])).toFixed(1)) + _cnDic[option.maxLength]
                        } else {
                            return Math.ceil(e / (_divisor[option.maxLength])) + _cnDic[option.maxLength]
                        }
                    } else {
                        return e;
                    }
                },
                show: true,
                color: 'rgba(112, 151, 215, 1)',
                fontSize: fontSize(0.22),
            },
        }, {
            splitLine: { // 分隔线
                show: true, // 默认显示，属性show控制显示与否
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'rgba(92, 128, 206, 0.5)',
                    width: 2,
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
                formatter(e) {
                    if (_cnDic[option.maxLength2]) {
                        if (option.maxLength2 === 5) {
                            return (e === 0 ? 0 : (e / (_divisor[option.maxLength2])).toFixed(1)) + _cnDic[option.maxLength2]
                        } else {
                            return Math.ceil(e / (_divisor[option.maxLength2])) + _cnDic[option.maxLength2]
                        }
                    } else {
                        return e;
                    }
                },
                show: true,
                color: 'rgba(112, 151, 215, 1)',
                fontSize: fontSize(0.22),
            },
        }],
        xAxis: {
            offset: 60,
            axisLabel: {
                show: true,
                color: 'rgba(124, 147, 200, 1)',
                fontSize: fontSize(0.18),
                interval: 0
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(3, 49, 77, 1)',
                },
            },
            data: ['杭州', '宁波', '温州', '绍兴', '嘉兴', '湖州', '金华', '台州', '衢州', '丽水', '舟山']
        },
        series: [
            {
                // 上半截柱子
                name: '供应总量（公顷）',
                type: 'bar',
                barWidth: '32',
                barGap: '-100%',
                a: 1,
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
                                    color: '#2742A1',
                                },
                                {
                                    offset: 1,
                                    color: '#2742A1',

                                },
                            ],
                            false
                        );
                    }
                },
                data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            },
            {
                //最上面圆片
                name: '供应总量（公顷）',
                type: 'pictorialBar',
                symbolSize: [32, 6],
                symbolOffset: [0, -2],
                z: 3,
                symbolPosition: 'end',
                itemStyle: {
                    color: '#1252D0',
                    opacity: 1,
                },
                data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            },
            {
                // 下半截柱子
                name: '供应总量（公顷）',
                type: 'bar',
                barWidth: '32',
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
                                    color: '#0069B9',
                                },
                                {
                                    offset: 1,
                                    color: '#1BBBFF',
                                },
                            ],
                            false
                        );
                    },
                    shadowColor: 'rgba(0,128,235,0.57)',
                    shadowBlur: 20
                },
                data: [42.1, 20.2, 9.5, 4.2, 2.3, 4.5, 6.4, 5.6, 2.3, 4.3, 5.1],
            },
            {
                //数据圆片
                name: '供应总量（公顷）',
                type: 'pictorialBar',
                symbolSize: [32, 6],
                symbolOffset: [0, -2],
                z: 3,
                itemStyle: {
                    opacity: 1,
                    color: '#00C8F2'
                },
                symbolPosition: 'end',
                data: [42.1, 20.2, 9.5, 4.2, 2.3, 4.5, 6.4, 5.6, 2.3, 4.3, 5.1],
                label: {
                    show: false,
                    position: 'left',
                    distance: -770,
                    formatter: '{c}%'
                },
            },
            {
                //最底下圆片
                name: '',
                type: 'pictorialBar',
                symbolSize: [32, 6],
                symbolOffset: [0, -2],
                z: 3,
                itemStyle: {
                    opacity: 1,
                    color: function (params) {
                        // if(params.data >= 0){
                        return '#096ADB'
                        // }else{
                        //     return 'rgba(55, 51, 67, 1)'
                        // }
                    }
                    //color: '#000'
                },
                symbolPosition: 'end',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            // {
            //   name: '同比增速（%）',
            //   type: 'line',
            //   yAxisIndex: 1,
            //   smooth: false,
            //   symbolSize: 10,
            //   itemStyle: {
            //     color: 'rgba(251, 255, 3, 1)',
            //   },
            //   data: [10, 6, 7, 20, 10, 20, 20, 20, 10, 15, 18]
            // }
        ],
    };

    var chartDom = document.getElementById(dom);
    var myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}

export const initBar03 = (dom) => {
    let option = {
        title: {
            text: '',
        },
        tooltip: {
            ...TOOLTIP_STYLE, ...{
                trigger: 'axis',
                formatter: (params) => {
                    let content = ''
                    params.forEach((item, index) => {
                        if (item.seriesName) {
                            if (index === 0) {
                                content += `<div>${item.name}</div>`
                            }
                            if ((params.length > 1 && (index === 2 || index === 4)) || params.length === 1) {
                                content += `<div>${item.marker}${item.seriesName}<span style="margin-left: 20px;">${item.value}</span></div>`
                            }
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
            itemWidth: 12,
            itemHeight: 12,
            padding: 0,
            textStyle: {
                color: '#BFD1FB',
                fontSize: fontSize(0.2),
                padding: [2, 0, 0, 10],
            },
            data: [],
        },
        grid: {
            left: '65',
            right: '60',
            bottom: '80',
            top: '62',
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
                color: 'rgba(226, 235, 255, 1)',
                fontSize: fontSize(0.18),
            },
        },
        xAxis: {
            axisLabel: {
                show: true,
                color: 'rgba(226, 235, 255, 1)',
                fontSize: fontSize(0.18),
                lineHeight: 90,
                interval: 0
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(3, 49, 77, 1)',
                },
            },
            data: ['杭州', '宁波', '温州', '绍兴', '嘉兴', '湖州', '金华', '台州', '衢州', '丽水', '舟山']
            // data: []
        },
        series: [
            {
                // 上半截柱子
                name: '',
                type: 'bar',
                barWidth: '36',
                barGap: '-100%',
                z: 0,
                itemStyle: {
                    //lenged文本
                    opacity: 1,
                    color: function (params) {
                        if (params.data >= 0) {
                            return new echarts.graphic.LinearGradient(
                                0,
                                0,
                                1,
                                0,
                                [
                                    {
                                        offset: 0,
                                        color: 'rgba(51,80,165,0.4)', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(51,80,165,0.4)', // 100% 处的颜色
                                    },
                                ],
                                false
                            );
                        } else {
                            return new echarts.graphic.LinearGradient(
                                0,
                                0,
                                1,
                                0,
                                [
                                    {
                                        offset: 0,
                                        color: 'rgba(51,80,165,0.4)', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(51,80,165,0.4)', // 100% 处的颜色
                                    },
                                ],
                                false
                            );
                        }
                    },
                },
                data: [50, 50, 50, 50, 50],
            },
            {
                //最上面圆片
                name: '',
                type: 'pictorialBar',
                symbolSize: [36, 4],
                symbolOffset: [0, -2],
                z: 3,
                symbolPosition: 'end',
                itemStyle: {
                    color: function (params) {
                        // if(params.data >= 0){
                        return 'rgba(0, 199, 241, 0.3)'
                        // }else{
                        //     return 'rgba(46, 39, 51, 1)'
                        // }
                    },
                    opacity: 1,
                },
                data: [50, 50, 50, 50, 50],
            },
            {
                // 下半截柱子
                name: '2022',
                type: 'bar',
                barWidth: 36,
                barGap: '-100%',
                itemStyle: {
                    //lenged文本
                    opacity: 1,
                    color: function (params) {
                        if (params.data > 0) {
                            return new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: '#21DDFC', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(21,91,253,0)', // 100% 处的颜色
                                    },
                                ],
                                false
                            );
                        } else {
                            return new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: '#21DDFC', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(21,91,253,0)', // 100% 处的颜色
                                    },
                                ],
                                false
                            );
                        }

                    },
                },
                data: [32.1, 20.2, 9.5, 4.2, 2.3],
                // data: []
            },
            {
                //数据圆片
                name: '',
                type: 'pictorialBar',
                symbolSize: [36, 4],
                symbolOffset: [0, -2],
                z: 3,
                itemStyle: {
                    opacity: 1,
                    color: function (params) {
                        // if(params.data >= 0){
                        return 'rgba(0, 199, 241, 1)'
                        // }else{
                        //     return 'rgba(255, 199, 142, 1)'
                        // }
                    }
                },
                symbolPosition: 'end',
                data: [32.1, 20.2, 9.5, 4.2, 2.3],
                // data: [],
                label: {
                    show: false,
                    position: 'left',
                    distance: -770,
                    formatter: '{c}%'
                },
            },
            {
                //最底下圆片
                name: '',
                type: 'pictorialBar',
                symbolSize: [36, 4],
                symbolOffset: [0, -2],
                z: 3,
                itemStyle: {
                    opacity: 1,
                    color: function (params) {
                        // if(params.data >= 0){
                        return 'rgba(0, 133, 255, 1)'
                        // }else{
                        //     return 'rgba(55, 51, 67, 1)'
                        // }
                    }
                    //color: '#000'
                },
                symbolPosition: 'end',
                data: [1, 1, 1, 1, 1],
            },
        ],
    };
    var chartDom = document.getElementById(dom);
    var myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}

export const initBar04 = (dom) => {
    let seriesData = [
        {
            "workmode": "text1",
            "censusCount": 29
        }, {
            "workmode": "text2",
            "censusCount": 100
        }, {
            "workmode": "text3",
            "censusCount": 34
        }, {
            "workmode": "text4",
            "censusCount": 27
        }, {
            "workmode": "text5",
            "censusCount": 55
        }, {
            "workmode": "text5",
            "censusCount": 55
        }, {
            "workmode": "text5",
            "censusCount": 55
        }
    ]
    let seriesData2 = [
        {
            "workmode": "text1",
            "censusCount": 29
        }, {
            "workmode": "text2",
            "censusCount": 60
        }, {
            "workmode": "text3",
            "censusCount": 14
        }, {
            "workmode": "text4",
            "censusCount": 17
        }, {
            "workmode": "text5",
            "censusCount": 35
        }, {
            "workmode": "text5",
            "censusCount": 35
        }, {
            "workmode": "text5",
            "censusCount": 0
        }
    ];
    let valueArrayA = seriesData.map(item => item.censusCount);
    let valueArrayB = seriesData2.map(item => item.censusCount);
    let maxData = max(valueArrayA) + max(valueArrayB)
    const myShape = {
        x: 0,
        y: 0,
        width: 14, // 间距
    };
    // 绘制左侧面
    const InclinedRoofBar = echarts.graphic.extendShape({
        shape: myShape,
        buildPath: function (ctx, shape) {
            // canvas，shape是从custom传入的
            const xAxisPoint = shape.xAxisPoint;
            const c0 = [shape.x, shape.y];
            const c1 = [shape.x - 14, shape.y + 10];
            const c2 = [xAxisPoint[0] - 14, xAxisPoint[1]];
            const c3 = [xAxisPoint[0], xAxisPoint[1]];
            ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath();
        },
    });
    echarts.graphic.registerShape('InclinedRoofBar', InclinedRoofBar);

    let keyframeAnimation = function (api, location, delay) {
        let xlocation = api.coord([api.value(0), 0])
        return [{
            // 呼吸效果的缩放动画
            duration: 900,
            loop: false,
            delay: delay || 0,
            easing: function (k) {
                return k * k * k * k;
            },
            keyframes: [{
                percent: 0,
                shape: {
                    api,
                    xValue: api.value(0),
                    yValue: 0,
                    x: location[0] + 7,
                    y: api.coord([api.value(0), 0])[1] - 10,
                    xAxisPoint: [xlocation[0] + 7, xlocation[1]],
                },
            }, {
                percent: 1,
                shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0] + 7,
                    y: xlocation[1] - location[1] < 10 ? xlocation[1] - 10 : location[1],
                    xAxisPoint: [xlocation[0] + 7, xlocation[1]],
                },
            }],
        }]
    }

    let option = {
        color: ['#2395F6', '#FF973A'],
        tooltip: {
            ...TOOLTIP_STYLE, ...{
                trigger: 'axis',
                formatter: (params) => {
                    let content = ''
                    params.forEach((item, index) => {
                        if (item.seriesName) {
                            if (index === 0) {
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
            top: 5,
            right: 0,
            itemWidth: 8,
            itemHeight: 8,
            padding: 0,
            textStyle: {
                color: '#BFD1FB',
                fontSize: fontSize(0.14),
                padding: [2, 0, 0, 0],
            },
            data: ['已完成（亩）', '待完成（亩）'],
        },
        grid: {
            left: '40',
            right: '0',
            bottom: '30',
            top: '32',
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
            max: maxData,
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(3, 49, 77, 1)',
                },
            },
            axisLabel: {
                formatter(e) {
                    if (_cnDic[option.maxLength]) {
                        if (option.maxLength === 5) {
                            return (e === 0 ? 0 : (e / (_divisor[option.maxLength])).toFixed(1)) + _cnDic[option.maxLength]
                        } else {
                            return Math.ceil(e / (_divisor[option.maxLength])) + _cnDic[option.maxLength]
                        }
                    } else {
                        return e;
                    }
                },
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
                type: 'custom',
                name: '已完成（亩）',
                renderItem: (params, api) => {
                    const location = api.coord([api.value(0), api.value(1)]);
                    const xlocation = api.coord([api.value(0), 0]);
                    return {
                        type: 'InclinedRoofBar',
                        shape: {
                            api,
                            xValue: api.value(0),
                            yValue: api.value(1),
                            x: location[0] + 7,
                            y: xlocation[1] - location[1] < 10 ? xlocation[1] - 10 : location[1],
                            xAxisPoint: [xlocation[0] + 7, xlocation[1]],
                        },
                        keyframeAnimation: keyframeAnimation(api, location, 150),
                        style: {
                            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: api.value(1) > 0 ? '#21DDFC' : 'transparent',
                                },
                                {
                                    offset: 1,
                                    color: api.value(1) > 0 ? '#1F67F6' : 'transparent',
                                },
                            ]),
                        },
                    };
                },
                zlevel: 2,
                data: valueArrayA,
            },
            {
                type: 'custom',
                name: '待完成（亩）',
                renderItem: (params, api) => {
                    const location = api.coord([api.value(0), api.value(1) + seriesData[params.dataIndex].censusCount]);
                    const xlocation = api.coord([api.value(0), 0]);
                    return {
                        type: 'InclinedRoofBar',
                        shape: {
                            api,
                            xValue: api.value(0),
                            yValue: api.value(1) + seriesData[params.dataIndex].censusCount,
                            x: location[0] + 7,
                            y: xlocation[1] - location[1] < 10 ? xlocation[1] - 10 : location[1],
                            xAxisPoint: [xlocation[0] + 7, xlocation[1]],
                        },
                        keyframeAnimation: keyframeAnimation(api, location, 150),
                        style: {
                            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: api.value(1) > 0 ? '#FFBF3A' : 'transparent',
                                },
                                {
                                    offset: 1,
                                    color: api.value(1) > 0 ? '#FF7700' : 'transparent',
                                },
                            ]),
                        },
                    };
                },
                zlevel: 1,
                data: valueArrayB,
            },
            {
                name: '已完成（亩）',
                type: 'bar',
                stack: 'value',
                showBackground: false,
                itemStyle: {
                    color: 'transparent',
                },
                barWidth: 14,
                tooltip: {
                    show: false,
                },
                data: valueArrayA,
            },
            {
                name: '待完成（亩）',
                type: 'bar',
                stack: 'value',
                showBackground: false,
                itemStyle: {
                    color: 'transparent',
                },
                barWidth: 14,
                tooltip: {
                    show: false,
                },
                data: valueArrayB,
            },
            {
                // 背景
                name: '',
                type: 'bar',
                barGap: '-100%',
                barWidth: 16,
                top: 0,
                itemStyle: {
                    color: 'rgba(51, 80, 165, 0.4000)',
                },
                data: seriesData.map(item => maxData),
            },
        ],
    };

    var chartDom = document.getElementById(dom);
    var myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
    myChart.on('legendselectchanged', function (legend) {
        console.log(legend);
        console.log(legend.selected[legend.name])
        if (legend.name === '已完成（亩）') {
            option.series[1].renderItem = (params, api) => {
                let location;
                if (!legend.selected[legend.name]) {
                    // 没选中
                    location = api.coord([api.value(0), api.value(1)]);
                } else {
                    location = api.coord([api.value(0), api.value(1) + seriesData[params.dataIndex].censusCount]);
                }
                const xlocation = api.coord([api.value(0), 0]);
                return {
                    type: 'InclinedRoofBar',
                    shape: {
                        api,
                        xValue: api.value(0),
                        yValue: api.value(1) + seriesData[params.dataIndex].censusCount,
                        x: location[0] + 7,
                        y: xlocation[1] - location[1] < 10 ? xlocation[1] - 10 : location[1],
                        xAxisPoint: [xlocation[0] + 7, xlocation[1]],
                    },
                    keyframeAnimation: keyframeAnimation(api, location, 150),
                    style: {
                        fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: api.value(1) > 0 ? '#FFBF3A' : 'transparent',
                            },
                            {
                                offset: 1,
                                color: api.value(1) > 0 ? '#FF7700' : 'transparent',
                            },
                        ]),
                    },
                };
            }

        }
        myChart.setOption(option)
    })
}

export const initBar05 = (dom) => {
    let circle2 = require('./img/icon-echarts-circle2.png');
    var chartDom = document.getElementById(dom);
    var myChart = echarts.init(chartDom);
    let option = {
        title: {
            text: '',
        },
        tooltip: {
            ...TOOLTIP_STYLE, ...{
                trigger: 'axis',
                formatter: (params) => {
                    let content = ''
                    params.forEach((item, index) => {
                        if (item.seriesName) {
                            if (index === 0) {
                                content += `<div>${item.name}</div>`
                            }
                            if ((params.length > 1 && (index === 2 || index === 5)) || params.length === 1) {
                                content += `<div>${item.marker}${item.seriesName}<span style="margin-left: 20px;">${item.value}</span></div>`
                            }
                        }
                    });
                    return content
                }
            }
        },
        legend: [{
            icon: 'rect',
            top: 0,
            right: 0,
            itemWidth: 12,
            itemHeight: 12,
            padding: 0,
            textStyle: {
                color: '#BFD1FB',
                fontSize: fontSize(0.18),
                padding: [2, 0, 0, 10],
            },
            data: [{
                name: '同比增速（%）',
                itemStyle: {
                    color: 'rgba(251, 255, 3, 1)'
                }
            }],
        }, {
            icon: 'rect',
            top: 0,
            left: 0,
            itemWidth: 12,
            itemHeight: 12,
            padding: 0,
            textStyle: {
                color: '#BFD1FB',
                fontSize: fontSize(0.18),
                padding: [2, 0, 0, 10],
            },
            data: [{
                name: '供应总量（公顷）',
                itemStyle: {
                    color: 'rgba(0, 202, 255, 1)'
                }
            }],
        }],
        grid: {
            ...GRID
        },
        yAxis: [{
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
                formatter(e) {
                    if (_cnDic[option.maxLength]) {
                        if (option.maxLength === 5) {
                            return (e === 0 ? 0 : (e / (_divisor[option.maxLength])).toFixed(1)) + _cnDic[option.maxLength]
                        } else {
                            return Math.ceil(e / (_divisor[option.maxLength])) + _cnDic[option.maxLength]
                        }
                    } else {
                        return e;
                    }
                },
                show: true,
                color: 'rgba(112, 151, 215, 1)',
                fontSize: fontSize(0.18),
            },
        }, {
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
                formatter(e) {
                    if (_cnDic[option.maxLength2]) {
                        if (option.maxLength2 === 5) {
                            return (e === 0 ? 0 : (e / (_divisor[option.maxLength2])).toFixed(1)) + _cnDic[option.maxLength2]
                        } else {
                            return Math.ceil(e / (_divisor[option.maxLength2])) + _cnDic[option.maxLength2]
                        }
                    } else {
                        return e;
                    }
                },
                show: true,
                color: 'rgba(112, 151, 215, 1)',
                fontSize: fontSize(0.18),
            },
        }],
        xAxis: {
            axisLabel: {
                show: true,
                color: 'rgba(124, 147, 200, 1)',
                fontSize: fontSize(0.18),
                lineHeight: 90,
                interval: 0
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(3, 49, 77, 1)',
                },
            },
            data: ['杭州', '宁波', '温州', '绍兴', '嘉兴', '湖州', '金华', '台州', '衢州', '丽水', '舟山']
        },
        series: [
            {
                // 上半截柱子
                name: '供应总量（公顷）',
                type: 'bar',
                barWidth: '34',
                barGap: '-100%',
                a: 1,
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
                                    color: 'rgba(51, 80, 165, 0.4000)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(51, 80, 165, 0.4000)',

                                },
                            ],
                            false
                        );
                    },
                },
                data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            },
            {
                //最上面圆片
                name: '供应总量（公顷）',
                type: 'pictorialBar',
                symbolSize: [34, 6],
                symbolOffset: [0, -2],
                z: 3,
                symbolPosition: 'end',
                itemStyle: {
                    color: 'rgba(0, 199, 241, 0.3)',
                    opacity: 1,
                },
                data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            },
            {
                // 下半截柱子
                name: '供应总量（公顷）',
                type: 'bar',
                barWidth: '34',
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
                                    color: 'rgba(0, 103, 183, 1)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(0, 202, 255, 1)',
                                },
                            ],
                            false
                        );
                    },
                },
                data: [42.1, 20.2, 9.5, 4.2, 2.3, 4.5, 6.4, 5.6, 2.3, 4.3, 5.1],
            },
            {
                //数据圆片
                name: '供应总量（公顷）',
                type: 'pictorialBar',
                symbolSize: [34, 6],
                symbolOffset: [0, -2],
                z: 3,
                itemStyle: {
                    opacity: 1,
                    color: 'rgba(0, 199, 241, 1)'
                },
                symbolPosition: 'end',
                data: [42.1, 20.2, 9.5, 4.2, 2.3, 4.5, 6.4, 5.6, 2.3, 4.3, 5.1],
                label: {
                    show: false,
                    position: 'left',
                    distance: -770,
                    formatter: '{c}%'
                },
            },
            {
                //最底下圆片
                name: '',
                type: 'pictorialBar',
                symbolSize: [34, 6],
                symbolOffset: [0, -2],
                z: 3,
                itemStyle: {
                    opacity: 1,
                    color: function (params) {
                        // if(params.data >= 0){
                        return 'rgba(0, 133, 255, 1)'
                        // }else{
                        //     return 'rgba(55, 51, 67, 1)'
                        // }
                    }
                    //color: '#000'
                },
                symbolPosition: 'end',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                name: '同比增速（%）',
                type: 'line',
                yAxisIndex: 1,
                smooth: false,
                symbol: 'image://' + circle2,
                symbolSize: 10,
                itemStyle: {
                    color: 'rgba(251, 255, 3, 1)',
                },
                data: [10, 6, 7, 20, 10, 20, 20, 20, 10, 15, 18]
            }
        ],
    };
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}

export const initBar06 = (dom) => {
    var chartDom = document.getElementById(dom);
    var myChart = echarts.init(chartDom);
    let seriesData = [{
        "workmode": "text1",
        "censusCount": 29
    }, {
        "workmode": "text2",
        "censusCount": 100
    }, {
        "workmode": "text3",
        "censusCount": 34
    }, {
        "workmode": "text4",
        "censusCount": 27
    }, {
        "workmode": "text5",
        "censusCount": 55
    }, {
        "workmode": "text5",
        "censusCount": 55
    }, {
        "workmode": "text5",
        "censusCount": 55
    }]

    let seriesData2 = [{
        "workmode": "text1",
        "censusCount": 9
    }, {
        "workmode": "text2",
        "censusCount": 60
    }, {
        "workmode": "text3",
        "censusCount": 14
    }, {
        "workmode": "text4",
        "censusCount": 17
    }, {
        "workmode": "text5",
        "censusCount": 35
    }, {
        "workmode": "text5",
        "censusCount": 35
    }, {
        "workmode": "text5",
        "censusCount": 35
    }];

    let valueArrayA = seriesData.map(item => item.censusCount);
    let valueArrayB = seriesData2.map(item => item.censusCount);
    let maxData = max(valueArrayA) + max(valueArrayB)
    const myShape = {
        x: 0,
        y: 0,
        width: 36, // 间距
    };
    // 绘制左侧面
    const InclinedRoofBar = echarts.graphic.extendShape({
        shape: myShape,
        buildPath: function (ctx, shape) {
            // canvas，shape是从custom传入的
            const xAxisPoint = shape.xAxisPoint;
            const c0 = [shape.x, shape.y];
            const c1 = [shape.x - 36, shape.y + 10];
            const c2 = [xAxisPoint[0] - 36, xAxisPoint[1]];
            const c3 = [xAxisPoint[0], xAxisPoint[1]];
            ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath();
        },
    });
    echarts.graphic.registerShape('InclinedRoofBar', InclinedRoofBar);
    let keyframeAnimation = function (api, location, delay) {
        let xlocation = api.coord([api.value(0), 0])
        return [{
            // 呼吸效果的缩放动画
            duration: 900,
            loop: false,
            delay: delay || 0,
            easing: function (k) {
                return k * k * k * k;
            },
            keyframes: [{
                percent: 0,
                shape: {
                    api,
                    xValue: api.value(0),
                    yValue: 0,
                    x: location[0] + 18,
                    y: api.coord([api.value(0), 0])[1] - 10,
                    xAxisPoint: [xlocation[0] + 18, xlocation[1]],
                },
            }, {
                percent: 1,
                shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0] + 18,
                    y: xlocation[1] - location[1] < 10 ? xlocation[1] - 10 : location[1],
                    xAxisPoint: [xlocation[0] + 18, xlocation[1]],
                },
            }],
        }]
    }
    let option = {
        color: ['#2395F6', '#FF973A'],
        tooltip: {
            ...TOOLTIP_STYLE, ...{
                trigger: 'axis',
                formatter: (params) => {
                    let content = ''
                    params.forEach((item, index) => {
                        if (item.seriesName) {
                            if (index === 0) {
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
            top: 5,
            right: 0,
            itemWidth: 12,
            itemHeight: 12,
            padding: 0,
            textStyle: {
                color: '#BFD1FB',
                fontSize: fontSize(0.18),
                padding: [2, 0, 0, 10],
            },
            data: ['已完成（亩）', '待完成（亩）'],
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
            max: maxData,
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(3, 49, 77, 1)',
                },
            },
            axisLabel: {
                formatter(e) {
                    if (_cnDic[option.maxLength]) {
                        if (option.maxLength === 5) {
                            return (e === 0 ? 0 : (e / (_divisor[option.maxLength])).toFixed(1)) + _cnDic[option.maxLength]
                        } else {
                            return Math.ceil(e / (_divisor[option.maxLength])) + _cnDic[option.maxLength]
                        }
                    } else {
                        return e;
                    }
                },
                show: true,
                color: 'rgba(112, 151, 215, 1)',
                fontSize: fontSize(0.18),
            },
        },
        xAxis: {
            axisLabel: {
                show: true,
                color: 'rgba(124, 147, 200, 1)',
                fontSize: fontSize(0.18),
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
                type: 'custom',
                name: '已完成（亩）',
                renderItem: (params, api) => {
                    const location = api.coord([api.value(0), api.value(1)]);
                    const xlocation = api.coord([api.value(0), 0]);
                    return {
                        type: 'InclinedRoofBar',
                        shape: {
                            api,
                            xValue: api.value(0),
                            yValue: api.value(1),
                            x: location[0] + 18,
                            y: xlocation[1] - location[1] < 10 ? xlocation[1] - 10 : location[1],
                            xAxisPoint: [xlocation[0] + 18, xlocation[1]],
                        },
                        keyframeAnimation: keyframeAnimation(api, location, 150),
                        style: {
                            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: api.value(1) > 0 ? '#21DDFC' : 'transparent',
                                },
                                {
                                    offset: 1,
                                    color: api.value(1) > 0 ? '#1F67F6' : 'transparent',
                                },
                            ]),
                        },
                    };
                },
                zlevel: 1,
                data: valueArrayA,
            },
            {
                type: 'custom',
                name: '待完成（亩）',
                renderItem: (params, api) => {
                    const location = api.coord([api.value(0), api.value(1)]);
                    const xlocation = api.coord([api.value(0), 0]);
                    return {
                        type: 'InclinedRoofBar',
                        shape: {
                            api,
                            xValue: api.value(0),
                            yValue: api.value(1),
                            x: location[0] + 18,
                            y: xlocation[1] - location[1] < 10 ? xlocation[1] - 10 : location[1],
                            xAxisPoint: [xlocation[0] + 18, xlocation[1]],
                        },
                        keyframeAnimation: keyframeAnimation(api, location, 150),
                        style: {
                            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: api.value(1) > 0 ? '#FFBF3A' : 'transparent',
                                },
                                {
                                    offset: 1,
                                    color: api.value(1) > 0 ? '#FF7700' : 'transparent',
                                },
                            ]),
                        },
                    };
                },
                zlevel: 2,
                data: valueArrayB,
            },
            {
                name: '已完成（亩）',
                type: 'bar',
                stack: 'value',
                showBackground: false,
                itemStyle: {
                    color: 'transparent',
                },
                barWidth: 36,
                tooltip: {
                    show: false,
                },
                data: [1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5],
            },
            {
                name: '待完成（亩）',
                type: 'bar',
                stack: 'value',
                showBackground: false,
                itemStyle: {
                    color: 'transparent',
                },
                barWidth: 36,
                tooltip: {
                    show: false,
                },
                data: [1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5],
            },
            {
                // 背景
                name: '',
                type: 'bar',
                barGap: '-100%',
                barWidth: 38,
                top: 0,
                itemStyle: {
                    color: 'rgba(51, 80, 165, 0.4000)',
                },
                data: seriesData.map(item => maxData),
            },
        ],
    };
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}

export const initBar07 = (dom) => {
    var listData = [
        {value: 10, name: '18岁以下'},
        {value: 5, name: '18-24岁'},
        {value: 8, name: '25-34岁'},
        {value: 2, name: '35-44岁'},
        {value: 83, name: '45-54岁'},
        {value: 22, name: '55-64岁'},
        {value: 22, name: '65岁以上'},
    ];

    let option = {
        // legend: {
        //     show: true,
        //     data: ['系列一'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        grid: {
            top: '2%',
            left: '25%',
            right: '5%',
            bottom: '2%'
        },
        tooltip: {
            show: true,
            formatter: params => {
                console.log(params)
                if (params.componentSubType === 'bar' && params.seriesName !== '背景条') {
                    return `${params.seriesName}<br />${params.data.name}：${params.data.value}`
                } else {
                    return ''
                }
            }
        },
        xAxis: {
            splitLine: {
                show: false,
            },
            axisLabel: {
                margin: 10,
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        yAxis: {
            type: 'category',
            splitLine: {
                show: false,
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                formatter: (name, index) => {
                    // console.log(name, index)
                    return `{name|${name}}`;
                },
                rich: {
                    name: {
                        fontSize: 14,
                        align: 'left',
                        color: 'rgba(102, 102, 102, 1)',
                        fontFamily: 'MicrosoftYaHei',
                    },
                },
            },
            axisTick: {
                show: false
            },
            data: listData.map(item => item.name)
        },
        series: [
            {
                // 真实数值条形图
                name: "年龄分布",
                type: 'bar', //pictorialBar
                barWidth: 16,
                itemStyle: {
                    borderWidth: 0,
                    color: {
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(255, 172, 89, 1)'
                        }, {
                            offset: 1,
                            color: 'rgba(255, 67, 0, 1)'
                        }]
                    }
                },
                data: listData,
                z: 1
            },
            {
                //辅助方格图形
                name: "辅助值",
                type: 'pictorialBar',
                barWidth: 18,
                symbol: 'rect',
                symbolMargin: '80%',
                symbolSize: ['15%', '100%'],
                symbolOffset: ['150%', '0%'],
                symbolRepeat: true,
                itemStyle: {
                    color: '#fff',
                },
                // label: {
                //     normal: {
                //         color: '#fff',
                //         show: false,
                //         position: ['100%', '10%'],
                //         fontSize: 18,
                //         formatter: function (params) {
                //             //  console.info(params);
                //             return ' ' + (listData[params.dataIndex] * 100).toFixed(2) + '%';
                //         }
                //     }
                // },
                data: [100, 100, 100, 100, 100, 100, 100],
                z: 2
            },
            {
                // 辅助背景图形
                name: "背景条",
                type: 'bar', //pictorialBar
                barWidth: 16,
                barGap: '-100%',
                itemStyle: {
                    borderWidth: 0,
                    color: 'rgba(233, 233, 233, 1)',
                },
                // label: {
                //
                //     show: true,
                //     position: 'insideTopRight',
                //     offset: [0, -26],
                //     textStyle: {
                //         color: '#31B4CD',
                //         fontSize: 14,
                //     },
                //     formatter: params => {
                //         // console.log(params)
                //         return listData[params.dataIndex].value + '%'
                //     },
                // },
                data: [100, 100, 100, 100, 100, 100, 100],
                z: 0
            },
        ]
    };

    var chartDom = document.getElementById(dom);
    var myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}

export const initBar08 = (dom) => {
    let option = {
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return `<span>${params.data.myData}</span><br/><span>办件量：${params.data.value}</span><br/><span>平均用时：${params.data.arag}</span>`
            },
        },
        color: '#9ED0FF',
        grid: {
            top: '2%',
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
        },
        xAxis: {
            show: true,
            axisLabel: {
                formatter: '{value} ',
                show: true,
                color: '#2B2E36'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                },
                show: true
            }
        },
        yAxis: {
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            },
            type: 'category',
            // inverse: false, // 倒叙
            axisLabel: {
                color: '#333',
                formatter: (val) => {
                    return `${val}`;
                }
            },
            axisLine: {
                show: false // 轴线
            },
            axisTick: {
                show: false // 刻度线
            },
            data: ['事项1', '事项2', '事项3', '事项4', '事项5', '事项6']
        },
        series: [
            {
                //最左面圆片
                name: 'leftCircle',
                type: 'pictorialBar',
                symbolSize: [6, 6],
                tooltip: {show: false},
                symbolOffset: [1, 0],
                z: 3,
                symbolPosition: 'end',
                itemStyle: {
                    color: '#224C94',
                    opacity: 1
                },
                data: [0, 10, 30, 5, 10, 0]
            },
            {
                tooltip: {show: false},
                //最右面圆片
                name: 'rightCircle',
                type: 'pictorialBar',
                symbolSize: [6, 6],
                symbolOffset: [1, 0],
                z: 3,
                symbolPosition: 'end',
                itemStyle: {
                    color: '#224C94',
                    opacity: 1
                },
                data: [5, 30, 30, 15, 33, 23]
            },
            {
                barWidth: 5,
                name: 'Placeholder',
                type: 'bar',
                stack: 'Total',
                itemStyle: {
                    borderColor: 'transparent',
                    color: 'transparent'
                },
                emphasis: {
                    itemStyle: {
                        borderColor: 'transparent',
                        color: 'transparent'
                    }
                },
                tooltip: {show: false},
                data: [0, 10, 30, 5, 10, 0]
            },
            {
                name: '',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    position: ['10', '-270%'],
                    offset: [0, 0],
                    formatter: function (val) {
                        return '办件量：' + `{a|${val.value}} ` + ' 平均用时：' + `{a|${val.data.arag}} `
                    },
                    rich: {
                        a: {
                            color: '#FF5B2F',

                        },
                    },
                },
                data: [{
                    value: 5,
                    arag: 3,
                    myData: '事项1' // 传入数据，变量名自己定
                },
                    {
                        value: 20,
                        arag: 3,
                        myData: '事项2'
                    },
                    {
                        value: 36,
                        arag: 3,
                        myData: '事项3'
                    },
                    {
                        value: 10,
                        arag: 3,
                        myData: '事项4'
                    },

                    {
                        value: 23,
                        arag: 3,
                        myData: '事项5'
                    },
                    {
                        value: 23,
                        arag: 3,
                        myData: '事项6'
                    },
                ]
            }
        ]
    }

    var chartDom = document.getElementById(dom);
    var myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}

export const initBar09 = (dom) => {
    const value = 75
    const option = {
        title: {
            text: '{a|' + value + '}{c|%}',
            x: 'center',
            y: 'center',
            textStyle: {
                rich: {
                    a: {
                        //fontSize: fontSize(0.30),
                        color: '#ffffff',
                        fontWeight: 'bold'
                    },
                    c: {
                        //fontSize: fontSize(0.16),
                        color: '#ffffff',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        series: [
            //外环
            {
                name: '',
                type: 'pie',
                radius: ['75%', '100%'],
                silent: true,
                clockwise: true,
                startAngle: 90,
                label: {
                    show: false,
                },
                data: [
                    {
                        value: value,
                        itemStyle: {
                            //外环发光
                            borderWidth: 0,
                            borderColor: '#4bf3f9',
                            color: { // 圆环的颜色
                                colorStops: [{
                                    offset: 0,
                                    color: '#FFD50C', // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#FFAB05', // 100% 处的颜色
                                }]
                            },
                        }
                    },
                    {
                        value: 100 - value,
                        label: {
                            show: false
                        },
                        itemStyle: {
                            color: "#24659D"
                        }
                    }
                ]
            },
        ]
    };
    const chartDom = document.getElementById(dom);
    const chart = echarts.init(chartDom);
    option && chart.setOption(option);
    window.onresize = () => {
        chart.resize()
    }
}

export const initBar10 = (dom) => {
    const echartsOptions = {
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

    const data = {
        value: 0.75,
        name: '个人数评',
        subs: [
            {name: '工作会议', value: 31},
            {name: '报告提交', value: 31},
            {name: '考勤管理', value: 31},
            {name: '学习培训', value: 31},
            {name: '群众走访', value: 31},
            {name: '事件到场', value: 31},
            {name: '任务完成', value: 31},
        ]
    }


    const option = created({
        ...echartsOptions,
        ...data
    })

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
                        color: data.backgroundColor ?? 'rgb(255,0,255,0.1)',
                    },
                    // 修改波浪颜色
                    color: data.color,
                    // color:['yellow','red','pink'],  每个波浪不同颜色，颜色数组长度为对应的波浪个数
                    label: {
                        formatter: `{size|${round(data.value * 100)}}\n{name|${data.name}}`,
                        rich: {
                            size: {
                                fontSize: fontSize(0.3),
                                fontWeight: 'bold',
                                fontFamily: 'LINESeedSans, LINESeedSans',
                                color: '#FFFFFF',
                                padding: [0, 0, 5, 0]
                            },
                            name: {
                                fontSize: fontSize(0.14),
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
                                color: data.borderColor ?? 'rgba(2, 180, 255, 1)',
                            }
                        },
                    ],
                },
            ],
        }
    }

    const chartDom = document.getElementById(dom);
    const chart = echarts.init(chartDom);
    option && chart.setOption(option);
    window.onresize = () => {
        chart.resize()
    }
}

export const initBar11 = (dom) => {
    let option = {
        tooltip: {
            ...TOOLTIP_STYLE,
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '5%',
            top: '30%',
            containLabel: true
        },
        legend: {
            data: [
                {name: '核算数量', itemStyle: {color: '#00FFFF'}},
                {name: '项目总量', itemStyle: {color: '#4F89FF'}}
            ],
            icon: 'rect',
            top: '5%',
            left: 0,
            itemWidth: fontSize(0.1),
            itemHeight: fontSize(0.1),
            padding: 0,
            textStyle: {
                color: '#fff',
                fontSize: fontSize(0.14),
            },
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(0, 56, 109, 1)'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        type: "dashed",
                        color: "rgba(0, 56, 109, 0.99)"
                    },
                },
                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    color: '#fff',
                    fontSize: fontSize(0.14),
                    fontFamily: 'PingFangSC, PingFang SC'
                },
                axisLabel: {
                    formatter: '{value}',
                    color: '#fff',
                    fontSize: fontSize(0.14),
                    fontFamily: 'PingFangSC, PingFang SC'
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '产量',
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        color: "rgba(0, 56, 109, 0.99)"
                    },
                },
                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    color: '#fff',
                    fontSize: fontSize(0.14),
                    fontFamily: 'PingFangSC, PingFang SC',
                    padding: [0, 0, 0, fontSize(-0.4)]
                },
                axisLabel: {
                    formatter: '{value}',
                    color: '#fff',
                    fontSize: fontSize(0.14),
                    fontFamily: 'PingFangSC, PingFang SC'
                },
            },
        ],
        series: [
            {
                name: '核算数量',
                type: 'bar',
                barWidth: fontSize(0.11),
                tooltip: {
                    valueFormatter: function (value) {
                        return value;
                    }
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#00FFFF',
                        },
                        {
                            offset: 1,
                            color: 'rgba(0,255,255,0)',
                        },
                    ]),
                },
                data: [
                    2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                ]
            },
            {
                name: '项目总量',
                type: 'bar',
                barWidth: fontSize(0.11),
                tooltip: {
                    valueFormatter: function (value) {
                        return value;
                    }
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#4F89FF',
                        },
                        {
                            offset: 1,
                            color: 'rgba(64,127,255,0)',
                        },
                    ]),
                },
                data: [
                    2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                ]
            },
        ]
    };
    let chartDom = document.getElementById(dom);
    const chart = echarts.init(chartDom);
    chart.setOption(option)
    window.addEventListener("resize", () => {
        chart.resize();
    })
}
