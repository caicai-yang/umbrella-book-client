import dayjs from 'dayjs'

const last = new Date().getFullYear()
const early = 1970
function createArray(length, increment = 1) {
  return new Array(length).fill(0).map((item, index) => {
    item = index + increment
    return item
  })
}

const years = createArray((last - early + 1), early)
const months = createArray(12)
const dates = createArray(31)
function getDates(year, month) {
  if (/^(1|3|5|7|8|10|12)$/.test(month)) {
    return createArray(31)
  }
  if (/^(4|6|9|11)$/.test(month)) {
    return createArray(30)
  }
  if (/^2$/.test(month)) {
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
      return createArray(29)
    }

    return createArray(28)
  }

  throw new Error('month is illegal')
}

// 获取当前年，月
const now = dayjs()
const year = now.year()
const month = now.month() + 1


export {
  years,
  months,
  dates,
  getDates,
  year,
  month
}
