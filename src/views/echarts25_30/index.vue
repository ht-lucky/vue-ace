<template>
    <div>
        <div class="wrap">
            <div class="box">25<div id="chartsId5_1"></div> </div>  
            <div class="box">26<div id="chartsId5_2"></div> </div>  
            <div class="box">27<div id="chartsId5_3"></div> </div>  
        </div>
        <div class="wrap">
            <div class="box">28<div id="chartsId5_4"></div></div>  
            <div class="box">29<div id="chartsId5_5"></div></div>  
            <div class="box">30 <div id="chartsId5_6"></div></div>  
        </div>
    </div>
    
</template>

<script>
import {option1,option2,option3,option4,option5,option6} from './echarts'
export default {
    components:{
    },
    data(){
        return{
            chart1:"",
            chart2:"",
            chart3:"",
            chart4:"",
            chart5:"",
            chart6:"",
        }
    },
    methods:{
        initEcharts(){
            let area = ['杭州', '宁波', '温州', '绍兴', '嘉兴', '湖州', '金华', '台州', '衢州', '丽水', '舟山'];
            let month = new Array(12).fill(1).map((item, index) => (index + 1) + '月');
            let areaLength = area.length;
            let max = new Array(areaLength).fill(200)
            let values = max.map(item => (Math.floor(Math.random() * 200)));
            let a = [...values, 50]
            // option1.series[0].data = a;
            // this.chart1 = this.$echarts.init(document.getElementById('chartsId4_1'));
            // option1.xAxis.data = area;
            // this.chart1.setOption(option1);

            // 第1个图表
            this.chart1 = this.$echarts.init(document.getElementById('chartsId5_1'));
            this.chart1.setOption(option1);
            // 第2个图表
            this.chart2 = this.$echarts.init(document.getElementById('chartsId5_2'));
            this.chart2.setOption(option2);

            // 第3个图表
            this.chart3 = this.$echarts.init(document.getElementById('chartsId5_3'));
            this.chart3.setOption(option3);
            // 第4个图表
            this.chart4 = this.$echarts.init(document.getElementById('chartsId5_4'));
            this.chart4.setOption(option4);
            // 第5个图表
            this.chart5 = this.$echarts.init(document.getElementById('chartsId5_5'));
            // let option4_5 =setOption(option5);
            this.chart5.setOption(option5);
            // 第6个图表
            this.chart6 = this.$echarts.init(document.getElementById('chartsId5_6'));
            this.chart6.setOption(option6);


            window.addEventListener("resize", () => {
                this.chart1.resize();
                this.chart2.resize();
                this.chart3.resize();
                this.chart5.resize();
                this.chart6.resize();
            });
        }
    },
    mounted(){
        this.initEcharts()
    }
}
</script>

<style lang="less" scoped>
.wrap{
    width: 1920px;
    display: flex;
    justify-content: space-evenly;
    // padding-top: 100px;
    padding-bottom: 50px;
    #chartsId5_1,#chartsId5_2,#chartsId5_4,#chartsId5_3,#chartsId5_5,#chartsId5_6{
        width: 540px;
        height: 378px;
    }
    .box{
        color: #fff;
        width: 540px;
        min-height: 368px;
        background: rgba(2,80,150,0.1);
        border: 2px solid;
        border-image: linear-gradient(225deg, rgba(5, 183, 237, 0), rgba(76, 142, 246, 0.47), rgba(2, 128, 215, 0)) 2 2;
    }
}
</style>