import Http from '@/helper/fetch'
import AIHttp from '@/helper/fetch/AiHttp'
const createBillApi = '/api/createbill'
const deleteBillApi = '/api/deletebill'
const updateBillApi = '/api/updateBill'
const getBillByTypeApi = '/api/getBillByType'
const getBalanceByDateApi = '/api/getBalanceByDate'
const setBudgetApi = '/api/setBudget'
const getBudgetApi = '/api/getBudget'

// 登录
const loginApi = '/api/login'
// 注册
const regApi = '/api/reg'


// 新建一个新的记账
export const createBill = async function (data) {
  return Http.post(createBillApi, data)
}

// 删除一个账单
export const deleteBill = async function (data) {
  return Http.post(deleteBillApi, data)
}

// 更新一个账单
export const updateBill = async function (data) {
  return Http.post(updateBillApi, data)
}

// 根据 type, 时间区间得到 bill
// params: {type, dateSec}
export const getBillByType = async (params) => {
  return Http.get(getBillByTypeApi, { params })
}

// 根据日期，获取 月份, 收入，支出，结余
// params: {date}
export const getBalanceByDate = async (params) => {
  return Http.get(getBalanceByDateApi, { params })
}

// 设置预算
// data: {date: 一个日期字符串或者日期对象，服务器会提取出某年某月, value: 预算值}
export const setBudget = async (data) => {
  return Http.post(setBudgetApi, data)
}
// 根据用户id获取预算值
export const getBudget = async (params) => {
  return Http.get(getBudgetApi, { params })
}

// 根据 type 得到 category 列表
export const getCategoryByType = async (params) => {
  return await Http.get('/api/getCategoryByType', { params })
}

export const getAllCategory = async () => {
  return await Http.get('/api/getAllCategory')
}

export const userLogin = async (data) => {
  return Http.post(loginApi, data)
}

export const userReg = async (data) => {
  return Http.post(regApi, data)
}

// 批量插入账单
export const batchCreateBill = async (data) => {
  return Http.post('/api/batchCreateBill', data)
}

// 拿到百度AI的 token
// params: {}
const API_KEY = 'phyR6e5GBhzGqFNvRmsOtl13'
const SECRET_KEY = 'szzgLxAorDGOUcvXetAKV0pOgk2H3n8m'
export const getAIToken = async () => {
  const res = await AIHttp.get('/baiduApi/oauth/2.0/token', {
    params: {
      grant_type: 'client_credentials',
      client_id: `${API_KEY}`,
      client_secret: `${SECRET_KEY}`
    }
  })
  return res['access_token']
}
// https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=xxx
// 上传图片扫描识别
export const AIScan = async (image) => {
  const access_token = await getAIToken()
  return AIHttp({
    url: `/baiduApi/rest/2.0/ocr/v1/accurate_basic?access_token=${access_token}`,
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    data: `image=${image}`
  })
}