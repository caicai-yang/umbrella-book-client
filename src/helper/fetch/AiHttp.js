import axios from 'axios'
import config from '@/config'
import { responseInterceptorHandler } from './utils'

const instance = axios.create({
  timeout: 3 * 1000,
})


instance.interceptors.response.use((response) => {
  return response.data
})

export default instance