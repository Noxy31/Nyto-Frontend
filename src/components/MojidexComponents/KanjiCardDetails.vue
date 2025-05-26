<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { X, Sparkles, BookOpen } from 'lucide-vue-next';

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

// Rarity configuration
const rarityConfig = {
  common: { 
    color: '#50C5B7',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #f8fdfc 30%, #f0faf9 60%, #e6f7f5 100%)'
  },
  rare: { 
    color: '#496DDB',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #f8faff 30%, #f0f4ff 60%, #e8f1ff 100%)'
  },
  legendary: { 
    color: '#DEC0F1',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fdf9ff 30%, #faf2ff 60%, #f5e8ff 100%)'
  },
  mythic: { 
    color: '#FFD700',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #fffdf5 30%, #fffaeb 60%, #fff4d6 100%)'
  }
};

const cardStyle = computed(() => ({
  background: rarityConfig[props.kanji.rarity].bgGradient,
  '--rarity-color': rarityConfig[props.kanji.rarity].color
}));

// Animation sequence
onMounted(() => {
  if (props.isVisible) {
    document.body.style.pointerEvents = 'none';
    document.body.style.overflow = 'hidden';
    
    nextTick(() => {
      setTimeout(() => isFlipped.value = true, 100);
      setTimeout(() => contentVisible.value = true, 800);
    });
  }
});

const handleClose = () => {
  contentVisible.value = false;
  document.body.style.pointerEvents = '';
  document.body.style.overflow = '';
  
  setTimeout(() => {
    isFlipped.value = false;
    setTimeout(() => emit('close'), 600);
  }, 200);
};
</script>

<template>
  <!-- Modal Overlay -->
  <div 
    class="fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-500"
    :class="isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    @click.stop="handleClose"
  >
    <!-- Background -->
    <div 
      class="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90 backdrop-blur-xl"
      @click.stop="handleClose"
    >
      <!-- Particles -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="floating-particle particle-1"></div>
        <div class="floating-particle particle-2"></div>
        <div class="floating-particle particle-3"></div>
        <div class="floating-particle particle-4"></div>
      </div>
    </div>
    
    <!-- Close Button -->
    <button 
      class="fixed top-6 right-6 w-14 h-14 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-2xl flex items-center justify-center z-[10001] opacity-0 scale-75 transition-all duration-500 shadow-xl group"
      :class="{ 'opacity-100 scale-100': contentVisible, 'hover:scale-105 hover:rotate-90': contentVisible }"
      @click="handleClose"
    >
      <X class="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
    </button>
    
    <!-- Card Container -->
    <div 
      class="relative w-full max-w-[min(92vw,580px)] h-auto max-h-[min(92vh,750px)] mx-auto flex items-center justify-center z-[10000]"
      style="perspective: 1200px;"
      @click.stop
    >
      <!-- Flip Container -->
      <div 
        class="relative w-full min-h-[520px] transition-all duration-1000 ease-out flip-container"
        :class="{ 'flipped': isFlipped }"
        :style="{ height: 'min(88vh, 700px)', transformStyle: 'preserve-3d' }"
      >
        <!-- FRONT FACE -->
        <div 
          class="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl card-background"
          :class="kanji.rarity"
          style="backface-visibility: hidden; transform: rotateY(0deg);"
        >
          <!-- Motif hexagonal en fond -->
          <div class="hex-pattern" :class="kanji.rarity">
            <div class="hex-socket">
              <div class="hex-gel center-gel">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c1 r1">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c2 r1">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c3 r1">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c4 r1">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c5 r1">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c6 r1">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c7 r2">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c8 r2">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c9 r2">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c10 r2">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c11 r2">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c12 r2">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
            </div>
          </div>

          <div class="w-full h-full rounded-3xl p-4 relative overflow-hidden flex flex-col card-inner" :style="cardStyle">
            <!-- Rarity Badge -->
            <div 
              class="absolute top-4 right-4 px-4 py-2 rounded-2xl text-sm font-bold uppercase text-white z-20 shadow-xl flex items-center gap-2"
              :style="{ backgroundColor: rarityConfig[kanji.rarity].color }"
            >
              <Sparkles class="w-4 h-4" />
              {{ kanji.rarity }}
            </div>
            
            <!-- Mythic shimmer -->
            <div v-if="kanji.rarity === 'mythic'" class="mythic-shimmer"></div>
            
            <!-- Image -->
            <div class="w-full h-48 mb-4 relative flex items-center justify-center overflow-hidden rounded-3xl">
              <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
              <img v-if="kanji.imageUrl" 
                   :src="kanji.imageUrl" 
                   :alt="kanji.name" 
                   class="w-full h-full object-contain rounded-3xl transition-transform duration-300 hover:scale-105" />
              <div class="absolute inset-0 rounded-3xl ring-1 ring-white/10"></div>
            </div>
            
            <!-- Character Display -->
            <div class="text-center flex-1 flex flex-col justify-center">
              <div class="flex items-center justify-center gap-4 mb-4">
                <span class="text-7xl font-black font-japanese" 
                      :style="{ 
                        color: kanji.color, 
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }">
                  {{ kanji.japanese }}
                </span>
              </div>
              
              <div class="flex items-center justify-center gap-3 mb-6">
                <span class="text-xl text-gray-600 font-medium">{{ kanji.romaji }}</span>
              </div>
              
              <!-- Quote -->
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

        <!-- BACK FACE -->
        <div 
          class="absolute inset-0 rounded-3xl overflow-hidden p-6 shadow-2xl card-background"
          :class="kanji.rarity"
          :style="{ ...cardStyle, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }"
        >
          <!-- Motif hexagonal en fond -->
          <div class="hex-pattern" :class="kanji.rarity">
            <div class="hex-socket">
              <div class="hex-gel center-gel">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c1 r1">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c2 r1">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c3 r1">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c4 r1">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c5 r1">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
              <div class="hex-gel c6 r1">
                <div class="hex-brick h1"></div>
                <div class="hex-brick h2"></div>
                <div class="hex-brick h3"></div>
              </div>
            </div>
          </div>

          <div 
            class="h-full flex flex-col gap-6 overflow-hidden opacity-0 translate-y-8 transition-all duration-800 relative z-10"
            :class="{ 'opacity-100 translate-y-0': contentVisible }"
          >
            <!-- Header Section -->
            <div class="flex gap-6 pb-4 border-b-2 border-gray-200 flex-shrink-0">
              <!-- Info Cards -->
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
                    <BookOpen class="w-3 h-3" />
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
                    <svg v-if="kanji.isJoyo" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2z"/>
                      <path d="M19 11h-4a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2z"/>
                      <path d="M7 7V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4"/>
                    </svg>
                    <svg v-else class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="8" width="18" height="4" rx="1"/>
                      <path d="M12 8v13"/>
                      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
                    </svg>
                  </div>
                  <span class="text-slate-700 min-w-[70px] text-sm font-semibold">Jōyō kanji:</span>
                  <span class="text-slate-700 flex-1 text-sm" :class="kanji.isJoyo ? 'text-emerald-600' : 'text-red-600'">
                    {{ kanji.isJoyo ? 'Yes' : 'No' }}
                  </span>
                </div>
              </div>
              
              <!-- Large Character -->
              <div class="flex-none w-36 flex items-center justify-start pl-2">
                <div class="text-8xl font-black leading-none font-japanese" 
                     :style="{ 
                       color: kanji.color, 
                       textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                     }">
                  {{ kanji.japanese }}
                </div>
              </div>
            </div>
            
            <!-- Compounds Section -->
            <div v-if="kanji.compounds?.length" class="flex-1 flex flex-col min-h-0">
              <h3 class="text-xl font-bold text-slate-700 mb-2 pb-2 border-b-2 flex items-center gap-2" :style="{ borderColor: rarityConfig[kanji.rarity].color }">
                <div class="flex items-center justify-center w-8 h-8 rounded-lg text-white" :style="{ backgroundColor: rarityConfig[kanji.rarity].color }">
                  <BookOpen class="w-4 h-4" />
                </div>
                Compounds & Usage
              </h3>
              
              <div class="flex-1 overflow-y-auto custom-scroll">
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

/* Mythic shimmer */
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

/* Particules */
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

/* Card borders */
.card-inner {
  border: 3px solid;
  border-color: var(--rarity-color);
  position: relative;
  z-index: 2;
}

.mythic .card-inner {
  border-image: linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #FFD700) 1;
}

/* VRAIS MOTIFS HEXAGONAUX INTÉGRÉS */
.hex-pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.15;
}

.hex-socket {
  width: 200px;
  height: 200px;
  position: absolute;
  left: 50%;
  margin-left: -100px;
  top: 50%;
  margin-top: -100px;
}

.hex-brick {
  width: 30px;
  height: 17px;
  position: absolute;
  top: 5px;
  animation-name: hexFade;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

.h2 {
  transform: rotate(60deg);
}

.h3 {
  transform: rotate(-60deg);
}

.hex-gel {
  height: 30px;
  width: 30px;
  transition: all 0.3s;
  position: absolute;
  top: 50%;
  left: 50%;
}

.center-gel {
  margin-left: -15px;
  margin-top: -15px;
  animation-name: hexPulse;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

.c1 { margin-left: -47px; margin-top: -15px; }
.c2 { margin-left: -31px; margin-top: -43px; }
.c3 { margin-left: 1px; margin-top: -43px; }
.c4 { margin-left: 17px; margin-top: -15px; }
.c5 { margin-left: -31px; margin-top: 13px; }
.c6 { margin-left: 1px; margin-top: 13px; }
.c7 { margin-left: -63px; margin-top: -43px; }
.c8 { margin-left: 33px; margin-top: -43px; }
.c9 { margin-left: -15px; margin-top: 41px; }
.c10 { margin-left: -63px; margin-top: 13px; }
.c11 { margin-left: 33px; margin-top: 13px; }
.c12 { margin-left: -15px; margin-top: -71px; }

.r1 {
  animation-name: hexPulse;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-delay: 0.2s;
}

.r2 {
  animation-name: hexPulse;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-delay: 0.4s;
}

.r1 > .hex-brick {
  animation-name: hexFade;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-delay: 0.2s;
}

.r2 > .hex-brick {
  animation-name: hexFade;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-delay: 0.4s;
}

/* Couleurs par rareté */
.common .hex-brick {
  background: #50C5B7;
}

.rare .hex-brick {
  background: #496DDB;
}

.legendary .hex-brick {
  background: #DEC0F1;
}

.mythic .hex-brick {
  background: #FFD700;
}

/* Animations hexagonales */
@keyframes hexPulse {
  0% { transform: scale(1); }
  50% { transform: scale(0.8); }
  100% { transform: scale(1); }
}

@keyframes hexFade {
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
}

@keyframes mythicShine {
  0%, 100% { opacity: 0.18; transform: translateX(0); }
  25% { opacity: 0.22; transform: translateX(1px); }
  50% { opacity: 0.2; transform: translateX(-1px); }
  75% { opacity: 0.21; transform: translateX(0.5px); }
}

/* Font japonaise */
.font-japanese {
  font-family: "Noto Sans JP", sans-serif;
}

/* Scrollbar custom */
.custom-scroll::-webkit-scrollbar {
  width: 6px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: var(--rarity-color);
  border-radius: 3px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

/* Responsive */
@media (max-width: 768px) {
  .flip-container {
    height: min(80vh, 600px) !important;
    min-height: 450px !important;
  }
}

/* Performance */
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
</style>