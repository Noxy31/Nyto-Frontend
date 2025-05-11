<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

// Props
interface HeroSectionProps {
  isVisible: boolean;
}

const props = defineProps<HeroSectionProps>();

// Main animation states
const animationActive = ref<boolean>(false);
const textVisible = ref<boolean>(false);

// Japanese symbols for background
interface Symbol {
  id: number;
  char: string;
  size: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
}

// Generate static symbols for background effect - Reduced count
const generateSymbols = (): Symbol[] => {
  const symbols = [];
  const characters = ['日', '本', '語', '学', '習', '漢', '字', '話', '読', '見', '聞', '書', '言'];
  
  // Reduced from 20 to 10 for better performance
  for (let i = 0; i < 10; i++) {
    symbols.push({
      id: i,
      char: characters[Math.floor(Math.random() * characters.length)],
      size: Math.random() * 40 + 40,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 40 - 20,
      color: [
        '#DEC0F1', '#50C5B7', '#496DDB', '#EFD9CE', '#50C5B7'
      ][Math.floor(Math.random() * 5)]
    });
  }
  
  return symbols;
};

const symbols = reactive<Symbol[]>(generateSymbols());

// Central display characters with meaning
const centerKanjis = reactive([
  { char: '学', meaning: 'study', active: false, color: '#50C5B7', delay: 0.2 },
  { char: '進', meaning: 'progress', active: false, color: '#496DDB', delay: 0.5 },
  { char: '成', meaning: 'accomplish', active: false, color: '#DEC0F1', delay: 0.8 }
]);

// Initialize animations
onMounted(() => {
  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    animationActive.value = true;
    textVisible.value = true;
    
    // Animate center kanjis only
    centerKanjis.forEach((kanji, index) => {
      setTimeout(() => {
        kanji.active = true;
      }, 1000 + index * 800);
    });
  });
});
</script>

<template>
  <section id="hero" class="min-h-screen flex items-center justify-center relative overflow-hidden hero-background pt-20">
    <!-- Static background elements - no animation -->
    <div class="absolute inset-0 overflow-hidden">
      <div v-for="symbol in symbols" 
           :key="symbol.id"
           class="absolute symbol-static"
           :style="{
             top: `${symbol.y}%`,
             left: `${symbol.x}%`,
             fontSize: `${symbol.size}px`,
             color: symbol.color,
             transform: `rotate(${symbol.rotation}deg)`,
             // Ajout de will-change pour optimiser le rendu
             willChange: 'transform'
           }">
        {{ symbol.char }}
      </div>
    </div>
    
    <!-- Main content -->
    <div class="container relative z-10 px-6 md:px-12 mx-auto flex flex-col items-center">
      <!-- Content row -->
      <div class="flex flex-col lg:flex-row w-full items-center">
        <!-- Left side - Text content -->
        <div class="lg:w-1/2 slide-up-fade" :class="{ 'element-visible': textVisible }">
          <div class="pr-0 lg:pr-16 space-y-6">
            <h1 class="hero-title">
              <span class="block">Master</span>
              <span class="gradient-text">Japanese</span>
              <span class="block">with Nyto</span>
            </h1>
            
            <p class="hero-subtitle">
              Experience a revolutionary way to learn Japanese using a modern app that 
              personalizes your journey and accelerates your progress to fluency.
            </p>
            
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <button class="primary-button shine-effect">
                Start Learning Now
              </button>
              <button class="secondary-button">
                Explore Mojidex
                <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5 play-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Right side - Visual elements -->
        <div class="lg:w-1/2 mt-12 lg:mt-0 slide-up-fade" :class="{ 'element-visible': textVisible }" style="transition-delay: 0.2s;">
          <div class="relative display-container">
            <!-- Static circle background - no pulse animation -->
            <div class="circle-background-static"></div>
            
            <!-- Main kanji display -->
            <div class="kanji-display">
              <div v-for="(kanji, index) in centerKanjis" 
                   :key="index"
                   class="kanji-card"
                   :class="{ 'active': kanji.active }"
                   :style="{ 
                     backgroundColor: kanji.color, 
                     transitionDelay: `${kanji.delay}s`,
                     zIndex: centerKanjis.length - index
                   }">
                <div class="kanji-character">{{ kanji.char }}</div>
                <div class="kanji-meaning">{{ kanji.meaning }}</div>
              </div>
            </div>
            
            <!-- Static Japanese text elements -->
            <div class="decorative-text text-1" style="transform: translateY(-10px) rotate(2deg);">文法</div>
            <div class="decorative-text text-2" style="transform: translateY(5px) rotate(-1deg);">単語</div>
            <div class="decorative-text text-3" style="transform: translateY(-5px) rotate(1deg);">会話</div>
          </div>
        </div>
      </div>
      
      <!-- Features preview -->
      <div class="features-preview slide-up-fade" :class="{ 'element-visible': textVisible }" style="transition-delay: 0.4s;">
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">🎓</div>
            <div class="feature-title">All Levels</div>
            <div class="feature-desc">From beginner to pro</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🎯</div>
            <div class="feature-title">Gamified Learning</div>
            <div class="feature-desc">Fun interactive games</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📖</div>
            <div class="feature-title">Mojidex</div>
            <div class="feature-desc">Your kanji companion</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📊</div>
            <div class="feature-title">Track Progress</div>
            <div class="feature-desc">Real-time analytics</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Base colors - Nouvelle palette harmonieuse */
:root {
  --color-cream: #EFD9CE;      /* Crème rosé */
  --color-lavender: #DEC0F1;   /* Lavande */
  --color-teal: #50C5B7;       /* Vert d'eau */
  --color-blue: #496DDB;       /* Bleu vif */
  --color-dark-green: #14342B; /* Vert foncé */
}

/* Hero section background avec eclairage statique */
.hero-background {
  background: linear-gradient(135deg, var(--color-dark-green) 0%, var(--color-blue) 100%);
  position: relative;
  overflow: hidden;
}

/* Removed ambientLight animation for performance */
.hero-background::before {
  content: '';
  position: absolute;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  background: 
    radial-gradient(circle at 75% 25%, rgba(80, 197, 183, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 25% 75%, rgba(73, 109, 219, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(222, 192, 241, 0.1) 0%, transparent 70%);
  opacity: 0.8;
  z-index: 0;
}

/* Static symbols - no animation, reduced blur */
.symbol-static {
  opacity: 0.15;
  font-family: "Noto Sans JP", sans-serif;
  filter: blur(0.5px);
  user-select: none;
  z-index: 0;
  text-shadow: 0 0 10px rgba(222, 192, 241, 0.2);
}

/* Hero text styles */
.hero-title {
  font-size: 3.5rem;
  line-height: 1.1;
  font-weight: 800;
  color: var(--color-cream);
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 5rem;
  }
}

.gradient-text {
  background: linear-gradient(135deg, #50C5B7 20%, #DEC0F1 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  position: relative;
  text-shadow: none;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.8)) drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
  font-weight: 900;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  font-weight: 400;
  color: var(--color-cream);
  max-width: 600px;
}

/* Button styles */
.primary-button {
  padding: 1rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  background: linear-gradient(135deg, var(--color-teal) 0%, #3da89b 100%);
  color: var(--color-dark-green);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(80, 197, 183, 0.3);
  letter-spacing: 0.5px;
}

.primary-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(80, 197, 183, 0.4);
  filter: brightness(1.05);
}

/* Simplified shine effect - only on hover */
.shine-effect:hover:before {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.5),
    transparent
  );
  transform: rotate(25deg);
  animation: shine 0.8s;
}

@keyframes shine {
  to {
    left: 200%;
    top: 100%;
  }
}

/* Secondary button */
.secondary-button {
  padding: 1rem 2rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1rem;
  border: 2px solid var(--color-lavender);
  color: var(--color-cream);
  background-color: rgba(222, 192, 241, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 15px rgba(73, 109, 219, 0.2);
}

.secondary-button:hover {
  background-color: rgba(222, 192, 241, 0.3);
  border-color: var(--color-teal);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(73, 109, 219, 0.3);
}

.play-icon {
  transition: transform 0.3s ease;
}

.secondary-button:hover .play-icon {
  transform: scale(1.2);
}

/* Kanji display styles */
.display-container {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Static circle background - no pulse animation */
.circle-background-static {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(80, 197, 183, 0.3) 0%, rgba(73, 109, 219, 0.1) 70%);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(30px);
  z-index: 0;
  opacity: 0.8;
}

.kanji-display {
  position: relative;
  width: 200px;
  height: 200px;
  z-index: 2;
}

/* Optimized kanji card transitions */
.kanji-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%) scale(0.4) rotate(20deg);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  will-change: transform, opacity;
}

.kanji-card.active {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1) rotate(0);
  will-change: auto;
}

.kanji-card:nth-child(1).active {
  transform: translate(calc(-50% - 80px), calc(-50% - 40px)) scale(1) rotate(-5deg);
}

.kanji-card:nth-child(2).active {
  transform: translate(-50%, -50%) scale(1.2) rotate(0);
}

.kanji-card:nth-child(3).active {
  transform: translate(calc(-50% + 80px), calc(-50% + 40px)) scale(1) rotate(5deg);
}

.kanji-character {
  font-size: 3rem;
  font-weight: bold;
  color: #ffffff;
  font-family: "Noto Sans JP", sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.kanji-meaning {
  font-size: 0.8rem;
  margin-top: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Static decorative text */
.decorative-text {
  position: absolute;
  font-family: "Noto Sans JP", sans-serif;
  opacity: 0.2;
  font-weight: bold;
  color: var(--color-cream);
  filter: blur(0.5px);
  text-shadow: 0 2px 10px rgba(80, 197, 183, 0.5);
}

.text-1 {
  font-size: 1.8rem;
  top: 20%;
  right: 10%;
  color: rgba(222, 192, 241, 0.8);
}

.text-2 {
  font-size: 1.5rem;
  bottom: 25%;
  left: 15%;
  color: rgba(80, 197, 183, 0.8);
}

.text-3 {
  font-size: 2rem;
  top: 60%;
  right: 15%;
  color: rgba(73, 109, 219, 0.8);
}

/* Features preview */
.features-preview {
  margin-top: 2.5rem;
  width: 100%;
  margin-bottom: 2rem;
}

.features-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.2rem;
  max-width: 900px;
  margin: 0 auto;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .features-grid {
    gap: 1rem;
  }
  
  .feature-item {
    min-width: calc(50% - 0.5rem);
  }
}

@media (max-width: 400px) {
  .feature-item {
    min-width: 100%;
  }
}

/* Optimized feature items */
.feature-item {
  flex: 1;
  min-width: 180px;
  padding: 1.5rem 1.2rem;
  background: linear-gradient(to bottom right, var(--color-cream), rgba(222, 192, 241, 0.8));
  border-radius: 12px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 2px solid rgba(80, 197, 183, 0.4);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-bottom: 5px;
  will-change: transform;
}

.feature-item:nth-child(1) {
  background: linear-gradient(to bottom right, var(--color-cream), rgba(73, 109, 219, 0.2));
  border-color: rgba(73, 109, 219, 0.6);
}

.feature-item:nth-child(2) {
  background: linear-gradient(to bottom right, var(--color-cream), rgba(80, 197, 183, 0.2));
  border-color: rgba(80, 197, 183, 0.6);
}

.feature-item:nth-child(3) {
  background: linear-gradient(to bottom right, var(--color-cream), rgba(222, 192, 241, 0.2));
  border-color: rgba(222, 192, 241, 0.6);
}

.feature-item:nth-child(4) {
  background: linear-gradient(to bottom right, var(--color-cream), rgba(239, 217, 206, 0.2));
  border-color: rgba(239, 217, 206, 0.6);
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  will-change: auto;
}

.feature-item:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--color-teal), var(--color-blue));
  z-index: 1;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.feature-item:hover:before {
  opacity: 1;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.feature-title {
  font-weight: 700;
  color: var(--color-dark-green);
  letter-spacing: 0.3px;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

.feature-desc {
  font-size: 0.85rem;
  color: rgba(20, 52, 43, 0.8);
  line-height: 1.2;
  font-weight: 500;
}

/* Animation utilities - optimized */
.slide-up-fade {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  will-change: transform, opacity;
}

.element-visible {
  opacity: 1;
  transform: translateY(0);
  will-change: auto;
}
</style>