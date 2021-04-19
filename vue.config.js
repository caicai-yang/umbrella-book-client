const { projectEnv } = require('minimist')(process.argv.slice(2))

// console.log(projectEnv)

module.exports = {
  lintOnSave: true,
  css: {
    // extract CSS in components into a single CSS file (only in production)
    extract: false, // 移动增量化CSS
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/variable.scss";'
      }
    }
  },
  chainWebpack: config => {
    // TODO: 设置全局变量, 报错了!
    config
      .plugin('define')
      .tap(args => {
        args[0].PROJECT_ENV = "test"
        return args
      })
  },
  devServer: {
    proxy: {
      // 后端不能访问外网服务，百度AI的
      '/baiduApi': {
        target: 'https://aip.baidubce.com', //访问地址
        changeOrigin: true,
        secure: false, //只有代理https 地址需要次选项
        pathRewrite: {
          '^/baiduApi': ''
        }
      },
    }
  }
}