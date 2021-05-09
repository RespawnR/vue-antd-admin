import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'dashboard',
          name: '仪表盘',
          meta: {
            icon: 'dashboard'
          },
          component: () => import('@/pages/dashboard')
        },
        {
          path: 'posts',
          name: '文章',
          meta: {
            icon: 'form',
          },
          component: PageView,
          children: [
            {
              path: 'list',
              name: '所有文章',
              component: () => import('@/pages/posts/list'),
            },
            {
              path: 'write',
              name: '写文章',
              component: () => import('@/pages/posts/write/Write'),
            },
            {
              path: 'categories',
              name: '分类目录',
              component: () => import('@/pages/categories'),
            },
            {
              path: 'tags',
              name: '标签',
              component: () => import('@/pages/tags'),
            }
          ]
        },
        {
          path: 'comments',
          name: '评论',
          meta: {
            icon: 'message'
          },
          component: () => import('@/pages/comments')
        },
        {
          path: 'user',
          name: '用户',
          meta: {
            icon: 'user',
          },
          component: PageView,
          children: [
            {
              path: 'profile',
              name: '个人资料',
              component: () => import('@/pages/profile'),
            }
          ]
        },
        {
          path: 'system',
          name: '系统',
          meta: {
            icon: 'setting',
          },
          component: PageView,
          children: [
            {
              path: 'options',
              name: '博客设置',
              component: () => import('@/pages/system/options'),
            }
          ]
        },
        {
          path: 'exception',
          name: '异常页',
          meta: {
            icon: 'warning',
            invisible: true
          },
          component: BlankView,
          children: [
            {
              path: '404',
              name: 'Exp404',
              component: () => import('@/pages/exception/404')
            },
            {
              path: '403',
              name: 'Exp403',
              component: () => import('@/pages/exception/403')
            },
            {
              path: '500',
              name: 'Exp500',
              component: () => import('@/pages/exception/500')
            }
          ]
        },
        {
          path: 'demo',
          name: '演示页',
          meta: {
            icon: 'file-ppt',
            invisible: true
          },
          component: () => import('@/pages/demo')
        },
        {
          name: '验权页面',
          path: 'auth/demo',
          meta: {
            icon: 'file-ppt',
            component: () => import('@/pages/demo')
          }
        }
      ]
    }
  ]
}

export default options
