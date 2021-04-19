# umbrella-book-client

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 难点1
selectColumn 组件中的 values 不能用 computed, 只能用 data
原因: 在滑动过程中数据不能变化