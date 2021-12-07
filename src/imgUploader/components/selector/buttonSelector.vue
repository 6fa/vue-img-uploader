<template>
  <div id="button-selector" @click="clickInput">
    <div class="info">选择图片</div>
    <input style="display:none"  type="file" ref="input" @change="getFile" accept="image/*" multiple/>
  </div>
</template>

<script>
export default {
  name: 'buttonSelecter',
  props: ['limit', 'maxSize'],
  methods: {
    clickInput () {
      this.$refs.input.click()
    },
    getFile (e) {
      const files = e.target.files
      this.$emit('addFile', files)
    }
  }
}
</script>

<style scoped>
#button-selector {
  width: 5rem;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  margin-top: .5rem;
}
#button-selector .info {
  width: 100%;
  height: 100%;
  color: white;
  background-color: rgb(135, 210, 255);
  border-radius: .7rem;
}
#button-selector .info:hover {
  background-color: rgb(027,154,238);
}

</style>