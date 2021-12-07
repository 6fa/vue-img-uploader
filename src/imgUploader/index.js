import imgUploader from './index.vue'

const install = function (Vue) {
  Vue.component('uploader', imgUploader)
}

export default {
  install
}
