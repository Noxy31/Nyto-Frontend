<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import MojidexCardPreview from '@/components/MojidexComponents/MojidexCardPreview.vue';

// Props
interface MojidexSectionProps {
  isVisible: boolean;
}

const props = defineProps<MojidexSectionProps>();

// Animation states
const animationActive = ref<boolean>(false);
const textVisible = ref<boolean>(false);
const cardsVisible = ref<boolean>(false);

// Yokai card types
interface YokaiCard {
  id: number;
  type: 'kanji' | 'word' | 'character';
  name: string;
  japanese: string;
  romaji: string;
  rarity: 'common' | 'rare' | 'legendary' | 'mythic';
  category: string;
  unlocked: boolean;
  image?: string;
  color: string;
  level?: number;
  description?: string;
  quote?: string; // Nouvelle propriété pour les commentaires
}

// Sample Yokai cards data with real images and quotes
const yokaiCards = reactive<YokaiCard[]>([
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
    image: '/src/assets/Mojidex/Yokai/侍 - さむらい - The Rabbit Samourai - 1.png',
    quote: 'A humble bunny begins its warrior journey.'
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
    image: '/src/assets/Mojidex/Yokai/侍 - さむらい - The Rabbit Samourai - 2.png',
    quote: "Through discipline, the rabbit's blade grows sharper, its spirit unbreakable."
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
    image: '/src/assets/Mojidex/Yokai/侍 - さむらい - The Rabbit Samourai - 3.png',
    quote: 'The legendary rabbit whose hop splits mountains, whose honor outshines the harvest moon.'
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
    image: '/src/assets/Mojidex/Yokai/侍 - さむらい - The Rabbit Samourai - 4.png',
    quote: 'Transcending mortality, the Mythic Rabbit dances between worlds, its blade cutting reality itself.'
  }
]);

// Rarity colors and effects
const rarityConfig = {
  common: { color: '#50C5B7', glow: 'rgba(80, 197, 183, 0.3)' },
  rare: { color: '#496DDB', glow: 'rgba(73, 109, 219, 0.4)' },
  legendary: { color: '#DEC0F1', glow: 'rgba(222, 192, 241, 0.5)' },
  mythic: { color: '#FFD700', glow: 'rgba(255, 215, 0, 0.6)' }
};

// Current selected card for detail view
const selectedCard = ref<YokaiCard | null>(null);

// Initialize animations
onMounted(() => {
  requestAnimationFrame(() => {
    animationActive.value = true;
    textVisible.value = true;
    
    setTimeout(() => {
      cardsVisible.value = true;
    }, 500);
  });
});

// Stats for progress display
const mojidexStats = reactive({
  totalCards: 1200,
  unlockedCards: 156,
  kanjiMastered: 89,
  wordsLearned: 435,
  rarityBreakdown: {
    common: 85,
    rare: 45,
    legendary: 20,
    mythic: 6
  }
});

const progressPercentage = computed(() => 
  Math.round((mojidexStats.unlockedCards / mojidexStats.totalCards) * 100)
);
</script>

<template>
  <section id="mojidex" class="min-h-screen relative overflow-hidden mojidex-background">
    <!-- Main content container -->
    <div class="container mx-auto px-6 md:px-12 py-20 relative z-10">
      <!-- Header section -->
      <div class="text-center mb-16 slide-up-fade" :class="{ 'element-visible': textVisible }">
        <h2 class="section-title mb-6">
          <span class="block">Discover the</span>
          <span class="gradient-text-mojidex">Mojidex</span>
        </h2>
        
        <p class="section-subtitle max-w-3xl mx-auto">
          A revolutionary Pokédex-style collection system for Japanese characters and words. 
          Each kanji and word is represented by a unique Yokai spirit, turning language learning 
          into an exciting collection adventure with rare finds and mythical discoveries.
        </p>
      </div>

      <!-- Progress stats -->
      <div class="mb-12 slide-up-fade" :class="{ 'element-visible': textVisible }" style="transition-delay: 0.2s;">
        <div class="stats-container">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value">{{ mojidexStats.unlockedCards }}</div>
              <div class="stat-label">Cards Unlocked</div>
              <div class="stat-progress">
                <div class="progress-bar" :style="{ width: `${progressPercentage}%` }"></div>
              </div>
            </div>
            
            <div class="stat-item">
              <div class="stat-value">{{ mojidexStats.kanjiMastered }}</div>
              <div class="stat-label">Kanji Mastered</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-value">{{ mojidexStats.wordsLearned }}</div>
              <div class="stat-label">Words Learned</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-value">{{ mojidexStats.rarityBreakdown.mythic }}</div>
              <div class="stat-label">Mythic Yokai</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Yokai cards grid -->
      <div class="cards-grid slide-up-fade" :class="{ 'element-visible': cardsVisible }">
        <MojidexCardPreview
          v-for="card in yokaiCards"
          :key="card.id"
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
          @click="selectedCard = card"
        />
      </div>

      <!-- Features showcase -->
      <div class="features-section mt-20 slide-up-fade" :class="{ 'element-visible': textVisible }" style="transition-delay: 0.5s;">
        <h3 class="features-title">What Makes Mojidex Special</h3>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎴</div>
            <h4 class="feature-name">Yokai Collection</h4>
            <p class="feature-desc">
              Every kanji and word is represented by a unique Yokai spirit with detailed lore and personality.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⚔️</div>
            <h4 class="feature-name">Rarity System</h4>
            <p class="feature-desc">
              From common spirits to mythic legends, discover rare Yokai as you progress in your learning journey.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📚</div>
            <h4 class="feature-name">Complete Information</h4>
            <p class="feature-desc">
              Each card contains all forms, conjugations, and uses - your comprehensive reference companion.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h4 class="feature-name">Gamified Progress</h4>
            <p class="feature-desc">
              Track your collection, complete sets, and unlock special rewards as you master the language.
            </p>
          </div>
        </div>
      </div>

      <!-- Call to action -->
      <div class="cta-section text-center mt-16 slide-up-fade" :class="{ 'element-visible': textVisible }" style="transition-delay: 0.6s;">
        <h3 class="cta-title">Ready to Start Your Collection?</h3>
        <p class="cta-subtitle">Join thousands of learners discovering Japanese through the power of Yokai spirits.</p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button class="primary-button">
            Explore Mojidex
          </button>
          <button class="secondary-button">
            View My Collection
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Color variables matching Hero section */
:root {
  --color-cream: #EFD9CE;
  --color-lavender: #DEC0F1;
  --color-teal: #50C5B7;
  --color-blue: #496DDB;
  --color-dark-green: #14342B;
  --color-gold: #FFD700;
}

/* Background styling */
.mojidex-background {
  background: linear-gradient(135deg, var(--color-cream) 0%, rgba(222, 192, 241, 0.3) 50%, rgba(80, 197, 183, 0.2) 100%);
  position: relative;
}

.mojidex-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(80, 197, 183, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 60%, rgba(222, 192, 241, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 50% 90%, rgba(73, 109, 219, 0.1) 0%, transparent 60%);
  opacity: 0.9;
  z-index: 0;
}

/* Typography */
.section-title {
  font-size: 3.5rem;
  line-height: 1.1;
  font-weight: 800;
  color: var(--color-dark-green);
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .section-title {
    font-size: 4.5rem;
  }
}

.gradient-text-mojidex {
  background: linear-gradient(135deg, #50C5B7 20%, #DEC0F1 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  position: relative;
  font-weight: 900;
  text-shadow: none;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.8)) drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
}

.section-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--color-dark-green);
  opacity: 0.9;
}

/* Stats container */
.stats-container {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(80, 197, 183, 0.2);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-blue);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-dark-green);
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-progress {
  margin-top: 0.5rem;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-teal), var(--color-blue));
  border-radius: 2px;
  transition: width 0.8s ease;
}

/* Yokai cards grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

/* Features section */
.features-section {
  padding: 3rem 0;
}

.features-title {
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  color: var(--color-dark-green);
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--color-teal);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.feature-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-dark-green);
  margin-bottom: 0.75rem;
}

.feature-desc {
  font-size: 0.95rem;
  color: var(--color-dark-green);
  opacity: 0.8;
  line-height: 1.5;
}

/* CTA section */
.cta-section {
  margin-top: 4rem;
  padding: 3rem;
  background: linear-gradient(135deg, rgba(80, 197, 183, 0.1) 0%, rgba(222, 192, 241, 0.1) 100%);
  border-radius: 30px;
  backdrop-filter: blur(10px);
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-dark-green);
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1.1rem;
  color: var(--color-dark-green);
  opacity: 0.9;
  margin-bottom: 2rem;
}

/* Buttons */
.primary-button {
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  background: linear-gradient(135deg, var(--color-teal) 0%, #3da89b 100%);
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(80, 197, 183, 0.3);
}

.primary-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(80, 197, 183, 0.4);
  filter: brightness(1.05);
}

.secondary-button {
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid var(--color-blue);
  color: var(--color-blue);
  background-color: transparent;
  transition: all 0.3s ease;
}

.secondary-button:hover {
  background-color: var(--color-blue);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(73, 109, 219, 0.3);
}

/* Animation utilities */
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .yokai-card {
    aspect-ratio: 1;
  }
  
  .japanese-char {
    font-size: 3rem;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .stat-value {
    font-size: 2rem;
  }
  
  .features-title, .cta-title {
    font-size: 2rem;
  }
}
</style>