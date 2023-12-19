import * as echarts from 'echarts';

export const initFunnelO1 = (dom) => {
    let option = {
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
                            width: 1,
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
                //并且由于宽度为0，漏斗图是居中显示的，所以label线条的起始位置都是中间
                sort: 'descending',
                z: 1,// 控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
                gap: 2,
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

    var chartDom = document.getElementById(dom);
    var myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    })
}
