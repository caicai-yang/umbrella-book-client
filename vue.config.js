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
    config
      .plugin('define')
      .tap(args => {
        args[0].PROJECT_ENV = "test"
        return args
      })
  }
}