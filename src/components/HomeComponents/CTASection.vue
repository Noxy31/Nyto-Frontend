<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Props
interface CTASectionProps {
  isVisible: boolean;
}

const props = defineProps<CTASectionProps>();

// Floating element interface
interface FloatingElement {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  type: 'circle' | 'square';
}

// App badge interface
interface AppBadge {
  name: string;
  icon: string;
  text: string;
  store: string;
}

// Floating elements for background animation
const floatingElements = ref<FloatingElement[]>([]);

// Generate random floating elements for the background
const generateFloatingElements = (): void => {
  const elements: FloatingElement[] = [];
  
  for (let i = 0; i < 6; i++) {
    elements.push({
      id: i,
      size: Math.random() * 60 + 40,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 5,
      type: i % 2 === 0 ? 'circle' : 'square'
    });
  }
  
  floatingElements.value = elements;
};

// App store badges data - CORRECTED WITH ORIGINAL APPLE ICON
const appStoreBadges = ref<AppBadge[]>([
  {
    name: 'App Store',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.52 1.49-1.14 2.95-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>`,
    text: 'Download on the',
    store: 'App Store'
  },
  {
    name: 'Google Play',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z"/>
    </svg>`,
    text: 'Download on the',
    store: 'Google Play'
  }
]);

// Generate floating elements on mount
onMounted(() => {
  generateFloatingElements();
});

// Hover states for buttons
const primaryHover = ref<boolean>(false);
const secondaryHover = ref<boolean>(false);
const badgeHover = ref<number | null>(null);

const setPrimaryHover = (value: boolean): void => {
  primaryHover.value = value;
};

const setSecondaryHover = (value: boolean): void => {
  secondaryHover.value = value;
};

const setBadgeHover = (index: number | null): void => {
  badgeHover.value = index;
};
</script>

<template>
  <section id="action" class="pb-0 pt-24 relative overflow-hidden cta-section">
    <!-- Modern animated background elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="element in floatingElements" 
           :key="element.id"
           class="absolute opacity-10 animate-float floating-element"
           :class="element.type"
           :style="{
             width: `${element.size}px`,
             height: `${element.size}px`,
             top: `${element.y}%`,
             left: `${element.x}%`,
             animationDuration: `${element.duration}s`,
             animationDelay: `${element.delay}s`
           }">
      </div>
    </div>
  
    <div class="container mx-auto px-6 md:px-12 relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Limited time offer tag -->
        <div class="inline-block mb-6 px-6 py-2 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-1000 transform offer-tag"
             :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
          Limited Time Offer
        </div>
        
        <!-- Main heading -->
        <h2 class="text-4xl md:text-6xl font-extrabold mb-8 transition-all duration-1000 transform text-white"
            :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
            style="transition-delay: 0.1s; line-height: 1.1;">
          Start Your <span class="gradient-text">Japanese Adventure</span>
        </h2>
        
        <!-- Description text -->
        <p class="text-xl md:text-2xl mb-12 transition-all duration-1000 transform text-white opacity-90"
           :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
           style="transition-delay: 0.2s;">
          Get full access to all features for 3 days free, then decide if Nyto is right for you.
        </p>
        
        <!-- Action buttons -->
        <div class="flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 transform"
             :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
             style="transition-delay: 0.3s;">
          <!-- Primary CTA button -->
          <button class="primary-button"
                  :class="{ 'scale-105': primaryHover }"
                  @mouseenter="setPrimaryHover(true)"
                  @mouseleave="setPrimaryHover(false)">
            Start Free Trial
          </button>
          
          <!-- Secondary CTA button -->
          <button class="secondary-button"
                  :class="{ 'scale-105': secondaryHover }"
                  @mouseenter="setSecondaryHover(true)"
                  @mouseleave="setSecondaryHover(false)">
            See Pricing
          </button>
        </div>
        
        <!-- Disclaimer text -->
        <p class="mt-8 transition-all duration-1000 transform text-white opacity-70 text-sm"
           :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
           style="transition-delay: 0.4s;">
          No credit card required. Cancel anytime.
        </p>
      </div>
      
      <!-- App Store badges - Coming Soon -->
      <div class="mt-16 mb-24 flex flex-col sm:flex-row justify-center items-center gap-4 transition-all duration-1000 transform"
           :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
           style="transition-delay: 0.5s;">
        
        <div v-for="(badge, index) in appStoreBadges"
             :key="badge.name"
             class="app-store-badge relative"
             :class="{ 'scale-105': badgeHover === index }"
             @mouseenter="setBadgeHover(index)"
             @mouseleave="setBadgeHover(null)">
          <div class="flex items-center space-x-2">
            <div class="text-3xl" v-html="badge.icon"></div>
            <div class="text-left">
              <div class="text-xs">{{ badge.text }}</div>
              <div class="text-xl font-medium">{{ badge.store }}</div>
            </div>
          </div>
          <div class="coming-soon-overlay">
            Coming Soon
          </div>
        </div>
      </div>
    </div>
    
    <!-- Animated wave at the bottom -->
    <div class="wave-container">
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none" class="wave">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#EFD9CE;stop-opacity:1" />
            <stop offset="33%" style="stop-color:#DEC0F1;stop-opacity:1" />
            <stop offset="66%" style="stop-color:#50C5B7;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#EFD9CE;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M0,96L40,112C80,128,160,160,240,160C320,160,400,128,480,122.7C560,117,640,139,720,133.3C800,128,880,96,960,90.7C1040,85,1120,107,1200,117.3C1280,128,1360,128,1400,128L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" 
              fill="url(#waveGradient)" 
              class="wave-path">
          <animate attributeName="d" 
            values="M0,96L40,112C80,128,160,160,240,160C320,160,400,128,480,122.7C560,117,640,139,720,133.3C800,128,880,96,960,90.7C1040,85,1120,107,1200,117.3C1280,128,1360,128,1400,128L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z;
                   M0,128L40,122.7C80,117,160,107,240,101.3C320,96,400,96,480,112C560,128,640,160,720,170.7C800,181,880,171,960,149.3C1040,128,1120,96,1200,96C1280,96,1360,128,1400,144L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z;
                   M0,96L40,112C80,128,160,160,240,160C320,160,400,128,480,122.7C560,117,640,139,720,133.3C800,128,880,96,960,90.7C1040,85,1120,107,1200,117.3C1280,128,1360,128,1400,128L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            dur="10s"
            repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  </section>
</template>

<style scoped>
/* Color variables */
:root {
  --color-cream: #EFD9CE;
  --color-lavender: #DEC0F1;
  --color-teal: #50C5B7;
  --color-blue: #496DDB;
  --color-dark-green: #14342B;
}

/* Dark background */
.cta-section {
  background: linear-gradient(180deg, 
    #14342B 0%,
    #1a3d35 20%,
    #1f4640 40%,
    #254f4b 60%,
    #2a5956 80%,
    #306261 100%
  );
  position: relative;
}

/* Modern floating animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.animate-float {
  animation: float ease-in-out infinite;
}

.floating-element {
  background: linear-gradient(45deg, rgba(80, 197, 183, 0.3), rgba(222, 192, 241, 0.3));
  border-radius: 10px;
  filter: blur(1px);
}

.floating-element.circle {
  border-radius: 50%;
}

/* Typography */
.text-white {
  color: white;
}

.gradient-text {
  background: linear-gradient(135deg, #50C5B7 20%, #DEC0F1 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  position: relative;
  font-weight: 900;
}

/* Offer tag */
.offer-tag {
  background-color: rgba(80, 197, 183, 0.15);
  color: var(--color-teal);
  border: 1px solid rgba(80, 197, 183, 0.3);
}

/* Buttons */
.primary-button {
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  background: linear-gradient(135deg, var(--color-teal) 0%, #3da89b 100%);
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(80, 197, 183, 0.3);
  border: 2px solid transparent;
}

.primary-button:hover {
  box-shadow: 0 8px 25px rgba(80, 197, 183, 0.4);
  filter: brightness(1.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.secondary-button {
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  border: 2px solid white;
  color: white;
  background-color: transparent;
  transition: all 0.3s ease;
}

.secondary-button:hover {
  background-color: white;
  color: var(--color-dark-green);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
}

/* App Store badges */
.app-store-badge {
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
  cursor: not-allowed;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  position: relative;
  overflow: hidden;
  opacity: 0.6;
}

.app-store-badge svg {
  width: 24px;
  height: 24px;
}

.coming-soon-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(20, 52, 43, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-teal);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.app-store-badge:hover .coming-soon-overlay {
  opacity: 1;
}

/* Wave animation - FIXED */
.wave-container {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  margin-top: 0;
}

.wave {
  position: relative;
  width: 100%;
  height: 120px;
  transform: translateZ(0);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-4xl {
    font-size: 2.5rem;
  }
  
  .primary-button,
  .secondary-button {
    width: 100%;
    padding: 1rem 2rem;
  }
  
  .app-store-badge {
    width: 100%;
    max-width: 250px;
  }
  
  .wave {
    height: 80px;
  }
}

/* Performance optimizations */
.floating-element {
  will-change: transform;
  transform: translateZ(0);
}

@media (prefers-reduced-motion: reduce) {
  .floating-element {
    animation: none;
  }
  
  .animate-float {
    animation-duration: 30s;
  }
}
</style>