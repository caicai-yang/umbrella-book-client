export default [
  {
    path: '/account',
    name: 'account',
    component: () => import('../../pages/account/index.vue'),
  },
  {
    path: '/account-scan',
    name: 'account-scan',
    component: () => import('../../pages/account/scan/index.vue'),
  },
  {
    path: '/account-history-bill',
    name: 'account-history-bill',
    component: () => import('../../pages/account/history/index'),
  },

]