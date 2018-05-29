// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './components/Layout.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import global_ from './components/global.vue'
import echarts from 'echarts'


Vue.use(ElementUI)
Vue.use(VueLazyload)
Vue.prototype.GLOBAL = global_
// axios.defaults.baseURL = global_.BASE_URL;
Vue.prototype.axios = axios
// Vue.prototype.$echarts = echarts 


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Layout },
  template: '<Layout/>',
})