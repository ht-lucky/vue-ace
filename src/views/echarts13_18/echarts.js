import { util } from "../../common/util";
import "echarts-gl";
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
        toolVal = params[0].marker + " " + '适龄人口占比：' + params[0].data
        return toolVal
        // console.log(params)
    }
}
const option1 = {
    tooltip: {
        ...TOOLTIP_STYLE, ...{
            trigger: 'item',
            formatter(e, v) {
                if (e.name) {
                    return e.marker + e.name + ": " + e.value + "人" + "<br/>" + '  ' + "占比 " + e.percent + '%'
                }
            },
        }
    },
    title: {
        text: '人才分布',
        textStyle: {
            color: '#fff',
            fontSize: fontSize(0.18)
        },
        left: 'center',
        top: 'center'
    },
    color: ['rgba(36, 123, 252, 1)', 'rgba(0, 220, 226, 1)', 'rgba(239, 149, 43, 1)',
        'rgba(36, 123, 252, 0.2)', 'rgba(0, 220, 226, 0.2)', 'rgba(239, 149, 43, 0.2)'],

    series: [
        {
            name: '人才分布',
            type: 'pie',
            radius: ['74%', '84%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            itemStyle: {
                borderColor: 'none',
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
                { value: 33, name: '省151人才数' },
                { value: 33, name: '享受国务院特殊津贴专家' },
                { value: 33, name: '引进人才数' },

            ]
        },
        {
            type: 'pie',
            radius: ['60%', '70%'],
            avoidLabelOverlap: false,
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
                { value: 33 },
                { value: 33 },
                { value: 33 },

            ]
        }
    ]
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
        data: [{ name: '地块数量', icon: 'circle', }, { name: '地块面积' }]
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
                        { offset: 0, color: 'rgba(0, 213, 255, 1)' },
                        { offset: 1, color: 'rgba(0, 171, 255, 1)' }
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
                        { offset: 1, color: 'rgba(0, 121, 182, 0.8)' },
                        { offset: 1, color: 'rgba(0, 121, 182, 0.8)' }
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
            symbol: 'image://' + require('./circle.svg'),
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
let maxData = 2000
const option4 = {
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
            symbol: 'image://' + require('./zzt-icon.png'),
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
// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
    // 计算
    const midRatio = (startRatio + endRatio) / 2;
    const startRadian = startRatio * Math.PI * 2;
    const endRadian = endRatio * Math.PI * 2;
    const midRadian = midRatio * Math.PI * 2;
    // 如果只有一个扇形，则不实现选中效果。
    if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
    }
    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    k = 1;
    // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
    // 计算高亮效果的放大比例（未高亮，则比例为 1）
    const hoverRate = isHovered ? 1.05 : 1;
    // 返回曲面参数方程
    return {
        u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32,
        },
        v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
        },
        x: function (u, v) {
            if (u < startRadian) {
                return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        y: function (u, v) {
            if (u < startRadian) {
                return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        z: function (u, v) {
            if (u < -Math.PI * 0.5) {
                return Math.sin(u);
            }
            if (u > Math.PI * 2.5) {
                return Math.sin(u) * h * 0.1;
            }
            return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        },
    };
}
/**
 * 绘制3d图
 * @param pieData 总数据
 * @param internalDiameterRatio:透明的空心占比
 * @param distance 视角到主体的距离
 * @param alpha 旋转角度
 * @param pieHeight 立体的高度
 * @param opacity 饼或者环的透明度
 */
function getPie3D(pieData, internalDiameterRatio, distance, alpha, pieHeight, opacity = 1) {
    const series = [];
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    const legendData = [];
    const k =
        typeof internalDiameterRatio !== 'undefined' ?
            (1 - internalDiameterRatio) / (1 + internalDiameterRatio) :
            1 / 3;
    // 为每一个饼图数据，生成一个 series-surface 配置
    for (let i = 0; i < pieData.length; i += 1) {
        sumValue += pieData[i].value;
        const seriesItem = {
            name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
            type: 'surface',
            parametric: true,
            wireframe: {
                show: false,
            },
            pieData: pieData[i],
            pieStatus: {
                selected: false,
                hovered: false,
                k: k,
            },
        };
        if (typeof pieData[i].itemStyle !== 'undefined') {
            const itemStyle = {};
            if (typeof pieData[i].itemStyle.color !== 'undefined') {
                itemStyle.color = pieData[i].itemStyle.color;
            }
            if (typeof pieData[i].itemStyle.opacity !== 'undefined') {
                itemStyle.opacity = pieData[i].itemStyle.opacity;
            }
            seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
    }
    // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    for (let i = 0; i < series.length; i += 1) {
        endValue = startValue + series[i].pieData.value;
        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        console.log(series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            series[i].pieData.value)
        series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            series[i].pieData.value
        );
        startValue = endValue;
        legendData.push(series[i].name);
    }
    return series;
}
const optionsData = [{
    name: 'A',
    value: 11,
    itemStyle: {
        color: '#68CEE7',
        // opacity: 1,
    },
},
{
    name: 'B',
    value: 33,
    itemStyle: {
        color: '#C534F5',
        // opacity: 1,
    },
},
{
    name: 'C',
    value: 22,
    itemStyle: {
        color: '#6737F7',
        // opacity: 1,
    },
}, {
    name: 'D',
    value: 14,
    itemStyle: {
        color: '#3152F7',
        // opacity: 1,
    },
},
];
const series = getPie3D(optionsData, 0.8, 240, 28, 26, 1.5);
series.push({
    name: 'pie2d',
    type: 'pie',
    label: {
        show: false
    },
    labelLine: {
        show: false
    },
    startAngle: -30, //起始角度，支持范围[0, 360]。
    clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
    radius: ['90%'],
    center: ['90%'],
    data: optionsData,
    itemStyle: {
        opacity: 0,
    },
});
const TOOLTIP_STYLE5 = {
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
    formatter: (params) => {
        if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
            let bfb = series[params.seriesIndex].pieData.name + ':' + series[params.seriesIndex].pieData.value;
            return (
                `${params.seriesName}<br/>` +
                `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
                `${bfb}`
            );
        }
    },
};
const option5 = {
    tooltip: {
        trigger: 'item',
        ...TOOLTIP_STYLE5
    },
    grid: {
        left: '50',
        right: '10',
        bottom: '40',
        top: '-50',
    },
    label: {
        show: false,
        position: 'center'
    },
    xAxis3D: {
        min: -1,
        max: 1,
    },
    yAxis3D: {
        min: -1,
        max: 1,
    },
    zAxis3D: {
        min: -1,
        max: 1,
    },
    grid3D: {
        show: false,
        boxHeight: 30, // 三维笛卡尔坐标系在三维场景中的高度
        viewControl: {
            alpha: 40,
            beta: 40,
            distance: 500, //调整视角到主体的距离，类似调整zoom
            rotateSensitivity: 0, // 设置为0无法旋转
            zoomSensitivity: 0, // 设置为0无法缩放
            panSensitivity: 0, // 设置为0无法平移
            autoRotate: false, // 自动旋转
        },
    },
    series: series,
}
const TOOLTIP_STYLE6 = {
    backgroundColor: 'rgba(0, 24, 62, 0.6)',
    borderWidth: 0,
    extraCssText: 'box-shadow: 0px 0px 14px 0px rgba(63, 129, 255, 0.8);color: #fff',
    textStyle: {
        color: '#fff',
        fontSize: fontChart(1.4),
        align: 'left' // 内容居左
    },
    axisPointer: {
        type: 'shadow'
    },
    // formatter(params) {
    //     // debugger
    //     let toolVal = '';
    //     toolVal =params[0].axisValue + '</br>' + '适龄人口占比：' + params[0].data
    //     return toolVal
    //     // console.log(params)
    // }
};
const option6 = {
    tooltip: {
        trigger: 'axis',
        ...TOOLTIP_STYLE6
    },

    grid: {
        left: '50',
        right: '10',
        bottom: '40',
        top: '60',
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
                fontSize: fontChart(1.2),

            }
        },
    }],
    yAxis: [{
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
        name: '排污许可证发放量：',
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
                    // 这里的$echarts是项目中的echarts示例，改成对应的名字就好
                    return new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 1,
                        color: 'rgba(115, 164, 240, 1)'
                    }, {
                        offset: 0,
                        color: 'rgba(63, 107, 221, 0)'
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
}

export { option1, option2, option3, option4, option5, option6 }