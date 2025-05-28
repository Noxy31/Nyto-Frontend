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

// Optimized scroll handler with throttling
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

// Optimized Intersection Observer with reduced threshold
let observer: IntersectionObserver | null = null;
onMounted(() => {
  // Immediate setup
  sectionVisibility.hero = true;
  pageLoaded.value = true;
 
  // Passive scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });
 
  // Intersection Observer with reduced threshold for better performance
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id in sectionVisibility) {
          sectionVisibility[entry.target.id] = true;
          // Unobserve after triggering to reduce ongoing calculations
          observer?.unobserve(entry.target);
        }
      });
    },
    { 
      threshold: 0.1, // Reduced from 0.2
      rootMargin: '50px' // Added root margin for earlier triggering
    }
  );
  
  // Delayed observation setup to avoid initial layout thrash
  setTimeout(() => {
    ['features', 'showcase', 'action'].forEach(id => {
      const element = document.getElementById(id);
      if (element) observer?.observe(element);
    });
  }, 200); // Increased delay
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
   
    <!-- Back to top button -->
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

/* OPTIMISATION PERFORMANCE - will-change uniquement quand nécessaire */
.slide-up-fade {
  transform: translateY(30px);
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.element-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Optimized back to top button - removed will-change auto-assignment */
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
  /* Performance: Only use will-change during interactions */
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

/* GPU acceleration for smooth animations */
.back-to-top-btn {
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>