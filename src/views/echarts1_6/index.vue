<template>
    <div>
        <div class="wrap">
            <div class="box"> 1<div id="chartsId1"></div> </div>  
            <div class="box"> 2<div id="chartsId2"></div> </div>  
            <div class="box"> 3<div id="chartsId3"></div> </div>  
        </div>
        <div class="wrap">
            <div class="box"> 
                4<div id="chartsId4">
                <e-progress></e-progress>>
                </div>
            </div>  
            <div class="box"> 5<div id="chartsId5"></div> </div>  
            <div class="box">6 <div id="chartsId6"></div> </div>  
        </div>
    </div>
    
</template>

<script>
import {option1,option2,option3,option5,option6} from './echarts'
import eProgress from './progress'
export default {
    components:{
        eProgress
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
            option1.series[0].data = a;
            this.chart1 = this.$echarts.init(document.getElementById('chartsId1'));
            option1.xAxis.data = area;
            this.chart1.setOption(option1);
            // 第二个图表
            this.chart2 = this.$echarts.init(document.getElementById('chartsId2'));
            this.chart2.setOption(option2);

            // 第3个图表
            this.chart3 = this.$echarts.init(document.getElementById('chartsId3'));
            option3.series[0].data = max;
            option3.series[1].data = max;
            option3.series[2].data = values
            option3.series[3].data = values;
            option3.series[4].data = new Array(areaLength).fill(1);
            this.chart3.setOption(option3);
            // 第5个图表
            this.chart5 = this.$echarts.init(document.getElementById('chartsId5'));
            this.chart5.setOption(option5);
            // 第6个图表
            this.chart6 = this.$echarts.init(document.getElementById('chartsId6'));
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
    #chartsId1,#chartsId2,#chartsId3,#chartsId5,#chartsId6{
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