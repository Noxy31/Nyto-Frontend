.feature-card.inactive:hover .feature-icon-container {
  background: rgba(239, 217, 206, 0.9); /* Plus opaque au survol */
}

.feature-card.inactive:hover .feature-icon {
  color: var(--color-dark-green); /* Icône devient noire au survol */
}<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { GraduationCap, Target, BookOpen, TrendingUp } from 'lucide-vue-next';

// Props
interface FeaturesSectionProps {
  isVisible: boolean;
}

const props = defineProps<FeaturesSectionProps>();

// Features interface
interface Feature {
  title: string;
  description: string;
  icon: any;
  active: boolean;
}

// Features data optimized
const features = ref<Feature[]>([
  { 
    title: "All Levels Courses",
    description: "Start from the basics with hiragana/katakana learning, progress through fundamental kanji, and advance through structured levels from N5 to N1 proficiency.",
    icon: GraduationCap,
    active: true
  },
  { 
    title: "Interactive Exercises",
    description: "Apply what you've learned through original games and activities that make Japanese learning fun and engaging.",
    icon: Target,
    active: false
  },
  { 
    title: "Mojidex Collection",
    description: "Store all learned characters and words in your personal dictionary with usage examples and comprehensive information, all associated to a unique Yokai illustration.",
    icon: BookOpen,
    active: false
  },
  { 
    title: "Progress Tracking",
    description: "Track your progression with rewards system, adaptive difficulty exercises, and smart features designed for real-world Japanese usage.",
    icon: TrendingUp,
    active: false
  }
]);

const currentImageIndex = ref(0);
const isPaused = ref(false);

// Activate feature by index
const activateFeature = (index: number): void => {
  features.value.forEach((f, i) => {
    f.active = i === index;
  });
  currentImageIndex.value = index;
};

// Pause/Resume rotation
const pauseRotation = () => {
  isPaused.value = true;
};

const resumeRotation = () => {
  isPaused.value = false;
};

// Optimized rotation - longer intervals
let featureInterval: number | undefined;

onMounted(() => {
  featureInterval = window.setInterval(() => {
    if (!isPaused.value) {
      const activeIndex = features.value.findIndex(f => f.active);
      const nextIndex = (activeIndex + 1) % features.value.length;
      activateFeature(nextIndex);
    }
  }, 6000); // Increased from 5s to 6s
});

onUnmounted(() => {
  if (featureInterval) {
    clearInterval(featureInterval);
  }
});
</script>

<template>
  <section id="features" class="relative features-bg overflow-hidden">
    <div class="container mx-auto px-6 md:px-12 py-16 relative z-10">
      <!-- Header section -->
      <div class="text-center mb-16 transition-all duration-800 transform"
           :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
        <h2 class="text-4xl md:text-6xl font-extrabold mb-6" style="line-height: 1.2; color: white;">
          <span>The </span>
          <span class="gradient-text-nyto inline-block">Nyto</span>
          <span class="block">Experience</span>
        </h2>
      </div>
      
      <!-- Main content grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Feature list -->
        <div class="space-y-6">
          <div v-for="(feature, index) in features" 
               :key="index"
               @mouseenter="() => { activateFeature(index); pauseRotation(); }"
               @mouseleave="resumeRotation"
               class="p-6 rounded-2xl cursor-pointer feature-card"
               :class="feature.active ? 'active' : 'inactive'">
            <div class="flex items-start space-x-4 relative z-10">
              <!-- Icon container -->
              <div class="feature-icon-container flex-shrink-0">
                <component :is="feature.icon" class="feature-icon" />
              </div>
              <!-- Content -->
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
        <div class="rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-800 carousel-container"
             :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
          <!-- Main display area -->
          <div class="carousel-display">
            <div class="w-full h-full flex items-center justify-center">
              <transition name="fade" mode="out-in">
                <div :key="currentImageIndex" class="text-center p-8">
                  <!-- Large icon -->
                  <div class="feature-icon-large mb-6">
                    <component :is="features[currentImageIndex].icon" class="icon-large" />
                  </div>
                  <!-- Feature info -->
                  <h3 class="text-xl font-bold text-cream mb-2">
                    {{ features[currentImageIndex].title }}
                  </h3>
                  <p class="text-sm text-cream/80">
                    Interface preview coming soon
                  </p>
                </div>
              </transition>
            </div>
          </div>
          
          <!-- Footer with indicators -->
          <div class="py-4 px-6 carousel-footer">
            <div class="flex justify-center items-center">
              <div class="flex space-x-3">
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
/* Color variables */
:root {
  --color-cream: #EFD9CE;
  --color-lavender: #DEC0F1;
  --color-teal: #50C5B7;
  --color-blue: #496DDB;
  --color-dark-green: #14342B;
}

/* Background */
.features-bg {
  background: linear-gradient(180deg, 
    #496DDB 0%,
    #3856B3 15%,
    #2B4595 35%,
    #1E3470 65%,
    #14342B 100%
  );
  position: relative;
  min-height: 100vh;
}

/* Text colors */
.text-cream {
  color: var(--color-cream);
}

/* Feature card styling */
.feature-card {
  border-radius: 1rem;
  border: 2px solid transparent;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.feature-card.active {
  background: rgba(239, 217, 206, 0.95);
  border-color: var(--color-teal);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.feature-card.inactive {
  background: rgba(20, 52, 43, 0.6);
  border-color: rgba(80, 197, 183, 0.3);
}

.feature-card:hover {
  transform: translateX(5px);
  border-color: var(--color-lavender);
}

.feature-card.inactive:hover {
  background: rgba(20, 52, 43, 0.8);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* Icon styling */
.feature-icon-container {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-card.active .feature-icon-container {
  background: linear-gradient(135deg, var(--color-teal), var(--color-blue));
}

.feature-card.inactive .feature-icon-container {
  background: rgba(239, 217, 206, 0.2);
  border: 1px solid rgba(239, 217, 206, 0.3);
}

.feature-icon {
  width: 28px;
  height: 28px;
  transition: all 0.3s ease;
}

.feature-card.active .feature-icon {
  color: white;
}

.feature-card.inactive .feature-icon {
  color: var(--color-cream);
}

/* Title styling */
.feature-title {
  transition: color 0.3s ease;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: white; /* Par défaut en blanc */
}

.feature-card.active .feature-title {
  color: var(--color-dark-green); /* Noir quand actif */
}

.feature-card.inactive .feature-title {
  color: white; /* Blanc quand inactif */
}

.feature-card.inactive:hover .feature-title {
  color: var(--color-dark-green); /* Noir au survol */
}

/* Description styling */
.feature-description {
  transition: all 0.3s ease;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9); /* Par défaut en blanc transparent */
}

.feature-card.active .feature-description {
  color: rgba(20, 52, 43, 0.9); /* Noir quand actif */
}

.feature-card.inactive .feature-description {
  color: rgba(255, 255, 255, 0.9); /* Blanc quand inactif */
}

.feature-card.inactive:hover .feature-description {
  color: rgba(20, 52, 43, 0.8); /* Noir au survol */
}

/* Gradient text for Nyto */
.gradient-text-nyto {
  background: linear-gradient(135deg, #50C5B7 20%, #DEC0F1 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  position: relative;
  font-weight: 900;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.8)) drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
}

/* Carousel styling */
.carousel-container {
  background: linear-gradient(135deg, rgba(73, 109, 219, 0.9) 0%, rgba(80, 197, 183, 0.9) 100%);
  box-shadow: 0 20px 40px rgba(80, 197, 183, 0.3);
  border: 3px solid var(--color-lavender);
  position: relative;
}

.carousel-display {
  background: linear-gradient(to bottom right, rgba(20, 52, 43, 0.9), rgba(20, 52, 43, 0.95));
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Large icon for carousel */
.feature-icon-large {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, var(--color-teal), var(--color-blue));
  border-radius: 50%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
}

.feature-icon-large::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: linear-gradient(135deg, var(--color-lavender), var(--color-teal));
  border-radius: 50%;
  z-index: -1;
}

.icon-large {
  width: 60px;
  height: 60px;
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

/* Carousel footer */
.carousel-footer {
  background: linear-gradient(90deg, rgba(20, 52, 43, 0.95) 0%, rgba(73, 109, 219, 0.95) 100%);
  border-top: 2px solid var(--color-teal);
  padding: 1rem 1.5rem;
}

/* Feature indicators */
.feature-indicator {
  background: rgba(239, 217, 206, 0.4);
  border: 1px solid rgba(80, 197, 183, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.feature-indicator.active {
  background: var(--color-teal);
  transform: scale(1.3);
  box-shadow: 0 0 10px var(--color-teal);
}

.feature-indicator:hover:not(.active) {
  background: var(--color-lavender);
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .feature-card {
    padding: 1.25rem;
  }
  
  .feature-description {
    font-size: 0.9rem;
  }
  
  .carousel-display {
    min-height: 300px;
  }
  
  .feature-icon-large {
    width: 100px;
    height: 100px;
  }
  
  .icon-large {
    width: 50px;
    height: 50px;
  }
}

@media (min-width: 768px) {
  h2 {
    font-size: 4.5rem !important;
  }
}

/* Performance optimizations */
.feature-card {
  will-change: transform;
}

.feature-card:hover {
  will-change: auto;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .feature-card {
    transition: none;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: none;
  }
}
</style>