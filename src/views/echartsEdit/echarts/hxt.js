// hxt 盒须图
import * as echarts from "echarts";

export const initHxt01 = (dom) => {
    const chartDom = document.getElementById(dom);
    const myChart = echarts.init(chartDom);

    // let a = [
    //     20,   下边缘
    //     30,   下四分位数
    //     40,   中位数
    //     50,   上四分位数
    //     100   上边缘
    // ]

    const data = [
        [20, 30, 40, 50, 100],
        [10, 25, 40, 60, 70],
        [24, 34, 45, 55, 66],
        [32, 45, 50, 60, 70],
        [44, 59, 70, 75, 88],
        [28, 38, 48, 58, 68],
    ]

    const dataNew = data.map(item => {
        // 偏移量 计算占比值 = 盒须图 （上边缘 - 中位数）/（上边缘 - 下边缘）
        const offset = ((item[4] - item[2]) / (item[4] - item[0]))
        const color = {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0,
                color: 'rgba(0, 247, 167, 1)'  // 0% 处的颜色
            }, {
                offset: offset,
                color: 'rgba(0, 247, 167, 1)' // 0% 处的颜色
            }, {
                offset: offset,
                color: 'rgba(0, 173, 255, 1)' // 0% 处的颜色
            }, {
                offset: 1,
                color: 'rgba(0, 173, 255, 1)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
        }

        return {
            value: item,
            itemStyle: {
                borderColor: color,
                borderWidth: 2,
                color: color,
            }
        }
    })

    const name = ['指数1', '指数2', '指数3', '指数4', '指数5', '指数6'];

    let option = {
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '50',
            right: '20',
            top: '40',
            bottom: '40',
        },
        xAxis: {
            type: 'category',
            data: name,
            axisLabel: {
                color: 'rgba(148, 178, 226, 1)',
                fontSize: 12,
                fontWeight: '500'
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(30, 45, 102, 1)',
                }
            },
            splitLine: {
                show: false
            }
        },

        yAxis: {
            type: 'value',
            // name: '分数（分）',
            // nameTextStyle: {
            //     color: '#777777',
            //     fontSize: 13,
            //     padding: [0, 0, 0, 60]
            // },
            axisLabel: {
                color: 'rgba(148, 178, 226, 1)',
                fontSize: 14,
                fontWeight: 'bold',
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    type: [5, 6],
                    dashOffset: 0,
                    color: 'rgba(30, 45, 102, 1)',
                },
            }

        },
        series: [
            {
                name: 'boxplot',
                type: 'boxplot',
                data: dataNew,
                tooltip: {
                    formatter: function (param) {
                        return [

                            'Upper: ' + param.data[5] + ' 分',
                            'Q3: ' + param.data[4] + ' 分',
                            'Median: ' + param.data[3] + ' 分',
                            'Q1: ' + param.data[2] + ' 分',
                            'Lower: ' + param.data[1] + ' 分'
                        ].join('<br/>')
                    }
                }
            },
        ]
    };

    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    });
}
