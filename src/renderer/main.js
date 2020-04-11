import Vue from 'vue'
// import axios from 'axios'
import axios from './utils/request'
import App from './App'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import VueSocketIO from 'vue-socket.io'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI)
Vue.use(new VueSocketIO({
  debug: true,
  // 服务器端地址
  connection: 'http://127.0.0.1:8087/'
}))

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// 路由拦截-进入页面前执行
router.beforeEach((to, from, next) => {
  const userMessage = localStorage.getItem('login')
  if (!JSON.parse(userMessage) && (to.path !== '/login' && to.path !== '/SignUp')) {
    next({path: '/login'})
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
