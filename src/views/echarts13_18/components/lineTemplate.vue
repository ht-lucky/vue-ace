<template>
    <div class="line-template-wrap">
        <div class="line-item-div">
            <div class="top-div">
                <span/>交通投资本年完成投资增速<font>79%</font>
            </div>
            <div class="bottom-line-div-wrap">
                <div class="bottom-line"/>
                <div class="market-div"/>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        components: {

        },
        mounted() {
        },
        data() {
            return {
            }
        },


        computed:{

        },
        methods: {


        }
    }
</script>
<style lang="less" scoped>
    .line-template-wrap {
        .line-item-div {
            margin-top: 20px;
            .top-div {
                font-size: 14px;
                font-family: Microsoft YaHei-Regular, Microsoft YaHei;
                font-weight: 400;
                color: #FFFFFF;
                span {
                    display: inline-block;
                    vertical-align: middle;
                    width: 8px;
                    height: 8px;
                    margin-right: 8px;
                    background: #15CFF8;
                    border-radius: 1px 1px 1px 1px;
                    opacity: 1;
                }
                font {
                    float: right;
                    font-size: 14px;
                    font-family: Manrope-SemiBold, Manrope;
                    font-weight: bold;
                    color: #FFFFFF;
                };
            }
            .bottom-line-div-wrap {
                position: relative;
                margin-top: 4px;
                height: 8px;
                background: rgba(13,158,237,0.1000);
                border-radius: 0px 0px 0px 0px;
                opacity: 1;
                .bottom-line {
                    width: 70%;
                    height: 8px;
                    background: linear-gradient(247deg, #3E86EE 0%, #265676 100%);
                    border-radius: 0px 0px 0px 0px;
                    opacity: 1;
                }
                .market-div {
                    position: absolute;
                    height: 16px;
                    width: 3px;
                    top: -4px;
                    left: 70%;
                    background: rgba(255,183,44,0.8800);
                    box-shadow: 0px 0px 4px 0px rgba(255,195,41,0.2500);
                    border-radius: 10px 10px 10px 10px;
                    opacity: 1;
                }
            }
        }
    }
</style>
