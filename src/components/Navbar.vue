<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { Home, Star, Library, Tag, LogIn } from 'lucide-vue-next'
import LightSwitch from '@/components/LightSwitch.vue'

// Import des logos statiquement
import Logo1 from '@/assets/Logos/Logo1.png'
import LogoDarkMode from '@/assets/Logos/Logo-DarkMode.png'

// Props & Emits
interface NavbarProps {
  scrollY: number
}
const props = defineProps<NavbarProps>()
const emit = defineEmits<{ (e: 'navigate', section: string): void }>()

// States
const isMenuOpen = ref(false)
const activeSection = ref('hero')
const showHeader = ref(true)
const lastScrollPosition = ref(0)
const isScrolled = ref(false)
const isNavigating = ref(false)
const isDarkMode = ref(false)

// Optimisation: utiliser des variables plutôt que des refs pour les timeouts
let navigationTimeout: ReturnType<typeof setTimeout> | null = null
let sectionObserver: IntersectionObserver | null = null

// Optimisation: constante pour éviter les recalculs
const SECTIONS = ['hero', 'features', 'showcase', 'action'] as const
const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'features', label: 'Features', icon: Star },
  { id: 'showcase', label: 'Mojidex', icon: Library },
  { id: 'action', label: 'Pricing', icon: Tag }
] as const

// Logo dynamique selon le thème - FIXÉ
const logoSrc = computed(() => {
  return isDarkMode.value ? LogoDarkMode : Logo1
})

// Observer les changements de thème
const themeObserver = ref<MutationObserver | null>(null)

// Fonction pour détecter le mode dark
const detectDarkMode = () => {
  isDarkMode.value = document.documentElement.classList.contains('dark') || 
                     document.body.classList.contains('dark')
}

// Methods
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const setActiveSection = (section: string) => {
  activeSection.value = section
  isMenuOpen.value = false
  isNavigating.value = true
  
  // Optimisation: nettoyer avant de créer un nouveau timeout
  if (navigationTimeout) {
    clearTimeout(navigationTimeout)
    navigationTimeout = null
  }
  
  emit('navigate', section)
  
  navigationTimeout = setTimeout(() => {
    isNavigating.value = false
    navigationTimeout = null
  }, 1500)
}

// Optimisation: fonction de détection plus efficace
const detectActiveSection = () => {
  if (isNavigating.value) return
  
  const scrollPosition = window.scrollY + 100
  let currentSection = 'hero'
  
  // Optimisation: boucle inverse pour performance
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    const sectionId = SECTIONS[i]
    const element = document.getElementById(sectionId)
    if (element) {
      const rect = element.getBoundingClientRect()
      const elementTop = window.scrollY + rect.top
      
      if (scrollPosition >= elementTop - 200) {
        currentSection = sectionId
        break
      }
    }
  }
  
  if (activeSection.value !== currentSection) {
    activeSection.value = currentSection
  }
}

// Optimisation: intersection observer avec throttling
const setupSectionObserver = () => {
  if (sectionObserver) {
    sectionObserver.disconnect()
    sectionObserver = null
  }
  
  sectionObserver = new IntersectionObserver(
    (entries) => {
      if (isNavigating.value) return
      
      let mostVisibleSection = ''
      let maxVisibleArea = 0
      
      // Optimisation: utiliser for au lieu de forEach
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const visibleArea = entry.intersectionRatio * entry.boundingClientRect.height
          if (visibleArea > maxVisibleArea) {
            maxVisibleArea = visibleArea
            mostVisibleSection = entry.target.id
          }
        }
      }
      
      if (mostVisibleSection && activeSection.value !== mostVisibleSection) {
        activeSection.value = mostVisibleSection
      }
    },
    {
      threshold: [0.1, 0.3, 0.5, 0.7],
      rootMargin: '-80px 0px -20% 0px'
    }
  )
  
  // Optimisation: observer seulement les sections qui existent
  for (const sectionId of SECTIONS) {
    const element = document.getElementById(sectionId)
    if (element) {
      sectionObserver.observe(element)
    }
  }
}

// Observer les changements de thème - OPTIMISÉ
const setupThemeObserver = () => {
  // Détection initiale
  detectDarkMode()
  
  themeObserver.value = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        detectDarkMode()
      }
    })
  })
  
  // Observer les changements de classe sur html et body
  themeObserver.value.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
  
  themeObserver.value.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  })
}

// Optimisation: watcher avec debouncing implicite
let scrollTimeout: ReturnType<typeof setTimeout> | null = null
watch(() => props.scrollY, (newVal) => {
  // Optimisation: éviter les calculs inutiles
  const wasScrolled = isScrolled.value
  isScrolled.value = newVal > 50
  
  if (isNavigating.value) {
    showHeader.value = true
  } else {
    // Optimisation: calcul simplifié
    showHeader.value = newVal <= lastScrollPosition.value || newVal <= 100
    
    // Optimisation: debounce la détection de section
    if (scrollTimeout) clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(detectActiveSection, 16) // ~60fps
  }
  
  lastScrollPosition.value = newVal
})

// Lifecycle optimisé
onMounted(async () => {
  // Optimisation: attendre que le DOM soit complètement rendu
  await nextTick()
  setTimeout(setupSectionObserver, 100) // Réduit de 500ms à 100ms
  setupThemeObserver() // Observer les changements de thème
})

onUnmounted(() => {
  // Optimisation: cleanup complet
  if (navigationTimeout) {
    clearTimeout(navigationTimeout)
    navigationTimeout = null
  }
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
    scrollTimeout = null
  }
  if (sectionObserver) {
    sectionObserver.disconnect()
    sectionObserver = null
  }
  if (themeObserver.value) {
    themeObserver.value.disconnect()
    themeObserver.value = null
  }
})
</script>

<template>
  <header 
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out"
    :class="[
      {'transform -translate-y-full': !showHeader}, 
      {'nav-scrolled': isScrolled}
    ]">
    <!-- Logo & Navigation -->
    <div class="max-w-7xl mx-auto p-0">
      <div class="flex justify-between items-center h-20 px-4">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="#" class="flex items-center" @click.prevent="setActiveSection('hero')">
            <img 
              :src="logoSrc" 
              alt="Nyto.ai Logo" 
              class="h-14 md:h-16 transition-all duration-300 hover:scale-105"
              :key="logoSrc"
            />
          </a>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center">
          <div class="flex items-center space-x-1">
            <button
              v-for="item in navItems"
              :key="item.id"
              @click="setActiveSection(item.id)"
              class="px-4 py-2.5 rounded-full nav-item transition-all duration-300 relative overflow-hidden group text-sm"
              :class="activeSection === item.id ? 'nav-item-active' : ''">
              <span class="relative z-10 flex items-center">
                <component :is="item.icon" class="w-4 h-4 mr-2" />
                {{ item.label }}
              </span>
              <span class="absolute inset-0 nav-item-bg transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                    :class="{'scale-x-100': activeSection === item.id}"></span>
            </button>
          </div>
          
          <div class="ml-6 pl-6 border-l nav-divider flex items-center space-x-3">
            <button class="px-5 py-2.5 rounded-md nav-cta-button transition-all duration-300 transform hover:-translate-y-1 text-sm">
              Start Learning
            </button>
            <button class="px-5 py-2.5 rounded-md nav-login-button transition-all duration-300 transform hover:-translate-y-1 text-sm flex items-center">
              <LogIn class="w-4 h-4 mr-2" />
              Log In
            </button>
            
            <!-- Theme Switch tout à droite -->
            <LightSwitch />
          </div>
        </nav>
        
        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center space-x-3">
          <!-- Theme Switch Mobile -->
          <LightSwitch />
          
          <button class="flex items-center" @click="toggleMenu" aria-label="Toggle menu">
            <div class="w-6 h-6 flex items-center justify-center relative">
              <span class="hamburger-line top-line"
                    :class="{ 'rotate-45 translate-y-0': isMenuOpen }"></span>
              <span class="hamburger-line middle-line"
                    :class="{ 'opacity-0': isMenuOpen }"></span>
              <span class="hamburger-line bottom-line"
                    :class="{ '-rotate-45 translate-y-0': isMenuOpen }"></span>
            </div>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Beautiful gradient border -->
    <div class="absolute bottom-0 left-0 right-0 h-[3px] navbar-gradient-border"></div>
    
    <!-- Mobile Navigation -->
    <div 
      class="md:hidden transition-all duration-300 overflow-hidden mobile-menu"
      :class="isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'">
      <div class="p-4 sm:p-6 space-y-3">
        <button 
          v-for="item in navItems" 
          :key="item.id"
          @click="setActiveSection(item.id)"
          class="block w-full text-left py-3 px-4 rounded-lg transition-all duration-200 flex items-center"
          :class="activeSection === item.id ? 'mobile-nav-active' : 'mobile-nav-item'">
          <component :is="item.icon" class="w-5 h-5 mr-3" />
          {{ item.label }}
        </button>
        
        <div class="flex flex-col space-y-3 mt-5">
          <button class="w-full p-3 rounded-md mobile-cta transition-all duration-300">
            Start Learning
          </button>
          <button class="w-full p-3 rounded-md mobile-login transition-all duration-300 flex items-center justify-center">
            <LogIn class="w-5 h-5 mr-2" />
            Log In
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Base Colors */
:root {
  --color-cream: #EFD9CE;
  --color-lavender: #DEC0F1;
  --color-teal: #50C5B7;
  --color-blue: #496DDB;
  --color-dark-green: #14342B;
}

/* Navbar styling */
header {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.dark header {
  background: rgba(31, 41, 55, 0.7);
}

.nav-scrolled {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.dark .nav-scrolled {
  background: rgba(31, 41, 55, 0.85);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Gradient border */
.navbar-gradient-border {
  background: linear-gradient(90deg, #50C5B7 0%, #DEC0F1 25%, #496DDB 50%, #EFD9CE 75%, #50C5B7 100%);
  animation: borderGradient 8s ease infinite;
  background-size: 200% 200%;
}

@keyframes borderGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Navigation items */
.nav-item {
  color: var(--color-dark-green);
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-item:hover {
  color: var(--color-blue);
}

.nav-item-active {
  color: var(--color-blue);
  font-weight: 600;
}

.dark .nav-item {
  color: white;
}

.dark .nav-item:hover {
  color: var(--color-teal);
}

.dark .nav-item-active {
  color: white;
}

.nav-item-bg {
  background-color: rgba(73, 109, 219, 0.1);
  border-radius: 9999px;
}

.dark .nav-item-bg {
  background-color: rgba(80, 197, 183, 0.2);
}

.nav-divider {
  border-color: rgba(80, 197, 183, 0.3);
  height: 36px;
}

.dark .nav-divider {
  border-color: rgba(80, 197, 183, 0.5);
}

/* Buttons */
.nav-cta-button {
  background: linear-gradient(135deg, var(--color-teal) 0%, #3da89b 100%);
  color: var(--color-dark-green);
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(80, 197, 183, 0.3);
  transition: all 0.3s ease;
}

.nav-cta-button:hover {
  box-shadow: 0 6px 20px rgba(80, 197, 183, 0.4);
  filter: brightness(1.05);
}

.dark .nav-cta-button {
  color: white;
}

.nav-login-button {
  background: transparent;
  border: 2px solid var(--color-lavender);
  color: var(--color-dark-green);
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-login-button:hover {
  background-color: rgba(222, 192, 241, 0.3);
  border-color: var(--color-teal);
  box-shadow: 0 4px 12px rgba(222, 192, 241, 0.3);
}

.dark .nav-login-button {
  border-color: var(--color-teal);
  color: white;
}

.dark .nav-login-button:hover {
  background-color: rgba(80, 197, 183, 0.2);
  border-color: var(--color-lavender);
  box-shadow: 0 4px 12px rgba(80, 197, 183, 0.3);
}

/* Mobile menu */
.mobile-menu {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(80, 197, 183, 0.3);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.dark .mobile-menu {
  background: rgba(31, 41, 55, 0.9);
  border-top: 1px solid rgba(80, 197, 183, 0.5);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.mobile-nav-item {
  color: var(--color-dark-green);
  background-color: rgba(80, 197, 183, 0.1);
  border-left: 3px solid transparent;
  font-weight: 500;
  transition: all 0.3s ease;
}

.mobile-nav-item:hover {
  border-left: 3px solid var(--color-teal);
  background-color: rgba(80, 197, 183, 0.2);
}

.mobile-nav-active {
  color: var(--color-dark-green);
  background: linear-gradient(to right, rgba(80, 197, 183, 0.3), rgba(222, 192, 241, 0.3));
  font-weight: 600;
  border-left: 3px solid var(--color-blue);
}

.dark .mobile-nav-item {
  color: white;
  background-color: rgba(80, 197, 183, 0.15);
}

.dark .mobile-nav-item:hover {
  background-color: rgba(80, 197, 183, 0.25);
  border-left: 3px solid var(--color-teal);
}

.dark .mobile-nav-active {
  color: white;
  background: linear-gradient(to right, rgba(80, 197, 183, 0.3), rgba(55, 65, 81, 0.3));
  border-left: 3px solid var(--color-teal);
}

.mobile-cta {
  background: linear-gradient(135deg, var(--color-teal) 0%, #3da89b 100%);
  color: var(--color-dark-green);
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(80, 197, 183, 0.3);
  transition: all 0.3s ease;
}

.mobile-cta:hover {
  box-shadow: 0 6px 20px rgba(80, 197, 183, 0.4);
  transform: scale(1.02);
}

.dark .mobile-cta {
  color: white;
}

.mobile-login {
  background: transparent;
  border: 2px solid var(--color-lavender);
  color: var(--color-dark-green);
  font-weight: 500;
  transition: all 0.3s ease;
}

.mobile-login:hover {
  background-color: rgba(222, 192, 241, 0.3);
  border-color: var(--color-teal);
  box-shadow: 0 4px 12px rgba(222, 192, 241, 0.3);
  transform: scale(1.02);
}

.dark .mobile-login {
  border-color: var(--color-teal);
  color: white;
}

.dark .mobile-login:hover {
  background-color: rgba(80, 197, 183, 0.2);
  border-color: var(--color-lavender);
  box-shadow: 0 4px 12px rgba(80, 197, 183, 0.3);
}

/* Hamburger icon */
.hamburger-line {
  position: absolute;
  display: block;
  height: 2px;
  width: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: var(--color-dark-green);
  border-radius: 2px;
}

.dark .hamburger-line {
  background-color: white;
}

.top-line {
  transform: translateY(-6px);
}

.middle-line {
  transform: translateY(0);
}

.bottom-line {
  transform: translateY(6px);
}

button:hover .top-line:not(.rotate-45) {
  transform: translateY(-7px);
}

button:hover .bottom-line:not(.-rotate-45) {
  transform: translateY(7px);
}
</style>