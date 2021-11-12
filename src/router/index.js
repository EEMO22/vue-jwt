// import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import RegisterUser from '../views/RegisterUser.vue';
import LoginUser from '../views/LoginUser.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUser,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginUser,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
