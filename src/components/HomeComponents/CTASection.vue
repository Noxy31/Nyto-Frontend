<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Sparkles, Smartphone, Play } from 'lucide-vue-next';

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
  icon: any;
  text: string;
  store: string;
}

// Optimized floating elements - reduced count for performance
const floatingElements = ref<FloatingElement[]>([]);

// Generate floating elements - optimized with better distribution
const generateFloatingElements = (): void => {
  const elements: FloatingElement[] = [];
  
  // Reduced count for better performance
  for (let i = 0; i < 4; i++) {
    elements.push({
      id: i,
      size: Math.random() * 30 + 20, // Smaller, more consistent sizes
      x: Math.random() * 80 + 10, // Avoid edges
      y: Math.random() * 80 + 10, // Avoid edges
      duration: Math.random() * 6 + 10, // More consistent animation speed
      delay: i * 0.5, // Sequential delays for better visual flow
      type: i % 2 === 0 ? 'circle' : 'square'
    });
  }
  
  floatingElements.value = elements;
};

// App store badges data with Lucide icons
const appStoreBadges = ref<AppBadge[]>([
  {
    name: 'App Store',
    icon: Smartphone,
    text: 'Download on the',
    store: 'App Store'
  },
  {
    name: 'Google Play',
    icon: Play,
    text: 'Get it on',
    store: 'Google Play'
  }
]);

// Simplified hover states - removed unused states
const buttonHover = ref<{
  primary: boolean;
  secondary: boolean;
}>({
  primary: false,
  secondary: false
});

// Cleanup timeout for performance
let animationCleanup: (() => void) | null = null;

// Lifecycle optimized
onMounted(() => {
  generateFloatingElements();
});

onUnmounted(() => {
  if (animationCleanup) {
    animationCleanup();
    animationCleanup = null;
  }
});

// Simplified hover handlers
const setButtonHover = (type: 'primary' | 'secondary', value: boolean): void => {
  buttonHover.value[type] = value;
};
</script>

<template>
  <section id="action" class="pb-0 pt-24 relative overflow-hidden cta-section">
    <!-- Optimized animated background elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="element in floatingElements" 
           :key="element.id"
           class="absolute opacity-8 animate-float floating-element"
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
        <!-- Limited time offer tag with icon -->
        <div class="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-600 transform offer-tag"
             :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
          <Sparkles class="w-4 h-4" />
          Limited Time Offer
        </div>
        
        <!-- Main heading -->
        <h2 class="text-4xl md:text-6xl font-extrabold mb-8 transition-all duration-600 transform cta-heading"
            :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
            style="transition-delay: 0.1s; line-height: 1.1;">
          Start Your <span class="gradient-text">Japanese Adventure</span>
        </h2>
        
        <!-- Description text -->
        <p class="text-xl md:text-2xl mb-12 transition-all duration-600 transform cta-description"
           :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
           style="transition-delay: 0.2s;">
          Get full access to all features for 3 days free, then decide if Nyto is right for you.
        </p>
        
        <!-- Action buttons -->
        <div class="flex flex-col sm:flex-row justify-center gap-4 transition-all duration-600 transform"
             :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
             style="transition-delay: 0.3s;">
          <!-- Primary CTA button -->
          <button class="primary-button"
                  :class="{ 'scale-105': buttonHover.primary }"
                  @mouseenter="setButtonHover('primary', true)"
                  @mouseleave="setButtonHover('primary', false)">
            Start Free Trial
          </button>
          
          <!-- Secondary CTA button -->
          <button class="secondary-button"
                  :class="{ 'scale-105': buttonHover.secondary }"
                  @mouseenter="setButtonHover('secondary', true)"
                  @mouseleave="setButtonHover('secondary', false)">
            See Pricing
          </button>
        </div>
        
        <!-- Disclaimer text -->
        <p class="mt-8 transition-all duration-600 transform cta-disclaimer"
           :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
           style="transition-delay: 0.4s;">
          No credit card required. Cancel anytime.
        </p>
      </div>
      
      <!-- App Store badges -->
      <div class="mt-16 mb-24 flex flex-col sm:flex-row justify-center items-center gap-4 transition-all duration-600 transform"
           :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
           style="transition-delay: 0.5s;">
        
        <div v-for="(badge, index) in appStoreBadges"
             :key="badge.name"
             class="app-store-badge relative cursor-not-allowed">
          <div class="flex items-center space-x-3">
            <div class="badge-icon-wrapper">
              <component :is="badge.icon" class="badge-icon" />
            </div>
            <div class="text-left">
              <div class="text-xs opacity-80">{{ badge.text }}</div>
              <div class="text-xl font-medium">{{ badge.store }}</div>
            </div>
          </div>
          <div class="coming-soon-overlay">
            <Sparkles class="w-5 h-5 mr-2" />
            Coming Soon
          </div>
        </div>
      </div>
    </div>
    
    <!-- Enhanced animated wave -->
    <div class="wave-container">
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none" class="wave">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#EFD9CE;stop-opacity:1" />
            <stop offset="25%" style="stop-color:#DEC0F1;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#50C5B7;stop-opacity:1" />
            <stop offset="75%" style="stop-color:#496DDB;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#EFD9CE;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="waveGradientDark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#1f2937;stop-opacity:1" />
            <stop offset="25%" style="stop-color:#374151;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#4b5563;stop-opacity:1" />
            <stop offset="75%" style="stop-color:#6b7280;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1f2937;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M0,96L40,112C80,128,160,160,240,160C320,160,400,128,480,122.7C560,117,640,139,720,133.3C800,128,880,96,960,90.7C1040,85,1120,107,1200,117.3C1280,128,1360,128,1400,128L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" 
              fill="url(#waveGradient)" 
              class="wave-path">
          <animate attributeName="fill" 
            values="url(#waveGradient);url(#waveGradient);url(#waveGradient)"
            dur="1s"
            repeatCount="1" />
          <animate attributeName="d" 
            values="M0,96L40,112C80,128,160,160,240,160C320,160,400,128,480,122.7C560,117,640,139,720,133.3C800,128,880,96,960,90.7C1040,85,1120,107,1200,117.3C1280,128,1360,128,1400,128L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z;
                   M0,128L40,122.7C80,117,160,107,240,101.3C320,96,400,96,480,112C560,128,640,160,720,170.7C800,181,880,171,960,149.3C1040,128,1120,96,1200,96C1280,96,1360,128,1400,144L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z;
                   M0,96L40,112C80,128,160,160,240,160C320,160,400,128,480,122.7C560,117,640,139,720,133.3C800,128,880,96,960,90.7C1040,85,1120,107,1200,117.3C1280,128,1360,128,1400,128L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            dur="8s"
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

/* Section background with dark mode support */
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

.dark .cta-section {
  background: linear-gradient(180deg, 
    #0f172a 0%,
    #1e293b 20%,
    #334155 40%,
    #475569 60%,
    #64748b 80%,
    #94a3b8 100%
  );
}

/* Optimized floating animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(180deg);
  }
}

.animate-float {
  animation: float ease-in-out infinite;
  will-change: transform;
  transform: translateZ(0);
}

.floating-element {
  background: linear-gradient(45deg, rgba(80, 197, 183, 0.2), rgba(222, 192, 241, 0.2));
  border-radius: 8px;
  filter: blur(0.5px);
}

.dark .floating-element {
  background: linear-gradient(45deg, rgba(56, 178, 172, 0.15), rgba(167, 139, 250, 0.15));
}

.floating-element.circle {
  border-radius: 50%;
}

/* Typography with dark mode support */
.cta-heading {
  color: white;
}

.dark .cta-heading {
  color: #f8fafc;
}

.cta-description {
  color: rgba(255, 255, 255, 0.9);
}

.dark .cta-description {
  color: rgba(248, 250, 252, 0.8);
}

.cta-disclaimer {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

.dark .cta-disclaimer {
  color: rgba(248, 250, 252, 0.6);
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

.dark .gradient-text {
  background: linear-gradient(135deg, #38b2ac 20%, #a78bfa 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Offer tag with dark mode support */
.offer-tag {
  background-color: rgba(80, 197, 183, 0.15);
  color: white;
  border: 1px solid rgba(80, 197, 183, 0.3);
  backdrop-filter: blur(10px);
}

.dark .offer-tag {
  background-color: rgba(56, 178, 172, 0.2);
  color: #f8fafc;
  border: 1px solid rgba(56, 178, 172, 0.4);
}

/* Buttons with dark mode support */
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
  will-change: transform;
}

.primary-button:hover {
  box-shadow: 0 8px 25px rgba(80, 197, 183, 0.4);
  filter: brightness(1.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.dark .primary-button {
  background: linear-gradient(135deg, #38b2ac 0%, #319795 100%);
  box-shadow: 0 4px 15px rgba(56, 178, 172, 0.3);
}

.dark .primary-button:hover {
  box-shadow: 0 8px 25px rgba(56, 178, 172, 0.4);
  border-color: rgba(248, 250, 252, 0.3);
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
  will-change: transform;
}

.secondary-button:hover {
  background-color: white;
  color: var(--color-dark-green);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
}

.dark .secondary-button {
  border: 2px solid #f8fafc;
  color: #f8fafc;
}

.dark .secondary-button:hover {
  background-color: #f8fafc;
  color: #0f172a;
  box-shadow: 0 8px 20px rgba(248, 250, 252, 0.3);
}

/* App Store badges with dark mode support */
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

.dark .app-store-badge {
  background-color: rgba(248, 250, 252, 0.08);
  border: 1px solid rgba(248, 250, 252, 0.15);
  color: #f8fafc;
}

.badge-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.dark .badge-icon-wrapper {
  background: rgba(248, 250, 252, 0.12);
}

.badge-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.dark .badge-icon {
  color: #f8fafc;
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

.dark .coming-soon-overlay {
  background: rgba(15, 23, 42, 0.95);
  color: #38b2ac;
}

.app-store-badge:hover .coming-soon-overlay {
  opacity: 1;
}

/* Wave animation with dark mode support */
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
  height: 100px;
  transform: translateZ(0);
}

.wave-path {
  fill: url(#waveGradient);
}

.dark .wave-path {
  fill: url(#waveGradientDark);
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

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .floating-element {
    animation: none;
  }
  
  .animate-float {
    animation-duration: 20s;
  }
  
  .wave path animate {
    animation-duration: 15s;
  }
}
</style>