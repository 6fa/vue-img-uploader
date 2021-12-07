<template>
  <div id="card-preview">
    <!-- 加载成功 -->
    <div class="success" v-show="ifSuccess" ref="success">
      <img class="success-img" :src="imgSrc" />
      <!-- 删除按钮 -->
      <div class="contrl" v-show="showCtrl">
        <i class="iconfont" @click="checkFile">&#xe75f;</i>
        <span>|</span>
        <i class="iconfont" @click="deleteFile">&#xe718;</i>
      </div>
    </div>

    <!-- 加载图片中 -->
    <div class="loading" v-show="ifLoading">
      <div class="cancel" @click="deleteFile">
        <i class="iconfont">&#xeb98;</i>
        <span>取消</span>
      </div>
      <div class="process">
        <div class="loaded" ref="loaded"></div>
        <div class="total"></div>
      </div>
    </div>

    <!-- 加载失败 -->
    <div class="failed" v-show="ifFailed" ref="failed">
      <i class="iconfont break">&#xec0d;</i>
      <span>{{errInfo}}</span>
      <!-- 删除按钮 -->
      <div class="contrl" v-show="showCtrl">
        <i class="iconfont" @click="deleteFile">&#xe718;</i>
      </div>
    </div>
  </div>
</template>

<script>
import { readFile, checkFile } from './commonAPI.js'
export default {
  name: 'cardPreview',
  data () {
    return {
      ifSuccess: false,
      ifLoading: false,
      ifFailed: false,
      showCtrl: false,
      imgSrc: '',
      errInfo: ''
    }
  },
  props: ['file', 'maxSize', 'index'],
  mounted () {
    // 如果图片过大
    if (this.maxSize && this.file.size > this.maxSize * 1024 * 1024) {
      this.ifFailed = true
      this.errInfo = '图片过大'
      const failedEl = this.$refs.failed
      this.previewHandler(failedEl)
      this.$emit('hasError', true)
      this.$emit('oversizeError', this.index)
      return
    }
    readFile(this, this.file, this.index)
    const successEl = this.$refs.success
    const failedEl = this.$refs.failed
    this.previewHandler(successEl)
    this.previewHandler(failedEl)
  },
  methods: {
    previewHandler (el) {
      el.addEventListener('mouseover', () => {
        this.showCtrl = true
      })
      el.addEventListener('mouseout', () => {
        this.showCtrl = false
      })
    },
    deleteFile () {
      this.$emit('hasError', false)
      this.$emit('deleteFile')
    },
    checkFile
  }
}
</script>

<style scoped>
@import url('../../assets/css/font.css');
#card-preview {
  height: 5rem;
}
#card-preview .success,
#card-preview .loading,
#card-preview .failed {
  border: 1px dashed rgb(163, 163, 163);
  width: 5rem;
  height: 5rem;
}
#card-preview .failed {
  border: 1px dashed red;
}
#card-preview .success .contrl,
#card-preview .failed .contrl {
  width: 100%;
  height: 30%;
  position: absolute;
  bottom: 0;
  background-color: rgb(22, 22, 22, 0.5);
  color: white;
  display: flex;
  justify-content:space-around;
  align-items: center;
}
#card-preview .success .contrl i,
#card-preview .failed .contrl i {
  font-size: 1.1rem;
}

/* success部分 */
#card-preview .success {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
#card-preview .success .success-img {
  max-width: 100%;
  max-height: 100%;
}

/* failed部分 */
#card-preview .failed {
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: .85rem;
  justify-content: center;
  color: rgb(140,140,140);
}
#card-preview .failed .break {
  font-size: 1.5rem;
  color: rgb(140,140,140);
}

/* loading部分 */
#card-preview .loading .cancel {
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(247,247,247);
}
#card-preview .loading .cancel i{
  font-size: 1.5rem;
  color: rgb(140,140,140);
}
#card-preview .loading .cancel span {
  font-size: 0.9rem;
  color: rgb(140,140,140);
}
#card-preview .loading .cancel:hover span{
  color: rgb(83, 83, 255);
}

#card-preview .loading .process {
  width: 100%;
  position: relative;
  height: 10%;
}
#card-preview .loading .process .total,
#card-preview .loading .process .loaded {
  position: absolute;
  height: 100%;
  bottom: 0;
}
#card-preview .loading .process .loaded {
  width: 1%;
  background-color: rgb(135, 210, 255);
  z-index: 2;
}
#card-preview .loading .process .total {
  width: 100%;
  background-color:rgb(240,240,240);
  z-index: 1;
}

</style>
