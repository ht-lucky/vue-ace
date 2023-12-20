import * as echarts from 'echarts';
import { fontSize, TOOLTIP_STYLE, GRID, _cnDic, _divisor, intervalFnc, maxFnc, fontChart } from "../../utils";
export const initScatter01 = (dom) => {

    // 散点图
    var dataset = {
        dimensions: ["地区", "用地面积", "比例"],
        source: [
            { 地区: "西湖区", 用地面积: 1523, 比例: 2100 },
            { 地区: "上城区", 用地面积: 5223, 比例: 2500 },
            { 地区: "拱墅区", 用地面积: 2123, 比例: 4100 },
            { 地区: "滨江区", 用地面积: 4123, 比例: 1500 },
            { 地区: "萧山区", 用地面积: 3123, 比例: 3500 },
            { 地区: "余杭区", 用地面积: 7123, 比例: 2500 },
            { 地区: "钱塘区", 用地面积: 6123, 比例: 1500 },
            { 地区: "临平区", 用地面积: 5123, 比例: 3500 },
            { 地区: "桐庐县", 用地面积: 3123, 比例: 5500 },
            { 地区: "淳安县", 用地面积: 7123, 比例: 7500 },
            { 地区: "建德市", 用地面积: 5123, 比例: 1500 },
        ]
    }
    let color = ['#4CBDFB55', '#004D5C77']
    let borderColor = ['#4CBDFB', '#38D4D5']
    function series() {
        const s = []
        for (var i = 0; i < dataset.dimensions.length - 1; i++) {
            const dim = dataset.dimensions[(i + 1)]
            s.push({
                type: 'scatter',
                symbolSize: function (data) {
                    const size = Math.sqrt(data[dim])
                    let retSize = 0
                    if (size < 5000) {
                        retSize = size / 2
                    } else {
                        retSize = size / 5e2
                    }
                    //  控制散点大小
                    return retSize >= 80 ? 80 : retSize < 10 ? retSize + 5 : retSize
                },
                emphasis: {
                    label: {
                        show: true,
                        position: 'bottom'
                    }
                },
                itemStyle: {
                    color: color[i],
                    borderColor: borderColor[i]
                }
            });

        }
        return s
    }
    const option = {
        tooltip: {
            ...TOOLTIP_STYLE, ...{
                trigger: 'item',
            },
            formatter(params) {
                let toolVal = '';
                if (params.seriesName == '用地面积') {
                    toolVal = params.name + '<br/>' + params.seriesName + ':' + params.data[params.seriesName];
                } else {
                    let a = params.data[params.seriesName] / params.data['用地面积']
                    toolVal = params.name + '<br/>' + params.seriesName + ':' + (a.toFixed(2)) + '%';
                }
                return toolVal
            }
        },
        grid: {
            left: '50',
            right: '20',
            bottom: '30',
            top: '44',
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLabel: {
                rotate: 30,
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
            scale: true
        },
        dataset: dataset,
        series: series()
    };
    const chartDom = document.getElementById(dom);
    const myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}