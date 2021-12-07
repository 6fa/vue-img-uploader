function processHandler (loaded, total, self) {
  const percentage = Math.round(loaded / total) * 100
  self.$refs.loaded.style.width = `${percentage}%`
}
export const readFile = function (self, file, index) {
  const reader = new FileReader()
  reader.onload = function () {
    self.imgSrc = this.result
    self.ifLoading = false
    self.ifSuccess = true
    self.ifFailed = false
  }
  reader.onprogress = function (e) {
    processHandler(e.loaded, e.total, self)
    self.ifLoading = true
    self.ifSuccess = false
    self.ifFailed = false
  }
  reader.onerror = function () {
    self.ifLoading = false
    self.ifSuccess = false
    self.ifFailed = true
    self.errInfo = '读取失败'
    self.$emit('hasError', true)
    self.$emit('readError', index)
  }
  reader.readAsDataURL(file)
}

export const checkFile = function () {
  const newWin = window.open('', '_blank')
  newWin.document.body.innerHTML = `<img src=${this.imgSrc} />`
}
