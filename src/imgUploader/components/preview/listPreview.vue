<template>
  <div id="list-preview">
    <!-- 图片预览成功 -->
    <div class="success" v-show="ifSuccess">
      <div class="img-preview" @click="checkFile">
        <img :src="imgSrc">
      </div>
      <!-- 图片信息 -->
      <div class="img-info">
        <span class="img-info-name">
          {{fileName}}
        </span>
        <span class="img-info-size">
          {{fileSize}}
        </span>
      </div>
      <!-- 取消 -->
      <div class="cancel" @click="deleteFile">
        <i class="icon">×</i>
      </div>
    </div>

    <!-- 图片加载中 -->
    <div class="loading" v-show="ifLoading">
      <div class="img-loading">
        <i class="iconfont">&#xeb98;</i>
      </div>
      <div class="process">
        <div class="loaded" ref="loaded"></div>
        <div class="total"></div>
      </div>
      <div class="cancel" @click="deleteFile">
        <i class="icon">×</i>
      </div>
    </div>

    <!-- 图片加载失败 -->
    <div class="failed" v-show="ifFailed">
      <div class="img-failed">
        <i class="iconfont">&#xec0d;</i>
      </div>
      <div class="img-info">
        <span class="img-info-name">
          {{errInfo}}
        </span>
        <!-- <span class="img-info-size">
          {{fileSize}}
        </span> -->
      </div>
      <div class="cancel" @click="deleteFile">
        <i class="icon">×</i>
      </div>
    </div>
  </div>
</template>

<script>
import { readFile, checkFile } from './commonAPI.js'
export default {
  name: 'listPreview',
  data () {
    return {
      imgSrc: '',
      fileName: '',
      fileSize: '',
      ifSuccess: false,
      ifLoading: false,
      ifFailed: false,
      errInfo: ''
    }
  },
  props: ['file', 'maxSize', 'index'],
  created () {
    // 图片过大
    if (this.maxSize && this.file.size > this.maxSize * 1024 * 1024) {
      this.ifFailed = true
      this.errInfo = '图片过大'
      this.$emit('hasError', true)
      this.$emit('oversizeError', this.index)
      return
    }
    readFile(this, this.file, this.index)
    this.fileName = this.file.name
    this.fileSize = this.sizeFilter(this.file.size)
  },
  methods: {
    sizeFilter (size) {
      if (!size) return
      if (size < 1024) {
        return size + 'Byte'
      } else if (size >= 1024 && size < (1024 * 1024)) {
        return (size / 1024).toFixed(2) + 'KB'
      } else {
        return (size / (1024 * 1024)).toFixed(2) + 'MB'
      }
    },
    checkFile,
    deleteFile () {
      this.$emit('hasError', false)
      this.$emit('deleteFile')
    }
  }
}
</script>

<style scoped>
  @import url('../../assets/css/font.css');
  #list-preview {
    width: 20rem;
    border: 1px solid rgb(163, 163, 163);
    height: 2.5rem;
    position: relative;
  }
  #list-preview .success,
  #list-preview .loading,
  #list-preview .failed {
    width: 20rem;
    height: 2.5rem;
    display: flex;
  }
  #list-preview .cancel {
    position: absolute;
    font-size: 1.2rem;
    right: .5rem;
    top: 0;
  }

  /* success */
  #list-preview .img-preview {
    width: 2rem;
    height: 2rem;
    padding: .25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #list-preview .img-preview img {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }

  #list-preview .img-info {
    color: grey;
    height: 100%;
    display: flex;
    align-items: center;
  }
  #list-preview .img-info-name {
    margin-right: 10px;
    margin-left: 10px;
    max-width: 10rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #list-preview .img-info-size{
    font-size: .9rem;
  }

  /* loading */
  #list-preview .loading {
    display: flex;
    align-items: center;
  }
  #list-preview .img-loading,
  #list-preview .img-failed {
    width: 2rem;
    height: 2rem;
    margin: .25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(240, 240, 240);
    color: rgb(140,140,140);
    font-size: 1.2rem;
  }
  #list-preview .process {
    height: .6rem;
    color: grey;
    width: 16rem;
    overflow: hidden;
    position: relative;
  }
  #list-preview .process .total,
  #list-preview .process .loaded {
    height: 100%;
    border-radius: .9rem;
  }
  #list-preview .process .total {
    width: 100%;
    background-color: rgb(240,240,240);
  }
  #list-preview .process .loaded {
    width: 1%;
    background-color: rgb(135, 210, 255);
    position: absolute;
    top: 0;
  }

  /* failed */
  #list-preview .failed {
    border: 1px solid red;
  }
</style>
