<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Props
interface CTASectionProps {
  isVisible: boolean;
}

const props = defineProps<CTASectionProps>();

// Bubble interface
interface Bubble {
  id: number;
  size: number;
  x: number;
  y: number;
  color: string;
  duration: number;
  delay: number;
}

// App badge interface
interface AppBadge {
  name: string;
  icon: string;
  text: string;
  store: string;
}

// Bubble animation data
const bubbles = ref<Bubble[]>([]);

// Generate random bubbles for the background
const generateBubbles = (): void => {
  const newBubbles: Bubble[] = [];
  
  for (let i = 0; i < 5; i++) {
    newBubbles.push({
      id: i,
      size: Math.random() * 100 + 50,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: i % 2 === 0 ? '#CFD2B2' : '#9C9990',
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    });
  }
  
  bubbles.value = newBubbles;
};

// App store badges data
const appStoreBadges = ref<AppBadge[]>([
  {
    name: 'App Store',
    icon: `<path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.52 1.49-1.14 2.95-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>`,
    text: 'Download on the',
    store: 'App Store'
  },
  {
    name: 'Google Play',
    icon: `<path d="M3.609 1.814L13.792 12 3.609 22.186c-.181.181-.29.423-.29.683v.12c0 .26.109.522.29.683.181.181.423.29.683.29h.12c.26 0 .522-.109.683-.29L15.589 13.12c.181-.181.29-.423.29-.683v-.12c0-.26-.109-.522-.29-.683L5.095 1.14c-.181-.181-.423-.29-.683-.29h-.12c-.26 0-.522.109-.683.29z"/>`,
    text: 'GET IT ON',
    store: 'Google Play'
  }
]);

// Generate bubbles on mount
onMounted(() => {
  generateBubbles();
  
  // Regenerate bubbles every 15 seconds for variety
  const bubbleInterval = window.setInterval(generateBubbles, 15000);
  
  onUnmounted(() => {
    clearInterval(bubbleInterval);
  });
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
  <section id="action" class="py-24 relative overflow-hidden cta-gradient">
    <!-- Decorative animated bubbles -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div v-for="bubble in bubbles" 
           :key="bubble.id"
           class="absolute rounded-full opacity-30 animate-float bubble"
           :style="{
             width: `${bubble.size}px`,
             height: `${bubble.size}px`,
             backgroundColor: bubble.color,
             top: `${bubble.y}%`,
             left: `${bubble.x}%`,
             animationDuration: `${bubble.duration}s`,
             animationDelay: `${bubble.delay}s`
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
        <h2 class="text-4xl md:text-6xl font-bold mb-8 transition-all duration-1000 transform cta-heading"
            :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
            style="transition-delay: 0.1s;">
          Begin Your Japanese Journey Today
        </h2>
        
        <!-- Description text -->
        <p class="text-xl md:text-2xl mb-12 transition-all duration-1000 transform cta-description"
           :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
           style="transition-delay: 0.2s;">
          Get full access to all features for 7 days free, then decide if Nyto.ai is right for you.
        </p>
        
        <!-- Action buttons -->
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-1000 transform"
             :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
             style="transition-delay: 0.3s;">
          <!-- Primary CTA button -->
          <button class="cta-primary-button px-10 py-5 rounded-full font-medium text-xl transition-all transform"
                  :class="{ 'scale-105 shadow-xl': primaryHover }"
                  @mouseenter="setPrimaryHover(true)"
                  @mouseleave="setPrimaryHover(false)">
            Start Free Trial
          </button>
          
          <!-- Secondary CTA button -->
          <button class="cta-secondary-button px-10 py-5 rounded-full font-medium text-xl transition-all border-2 transform"
                  :class="{ 'scale-105': secondaryHover }"
                  @mouseenter="setSecondaryHover(true)"
                  @mouseleave="setSecondaryHover(false)">
            See Pricing
          </button>
        </div>
        
        <!-- Disclaimer text -->
        <p class="cta-disclaimer mt-8 transition-all duration-1000 transform"
           :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
           style="transition-delay: 0.4s;">
          No credit card required. Cancel anytime.
        </p>
      </div>
      
      <!-- App Store badges -->
      <div class="mt-16 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-1000 transform"
           :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
           style="transition-delay: 0.5s;">
        
        <button v-for="(badge, index) in appStoreBadges"
                :key="badge.name"
                class="app-store-badge bg-black rounded-xl px-6 py-3 flex items-center space-x-2 transition-all transform"
                :class="{ 'scale-105': badgeHover === index }"
                @mouseenter="setBadgeHover(index)"
                @mouseleave="setBadgeHover(null)">
          <div class="text-3xl app-badge-icon" style="color: white;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" v-html="badge.icon"></svg>
          </div>
          <div class="text-left">
            <div class="text-xs app-badge-text" style="color: white;">{{ badge.text }}</div>
            <div class="text-xl font-medium app-badge-store" style="color: white;">{{ badge.store }}</div>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Color variables */
:root {
  --color-primary: #4B3B47;
  --color-secondary: #6A6262;
  --color-accent: #9C9990;
  --color-light: #CFD2B2;
  --color-bg: #E0D8DE;
}

.cta-gradient {
  background: linear-gradient(135deg, #4B3B47 0%, #6A6262 100%);
}

/* Bubble animation */
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
  animation: float ease-in-out infinite;
}

.bubble {
  filter: blur(2px);
}

/* CTA elements styling */
.offer-tag {
  background-color: rgba(207, 210, 178, 0.2); 
  color: #CFD2B2;
}

.cta-heading {
  color: #CFD2B2;
}

.cta-description {
  color: #9C9990;
}

.cta-disclaimer {
  color: #9C9990;
}

.cta-primary-button {
  background-color: #CFD2B2;
  color: #4B3B47;
  box-shadow: 0 4px 15px rgba(207, 210, 178, 0.3);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.cta-primary-button:hover {
  box-shadow: 0 6px 20px rgba(207, 210, 178, 0.4);
}

.cta-secondary-button {
  border-color: #9C9990;
  color: #E0D8DE;
  transition: all 0.3s ease;
}

.cta-secondary-button:hover {
  border-color: #CFD2B2;
  color: #CFD2B2;
}

.app-store-badge {
  transition: all 0.3s ease;
}

.app-store-badge:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}
</style>