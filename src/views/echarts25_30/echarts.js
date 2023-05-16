import { util } from "../../common/util";
const circle = require('./icon-echarts-circle.png')
const echarts = require('echarts');
// 散点图
var dataset = {
    dimensions: ["部门", "收件量"],
    source: [
        { 部门: "部门1", 收件量: 1523,平均时长:1 },
		{ 部门: "部门2", 收件量: 5223,平均时长:2  },
		{ 部门: "部门3", 收件量: 2123,平均时长:2  },
		{ 部门: "部门4", 收件量: 4123,平均时长:2  },
		{ 部门: "部门5", 收件量: 3123,平均时长:3  },
		{ 部门: "部门6", 收件量: 7123,平均时长:4  },
		{ 部门: "部门7", 收件量: 6123,平均时长:1  },
		{ 部门: "部门8", 收件量: 5123,平均时长:3  },
		{ 部门: "部门9", 收件量: 3123,平均时长:3  },
		{ 部门: "部门10", 收件量: 7123,平均时长:4  },
		{ 部门: "部门11", 收件量: 5123,平均时长:1  },
    ]
}
let color = ['#5B8FF988']
function series() {
    const s = []
    for (var i = 0; i < dataset.dimensions.length - 1; i++) {
        const dim = dataset.dimensions[(i + 1)]
        s.push({
            type: 'scatter',
            symbolSize: function (data) {
                return data['平均时长'] *10
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
            // symbolSize:data[dim],
            emphasis: {
                label: {
                    show: false,
                    position: 'bottom'
                }
            },
            itemStyle: {
                color: color[i],
                // borderColor:borderColor[i]
            }
        });

    }
    return s
}
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
// 字体适配1
function fontSize(res) {
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1920);
    return res * fontSize;
}
// 字体适配2
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
var maxData = 2000;
const TOOLTIP_STYLE1 = {
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
    formatter(e, v) {
        if (e.name) {
            return e.marker + e.name + ": " + e.value + "<br/>" + '  ' + "占比 " + e.percent + '%'
        }
    },
}
const option1 = {
    color: ['#0082FF', 'rgba(255,177,11, 1)'],
    // legend: {
    //     itemHeight: 18,
    //     itemWidth: 18,
    //     data: ['已反馈', '待反馈'],
    //     top: '5%',
    //     left: '0%',
    //     textStyle: {
    //         color: '#fff',
    //         fontSize: 18
    //     },
    // },
    tooltip: {
        trigger: 'item',
        show: true,
    },
    xAxis: {
        axisTick: false,
        data: ['部门1', '部门2', '部门3', '部门4', '部门5', '部门6', '部门7', '部门1', '部门2', '部门3', '部门4', '部门5', '部门6', '部门7'],
        name: '',
        axisLabel: {
            textStyle: {
                color: '#7E7E7E'
            },
        },
        axisLine: {
            lineStyle: {
                color: "#ccc"
            }
        },
    },
    grid: {
        top: '25%',
        left: '2%',
        right: '4%',
        bottom: '5%',
        containLabel: true
    },
    yAxis: [{
        splitLine: {
            show: true,
            lineStyle: {
                type: 'solid',
                color: '#ccc'
            }
        },
        axisLabel: {
            show: false,
            textStyle: {
                color: '#7e7e7e'
            },
        },
    }],
    series: [
        {
            name: '已反馈',
            type: 'bar',
            barWidth: 20,
            stack: 'one',
            // showBackground: true,
            itemStyle: {
                opacity: 1,
                color: function (params) {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0,130,255, 1)', // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: '#15C2FF', // 100% 处的颜色
                    }],
                        false
                    );
                },
            },
            data: [20, 10, 30, 20, 10, 25, 24, 20, 10, 30, 20, 10, 25, 24]
        },
        {
            name: '待反馈',
            type: 'bar',
            barWidth: 20,
            stack: 'one',
            itemStyle: {
                opacity: 1,
                color: function (params) {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255,177,11, 1)', // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: '#FFDA09', // 100% 处的颜色
                    }],
                        false
                    );
                },
            },
            data: [50, 50, 40, 50, 30, 55, 44, 20, 10, 30, 20, 10, 25, 24]
        },
    ]
};
const option2 = {
    color: ['#0052D9', '#029CD4', '#07A872', '#F5BA18', '#ED7B2F'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
    title: {
        text: '整体用时分布',
        top: 10,
        // left:20,
    },
    grid: {
        left: '0%',
        right: '3%',
        bottom: '1%',
        top: '30%',
    },
    // toolbox: {
    //     show:true,
    //     feature: {
    //         dataView: { readOnly: false },
    //         restore: {},
    //         saveAsImage: {}
    //     }
    // },
    // calculable: true,
    series: [
            {
                name: '漏斗图',
                type: 'funnel',
                left: '-2%',
                top: 60,
                //x2: 80,
                bottom: 60,
                width: '80%',
                z: 10,
                // height: {totalHeight} - y - y2,
                // min: 10,
                // max: 100,
                maxSize: '90%',
                minSize: '30%',
                sort: 'descending',
                gap: 2,
                label: {
                    position: 'right',
                    color: '#0000'
                },
                labelLine: {
                    show: false,
                    normal: {
                        length: 0,
                        lineStyle: {
                            width: 0,
                            type: 'solid'
                        }
                    }
                },
                data: [
                    { value: 100, name: "Visit" },
                    { value: 80, name: "Inquiry" },
                    { value: 200, name: "Order" },
                    { value: 80, name: "Click" },
                    { value: 100, name: "Show" },
                ]
            },
        {
            name: '漏斗图',
            type: 'funnel',
            left: '50%',
            top: 60,
            bottom: 60,
            width: '60%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: 0, // 设为 0，表示最大宽度为0，这样此层只会显示label
            borderColor:'#0000',
            // //并且由于宽度为0，漏斗图是居中显示的，所以label线条的起始位置都是中间
            // sort: 'descending',
            // z: 1,// 控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
            // gap: 2,
            itemStyle:{
                borderWidth:0
            },
            label: {
                show: true,
                position: 'right',
                normal: {
                    color: '#333',
                    position: 'right',
                    formatter: function (d) {
                        // var ins = '{aa|' + d.value + '}\n{bb|' + d.percent + '%}';
                        var ins = '{bb|' + d.value + '}天';
                        return ins
                    },
                    rich: {
                        aa: {
                            align: 'center',
                            color: '#666',
                            fontSize: '12',
                            lineHeight: '30'
                        },
                        bb: {
                            align: 'center',
                            color: '#333',
                            fontSize: '22'
                        }
                    }
                }
            },
            labelLine: {
                length: 20, // label拉线的长度根据自己的场景进行设置即可
                lineStyle: {
                    width: 1,
                    type: 'solid',
                    color: '#ccc'
                }
            },
            data: [{ value: 100, name: "Visit" },
            { value: 80, name: "Inquiry" },
            { value: 200, name: "Order" },
            { value: 80, name: "Click" },
            { value: 100, name: "Show" },]
        },
    ]
}

const option3 = {
    title:{
        text:'部门用时分布',
    },
    tooltip: {
        trigger: 'item',
        formatter(params) {
            console.log(params);
            let toolVal = '';
                toolVal = params.data['部门'] + '<br/>' + '收件量' + ':' +params.data['收件量']+ '<br/>'+ '平均时长' + ':' +params.data['平均时长'];
            
            return toolVal
        }
    },
    grid: {
        left: '50',
        right: '0',
        bottom: '20',
        top: '44',
    },
    xAxis: {
        type: 'category',
        axisTick: {
            show: false
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
                fontSize: 12,
            }
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#666',
            },
        },
    },

    yAxis: {
        splitLine: { // 分隔线
            show: true, // 默认显示，属性show控制显示与否
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: '#666',
                width: 1,
            }
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#666',
            },
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
                fontSize: 12,
            }
        },
        scale: true
    },
    dataset: dataset,
    series: series()
};
const option4 = {
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
const option5 = {};
const option6 = {};



export { option1, option2, option3, option4, option5, option6 }