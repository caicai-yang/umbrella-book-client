// const env = PROJECT_ENV || 'dev'
const env = 'development'
let config = require(`./${env}`).default

// console.log(config)

config = { ...config, env }

export default config
