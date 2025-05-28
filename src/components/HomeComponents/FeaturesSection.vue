<script setup lang="ts">
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

// Handle radio change
const handleRadioChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const index = parseInt(target.value);
  activateFeature(index);
  pauseRotation();
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
        <!-- Glass selector -->
        <div class="flex items-center justify-center lg:justify-start">
          <div class="radio-input">
            <div class="glass">
              <div class="glass-inner"></div>
            </div>
            <div class="selector">
              <div v-for="(feature, index) in features" 
                   :key="index"
                   class="choice"
                   @mouseenter="() => { activateFeature(index); pauseRotation(); }"
                   @mouseleave="resumeRotation">
                <div>
                  <input
                    :id="`feature-${index}`"
                    class="choice-circle"
                    :checked="feature.active"
                    :value="index"
                    name="feature-selector"
                    type="radio"
                    @change="handleRadioChange"
                  />
                  <div class="ball"></div>
                </div>
                <label :for="`feature-${index}`" class="choice-name">
                  {{ feature.title }}
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Content display -->
        <div class="rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-800 content-container"
             :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
          <!-- Main display area -->
          <div class="content-display">
            <div class="w-full h-full flex flex-col items-center justify-center p-8">
              <transition name="fade" mode="out-in">
                <div :key="currentImageIndex" class="text-center">
                  <!-- Large icon -->
                  <div class="feature-icon-large mb-8">
                    <component :is="features[currentImageIndex].icon" class="icon-large" />
                  </div>
                  <!-- Feature info -->
                  <h3 class="text-2xl font-bold text-cream mb-4">
                    {{ features[currentImageIndex].title }}
                  </h3>
                  <p class="text-cream/90 leading-relaxed max-w-md">
                    {{ features[currentImageIndex].description }}
                  </p>
                </div>
              </transition>
            </div>
          </div>
          
          <!-- Footer with indicators -->
          <div class="py-4 px-6 content-footer">
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

/* Glass Radio Input Styles */
.radio-input {
  display: flex;
  height: 280px;
  align-items: center;
}

.glass {
  z-index: 2;
  height: 110%;
  width: 120px;
  margin-right: 35px;
  padding: 8px;
  background-color: rgba(190, 189, 189, 0.5);
  border-radius: 35px;
  box-shadow: rgba(50, 50, 93, 0.2) 0px 25px 50px -10px,
    rgba(0, 0, 0, 0.25) 0px 10px 30px -15px,
    rgba(10, 37, 64, 0.26) 0px -2px 6px 0px inset;
  backdrop-filter: blur(8px);
}

.glass-inner {
  width: 100%;
  height: 100%;
  border-color: rgba(245, 245, 245, 0.45);
  border-width: 9px;
  border-style: solid;
  border-radius: 30px;
}

.selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.choice {
  margin: 8px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.choice:hover {
  transform: translateX(5px);
}

.choice > div {
  position: relative;
  width: 45px;
  height: 45px;
  margin-right: 20px;
  z-index: 0;
}

.choice-circle {
  appearance: none;
  height: 100%;
  width: 100%;
  border-radius: 100%;
  border-width: 9px;
  border-style: solid;
  border-color: rgba(245, 245, 245, 0.45);
  cursor: pointer;
  box-shadow: 0px 0px 20px -13px gray, 0px 0px 20px -14px gray inset;
}

.choice-circle:hover {
  border-color: rgba(222, 192, 241, 0.6);
  box-shadow: 0px 0px 20px -5px rgba(222, 192, 241, 0.6);
}

.ball {
  z-index: 1;
  position: absolute;
  inset: 0px;
  transform: translateX(-120px);
  box-shadow: rgba(0, 0, 0, 0.17) 0px -10px 10px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -15px 15px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -40px 20px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px,
    0px -1px 15px -8px rgba(0, 0, 0, 0.09);
  border-radius: 100%;
  transition: transform 800ms cubic-bezier(1, -0.4, 0, 1.4);
}

/* Couleurs spécifiques pour chaque boule selon votre palette */
.choice:nth-child(1) .ball {
  background-color: #DEC0F1; /* Mauve */
}

.choice:nth-child(2) .ball {
  background-color: #50C5B7; /* Verdigris */
}

.choice:nth-child(3) .ball {
  background-color: #496DDB; /* Royal Blue */
}

.choice:nth-child(4) .ball {
  background-color: #14342B; /* Dark green */
}

.choice-circle:checked + .ball {
  transform: translateX(0px);
}

.choice-name {
  color: white;
  font-size: 18px;
  font-weight: 700;
  font-family: 'Inter', system-ui, sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  max-width: 200px;
}

.choice:hover .choice-name {
  color: white;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
}

/* Content container styling */
.content-container {
  background: linear-gradient(135deg, rgba(73, 109, 219, 0.9) 0%, rgba(80, 197, 183, 0.9) 100%);
  box-shadow: 0 20px 40px rgba(80, 197, 183, 0.3);
  border: 3px solid var(--color-lavender);
  position: relative;
}

.content-display {
  background: linear-gradient(to bottom right, rgba(20, 52, 43, 0.9), rgba(20, 52, 43, 0.95));
  min-height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Large icon for content */
.feature-icon-large {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
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
  width: 70px;
  height: 70px;
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

/* Content footer */
.content-footer {
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
  transition: opacity 0.4s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .radio-input {
    height: 240px;
    justify-content: center;
  }
  
  .glass {
    width: 100px;
    margin-right: 25px;
  }
  
  .choice-name {
    font-size: 16px;
    max-width: 180px;
  }
}

@media (max-width: 768px) {
  .radio-input {
    height: 200px;
    flex-direction: column;
    align-items: center;
  }
  
  .glass {
    height: 80px;
    width: 300px;
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .glass-inner {
    border-width: 6px;
  }
  
  .selector {
    flex-direction: row;
    gap: 15px;
  }
  
  .choice {
    flex-direction: column;
    text-align: center;
    margin: 0;
  }
  
  .choice > div {
    margin-right: 0;
    margin-bottom: 8px;
    width: 35px;
    height: 35px;
  }
  
  .choice-name {
    font-size: 14px;
    max-width: 120px;
    line-height: 1.2;
  }
  
  .ball {
    transform: translateY(-80px);
  }
  
  .choice-circle:checked + .ball {
    transform: translateY(0px);
  }
  
  .content-display {
    min-height: 350px;
    padding: 1.5rem;
  }
  
  .feature-icon-large {
    width: 120px;
    height: 120px;
  }
  
  .icon-large {
    width: 60px;
    height: 60px;
  }
}

@media (min-width: 768px) {
  h2 {
    font-size: 4.5rem !important;
  }
}

/* Performance optimizations */
.choice {
  will-change: transform;
}

.choice:hover {
  will-change: auto;
}
</style>