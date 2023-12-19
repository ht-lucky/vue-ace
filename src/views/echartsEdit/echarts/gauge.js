import * as echarts from 'echarts'

export const initGauge = (dom) => {
    var demoData = [
        { name: 'CNC-1', value: 60, unit: '', pos: ['50%', '95%'] },
    ];
    let option = {
        series: (function () {
            var result = [];
            demoData.forEach(function (item) {
                result.push(
                    {
                        name: item.name,
                        type: 'gauge',
                        center: item.pos,
                        radius: '175%',
                        startAngle: 180,
                        endAngle: 0,
                        min: 0,
                        max: 100,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 4,
                                shadowBlur: 0,
                                color: [
                                    [0, 'rgb(111, 52, 251)'],
                                    [0.19, 'rgb(111, 52, 251)'],
                                    [0.2, 'transparent'],
                                    [0.79, 'rgb(52, 248, 255)'],
                                    [0.8, 'transparent'],
                                    [1, 'rgb(251, 125, 52)'],
                                ],
                            },
                        },
                        axisTick: {
                            show: 0,
                        },
                        splitLine: {
                            show: 0,
                        },
                        axisLabel: {
                            show: 0,
                        },
                        pointer: {
                            show: false,
                        },
                        detail: {
                            show: false,
                        },
                        data: [
                            {show: false,
                            },
                        ],
                    },
                    {
                        name: item.name,
                        center: item.pos,
                        type: 'gauge',
                        radius: '160%',
                        startAngle: 180,
                        endAngle: 0,
                        min: 0,
                        max: 100,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 30,
                                color: [
                                    [
                                        item.value / 100,
                                        new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                                            {
                                                offset: 0,
                                                // color: '#64affd',
                                                color: 'rgba(100, 175, 253, 0)'
                                            },
                                            {
                                                offset: 1,
                                                color: '#3477FB',
                                            },
                                        ]),
                                    ],
                                    [1, 'rgba(255,255,255,.0)'],
                                ],
                            },
                        },
                        axisTick: {
                            show: 0,
                        },
                        splitLine: {
                            show: 0,
                        },
                        axisLabel: {
                            show: 0,
                        },
                        // pointer: {
                        //     show: true,
                        //     length: '100%',
                        // },
                        detail: {
                            show: false,
                            offsetCenter: [0, '50%'],
                            textStyle: {
                                fontSize: 24,
                                color: '#ff244a',
                            },
                            formatter: ['{value}' + (item.unit || ''), '{name|' + item.name + '}'].join('\n'),
                            rich: {
                                name: {
                                    fontSize: 20,
                                    lineHeight: 60,
                                    color: '#fff',
                                    fontWeight: '100',
                                },
                            },
                        },
                        itemStyle: {
                            color: 'rgba(255, 36, 74,.3)',
                            borderColor: 'transparent',
                            decal: {
                                symbol: 'none'
                            }
                        },
                        pointer: {
                            icon: 'path://M276.864611 16.643186 271.57237 276 281.974361 276', // 指图片地址
                            width: 12,
                            length: '80%',
                            offsetCenter: [0, '-20%'],
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                                    {
                                        offset: 0,
                                        color: 'rgba(255, 255, 255, 1)'
                                    },
                                    {
                                        offset: 0.9,
                                        color: 'rgba(255, 255, 255, 1)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(255, 255, 255, 0)',
                                    },
                                ]),
                            }
                        },
                        data: [
                            {
                                value: item.value,
                            },
                        ],
                    },
                    {
                        name: item.name,
                        center: item.pos,
                        type: 'gauge',
                        radius: '162%',
                        startAngle: 180,
                        endAngle: 0,
                        min: 0,
                        max: 100,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 14,
                                color: [
                                    [
                                        1,
                                        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                            {
                                                offset: 0,
                                                color: 'rgba(52, 119, 251, 0.3)',
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(52, 119, 251, 0.3)',
                                            },
                                        ]),
                                    ],
                                ]
                            },
                        },
                        axisTick: {
                            show: 0,
                        },
                        splitLine: {
                            show: 0,
                        },
                        axisLabel: {
                            show: 0,
                        },
                        pointer: {
                            show: false,
                            length: '100%',
                        },
                    },
                    {
                        type: 'gauge',
                        radius: '165%',
                        center: item.pos,
                        splitNumber: 5,
                        min: 0,
                        max: 100,
                        startAngle: 180,
                        endAngle: 0,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 6,
                                color: [
                                    [
                                        1,
                                        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                            {
                                                offset: 0,
                                                color: '#6B99F6',
                                            },
                                            {
                                                offset: 1,
                                                color: '#6B99F6',
                                            },
                                        ]),
                                    ],
                                ],
                            },
                        },
                        axisLabel: {
                            distance: 10,
                            textStyle: {
                                color: '#fff',
                                fontSize: '14',
                            },
                        },
                        axisTick: {
                            distance: 0,
                            lineStyle: {
                                color: "#fff",
                            },
                            length: 6,
                            show: false
                        },
                        splitLine: {
                            distance: 0,
                            show: true,
                            length: 30,
                            lineStyle: {
                                color: 'rgb(190, 212, 255)',
                                width: 1
                            },
                        },
                        pointer: {
                            show: 0,
                        },
                        detail: {
                            show: 0,
                        },
                    }
                );
            });
            return result;
        })(),
    };

    let mychart = echarts.init(document.getElementById(dom));
    mychart.setOption(option);
    window.addEventListener("resize", () => {
        mychart.resize();
    });
}
