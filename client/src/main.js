import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Socket from './services/socketio.service'
import Icon from 'vue-awesome/components/Icon'

// individual icons
import 'vue-awesome/icons/random'

Vue.config.productionTip = false
Vue.prototype.$socket = new Socket(store)
Vue.component('v-icon', Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
