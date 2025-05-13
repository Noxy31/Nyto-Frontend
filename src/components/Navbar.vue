<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Home, BookOpen, Users, Award, LogIn } from 'lucide-vue-next';

// Props
interface NavbarProps {
  scrollY: number;
}

const props = defineProps<NavbarProps>();

// Emits
const emit = defineEmits<{
  (e: 'navigate', section: string): void;
}>();

// States
const isMenuOpen = ref<boolean>(false);
const activeSection = ref<string>('home');
const showHeader = ref<boolean>(true);
const lastScrollPosition = ref<number>(0);
const isScrolled = ref<boolean>(false);

// Methods
const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
};

const setActiveSection = (section: string): void => {
  activeSection.value = section;
  isMenuOpen.value = false;
  emit('navigate', section);
};

// Watch scroll position to hide/show header
watch(() => props.scrollY, (newVal: number) => {
  isScrolled.value = newVal > 50;
  
  if (newVal > lastScrollPosition.value && newVal > 100) {
    showHeader.value = false;
  } else {
    showHeader.value = true;
  }
  lastScrollPosition.value = newVal;
}, { immediate: true });

// Navigation items
interface NavItem {
  id: string;
  label: string;
  icon: any;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'features', label: 'Features', icon: Award },
  { id: 'showcase', label: 'Learning', icon: BookOpen },
  { id: 'testimonials', label: 'Community', icon: Users }
];
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
          <div class="relative">
            <a href="#" class="flex items-center">
              <img src="@/assets/Logos/Logo1.png" alt="Nyto.ai Logo" class="h-14 md:h-16 transition-transform duration-300 hover:scale-105" />
            </a>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center">
          <div class="flex items-center space-x-1">
            <div v-for="item in navItems" :key="item.id" class="relative">
              <button
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
          </div>
          
          <div class="ml-6 pl-6 border-l nav-divider flex items-center space-x-3">
            <button class="px-5 py-2.5 rounded-md nav-cta-button transition-all duration-300 transform hover:-translate-y-1 text-sm">
              Start Learning
            </button>
            <button class="px-5 py-2.5 rounded-md nav-login-button transition-all duration-300 transform hover:-translate-y-1 text-sm flex items-center">
              <LogIn class="w-4 h-4 mr-2" />
              Log In
            </button>
          </div>
        </nav>
        
        <!-- Mobile Menu Button -->
        <button class="md:hidden flex items-center" @click="toggleMenu" aria-label="Toggle menu">
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
/* Base Colors - Les couleurs de la palette */
:root {
  --color-cream: #EFD9CE;      /* Crème rosé */
  --color-lavender: #DEC0F1;   /* Lavande */
  --color-teal: #50C5B7;       /* Vert d'eau */
  --color-blue: #496DDB;       /* Bleu vif */
  --color-dark-green: #14342B; /* Vert foncé */
}

/* Navbar styling - Fond transparent avec une teinte blanche */
header {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-scrolled {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Beautiful gradient border */
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

/* Navigation items - Polices améliorées et style plus moderne */
.nav-item {
  color: var(--color-dark-green);
  font-weight: 500;
  position: relative;
  letter-spacing: 0.3px;
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
  display: flex;
  align-items: center;
}

.nav-item:hover {
  color: var(--color-blue);
}

.nav-item-active {
  color: var(--color-blue);
  font-weight: 600;
}

.nav-item-bg {
  background-color: rgba(73, 109, 219, 0.1);
  border-radius: 9999px;
}

.nav-divider {
  border-color: rgba(80, 197, 183, 0.3);
  height: 36px;
}

/* Buttons - MÊME STYLE QUE HERO */
.nav-cta-button {
  background: linear-gradient(135deg, var(--color-teal) 0%, #3da89b 100%);
  color: var(--color-dark-green);
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(80, 197, 183, 0.3);
  letter-spacing: 0.5px;
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
}

.nav-cta-button:hover {
  box-shadow: 0 6px 20px rgba(80, 197, 183, 0.4);
  filter: brightness(1.05);
}

.nav-login-button {
  background: transparent;
  border: 2px solid var(--color-lavender);
  color: var(--color-dark-green);
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
  display: flex;
  align-items: center;
}

.nav-login-button:hover {
  background-color: rgba(222, 192, 241, 0.3);
  border-color: var(--color-teal);
  color: var(--color-dark-green);
  box-shadow: 0 4px 12px rgba(222, 192, 241, 0.3);
}

/* Mobile menu avec fond transparent */
.mobile-menu {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(80, 197, 183, 0.3);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.mobile-nav-item {
  color: var(--color-dark-green);
  background-color: rgba(80, 197, 183, 0.1);
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
  font-weight: 500;
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
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
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
}

.mobile-cta {
  background: linear-gradient(135deg, var(--color-teal) 0%, #3da89b 100%);
  color: var(--color-dark-green);
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(80, 197, 183, 0.3);
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
}

.mobile-cta:hover {
  box-shadow: 0 6px 20px rgba(80, 197, 183, 0.4);
  transform: scale(1.02);
}

.mobile-login {
  background: transparent;
  border: 2px solid var(--color-lavender);
  color: var(--color-dark-green);
  font-weight: 500;
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
}

.mobile-login:hover {
  background-color: rgba(222, 192, 241, 0.3);
  border-color: var(--color-teal);
  box-shadow: 0 4px 12px rgba(222, 192, 241, 0.3);
  transform: scale(1.02);
}

/* Hamburger icon - COULEUR FONCÉE */
.hamburger-line {
  position: absolute;
  display: block;
  height: 2px;
  width: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: var(--color-dark-green);
  border-radius: 2px;
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