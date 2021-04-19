import dayjs from 'dayjs'

function formatDate(d) {
  return d.toLocaleDateString('zh-cn', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')
}

const date = new Date()// 当前日期
const year = date.getFullYear()
const month = date.getMonth() + 1

function fetchWeekByPeriod(firstYear) {
  firstYear = parseInt(firstYear)
  const dates = {}
  while (firstYear <= year) {
    let firstDay = new Date(firstYear, 0, 1) // 一年的第一天
    let lastDay // 一年的最后一天
    if (firstYear === year) {
      lastDay = date
    } else {
      lastDay = new Date(firstYear + 1, 0, 0)
    }
    const day = new Date(firstYear, 0, 1)
    let index = 0
    while (day < lastDay) {
      day.setDate(day.getDate() + 1)
      if (day.getDay() === 6) {
        dates[firstYear + '年第' + (++index) + '周'] = formatDate(firstDay) + '-' + formatDate(day)
        firstDay = new Date(day.getTime() + 86400000)
      }
    }
    if (day !== lastDay) {
      if (firstDay > lastDay) {
        const [fore, last] = dates[firstYear + '年第' + index + '周'].split('-')
        dates[firstYear + '年第' + (index) + '周'] = fore + '-' + formatDate(lastDay)
      } else {
        dates[firstYear + '年第' + (++index) + '周'] = formatDate(firstDay) + '-' + formatDate(lastDay)
      }
    }
    firstYear++
  }
  return dates
}

function fetchMonthByPeriod(firstYear) {
  firstYear = parseInt(firstYear)
  const dates = {}
  let totalMonth = 12
  let firstDay, lastDay
  while (firstYear <= year) {
    let initMonth = 0
    if (firstYear === year) {
      totalMonth = month
    }
    while (initMonth < totalMonth) {
      firstDay = new Date(firstYear, initMonth, 1) // 一个月的第一天
      lastDay = new Date(firstYear, initMonth + 1, 0) // 一个月的最后一天
      dates[firstYear + '-' + (++initMonth + '').padStart(2, 0) + '月'] = formatDate(firstDay) + '-' + formatDate(lastDay)
    }
    firstYear++
  }
  return dates
}

function fetchYearByPeriod(firstYear) {
  firstYear = parseInt(firstYear)
  const dates = {}
  let firstDay, lastDay
  while (firstYear <= year) {
    firstDay = new Date(firstYear, 0, 1) // 每一年的第一天
    lastDay = new Date(firstYear + 1, 0, 0) // 每一年的最后一天
    dates[firstYear + '年'] = formatDate(firstDay) + '-' + formatDate(lastDay)
    firstYear++
  }
  return dates
}

function fetchDateByMode(mode, firstYear) {
  switch (mode) {
    case 'week':
      return fetchWeekByPeriod(firstYear)
    case 'month':
      return fetchMonthByPeriod(firstYear)
    case 'year':
      return fetchYearByPeriod(firstYear)
  }
}


// 通过一段日期区间返回一个数组: 这个区间包含的所有日期: mm-yy 的格式
function fetchDateSec(dateSec, format = 'MM-DD') {
  let [foreDate, lastDate] = dateSec.split('-')
  foreDate = dayjs(foreDate)
  lastDate = dayjs(lastDate)
  let data = []
  while (foreDate.isBefore(lastDate) || foreDate.isSame(lastDate)) {
    data.push(foreDate)
    foreDate = foreDate.add(1, 'day')
  }
  data = data.map(day => {
    return day.format(format);
  })
  return data
}


function transDate(date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}

// 获取一个月份中有多少天数
function fetchDaysInMonth(createAt) {
  return dayjs(createAt).daysInMonth()
}

// 根据 mode 对数据进行分组
// mode 是 year, 以月为单位进行分组
// mode 是 month,以天为单位进行分组
// mode 是 week, 以天为单位进行分组
function groupDateByMode(mode, data) {
  switch (mode) {
    case 'year':

      break;
    case 'month':
    case 'week':
      break
  }
}

// 一段日期间隔多少天
function countDay(createdAt) {
  var date1 = new Date(createdAt)
  console.log('count', (date.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
  return Math.ceil((date.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
}

export {
  fetchDateByMode,
  fetchWeekByPeriod,
  fetchMonthByPeriod,
  fetchYearByPeriod,
  fetchDateSec,
  fetchDaysInMonth,
  transDate,
  countDay
}