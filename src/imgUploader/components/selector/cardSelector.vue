<template>
  <!-- 卡片上传 -->
  <div id="card-selecter" @click="clickInput">
    <i class="icon iconfont">&#xe8f3;</i>
    <div class="info">
      <span v-if="limit > 0">限{{limit}}张</span>
      <span class="limit" v-if="maxSize">{{maxSize}}MB内</span>
      <span v-if="!maxSize && !limit">上传图片</span>
    </div>
    <input style="display:none"  type="file" ref="input" @change="getFile" accept="image/*" multiple/>
  </div>
</template>

<script>
export default {
  name: 'cardSelecter',
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
@import url('../../assets/css/font.css');

#card-selecter {
  border: 1px dashed lightgrey;
  width: 5rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
#card-selecter:hover {
  color: rgb(83, 83, 255);
  border: 1px dashed rgb(027,154,238);
}
#card-selecter:hover .icon,
#card-selecter:hover .info {
  color: rgb(027,154,238);
}
#card-selecter .info,
#card-selecter .icon {
  display: block;
  width: 100%;
  /* height: 2.5rem; */
}
#card-selecter .icon {
  font-size: 1.4rem;
  /* line-height: 2.5rem; */
  color:rgb(140,140,140);
}
#card-selecter .info {
  font-size: 0.9rem;
  color:rgb(140,140,140);
  display: flex;
  flex-direction: column;
}
#card-selecter .info .limit {
  font-size: 0.8rem;
}
</style>
