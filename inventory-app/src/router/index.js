import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Products from '../views/Products.vue'
import { useAuthStore } from '../stores/auth'
import NotFound from "../views/NotFount.vue";

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/products',
    component: Products,
    meta: { requiresAuth: true }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
