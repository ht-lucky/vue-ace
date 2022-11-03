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
const option1 = {
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
        right: '20',
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
        axisTick:{
            show:false
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
            symbolSize: 8,
            showSymbol: false,
            itemStyle: {
                normal: {
                    color: 'rgba(12, 176, 247, 1)',
                    lineStyle: {
                        color: "rgba(12, 176, 247, 1)",
                        width: 2
                    },
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(11,175,246,0.5)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(42,105,141,0)'
                    }
                    ], false),
                }
            },
            data: [32.1, 20.2, 9.5, 4.2, 2.3],
        },
    ],
};

// 散点图
var dataset = {
    dimensions: ["地区", "用地面积","比例"],
	source: [
		{ 地区: "西湖区", 用地面积: 1523,比例:2100 },
		{ 地区: "上城区", 用地面积: 5223,比例:2500  },
		{ 地区: "拱墅区", 用地面积: 2123,比例:4100  },
		{ 地区: "滨江区", 用地面积: 4123,比例:1500  },
		{ 地区: "萧山区", 用地面积: 3123,比例:3500  },
		{ 地区: "余杭区", 用地面积: 7123,比例:2500  },
		{ 地区: "钱塘区", 用地面积: 6123,比例:1500  },
		{ 地区: "临平区", 用地面积: 5123,比例:3500  },
		{ 地区: "桐庐县", 用地面积: 3123,比例:5500  },
		{ 地区: "淳安县", 用地面积: 7123,比例:7500  },
		{ 地区: "建德市", 用地面积: 5123,比例:1500  },
	]
}
let color = ['#4CBDFB55','#004D5C77']
let borderColor=['#4CBDFB','#38D4D5']
function series(){
    const s = []
    for (var i = 0; i < dataset.dimensions.length-1; i++) {
        const dim = dataset.dimensions[(i+1)]
        s.push({
            type: 'scatter',
            symbolSize: function (data) {
                const size = Math.sqrt(data[dim])
                let retSize = 0
                if(size < 5000){
                    retSize = size/2
                }else{
                    retSize = size/5e2 
                }
                //  控制散点大小
                return retSize>=80?80:retSize<10?retSize+5:retSize
            },
            emphasis: {
                label: {
                    show: true,
                    position: 'bottom'
                }
            },
            itemStyle: {
                color:color[i],
                borderColor:borderColor[i]
            }
        });
       
    }
    return s
}
const option2 = {
    tooltip: {
        ...TOOLTIP_STYLE, ...{
            trigger: 'item',
        },
        formatter(params) {
            let toolVal = '';
            if(params.seriesName == '用地面积'){
                toolVal =params.name  +'<br/>' + params.seriesName + ':' +params.data[params.seriesName];
            }else{
                let a = params.data[params.seriesName]/params.data['用地面积']
                toolVal =params.name  +'<br/>' + params.seriesName + ':' +(a.toFixed(2)) + '%';
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
        axisTick:{
            show:false
        },
        axisLabel: {
            rotate:30,
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

const option3 = {
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
                color:  '#224C94',
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
            data: [32.1, 20.2, 9.5, 4.2, 2.3],
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
            data: [32.1, 20.2, 9.5, 4.2, 2.3],
            label: {
                show: true,
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
            data: [1, 1, 1, 1, 1],
        },
    ],
};
const option5 = {
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
                    if(params.data < 0) {
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
                show: true,
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

const option6 = 
    {
        tooltip: {
            trigger: 'item',
            ...TOOLTIP_STYLE
        },
        legend: {
            icon: 'rect',
            itemWidth: fontChart(0.7),
            itemHeight: fontChart(0.7),
            right: '0%',
            itemGap: 18,
            orient: 'vertical', //垂直显示
            y: 'center', //延Y轴居中
            textStyle: {
                fontSize: fontChart(1.4),
                color: '#fff'
            },
        },

        color: ['#0263FF', '#FF7723', '#8E30FF', '#EBD662', '#C14E36', '#265FD0', '#177FBE', '#C7B759'],

        grid: {
            left: '0',
            right: '1000',
            bottom: '40',
            top: '50',
        },

        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['30%', '47%'], //性设置图的上下左右的位置
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: '居住用地' },
                { value: 735, name: '公共管理与公共服务设施用地A' },
                { value: 580, name: '商业服务业设施用地' },
                { value: 484, name: '行政办公用地' },
                { value: 300, name: '工业用地' }
            ]
        }]
    }



export { option1 ,option2,option3,option5,option6}