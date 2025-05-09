<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue';

// Import all section components
import Navbar from '@/components/Navbar.vue';
import HeroSection from '@/components/HomeComponents/HeroSection.vue';
import FeaturesSection from '@/components/HomeComponents/FeaturesSection.vue';
import LearningShowcase from '@/components/HomeComponents/LearningShowcaseSection.vue';
import TestimonialsSection from '@/components/HomeComponents/TestimonialsSection.vue';
import CTASection from '@/components/HomeComponents/CTASection.vue';
import FooterSection from '@/components/Footer.vue';

// Parallax element interface
interface ParallaxElement {
  id: number;
  depth: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
  color: string;
  opacity: number;
}

// Scroll animation state
const scrollY = ref<number>(0);

// Interactive loading states
const pageLoaded = ref<boolean>(false);
const sectionVisibility = reactive<Record<string, boolean>>({
  hero: false,
  features: false,
  showcase: false,
  testimonials: false,
  action: false
});

// Mouse follower effect state
const mousePosition = reactive({ x: 0, y: 0 });

// Parallax effect data
const parallaxElements = reactive<ParallaxElement[]>([
  { id: 1, depth: 0.05, x: 20, y: 15, rotation: 10, size: 80, color: '#CFD2B2', opacity: 0.4 },
  { id: 2, depth: 0.08, x: 70, y: 60, rotation: -5, size: 60, color: '#9C9990', opacity: 0.3 },
  { id: 3, depth: 0.12, x: 85, y: 30, rotation: 15, size: 40, color: '#6A6262', opacity: 0.2 },
  { id: 4, depth: 0.15, x: 10, y: 70, rotation: -20, size: 70, color: '#4B3B47', opacity: 0.15 }
]);

// Navigation
const handleNavigation = (section: string): void => {
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Computed styles for parallax effect
const getParallaxStyle = (element: ParallaxElement): Record<string, string> => {
  const xOffset = (mousePosition.x / window.innerWidth - 0.5) * element.depth * 100;
  const yOffset = (mousePosition.y / window.innerHeight - 0.5) * element.depth * 100;
  
  return {
    transform: `translate(${xOffset}px, ${yOffset}px) rotate(${element.rotation}deg)`,
    width: `${element.size}px`,
    height: `${element.size}px`,
    backgroundColor: element.color,
    opacity: element.opacity.toString(),
    position: 'absolute',
    borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
    top: `${element.y}%`,
    left: `${element.x}%`,
    transition: 'transform 0.2s ease-out'
  };
};

  // Mouse movement handler
const handleMouseMove = (event: MouseEvent): void => {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
};

// Scroll handler for animations
const handleScroll = (): void => {
  scrollY.value = window.scrollY;
  
  // Check which sections are in viewport
  const sections = document.querySelectorAll('.section-animate');
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const inView = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
    const id = section.id;
    if (inView && id) {
      sectionVisibility[id] = true;
    }
  });
};

// Scroll to top function
const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Initialize animations and event listeners
onMounted(() => {
  // Simulate page loading
  setTimeout(() => {
    pageLoaded.value = true;
    sectionVisibility.hero = true;
  }, 500);
  
  // Add event listeners
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('scroll', handleScroll);
});

// Cleanup on unmount
onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <!-- Loading overlay -->
  <div class="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-1000" 
       :class="pageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'"
       style="background-color: #4B3B47;">
    <div class="text-6xl font-bold" style="color: #CFD2B2;">
      Nyto<span style="color: #9C9990;">.ai</span>
    </div>
  </div>

  <!-- Main content -->
  <div class="min-h-screen overflow-hidden relative" @mousemove="handleMouseMove">
    <!-- Floating shapes for background effect -->
    <div v-for="element in parallaxElements" :key="element.id" 
         :style="getParallaxStyle(element)"
         class="hidden md:block"></div>
    
    <!-- Navbar Component -->
    <Navbar :scrollY="scrollY" @navigate="handleNavigation" />

    <!-- Hero Section Component -->
    <HeroSection :isVisible="sectionVisibility.hero" class="section-animate" id="hero" />
    
    <!-- Features Section Component -->
    <FeaturesSection :isVisible="sectionVisibility.features" class="section-animate" id="features" />
    
    <!-- Learning Showcase Component -->
    <LearningShowcase :isVisible="sectionVisibility.showcase" class="section-animate" id="showcase" />
    
    <!-- Testimonials Section Component -->
    <TestimonialsSection :isVisible="sectionVisibility.testimonials" class="section-animate" id="testimonials" />
    
    <!-- CTA Section Component -->
    <CTASection :isVisible="sectionVisibility.action" class="section-animate" id="action" />
    
    <!-- Footer Section Component -->
    <FooterSection />
    
    <!-- Back to top button -->
    <button class="fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transform transition-all hover:scale-110 z-30 hoverable"
            :class="scrollY > 300 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
            style="background-color: #4B3B47; color: #CFD2B2;"
            @click="scrollToTop">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
    
    <!-- Custom cursor effect removed -->
  </div>
</template>

<style>
/* Global styles */
:root {
  --color-primary: #4B3B47;
  --color-secondary: #6A6262;
  --color-accent: #9C9990;
  --color-light: #CFD2B2;
  --color-bg: #E0D8DE;
}

body {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
    'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Animation keyframes */
@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
}

.animate-float {
  animation: float 10s ease-in-out infinite;
}

/* Back to top button styling */
button {
  transition: all 0.3s ease;
}

/* Custom cursor effect */
.custom-cursor {
  pointer-events: none;
  mix-blend-mode: difference;
}

/* Aspect ratios utility classes - shared across components */
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
}

.aspect-w-16 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.aspect-w-3 {
  position: relative;
  padding-bottom: 66.67%;
}

.aspect-w-3 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* Optional: Add some global transitions for smoother page experience */
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.5s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
}

/* Optional: Some responsive adjustments */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 2rem;
  }
}
</style>