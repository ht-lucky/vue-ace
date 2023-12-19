const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    devServer: {
        port: 2345,
        host: 'localhost',
        https: false,
        open: true,
        allowedHosts: 'all'
    },
    transpileDependencies: true,
    // 其他webpack配置
    chainWebpack: (config) => {
        // 这个是给 webpack-dev-server开启可IP和域名访问权限。（已弃用，已写入DevServer中）
        // config.devServer.disableHostCheck(true)
    }
})
// module.exports = {
//     // publicPath: './',
//     // // assetsDir: 'static',
//     // lintOnSave: false,
//     // runtimeCompiler: true,
//     devServer: {
//         allowedHosts: "all",
//         port: '2345',
//         overlay: {
//             warning: false,
//             errors: false
//         },
//         proxy: {
//             "/xx": {
//                 // target: "http://192.168.0.162:18898/yztzxm/",//张超凡
//                 // target: "http://192.168.0.121:18898/yztzxm/",//fhs
//                 target: "http://192.168.0.107:18898/yztzxm/",//
//                 // target: "http://192.168.0.136:18898/yztzxm/",//
//                 // target: "http://tzxmqzq.jiashan.gov.cn/yztzxm",    // 正式
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/xx': ''
//                 }
//             },
//         },
//     },
//     // productionSourceMap: false,

//     // 去掉console
//     // configureWebpack: (config) => {
//     //     // 判断为生产模式下，因为开发模式我们是想保存console的
//     //     if (process.env.NODE_ENV === "production") {
//     //         config.optimization.minimizer.map((arg) => {
//     //             const option = arg.options.terserOptions.compress;
//     //             option.drop_console = false; // 打开开关
//     //             return arg;
//     //         });
//     //     } else {
//     //         // 调试JS
//     //         config.devtool = "source-map";
//     //     }

//     // },

//     // css: {
//     //     loaderOptions: {
//     //         postcss: {
//     //             plugins: [
//     //                 require('autoprefixer')({ // 配置使用 autoprefixer
//     //                     // browsers: ['last 20 versions'],
//     //                     overrideBrowserslist: ['last 20 versions'] // 记得这里要把 browsers 改为 overrideBrowserslist，autoprefixer 新版本的写法有变
//     //                 }),
//     //                 require("postcss-px-to-viewport")({
//     //                     unitToConvert: "px", // 要转化的单位
//     //                     viewportWidth: 1920, // 换算的基数
//     //                     viewportHeight: 1080,
//     //                     unitPrecision: 8,
//     //                     viewportUnit: 'vw',
//     //                     selectorBlackList: ['.ignore'],
//     //                     minPixelValue: 1,
//     //                     mediaQuery: true,
//     //                     replace: true,
//     //                     exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件
//     //                 })
//     //             ]
//     //         }
//     //     }
//     // }

// }
