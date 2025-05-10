/* Isolation container to prevent global CSS interference */
.features-container {
  transform: translateZ(0);
  will-change: transform;
}

.feature-list {
  position: relative;
  z-index: 1;
}<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Props
interface FeaturesSectionProps {
  isVisible: boolean;
}

const props = defineProps<FeaturesSectionProps>();

// Features interface
interface Feature {
  title: string;
  description: string;
  icon: string;
  active: boolean;
}

// Features data avec nouvelles descriptions
const features = ref<Feature[]>([
  { 
    title: "All Levels Courses",
    description: "Start from the basics with hiragana/katakana learning, progress through fundamental kanji, and advance through structured levels from N5 to N1 proficiency.",
    icon: "🎓",
    active: true
  },
  { 
    title: "Interactive Exercises",
    description: "Apply what you've learned through original games and activities that make Japanese learning fun and engaging.",
    icon: "🎯",
    active: false
  },
  { 
    title: "Mojidex Collection",
    description: "Store all learned characters and words in your personal dictionary with usage examples and comprehensive information, all associated to a unique Yokai illustration.",
    icon: "📖",
    active: false
  },
  { 
    title: "Progress Tracking",
    description: "Track your progression with rewards system, adaptive difficulty exercises, and smart features designed for real-world Japanese usage.",
    icon: "📊",
    active: false
  }
]);

// Carousel images placeholder
const carouselImages = ref<string[]>([
  '/images/learning-1.jpg',
  '/images/learning-2.jpg',
  '/images/learning-3.jpg',
  '/images/learning-4.jpg'
]);

const currentImageIndex = ref(0);

// Pause/Resume rotation on hover
const isPaused = ref(false);

// Activate feature by index
const activateFeature = (index: number): void => {
  features.value.forEach((f, i) => {
    f.active = i === index;
  });
  currentImageIndex.value = index;
};

// Pause rotation
const pauseRotation = () => {
  isPaused.value = true;
};

// Resume rotation
const resumeRotation = () => {
  isPaused.value = false;
};

// Rotate through features automatically
let featureInterval: number | undefined;

onMounted(() => {
  featureInterval = window.setInterval(() => {
    if (!isPaused.value) {
      const activeIndex = features.value.findIndex(f => f.active);
      const nextIndex = (activeIndex + 1) % features.value.length;
      activateFeature(nextIndex);
    }
  }, 5000);
});

onUnmounted(() => {
  if (featureInterval) {
    clearInterval(featureInterval);
  }
});
</script>

<template>
  <section id="features" class="relative features-bg overflow-hidden">
    <div class="container mx-auto px-6 md:px-12 py-24 relative z-10">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 transition-all duration-1000 transform"
          :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
          style="line-height: 1.3;">
        The <span class="gradient-text-nyto">Nyto</span> Experience
      </h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center features-container">
        <!-- Feature list -->
        <div class="space-y-6 feature-list">
          <div v-for="(feature, index) in features" 
               :key="index"
               @mouseenter="() => { activateFeature(index); pauseRotation(); }"
               @mouseleave="resumeRotation"
               class="p-6 rounded-2xl cursor-pointer feature-card"
               :class="feature.active ? 'active' : 'inactive'">
            <div class="flex items-start space-x-4 relative z-10">
              <div class="text-3xl feature-icon flex-shrink-0 w-12 h-12 flex items-center justify-center">
                {{ feature.icon }}
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold mb-2 feature-title">{{ feature.title }}</h3>
                <p class="feature-description text-sm leading-relaxed">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Carousel display -->
        <div class="rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-1000 carousel-container"
             :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
          <div class="aspect-w-16 aspect-h-9 carousel-display">
            <!-- Image placeholder -->
            <div class="w-full h-full flex items-center justify-center">
              <transition name="fade" mode="out-in">
                <div :key="currentImageIndex" class="text-center p-8">
                  <div class="text-6xl mb-4 drop-shadow-lg">{{ features[currentImageIndex].icon }}</div>
                  <p class="text-lg font-medium text-cream drop-shadow">
                    Learning Interface Preview
                  </p>
                  <p class="text-sm text-cream/80 mt-2">
                    Images coming soon
                  </p>
                </div>
              </transition>
            </div>
          </div>
          
          <div class="py-4 px-6 carousel-footer">
            <div class="flex justify-center items-center">
              <div class="flex space-x-2">
                <button v-for="(feature, index) in features" 
                        :key="index"
                        @click="activateFeature(index)"
                        class="w-3 h-3 rounded-full transition-all duration-300 feature-indicator"
                        :class="feature.active ? 'active' : ''"
                        :aria-label="`Go to feature ${index + 1}`">
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Color variables - New palette */
:root {
  --color-cream: #EFD9CE;
  --color-lavender: #DEC0F1;
  --color-teal: #50C5B7;
  --color-blue: #496DDB;
  --color-dark-green: #14342B;
}

/* Background with smooth gradient transition from hero */
.features-bg {
  background: linear-gradient(180deg, 
    #496DDB 0%,
    #3856B3 10%,
    #2B4595 30%,
    #1E3470 60%,
    #14342B 100%
  );
  position: relative;
  min-height: 100vh;
}

/* Feature card styling - ultra simplified */
.feature-card {
  border-radius: 1rem;
  border: 2px solid transparent;
  position: relative;
  transition: all 0.2s ease-out;
}

.feature-card.active {
  background-color: rgba(239, 217, 206, 0.95);
  border-color: var(--color-teal);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.feature-card.inactive {
  background-color: rgba(20, 52, 43, 0.6);
  border-color: rgba(80, 197, 183, 0.3);
}

.feature-card:hover {
  transform: translateX(5px);
  border-color: var(--color-lavender);
}

.feature-card.inactive:hover {
  background-color: rgba(20, 52, 43, 0.8);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* Gradient text for Nyto */
.gradient-text-nyto {
  background: linear-gradient(135deg, #50C5B7 20%, #DEC0F1 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  position: relative;
  text-shadow: none;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.8)) drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
  font-weight: 900;
  padding-bottom: 0.1em;
  margin: 0 2px;
}

h2 {
  color: var(--color-cream);
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

.feature-title {
  transition: color 0.2s ease;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

/* Title colors based on card state */
.feature-card.active .feature-title {
  color: var(--color-dark-green);
}

.feature-card.inactive .feature-title {
  color: #EFD9CE;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.feature-description {
  transition: all 0.2s ease;
}

.feature-card.active .feature-description {
  color: rgba(20, 52, 43, 0.9);
}

.feature-card.inactive .feature-description {
  color: #EFD9CE;
  opacity: 0.8;
}

/* Carousel styling - simplified */
.carousel-container {
  background: linear-gradient(135deg, rgba(73, 109, 219, 0.95) 0%, rgba(80, 197, 183, 0.95) 100%);
  box-shadow: 0 20px 40px rgba(80, 197, 183, 0.3);
  border: 3px solid var(--color-lavender);
  position: relative;
  overflow: hidden;
}

/* Simplified shimmer effect */
.carousel-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.8s ease;
}

.carousel-container:hover::before {
  left: 100%;
  transition: left 1.5s ease;
}

.carousel-display {
  background: linear-gradient(to br, rgba(20, 52, 43, 0.9), rgba(20, 52, 43, 0.95));
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-footer {
  background: linear-gradient(90deg, rgba(20, 52, 43, 0.98) 0%, rgba(73, 109, 219, 0.98) 100%);
  border-top: 2px solid var(--color-teal);
  padding: 1rem 1.5rem;
}

.feature-indicator {
  background-color: rgba(239, 217, 206, 0.4);
  border: 1px solid rgba(80, 197, 183, 0.5);
  width: 14px;
  height: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.feature-indicator.active {
  background-color: var(--color-teal);
  transform: scale(1.3);
  box-shadow: 0 0 10px var(--color-teal);
}

.feature-indicator:hover:not(.active) {
  background-color: var(--color-lavender);
  transform: scale(1.2);
  border-color: var(--color-lavender);
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Aspect ratios */
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .feature-card {
    padding: 1.25rem;
  }
  
  .feature-description {
    font-size: 0.9rem;
  }
}

/* Performance optimizations - simplified */
* {
  box-sizing: border-box;
}

/* Disable unnecessary animations during scroll */
@media (prefers-reduced-motion: no-preference) {
  .feature-card {
    transition: transform 0.2s ease-out, background-color 0.2s ease-out, border-color 0.2s ease-out, box-shadow 0.2s ease-out;
  }
}
</style>