import Mock from 'mockjs'

/**
 * /api/getDetail?years=xx&months=xxx
 * response: {config, data:{code: 0, data: [detailItem,detailItem]}}
 * detailItem: {date: 05年05日, day: '星期五', totalIncome: 100, totalExpence: 100, detail: [{icon: '', category: 餐饮, type: 1|0 1是收入, 0是支出, money: 100}]}
 */

Mock.mock('/api/getDetail', 'get', {
  code: 0,
  'data|1-10': [
    {
      date: '@date(\'mm-dd\')',
      day: '星期五',
      'totalIncome|100-1000': 100,
      'totalExpence|100-1000': 100,
      'detail|1-10': [
        {
          'id|+1': 1,
          'iconId|+1': 1,
          icon: '@image(\'23\', \'#50B347\', \'#FFF\', \'Mock.js\')',
          category: '@cname()',
          type: '@boolean()',
          remark: '',
          'money|1-100': 1,
          date: '@date(\'yyyy-mm-dd\')',
          day: '星期五',
        },
      ],
    },
  ],
})


Mock.mock(/\/api\/getDescriptorById\?id=(\d|\d+)/, 'get', {
  code: 0,
  data: {
    date: '@date(\'yyyy-mm-dd\')',
    day: '星期五',
    icon: '@image(\'23\', \'#50B347\', \'#FFF\', \'Mock.js\')',
    category: '@cname()',
    type: '@boolean()',
    'money|1-100': 1,
    remark: '',
  },
})


// 类目得到列表
Mock.mock(/\/api\/getModifyListByType\?type=(\w+)/, 'get', {
  code: 0,
  data: {
    type: '@boolean',
    'data|10': [{
      'iconId|+1': 1,
      icon: '@image(\'35\', \'#50B347\', \'#FFF\', \'Mock.js\')',
      name: '@cname()'
    }]
  }
})


Mock.mock(/\/api\/getListByType\?type=\d/, 'get', {
  code: 0,
  'data|5-10': ['@date']
})


Mock.mock('/api/getLineChartData', 'get', {
  code: 0,
  data: {
    type: 0,
    desc: '2020年',
    'data|12': [{
      'title|+1': 1,
      data: {
        'total|100-10000': 1,
        'avger|1-100': 1,
        'tops|3': [{
          date: '@date(\'yyyy-mm-dd\')',
          day: '星期五',
          icon: '@image(\'23\', \'#50B347\', \'#FFF\', \'Mock.js\')',
          category: '@cname()',
          'money|10-100': 1
        }],
        // intact:完整的
        'intact|12': [{
          date: '@date(\'yyyy-mm-dd\')',
          day: '星期五',
          icon: '@image(\'23\', \'#50B347\', \'#FFF\', \'Mock.js\')',
          category: '@cname()',
          'money|100-1000': 1
        }]
      }
    }]
  }
})