<script setup lang="ts">
import { ref, onMounted, computed, shallowRef, markRaw } from 'vue';
import { Brain, BookOpen, Gamepad2, TrendingUp, Zap, Award, Search } from 'lucide-vue-next';
import MojidexCardPreview from '@/components/MojidexComponents/MojidexCardPreview.vue';
import KanjiCardDetails from '@/components/MojidexComponents/KanjiCardDetails.vue';

// Props
interface MojidexSectionProps {
  isVisible: boolean;
}

const props = defineProps<MojidexSectionProps>();

// Animation states
const textVisible = ref<boolean>(false);
const cardsVisible = ref<boolean>(false);
const selectedCardId = ref<number | null>(null);
const showCardDetails = ref<boolean>(false);

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
  quote?: string;
  kunyomi?: string;
  onyomi?: string;
  meaning?: string;
  radical?: string;
  isJoyo?: boolean;
  compounds?: Array<{
    kanji: string;
    reading: string;
    meaning: string;
    explanation?: string;
    kanjiBreakdown?: string;
  }>;
}

// OPTIMISATION : Utiliser shallowRef pour les données statiques
const yokaiCards = shallowRef<YokaiCard[]>([
  {
    id: 1,
    type: 'kanji' as const,
    name: 'The Rabbit Samurai',
    japanese: '侍',
    romaji: 'Samurai',
    rarity: 'common' as const,
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
    type: 'kanji' as const,
    name: 'The Rabbit Samurai',
    japanese: '侍',
    romaji: 'Samurai',
    rarity: 'rare' as const,
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
    type: 'kanji' as const,
    name: 'The Rabbit Samurai',
    japanese: '侍',
    romaji: 'Samurai',
    rarity: 'legendary' as const,
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
    type: 'kanji' as const,
    name: 'The Rabbit Samurai',
    japanese: '侍',
    romaji: 'Samurai',
    rarity: 'mythic' as const,
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
]);

// OPTIMISATION : Utiliser markRaw pour les icônes statiques (suppression des imports inutilisés)
const featureIcons = markRaw({
  collection: BookOpen,
  rarity: Award,
  information: Search,
  progress: TrendingUp
});

const benefitIcons = markRaw({
  memory: Brain,
  story: BookOpen,
  gamified: Gamepad2
});

const spiritIcons = markRaw({
  yokai: Zap,
  memory: Brain
});

// Handle card click - optimized
const handleCardClick = (card: YokaiCard) => {
  selectedCardId.value = card.id;
  showCardDetails.value = true;
  document.documentElement.style.overflow = 'hidden';
};

// Handle details close - optimized
const handleDetailsClose = () => {
  showCardDetails.value = false;
  selectedCardId.value = null;
  document.documentElement.style.overflow = '';
};

// Get selected card - memoized
const selectedCard = computed(() => {
  if (!selectedCardId.value) return null;
  return yokaiCards.value.find(card => card.id === selectedCardId.value) || null;
});

// OPTIMISATION : Initialize animations avec debounce
let animationTimeout: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  if (animationTimeout) {
    clearTimeout(animationTimeout);
  }
  
  const scheduleAnimation = () => {
    animationTimeout = setTimeout(() => {
      textVisible.value = true;
      
      animationTimeout = setTimeout(() => {
        cardsVisible.value = true;
      }, 200);
    }, 100);
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(scheduleAnimation);
  } else {
    requestAnimationFrame(scheduleAnimation);
  }
});
</script>

<template>
  <section id="mojidex" class="min-h-screen relative overflow-hidden mojidex-background">
    <!-- Background ambient effect -->
    <div class="absolute inset-0 opacity-60 pointer-events-none z-0 bg-radial-gradient from-[#50C5B7]/5 via-transparent to-transparent"></div>

    <!-- Main content container -->
    <div class="container mx-auto px-6 md:px-12 py-20 relative z-10">
      <!-- Header section -->
      <div class="text-center mb-16 slide-up-fade" :class="{ 'element-visible': textVisible }">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-[#14342B] mb-6">
          <span class="block">Discover the</span>
          <span class="bg-gradient-to-r from-[#50C5B7] to-[#DEC0F1] bg-clip-text text-transparent font-black">
            Mojidex
          </span>
        </h2>
        
        <p class="text-xl leading-relaxed text-[#14342B]/90 max-w-3xl mx-auto">
          A revolutionary Pokédex-style collection system for Japanese characters and words. 
          Each kanji and word is represented by a unique Yokai spirit, turning language learning 
          into an exciting collection adventure with rare finds and mythical discoveries.
        </p>
      </div>

      <!-- Yokai explanation section -->
      <div class="mb-12 slide-up-fade transition-all duration-500 delay-200" :class="{ 'element-visible': textVisible }">
        <div class="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-lg border border-[#DEC0F1]/20 relative">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <!-- Yokai info section -->
            <div>
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-[#50C5B7] rounded-full flex items-center justify-center shadow-md">
                  <component :is="spiritIcons.yokai" class="w-6 h-6 text-[#14342B]" />
                </div>
                <h3 class="text-2xl font-bold text-[#14342B]">The Spirit of Learning</h3>
              </div>
              <p class="text-[#14342B]/90 leading-relaxed text-lg">
                In Japanese folklore, <span class="text-[#496DDB] font-semibold border-b-2 border-[#50C5B7] pb-px">Yokai</span> are supernatural beings that embody 
                the mysteries and wonders of nature. Each spirit carries unique characteristics, stories, and powers 
                that have captivated imaginations for centuries.
              </p>
            </div>
            
            <!-- Mojidex benefit section -->
            <div>
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-[#50C5B7] rounded-full flex items-center justify-center shadow-md">
                  <component :is="spiritIcons.memory" class="w-6 h-6 text-[#14342B]" />
                </div>
                <h3 class="text-2xl font-bold text-[#14342B]">Memory Through Stories</h3>
              </div>
              <p class="text-[#14342B]/90 leading-relaxed text-lg">
                Our Mojidex transforms each kanji into a memorable Yokai character, creating 
                <span class="text-[#496DDB] font-semibold border-b-2 border-[#50C5B7] pb-px">visual and emotional connections</span> that enhance retention. 
                By associating characters with unique spirits and their evolving stories, 
                learning becomes an adventure where every new word is a discovery.
              </p>
            </div>
          </div>
          
          <!-- Learning benefits -->
          <div class="flex flex-wrap justify-center gap-4 pt-8 border-t-2 border-[#50C5B7]/20">
            <div class="flex items-center gap-3 bg-[#50C5B7]/10 px-4 py-3 rounded-full border border-[#50C5B7]/30 hover:bg-[#50C5B7]/15 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div class="w-8 h-8 bg-gradient-to-r from-[#50C5B7] to-[#496DDB] rounded-full flex items-center justify-center">
                <component :is="benefitIcons.memory" class="w-4 h-4 text-[#14342B]" />
              </div>
              <span class="text-sm font-medium text-[#14342B]">Enhanced memory through visual association</span>
            </div>
            <div class="flex items-center gap-3 bg-[#50C5B7]/10 px-4 py-3 rounded-full border border-[#50C5B7]/30 hover:bg-[#50C5B7]/15 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div class="w-8 h-8 bg-gradient-to-r from-[#50C5B7] to-[#496DDB] rounded-full flex items-center justify-center">
                <component :is="benefitIcons.story" class="w-4 h-4 text-[#14342B]" />
              </div>
              <span class="text-sm font-medium text-[#14342B]">Story-based learning for deeper understanding</span>
            </div>
            <div class="flex items-center gap-3 bg-[#50C5B7]/10 px-4 py-3 rounded-full border border-[#50C5B7]/30 hover:bg-[#50C5B7]/15 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div class="w-8 h-8 bg-gradient-to-r from-[#50C5B7] to-[#496DDB] rounded-full flex items-center justify-center">
                <component :is="benefitIcons.gamified" class="w-4 h-4 text-[#14342B]" />
              </div>
              <span class="text-sm font-medium text-[#14342B]">Gamified progression with collectible rewards</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Yokai cards grid -->
      <div class="relative min-h-[400px]">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 slide-up-fade" :class="{ 'element-visible': cardsVisible }">
          <div 
            v-for="card in yokaiCards"
            :key="card.id"
            v-memo="[card.id, card.rarity, card.unlocked]"
            :data-card-id="card.id"
            class="cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-105"
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
      <div class="py-12 mt-20 slide-up-fade transition-all duration-500 delay-500" :class="{ 'element-visible': textVisible }">
        <h3 class="text-3xl md:text-4xl font-black text-center text-[#14342B] mb-12">What Makes Mojidex Special</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white/90 p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-[#50C5B7] relative overflow-hidden">
            <div class="w-20 h-20 bg-gradient-to-r from-[#50C5B7] to-[#496DDB] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
              <component :is="featureIcons.collection" class="w-10 h-10 text-[#14342B]" />
            </div>
            <h4 class="text-xl font-bold text-[#14342B] mb-3">Yokai Collection</h4>
            <p class="text-sm text-[#14342B]/80 leading-relaxed">
              Every kanji and word is represented by a unique Yokai spirit with detailed lore and personality.
            </p>
          </div>
          
          <div class="bg-white/90 p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-[#50C5B7] relative overflow-hidden">
            <div class="w-20 h-20 bg-gradient-to-r from-[#50C5B7] to-[#496DDB] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
              <component :is="featureIcons.rarity" class="w-10 h-10 text-[#14342B]" />
            </div>
            <h4 class="text-xl font-bold text-[#14342B] mb-3">Rarity System</h4>
            <p class="text-sm text-[#14342B]/80 leading-relaxed">
              From common spirits to mythic legends, discover rare Yokai as you progress in your learning journey.
            </p>
          </div>
          
          <div class="bg-white/90 p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-[#50C5B7] relative overflow-hidden">
            <div class="w-20 h-20 bg-gradient-to-r from-[#50C5B7] to-[#496DDB] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
              <component :is="featureIcons.information" class="w-10 h-10 text-[#14342B]" />
            </div>
            <h4 class="text-xl font-bold text-[#14342B] mb-3">Complete Information</h4>
            <p class="text-sm text-[#14342B]/80 leading-relaxed">
              Each card contains all forms, conjugations, and uses - your comprehensive reference companion.
            </p>
          </div>
          
          <div class="bg-white/90 p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-[#50C5B7] relative overflow-hidden">
            <div class="w-20 h-20 bg-gradient-to-r from-[#50C5B7] to-[#496DDB] rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
              <component :is="featureIcons.progress" class="w-10 h-10 text-[#14342B]" />
            </div>
            <h4 class="text-xl font-bold text-[#14342B] mb-3">Gamified Progress</h4>
            <p class="text-sm text-[#14342B]/80 leading-relaxed">
              Track your collection, complete sets, and unlock special rewards as you master the language.
            </p>
          </div>
        </div>
      </div>

      <!-- Call to action -->
      <div class="text-center mt-16 p-12 bg-gradient-to-r from-[#50C5B7]/10 to-[#DEC0F1]/10 rounded-3xl backdrop-blur-sm slide-up-fade transition-all duration-500 delay-700" :class="{ 'element-visible': textVisible }">
        <h3 class="text-3xl md:text-4xl font-black text-[#14342B] mb-4">Ready to Start Your Collection?</h3>
        <p class="text-lg text-[#14342B]/90 mb-8">Join thousands of learners discovering Japanese through the power of Yokai spirits.</p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-10 py-4 rounded-full font-semibold text-[#14342B] bg-gradient-to-r from-[#50C5B7] to-[#3da89b] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            Explore Mojidex
          </button>
          <button class="px-10 py-4 rounded-full font-semibold border-2 border-[#496DDB] text-[#14342B] bg-transparent hover:bg-[#14342B] hover:text-white hover:-translate-y-1 hover:shadow-lg hover:border-[#14342B] transition-all duration-300">
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
/* OPTIMISATION CSS - Gardé le design original avec optimisations performance */

/* Color variables */
:root {
  --color-cream: #EFD9CE;
  --color-lavender: #DEC0F1;
  --color-teal: #50C5B7;
  --color-blue: #496DDB;
  --color-dark-green: #14342B;
}

/* Background styling - ORIGINAL mais optimisé */
.mojidex-background {
  background: linear-gradient(135deg, var(--color-cream) 0%, rgba(222, 192, 241, 0.3) 50%, rgba(80, 197, 183, 0.2) 100%);
  position: relative;
}
.slide-up-fade {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.element-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Gradient radial personnalisé pour l'arrière-plan */
.bg-radial-gradient {
  background: radial-gradient(circle at 50% 50%, var(--tw-gradient-from), var(--tw-gradient-to));
}

/* Performance optimizations */
@media (prefers-reduced-motion: reduce) {
  .slide-up-fade {
    transition: none !important;
  }
}
</style>