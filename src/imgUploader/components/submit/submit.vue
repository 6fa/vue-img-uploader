<template>
  <div id="button-submit" @click="upload">
    <div class="info">{{info}}</div>
  </div>
</template>

<script>
import { uploadFile } from './submit.js'
export default {
  name: 'buttonSubmit',
  data () {
    return {
      uploading: false,
      info: '上传图片'
    }
  },
  props: ['fileList', 'url', 'hasErr'],
  methods: {
    upload () {
      if (this.uploading) return
      if (this.fileList.length <= 0) return

      if (this.hasErr) {
        this.info = '图片有误'
        setTimeout(() => {
          this.info = '上传图片'
        }, 1500)
        return
      }

      this.uploading = true
      this.info = '上传中'

      uploadFile(this.fileList, this.url).then(res => {
        this.$emit('uploadSuccess', res)
        this.info = '上传成功'
        setTimeout(() => {
          this.reset()
        }, 1500)
      }).catch(err => {
        this.$emit('uploadFail', err)
        this.info = '上传失败'
        setTimeout(() => {
          this.info = '上传图片'
          this.uploading = false
        }, 1500)
      })
    },
    reset () {
      this.info = '上传图片'
      this.$emit('reset')
      this.uploading = false
    }
  }
}
</script>

<style scoped>
#button-submit {
  width: 5rem;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  margin-top: .5rem;
  position: relative;
  background-color: white;
}
#button-submit .info {
  width: 100%;
  height: 100%;
  color: white;
  background-color: rgb(135, 210, 255);
  border-radius: 10px;
}
#button-submit .info:hover {
  background-color: rgb(027,154,238);
}

</style>
