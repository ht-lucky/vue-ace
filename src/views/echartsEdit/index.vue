<template>
    <div class="wrap">
        <header className="App-header">
            <p>Echarts 图表</p>
        </header>

        <div className="gallery">
            <div className="gallery-title">折线图</div>
            <div class="gallery-wrapper">

                <div v-for="item in line" class="gallery-item" @click="goPage(item)">
                    <div class="gallery-item__chart" :id='item'></div>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
import { initLine01, initLine02 } from './echarts/line.js'
export default {
    props: [],
    data() {
        return {
            echartsObject: {
                initLine01,
                initLine02,
            },
            line: ['initLine01', 'initLine02']
        };
    },

    watch: {},

    computed: {},
    mounted() {
        this.$nextTick(()=>{

            this.initLine()
        })
    },

    methods: {
        initLine() {
            this.line.forEach(item => {
                this.echartsObject[item](item)
            })
        },
        goPage(item){
            this.$router.push({
                path:'demo',
                query:{
                    id:item
                }
            })
        },
    },

    created() { },

};

</script>

<style lang="less" scoped>
.wrap {
    background-color: #282C34;
}

.gallery-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 1700px;
    margin: 20px auto;
}

.gallery-item {
    padding: 10px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    width: 45%;
    height: 520px;
    margin-right: 10px;
    margin-bottom: 20px;
}

.gallery-item__chart {
    height: 500px;

}</style>
