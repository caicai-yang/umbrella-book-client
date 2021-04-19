import Bus from '@/helper/bus'

function requestInterceptorHandler(config) {
  // 添加userID, accessToken
  const uid = parseInt(localStorage.getItem('uid'))
  if (config.params) {
    config.params = Object.assign(config.params, { uid })
  }
  if (config.data) {
    if (config.data instanceof Array) {
      config.data = config.data.map(item => {
        item['uid'] = uid
        return item
      })
    } else {
      config.data = Object.assign(config.data, { uid })
    }
  }
  return config
}

/**
 * @param {Object} response
 * @returns {Object || null}
 * response 的格式: {data, status, statusText, headers, config}
 */
function responseInterceptorHandler(response) {
  if (response.data.code === 0) return response.data.data
  // denyNetworkError: true, 不显示网络错误弹窗
  // if (!response.config.denyNetworkError) {
  //   // 显示网络错误弹窗

  // }
  Bus.$toast(`网络错误${response.data.code}`)
  return null
}

export {
  requestInterceptorHandler,
  responseInterceptorHandler,
}
