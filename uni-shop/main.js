import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import {myRequest} from './util/api'

Vue.prototype.$myRequest = myRequest     // 给vue原型安装这个封装的请求方法，可以每个组件都看得到

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif