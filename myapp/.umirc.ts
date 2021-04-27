import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  //   { path: '/users', component: '@/pages/users' },
  // ],
  fastRefresh: {},
  layout: {},
  proxy: {
    '/list': {
      'target': 'http://127.0.0.1:3000',
      'changeOrigin': true,
      // 'pathRewrite': { '^/list' : '' }, 
    },
    '/create': {
      'target': 'http://127.0.0.1:3000',
      'changeOrigin': true,
      // 'pathRewrite': { '^/list' : '' }, 
    },
  },
});
