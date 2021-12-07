// vue.config.js
const webpack = require("webpack");
module.exports = {
  css: {
    extract: false
  },
  configureWebpack: {
    plugins: [
      // 限制只打一个包，不分Chunk
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ],
    // 当库里面引入了比较大的文件时，为了不影响主包大小，需要设置下该包使用外部引入
    externals: {
      echarts: "echarts"
    }
  }
}; 
