<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { GraduationCap, Target, BookOpen, TrendingUp } from 'lucide-vue-next'

// Props
interface HeroSectionProps {
  isVisible: boolean
}
const props = defineProps<HeroSectionProps>()

// Animation state
const textVisible = ref(false)

// Optimisation: constantes pour éviter les recalculs
const symbols = [
  { char: '日', x: 10, y: 20, size: 45, rotation: -10, color: '#DEC0F1' },
  { char: '本', x: 85, y: 15, size: 40, rotation: 15, color: '#50C5B7' },
  { char: '語', x: 15, y: 80, size: 50, rotation: 5, color: '#496DDB' },
  { char: '学', x: 90, y: 75, size: 35, rotation: -15, color: '#EFD9CE' },
  { char: '習', x: 50, y: 10, size: 38, rotation: 0, color: '#50C5B7' }
] as const

const centerKanjis = ref([
  { char: '学', meaning: 'study', active: false, color: '#50C5B7' },
  { char: '進', meaning: 'progress', active: false, color: '#496DDB' },
  { char: '成', meaning: 'accomplish', active: false, color: '#DEC0F1' }
])

const featureIcons = [
  { icon: GraduationCap, title: 'All Levels', desc: 'From beginner to pro' },
  { icon: Target, title: 'Gamified Learning', desc: 'Fun interactive games' },
  { icon: BookOpen, title: 'Mojidex', desc: 'Your kanji companion' },
  { icon: TrendingUp, title: 'Track Progress', desc: 'Real-time analytics' }
] as const

// Optimisation: animation avec requestAnimationFrame
onMounted(() => {
  requestAnimationFrame(() => {
    textVisible.value = true
    
    // Animation des kanjis avec délais optimisés
    centerKanjis.value.forEach((kanji, index) => {
      setTimeout(() => {
        kanji.active = true
      }, 800 + index * 400)
    })
  })
})
</script>

<template>
  <section id="hero" class="hero-section">
    <!-- Background symbols -->
    <div class="hero-bg-symbols">
      <div 
        v-for="(symbol, index) in symbols" 
        :key="index"
        class="symbol-static"
        :style="{
          top: `${symbol.y}%`,
          left: `${symbol.x}%`,
          fontSize: `${symbol.size}px`,
          color: symbol.color,
          transform: `rotate(${symbol.rotation}deg)`
        }">
        {{ symbol.char }}
      </div>
    </div>
    
    <!-- Main content -->
    <div class="hero-container">
      <div class="hero-content">
        
        <!-- Text content -->
        <div class="hero-text-section slide-up-fade" :class="{ 'element-visible': textVisible }">
          <div class="hero-text-content">
            <h1 class="hero-title">
              <span class="hero-title-line">Master</span>
              <span class="hero-title-gradient">Japanese</span>
              <span class="hero-title-line">with Nyto</span>
            </h1>
            
            <p class="hero-subtitle">
              Experience a revolutionary way to learn Japanese using a modern app that 
              personalizes your journey and accelerates your progress to fluency.
            </p>
            
            <div class="hero-buttons">
              <button class="btn-primary">
                Start Learning Now
              </button>
              <button class="btn-secondary">
                <BookOpen class="w-5 h-5 mr-2" />
                Explore Mojidex
              </button>
            </div>
          </div>
        </div>
        
        <!-- Visual elements -->
        <div class="hero-visual-section slide-up-fade" :class="{ 'element-visible': textVisible }" style="transition-delay: 0.2s;">
          <div class="visual-container">
            <!-- Background circle -->
            <div class="circle-bg"></div>
            
            <!-- Kanji display -->
            <div class="kanji-display">
              <div 
                v-for="(kanji, index) in centerKanjis" 
                :key="index"
                class="kanji-card"
                :class="{ 'active': kanji.active }"
                :style="{ 
                  backgroundColor: kanji.color,
                  zIndex: centerKanjis.length - index
                }">
                <div class="kanji-char">{{ kanji.char }}</div>
                <div class="kanji-meaning">{{ kanji.meaning }}</div>
              </div>
            </div>
            
            <!-- Decorative text -->
            <div class="decorative-text text-1">文法</div>
            <div class="decorative-text text-2">単語</div>
            <div class="decorative-text text-3">会話</div>
          </div>
        </div>
      </div>
      
      <!-- Features preview -->
      <div class="features-section slide-up-fade" :class="{ 'element-visible': textVisible }" style="transition-delay: 0.4s;">
        <div class="features-grid">
          <div 
            v-for="(feature, index) in featureIcons" 
            :key="index"
            class="feature-card"
            :class="`feature-${index + 1}`">
            <div class="feature-icon-wrapper">
              <component :is="feature.icon" class="feature-icon" />
            </div>
            <div class="feature-title">{{ feature.title }}</div>
            <div class="feature-desc">{{ feature.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Section principale */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 5rem;
  
  /* Mode clair */
  background: linear-gradient(135deg, var(--color-dark-green) 0%, var(--color-blue) 100%);
}

/* Mode sombre - fond plus sombre et contrasté */
.dark .hero-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
}

/* Background effects */
.hero-section::before {
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

.dark .hero-section::before {
  background: 
    radial-gradient(circle at 75% 25%, rgba(80, 197, 183, 0.25) 0%, transparent 50%),
    radial-gradient(circle at 25% 75%, rgba(73, 109, 219, 0.25) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(222, 192, 241, 0.2) 0%, transparent 70%);
  opacity: 1;
}

/* Background symbols */
.hero-bg-symbols {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.symbol-static {
  position: absolute;
  opacity: 0.1;
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 600;
  user-select: none;
  text-shadow: 0 0 8px rgba(222, 192, 241, 0.2);
  transition: opacity 0.3s ease;
}

.dark .symbol-static {
  opacity: 0.15;
  text-shadow: 0 0 12px rgba(222, 192, 241, 0.4);
}

/* Container */
.hero-container {
  position: relative;
  z-index: 10;
  padding: 0 1.5rem;
  margin: 0 auto;
  max-width: 80rem;
  width: 100%;
}

.hero-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

@media (min-width: 1024px) {
  .hero-content {
    flex-direction: row;
  }
}

/* Text section */
.hero-text-section {
  width: 100%;
}

@media (min-width: 1024px) {
  .hero-text-section {
    width: 50%;
  }
}

.hero-text-content {
  padding-right: 0;
  space-y: 1.5rem;
}

@media (min-width: 1024px) {
  .hero-text-content {
    padding-right: 4rem;
  }
}

/* Titre */
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

.dark .hero-title {
  color: #f8fafc;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
}

.hero-title-line {
  display: block;
}

.hero-title-gradient {
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

.dark .hero-title-gradient {
  background: linear-gradient(135deg, #22d3ee 20%, #c084fc 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.9)) drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.7));
}

/* Sous-titre */
.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  font-weight: 400;
  color: var(--color-cream);
  max-width: 600px;
  margin-bottom: 2rem;
}

.dark .hero-subtitle {
  color: #cbd5e1;
}

/* Boutons */
.hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
}

@media (min-width: 640px) {
  .hero-buttons {
    flex-direction: row;
  }
}

.btn-primary {
  padding: 1rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  background: linear-gradient(135deg, var(--color-teal) 0%, #3da89b 100%);
  color: var(--color-dark-green);
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(80, 197, 183, 0.3);
  letter-spacing: 0.5px;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(80, 197, 183, 0.4);
  filter: brightness(1.05);
}

.dark .btn-primary {
  background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%);
  color: #0f172a;
  box-shadow: 0 4px 15px rgba(34, 211, 238, 0.4);
}

.dark .btn-primary:hover {
  box-shadow: 0 6px 20px rgba(34, 211, 238, 0.5);
}

.btn-secondary {
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

.btn-secondary:hover {
  background-color: rgba(222, 192, 241, 0.3);
  border-color: var(--color-teal);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(73, 109, 219, 0.3);
}

.dark .btn-secondary {
  border-color: #c084fc;
  color: #f8fafc;
  background-color: rgba(192, 132, 252, 0.2);
  box-shadow: 0 4px 15px rgba(192, 132, 252, 0.3);
}

.dark .btn-secondary:hover {
  background-color: rgba(192, 132, 252, 0.3);
  border-color: #22d3ee;
  box-shadow: 0 6px 20px rgba(192, 132, 252, 0.4);
}

/* Visual section */
.hero-visual-section {
  width: 100%;
  margin-top: 3rem;
}

@media (min-width: 1024px) {
  .hero-visual-section {
    width: 50%;
    margin-top: 0;
  }
}

.visual-container {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Circle background */
.circle-bg {
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

.dark .circle-bg {
  background: radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(168, 85, 247, 0.2) 70%);
  opacity: 1;
}

/* Kanji display */
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

.dark .kanji-card {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
}

.kanji-char {
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

/* Decorative text */
.decorative-text {
  position: absolute;
  font-family: "Noto Sans JP", sans-serif;
  opacity: 0.2;
  font-weight: bold;
  color: var(--color-cream);
  text-shadow: 0 2px 10px rgba(80, 197, 183, 0.5);
}

.dark .decorative-text {
  color: #f8fafc;
  opacity: 0.3;
  text-shadow: 0 2px 15px rgba(34, 211, 238, 0.7);
}

.text-1 {
  font-size: 1.8rem;
  top: 20%;
  right: 10%;
  color: rgba(222, 192, 241, 0.8);
}

.dark .text-1 {
  color: rgba(192, 132, 252, 0.9);
}

.text-2 {
  font-size: 1.5rem;
  bottom: 25%;
  left: 15%;
  color: rgba(80, 197, 183, 0.8);
}

.dark .text-2 {
  color: rgba(34, 211, 238, 0.9);
}

.text-3 {
  font-size: 2rem;
  top: 60%;
  right: 15%;
  color: rgba(73, 109, 219, 0.8);
}

.dark .text-3 {
  color: rgba(168, 85, 247, 0.9);
}

/* Features section */
.features-section {
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

/* Feature cards avec adaptation dark mode */
.feature-card {
  flex: 1;
  min-width: 180px;
  padding: 1.5rem 1.2rem;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 2px solid rgba(80, 197, 183, 0.4);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-bottom: 5px;
  will-change: transform;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  will-change: auto;
}

/* Styles spécifiques par feature */
.feature-1 {
  background: linear-gradient(to bottom right, var(--color-cream), rgba(73, 109, 219, 0.2));
  border-color: rgba(73, 109, 219, 0.6);
}

.dark .feature-1 {
  background: linear-gradient(to bottom right, #334155, rgba(168, 85, 247, 0.3));
  border-color: rgba(168, 85, 247, 0.7);
}

.feature-2 {
  background: linear-gradient(to bottom right, var(--color-cream), rgba(80, 197, 183, 0.2));
  border-color: rgba(80, 197, 183, 0.6);
}

.dark .feature-2 {
  background: linear-gradient(to bottom right, #334155, rgba(34, 211, 238, 0.3));
  border-color: rgba(34, 211, 238, 0.7);
}

.feature-3 {
  background: linear-gradient(to bottom right, var(--color-cream), rgba(222, 192, 241, 0.2));
  border-color: rgba(222, 192, 241, 0.6);
}

.dark .feature-3 {
  background: linear-gradient(to bottom right, #334155, rgba(192, 132, 252, 0.3));
  border-color: rgba(192, 132, 252, 0.7);
}

.feature-4 {
  background: linear-gradient(to bottom right, var(--color-cream), rgba(239, 217, 206, 0.2));
  border-color: rgba(239, 217, 206, 0.6);
}

.dark .feature-4 {
  background: linear-gradient(to bottom right, #334155, rgba(251, 146, 60, 0.3));
  border-color: rgba(251, 146, 60, 0.7);
}

.dark .feature-card:hover {
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
}

/* Icon wrapper */
.feature-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark .feature-icon-wrapper {
  background: rgba(15, 23, 42, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.feature-icon {
  width: 28px;
  height: 28px;
  color: var(--color-dark-green);
}

.dark .feature-icon {
  color: #f8fafc;
}

.feature-title {
  font-weight: 700;
  color: var(--color-dark-green);
  letter-spacing: 0.3px;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

.dark .feature-title {
  color: #f8fafc;
}

.feature-desc {
  font-size: 0.85rem;
  color: rgba(20, 52, 43, 0.8);
  line-height: 1.2;
  font-weight: 500;
}

.dark .feature-desc {
  color: rgba(248, 250, 252, 0.7);
}

/* Animations */
.slide-up-fade {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.element-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 640px) {
  .features-grid {
    gap: 1rem;
  }
  
  .feature-card {
    min-width: calc(50% - 0.5rem);
  }
}

@media (max-width: 400px) {
  .feature-card {
    min-width: 100%;
  }
}
</style>