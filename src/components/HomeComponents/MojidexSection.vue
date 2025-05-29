<script setup lang="ts">
import { ref, onMounted, computed, shallowRef, markRaw } from 'vue'
import { Brain, BookOpen, Gamepad2, TrendingUp, Zap, Award, Search } from 'lucide-vue-next'
import MojidexCardPreview from '@/components/MojidexComponents/MojidexCardPreview.vue'
import KanjiCardDetails from '@/components/MojidexComponents/KanjiCardDetails.vue'

// Props
interface MojidexSectionProps {
  isVisible: boolean
}
const props = defineProps<MojidexSectionProps>()

// Animation states
const textVisible = ref(false)
const cardsVisible = ref(false)
const selectedCardId = ref<number | null>(null)
const showCardDetails = ref(false)

// Yokai card interface
interface YokaiCard {
  id: number
  type: 'kanji' | 'word' | 'character'
  name: string
  japanese: string
  romaji: string
  rarity: 'common' | 'rare' | 'legendary' | 'mythic'
  category: string
  unlocked: boolean
  image?: string
  color: string
  level?: number
  description?: string
  quote?: string
  kunyomi?: string
  onyomi?: string
  meaning?: string
  radical?: string
  isJoyo?: boolean
  compounds?: Array<{
    kanji: string
    reading: string
    meaning: string
    explanation?: string
    kanjiBreakdown?: string
  }>
}

// Optimisation: shallowRef pour les données statiques
const yokaiCards = shallowRef<YokaiCard[]>([
  {
    id: 1,
    type: 'kanji',
    name: 'The Rabbit Samurai',
    japanese: '侍',
    romaji: 'Samurai',
    rarity: 'common',
    category: 'Warrior',
    unlocked: true,
    color: '#CC4A4A',
    level: 1,
    description: 'A noble rabbit warrior',
    image: '/images/yokai/侍 - さむらい - The Rabbit Samourai - 1.png',
    quote: 'A humble bunny begins its warrior journey.',
    kunyomi: 'さむらい',
    onyomi: 'ジ、シ',
    meaning: 'Samurai, warrior, attendant',
    radical: '亻 (person)',
    isJoyo: false,
    compounds: [
      {
        kanji: '侍女（じじょ）',
        reading: 'Jijo',
        meaning: 'Maid, lady-in-waiting',
        kanjiBreakdown: '侍 (to serve) + 女 (woman)'
      },
      {
        kanji: '武士（ぶし）',
        reading: 'Bushi',
        meaning: 'Warrior, samurai',
        explanation: 'This term is more commonly used than 侍 to refer to the samurai class.',
        kanjiBreakdown: '武 (war) + 士 (man, warrior)'
      }
    ]
  },
  {
    id: 2,
    type: 'kanji',
    name: 'The Rabbit Samurai',
    japanese: '侍',
    romaji: 'Samurai',
    rarity: 'rare',
    category: 'Warrior',
    unlocked: true,
    color: '#2D5DB5',
    level: 3,
    description: 'A skilled rabbit warrior',
    image: '/images/yokai/侍 - さむらい - The Rabbit Samourai - 2.png',
    quote: "Through discipline, the rabbit's blade grows sharper, its spirit unbreakable.",
    kunyomi: 'さむらい',
    onyomi: 'ジ、シ',
    meaning: 'Samurai, warrior, attendant',
    radical: '亻 (person)',
    isJoyo: false,
    compounds: [
      {
        kanji: '侍女（じじょ）',
        reading: 'Jijo',
        meaning: 'Maid, lady-in-waiting',
        kanjiBreakdown: '侍 (to serve) + 女 (woman)'
      },
      {
        kanji: '武士（ぶし）',
        reading: 'Bushi',
        meaning: 'Warrior, samurai',
        explanation: 'This term is more commonly used than 侍 to refer to the samurai class.',
        kanjiBreakdown: '武 (war) + 士 (man, warrior)'
      }
    ]
  },
  {
    id: 3,
    type: 'kanji',
    name: 'The Rabbit Samurai',
    japanese: '侍',
    romaji: 'Samurai',
    rarity: 'legendary',
    category: 'Warrior',
    unlocked: true,
    color: '#4B9A72',
    level: 7,
    description: 'A legendary rabbit warrior',
    image: '/images/yokai/侍 - さむらい - The Rabbit Samourai - 3.png',
    quote: 'The legendary rabbit whose hop splits mountains, whose honor outshines the harvest moon.',
    kunyomi: 'さむらい',
    onyomi: 'ジ、シ',
    meaning: 'Samurai, warrior, attendant',
    radical: '亻 (person)',
    isJoyo: false,
    compounds: [
      {
        kanji: '侍女（じじょ）',
        reading: 'Jijo',
        meaning: 'Maid, lady-in-waiting',
        kanjiBreakdown: '侍 (to serve) + 女 (woman)'
      },
      {
        kanji: '武士（ぶし）',
        reading: 'Bushi',
        meaning: 'Warrior, samurai',
        explanation: 'This term is more commonly used than 侍 to refer to the samurai class.',
        kanjiBreakdown: '武 (war) + 士 (man, warrior)'
      }
    ]
  },
  {
    id: 4,
    type: 'kanji',
    name: 'The Rabbit Samurai',
    japanese: '侍',
    romaji: 'Samurai',
    rarity: 'mythic',
    category: 'Warrior',
    unlocked: true,
    color: '#6B5D8F',
    level: 10,
    description: 'The ultimate rabbit warrior',
    image: '/images/yokai/侍 - さむらい - The Rabbit Samourai - 4.png',
    quote: 'Transcending mortality, the Mythic Rabbit dances between worlds, its blade cutting reality itself.',
    kunyomi: 'さむらい',
    onyomi: 'ジ、シ',
    meaning: 'Samurai, warrior, attendant',
    radical: '亻 (person)',
    isJoyo: false,
    compounds: [
      {
        kanji: '侍女（じじょ）',
        reading: 'Jijo',
        meaning: 'Maid, lady-in-waiting',
        kanjiBreakdown: '侍 (to serve) + 女 (woman)'
      },
      {
        kanji: '武士（ぶし）',
        reading: 'Bushi',
        meaning: 'Warrior, samurai',
        explanation: 'This term is more commonly used than 侍 to refer to the samurai class. While 侍 and 武士 can both refer to samurai, 侍 is more often used for the individual figure, whereas 武士 refers to the broader, institutional class.',
        kanjiBreakdown: '武 (war) + 士 (man, warrior)'
      }
    ]
  }
] as const)

// Optimisation: markRaw pour les icônes statiques
const icons = markRaw({
  // Feature icons
  collection: BookOpen,
  rarity: Award,
  information: Search,
  progress: TrendingUp,
  // Benefit icons
  memory: Brain,
  story: BookOpen,
  gamified: Gamepad2,
  // Spirit icons
  yokai: Zap,
  brain: Brain
})

// Methods optimisés
const handleCardClick = (card: YokaiCard): void => {
  selectedCardId.value = card.id
  showCardDetails.value = true
  document.documentElement.style.overflow = 'hidden'
}

const handleDetailsClose = (): void => {
  showCardDetails.value = false
  selectedCardId.value = null
  document.documentElement.style.overflow = ''
}

// Computed optimisé
const selectedCard = computed(() => {
  if (!selectedCardId.value) return null
  return yokaiCards.value.find(card => card.id === selectedCardId.value) || null
})

// Optimisation: gestion des animations
let animationTimeouts: ReturnType<typeof setTimeout>[] = []

const scheduleAnimations = (): void => {
  // Nettoyer les anciens timeouts
  animationTimeouts.forEach(timeout => clearTimeout(timeout))
  animationTimeouts = []
  
  animationTimeouts.push(setTimeout(() => {
    textVisible.value = true
  }, 100))
  
  animationTimeouts.push(setTimeout(() => {
    cardsVisible.value = true
  }, 300))
}

// Lifecycle optimisé
onMounted(() => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(scheduleAnimations)
  } else {
    requestAnimationFrame(scheduleAnimations)
  }
})
</script>

<template>
  <section id="mojidex" class="mojidex-section">
    <!-- Background ambient effect -->
    <div class="mojidex-bg-effect"></div>

    <!-- Main content container -->
    <div class="mojidex-container">
      
      <!-- Header section -->
      <div class="mojidex-header slide-up-fade" :class="{ 'element-visible': textVisible }">
        <h2 class="mojidex-title">
          <span class="title-line">Discover the</span>
          <span class="title-gradient">Mojidex</span>
        </h2>
        
        <p class="mojidex-subtitle">
          A revolutionary Pokédex-style collection system for Japanese characters and words. 
          Each kanji and word is represented by a unique Yokai spirit, turning language learning 
          into an exciting collection adventure with rare finds and mythical discoveries.
        </p>
      </div>

      <!-- Yokai explanation section -->
      <div class="yokai-explanation slide-up-fade" :class="{ 'element-visible': textVisible }">
        <div class="explanation-card">
          <div class="explanation-grid">
            
            <!-- Yokai info section -->
            <div class="info-section">
              <div class="info-header">
                <div class="info-icon">
                  <component :is="icons.yokai" class="icon" />
                </div>
                <h3 class="info-title">The Spirit of Learning</h3>
              </div>
              <p class="info-text">
                In Japanese folklore, <span class="highlight-text">Yokai</span> are supernatural beings that embody 
                the mysteries and wonders of nature. Each spirit carries unique characteristics, stories, and powers 
                that have captivated imaginations for centuries.
              </p>
            </div>
            
            <!-- Mojidex benefit section -->
            <div class="info-section">
              <div class="info-header">
                <div class="info-icon">
                  <component :is="icons.brain" class="icon" />
                </div>
                <h3 class="info-title">Memory Through Stories</h3>
              </div>
              <p class="info-text">
                Our Mojidex transforms each kanji into a memorable Yokai character, creating 
                <span class="highlight-text">visual and emotional connections</span> that enhance retention. 
                By associating characters with unique spirits and their evolving stories, 
                learning becomes an adventure where every new word is a discovery.
              </p>
            </div>
          </div>
          
          <!-- Learning benefits -->
          <div class="benefits-section">
            <div class="benefit-pill">
              <div class="benefit-icon">
                <component :is="icons.memory" class="benefit-icon-sm" />
              </div>
              <span class="benefit-text">Enhanced memory through visual association</span>
            </div>
            <div class="benefit-pill">
              <div class="benefit-icon">
                <component :is="icons.story" class="benefit-icon-sm" />
              </div>
              <span class="benefit-text">Story-based learning for deeper understanding</span>
            </div>
            <div class="benefit-pill">
              <div class="benefit-icon">
                <component :is="icons.gamified" class="benefit-icon-sm" />
              </div>
              <span class="benefit-text">Gamified progression with collectible rewards</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Yokai cards grid -->
      <div class="cards-section">
        <div class="cards-grid slide-up-fade" :class="{ 'element-visible': cardsVisible }">
          <div 
            v-for="card in yokaiCards"
            :key="card.id"
            v-memo="[card.id, card.rarity, card.unlocked]"
            class="card-wrapper"
            @click="handleCardClick(card)"
            tabindex="0"
            role="button"
            :aria-label="`View details for ${card.name}`"
          >
            <MojidexCardPreview
              :type="card.type"
              :name="card.name"
              :japanese="card.japanese"
              :romaji="card.romaji"
              :rarity="card.rarity"
              :category="card.category"
              :unlocked="card.unlocked"
              :color="card.color"
              :level="card.level"
              :description="card.description"
              :image-url="card.image"
              :quote="card.quote"
            />
          </div>
        </div>
      </div>

      <!-- Features showcase -->
      <div class="features-showcase slide-up-fade" :class="{ 'element-visible': textVisible }">
        <h3 class="features-title">What Makes Mojidex Special</h3>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <component :is="icons.collection" class="feature-icon" />
            </div>
            <h4 class="feature-card-title">Yokai Collection</h4>
            <p class="feature-card-text">
              Every kanji and word is represented by a unique Yokai spirit with detailed lore and personality.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <component :is="icons.rarity" class="feature-icon" />
            </div>
            <h4 class="feature-card-title">Rarity System</h4>
            <p class="feature-card-text">
              From common spirits to mythic legends, discover rare Yokai as you progress in your learning journey.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <component :is="icons.information" class="feature-icon" />
            </div>
            <h4 class="feature-card-title">Complete Information</h4>
            <p class="feature-card-text">
              Each card contains all forms, conjugations, and uses - your comprehensive reference companion.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <component :is="icons.progress" class="feature-icon" />
            </div>
            <h4 class="feature-card-title">Gamified Progress</h4>
            <p class="feature-card-text">
              Track your collection, complete sets, and unlock special rewards as you master the language.
            </p>
          </div>
        </div>
      </div>

      <!-- Call to action -->
      <div class="cta-section slide-up-fade" :class="{ 'element-visible': textVisible }">
        <h3 class="cta-title">Ready to Start Your Collection?</h3>
        <p class="cta-subtitle">Join thousands of learners discovering Japanese through the power of Yokai spirits.</p>
        
        <div class="cta-buttons">
          <button class="btn-primary">
            Explore Mojidex
          </button>
          <button class="btn-secondary">
            View My Collection
          </button>
        </div>
      </div>
    </div>

    <!-- Modal for card details -->
    <Teleport to="body">
      <KanjiCardDetails 
        v-if="selectedCard && showCardDetails"
        :kanji="selectedCard"
        :is-visible="showCardDetails"
        @close="handleDetailsClose"
      />
    </Teleport>
  </section>
</template>

<style scoped>
/* Section principale */
.mojidex-section {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  
  /* Mode clair */
  background: linear-gradient(135deg, var(--color-cream) 0%, rgba(222, 192, 241, 0.3) 50%, rgba(80, 197, 183, 0.2) 100%);
}

/* Mode sombre - fond plus sombre avec nuances colorées */
.dark .mojidex-section {
  background: linear-gradient(135deg, #0f172a 0%, rgba(30, 41, 59, 0.8) 30%, rgba(51, 65, 85, 0.6) 70%, #1e293b 100%);
}

/* Background ambient effect */
.mojidex-bg-effect {
  position: absolute;
  inset: 0;
  opacity: 0.6;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle at 50% 50%, rgba(80, 197, 183, 0.05) 0%, transparent 70%);
}

.dark .mojidex-bg-effect {
  opacity: 0.8;
  background: radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 70%);
}

/* Container */
.mojidex-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  position: relative;
  z-index: 10;
}

@media (min-width: 768px) {
  .mojidex-container {
    padding: 5rem 3rem;
  }
}

/* Header section */
.mojidex-header {
  text-align: center;
  margin-bottom: 4rem;
}

.mojidex-title {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.2;
  color: var(--color-dark-green);
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .mojidex-title {
    font-size: 5rem;
  }
}

@media (min-width: 1024px) {
  .mojidex-title {
    font-size: 6rem;
  }
}

.dark .mojidex-title {
  color: #f8fafc;
}

.title-line {
  display: block;
}

.title-gradient {
  background: linear-gradient(135deg, #50C5B7 20%, #DEC0F1 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  font-weight: 900;
}

.dark .title-gradient {
  background: linear-gradient(135deg, #22d3ee 20%, #c084fc 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.mojidex-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(20, 52, 43, 0.9);
  max-width: 48rem;
  margin: 0 auto;
}

.dark .mojidex-subtitle {
  color: rgba(203, 213, 225, 0.9);
}

/* Yokai explanation */
.yokai-explanation {
  margin-bottom: 3rem;
  transition: all 0.5s ease;
  transition-delay: 0.2s;
}

.explanation-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(222, 192, 241, 0.2);
  position: relative;
}

.dark .explanation-card {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(192, 132, 252, 0.3);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

@media (min-width: 768px) {
  .explanation-card {
    padding: 2.5rem;
  }
}

.explanation-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .explanation-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.info-section {
  /* Styles pour chaque section d'info */
}

.info-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.info-icon {
  width: 3rem;
  height: 3rem;
  background: var(--color-teal);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.dark .info-icon {
  background: #22d3ee;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-dark-green);
}

.dark .icon {
  color: #0f172a;
}

.info-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-dark-green);
}

.dark .info-title {
  color: #f8fafc;
}

.info-text {
  color: rgba(20, 52, 43, 0.9);
  line-height: 1.6;
  font-size: 1.125rem;
}

.dark .info-text {
  color: rgba(203, 213, 225, 0.9);
}

.highlight-text {
  color: var(--color-blue);
  font-weight: 600;
  border-bottom: 2px solid var(--color-teal);
  padding-bottom: 1px;
}

.dark .highlight-text {
  color: #3b82f6;
  border-bottom-color: #22d3ee;
}

/* Benefits section */
.benefits-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 2px solid rgba(80, 197, 183, 0.2);
}

.dark .benefits-section {
  border-top-color: rgba(34, 211, 238, 0.3);
}

.benefit-pill {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(80, 197, 183, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(80, 197, 183, 0.3);
  transition: all 0.3s ease;
}

.benefit-pill:hover {
  background: rgba(80, 197, 183, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dark .benefit-pill {
  background: rgba(34, 211, 238, 0.15);
  border-color: rgba(34, 211, 238, 0.4);
}

.dark .benefit-pill:hover {
  background: rgba(34, 211, 238, 0.25);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.benefit-icon {
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, var(--color-teal), var(--color-blue));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark .benefit-icon {
  background: linear-gradient(135deg, #22d3ee, #3b82f6);
}

.benefit-icon-sm {
  width: 1rem;
  height: 1rem;
  color: var(--color-dark-green);
}

.dark .benefit-icon-sm {
  color: #0f172a;
}

.benefit-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-dark-green);
}

.dark .benefit-text {
  color: #f8fafc;
}

/* Cards section */
.cards-section {
  position: relative;
  min-height: 400px;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
}

@media (min-width: 640px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.card-wrapper {
  cursor: pointer;
  transition: all 0.3s ease;
  will-change: transform;
}

.card-wrapper:hover {
  transform: translateY(-8px) scale(1.05);
  will-change: auto;
}

/* Features showcase */
.features-showcase {
  padding: 3rem 0;
  margin-top: 5rem;
  transition: all 0.5s ease;
  transition-delay: 0.5s;
}

.features-title {
  font-size: 3rem;
  font-weight: 900;
  text-align: center;
  color: var(--color-dark-green);
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .features-title {
    font-size: 4rem;
  }
}

.dark .features-title {
  color: #f8fafc;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.feature-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: var(--color-teal);
}

.dark .feature-card {
  background: rgba(30, 41, 59, 0.9);
}

.dark .feature-card:hover {
  border-color: #22d3ee;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.feature-icon-wrapper {
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, var(--color-teal), var(--color-blue));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.dark .feature-icon-wrapper {
  background: linear-gradient(135deg, #22d3ee, #3b82f6);
}

.feature-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--color-dark-green);
}

.dark .feature-icon {
  color: #0f172a;
}

.feature-card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-dark-green);
  margin-bottom: 0.75rem;
}

.dark .feature-card-title {
  color: #f8fafc;
}

.feature-card-text {
  font-size: 0.875rem;
  color: rgba(20, 52, 43, 0.8);
  line-height: 1.5;
}

.dark .feature-card-text {
  color: rgba(203, 213, 225, 0.8);
}

/* Call to action section */
.cta-section {
  text-align: center;
  margin-top: 4rem;
  padding: 3rem;
  background: linear-gradient(135deg, rgba(80, 197, 183, 0.1) 0%, rgba(222, 192, 241, 0.1) 100%);
  border-radius: 1.5rem;
  backdrop-filter: blur(8px);
  transition: all 0.5s ease;
  transition-delay: 0.7s;
}

.dark .cta-section {
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, rgba(192, 132, 252, 0.15) 100%);
}

.cta-title {
  font-size: 3rem;
  font-weight: 900;
  color: var(--color-dark-green);
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .cta-title {
    font-size: 4rem;
  }
}

.dark .cta-title {
  color: #f8fafc;
}

.cta-subtitle {
  font-size: 1.125rem;
  color: rgba(20, 52, 43, 0.9);
  margin-bottom: 2rem;
}

.dark .cta-subtitle {
  color: rgba(203, 213, 225, 0.9);
}

.cta-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

@media (min-width: 640px) {
  .cta-buttons {
    flex-direction: row;
  }
}

.btn-primary {
  padding: 1rem 2.5rem;
  border-radius: 9999px;
  font-weight: 600;
  color: var(--color-dark-green);
  background: linear-gradient(135deg, var(--color-teal) 0%, #3da89b 100%);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.dark .btn-primary {
  background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%);
  color: #0f172a;
}

.btn-secondary {
  padding: 1rem 2.5rem;
  border-radius: 9999px;
  font-weight: 600;
  border: 2px solid var(--color-blue);
  color: var(--color-dark-green);
  background: transparent;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--color-dark-green);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  border-color: var(--color-dark-green);
}

.dark .btn-secondary {
  border-color: #3b82f6;
  color: #f8fafc;
}

.dark .btn-secondary:hover {
  background: #3b82f6;
  color: #0f172a;
  border-color: #3b82f6;
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

/* Performance optimizations */
@media (prefers-reduced-motion: reduce) {
  .slide-up-fade,
  .card-wrapper,
  .feature-card,
  .benefit-pill,
  .btn-primary,
  .btn-secondary {
    transition: none !important;
  }
  
  .card-wrapper:hover,
  .feature-card:hover {
    transform: none !important;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .mojidex-container {
    padding: 3rem 1rem;
  }
  
  .mojidex-title {
    font-size: 2.5rem;
  }
  
  .explanation-card {
    padding: 1.5rem;
  }
  
  .benefit-pill {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .benefit-text {
    font-size: 0.75rem;
  }
  
  .features-title {
    font-size: 2rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
}
</style>