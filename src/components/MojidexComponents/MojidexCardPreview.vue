<script setup lang="ts">
import { computed, ref } from 'vue';

// Props interface
interface MojidexCardPreviewProps {
  type: 'kanji' | 'word' | 'character';
  name: string;
  japanese: string;
  romaji: string;
  rarity: 'common' | 'rare' | 'legendary' | 'mythic';
  category: string;
  unlocked: boolean;
  color: string;
  level?: number;
  description?: string;
  imageUrl?: string;
  quote?: string;
}

const props = defineProps<MojidexCardPreviewProps>();

// OPTIMISATION : Mouse tracking simplifié pour 3D tilt
const cardRef = ref<HTMLElement>();
const mouseX = ref(0.5);
const mouseY = ref(0.5);
const isHovering = ref(false);

// Handle mouse movement for 3D tilt effect - optimisé avec throttling
let tiltTimeout: ReturnType<typeof setTimeout> | null = null;

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value || tiltTimeout) return;
  
  tiltTimeout = setTimeout(() => {
    if (!cardRef.value) return;
    const rect = cardRef.value.getBoundingClientRect();
    mouseX.value = (e.clientX - rect.left) / rect.width;
    mouseY.value = (e.clientY - rect.top) / rect.height;
    tiltTimeout = null;
  }, 16); // ~60fps
};

const handleMouseEnter = () => {
  isHovering.value = true;
};

const handleMouseLeave = () => {
  isHovering.value = false;
  mouseX.value = 0.5;
  mouseY.value = 0.5;
  if (tiltTimeout) {
    clearTimeout(tiltTimeout);
    tiltTimeout = null;
  }
};

// OPTIMISATION : 3D tilt effect légèrement simplifié
const cardTransform = computed(() => {
  if (!isHovering.value) return '';
  
  const tiltX = (mouseY.value - 0.5) * -20;
  const tiltY = (mouseX.value - 0.5) * 20;
  
  return `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
});

// Rarity configuration - GARDÉ IDENTIQUE
const rarityConfig = {
  common: { 
    color: '#50C5B7', 
    glow: 'none',
    borderColor: '#50C5B7'
  },
  rare: { 
    color: '#496DDB', 
    glow: '0 0 20px rgba(73, 109, 219, 0.4)',
    borderColor: '#496DDB'
  },
  legendary: { 
    color: '#DEC0F1', 
    glow: '0 0 30px rgba(222, 192, 241, 0.6)',
    borderColor: '#DEC0F1'
  },
  mythic: { 
    color: '#FFD700', 
    glow: 'none',
    borderColor: 'transparent'
  }
};

const cardStyle = computed(() => ({
  boxShadow: rarityConfig[props.rarity].glow,
  borderColor: rarityConfig[props.rarity].borderColor
}));
</script>

<template>
  <div 
    ref="cardRef"
    class="yokai-card" 
    :class="[props.rarity, { 'unlocked': props.unlocked, 'locked': !props.unlocked }]"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :style="{ transform: cardTransform }"
  >
    <div class="card-inner" :style="cardStyle">
      <!-- Rarity badge -->
      <div class="rarity-badge" :style="{ backgroundColor: rarityConfig[props.rarity].color }">
        {{ props.rarity }}
      </div>
      
      <!-- Card shimmer effect for mythic cards only -->
      <div v-if="props.rarity === 'mythic'" class="card-shimmer"></div>
      
      <!-- Yokai image display - FIXED SIZE -->
      <div class="yokai-image-container">
        <div class="yokai-image">
          <img v-if="props.unlocked && props.imageUrl" 
               :src="props.imageUrl" 
               :alt="props.name"
               class="yokai-img"
               loading="lazy" />
          <div v-else class="locked-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Card info -->
      <div class="card-info">
        <h4 class="card-name" :class="{ 'mythic-name': props.rarity === 'mythic' }">
          {{ props.unlocked ? props.name : '???' }}
        </h4>
        <div v-if="props.unlocked" class="kanji-container">
          <span class="japanese-char" :style="{ color: props.color }">{{ props.japanese }}</span>
          <span class="separator">-</span>
          <span class="romaji">{{ props.romaji }}</span>
        </div>
        
        <!-- Quote section - LIMITED SIZE -->
        <div v-if="props.quote" class="quote-container">
          <span class="quote-mark left">❝</span>
          <p class="quote-text">{{ props.quote }}</p>
          <span class="quote-mark right">❞</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Karasha';
  src: url('/src/assets/Fonts/Karasha.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/* Base card styles - FIXED HEIGHT */
.yokai-card {
  aspect-ratio: 3/4.5; /* Slightly taller to accommodate quotes */
  cursor: pointer;
  transition: transform 0.1s ease-out;
  transform-style: preserve-3d;
}

/* OPTIMISATION : Apply glow animation to mythic cards - durée réduite */
.yokai-card.mythic {
  animation: mythicCardGlow 6s ease infinite; /* Réduit de 8s à 6s */
}

@keyframes mythicCardGlow {
  0% { box-shadow: 0 0 50px rgba(239, 217, 206, 0.8); }
  20% { box-shadow: 0 0 50px rgba(222, 192, 241, 0.8); }
  40% { box-shadow: 0 0 50px rgba(80, 197, 183, 0.8); }
  60% { box-shadow: 0 0 50px rgba(73, 109, 219, 0.8); }
  80% { box-shadow: 0 0 50px rgba(20, 52, 43, 0.5); }
  100% { box-shadow: 0 0 50px rgba(239, 217, 206, 0.8); }
}

.card-inner {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 0.6rem;
  position: relative;
  overflow: hidden;
  border: 3px solid;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

/* Rarity backgrounds - GARDÉS IDENTIQUES mais avec OPTIMISATION des patterns */
.common .card-inner {
  background: 
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='gC1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2350C5B7;stop-opacity:0.08'/%3E%3Cstop offset='100%25' style='stop-color:%233da89b;stop-opacity:0.04'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg opacity='0.3'%3E%3Cpath d='M30,15 C30,20 25,25 25,30 C25,35 30,40 30,40 C30,40 35,35 35,30 C35,25 30,20 30,15' fill='url(%23gC1)'/%3E%3Ccircle cx='30' cy='30' r='3' fill='%2350C5B7' opacity='0.15'/%3E%3C/g%3E%3C/svg%3E"),
    linear-gradient(135deg, #FFFFFF 0%, #F8F4F0 70%, #EFD9CE 100%);
  background-size: 60px 60px, cover;
  background-position: center, center;
}

.rare .card-inner {
  background: 
    url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='gR1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23496DDB;stop-opacity:0.09'/%3E%3Cstop offset='100%25' style='stop-color:%233755b8;stop-opacity:0.04'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg opacity='0.3'%3E%3Cpath d='M40,20 L60,40 L40,60 L20,40 Z' fill='none' stroke='url(%23gR1)' stroke-width='3'/%3E%3Cpath d='M40,28 L52,40 L40,52 L28,40 Z' fill='url(%23gR1)'/%3E%3Ccircle cx='40' cy='40' r='6' fill='%23496DDB' opacity='0.15'/%3E%3C/g%3E%3C/svg%3E"),
    linear-gradient(135deg, #FFFFFF 0%, #F0F4FF 70%, #D8E2FF 100%);
  background-size: 80px 80px, cover;
  background-position: center, center;
}

.legendary .card-inner {
  background: 
    url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='gL1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23DEC0F1;stop-opacity:0.1'/%3E%3Cstop offset='100%25' style='stop-color:%23c7a8e3;stop-opacity:0.05'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg opacity='0.35'%3E%3Cpath d='M50,20 L55,40 L75,40 L60,52 L65,72 L50,60 L35,72 L40,52 L25,40 L45,40 Z' fill='url(%23gL1)'/%3E%3Cpath d='M50,35 L52,45 L62,45 L54,51 L56,61 L50,55 L44,61 L46,51 L38,45 L48,45 Z' fill='none' stroke='%23DEC0F1' stroke-width='2' opacity='0.2'/%3E%3Ccircle cx='50' cy='50' r='5' fill='%23DEC0F1' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E"),
    linear-gradient(135deg, #FFFFFF 0%, #FBF5FF 70%, #F0E6FF 100%);
  background-size: 100px 100px, cover;
  background-position: center, center;
}

.mythic .card-inner {
  background: 
    url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='gM1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FFD700;stop-opacity:0.12'/%3E%3Cstop offset='50%25' style='stop-color:%23FFA500;stop-opacity:0.08'/%3E%3Cstop offset='100%25' style='stop-color:%23FF8C00;stop-opacity:0.04'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg opacity='0.35'%3E%3Ccircle cx='60' cy='60' r='35' fill='none' stroke='url(%23gM1)' stroke-width='3'/%3E%3Cpath d='M60,25 L65,45 L85,50 L70,60 L75,80 L60,70 L45,80 L50,60 L35,50 L55,45 Z' fill='url(%23gM1)'/%3E%3Cpath d='M60,40 L62,50 L72,52 L65,57 L67,67 L60,62 L53,67 L55,57 L48,52 L58,50 Z' fill='%23FFD700' opacity='0.15'/%3E%3Ccircle cx='60' cy='60' r='8' fill='%23FFD700' opacity='0.12'/%3E%3C/g%3E%3C/svg%3E"),
    linear-gradient(135deg, #FFFFFF 0%, #FFFBF0 70%, #FFF4E0 100%);
  background-size: 120px 120px, cover;
  background-position: center, center;
}

/* Mythic card border animation - OPTIMISATION : durée réduite */
.mythic {
  position: relative;
  padding: 3px;
  border-radius: 23px;
  overflow: hidden;
  background: linear-gradient(90deg, #EFD9CE 0%, #DEC0F1 20%, #50C5B7 40%, #496DDB 60%, #14342B 80%, #EFD9CE 100%);
  background-size: 200% 200%;
  animation: borderGradientMove 6s ease infinite; /* Réduit de 8s à 6s */
}

@keyframes borderGradientMove {
  0% { 
    background-position: 0% 50%;
  }
  50% { 
    background-position: 100% 50%;
  }
  100% { 
    background-position: 0% 50%;
  }
}

.mythic .card-inner {
  position: relative;
  border: none !important;
  margin: 0;
}

/* OPTIMISATION : Shimmer effect - durée réduite */
.card-shimmer {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 40%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 60%
  );
  transform: rotate(45deg) translateX(-100%);
  animation: shimmer 2.5s infinite; /* Réduit de 3s à 2.5s */
  pointer-events: none;
}

@keyframes shimmer {
  0% { transform: rotate(45deg) translateX(-100%); }
  100% { transform: rotate(45deg) translateX(100%); }
}

/* Content styles - GARDÉS IDENTIQUES */
.rarity-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  z-index: 2;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* FIXED IMAGE CONTAINER */
.yokai-image-container {
  width: 100%;
  height: 200px; /* Fixed height for the image area */
  margin-bottom: 0.4rem;
  position: relative;
}

.yokai-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 15px;
  background: transparent;
}

.yokai-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 15px;
}

.locked-icon {
  color: rgba(0, 0, 0, 0.3);
  transform: scale(1.2);
}

.card-info {
  text-align: center;
  padding-top: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #14342B;
  margin-bottom: 0.5rem;
  font-family: 'Karasha', serif;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.mythic-name {
  background: linear-gradient(135deg, #50C5B7 20%, #DEC0F1 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  position: relative;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.3));
}

.kanji-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 0.25rem 0;
}

.japanese-char {
  font-size: 3.5rem;
  font-weight: 900;
  font-family: "Noto Sans JP", sans-serif;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.romaji {
  font-size: 1.2rem;
  color: #6A6262;
  font-weight: 500;
}

.separator {
  color: #6A6262;
  font-weight: 500;
}

/* Quote styling - FIXED HEIGHT */
.quote-container {
  position: relative;
  margin-top: auto; /* Push to bottom */
  padding: 0.5rem 1.5rem;
  text-align: center;
  height: 80px; /* Fixed height for consistent card size */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quote-text {
  font-size: 0.75rem; /* Slightly smaller */
  line-height: 1.2;
  font-style: italic;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.quote-mark {
  position: absolute;
  font-size: 1.5rem; /* Smaller quote marks */
  opacity: 0.4;
  font-family: serif;
}

.quote-mark.left {
  left: 0;
  top: 0;
}

.quote-mark.right {
  right: 0;
  bottom: 0;
}

/* Quote colors by rarity - DARKER FOR BETTER VISIBILITY */
.common .quote-text {
  color: #6A9690; /* Darkened from #8CB8B0 */
}

.common .quote-mark {
  color: #50C5B7;
}

.rare .quote-text {
  color: #6B85D0; /* Darkened from #8DA3E8 */
}

.rare .quote-mark {
  color: #496DDB;
}

.legendary .quote-text {
  color: #AA9BBF; /* Darkened from #C7B8D9 */
}

.legendary .quote-mark {
  color: #DEC0F1;
}

.mythic .quote-text {
  color: #90775F; /* Darkened from #B09680 */
}

.mythic .quote-mark {
  color: #997F6B;
}

/* OPTIMISATION : Responsive adjustments */
@media (max-width: 768px) {
  .yokai-image-container {
    height: 180px; /* Slightly smaller on mobile but still fixed */
  }
  
  .japanese-char {
    font-size: 3rem;
  }
  
  .quote-text {
    font-size: 0.7rem;
  }
  
  .quote-container {
    height: 70px; /* Slightly smaller on mobile */
  }
}

/* OPTIMISATION : Performance optimizations */
@media (prefers-reduced-motion: reduce) {
  .yokai-card.mythic,
  .mythic,
  .card-shimmer {
    animation: none !important;
  }
}

/* OPTIMISATION : GPU acceleration pour les animations fluides */
.card-shimmer,
.mythic {
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>