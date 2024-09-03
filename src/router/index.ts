import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import home from '../views/Home.vue'
import admin from '../views/Admin.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin,
    meta: { requiresRole: 'admin' } // Spécifier le rôle requis pour cette route
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Ajouter la garde de navigation globale
router.beforeEach((to, from, next) => {
  // Récupérer le token et le rôle stockés dans le localStorage
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('role');

  // Vérifier si la route nécessite un rôle spécifique
  if (to.matched.some(record => record.meta.requiresRole)) {
    // Vérifier si l'utilisateur a le rôle requis
    if (token && userRole === to.meta.requiresRole) {
      next(); // L'utilisateur a le rôle requis, continuer vers la route
    } else {
      next('/'); // Rediriger vers la page de connexion ou une autre page
    }
  } else {
    // Route accessible sans vérification de rôle
    next();
  }
});

export default router;
