// const env = PROJECT_ENV || 'dev'
const env = 'production'
let config = require(`./${env}`).default

console.log(config)

config = { ...config, env }

export default config
