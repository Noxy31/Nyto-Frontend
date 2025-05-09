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

// Japanese symbols for fluid animation
interface Symbol {
  id: number;
  char: string;
  size: number;
  x: number;
  y: number;
  rotation: number;
  delay: number;
  color: string;
  visible: boolean;
}

// Generate random symbols for background effect
const generateSymbols = (): Symbol[] => {
  const symbols = [];
  const characters = ['日', '本', '語', '学', '習', '漢', '字', '話', '読', '見', '聞', '書', '言'];
  
  for (let i = 0; i < 16; i++) {
    symbols.push({
      id: i,
      char: characters[Math.floor(Math.random() * characters.length)],
      size: Math.random() * 40 + 40,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 40 - 20,
      delay: Math.random() * 0.8,
      color: [
        '#4B3B47', '#6A6262', '#9C9990', '#CFD2B2', '#E0D8DE'
      ][Math.floor(Math.random() * 5)],
      visible: false
    });
  }
  
  return symbols;
};

const symbols = reactive<Symbol[]>(generateSymbols());

// Central display characters with meaning
const centerKanjis = reactive([
  { char: '学', meaning: 'study', active: false, color: '#4B3B47', delay: 0.2 },
  { char: '漢', meaning: 'kanji', active: false, color: '#6A6262', delay: 0.5 },
  { char: '上', meaning: 'advance', active: false, color: '#9C9990', delay: 0.8 }
]);

// Initialize animations
onMounted(() => {
  // Start background animation
  setTimeout(() => {
    animationActive.value = true;
    textVisible.value = true;
    
    // Animate background symbols
    symbols.forEach((symbol, index) => {
      setTimeout(() => {
        symbol.visible = true;
      }, index * 120);
    });
    
    // Animate center kanjis
    centerKanjis.forEach((kanji, index) => {
      setTimeout(() => {
        kanji.active = true;
      }, 1000 + index * 800);
    });
  }, 400);
});
</script>

<template>
  <section id="hero" class="min-h-screen flex items-center justify-center relative overflow-hidden hero-background">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div v-for="symbol in symbols" 
           :key="symbol.id"
           class="absolute symbol-animation"
           :class="{ 'symbol-visible': symbol.visible }"
           :style="{
             top: `${symbol.y}%`,
             left: `${symbol.x}%`,
             fontSize: `${symbol.size}px`,
             color: symbol.color,
             transform: `rotate(${symbol.rotation}deg)`,
             transitionDelay: `${symbol.delay}s`
           }">
        {{ symbol.char }}
      </div>
    </div>

    <!-- Gradient overlay -->
    <div class="absolute inset-0 gradient-overlay"></div>
    
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
              <span class="block">with AI</span>
            </h1>
            
            <p class="hero-subtitle">
              Experience a revolutionary way to learn Japanese using adaptive AI that 
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
            <!-- Animated circle background -->
            <div class="circle-background"></div>
            
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
            
            <!-- Japanese text floating elements -->
            <div class="decorative-text text-1">文法</div>
            <div class="decorative-text text-2">単語</div>
            <div class="decorative-text text-3">会話</div>
          </div>
        </div>
      </div>
      
      <!-- Features preview -->
      <div class="features-preview slide-up-fade" :class="{ 'element-visible': textVisible }" style="transition-delay: 0.4s;">
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">📚</div>
            <div class="feature-title">Advanced Courses</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">✏️</div>
            <div class="feature-title">Personalized</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🎮</div>
            <div class="feature-title">Mojidex</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📈</div>
            <div class="feature-title">Progress Tracking</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="scroll-indicator">
      <div class="scroll-arrow"></div>
      <div class="scroll-text">Explore More</div>
    </div>
  </section>
</template>

<style scoped>
/* Base colors */
:root {
  --color-primary: #4B3B47;
  --color-secondary: #6A6262;
  --color-accent: #9C9990;
  --color-light: #CFD2B2;
  --color-bg: #E0D8DE;
}

/* Hero section background */
.hero-background {
  background-color: var(--color-bg);
  overflow: hidden;
  position: relative;
}

.gradient-overlay {
  background: radial-gradient(circle at center, transparent 0%, rgba(224, 216, 222, 0.9) 70%);
  z-index: 1;
}

/* Floating symbols animation */
.symbol-animation {
  opacity: 0;
  transform-origin: center;
  transition: opacity 1.5s ease, transform 5s ease;
  font-family: "Noto Sans JP", sans-serif;
  filter: blur(1px);
  user-select: none;
  z-index: 0;
}

.symbol-visible {
  opacity: 0.15;
}

/* Hero text styles */
.hero-title {
  font-size: 3.5rem;
  line-height: 1.1;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 5rem;
  }
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  position: relative;
}

.gradient-text:after {
  content: "日本語";
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1.2rem;
  color: var(--color-light);
  -webkit-text-fill-color: var(--color-light);
  opacity: 0.7;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  font-weight: 300;
  color: var(--color-secondary);
  max-width: 600px;
}

/* Button styles */
.primary-button {
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1rem;
  background-color: var(--color-primary);
  color: var(--color-light);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.primary-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(75, 59, 71, 0.3);
}

.shine-effect:before {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: rotate(25deg);
  transition: all 0.8s;
}

.shine-effect:hover:before {
  left: 200%;
  top: 100%;
}

.secondary-button {
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 1rem;
  border: 2px solid var(--color-secondary);
  color: var(--color-secondary);
  background-color: transparent;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.secondary-button:hover {
  background-color: rgba(106, 98, 98, 0.1);
  transform: translateY(-3px);
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

.circle-background {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color-light) 0%, rgba(207, 210, 178, 0.3) 70%);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(20px);
  z-index: 0;
  animation: pulse 8s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.9;
  }
}

.kanji-display {
  position: relative;
  width: 200px;
  height: 200px;
  z-index: 2;
}

.kanji-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%) scale(0.4) rotate(20deg);
  opacity: 0;
  transition: all 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.kanji-card.active {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1) rotate(0);
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
  color: white;
  font-family: "Noto Sans JP", sans-serif;
}

.kanji-meaning {
  font-size: 0.8rem;
  margin-top: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Decorative floating text */
.decorative-text {
  position: absolute;
  font-family: "Noto Sans JP", sans-serif;
  opacity: 0.15;
  font-weight: bold;
  color: var(--color-primary);
  animation: float 10s infinite ease-in-out;
}

.text-1 {
  font-size: 1.8rem;
  top: 20%;
  right: 10%;
  animation-delay: 0.5s;
}

.text-2 {
  font-size: 1.5rem;
  bottom: 25%;
  left: 15%;
  animation-delay: 1s;
}

.text-3 {
  font-size: 2rem;
  top: 60%;
  right: 15%;
  animation-delay: 1.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-20px) rotate(3deg);
  }
}

/* Features preview */
.features-preview {
  margin-top: 4rem;
  width: 100%;
}

.features-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.feature-item {
  flex: 1;
  min-width: 120px;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(207, 210, 178, 0.5);
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.5);
}

.feature-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.feature-title {
  font-weight: 600;
  color: var(--color-primary);
}

/* Animation utilities */
.slide-up-fade {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s ease, transform 1s ease;
}

.element-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.7;
  transition: opacity 0.3s;
  z-index: 10;
}

.scroll-indicator:hover {
  opacity: 1;
}

.scroll-arrow {
  width: 30px;
  height: 30px;
  margin-bottom: 0.5rem;
  border-left: 2px solid var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
  transform: rotate(-45deg);
  animation: scrollIndicator 2s infinite;
}

.scroll-text {
  font-size: 0.75rem;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

@keyframes scrollIndicator {
  0% {
    opacity: 0;
    transform: rotate(-45deg) translate(10px, 10px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(-45deg) translate(0, 0);
  }
}
</style>