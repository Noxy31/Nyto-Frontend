<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

// Props
interface HeroSectionProps {
  isVisible: boolean;
}

const props = defineProps<HeroSectionProps>();

// Hero animation states
interface KanjiState {
  char: string;
  visible: boolean;
}

interface LearningPathItem {
  char: string;
  meaning: string;
  visible: boolean;
  x: number;
  y: number;
}

const heroKanji = ref<KanjiState>({ char: '冒', visible: false });
const learningPath = reactive<LearningPathItem[]>([
  { char: '始', meaning: 'begin', visible: false, x: 25, y: 30 },
  { char: '習', meaning: 'learn', visible: false, x: 40, y: 50 },
  { char: '練', meaning: 'practice', visible: false, x: 60, y: 65 },
  { char: '熟', meaning: 'master', visible: false, x: 80, y: 75 }
]);

// Initialize animations
onMounted(() => {
  // Start kanji animations with a slight delay
  setTimeout(() => {
    heroKanji.value.visible = true;
    
    learningPath.forEach((item, index) => {
      setTimeout(() => {
        item.visible = true;
      }, 300 * (index + 1));
    });
  }, 800);
});
</script>

<template>
  <section id="hero" class="min-h-screen flex items-center relative pt-20 overflow-hidden hero-gradient">
    <div class="container mx-auto px-6 md:px-12 relative z-10">
      <div class="flex flex-col md:flex-row items-center">
        <!-- Text content with staggered reveal -->
        <div class="md:w-1/2 space-y-8 transform transition-all duration-1000"
             :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
          <h1 class="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-primary">
            <span class="block">Redefine Your</span> 
            <span class="relative">
              Japanese 
              <span class="absolute -top-1 -right-1 text-lg text-accent">日本語</span>
            </span>
            <span class="block">Learning</span>
          </h1>
          
          <p class="text-xl md:text-2xl font-light text-secondary">
            Discover the power of AI-driven immersive learning that adapts to your unique style and accelerates your fluency journey.
          </p>
          
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <button class="primary-button">
              Start Your Journey
            </button>
            
            <button class="secondary-button">
              Watch Demo 
              <span class="ml-2 inline-block transform transition-transform duration-300 hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
        
        <!-- Visual element with kanji animation -->
        <div class="md:w-1/2 mt-12 md:mt-0 flex justify-center items-center">
          <div class="relative w-72 h-72 md:w-96 md:h-96">
            <!-- Central kanji animation -->
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        transition-all duration-1000 ease-out text-9xl font-bold text-primary"
                 :class="heroKanji.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'">
              {{ heroKanji.char }}
              <div class="text-sm mt-4 text-center font-normal text-secondary">adventure</div>
            </div>
            
            <!-- Learning path animations -->
            <div v-for="(item, index) in learningPath" 
                 :key="index"
                 class="absolute text-3xl md:text-4xl font-bold transition-all duration-700 transform text-primary"
                 :class="item.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'"
                 :style="{
                   top: `${item.y}%`,
                   left: `${item.x}%`,
                   transform: 'translate(-50%, -50%)'
                 }">
              {{ item.char }}
              <span class="block text-xs mt-1 text-center text-secondary">{{ item.meaning }}</span>
            </div>
            
            <!-- Connection lines -->
            <svg class="absolute top-0 left-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path v-for="(item, index) in learningPath" 
                    :key="`path-${index}`"
                    :d="`M50,50 L${item.x},${item.y}`"
                    :style="{
                      stroke: '#9C9990',
                      strokeWidth: '2',
                      strokeDasharray: '5,5',
                      opacity: item.visible ? 0.6 : 0,
                      transition: 'opacity 0.7s ease-in-out'
                    }" 
                    fill="none"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Down arrow animation -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
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

.hero-gradient {
  background: linear-gradient(135deg, #E0D8DE 0%, #CFD2B2 100%);
}

.text-primary {
  color: var(--color-primary);
}

.text-secondary {
  color: var(--color-secondary);
}

.text-accent {
  color: var(--color-accent);
}

.primary-button {
  @apply px-8 py-4 rounded-full font-medium text-lg transition-all transform hover:scale-105 hover:shadow-xl;
  background-color: var(--color-primary);
  color: var(--color-light);
}

.secondary-button {
  @apply px-8 py-4 rounded-full font-medium text-lg transition-all border-2 transform hover:scale-105;
  color: var(--color-secondary);
  border-color: var(--color-secondary);
}

/* Animations */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>