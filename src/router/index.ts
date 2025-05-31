import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeVue.vue')
    },
    {
      path: '/pricing',
      name: 'Pricing',
      component: () => import('../views/PricingPage.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Si on a une position sauvegardée (bouton retour du navigateur)
    if (savedPosition) {
      return savedPosition
    }
    
    // Si on a un hash (ancre), scrolle vers cet élément
    if (to.hash) {
      return new Promise((resolve) => {
        // Délai pour s'assurer que le composant est monté
        setTimeout(() => {
          const element = document.querySelector(to.hash)
          if (element) {
            resolve({
              el: element,
              behavior: 'smooth'
            })
          } else {
            resolve({ left: 0, top: 0, behavior: 'instant' })
          }
        }, 200)
      })
    }
    
    // Pour toutes les autres navigations, aller en haut
    return new Promise((resolve) => {
      // Utiliser requestAnimationFrame pour s'assurer que le DOM est rendu
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resolve({ left: 0, top: 0, behavior: 'instant' })
        })
      })
    })
  }
})

export default router