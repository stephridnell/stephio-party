import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Socket from './services/socketio.service'

Vue.config.productionTip = false
Vue.prototype.$socket = new Socket(store)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
