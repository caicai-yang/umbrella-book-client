import axios from 'axios'
import config from '@/config'
import { requestInterceptorHandler, responseInterceptorHandler } from './utils'

console.log('config', config)

const instance = axios.create({
  baseURL: `${config.host}`,
  withCredentials: false,
  timeout: 3 * 1000,
})

instance.interceptors.request.use((config) => requestInterceptorHandler(config), (reason) => {
  throw reason
})

instance.interceptors.response.use((response) => responseInterceptorHandler(response), (reason) => {
  throw reason
})

export default instance
