import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
const echarts = require('echarts');
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.config.productionTip = false
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodeMirror)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
