<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
// Import components
import Navbar from '@/components/Navbar.vue'
import PricingSection from '@/components/PricingComponents/PricingSection.vue'
import FooterSection from '@/components/Footer.vue'

// State management similaire à HomeView
const scrollY = ref<number>(0)
const pageLoaded = ref<boolean>(false)
const showBackToTop = ref<boolean>(false)
const sectionVisibility = reactive<Record<string, boolean>>({
  pricing: false
})

// Navigation handler
const handleNavigation = (section: string): void => {
  if (section === 'hero') {
    // Redirection vers la page d'accueil
    window.location.href = '/'
    return
  }
  
  const element = document.getElementById(section)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Optimized scroll handler avec throttling
let ticking = false
const handleScroll = (): void => {
  if (!ticking) {
    requestAnimationFrame(() => {
      scrollY.value = window.pageYOffset
      showBackToTop.value = window.pageYOffset > 300
      ticking = false
    })
    ticking = true
  }
}

// Scroll to top
const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Intersection Observer optimisé
let observer: IntersectionObserver | null = null
onMounted(() => {
  // Configuration immédiate
  sectionVisibility.pricing = true
  pageLoaded.value = true
 
  // Passive scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true })
 
  // Intersection Observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id in sectionVisibility) {
          sectionVisibility[entry.target.id] = true
          observer?.unobserve(entry.target)
        }
      })
    },
    { 
      threshold: 0.1,
      rootMargin: '50px'
    }
  )
  
  // Setup observer après un délai pour éviter le layout thrash
  setTimeout(() => {
    const pricingElement = document.getElementById('pricing')
    if (pricingElement) observer?.observe(pricingElement)
  }, 200)
})

// Cleanup
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  observer?.disconnect()
})
</script>

<template>
  <!-- Page pricing complète -->
  <div class="min-h-screen">
    <Navbar :scrollY="scrollY" @navigate="handleNavigation" />
    <PricingSection :isVisible="sectionVisibility.pricing" id="pricing" />
    <FooterSection />
   
    <!-- Back to top button (repris de HomeView) -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 scale-75"
      enter-to-class="opacity-100 scale-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >
      <button
        v-show="showBackToTop"
        @click="scrollToTop"
        class="back-to-top-btn"
        aria-label="Back to top"
      >
        <svg viewBox="0 0 384 512" class="svgIcon">
          <path
            d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
          ></path>
        </svg>
      </button>
    </Transition>
  </div>
</template>

<style>
/* Styles minimaux pour scroll fluide (repris de HomeView) */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

/* Variables CSS pour la cohérence */
:root {
  --color-cream: #EFD9CE;
  --color-lavender: #DEC0F1;
  --color-teal: #50C5B7;
  --color-blue: #496DDB;
  --color-dark-green: #14342B;
}

/* Animations optimisées */
.slide-up-fade {
  transform: translateY(30px);
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.element-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Back to top button optimisé (repris de HomeView) */
.back-to-top-btn {
  position: fixed !important;
  bottom: 2rem !important;
  right: 2rem !important;
  z-index: 30 !important;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(rgb(227, 203, 255), rgba(252, 235, 252, 1));
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  will-change: auto;
}

.back-to-top-btn:hover {
  will-change: transform, background-color, width;
  width: 140px;
  border-radius: 50px;
  background-color: #7a18e5;
  align-items: center;
}

.back-to-top-btn:not(:hover) {
  will-change: auto;
}

.back-to-top-btn .svgIcon {
  width: 12px;
  transition: transform 0.3s ease;
}

.back-to-top-btn .svgIcon path {
  fill: #7a18e5;
}

.back-to-top-btn:hover .svgIcon {
  transform: translateY(-200%);
}

.back-to-top-btn::before {
  position: absolute;
  bottom: -20px;
  content: "Back to Top";
  color: #7a18e5;
  font-size: 0px;
  transition: all 0.3s ease;
}

.back-to-top-btn:hover::before {
  font-size: 13px;
  opacity: 1;
  bottom: unset;
}

/* GPU acceleration pour animations fluides */
.back-to-top-btn {
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>