<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { X, Sparkles, BookOpen, Zap } from 'lucide-vue-next';

// Props interface
interface KanjiDetail {
  id: number;
  type: 'kanji' | 'word' | 'character';
  name: string;
  japanese: string;
  romaji: string;
  rarity: 'common' | 'rare' | 'legendary' | 'mythic';
  category: string;
  color: string;
  level?: number;
  description?: string;
  imageUrl?: string;
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

interface KanjiCardDetailsProps {
  kanji: KanjiDetail;
  isVisible: boolean;
  inPlace?: boolean;
}

const props = defineProps<KanjiCardDetailsProps>();
const emit = defineEmits<{
  close: [];
}>();

// Animation states
const isFlipped = ref(false);
const contentVisible = ref(false);

// Rarity configuration with enhanced styling
const rarityConfig = {
  common: { 
    color: '#50C5B7',
    accent: '#3da89b',
    borderColor: '#50C5B7',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #f8fdfc 30%, #f0faf9 60%, #e6f7f5 100%)',
    glowColor: 'rgba(80, 197, 183, 0.15)',
    iconColor: '#50C5B7'
  },
  rare: { 
    color: '#496DDB',
    accent: '#3755b8',
    borderColor: '#496DDB',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #f8faff 30%, #f0f4ff 60%, #e8f1ff 100%)',
    glowColor: 'rgba(73, 109, 219, 0.15)',
    iconColor: '#496DDB'
  },
  legendary: { 
    color: '#DEC0F1',
    accent: '#c7a8e3',
    borderColor: '#DEC0F1',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fdf9ff 30%, #faf2ff 60%, #f5e8ff 100%)',
    glowColor: 'rgba(222, 192, 241, 0.15)',
    iconColor: '#DEC0F1'
  },
  mythic: { 
    color: '#FFD700',
    accent: '#ffcc00',
    borderColor: 'transparent',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fffdf5 30%, #fffaeb 60%, #fff4d6 100%)',
    glowColor: 'rgba(255, 215, 0, 0.2)',
    iconColor: '#FFD700'
  }
};

const cardStyle = computed(() => {
  const config = rarityConfig[props.kanji.rarity];
  return {
    borderColor: config.borderColor,
    background: config.bgGradient,
    '--rarity-color': config.color,
    '--rarity-accent': config.accent,
    '--rarity-glow': config.glowColor
  };
});

// Animation sequence
onMounted(() => {
  if (props.isVisible) {
    document.body.style.pointerEvents = 'none';
    document.body.style.overflow = 'hidden';
    
    nextTick(() => {
      setTimeout(() => {
        isFlipped.value = true;
      }, 100);
      
      setTimeout(() => {
        contentVisible.value = true;
      }, 800);
    });
  }
});

const handleClose = () => {
  contentVisible.value = false;
  
  document.body.style.pointerEvents = '';
  document.body.style.overflow = '';
  
  setTimeout(() => {
    isFlipped.value = false;
    setTimeout(() => {
      emit('close');
    }, 600);
  }, 200);
};
</script>

<template>
  <!-- Modern Modal Overlay -->
  <div 
    class="fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-500"
    :class="isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    @click.stop="handleClose"
  >
    <!-- Enhanced Background -->
    <div 
      class="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90 backdrop-blur-xl"
      @click.stop="handleClose"
    >
      <!-- Animated background particles -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="floating-particle particle-1"></div>
        <div class="floating-particle particle-2"></div>
        <div class="floating-particle particle-3"></div>
        <div class="floating-particle particle-4"></div>
      </div>
    </div>
    
    <!-- Enhanced Close Button -->
    <button 
      class="fixed top-6 right-6 w-14 h-14 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-2xl flex items-center justify-center cursor-pointer z-[10001] opacity-0 scale-75 transition-all duration-500 shadow-xl hover:shadow-2xl group"
      :class="{ 'opacity-100 scale-100': contentVisible, 'hover:scale-105 hover:rotate-90': contentVisible }"
      @click="handleClose"
    >
      <X class="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
    </button>
    
    <!-- Enhanced Card Container - SIMPLIFIE -->
    <div 
      class="relative w-full max-w-[min(92vw,580px)] h-auto max-h-[min(92vh,750px)] mx-auto flex items-center justify-center z-[10000]"
      style="perspective: 1200px;"
      @click.stop
    >
      <!-- Flip Container with Enhanced 3D -->
      <div 
        class="relative w-full min-h-[520px] transition-all duration-1000 ease-out flip-container"
        :class="{ 'flipped': isFlipped }"
        :style="{ 
          height: 'min(88vh, 700px)',
          transformStyle: 'preserve-3d'
        }"
      >
        <!-- FRONT FACE - Enhanced Design -->
        <div 
          class="absolute inset-0 rounded-3xl overflow-hidden card-face shadow-2xl"
          :class="kanji.rarity"
          style="backface-visibility: hidden; transform: rotateY(0deg);"
        >
          <div class="w-full h-full rounded-3xl p-4 relative overflow-hidden flex flex-col modern-card-inner" :style="cardStyle">
            <!-- Enhanced Rarity Badge -->
            <div 
              class="absolute top-4 right-4 px-4 py-2 rounded-2xl text-sm font-bold uppercase text-white z-20 shadow-xl"
              :style="{ backgroundColor: rarityConfig[kanji.rarity].color }"
            >
              <div class="flex items-center gap-2">
                <Sparkles class="w-4 h-4" />
                {{ kanji.rarity }}
              </div>
            </div>
            
            <!-- Mythic shimmer simplifié -->
            <div v-if="kanji.rarity === 'mythic'" class="mythic-shimmer"></div>
            
            <!-- Enhanced Image Container -->
            <div class="w-full h-48 mb-4 relative flex items-center justify-center overflow-hidden rounded-3xl">
              <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
              <img v-if="kanji.imageUrl" 
                   :src="kanji.imageUrl" 
                   :alt="kanji.name" 
                   class="w-full h-full object-contain rounded-3xl transition-transform duration-300 hover:scale-105" />
              <div class="absolute inset-0 rounded-3xl ring-1 ring-white/10"></div>
            </div>
            
            <!-- Enhanced Character Display -->
            <div class="text-center flex-1 flex flex-col justify-center">
              <div class="flex items-center justify-center gap-4 mb-4">
                <span class="text-7xl font-black" 
                      :style="{ 
                        color: kanji.color, 
                        fontFamily: 'Noto Sans JP, sans-serif',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }">
                  {{ kanji.japanese }}
                </span>
              </div>
              
              <div class="flex items-center justify-center gap-3 mb-6">
                <span class="text-xl text-gray-600 font-medium">{{ kanji.romaji }}</span>
              </div>
              
              <!-- Enhanced Quote with Modern Styling -->
              <div v-if="kanji.quote" class="relative mt-auto p-4 bg-white/10 rounded-2xl border border-white/15">
                <div class="relative">
                  <span class="absolute -left-2 -top-2 text-3xl opacity-30 font-serif" :style="{ color: rarityConfig[kanji.rarity].color }">❝</span>
                  <p class="text-sm leading-relaxed italic text-gray-700 px-4">{{ kanji.quote }}</p>
                  <span class="absolute -right-2 -bottom-2 text-3xl opacity-30 font-serif" :style="{ color: rarityConfig[kanji.rarity].color }">❞</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- BACK FACE - Enhanced Information Design -->
        <div 
          class="absolute inset-0 rounded-3xl overflow-hidden p-6 card-face shadow-2xl"
          :class="kanji.rarity"
          :style="{ ...cardStyle, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }"
        >
          <div 
            class="h-full flex flex-col gap-6 overflow-hidden opacity-0 translate-y-8 transition-all duration-800"
            :class="{ 'opacity-100 translate-y-0': contentVisible }"
          >
            <!-- Enhanced Header Section -->
            <div class="flex gap-6 pb-4 border-b-2 border-gray-200 flex-shrink-0">
              <!-- Enhanced Info Cards -->
              <div class="flex-1 flex flex-col gap-1.5">
                <div class="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl border border-white/15">
                  <div class="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold" :style="{ backgroundColor: rarityConfig[kanji.rarity].color }">
                    <BookOpen class="w-3 h-3" />
                  </div>
                  <span class="text-slate-700 min-w-[70px] text-sm font-semibold">Kunyomi:</span>
                  <span class="text-slate-700 flex-1 font-japanese text-sm">{{ kanji.kunyomi || 'N/A' }}</span>
                </div>
                
                <div class="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl border border-white/15">
                  <div class="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold" :style="{ backgroundColor: rarityConfig[kanji.rarity].color }">
                    <Zap class="w-3 h-3" />
                  </div>
                  <span class="text-slate-700 min-w-[70px] text-sm font-semibold">Onyomi:</span>
                  <span class="text-slate-700 flex-1 font-japanese text-sm">{{ kanji.onyomi || 'N/A' }}</span>
                </div>
                
                <div class="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl border border-white/15">
                  <div class="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold" :style="{ backgroundColor: rarityConfig[kanji.rarity].color }">
                    <Sparkles class="w-3 h-3" />
                  </div>
                  <span class="text-slate-700 min-w-[70px] text-sm font-semibold">Meaning:</span>
                  <span class="text-slate-700 flex-1 text-sm">{{ kanji.meaning || 'N/A' }}</span>
                </div>
                
                <div v-if="kanji.radical" class="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl border border-white/15">
                  <div class="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold" :style="{ backgroundColor: rarityConfig[kanji.rarity].color }">
                    <span class="text-xs font-bold">部</span>
                  </div>
                  <span class="text-slate-700 min-w-[70px] text-sm font-semibold">Radical:</span>
                  <span class="text-slate-700 flex-1 font-japanese text-sm">{{ kanji.radical }}</span>
                </div>
                
                <div class="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl border border-white/15">
                  <div class="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold" :style="{ backgroundColor: rarityConfig[kanji.rarity].color }">
                    <svg v-if="kanji.isJoyo" class="w-3 h-3 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <svg v-else class="w-3 h-3 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <path d="M18 6L6 18"/>
                      <path d="M6 6l12 12"/>
                    </svg>
                  </div>
                  <span class="text-slate-700 min-w-[70px] text-sm font-semibold">Jōyō kanji:</span>
                  <span class="text-slate-700 flex-1 text-sm" :class="kanji.isJoyo ? 'text-emerald-600' : 'text-red-600'">
                    {{ kanji.isJoyo ? 'Yes' : 'No' }}
                  </span>
                </div>
              </div>
              
              <!-- Enhanced Large Character Display -->
              <div class="flex-none w-36 flex items-center justify-start pl-2">
                <div class="text-8xl font-black leading-none relative z-10" 
                     :style="{ 
                       color: kanji.color, 
                       fontFamily: 'Noto Sans JP, sans-serif',
                       textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                     }">
                  {{ kanji.japanese }}
                </div>
              </div>
            </div>
            
            <!-- Enhanced Compounds Section -->
            <div v-if="kanji.compounds?.length" class="flex-1 flex flex-col min-h-0">
              <h3 class="text-xl font-bold text-slate-700 mb-2 pb-2 border-b-2 flex items-center gap-2" :style="{ borderColor: rarityConfig[kanji.rarity].color }">
                <div class="flex items-center justify-center w-8 h-8 rounded-lg text-white" :style="{ backgroundColor: rarityConfig[kanji.rarity].color }">
                  <BookOpen class="w-4 h-4" />
                </div>
                Compounds & Usage
              </h3>
              
              <div class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div class="flex flex-col gap-3 pr-3 pt-2">
                  <div 
                    v-for="(compound, index) in kanji.compounds" 
                    :key="index"
                    class="bg-white/20 border border-white/20 rounded-2xl p-4 opacity-0 -translate-x-4 transition-all duration-300"
                    :class="{ 'opacity-100 translate-x-0': contentVisible }"
                    :style="{ transitionDelay: `${index * 0.1}s` }"
                  >
                    <div class="flex items-center gap-3 mb-3 pb-2 border-b border-white/15">
                      <div class="text-2xl font-black font-japanese text-gray-800">{{ compound.kanji }}</div>
                      <div class="text-lg font-semibold text-slate-700">{{ compound.reading }}</div>
                    </div>
                    
                    <div class="space-y-2">
                      <div class="text-sm text-slate-700">
                        <span class="font-bold text-slate-600 mr-2">Meaning:</span>
                        {{ compound.meaning }}
                      </div>
                      
                      <div v-if="compound.kanjiBreakdown" class="text-sm text-slate-700">
                        <span class="font-bold text-slate-600 mr-2">Breakdown:</span>
                        {{ compound.kanjiBreakdown }}
                      </div>
                      
                      <div v-if="compound.explanation" class="text-xs text-slate-600 italic mt-2 pt-2 border-t border-white/15 leading-relaxed">
                        {{ compound.explanation }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 3D Flip Animation */
.flip-container.flipped {
  transform: rotateY(180deg);
}

/* Mythic shimmer simplifié */
.mythic-shimmer {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%);
  transform: rotate(45deg) translateX(-100%);
  animation: shimmer 2s infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes shimmer {
  0% { transform: rotate(45deg) translateX(-100%); }
  100% { transform: rotate(45deg) translateX(100%); }
}

/* Particules simplifiées */
.floating-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #50C5B7;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 10s infinite linear;
}

.particle-1 { top: 20%; left: 10%; animation-delay: 0s; }
.particle-2 { top: 60%; left: 80%; animation-delay: 3s; }
.particle-3 { top: 80%; left: 30%; animation-delay: 6s; }
.particle-4 { top: 40%; left: 70%; animation-delay: 9s; }

@keyframes float {
  0% { transform: translateY(0px); opacity: 0; }
  50% { opacity: 0.1; }
  100% { transform: translateY(-100vh); opacity: 0; }
}

/* Bordures par rareté - TOUTES IDENTIQUES MAINTENANT */
.modern-card-inner {
  position: relative;
  z-index: 2;
  border: 3px solid;
  border-radius: 1.5rem;
}

.common .modern-card-inner {
  border-color: #50C5B7;
}

.rare .modern-card-inner {
  border-color: #496DDB;
}

.legendary .modern-card-inner {
  border-color: #DEC0F1;
}

/* Carte mythique avec gradient statique */
.mythic .modern-card-inner {
  border: 3px solid;
  border-image: linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #FFD700) 1;
}

/* Font Families */
.font-japanese {
  font-family: "Noto Sans JP", sans-serif;
}

/* Responsive optimisé */
@media (max-width: 768px) {
  .flip-container {
    height: min(80vh, 600px) !important;
    min-height: 450px !important;
  }
  
  .compound-card {
    padding: 12px;
  }
  
  .compound-kanji {
    font-size: 20px;
  }
}

/* Performance optimizations */
@media (prefers-reduced-motion: reduce) {
  .flip-container,
  .mythic-shimmer,
  .floating-particle {
    animation: none !important;
  }
  
  .flip-container.flipped {
    transform: rotateY(180deg);
  }
}

/* Scrollbar personnalisé */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.scrollbar-track-gray-100::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

/* Optimisations supplémentaires */
.modern-card-inner {
  will-change: auto;
}

.floating-particle {
  will-change: transform;
}

.mythic-shimmer {
  will-change: transform;
}
</style>