import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import BookDetail from '@/views/BookDetail.vue'
import Admin from '@/views/Admin.vue'
import Login from '@/views/Login'
import store from '@/store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { needAuth: true }/* needAuth est un nom arbitraire */
  },
  {
    path: '/book/:bookID',
    name: 'BookDetail',
    component: BookDetail,
    meta: { needAuth: true }/* needAuth est un nom arbitraire */
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { needAuth: true }/* needAuth est un nom arbitraire */
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const userInStore = store.state.utilisateur.user;
  const isAuthenticated = userInStore !== null ? true : false;
  const isProtected = to.matched.some(route => route.meta.needAuth);
  if (!isAuthenticated && isProtected) { 
    next({ name : 'Login' });
  } else { 
    next();
  } 
});

export default router
