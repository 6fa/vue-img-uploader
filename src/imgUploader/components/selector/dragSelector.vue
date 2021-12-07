<template>
  <!-- 拖拽上传 -->
  <div id="drag-selector" @click="clickInput" ref="dragContainer">
    <i class="icon iconfont">&#xe51a;</i>
    <div class="info" v-show="!show">点击或拖动图片到虚线框内
      <span v-if="limit > 0"> 限{{limit}}张 </span>
      <span v-if="maxSize">{{maxSize}}MB内</span>
    </div>
    <div class="info err" v-show="show">文件不是图片!</div>
    <input style="display:none" type="file" ref="input" @change="getFile" accept="image/*" multiple/>
  </div>
</template>

<script>
export default {
  name: 'dragSelector',
  data () {
    return {
      show: false
    }
  },
  props: ['limit', 'maxSize'],
  methods: {
    clickInput () {
      this.$refs.input.click()
    },
    getFile () {
      const files = this.$refs.input.files
      this.$emit('addFile', files)
    },
    checkIfImg (file) {
      // 检查file的type是不是image/开头
      if (/^image\//.test(file.type)) {
        this.show = false
        return true
      } else {
        // 非图片
        this.show = true
        return false
      }
    }
  },
  mounted () {
    const container = this.$refs.dragContainer
    const self = this

    container.addEventListener('dragover', function (e) {
      e.preventDefault()
    })
    container.addEventListener('drop', function (e) {
      e.preventDefault()
      const file = e.dataTransfer.files[0]

      // 拖拽上传还要检查是不是图片
      const isImg = self.checkIfImg(file)
      if (isImg) {
        self.$emit('addFile', file)
      }
    })
  }
}
</script>

<style scoped>
  @import url('../../assets/css/font.css');
  #drag-selector{
    width: 20rem;
    border: 1px dashed rgb(163, 163, 163);
    height: 4rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: white;
  }
  #drag-selector .icon {
    display: block;
    font-size: 1.4rem;
    width: 100%;
  }
  #drag-selector .info {
    height: 2rem;
    line-height: 2rem;
    width: 100%;
    color: grey;
  }
  #drag-selector .info span {
    font-size: .8rem;
  }
  #drag-selector .info.err{
    color: red;
  }
</style>
