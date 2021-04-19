// import charts from '@/pages/charts'
const basePath = '../../pages'
export default [
  {
    path: '/charts',
    name: 'charts',
    component: () => import('../../pages/charts/index.vue'),
  },
  {
    path: '/charts/:categoryId/:name/:activeTitle',
    name: 'chartsByType',
    props: true,
    component: () => import('../../pages/charts/chartsByType.vue')
  },
]