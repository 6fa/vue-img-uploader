<template>
  <div id="uploader-wrapper">
    <div id="uploader-pre">
      <div id="uploader-pre-item" v-for="(file,index) in fileList" :key="file.name">
        <component :file="file" :index='index' @deleteFile="deleteFile(index)" :is='previewComp' :maxSize='maxSize' @hasError='hasError' @oversizeError='oversizeErr' @readError='readErr'></component>
      </div>
    </div>
    <component @addFile="addPreview" :is='selectComp' :limit='limit' :maxSize='maxSize'></component>
    <submit-button v-if="ifSubmit" :hasErr='error' :fileList='fileList' :url='submit' @uploadSuccess='success' @uploadFail='fail' @reset='reset'></submit-button>
  </div>
</template>

<script>
export default {
  name: 'uploader',
  data () {
    return {
      fileList: [],
      fileNameList: [],
      fileSizeList: [],
      ifSubmit: false,
      error: false
    }
  },
  props: {
    previewComp: {
      type: String,
      default: 'cardPreview'
    },
    selectComp: {
      type: String,
      default: 'cardSelector'
    },
    limit: {
      type: Number
    },
    submit: {
      type: String
    },
    maxSize: {
      type: Number
    }
  },
  created () {
    if (this.submit) {
      this.ifSubmit = true
    }
  },
  components: {
    dragSelector: () => import('./components/selector/dragSelector.vue'),
    cardSelector: () => import('./components/selector/cardSelector.vue'),
    buttonSelector: () => import('./components/selector/buttonSelector.vue'),
    cardPreview: () => import('./components/preview/cardPreview.vue'),
    listPreview: () => import('./components/preview/listPreview.vue'),
    submitButton: () => import('./components/submit/submit.vue')
  },
  methods: {
    addPreview (files) {
      if (!files || files.length <= 0) return

      for (let i = 0; i < files.length; i++) {
        if (this.limit && this.fileList.length >= this.limit) return
        const file = files[i]
        const name = file.name
        const size = file.size
        if (this.fileNameList.indexOf(name) !== -1 && this.fileSizeList.indexOf(files[i].size) !== -1) return
        this.fileList.push(file)
        this.fileNameList.push(name)
        this.fileSizeList.push(size)
      }
    },
    deleteFile (index) {
      this.fileList.splice(index, 1)
      this.fileNameList.splice(index, 1)
      this.fileSizeList.splice(index, 1)
    },
    success (res) {
      this.$emit('uploadSuccess', res)
    },
    fail (err) {
      this.$emit('uploadFail', err)
    },
    reset () {
      this.fileList = []
    },
    hasError (flag) {
      this.error = flag
    },
    oversizeErr (index) {
      this.$emit('oversize', index)
    },
    readErr (index) {
      this.$emit('readError', index)
    }
  }
}
</script>

<style>
#uploader-wrapper {
  text-align: center;
}
#uploader-pre {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
#uploader-pre-item {
  margin: 0 .5rem .5rem 0;
}

</style>
