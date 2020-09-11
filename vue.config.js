module.exports = {
  publicPath: './',   // 打包后，需要使用絕對路徑
  lintOnSave: false,
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/sw.js',
    }
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    }
  }
}
