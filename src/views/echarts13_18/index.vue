<template>
    <div>
        <div class="wrap">
            <div class="box">
               13 <div class="talent-distribution">
                    <div id="chartsId3_1" />
                    <div class="legend-div">
                        <div :class="'legend-item ' + 'item-' + index" v-for="(item,index) in legendArr"
                            :key="item.text">
                            <div>{{ item.index }}</div>
                            {{ item.text }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="box"> 14
                <div class="increasing-wrap">
                    <line-template v-for="(item,index) in 5" :key="'item' + index"/>
                </div>
            </div>
            <div class="box">15<div id="chartsId3_3"></div>
            </div>
        </div>
        <div class="wrap">
            <div class="box"> 16<div id="chartsId3_4"></div>
            </div>
            <div class="box"> 17<div id="chartsId3_5"></div>
            </div>
            <div class="box"> 18<div id="chartsId3_6"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { option1, option2, option3, option4, option5, option6 } from './echarts'
import lineTemplate from "./components/lineTemplate";
export default {
    components: {
        lineTemplate,
    },
    data() {
        return {
            chart1: "",
            chart2: "",
            chart3: "",
            chart4: "",
            chart5: "",
            chart6: "",
            legendArr: [{index: 'A', text: '省151人才数'}, {index: 'B', text: '享受国务院特殊津贴专家'},
                    {index: 'C', text: '引进人才数'}]
        }
    },
    methods: {
        initEcharts() {
            let area = ['杭州', '宁波', '温州', '绍兴', '嘉兴', '湖州', '金华', '台州', '衢州', '丽水', '舟山'];
            let month = new Array(12).fill(1).map((item, index) => (index + 1) + '月');
            let areaLength = area.length;
            let max = new Array(areaLength).fill(200)
            let values = max.map(item => (Math.floor(Math.random() * 200)));
            // 第一个图表
            this.chart1 = this.$echarts.init(document.getElementById('chartsId3_1'));
            this.chart1.setOption(option1);

            // 第二个图表
            // this.chart2 = this.$echarts.init(document.getElementById('chartsId3_2'));
            // this.chart2.setOption(option2);

            // 第3个图表
            this.chart3 = this.$echarts.init(document.getElementById('chartsId3_3'));
            this.chart3.setOption(option3);
            // 第4个图表
            this.chart4 = this.$echarts.init(document.getElementById('chartsId3_4'));
            this.chart4.setOption(option4);

            // 第5个图表
            this.chart5 = this.$echarts.init(document.getElementById('chartsId3_5'));
            this.chart5.setOption(option5);
            // 第6个图表
            this.chart6 = this.$echarts.init(document.getElementById('chartsId3_6'));
            this.chart6.setOption(option6);


            window.addEventListener("resize", () => {
                this.chart1.resize();
                // this.chart2.resize();
                this.chart3.resize();
                this.chart4.resize();
                this.chart5.resize();
                this.chart6.resize();
            });
        }
    },
    mounted() {
        this.initEcharts()
    }
}
</script>

<style lang="less" scoped>
.wrap {
    width: 1920px;
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 50px;

    #chartsId3_1,
    #chartsId3_2,
    #chartsId3_3,
    #chartsId3_4,
    #chartsId3_5,
    #chartsId3_6 {
        width: 540px;
        height: 378px;
    }

    .box {
        color: #fff;
        width: 540px;
        min-height: 368px;
        background: rgba(2, 80, 150, 0.1);
        border: 2px solid;
        border-image: linear-gradient(225deg, rgba(5, 183, 237, 0), rgba(76, 142, 246, 0.47), rgba(2, 128, 215, 0)) 2 2;
    }
}
.talent-distribution {
            padding-top: 75px;
            display: flex;
            flex-wrap: wrap;

            #chartsId3_1 {
                margin-left: 20px;
                width: 220px;
                height: 220px;
                background: url(./screen-chart-bg.svg) no-repeat;
                background-size: 100% 100%;
            }

            .legend-div {
                flex: 1;
                padding: 20px 0 0 50px;
                text-align: left;

                .legend-item {
                    font-size: 16px;
                    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
                    color: #FFFFFF;
                    margin-bottom: 28px;

                    :last-child {
                        margin-bottom: 0;
                    }

                    div {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        line-height: 40px;
                        text-align: center;
                        display: inline-block;
                        font-size: 24px;
                        font-weight: bolder;
                        margin-right: 12px;
                    }
                }
                .item-0 {
                    div {
                        background: rgba(42,114,221,0.2);
                        border: 1px solid #69A4F5;
                        color: rgb(36, 123, 252);
                    }
                }
                .item-1 {
                    div {
                        background: rgba(239, 149, 43, 0.2);
                        border: 1px solid #F5CE69;
                        color: rgba(239, 149, 43, 1);
                    }
                }
                .item-2 {
                    div {
                        background: rgba(20, 184, 225, 0.2);
                        border: 1px solid #6CE2FF;
                        color: rgba(0, 220, 226, 1);
                    }
                }
            }
        }
</style>