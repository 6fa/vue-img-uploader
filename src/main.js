import Vue from 'vue'
import App from './App.vue'
import imgUploader from './imgUploader/index'
// import imgUploader from '../imgUploader/imgUploader.umd'

Vue.config.productionTip = false
Vue.use(imgUploader)

new Vue({
  render: h => h(App),
}).$mount('#app')
