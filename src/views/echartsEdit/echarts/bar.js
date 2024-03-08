import * as echarts from 'echarts'
import { fontSize, TOOLTIP_STYLE, GRID, _cnDic, _divisor, intervalFnc, maxFnc, fontChart } from "../../utils";
import { max } from 'lodash';
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
                    // console.log(api, api.value(0), api.value(1))
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
        { value: 10, name: '18岁以下' },
        { value: 5, name: '18-24岁' },
        { value: 8, name: '25-34岁' },
        { value: 2, name: '35-44岁' },
        { value: 83, name: '45-54岁' },
        { value: 22, name: '55-64岁' },
        { value: 22, name: '65岁以上' },
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
                tooltip: { show: false },
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
                tooltip: { show: false },
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
                tooltip: { show: false },
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
            { name: '工作会议', value: 31 },
            { name: '报告提交', value: 31 },
            { name: '考勤管理', value: 31 },
            { name: '学习培训', value: 31 },
            { name: '群众走访', value: 31 },
            { name: '事件到场', value: 31 },
            { name: '任务完成', value: 31 },
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
                { name: '核算数量', itemStyle: { color: '#00FFFF' } },
                { name: '项目总量', itemStyle: { color: '#4F89FF' } }
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
export const initBar12 = (dom) => {
    const option = {
        title: {
            text: '',
        },
        tooltip: {
            ...TOOLTIP_STYLE, ...{
                trigger: 'axis',
            }
        },
        grid: {
            left: '40',
            right: '0',
            bottom: '30',
            top: '44',
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
                textStyle: {
                    color: 'rgba(112, 151, 215, 1)',
                    fontSize: fontSize(0.12),
                }
            },
        },
        xAxis: {
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'rgba(124, 147, 200, 1)',
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
        series: [
            {
                // 上半截柱子
                name: '2019',
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
                                    color: 'rgba(51,80,165,0.4)', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(51,80,165,0.4)', // 100% 处的颜色
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
                    color: '#224C94',
                    opacity: 1,
                },
                data: [50, 50, 50, 50, 50],
            },
            {
                // 下半截柱子
                name: '2020',
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
                                    color: '#21DDFC', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(21,91,253,0)', // 100% 处的颜色
                                },
                            ],
                            false
                        );
                    },
                },
                data: [15, 20.2, 9.5, 4.2, 2.3, 15, 20.2, 9.5, 4.2, 2.3, 4.2, 2.3],
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
                data: [15, 20.2, 9.5, 4.2, 2.3, 15, 20.2, 9.5, 4.2, 2.3, 4.2, 2.3],
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
                symbolSize: [18, 4],
                symbolOffset: [0, 0],
                z: 3,
                itemStyle: {
                    opacity: 1,
                    color: 'rgba(26, 51, 124, 1)'
                    //color: '#000'
                },
                symbolPosition: 'end',
                data: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
            },
        ],
    };
    let chartDom = document.getElementById(dom);
    const chart = echarts.init(chartDom);
    chart.setOption(option)
    window.addEventListener("resize", () => {
        chart.resize();
    })
}
export const initBar13 = (dom) => {
    const option = {
        title: {
            text: '',
        },
        tooltip: {
            ...TOOLTIP_STYLE, ...{
                trigger: 'axis',
            }
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
                textStyle: {
                    color: 'rgba(112, 151, 215, 1)',
                    fontSize: fontSize(0.12),
                }
            },
        },
        xAxis: {
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'rgba(124, 147, 200, 1)',
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
        series: [
            {
                // 上半截柱子
                name: '2019',
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
                                    color: 'rgba(51,80,165,0.4)', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(51,80,165,0.4)', // 100% 处的颜色
                                },
                            ],
                            false
                        );
                    },
                },
                data: [100, 100, 100, 100, 100, {
                    value: -100,
                    itemStyle: {
                        color: 'rgba(255, 181, 131, 0.1300)'
                    }
                }, {
                        value: -100,
                        itemStyle: {
                            color: 'rgba(255, 181, 131, 0.1300)'
                        }
                    }],
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
                    color: '#224C94',
                    opacity: 1,
                },
                data: [100, 100, 100, 100, 100, {
                    value: -100,
                    itemStyle: {
                        color: 'rgba(44, 41, 65, 1)'
                    }
                }, {
                        value: -100,
                        itemStyle: {
                            color: 'rgba(44, 41, 65, 1)'
                        }
                    }],
            },
            {
                // 下半截柱子
                name: '2020',
                type: 'bar',
                barWidth: 18,
                barGap: '-100%',
                itemStyle: {
                    opacity: 1,
                    color: function (params) {
                        if (params.data < 0) {
                            return new echarts.graphic.LinearGradient(
                                0,
                                1,
                                0,
                                0,
                                [
                                    {
                                        offset: 0,
                                        color: 'rgba(244, 176, 128, 1)', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(244, 176, 128, 0)', // 100% 处的颜色
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
                data: [32.1, 20.2, 9.5, 4.2, 20, -50.3, -30],
            },
            {
                //数据圆片
                name: '',
                type: 'pictorialBar',
                symbolSize: [18, 4],
                symbolOffset: [0, -2],
                z: 3,
                itemStyle: {
                    color: 'rgba(185, 243, 255, 1)'
                },
                symbolPosition: 'end',
                data: [
                    32.1, 20.2, 9.5, 4.2, 20,
                    {
                        value: -50.3,
                        symbolOffset: [0, 2],
                        itemStyle: {
                            color: 'rgba(255, 203, 168, 1)'
                        },
                    },
                    {
                        value: -30,
                        symbolOffset: [0, 2],
                        itemStyle: {
                            color: 'rgba(255, 203, 168, 1)'
                        },
                    }
                ],
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
                symbolSize: [18, 4],
                symbolOffset: [0, 0],
                z: 3,
                itemStyle: {
                    opacity: 1,
                    color: 'rgba(26, 51, 124, 1)'
                },
                symbolPosition: 'end',
                data: [
                    {
                        value: 1,
                        itemStyle: {
                            color: 'rgba(26, 51, 124, 1)'
                        }
                    },
                    {
                        value: 1,
                        itemStyle: {
                            color: 'rgba(26, 51, 124, 1)'
                        }
                    },
                    {
                        value: 1,
                        itemStyle: {
                            color: 'rgba(26, 51, 124, 1)'
                        }
                    },
                    {
                        value: 1,
                        itemStyle: {
                            color: 'rgba(26, 51, 124, 1)'
                        }
                    },
                    {
                        value: 1,
                        itemStyle: {
                            color: 'rgba(26, 51, 124, 1)'
                        }
                    },
                    {
                        value: 1,
                        itemStyle: {
                            color: 'rgba(116, 96, 107, 1)'
                        }
                    },
                    {
                        value: 1,
                        itemStyle: {
                            color: 'rgba(116, 96, 107, 1)'
                        }
                    }
                ],
            },
        ],
    };
    let chartDom = document.getElementById(dom);
    const chart = echarts.init(chartDom);
    chart.setOption(option)
    window.addEventListener("resize", () => {
        chart.resize();
    })
}
export const initBar14 = (dom) => {
    const option = {
        tooltip: {
            ...TOOLTIP_STYLE, ...{
                trigger: 'axis',
            },
            axisPointer: {
                type: 'none'
            },
            formatter: function (params) {
                return params[0].marker + params[0].name + ': ' + params[0].value;
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
            axisTick: { show: false },
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
            interval: intervalFnc([123, 60, 25, 71, 33, 51]),
            max: maxFnc([123, 60, 25, 71, 33, 51]),
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
                        { offset: 0, color: 'rgba(228, 187, 40, 1)' },
                        { offset: 1, color: 'rgba(205, 166, 29, 0.3)' }
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
    let chartDom = document.getElementById(dom);
    const chart = echarts.init(chartDom);
    chart.setOption(option)
    window.addEventListener("resize", () => {
        chart.resize();
    })
}
export const initBar15 = (dom) => {
    const option = {
        tooltip: {
            trigger: 'axis',
            ...TOOLTIP_STYLE
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
            interval: intervalFnc([200, 490, 700, 232, 256, 767, 136, 162, 326, 200, 644, 330]),
            max: maxFnc([200, 490, 700, 232, 256, 767, 136, 162, 326, 200, 644, 330]),
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
        },],
        series: [{
            name: '失业人口',
            type: 'bar',
            tooltip: {
                valueFormatter: function (value) {
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
        },]
    };
    let chartDom = document.getElementById(dom);
    const chart = echarts.init(chartDom);
    chart.setOption(option)
    window.addEventListener("resize", () => {
        chart.resize();
    })
}
export const initBar16 = (dom) => {
    let maxData = 2000
    const option = {
        tooltip: {
            trigger: 'axis',
            ...TOOLTIP_STYLE
        },

        grid: {
            left: '20',
            right: '20',
            bottom: '30',
            top: '60',
        },
        xAxis: {
            // boundaryGap: true, // 默认，坐标轴留白策略
            axisLine: { // 坐标轴轴线相关设置。数学上的x轴
                show: true,
                lineStyle: {
                    color: '#263D6A'
                }
            },

            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff',
                    fontSize: fontChart(1.4),
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
            max: maxData,
            show: false,
        },
        series: [{
            type: 'pictorialBar',
            symbol: 'rect',
            symbolSize: [15, 4],
            color: '#7f71e2',
            symbolRepeat: true,
            symbolBoundingData: maxData,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 214, 246, 1)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(3, 209, 160, 1)',
                    },
                    ]),
                },
            },
            data: [{
                value: 120,

            }, {
                value: 110,

            }, {
                value: 130,

            }, {
                value: 450,

            }, {
                value: 345,

            }, {
                value: 784,

            }, {
                value: 103,

            }, {
                value: 403,

            }, {
                value: 563,

            }, {
                value: 132,

            }, {
                value: 1321,

            }],
            z: 10
        }, {
            type: 'pictorialBar',
            animationDuration: 0,
            symbolRepeat: 'fixed', //使图形元素重复
            symbol: 'rect',
            symbolSize: [15, 4],
            symbolBoundingData: maxData,
            itemStyle: {
                color: '#102946'
            },
            data: [{
                value: 120,

            }, {
                value: 110,

            }, {
                value: 130,

            }, {
                value: 450,

            }, {
                value: 345,

            }, {
                value: 784,

            }, {
                value: 103,

            }, {
                value: 403,

            }, {
                value: 563,

            }, {
                value: 132,

            }, {
                value: 1321,

            }],
            markPoint: {
                label: {
                    show: true,
                    formatter: '{c}',
                    offset: [0, fontChart(0.14)],
                    fontSize: fontChart(1.2)
                },
                itemStyle: {
                    borderColor: "#fff",
                    shadowColor: "#b3b2b2",
                    shadowBlur: 10,
                    borderWidth: 2,
                },
                symbolOffset: [0, fontChart(-2.6)],
                symbol: 'image://' + require('./img/zzt-icon.png'),
                symbolSize: [fontChart(3.2), fontChart(1.8)],
                data: [{
                    value: 120,
                    xAxis: 0,
                    yAxis: maxData,
                    itemStyle: {
                        color: '#7f71e2'
                    },
                }, {
                    value: 110,
                    xAxis: 1,
                    yAxis: maxData,
                    itemStyle: {
                        color: '#4aa1e1'
                    }
                }, {
                    value: 130,
                    xAxis: 2,
                    yAxis: maxData,
                    itemStyle: {
                        color: '#6494db'
                    }
                }, {
                    value: 450,
                    xAxis: 3,
                    yAxis: maxData,
                    itemStyle: {
                        color: '#159be4'
                    }
                }, {
                    value: 345,
                    xAxis: 4,
                    yAxis: maxData,
                    itemStyle: {
                        color: '#4ebcff'
                    }
                }, {
                    value: 784,
                    xAxis: 5,
                    yAxis: maxData,
                    itemStyle: {
                        color: '#05d4b5'
                    }
                }, {
                    value: 103,
                    xAxis: 6,
                    yAxis: maxData,
                    itemStyle: {
                        color: '#2fcd97'
                    }
                }, {
                    value: 403,
                    xAxis: 7,
                    yAxis: maxData,
                    itemStyle: {
                        color: '#23d2c9'
                    }
                }, {
                    value: 563,
                    xAxis: 8,
                    yAxis: maxData,
                    itemStyle: {
                        color: '#80d985'
                    }
                }, {
                    value: 132,
                    xAxis: 9,
                    yAxis: maxData,
                    itemStyle: {
                        color: '#a6c34c'
                    }
                }, {
                    value: 1321,
                    xAxis: 10,
                    yAxis: maxData,
                    itemStyle: {
                        color: '#a6c34c'
                    }
                }]
            },
            z: 5
        }]

    }
    let chartDom = document.getElementById(dom);
    const chart = echarts.init(chartDom);
    chart.setOption(option)
    window.addEventListener("resize", () => {
        chart.resize();
    })
}
export const initBar17 = (dom) => {
    const spirit = 'image://data:image/png;base64,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';
    var maxData = 2000;
    const option = {
        tooltip: {},
        xAxis: {
            max: maxData,
            splitLine: { show: false },
            offset: 10,
            axisLine: {
                lineStyle: {
                    color: '#999'
                }
            },
            axisLabel: {
                margin: 10
            }
        },
        yAxis: {
            data: ['2013', '2014', '2015', '2016'],
            inverse: true,
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
                margin: 10,
                color: '#999',
                fontSize: 16
            }
        },
        grid: {
            top: 'center',
            height: 200,
            left: 70,
            right: 100
        },
        series: [
            {
                // current data
                type: 'pictorialBar',
                symbol: spirit,
                symbolRepeat: 'fixed',
                symbolMargin: '5%',
                symbolClip: true,
                symbolSize: 30,
                symbolBoundingData: maxData,
                data: [891, 1220, 660, 1670],
                markLine: {
                    symbol: 'none',
                    label: {
                        formatter: 'max: {c}',
                        position: 'start'
                    },
                    lineStyle: {
                        color: 'green',
                        type: 'dotted',
                        opacity: 0.2,
                        width: 2
                    },
                    data: [
                        {
                            type: 'max'
                        }
                    ]
                },
                z: 10
            },
            {
                // full data
                type: 'pictorialBar',
                itemStyle: {
                    opacity: 0.2
                },
                label: {
                    show: true,
                    formatter: function (params) {
                        return ((params.value / maxData) * 100).toFixed(1) + ' %';
                    },
                    position: 'right',
                    offset: [10, 0],
                    color: 'green',
                    fontSize: 18
                },
                animationDuration: 0,
                symbolRepeat: 'fixed',
                symbolMargin: '5%',
                symbol: spirit,
                symbolSize: 30,
                symbolBoundingData: maxData,
                data: [891, 1220, 660, 1670],
                z: 5
            }
        ]
    };
    function random() {
        return +(Math.random() * (maxData - 10)).toFixed(1);
    }

    let chartDom = document.getElementById(dom);
    const chart = echarts.init(chartDom);
    chart.setOption(option)
    setInterval(function () {
        const dynamicData = [random(), random(), random(), random()];
        chart.setOption({
            series: [
                {
                    data: dynamicData.slice()
                },
                {
                    data: dynamicData.slice()
                }
            ]
        });
    }, 3000);
    window.addEventListener("resize", () => {
        chart.resize();
    })
}
export const initBar18 = (dom) => {
    const symbols = [
        'path://M36.7,102.84c-1.17,2.54-2.99,4.98-3.39,7.63c-1.51,9.89-3.31,19.58-1.93,29.95 c0.95,7.15-2.91,14.82-3.57,22.35c-0.64,7.36-0.2,14.86,0.35,22.25c0.12,1.68,2.66,3.17,4.67,5.4c-0.6,0.82-1.5,2.22-2.58,3.48 c-0.96,1.12-1.96,2.35-3.21,3.04c-1.71,0.95-3.71,2.03-5.51,1.9c-1.18-0.08-3.04-2.13-3.16-3.43c-0.44-4.72,0-9.52-0.41-14.25 c-0.94-10.88-2.32-21.72-3.24-32.61c-0.49-5.84-1.63-12.01-0.35-17.54c3.39-14.56,2.8-28.84,0.36-43.4 c-2.71-16.16-1.06-32.4,0.54-48.59c0.91-9.22,4.62-17.36,8.53-25.57c1.32-2.77,1.88-6.84,0.87-9.62C21.89-3.77,18.09-11,14.7-18.38 c-0.56,0.1-1.13,0.21-1.69,0.31C10.17-11.52,6.29-5.2,4.71,1.65C2.05,13.21-4.42,22.3-11.43,31.28c-1.32,1.69-2.51,3.5-3.98,5.04 c-4.85,5.08-3.25,10.98-2.32,16.82c0.25,1.53,0.52,3.06,0.77,4.59c-0.53,0.22-1.07,0.43-1.6,0.65c-1.07-2.09-2.14-4.19-3.28-6.44 c-6.39,2.91-2.67,9.6-5.23,15.16c-1.61-3.31-2.77-5.68-3.93-8.06c0-0.33,0-0.67,0-1c6.96-16.08,14.63-31.9,20.68-48.31 C-5.24-4.07-2.03-18.55,2-32.73c0.36-1.27,0.75-2.53,0.98-3.82c1.36-7.75,4.19-10.23,11.88-10.38c1.76-0.04,3.52-0.21,5.76-0.35 c-0.55-3.95-1.21-7.3-1.45-10.68c-0.61-8.67,0.77-16.69,7.39-23.19c2.18-2.14,4.27-4.82,5.25-7.65c2.39-6.88,11.66-9,16.94-8.12 c5.92,0.99,12.15,7.93,12.16,14.12c0.01,9.89-5.19,17.26-12.24,23.68c-2.17,1.97-5.35,4.77-5.17,6.94c0.31,3.78,4.15,5.66,8.08,6.04 c1.82,0.18,3.7,0.37,5.49,0.1c5.62-0.85,8.8,2.17,10.85,6.73C73.38-27.19,78.46-14.9,84.2-2.91c1.52,3.17,4.52,5.91,7.41,8.09 c7.64,5.77,15.57,11.16,23.45,16.61c2.28,1.58,4.64,3.23,7.21,4.14c5.18,1.84,8.09,5.63,9.82,10.46c0.45,1.24,0.19,3.71-0.6,4.18 c-1.06,0.63-3.15,0.27-4.44-0.38c-7.05-3.54-12.84-8.88-19.14-13.5c-3.5-2.57-7.9-4-12.03-5.6c-9.44-3.66-17.73-8.42-22.5-18.09 c-2.43-4.94-6.09-9.27-9.69-14.61c-1.2,10.98-4.46,20.65,1.14,31.19c6.62,12.47,5.89,26.25,1.21,39.49 c-2.52,7.11-6.5,13.74-8.67,20.94c-1.91,6.33-2.2,13.15-3.23,19.75c-0.72,4.63-0.84,9.48-2.36,13.84 c-2.49,7.16-6.67,13.83-5.84,21.82c0.42,4.02,1.29,7.99,2.1,12.8c-3.74-0.49-7.47-0.4-10.67-1.66c-1.33-0.53-2.43-4.11-2.07-6.01 c1.86-9.94,3.89-19.69,0.07-29.74C34.55,108.63,36.19,105.52,36.7,102.84c1.25-8.45,2.51-16.89,3.71-24.9 c-0.83-0.58-0.85-0.59-0.87-0.61c-0.03,0.16-0.07,0.32-0.09,0.48C38.53,86.15,37.62,94.5,36.7,102.84z',
        'path://M40.02-99c2.07,1.21,4.26,2.25,6.19,3.66c5.94,4.34,8.23,12.57,4.95,19.79 c-3.21,7.08-6.82,14.03-10.86,20.67c-2.17,3.56-1.25,5.38,1.99,6.36c2.94,0.89,6.36,1.91,9.15,1.21c5.51-1.4,8.33,1.23,10.66,5.29 c4.71,8.22,9.72,16.29,13.84,24.8C81.06-6.65,89,0.4,99.56,5.17C109.82,9.8,120,14.7,129.85,20.15c4.72,2.61,9.09,6.37,10.24,12.97 c-2.89-1.93-5.2-3.75-7.78-5.04c-0.99-0.5-2.6,0.22-4.83,0.5c-5.36-9.35-16.8-9.4-26.74-12.62C91.68,13.04,81.82,11.37,75.66,3 c-5.98-8.13-11.61-16.52-17.4-24.79c-0.46-0.66-0.98-1.27-1.66-2.16c-3.21,7.75-6.78,15-9.12,22.63c-1.15,3.76-0.64,8.37,0.26,12.33 c0.81,3.59,3.01,6.92,4.87,10.22c6.73,11.95,2.41,22.89-2.91,33.75c-0.35,0.72-0.86,1.43-1.46,1.97 c-7.11,6.38-14.48,12.5-21.24,19.22c-2.08,2.07-3.1,5.7-3.62,8.77c-1.92,11.44-3.81,22.92-4.93,34.46 c-0.5,5.16,1.06,10.49,1.28,15.75c0.23,5.7,0.39,11.47-0.15,17.13c-1.15,12.11-2.83,24.17-4.11,36.27c-0.18,1.72,0.8,3.53,1.13,5.33 c0.88,4.76-0.22,6.23-4.71,5.17c-4.53-1.06-8.86-2.94-14.27-4.8c1.98-1.62,2.84-2.83,3.94-3.12c5.42-1.44,7-5.2,6.39-10.23 c-1.39-11.39-3.15-22.73-4.24-34.14c-0.53-5.56,0.16-11.23,0.24-16.85c0.06-4.49,0.01-8.97,0.01-14.72 c-2.79,1.53-5.2,2.27-6.79,3.83c-4.26,4.19-8.39,8.56-12.11,13.22c-1.55,1.95-2.19,4.76-2.79,7.29c-0.47,1.99,0.6,5.02-0.48,6.05 c-2.17,2.08-5.2,3.79-8.13,4.38c-3.61,0.73-7.49,0.18-12.26,0.18c6.34-8.69,11.91-16.11,17.22-23.71c3.29-4.71,6.23-9.67,9.24-14.58 c2.15-3.5,3.76-7.4,6.3-10.57c5.38-6.73,6.74-14.28,6.72-22.64C0.88,68.3,1.36,57.91,2.26,47.58c0.69-7.85,2.15-15.67,3.7-23.41 c0.77-3.83,2.89-7.39,3.72-11.22c1.83-8.4-1.9-16-4.38-23.95C2.96-5.34-0.31,0.12-1.5,6c-1.96,9.72-7.34,17.44-12.26,25.57 c-4.39,7.25-8.79,14.52-12.75,22.01c-2.64,5-4.5,10.41-6.83,15.92c-4.82-5.28-4.65-10.59-0.94-16.97 C-21.4,30.4-12.08,6.78-6.17-18.12c1.4-5.88,1.24-12.11,2.23-18.12c1.2-7.27,4.15-9.56,11.39-9.69c8.65-0.14,13.86-4.77,14.48-13.51 c0.35-5.01,0.16-10.11-0.28-15.12c-0.82-9.3,2.49-16.57,10.17-21.69c2.08-1.39,4.78-1.87,7.2-2.76C39.35-99,39.69-99,40.02-99z',
        'path://M-39,33.03c3.72-9.74,12.97-12.87,20.96-17.43c9.51-5.43,19.2-10.54,28.69-16 c1.77-1.02,3.35-2.85,4.33-4.67C21.44-17,27.82-28.95,33.95-41.04c2.13-4.2,4.95-6.01,9.7-6.09c3.68-0.06,7.52-0.92,10.97-2.25 c5.09-1.95,4.85-5.2,1.1-9.01c-5.12-5.21-10.89-10.1-13.23-17.54c-1.71-5.44,0.78-15.62,4.87-18.74 c4.12-3.15,12.55-3.84,16.69-0.12c3.39,3.04,6.44,7.27,7.8,11.56c1.96,6.16,3.31,12.9,2.99,19.29 c-0.45,9.21,6.35,16.71,15.73,16.97c7.94,0.21,9.27,0.78,10.69,8.61c5.23,28.73,19.4,53.73,32.21,79.33 c1.95,3.9,4.32,7.71,5.51,11.84c1.03,3.61,0.66,7.61,0.91,11.45c-0.73,0.14-1.45,0.28-2.18,0.42c-0.49-1.57-0.98-3.15-1.47-4.72 c-0.22,0.09-0.44,0.19-0.66,0.28c-0.85-2.62-1.7-5.24-2.74-8.45c-0.9,2.53-1.55,4.4-2.21,6.26c-0.41-0.03-0.83-0.06-1.24-0.08 c-0.19-2.78-0.35-5.56-0.56-8.34c-0.67-9.04-7.05-14.8-12.04-21.47c-5.2-6.95-10.31-14.09-14.36-21.73 c-3.56-6.7-5.59-14.21-9-21.29c-3.02,9.7-8.69,18.66-6.3,29.2c0.63,2.78,2.68,5.21,3.87,7.9c4.73,10.64,5.56,22.14,6.92,33.46 c1.21,10.13,1.88,20.38,1.96,30.59c0.06,7.02-1.67,14.04-1.85,21.08c-0.12,4.66,0.83,9.41,1.73,14.03 c1.21,6.22,2.81,12.36,4.28,18.52c0.3,1.26,0.69,2.51,1.23,3.69c3.92,8.54,7.79,17.1,11.88,25.55c1.3,2.67,3.24,5.04,5.07,7.83 c-2.19,0.86-3.64,1.76-5.17,1.97c-3.53,0.47-6.9,0.64-8.13-4.11c-1.71-6.58-3.78-13.07-5.87-19.54c-0.44-1.35-1.6-2.47-3.21-3.33 c0,16.17-7.35,32.86,6.17,48.11c-3.55,0-5.95,0.01-8.36,0c-7.59-0.03-7.66-0.54-7.72-7.64c-0.11-13.74-0.69-27.4-5.27-40.71 c-1.72-5.01-0.38-11.01-1.01-16.49c-0.67-5.79-2.11-11.48-3.08-17.24c-2.52-14.91-12.01-26.06-20.01-38.12 c-5.34-8.06-10.18-16.56-14.25-25.32c-5.18-11.16-5.52-22.61,1.24-33.57c3.68-5.96,3.12-12.27,1.17-18.55 c-2.5-8.03-5.22-16-8.05-24.61c-0.91,1.44-1.76,2.86-2.68,4.24C32.9-10.29,28.04-2.46,22.63,4.96c-5.34,7.34-14.22,8.45-22.08,10.9 c-8.48,2.65-17.2,4.46-23.03,12.01c-1.84,2.39-3.61,4.84-5.41,7.26c-0.39-0.17-0.78-0.34-1.16-0.51c0.81-2.38,1.62-4.76,2.43-7.14 c-0.2-0.22-0.39-0.44-0.59-0.66c-1.24,1.3-2.31,2.88-3.77,3.83c-2.54,1.66-5.33,2.94-8.02,4.37C-39,34.36-39,33.7-39,33.03z',
        'path://M80,100.49c0,5.23,0.13,10.46-0.03,15.69c-0.2,6.3-0.57,12.6-0.99,18.9 c-0.94,14.08-2.08,28.14-2.87,42.22c-0.41,7.29,4.95,14.31,12.03,16.62c1.22,0.4,2.43,0.84,3.65,2.16c-1.8,0.35-3.59,0.91-5.4,1 c-5.4,0.3-10.83,0.7-16.22,0.42c-1.44-0.07-3.7-2.25-3.95-3.74c-0.56-3.4,0.14-6.98-0.13-10.45c-0.77-9.67-0.8-19.56-3-28.92 c-1.97-8.39-2.18-16.07-0.02-24.35c1.28-4.91,1.34-10.48,0.5-15.52c-2.09-12.71-4.95-25.31-7.65-37.92 c-0.34-1.57-1.3-3.33-2.52-4.33c-3.71-3.01-7.37-6.38-11.62-8.38c-13.61-6.41-19.23-28.93-9.14-42.66 c5.41-7.36,5.32-13.85,0.74-21.4c-4.33-7.14-7.8-14.79-11.71-22.32C16.35-14.03,11.08-4.82,4.94,3.76 C1.8,8.13-2.43,12.19-7.04,14.93c-5.3,3.15-11.39,5.39-17.43,6.76c-9.05,2.05-14.31,7.59-17.67,15.68 c-0.43,1.05-1.13,1.99-1.76,2.95c-0.15,0.22-0.52,0.29-1.8,0.94c0.32-2.2,0.61-3.74,0.74-5.3c0.09-1.14-0.04-2.3-0.07-3.46 c-1.38,0.26-3.21,0.05-4.06,0.86c-2,1.91-3.5,4.33-5.27,6.49c-0.5,0.61-1.22,1.03-1.95,1.61c-1.02-5.19,1.42-10.27,7.11-13.9 C-36.09,19.24-22.82,11.2-9.77,2.82c2.12-1.36,3.99-3.6,5.17-5.85C1.52-14.72,7.44-26.52,13.29-38.35 c2.21-4.48,5.11-7.27,10.48-7.83c3.23-0.34,6.27-2.47,9.89-4.01c-4.23-4.83-8.31-8.74-11.49-13.28c-6.34-9.03-7.03-22.38,3.14-29.92 c6.9-5.12,13.79-4.47,20.85,0.69c6.15,4.5,6.15,11.2,7.55,17.13c1.32,5.6,0.82,11.84,0.1,17.67c-0.73,5.9-0.29,7.53,5.3,8.73 c0.96,0.21,1.99,0.17,2.98,0.19C72.51-48.76,74.44-47.06,76-36.52c1.83,12.35,2.1,25.03,6.99,36.77 c3.28,7.88,6.57,15.79,10.47,23.38c3.66,7.12,8.05,13.87,12.25,20.7c2.97,4.84,3.11,12.13-0.65,17c-1.8-2.05-3.45-3.92-5.01-5.7 c0.04-0.04-0.45,0.53-1.46,1.71C94.83,37.86,80.48,24.72,71.82,8.18c0.46,3.43,0.09,7.26,1.54,10.2c3.95,8.01,1.92,16.67,3.56,24.91 c1.63,8.22,1.87,16.74,3.79,24.88c0.88,3.73,4.32,6.84,6.58,10.25c1.09,1.65,2.2,3.29,3.17,5.01c4.84,8.58,9.09,17.55,14.58,25.69 c7.27,10.79,15.21,21.16,23.39,31.28c6.19,7.67,13.08,14.8,19.92,21.92c2.93,3.04,6.54,5.42,9.96,8.2 c-6.92,4.09-12.67,3.33-19.87-2.17c-1.82-1.39-3.76-2.79-5.87-3.62c-4.12-1.63-4.47-4.54-3.73-8.3c0.26-1.33,0.17-3.42-0.66-4.18 c-7.53-6.87-14.85-14.07-23.04-20.07c-7.75-5.68-12.26-13.2-16.11-21.54c-1.44-3.12-3.31-6.06-5.14-8.98 c-0.5-0.8-1.57-1.24-2.38-1.85C81.01,100.03,80.5,100.26,80,100.49z',
        'path://M-57,41.03c3.65-4.15,7.17-8.43,10.98-12.42c6.53-6.83,13.31-13.41,19.84-20.23 c1.76-1.84,3.51-3.98,4.4-6.31c3.8-9.99,6.99-20.23,10.99-30.14c2.74-6.79,5.65-13.62,12.37-17.95c4.17-2.68,5.12-7.31,4.29-11.96 c-0.3-1.67-2.02-3.08-3.35-4.97c-2.57,5.59-4.62,10.03-7.21,15.66c-4.79-6.43-9.76-10.83-11.68-16.31 c-1.77-5.04-1.18-11.44,0.04-16.86c1.27-5.62,5.24-9.71,12.03-9.7c1.55,0,3.1-1.68,4.66-2.55c9.3-5.22,20.47-1.53,25.73,7.59 c4.06,7.04,4.84,14.6,5.57,22.26c0.65,6.82-0.32,7.59-8.26,8.11c0,1.97,0,3.96,0,5.95c8.01-0.17,8.01,0.43,12.02,7.52 c2.09,3.69,6.34,6.1,9.41,9.29c2.48,2.58,7.04,3.14,7.24,8c0.29,6.79,0.46,6.78-6.43,11.08c0,15.78-0.02,31.49,0.03,47.2 c0,1.23,0.29,2.51,0.71,3.67c1.64,4.59,3.27,9.19,5.13,13.7c0.79,1.92,1.88,3.83,3.26,5.36c7.54,8.36,15.45,16.41,22.75,24.96 c5.09,5.97,9.05,12.9,14.18,18.84c9.73,11.26,19.47,22.59,30.08,33c8.84,8.67,18.88,16.13,28.51,23.98 c2.52,2.06,5.48,3.58,8.27,5.36c-4.02,3.54-10.94,4.01-16.34,1.62c-4.76-2.11-9.63-4.03-14.6-5.56c-5.6-1.72-6.59-3.72-4.42-9.32 c0.47-1.22-0.12-3.8-1.11-4.5c-7.36-5.15-14.66-10.53-22.55-14.78c-8.49-4.57-15.35-10.3-19.59-19.04 c-4.29-8.84-11.6-14.85-19.48-20.29c-3.2-2.21-6.43-4.4-9.64-6.6c-0.53,0.17-1.05,0.33-1.58,0.5c-0.11,11.17,0.12,22.36-0.45,33.51 c-0.29,5.72-2.33,11.33-3,17.05c-1.68,14.31-3.04,28.65-4.51,42.98c-0.34,3.34,0.94,5.76,4.12,7.18c6.09,2.73,12.14,5.56,18.61,9.26 c-3.96,0.36-7.93,0.72-11.89,1.08c-4.92,0.45-9.91,0.53-14.76,1.42c-6.96,1.28-9.68-0.99-8.69-8.02c1.73-12.28,0.67-24.36-1.4-36.56 c-1.08-6.36-2.02-14.02,0.49-19.47c5.62-12.19,2.4-23.48,0.01-35.2c-2.05-10.04-3.8-20.14-5.9-30.17c-0.32-1.52-1.72-2.91-2.87-4.13 c-3.6-3.83-8.03-7.09-10.85-11.41c-6.61-10.14-2.6-19.6,3.74-28.13c5.27-7.1,6.85-14.1,2.15-21.95c-3.79-6.34-7.53-12.7-11.38-19 c-0.46-0.75-1.41-1.2-2.77-2.3c-3.27,7.28-6.98,13.9-9.24,20.98c-3.58,11.2-12.11,17.05-21.53,22.3c-1.86,1.04-3.57,2.44-5.53,3.21 c-4.29,1.67-6.09,3.88-4.9,9.01c0.69,2.96-1.31,6.55-2.1,9.86c-0.5,0.03-0.99,0.06-1.49,0.08c-0.18-2.57-0.36-5.14-0.66-9.41 c-3.45,4.38-6.11,7.75-9.33,11.84c-1.07-2.08-1.61-3.13-2.15-4.18C-57,43.7-57,42.36-57,41.03z'
    ];
    const bodyMax = 150;
    const labelSetting = {
        show: true,
        position: 'top',
        offset: [0, -20],
        formatter: function (param) {
            return ((param.value / bodyMax) * 100).toFixed(0) + '%';
        },
        fontSize: 18,
        fontFamily: 'Arial'
    };
    const markLineSetting = {
        symbol: 'none',
        lineStyle: {
            opacity: 0.3
        },
        data: [
            {
                type: 'max',
                label: {
                    formatter: 'max: {c}'
                }
            },
            {
                type: 'min',
                label: {
                    formatter: 'min: {c}'
                }
            }
        ]
    };
    const option = {
        tooltip: {},
        legend: {
            data: ['typeA', 'typeB'],
            selectedMode: 'single'
        },
        xAxis: {
            data: ['a', 'b', 'c', 'd', 'e'],
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: { show: false }
        },
        yAxis: {
            max: bodyMax,
            offset: 20,
            splitLine: { show: false }
        },
        grid: {
            top: 'center',
            height: 230
        },
        markLine: {
            z: -100
        },
        series: [
            {
                name: 'typeA',
                type: 'pictorialBar',
                symbolClip: true,
                symbolBoundingData: bodyMax,
                label: labelSetting,
                data: [
                    {
                        value: 123,
                        symbol: symbols[0]
                    },
                    {
                        value: 34,
                        symbol: symbols[1]
                    },
                    {
                        value: 101,
                        symbol: symbols[2]
                    },
                    {
                        value: 89,
                        symbol: symbols[3]
                    },
                    {
                        value: 72,
                        symbol: symbols[4]
                    }
                ],
                markLine: markLineSetting,
                z: 10
            },
            {
                name: 'typeB',
                type: 'pictorialBar',
                symbolClip: true,
                symbolBoundingData: bodyMax,
                label: labelSetting,
                data: [
                    {
                        value: 12,
                        symbol: symbols[0]
                    },
                    {
                        value: 44,
                        symbol: symbols[1]
                    },
                    {
                        value: 131,
                        symbol: symbols[2]
                    },
                    {
                        value: 33,
                        symbol: symbols[3]
                    },
                    {
                        value: 142,
                        symbol: symbols[4]
                    }
                ],
                markLine: markLineSetting,
                z: 10
            },
            {
                name: 'full',
                type: 'pictorialBar',
                symbolBoundingData: bodyMax,
                animationDuration: 0,
                itemStyle: {
                    color: '#ccc'
                },
                data: [
                    {
                        value: 1,
                        symbol: symbols[0]
                    },
                    {
                        value: 1,
                        symbol: symbols[1]
                    },
                    {
                        value: 1,
                        symbol: symbols[2]
                    },
                    {
                        value: 1,
                        symbol: symbols[3]
                    },
                    {
                        value: 1,
                        symbol: symbols[4]
                    }
                ]
            }
        ]
    };
    let chartDom = document.getElementById(dom);
    const chart = echarts.init(chartDom);
    chart.setOption(option)
    window.addEventListener("resize", () => {
        chart.resize();
    })
}
