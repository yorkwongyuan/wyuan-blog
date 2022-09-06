const { defineConfig } = require('@vue/cli-service')

const { name } = require('./package.json')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      library: name,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${name}`
    }
  },
  devServer: {
    port: process.env.VUE_APP_PORT,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})
