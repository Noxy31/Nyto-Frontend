<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

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
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'showcase', label: 'Learning' },
  { id: 'testimonials', label: 'Community' }
];

// Add gradient animation effect on mount
onMounted(() => {
  // Add any additional initialization if needed
});
</script>

<template>
  <header 
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
    :class="[
      {'transform -translate-y-full': !showHeader}, 
      {'nav-scrolled': isScrolled}
    ]">
    <!-- Logo & Navigation -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="relative group">
            <a href="#" class="flex items-center space-x-1">
              <div class="text-2xl md:text-3xl font-bold transition-colors duration-300 logo-text">
                <span class="relative">
                  N<span class="absolute -top-1 -right-1 text-xs logo-accent">日</span>
                </span>yto<span class="logo-dot">.</span>ai
              </div>
            </a>
            <div class="absolute -bottom-1 left-0 w-0 h-0.5 logo-underline transition-all duration-300 group-hover:w-full"></div>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-1">
          <div class="flex items-center space-x-1">
            <div v-for="item in navItems" :key="item.id" class="relative">
              <button
                @click="setActiveSection(item.id)"
                class="px-4 py-2 rounded-full nav-item transition-all duration-300 relative overflow-hidden group"
                :class="activeSection === item.id ? 'nav-item-active' : ''">
                <span class="relative z-10">{{ item.label }}</span>
                <span class="absolute inset-0 nav-item-bg transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                      :class="{'scale-x-100': activeSection === item.id}"></span>
              </button>
            </div>
          </div>
          
          <div class="ml-4 pl-4 border-l nav-divider">
            <button class="px-6 py-2 rounded-full nav-cta-button transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Start Learning
            </button>
          </div>
        </nav>
        
        <!-- Mobile Menu Button -->
        <button class="md:hidden flex items-center" @click="toggleMenu" aria-label="Toggle menu">
          <div class="w-6 h-6 flex items-center justify-center relative">
            <span class="hamburger-line top-line"></span>
            <span class="hamburger-line middle-line"></span>
            <span class="hamburger-line bottom-line"></span>
          </div>
        </button>
      </div>
    </div>
    
    <!-- Mobile Navigation -->
    <div 
      class="md:hidden transition-all duration-300 overflow-hidden mobile-menu"
      :class="isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'">
      <div class="px-4 sm:px-6 space-y-2">
        <button 
          v-for="item in navItems" 
          :key="item.id"
          @click="setActiveSection(item.id)"
          class="block w-full text-left py-3 px-4 rounded-lg transition-all duration-200"
          :class="activeSection === item.id ? 'mobile-nav-active' : 'mobile-nav-item'">
          {{ item.label }}
        </button>
        
        <button class="w-full mt-4 px-6 py-3 rounded-full mobile-cta transition-all duration-300">
          Start Learning
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Base Colors from palette */
:root {
  --color-primary: #4B3B47;
  --color-secondary: #6A6262;
  --color-accent: #9C9990;
  --color-light: #CFD2B2;
  --color-bg: #E0D8DE;
}

/* Navbar styling */
header {
  background-color: rgba(75, 59, 71, 0.1);
  backdrop-filter: blur(8px);
  transition: all 0.4s ease;
}

.nav-scrolled {
  background-color: rgba(75, 59, 71, 0.95);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

/* Logo styling */
.logo-text {
  color: #CFD2B2;
  letter-spacing: -0.5px;
}

.logo-dot {
  color: #9C9990;
}

.logo-accent {
  color: #9C9990;
}

.logo-underline {
  background-color: #CFD2B2;
}

/* Navigation items */
.nav-item {
  color: rgba(207, 210, 178, 0.85);
  font-weight: 500;
}

.nav-item:hover {
  color: #CFD2B2;
}

.nav-item-active {
  color: #CFD2B2;
  font-weight: 600;
}

.nav-item-bg {
  background-color: rgba(207, 210, 178, 0.1);
}

.nav-divider {
  border-color: rgba(207, 210, 178, 0.2);
}

.nav-cta-button {
  background-color: #CFD2B2;
  color: #4B3B47;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(207, 210, 178, 0.3);
}

.nav-cta-button:hover {
  background-color: #d8dbc0;
  box-shadow: 0 4px 15px rgba(207, 210, 178, 0.4);
}

/* Mobile menu */
.mobile-menu {
  background-color: rgba(75, 59, 71, 0.98);
  border-top: 1px solid rgba(207, 210, 178, 0.1);
}

.mobile-nav-item {
  color: rgba(207, 210, 178, 0.8);
  background-color: rgba(207, 210, 178, 0.05);
}

.mobile-nav-active {
  color: #4B3B47;
  background-color: #CFD2B2;
  font-weight: 600;
}

.mobile-cta {
  background-color: #CFD2B2;
  color: #4B3B47;
  font-weight: 600;
}

/* Hamburger icon */
.hamburger-line {
  @apply absolute block h-0.5 w-5 transition-all duration-300;
  background-color: #CFD2B2;
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

button:hover .top-line {
  transform: translateY(-7px);
}

button:hover .bottom-line {
  transform: translateY(7px);
}

/* When menu is open */
.hamburger-line {
  transition: all 0.3s;
}

button:focus .top-line,
.isMenuOpen .top-line {
  transform: translateY(0) rotate(45deg);
}

button:focus .middle-line,
.isMenuOpen .middle-line {
  opacity: 0;
}

button:focus .bottom-line,
.isMenuOpen .bottom-line {
  transform: translateY(0) rotate(-45deg);
}
</style>