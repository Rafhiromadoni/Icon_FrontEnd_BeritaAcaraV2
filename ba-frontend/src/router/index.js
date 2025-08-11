import { createRouter, createWebHistory } from 'vue-router';
import GeneratorPage from '../views/GeneratorPage.vue';
import HistoryPage from '../views/HistoryPage.vue';
import PreviewPage from '../views/PreviewPage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import TemplateUploadPage from '../views/TemplateUploadPage.vue';  // ➕ import baru

import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/upload-template',       // ➕ halaman upload template
    name: 'upload-template',
    component: TemplateUploadPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/',                      // generator sekarang juga terima props
    name: 'generator',
    component: GeneratorPage,
    meta: { requiresAuth: true },
    props: route => ({
      placeholders: JSON.parse(route.query.placeholders || '[]'),
      templatePath: route.query.templatePath || ''
    })
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryPage,
    meta: { requiresAuth: true } 
  },
  {
    path: '/preview',
    name: 'preview',
    component: PreviewPage,
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  // jika kamu masih ingin mendukung flow [B] (predefined templates),
  // bisa tambahkan route lain di sini, misal /choose-template
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// global auth guard
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return next({ name: 'login' });
  }
  next();
});

export default router;
