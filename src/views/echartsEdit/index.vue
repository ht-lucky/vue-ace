<template>
    <div class="wrap">
        <header class="App-header">
            <p>Echarts 图表</p>
        </header>

        <div class="top-tab">
            <div v-for="item in topList" @click="choosedMethod(item)" :class="{ 'active-text': choosed == item }">
                {{ item }}
            </div>
        </div>
        <div className="gallery">
            <div v-if="choosed == '折线图' || choosed == '100'">
                <div class="gallery-title">折线图</div>
                <div class="gallery-wrapper">
                    <div v-for="item in line" class="gallery-item" @click="goPage(item)" :key="item">
                        <div class="gallery-item__chart" :id='item'></div>
                    </div>
                </div>
            </div>
            <div v-if="choosed == '柱状图' || choosed == '100'">
                <div class="gallery-title">柱状图</div>
                <div class="gallery-wrapper">
                    <div v-for="item in bar" class="gallery-item" @click="goPage(item)" :key="item">
                        <div class="gallery-item__chart" :id='item'></div>
                    </div>
                </div>
            </div>
            <div v-if="choosed == '饼图' || choosed == '100'">
                <div class="gallery-title">饼图</div>
                <div class="gallery-wrapper">
                    <div v-for="item in pie" class="gallery-item" @click="goPage(item)" :key="item">
                        <div class="gallery-item__chart" :id='item'></div>
                    </div>
                </div>
            </div>
            <div v-if="choosed == '漏斗图' || choosed == '100'">
                <div class="gallery-title">漏斗图</div>
                <div class="gallery-wrapper">
                    <div v-for="item in funnel" class="gallery-item" @click="goPage(item)" :key="item">
                        <div class="gallery-item__chart" :id='item'></div>
                    </div>
                </div>
            </div>
            <div v-if="choosed == '仪表盘' || choosed == '100'">
                <div class="gallery-title">仪表盘</div>
                <div class="gallery-wrapper">
                    <div v-for="item in gauge" class="gallery-item" @click="goPage(item)" :key="item">
                        <div class="gallery-item__chart" :id='item'></div>
                    </div>
                </div>
            </div>
            <div v-if="choosed == '盒须图' || choosed == '100'">
                <div class="gallery-title">盒须图</div>
                <div class="gallery-wrapper">
                    <div v-for="item in hxt" class="gallery-item" @click="goPage(item)" :key="item">
                        <div class="gallery-item__chart" :id='item'></div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {echartsObject, line, bar, funnel, gauge, hxt, pie,} from './dics/index.js'
export default {
    props: [],
    data() {
        return {
            topList: ['折线图', '柱状图', '饼图', '漏斗图', '仪表盘', '盒须图'],
            choosed: '100',
            echartsObject,
            line,
            bar,
            funnel,
            gauge,
            hxt,
            pie,
            havedList: []
        };
    },

    watch: {},

    computed: {},
    mounted() {
        let that = this
        this.$nextTick(() => {
            for (let key in that.echartsObject) {
                let echarts = document.getElementById(key)
                if (that.isElementInViewport(echarts)) {
                    that.echartsObject[key](key)
                    that.havedList.push(key)
                }
            }
            window.addEventListener('scroll', function () {
                for (let key in that.echartsObject) {
                    let echarts = document.getElementById(key)
                    if (that.isElementInViewport(echarts) && !that.havedList.includes(key)) {
                        document.getElementById(key).removeAttribute('_echarts_instance_');
                        that.echartsObject[key](key)
                        that.havedList.push(key)
                    }
                }
            });
        })

    },

    methods: {
        isElementInViewport(el) {
            var rect = el.getBoundingClientRect();
            // console.log( rect.bottom,window.innerHeight || document.documentElement.clientHeight);
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 500
            );
        },
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
            this.havedLis = []
            this.$nextTick(() => {
                this.havedList = []
                let that = this
                for (let key in that.echartsObject) {
                    let echarts = document.getElementById(key)
                    if (echarts) {
                        if (that.isElementInViewport(echarts) && !that.havedList.includes(key)) {
                            that.echartsObject[key](key)
                            that.havedList.push(key)
                        }
                    }
                }
            })

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

    .active-text {
        border: 1px solid green;
        color: aquamarine;
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
    width: 1800px;
    margin: 20px auto;

}

.App-header {
    color: #fff;
}

.gallery-item {
    padding: 10px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    width: 500px;
    // height: 400px;
    // height: 500px;
    margin-left: 85px;
    margin-bottom: 20px;
}

.gallery-title {
    color: #fff;
}

.gallery-item__chart {
    height: 500px;

}
</style>
