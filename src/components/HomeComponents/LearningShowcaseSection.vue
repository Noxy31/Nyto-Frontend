<script setup lang="ts">
import { ref, computed } from 'vue';

// Props
interface LearningShowcaseProps {
  isVisible: boolean;
}

const props = defineProps<LearningShowcaseProps>();

// Learning module interface
interface LearningModule {
  id: string;
  title: string;
  description: string;
  character: string;
  color: string;
  textColor: string;
  delay: string;
}

// Milestone interface
interface Milestone {
  label: string;
  completed: boolean;
}

// Learning modules data
const learningModules = ref<LearningModule[]>([
  {
    id: 'conversation',
    title: 'Conversation Practice',
    description: 'Engage in dynamic dialogues with our AI tutor that adapts to your speaking level.',
    character: '会話',
    color: '#9C9990',
    textColor: '#E0D8DE',
    delay: '0.1s'
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary Builder',
    description: 'Master new words through context-rich examples and spaced repetition algorithms.',
    character: '単語',
    color: '#CFD2B2',
    textColor: '#4B3B47',
    delay: '0.2s'
  },
  {
    id: 'kanji',
    title: 'Kanji Master',
    description: 'Learn kanji through radical breakdowns, stroke order, and memorable mnemonics.',
    character: '漢字',
    color: '#6A6262',
    textColor: '#E0D8DE',
    delay: '0.3s'
  }
]);

// Learning milestones for progress path
const milestones = ref<Milestone[]>([
  { label: 'Beginner', completed: true },
  { label: 'Elementary', completed: true },
  { label: 'Intermediate', completed: true },
  { label: 'Advanced', completed: false },
  { label: 'Fluent', completed: false }
]);

// Calculate progress percentage based on completed milestones
const progressPercentage = computed((): number => {
  const completedCount = milestones.value.filter(m => m.completed).length;
  return (completedCount / milestones.value.length) * 100;
});

// Module hover state
const hoveredModule = ref<string | null>(null);
const setHoveredModule = (id: string | null): void => {
  hoveredModule.value = id;
};
</script>

<template>
  <section id="showcase" class="py-24 relative showcase-bg">
    <div class="container mx-auto px-6 md:px-12">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 transition-all duration-1000 transform"
          :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
          style="color: #4B3B47;">
        Smart Learning
      </h2>
      
      <!-- Learning modules grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="module in learningModules" 
             :key="module.id"
             class="rounded-3xl overflow-hidden shadow-lg transition-all duration-500 transform hover:scale-105 module-card"
             :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
             :style="{ transitionDelay: module.delay }"
             @mouseenter="setHoveredModule(module.id)"
             @mouseleave="setHoveredModule(null)">
          <div class="aspect-w-3 aspect-h-2 module-header" :style="{ backgroundColor: module.color }">
            <div class="p-8 flex items-center justify-center">
              <div class="text-5xl font-bold module-character" 
                   :style="{ color: module.textColor, transform: hoveredModule === module.id ? 'scale(1.2)' : 'scale(1)' }">
                {{ module.character }}
              </div>
            </div>
          </div>
          <div class="p-6 module-content">
            <h3 class="text-xl font-bold mb-2 module-title">{{ module.title }}</h3>
            <p class="mb-4 module-description">{{ module.description }}</p>
            <a href="#" class="font-medium flex items-center module-link">
              <span :class="{ 'link-animated': hoveredModule === module.id }">
                {{ module.id === 'conversation' ? 'Try it out' : 
                   module.id === 'vocabulary' ? 'Explore words' : 
                   'Start learning' }}
              </span>
              <span class="ml-2 transition-transform duration-300" 
                    :class="{ 'translate-x-1': hoveredModule === module.id }">→</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Progress tracking visual -->
      <div class="mt-16 p-6 md:p-10 rounded-3xl shadow-xl transition-all duration-1000 transform progress-container"
           :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
        <h3 class="text-2xl font-bold mb-6 progress-title">Your Learning Path</h3>
        
        <div class="relative">
          <!-- Progress path visualization -->
          <div class="h-2 w-full rounded-full progress-track">
            <div class="h-full rounded-full transition-all duration-1000 progress-bar" 
                 :style="{ width: `${progressPercentage}%` }"></div>
          </div>
          
          <!-- Milestone markers -->
          <div class="flex justify-between mt-2">
            <div v-for="(milestone, index) in milestones" 
                 :key="index"
                 class="text-sm font-medium relative milestone"
                 :class="milestone.completed ? 'completed' : 'pending'">
              {{ milestone.label }}
              <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full milestone-dot"
                   :class="milestone.completed ? 'completed' : 'pending'"></div>
            </div>
          </div>
        </div>
        
        <div class="mt-8 text-center">
          <p class="text-lg mb-4 progress-description">Personalized for your goals and learning style</p>
          <button class="px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 continue-button">
            Continue Learning
          </button>
        </div>
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

.showcase-bg {
  background-color: var(--color-bg);
}

/* Module card styling */
.module-card {
  background-color: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
}

.module-card:hover {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.module-character {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.module-title {
  color: var(--color-primary);
}

.module-description {
  color: var(--color-secondary);
}

.module-link {
  color: var(--color-primary);
  position: relative;
}

.link-animated {
  font-weight: 600;
}

/* Aspect ratio helper */
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

/* Progress path styling */
.progress-container {
  background-color: white;
}

.progress-title {
  color: var(--color-primary);
}

.progress-track {
  background-color: var(--color-bg);
}

.progress-bar {
  background-color: var(--color-primary);
}

.progress-description {
  color: var(--color-secondary);
}

.milestone {
  transition: all 0.3s ease;
}

.milestone.completed {
  color: var(--color-primary);
  font-weight: 600;
}

.milestone.pending {
  color: var(--color-accent);
}

.milestone-dot {
  transition: all 0.3s ease;
}

.milestone-dot.completed {
  background-color: var(--color-primary);
}

.milestone-dot.pending {
  background-color: var(--color-bg);
}

.continue-button {
  background-color: var(--color-primary);
  color: var(--color-light);
}
</style>