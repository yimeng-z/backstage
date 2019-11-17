// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import "../src/utils/rem"
import Vant from 'vant';
import 'vant/lib/index.css';
import Mint from 'mint-ui';
import { Dialog } from 'vant';
import echarts from 'echarts'
import '../static/jquery-3.4.1'
Vue.prototype.$echarts = echarts
Vue.use(Mint);
Vue.use(Dialog);
Vue.use(Vant);
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
