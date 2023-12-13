import 'codemirror/lib/codemirror.css'
// require active-line.js
import 'codemirror/addon/selection/active-line.js'
// styleSelectedText
import 'codemirror/addon/selection/mark-selection.js'
// hint
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/sql-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/javascript-hint.js'
// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/match-highlighter.js'
// keyMap
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/sublime.js'
// foldGutter
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/xml-fold.js'
// 编辑的主题文件
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/base16-light.css'

// 主题样式
import 'codemirror/theme/monokai.css'   
import 'codemirror/theme/idea.css'
// 支持数据类型
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/yaml/yaml.js'  
import 'codemirror/mode/xml/xml.js'  
import 'codemirror/mode/javascript/javascript.js'
// 数据校验
import 'codemirror/addon/lint/lint.js'

// 这个是正常的引入，但我注释掉了是因为我想修改里面的部分内容，所以我拿出来了(之前这些文件在node-modules中)
// import 'codemirror/addon/lint/lint.css'
// import 'codemirror/addon/lint/yaml-lint.js'
// import 'codemirror/addon/lint/javascript-lint.js'
// import 'codemirror/addon/lint/json-lint.js'

// 提示弹窗
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
// 搜索功能
import 'codemirror/addon/search/search.js'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/jump-to-line.js'
// 折叠功能
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/xml-fold.js'
// 滚动条
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars.js' 
// 代码高亮
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/xml-hint.js'
import 'codemirror/addon/hint/anyword-hint.js'
import 'codemirror/addon/hint/html-hint.js'
import 'codemirror/addon/hint/css-hint.js'
import 'codemirror/addon/selection/active-line.js'
// 全屏
import 'codemirror/addon/display/fullscreen.js'
import 'codemirror/addon/display/fullscreen.css'

// 引入js-yaml为codemirror提高语法检查核心支持
// window.jsyaml = require('js-yaml') 
// 引入jsonlint为codemirror提高语法检查核心支持
// import jsonlint from "jsonlint";
// window.jsonlint = require('jsonlint');