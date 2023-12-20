import * as echarts from 'echarts'

import huzhouMapJson from '../json/huzhou.json'
const mapJson = huzhouMapJson

// 湖州地图
export const huzhouMap = (dom) => {
    var img2 = 'image://data:image/png;base64,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';
    var geoCoordMap = {
        '吴兴区': [120.105765, 30.962269],
        '安吉县': [119.687891, 30.631974],
    }
    var customerBatteryCityData = [
        {name: "吴兴区", value: 1,fdl:'99%',tds:1,fds:101},
        {name: "安吉县", value: 1,fdl:'99%',tds:1,fds:101},
    ]
    function lookVideoGo(){
        alert('1')
    }
    // 动态计算柱形图的高度（定一个max）
    function lineMaxHeight () {
        const maxValue = Math.max(...customerBatteryCityData.map(item => item.value))
        return 0.3
    }
    // 柱状体的主干
    function lineData () {
        return customerBatteryCityData.map((item) => {
            return {
                coords: [geoCoordMap[item.name], [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + item.value * lineMaxHeight()]]
            }
        })
    }
    // 柱状体的顶部
    function scatterData () {
        return customerBatteryCityData.map((item) => {
            return [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + item.value * lineMaxHeight(),item]
        })
    }
    // 柱状体的底部
    function scatterData2 () {
        return customerBatteryCityData.map((item) => {
            return {
                name: item.name,
                value: geoCoordMap[item.name]
            }
        })
    }
    var coordsP = [[
        [120.096243,30.945309],
        [120.020354,30.855572],
        [120.103717,30.838209],
        [120.208351,30.919041]
    ], [
        [119.612164,30.660932],
        [119.698976,30.576896],
        [119.654708,30.661429]
    ]]

    let se = coordsP.map(coords => {
        return {
            type: 'custom',
            renderItem: (params, api) => renderItem(params, api, coords),
            coordinateSystem: 'geo',
            geoIndex: 0,
            data: [0],
            zlevel: 8,
        }
    })
    function renderItem(params, api, coords) {
        // if(params.context.rendered) return
        // params.context.rendered = true
        console.log(8888)

        var points = [];
        for (var i = 0; i < coords.length; i++) {
            points.push(api.coord(coords[i]));
        }
        var color = api.visual('color');
        console.log(points)
        console.log(params.coordSys)
        console.log({
            type: 'polygon',
            shape: {
                points: points
            },
            style: api.style({
                fill: color,
                stroke: echarts.color.lift(color)
            })
        })
        return {
            type: 'polygon',
            shape: {
                points: points
            },
            style: api.style({
                fill: color,
                stroke: echarts.color.lift(color)
            })
        };
    }
    const option = {
        geo: [
            {
                map: 'huzhou',
                zoom: 1,
                roam: false,
                aspectScale: 0.9,
                layoutSize: '95%',
                layoutCenter: ['55%', '50%'],
                // center: [120.093415, 30.900146],
                label: {
                    show: true,
                    color: 'rgba(255,255,255,0.2)',
                },
                itemStyle: {
                    normal: {
                        areaColor: {
                            type: 'linear-gradient',
                            x: 0,
                            y: 400,
                            x2: 0,
                            y2: 0,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(37,108,190,0.3)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(15,169,195,0.3)' // 50% 处的颜色
                            }],
                            global: true // 缺省为 false
                        },
                        borderColor: '#4ecee6',
                        borderWidth: 1
                    },
                    emphasis: {
                        areaColor: {
                            type: 'linear-gradient',
                            x: 0,
                            y: 300,
                            x2: 0,
                            y2: 0,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(37,108,190,1)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(15,169,195,1)' // 50% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                    }
                },
                emphasis: {
                    itemStyle: {
                        areaColor: '#0160AD'
                    },
                    label: {
                        show: 0,
                        color: 'transparent'
                    }
                },
                zlevel: 3
            },
            {
                map: 'huzhou',
                aspectScale: 0.9,
                roam: false, // 是否允许缩放
                zoom: 1, // 默认显示级别
                layoutSize: '95%',
                layoutCenter: ['55%', '50%'],
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(192,245,249,.6)',
                        borderWidth: 2,
                        shadowColor: '#2C99F6',
                        shadowOffsetY: 0,
                        shadowBlur: 120,
                        areaColor: 'rgba(29,85,139,.2)'
                    }
                },
                zlevel: 2,
                silent: true
            },
            {
                map: 'huzhou',
                aspectScale: 0.9,
                roam: false, // 是否允许缩放
                zoom: 1, // 默认显示级别
                layoutSize: '95%',
                layoutCenter: ['55%', '51.5%'],
                itemStyle: {
                    areaColor: 'rgba(0,27,95,0.4)',
                    borderColor: '#004db5',
                    borderWidth: 1
                },
                zlevel: 1,
                silent: true
            },
        ],
        series: [
            // map
            {
                geoIndex: 0,
                showLegendSymbol: true,
                type: 'map',
                roam: true,
                label: {
                    normal: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#2ab8ff',
                        borderWidth: 1.5,
                        areaColor: '#12235c'
                    },
                    emphasis: {
                        areaColor: '#2AB8FF',
                        borderWidth: 0,
                        color: 'red'
                    }
                },
                map: 'huzhou', // 使用
                data: customerBatteryCityData,
                zlevel: 6
                // data: this.difficultData //热力图数据   不同区域 不同的底色
            },
            //柱状体的主干
            {
                type: 'lines',
                zlevel: 5,
                effect: {
                    show: false,
                    symbolSize: 5 // 图标大小
                },
                lineStyle: {
                    width: 6, // 尾迹线条宽度
                    color: 'rgb(22,255,255, .6)',
                    opacity: 1, // 尾迹线条透明度
                    curveness: 0 // 尾迹线条曲直度
                },
                label: {
                    show: 0,
                    position: 'end',
                    formatter: '245'
                },
                silent: true,
                data: lineData()
            },
            // 柱状体的顶部
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                geoIndex: 0,
                zlevel: 5,
                // label: {
                //   show: true,
                //   lineHeight: 15,
                //   formatter: function (item) {
                //   var tipHtml = '';
                //   //  tipHtml = '<div style="font-size: 16px;height: 150px;line-height: 30px;background:#000259;opacity: 0.75;border-radius: 3px;color:#fff">' +  item.name + '&nbsp;&nbsp;&nbsp;<br />'
                //   //  + '合格率&nbsp;&nbsp;' + item.data.fdl + '&nbsp;&nbsp;<br/>'
                //   //  + '不合格数&nbsp;&nbsp;' + item.data.tds + '&nbsp;&nbsp;<br/>'
                //   //  + '合格数&nbsp;&nbsp;' + item.data.fds + '&nbsp;&nbsp;<br/>' +
                //   tipHtml = '{link|合格率:' + item.data[2].fdl + '}'
                //   return tipHtml;
                //   },
                //   position: "top",
                //    rich: {
                //       link: {
                //           height: '30px',
                //           color:'#fff',
                //       }
                //   }
                // },
                // symbol: 'circle',
                // symbolSize: [20, 10],
                // itemStyle: {
                //   color: 'rgb(22,255,255, 1)',
                //   opacity: 1
                // },
                // silent: true,
                label: {
                    normal: {
                        show: true,
                        formatter: function(params) {
                            var name = params.data[2].name
                            var value = params.data[2].fdl
                            // var text = `{tline|${name}}:{fline|${value}}`
                            var text = `{tline|合格率}:{fline|${value}}`
                            return text;
                        },
                        color:'#fff',
                        rich: {
                            fline: {
                                // padding: [0, 25],
                                color: '#fff',
                                fontSize: 14,
                                fontWeight:400
                            },
                            tline: {
                                // padding: [0, 27],
                                color: '#ABF8FF',
                                fontSize: 12,
                            },
                        }
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    color: '#00FFF6',
                    opacity: 1
                },
                symbol: img2,
                symbolSize: [100, 50],
                symbolOffset: [0, -20],
                z: 999,
                data: scatterData()
            },
            // 柱状体的底部
            {
                geoIndex: 0,
                zlevel: 4,
                type: 'effectScatter',
                coordinateSystem: 'geo',
                rippleEffect: {
                    scale: 10,
                    brushType: 'stroke',
                },
                showEffectOn: 'render',
                itemStyle: {
                    normal: {
                        color: '#00FFFF',
                    }
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'bottom',
                        color: '#fff',
                        fontSize: 12,
                        distance: 10,
                        show: true,
                    },
                },
                symbol: 'circle',
                symbolSize: [10, 5],
                // itemStyle: {
                //     // color: '#F7AF21',
                //     color: 'rgb(22,255,255, 1)',
                //     opacity: 1
                // },
                data: scatterData2()
            },
            // 底部外框
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                geoIndex: 0,
                zlevel: 4,
                label: {
                    show: false
                },
                symbol: 'circle',
                symbolSize: [1, 1],
                itemStyle: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0, color: 'rgb(22,255,255, 0)' // 0% 处的颜色
                            },
                            {
                                offset: .75, color: 'rgb(22,255,255, 0)' // 100% 处的颜色
                            },
                            {
                                offset: .751, color: 'rgb(22,255,255, 1)' // 100% 处的颜色
                            },
                            {
                                offset: 1, color: 'rgb(22,255,255, 1)' // 100% 处的颜色
                            }
                        ],
                        global: false // 缺省为 false
                    },
                    opacity: 1
                },
                silent: true,
                data: scatterData2()
            },
            ...se,
        ]
    }
    echarts.registerMap('huzhou', mapJson)
    const chartDom = document.getElementById(dom);
    const myChart = echarts.init(chartDom);
    myChart.setOption(option)
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}