<template>
    <div>

        <div @click="renderEchartsDemo">执行</div>
        <div class="wrap">

            <codemirror v-model="item" :options="cmOption" class="code-mirror" @ready="onCmReady3" @focus="onCmFocus"
                @input="onCmCodeChange" ref="myCmGenerate"></codemirror>

            <div :id="$route.query.id" class="echartsId">
            </div>
        </div>
    </div>
</template>
   
<script>
import { codemirror } from 'vue-codemirror'
// 我这里引入的是JS语言文件
import 'codemirror/mode/javascript/javascript.js'
import '../../../common/setting'
import { initLine01, initLine02 } from '../echarts/line.js'
import * as echarts from "echarts";
window.echarts = echarts
export default {
    data() {
        return {
            echartsObject: {
                initLine01,
                initLine02,
            },
            item: '',
            cmOption: {
                tabSize: 2, // tab
                styleActiveLine: true, // 高亮选中行
                lineNumbers: true, // 显示行号
                styleSelectedText: true,
                line: true,
                foldGutter: true, // 块槽
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true }, // 可以启用该选项来突出显示当前选中的内容的所有实例
                mode: { // 模式, 可查看 codemirror/mode 中的所有模式
                    name: 'javascript',
                    json: true
                },
                // hint.js options
                hintOptions: {
                    // 当匹配只有一项的时候是否自动补全
                    completeSingle: false,
                    // hint: codemirror.hint.javascript
                },
                lint: true,
                spellcheck:true,
                // 快捷键 可提供三种模式 sublime、emacs、vim
                keyMap: 'sublime',
                matchBrackets: true,
                showCursorWhenSelecting: true,
                theme: 'monokai', // 主题 
                extraKeys: { 'Ctrl': 'autocomplete' } // 可以用于为编辑器指定额外的键绑定，以及keyMap定义的键绑定
            },
            id: ''
        }
    },
    mounted() {
        this.id = this.$route.query.id
        this.item = this.getText(this.id)
        this.renderEchartsDemo()
        // this.item='111111'
    },
    methods: {


        onCmReady3(cm) {
            // cm.on("inputRead", (cm, obj) => {
            //     if (obj.text && obj.text.length > 0) {
            //         let c = obj.text[0].charAt(obj.text[0].length - 1)
            //         if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
            //             cm.showHint({ completeSingle: false })
            //         }
            //     }
            // })
            // this.$refs.myCmGenerate.codemirror.setSize('400px', '400px')
        },
        onCmFocus(instance, event) {
            // console.log(instance)
            // console.log(event)
        },
        onCmCodeChange(instance, obj) {
            console.log(this.$refs.myCmGenerate.codemirror.showHint);
            this.$refs.myCmGenerate.codemirror.showHint()
            // console.log(instance)
            // console.log(obj)
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
            // const dom = document.getElementById(id);
            // const chart = echarts.init(dom);
            const option = value()
            option(this.id)
            // console.log(option)
            // option && chart.setOption(option(id));
            // window.onresize = () => {
            //     chart.resize()
            // }
        }

    }
}
</script>
<style>
.wrap {
    display: flex;
    margin-top: 50px;

}

.CodeMirror-scroll {
    overflow: scroll !important;
    margin-bottom: 0;
    margin-right: 0;
    padding-bottom: 0;
    /* outline: none; */
    /* position: relative; */
    border: 1px solid #dddddd;
    /* font-size: 30px !important; */
    /* line-height: 40px !important; */

}
</style>
<style lang="less" scoped>
.code-mirror {
    font-size: 13px;
    line-height: 150%;
    text-align: left;
    flex: 1;
    margin-right: 50px;

}

.echartsId {
    flex: 1;
    height: 90vh;
    border: 1px solid #ccc;
    margin-right: 30px;
}

/deep/ .CodeMirror {
    width: 1000px !important;
    height: 90vh !important;
}

</style>