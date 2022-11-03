<template>
    <div class="e-progress">
        <div class="e-progress-item" v-for="(item, index) in list" :key="index">
            <div class="e-progress-item__name">{{ item.name }}</div>
            <div class="e-progress-item__bar" :class="{'orange': index === 0}">
                <div class="bar" :style="{width: item.value + '%'}">
                    <div class="bar-round"></div>
                    <div class="bar-round__huge"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'e-progress',
    data() {
        return {
            list: [
                {name: '杭州市', value: 0},
                {name: '宁波市', value: 0},
                {name: '温州市', value: 0},
                {name: '金华市', value: 0},
                {name: '绍兴市', value: 0},
                {name: '嘉兴市', value: 0},
                {name: '湖州市', value: 0},
                {name: '台州市', value: 0},
                {name: '舟山市', value: 0},
                {name: '衢州市', value: 0},
                {name: '丽水市', value: 0},
            ]
        }
    },
    mounted() {
        setTimeout(() => {
            this.list.forEach(item => {
                item.value = Math.floor(Math.random() * 100)
            })
        }, 300)
    }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.e-progress {
    &-item {
        margin-bottom: 20px;
        position: relative;

        &__name {
            font-size: 14px;
            font-family: YouSheBiaoTiHei;
            color: #7AACD7;
            line-height: 16px;
            width: 60px;
            position: absolute;
            top: -6px;
            left: 0;
        }

        &__bar {
            box-sizing: border-box;
            height: 5px;
            background-color: rgba(2, 34, 78, 1);
            margin-left: 72px;
            margin-top: 15px;

            .bar {
                width: 200px;
                height: 5px;
                background: linear-gradient(to left, rgba(94, 217, 243, 1), rgba(31, 249, 225, 0.25));
                position: relative;
                transition: all .3s;

                &-round {
                    width: 4px;
                    height: 8px;
                    background: #14E1D4;
                    position: absolute;
                    right: -2px;
                    top: -1.5px;
                    animation: skew-ani .3s 1s ease-in-out alternate forwards;

                    /** &__huge {
                        width: 20px;
                        height: 20px;
                        border: 1px solid #14E1D4;
                        position: absolute;
                        right: -9px;
                        top: -8px;
                        border-radius: 100%;
                        animation: round-ani 1s 1s ease-in-out alternate forwards;
                        transform: scale(.3, .3);
                    } **/
                }
            }

            &.orange {
                .bar {
                    background: linear-gradient(to left, rgba(248, 221, 81, 1), rgba(177, 104, 12, 0.5000));

                    &-round {
                        background: rgba(248, 221, 81, 1);

                        /** &__huge {
                            border: 1px solid rgba(254, 150, 64, 0.9);
                        } **/
                    }
                }
            }
        }
    }
}

@keyframes round-ani {
    0% {
        transform: scale(.3, .3);
    }
    100% {
        transform:scale(1, 1);
    }
}

@keyframes skew-ani {
    0% {
        transform: skew(0deg);
    }
    100% {
        transform: skew(-20deg);
    }
}
</style>
