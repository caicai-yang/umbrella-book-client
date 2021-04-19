module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  // 配置全局变量
  globals: {
  },
  rules: {
    semi: [
      'warn',
      'never',
    ],
    quotes: [
      'error',
      'single',
    ],
    indent: [
      'error',
      2,
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
      },
    ],
    'linebreak-style': ['off', 'windows'],
  },
}
