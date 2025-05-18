<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue';

// Import components
import Navbar from '@/components/Navbar.vue';
import HeroSection from '@/components/HomeComponents/HeroSection.vue';
import FeaturesSection from '@/components/HomeComponents/FeaturesSection.vue';
import MojidexSection from '@/components/HomeComponents/MojidexSection.vue';
import CTASection from '@/components/HomeComponents/CTASection.vue';
import FooterSection from '@/components/Footer.vue';

// Minimal state
const scrollY = ref<number>(0);
const pageLoaded = ref<boolean>(false);
const showBackToTop = ref<boolean>(false);
const sectionVisibility = reactive<Record<string, boolean>>({
  hero: false,
  features: false,
  showcase: false,
  action: false
});

// Navigation
const handleNavigation = (section: string): void => {
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Optimized scroll handler
let ticking = false;
const handleScroll = (): void => {
  if (!ticking) {
    requestAnimationFrame(() => {
      scrollY.value = window.pageYOffset;
      showBackToTop.value = window.pageYOffset > 300;
      ticking = false;
    });
    ticking = true;
  }
};

// Scroll to top
const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Intersection Observer
let observer: IntersectionObserver | null = null;

onMounted(() => {
  // Immediate setup
  sectionVisibility.hero = true;
  pageLoaded.value = true;
  
  // Scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Intersection Observer for animations
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id in sectionVisibility) {
          sectionVisibility[entry.target.id] = true;
          observer?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  // Observe sections after DOM ready
  setTimeout(() => {
    ['features', 'showcase', 'action'].forEach(id => {
      const element = document.getElementById(id);
      if (element) observer?.observe(element);
    });
  }, 100);
});

// Cleanup
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  observer?.disconnect();
});
</script>

<template>
  <!-- Main content -->
  <div class="min-h-screen">
    <Navbar :scrollY="scrollY" @navigate="handleNavigation" />
    <HeroSection :isVisible="sectionVisibility.hero" id="hero" />
    <FeaturesSection :isVisible="sectionVisibility.features" id="features" />
    <MojidexSection :isVisible="sectionVisibility.showcase" id="showcase" />
    <CTASection :isVisible="sectionVisibility.action" id="action" />
    <FooterSection />
    
    <!-- Back to top -->
    <button 
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 w-12 h-12 bg-teal-500 text-dark-green rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-30">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </div>
</template>

<style>
/* MINIMAL styles pour scroll fluide */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

/* Seulement les éléments animés ont will-change */
.slide-up-fade {
  will-change: transform, opacity;
}

.element-visible {
  will-change: auto;
}
</style>