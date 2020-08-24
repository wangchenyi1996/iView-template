module.exports = {
  publicPath: './',   // 打包后，需要使用絕對路徑
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    }
  }
}
