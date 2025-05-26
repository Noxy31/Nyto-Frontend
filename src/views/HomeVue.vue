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
   
    <!-- Back to top button -->
    <button
      v-show="showBackToTop"
      @click="scrollToTop"
      class="back-to-top-btn">
      <svg viewBox="0 0 384 512" class="svgIcon">
        <path
          d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
        ></path>
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

/* Styles pour le bouton Back to Top */
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
  transition-duration: 0.3s;
  overflow: hidden;
}

.back-to-top-btn .svgIcon {
  width: 12px;
  transition-duration: 0.3s;
}

.back-to-top-btn .svgIcon path {
  fill: #7a18e5;
}

.back-to-top-btn:hover {
  width: 140px;
  border-radius: 50px;
  transition-duration: 0.3s;
  background-color: #7a18e5;
  align-items: center;
}

.back-to-top-btn:hover .svgIcon {
  transition-duration: 0.3s;
  transform: translateY(-200%);
}

.back-to-top-btn::before {
  position: absolute;
  bottom: -20px;
  content: "Back to Top";
  color: #7a18e5;
  font-size: 0px;
}

.back-to-top-btn:hover::before {
  font-size: 13px;
  opacity: 1;
  bottom: unset;
  transition-duration: 0.3s;
}
</style>