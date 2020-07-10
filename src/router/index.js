import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: "/refresh",
    name: "refresh",
    component: () => import('@/views/Refresh')
  },
  {
    path: '/',
    name: 'index',
    component: function () {
      return import( /* webpackChunkName: "about" */ '@/views/front/Index.vue')
    },
    children: [{
        path: '/',
        name: 'home',
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/front/Home')
        }
      },
      {
        path: 'article/:id',
        name: 'article',
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/front/pages/article/Index.vue')
        }
      },
      {
        path: 'docs/:path',
        name: 'docs',
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/front/pages/doc/Index')
        }
      },
      {
        path: 'tutorial',
        name: 'tutorial',
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/front/pages/tutorial/Index')
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import( /* webpackChunkName: "about" */ '@/views/auth/Login')
    }
  },
  {
    path: '/register',
    name: 'register',
    component: function () {
      return import( /* webpackChunkName: "about" */ '@/views/auth/Register')
    }
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      requireAuth: true
    },
    component: function () {
      return import( /* webpackChunkName: "about" */ '@/views/admin/Index')
    },
    children: [{
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/Dashboard')
        }
      },
      {
        path: 'url',
        name: 'url',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/url/List')
        }
      },
      {
        path: 'menu',
        name: 'menu',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/menu/List')
        }
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/role/List')
        }
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/user/List')
        }
      },
      {
        path: 'adminRole',
        name: 'adminRole',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/adminRole/List')
        }
      },
      {
        path: 'roleMenu',
        name: 'roleMenu',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/roleMenu/List')
        }
      },
      {
        path: 'article',
        name: 'article',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/article/List')
        }
      },
      {
        path: 'addArticle',
        name: 'addArticle',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/article/Add')
        }
      },
      {
        path: 'category',
        name: 'category',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/category/List')
        }
      },
      {
        path: 'addCategory',
        name: 'addCategory',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/category/Add')
        }
      },
      {
        path: 'tag',
        name: 'tag',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/tag/List')
        }
      },
      {
        path: 'addTag',
        name: 'addTag',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/tag/Add')
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if (to.path.search("/admin") != -1) {
    var userInfo = localStorage.getItem('user_info');
    if (userInfo !== "") {
      userInfo = JSON.parse(localStorage.getItem('user_info'));
    }
    if (userInfo) {
      next();
    } else {
      router.app.$options.store.dispatch("logout");
      next("/login");
      return
    }
  }
  next();
});

export default router