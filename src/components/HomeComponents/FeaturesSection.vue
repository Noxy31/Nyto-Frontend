<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { GraduationCap, Target, BookOpen, TrendingUp } from 'lucide-vue-next'

// Props
interface FeaturesSectionProps {
  isVisible: boolean
}
const props = defineProps<FeaturesSectionProps>()

// Feature interface
interface Feature {
  title: string
  description: string
  icon: any
  active: boolean
}

// Optimisation: constantes pour éviter les recalculs
const featuresData = [
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
] as const

// States
const features = ref<Feature[]>([...featuresData])
const currentImageIndex = ref(0)
const isPaused = ref(false)

// Optimisation: variables pour les timeouts
let featureInterval: ReturnType<typeof setInterval> | null = null

// Methods optimisés
const activateFeature = (index: number): void => {
  // Optimisation: éviter les recalculs inutiles
  if (features.value[index].active) return
  
  features.value.forEach((f, i) => {
    f.active = i === index
  })
  currentImageIndex.value = index
}

const handleRadioChange = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const index = parseInt(target.value, 10)
  activateFeature(index)
  pauseRotation()
}

const pauseRotation = (): void => {
  isPaused.value = true
}

const resumeRotation = (): void => {
  isPaused.value = false
}

// Optimisation: gestion plus efficace de l'intervalle
const startRotation = (): void => {
  if (featureInterval) return
  
  featureInterval = setInterval(() => {
    if (isPaused.value) return
    
    const activeIndex = features.value.findIndex(f => f.active)
    const nextIndex = (activeIndex + 1) % features.value.length
    activateFeature(nextIndex)
  }, 6000)
}

const stopRotation = (): void => {
  if (featureInterval) {
    clearInterval(featureInterval)
    featureInterval = null
  }
}

// Lifecycle optimisé
onMounted(() => {
  startRotation()
})

onUnmounted(() => {
  stopRotation()
})
</script>

<template>
  <section id="features" class="features-section">
    <div class="features-container">
      
      <!-- Header section -->
      <div class="features-header" 
           :class="props.isVisible ? 'visible' : ''">
        <h2 class="features-title">
          <span>The </span>
          <span class="title-gradient">Nyto</span>
          <span class="title-block">Experience</span>
        </h2>
      </div>
      
      <!-- Main content grid -->
      <div class="features-grid">
        
        <!-- Glass selector -->
        <div class="selector-container">
          <div class="radio-input">
            <div class="glass">
              <div class="glass-inner"></div>
            </div>
            <div class="selector">
              <div 
                v-for="(feature, index) in features" 
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
                  <div class="ball" :class="`ball-${index + 1}`"></div>
                </div>
                <label :for="`feature-${index}`" class="choice-name">
                  {{ feature.title }}
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Content display -->
        <div class="content-container" 
             :class="props.isVisible ? 'visible' : ''">
          
          <!-- Main display area -->
          <div class="content-display">
            <div class="content-inner">
              <Transition name="fade" mode="out-in">
                <div :key="currentImageIndex" class="feature-content">
                  <!-- Large icon -->
                  <div class="feature-icon-large">
                    <component :is="features[currentImageIndex].icon" class="icon-large" />
                  </div>
                  <!-- Feature info -->
                  <h3 class="feature-title">
                    {{ features[currentImageIndex].title }}
                  </h3>
                  <p class="feature-description">
                    {{ features[currentImageIndex].description }}
                  </p>
                </div>
              </Transition>
            </div>
          </div>
          
          <!-- Footer with indicators -->
          <div class="content-footer">
            <div class="indicators-container">
              <div class="indicators">
                <button 
                  v-for="(feature, index) in features" 
                  :key="index"
                  @click="activateFeature(index)"
                  class="feature-indicator"
                  :class="{ 'active': feature.active }"
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
/* Section principale */
.features-section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  
  /* Mode clair */
  background: linear-gradient(180deg, 
    #496DDB 0%,
    #3856B3 15%,
    #2B4595 35%,
    #1E3470 65%,
    #14342B 100%
  );
}

/* Mode sombre - fond plus sombre avec nuances */
.dark .features-section {
  background: linear-gradient(180deg, 
    #0f172a 0%,
    #1e293b 15%,
    #334155 35%,
    #475569 65%,
    #64748b 100%
  );
}

/* Container */
.features-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  position: relative;
  z-index: 10;
}

@media (min-width: 768px) {
  .features-container {
    padding: 4rem 3rem;
  }
}

/* Header section */
.features-header {
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(2.5rem);
  transition: all 0.8s ease;
}

.features-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.features-title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.2;
  color: white;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .features-title {
    font-size: 6rem;
  }
}

.dark .features-title {
  color: #f8fafc;
}

.title-gradient {
  background: linear-gradient(135deg, #50C5B7 20%, #DEC0F1 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  position: relative;
  font-weight: 900;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.8)) drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
}

.dark .title-gradient {
  background: linear-gradient(135deg, #22d3ee 20%, #c084fc 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.9)) drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.7));
}

.title-block {
  display: block;
}

/* Main grid */
.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Selector container */
.selector-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 1024px) {
  .selector-container {
    justify-content: flex-start;
  }
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

.dark .glass {
  background-color: rgba(51, 65, 85, 0.6);
  box-shadow: rgba(15, 23, 42, 0.3) 0px 25px 50px -10px,
    rgba(0, 0, 0, 0.4) 0px 10px 30px -15px,
    rgba(51, 65, 85, 0.4) 0px -2px 6px 0px inset;
}

.glass-inner {
  width: 100%;
  height: 100%;
  border-color: rgba(245, 245, 245, 0.45);
  border-width: 9px;
  border-style: solid;
  border-radius: 30px;
}

.dark .glass-inner {
  border-color: rgba(148, 163, 184, 0.5);
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
  will-change: transform;
}

.choice:hover {
  transform: translateX(5px);
  will-change: auto;
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
  transition: all 0.3s ease;
}

.choice-circle:hover {
  border-color: rgba(222, 192, 241, 0.6);
  box-shadow: 0px 0px 20px -5px rgba(222, 192, 241, 0.6);
}

.dark .choice-circle {
  border-color: rgba(148, 163, 184, 0.5);
  box-shadow: 0px 0px 20px -13px rgba(51, 65, 85, 0.8), 0px 0px 20px -14px rgba(51, 65, 85, 0.8) inset;
}

.dark .choice-circle:hover {
  border-color: rgba(192, 132, 252, 0.7);
  box-shadow: 0px 0px 20px -5px rgba(192, 132, 252, 0.7);
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

/* Couleurs des boules selon la palette */
.ball-1 {
  background-color: #EFD9CE; /* Cream */
}

.ball-2 {
  background-color: #DEC0F1; /* Lavender */
}

.ball-3 {
  background-color: #50C5B7; /* Teal */
}

.ball-4 {
  background-color: #496DDB; /* Blue */
}

.dark .ball-1 {
  background-color: #f1f5f9; /* Lighter cream for dark mode */
}

.dark .ball-2 {
  background-color: #c084fc; /* Brighter lavender for dark mode */
}

.dark .ball-3 {
  background-color: #22d3ee; /* Brighter teal for dark mode */
}

.dark .ball-4 {
  background-color: #3b82f6; /* Brighter blue for dark mode */
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

.dark .choice-name {
  color: #f8fafc;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.dark .choice:hover .choice-name {
  text-shadow: 0 0 12px rgba(248, 250, 252, 0.6);
}

/* Content container */
.content-container {
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transform: translateY(2.5rem);
  opacity: 0;
  transition: all 0.8s ease;
  
  /* Mode clair */
  background: linear-gradient(135deg, rgba(73, 109, 219, 0.9) 0%, rgba(80, 197, 183, 0.9) 100%);
  border: 3px solid var(--color-lavender);
}

.content-container.visible {
  transform: translateY(0);
  opacity: 1;
}

.dark .content-container {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%);
  border-color: #c084fc;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.content-display {
  background: linear-gradient(to bottom right, rgba(20, 52, 43, 0.9), rgba(20, 52, 43, 0.95));
  min-height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark .content-display {
  background: linear-gradient(to bottom right, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.98));
}

.content-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.feature-content {
  text-align: center;
}

/* Large icon */
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
  margin-bottom: 2rem;
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

.dark .feature-icon-large {
  background: linear-gradient(135deg, #22d3ee, #3b82f6);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.dark .feature-icon-large::before {
  background: linear-gradient(135deg, #c084fc, #22d3ee);
}

.icon-large {
  width: 70px;
  height: 70px;
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.feature-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-cream);
  margin-bottom: 1rem;
}

.dark .feature-title {
  color: #f8fafc;
}

.feature-description {
  color: rgba(239, 217, 206, 0.9);
  line-height: 1.6;
  max-width: 28rem;
}

.dark .feature-description {
  color: rgba(203, 213, 225, 0.9);
}

/* Content footer */
.content-footer {
  background: linear-gradient(90deg, rgba(20, 52, 43, 0.95) 0%, rgba(73, 109, 219, 0.95) 100%);
  border-top: 2px solid var(--color-teal);
  padding: 1rem 1.5rem;
}

.dark .content-footer {
  background: linear-gradient(90deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%);
  border-top-color: #22d3ee;
}

.indicators-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.indicators {
  display: flex;
  gap: 0.75rem;
}

/* Feature indicators */
.feature-indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
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

.dark .feature-indicator {
  background: rgba(148, 163, 184, 0.4);
  border-color: rgba(34, 211, 238, 0.5);
}

.dark .feature-indicator.active {
  background: #22d3ee;
  box-shadow: 0 0 10px #22d3ee;
}

.dark .feature-indicator:hover:not(.active) {
  background: #c084fc;
  border-color: #c084fc;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsive */
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
  }
  
  .content-inner {
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
</style>