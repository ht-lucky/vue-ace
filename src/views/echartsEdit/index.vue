<template>
    <div class="wrap">
        <header class="App-header">
            <p>Echarts 图表</p>
        </header>

        <div class="top-tab">
            <div v-for="item in topList" @click="choosedMethod(item)">
                {{ item }}
            </div>
        </div>
        <div className="gallery">
            <div v-show="choosed == '折线图' || choosed == '100'">
                <div class="gallery-title">折线图</div>
                <div class="gallery-wrapper">
                    <div v-for="item in line" class="gallery-item" @click="goPage(item)">
                        <div class="gallery-item__chart" :id='item'></div>
                    </div>
                </div>
            </div>
            <div v-show="choosed == '柱状图' || choosed == '100'">
                <div class="gallery-title">柱状图</div>
                <div class="gallery-wrapper">
                    <div v-for="item in bar" class="gallery-item" @click="goPage(item)">
                        <div class="gallery-item__chart" :id='item'></div>
                    </div>
                </div>
            </div>
            <div v-show="choosed == '漏斗图' || choosed == '100'">
                <div class="gallery-title">漏斗图</div>
                <div class="gallery-wrapper">
                    <div v-for="item in funnel" class="gallery-item" @click="goPage(item)">
                        <div class="gallery-item__chart" :id='item'></div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { initLine01, initLine02 } from './echarts/line.js'
import {
    initBar01,
    initBar02,
    initBar03,
    initBar04,
    initBar05,
    initBar06,
    initBar07,
    initBar08,
    initBar09,
    initBar10,
    initBar11,
} from "./echarts/bar";
import { initFunnelO1 } from './echarts/funnel.js'
export default {
    props: [],
    data() {
        return {
            topList: ['折线图', '柱状图', '漏斗图'],
            choosed: '100',
            echartsObject: {
                initLine01,
                initLine02,
                initBar01,
                initBar02,
                initBar03,
                initBar04,
                initBar05,
                initBar06,
                initBar07,
                initBar08,
                initBar09,
                initBar10,
                initBar11,
                initFunnelO1
            },
            line: ['initLine01', 'initLine02'],
            bar: ['initBar01', 'initBar02', 'initBar03', 'initBar04', 'initBar05', 'initBar06', 'initBar07', 'initBar08', 'initBar09', 'initBar10', 'initBar11'],
            funnel: ['initFunnelO1'],
            havedList:[]
        };
    },

    watch: {},

    computed: {},
    mounted() {
        let that = this
        this.$nextTick(() => {
            for (let key in that.echartsObject) {
                let echarts = document.getElementById(key)
                if (isElementInViewport(echarts)) {
                    that.echartsObject[key](key)
                    that.havedList.push(key)
                }
            }
            window.addEventListener('scroll', function () {
                for (let key in that.echartsObject) {
                    let echarts = document.getElementById(key)
                    if (isElementInViewport(echarts) && !that.havedList.includes(key)) {
                        document.getElementById(key).removeAttribute('_echarts_instance_');
                        that.echartsObject[key](key)
                        that.havedList.push(key)
                    }
                }
            });
        })

        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

    },

    methods: {
        // initLine() {
        //     this.line.forEach(item => {
        //         this.echartsObject[item](item)
        //     })
        // },
        // initBar() {
        //     this.bar.forEach(item => {
        //         this.echartsObject[item](item)
        //     })
        // },
        // initFunnel() {
        //     this.funnel.forEach(item => {
        //         this.echartsObject[item](item)
        //     })
        // },
        goPage(item) {
            this.$router.push({
                path: 'demoAce',
                query: {
                    id: item
                }
            })
        },
        choosedMethod(item) {
            if (item == this.choosed) {
                this.choosed = '100'
            } else {
                this.choosed = item
            }
        }
    },

    created() { },

};

</script>

<style lang="less" scoped>
.top-tab {
    display: flex;
    color: #fff;
    padding-top: 20px;

    div {
        width: 200px;
        margin: 0 20px;
        background-color: #fff6;
        cursor: pointer;
        width: 124px;
        // height: 66px;
        background: rgba(255, 255, 255, 0.1);
        // box-shadow: inset 2px 0px 0px 0px #00A9FF;
        border: 1px solid;
        border-image: linear-gradient(180deg, rgba(219, 236, 255, 1), rgba(244, 247, 255, 1)) 1 1;
        backdrop-filter: blur(8px);

        &:hover {
            border: 1px solid green;
            color: aquamarine;
        }
    }
}

.wrap {
    background-color: #282C34;
    min-height: 100vh;
}

.gallery-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    width: 1500px;
    margin: 20px auto;
}

.App-header {
    color: #fff;
}

.gallery-item {
    padding: 10px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    width: 45%;
    height: 520px;
    margin-right: 75px;
    margin-bottom: 20px;
}

.gallery-title {
    color: #fff;
}

.gallery-item__chart {
    height: 500px;

}
</style>
