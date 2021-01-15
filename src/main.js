// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/index.scss'
import httpSet from '@/utils/httpSet'
import store from "@/store"
import cloneDeep from 'lodash/cloneDeep'

Vue.use(ElementUI);
Vue.use(VueCookie)
Vue.config.productionTip = false

// 挂载全局的方法
Vue.prototype.$http = httpSet // ajax 请求方法的包装

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
