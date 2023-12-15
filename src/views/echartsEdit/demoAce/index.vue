<template>
    <div class="box">
        <div>

            <div @click="renderEchartsDemo">执行</div>
            <div class="wrap">

                <div id="ace" ref="ace"></div>

                <div :id="$route.query.id" class="echartsId">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//ace-editor
import ace from 'ace-builds'

// ace 文本格式,以json为例
import 'ace-builds/src-noconflict/mode-json5'
// import 'ace-builds/src-noconflict/mode-xml'
// import 'ace-builds/src-noconflict/mode-text'
import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-min-noconflict/mode-javascript'


import 'ace-builds/src-noconflict/mode-sql'; // sql模式的包
import 'ace-builds/src-noconflict/mode-mysql';// mysql模式的包
// ace主题
import 'ace-builds/src-noconflict/theme-kuroir'
import 'ace-builds/src-noconflict/mode-javascript';// mysql模式的包
import 'ace-builds/src-noconflict/theme-xcode';// xcode,(亮白)的主题样式
import "ace-builds/src-noconflict/theme-twilight";// twilight,(暗黑)的主题样式
import { initLine01, initLine02 } from '../echarts/line.js'
import 'ace-builds/webpack-resolver'; // 左侧提示错误信息 需要下载file-loader
import * as echarts from "echarts";
window.echarts = echarts
export default {
    props: [],
    data() {
        return {
            id: "",
            item: "",
            echartsObject: {
                initLine01,
                initLine02,
            },
            annotaions: [],
            errorList: [],
        };
    },

    watch: {},

    computed: {},
    mounted() {
        //初始化ace编辑器
        this.editor = ace.edit(this.$refs.ace, {
            maxLines: 50, // 最大行数，超过会自动出现滚动条
            minLines: 12, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
            fontSize: 14, // 编辑器内字体大小
            theme: 'ace/theme/kuroir', // 默认设置的主题
            mode: 'ace/mode/json5', // 默认设置的语言模式
            tabSize: 4,// 制表符设置为 4 个空格大小
            readOnly: false //只读
        });
        this.editor.setOptions({
            enableBasicAutocompletion: true, //启动基本自动完成
            enableLiveAutocompletion: true, //启动实时自动完成
        })
        this.editor.on('change', (val) => {
            // let str = this.editor.setValue(this.item, -1)
            this.item = this.editor.getValue()
            if (this.item) {
                // this.validateJavasriptSyntax(this.item)
            }
        })
        this.editor.setOption("mode", "ace/mode/javascript");
        this.id = this.$route.query.id
        this.item = this.getText(this.id)
        this.editor.setValue(this.item, -1)

        this.renderEchartsDemo()
        // this.editor.getSession().setAnnotations([{
        //     row: 1,
        //     column: 0,
        //     text: "Strange error",
        //     type: "error" // also warning and information
        // }]);
    },
    methods: {

        checkJson() {
            const acorn = require('acorn');

            function validateJSON(jsonString) {
                try {
                    acorn.parse(jsonString, { sourceType: 'module' });
                    return true;
                } catch (error) {
                    return false;
                }
            }

            function getLineNumber(jsonString) {
                try {
                    acorn.parse(jsonString, { sourceType: 'module' });
                    return 0;
                } catch (error) {
                    if (error.loc && error.loc.line) {
                        return error.loc.line;
                    }
                    return -1;
                }
            }

            const jsonString = '{"name": "John", "age": 30}';
            console.log(validateJSON(jsonString)); // true
            console.log(getLineNumber(jsonString)); // 0

            const invalidJsonString = '{"name": "John", "age": 30,}';
            console.log(validateJSON(invalidJsonString)); // false
            console.log(getLineNumber(invalidJsonString)); // 1

        },
        validateJavasriptSyntax(code) {
            // 检查代码语法错误
            this.editor.getSession().setAnnotations([]);
            try {
                // let strCode = JSON.parse(code)
                // console.log(code);
                let str = String(code);
                let acorn = require("acorn");

                acorn.parse(str, {
                    sourceType: 'module',
                    // locations: true,
                    onError: (error) => {
                        this.errorList.push(error)
                        // throw new SyntaxError(error);
                    },
                });
                // console.log(acorn.parse(code, { ecmaVersion: 2020 }), 99999);
            } catch (error) {
                // console.log(error.loc);
                // console.log("validateJavasriptSyntax", error, 11111222333);
                let annotationList = [];
                let annotation = {
                    row: error?.loc?.line - 2,
                    column: error?.loc?.column,
                    type: "error",
                    text: error?.message,
                }
                annotationList.push(annotation);
                this.annotaions = annotationList;
                // console.log(annotationList);
                this.editor.getSession().setAnnotations(annotationList);
            }
        },
        checkEsprima(code) {
            const esprima = require('esprima');
            let str = String(code);
            console.log(checkSyntax(str), 111);
            function checkSyntax(code) {
                try {
                    esprima.parseScript(code, { tolerant: true });
                    return [];
                } catch (error) {
                    return error.errors || [error];
                }
            }


        },
        getText(id) {
            let javascript = this.echartsObject[id];
            javascript = `${javascript}`.replace(/echarts__WEBPACK_IMPORTED_MODULE_0__/g, 'echarts')
            javascript = `${javascript}`.replace(/_utils__WEBPACK_IMPORTED_MODULE_1__/g, 'utils')
            javascript = `${javascript}`.replace(/lodash__WEBPACK_IMPORTED_MODULE_2__/g, 'lodash')
            javascript = `${javascript}`.replace(/__webpack_require__/g, '')
            return javascript
        },
        renderEchartsDemo() {
            let value = new Function(`return ${this.item}`)
            const option = value()
            option(this.id)
        }
    },


    created() { },

};

</script>

<style lang="less" scoped>
.box {
}

.wrap {
    display: flex;

    min-height: 97vh;
    padding-top: 10px;

    .echartsId,
    #ace {
        flex: 1;
        min-height: 97vh;
        border: 1px solid #ccc;
    }

    .echartsId {
        background-color: #282c34;
    }

    // /deep/ .ace_editor .ace-kuroir {
    //     height: 70vh !important;
    // }

}
</style>
