<script setup lang="ts">
import { computed } from 'vue';

interface HexagonProps {
  rarity: 'common' | 'rare' | 'legendary' | 'mythic';
  position?: 'center' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  animationDelay?: number;
  colorVariant?: 'gold' | 'orange' | 'red' | 'purple';
}

const props = withDefaults(defineProps<HexagonProps>(), {
  position: 'center',
  animationDelay: 0,
  colorVariant: 'gold'
});

const allHexagonElements = [
  { class: 'center-gel', ring: 0 },
  // Ring 1 (6 hexagones)
  { class: 'c1 r1', ring: 1 },
  { class: 'c2 r1', ring: 1 },
  { class: 'c3 r1', ring: 1 },
  { class: 'c4 r1', ring: 1 },
  { class: 'c5 r1', ring: 1 },
  { class: 'c6 r1', ring: 1 },
  // Ring 2 (12 hexagones)
  { class: 'c7 r2', ring: 2 },
  { class: 'c8 r2', ring: 2 },
  { class: 'c9 r2', ring: 2 },
  { class: 'c10 r2', ring: 2 },
  { class: 'c11 r2', ring: 2 },
  { class: 'c12 r2', ring: 2 },
  { class: 'c13 r2', ring: 2 },
  { class: 'c14 r2', ring: 2 },
  { class: 'c15 r2', ring: 2 },
  { class: 'c16 r2', ring: 2 },
  { class: 'c17 r2', ring: 2 },
  { class: 'c18 r2', ring: 2 },
  // Ring 3 (18 hexagones)
  { class: 'c19 r3', ring: 3 },
  { class: 'c20 r3', ring: 3 },
  { class: 'c21 r3', ring: 3 },
  { class: 'c22 r3', ring: 3 },
  { class: 'c23 r3', ring: 3 },
  { class: 'c24 r3', ring: 3 },
  { class: 'c25 r3', ring: 3 },
  { class: 'c26 r3', ring: 3 },
  { class: 'c28 r3', ring: 3 },
  { class: 'c29 r3', ring: 3 },
  { class: 'c30 r3', ring: 3 },
  { class: 'c31 r3', ring: 3 },
  { class: 'c32 r3', ring: 3 },
  { class: 'c33 r3', ring: 3 },
  { class: 'c34 r3', ring: 3 },
  { class: 'c35 r3', ring: 3 },
  { class: 'c36 r3', ring: 3 },
  { class: 'c37 r3', ring: 3 }
];

// Filtrer les hexagones selon la rareté
const hexagonElements = computed(() => {
  const maxRing = {
    'common': 0,    // Ring 0 seulement (1 hexagone)
    'rare': 1,      // Ring 0 + Ring 1 (7 hexagones)
    'legendary': 2, // Ring 0 + Ring 1 + Ring 2 (19 hexagones)
    'mythic': 3     // Ring 0 + Ring 1 + Ring 2 + Ring 3 (37 hexagones)
  };

  return allHexagonElements.filter(element => element.ring <= maxRing[props.rarity]);
});

// Fonction pour déterminer la couleur du ring pour les mythiques
const getRingColorClass = (ring: number) => {
  if (props.rarity !== 'mythic') return '';
  
  const colors = ['mythic-gold', 'mythic-orange', 'mythic-red', 'mythic-purple'];
  return colors[ring] || '';
};
</script>

<template>
  <div 
    class="hex-socket" 
    :class="[rarity, position, { 'mythic-multicolor': rarity === 'mythic' }]"
    :style="{ animationDelay: `${animationDelay}s` }"
  >
    <div 
      v-for="(element, index) in hexagonElements" 
      :key="index"
      class="hex-gel"
      :class="element.class"
      :style="{ animationDelay: `${animationDelay + element.ring * 0.2}s` }"
    >
      <div 
        class="hex-brick h1"
        :class="getRingColorClass(element.ring)"
        :style="{ animationDelay: `${animationDelay + element.ring * 0.2}s` }"
      ></div>
      <div 
        class="hex-brick h2"
        :class="getRingColorClass(element.ring)"
        :style="{ animationDelay: `${animationDelay + element.ring * 0.2}s` }"
      ></div>
      <div 
        class="hex-brick h3"
        :class="getRingColorClass(element.ring)"
        :style="{ animationDelay: `${animationDelay + element.ring * 0.2}s` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
/* Hexagon base styles */
.hex-socket {
  width: 200px;
  height: 200px;
  position: absolute;
  opacity: 0.08;
  z-index: 0;
  pointer-events: none;
}

/* Positions centrées */
.center {
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}

.top {
  left: 50%;
  top: 25%;
  margin-left: -100px;
  margin-top: -100px;
}

.bottom {
  left: 50%;
  top: 75%;
  margin-left: -100px;
  margin-top: -100px;
}

.top-left {
  left: 25%;
  top: 25%;
  margin-left: -100px;
  margin-top: -100px;
}

.top-right {
  left: 75%;
  top: 25%;
  margin-left: -100px;
  margin-top: -100px;
}

.bottom-left {
  left: 25%;
  top: 75%;
  margin-left: -100px;
  margin-top: -100px;
}

.bottom-right {
  left: 75%;
  top: 75%;
  margin-left: -100px;
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

/* Positions des hexagones - Ring 1 (6 hexagones) */
.c1 { margin-left: -47px; margin-top: -15px; }
.c2 { margin-left: -31px; margin-top: -43px; }
.c3 { margin-left: 1px; margin-top: -43px; }
.c4 { margin-left: 17px; margin-top: -15px; }
.c5 { margin-left: -31px; margin-top: 13px; }
.c6 { margin-left: 1px; margin-top: 13px; }

/* Positions des hexagones - Ring 2 (12 hexagones) */
.c7 { margin-left: -63px; margin-top: -43px; }
.c8 { margin-left: 33px; margin-top: -43px; }
.c9 { margin-left: -15px; margin-top: 41px; }
.c10 { margin-left: -63px; margin-top: 13px; }
.c11 { margin-left: 33px; margin-top: 13px; }
.c12 { margin-left: -15px; margin-top: -71px; }
.c13 { margin-left: -47px; margin-top: -71px; }
.c14 { margin-left: 17px; margin-top: -71px; }
.c15 { margin-left: -47px; margin-top: 41px; }
.c16 { margin-left: 17px; margin-top: 41px; }
.c17 { margin-left: -79px; margin-top: -15px; }
.c18 { margin-left: 49px; margin-top: -15px; }

/* Positions des hexagones - Ring 3 (18 hexagones) */
.c19 { margin-left: -63px; margin-top: -99px; }
.c20 { margin-left: 33px; margin-top: -99px; }
.c21 { margin-left: 1px; margin-top: -99px; }
.c22 { margin-left: -31px; margin-top: -99px; }
.c23 { margin-left: -63px; margin-top: 69px; }
.c24 { margin-left: 33px; margin-top: 69px; }
.c25 { margin-left: 1px; margin-top: 69px; }
.c26 { margin-left: -31px; margin-top: 69px; }
.c28 { margin-left: -95px; margin-top: -43px; }
.c29 { margin-left: -95px; margin-top: 13px; }
.c30 { margin-left: 49px; margin-top: 41px; }
.c31 { margin-left: -79px; margin-top: -71px; }
.c32 { margin-left: -111px; margin-top: -15px; }
.c33 { margin-left: 65px; margin-top: -43px; }
.c34 { margin-left: 65px; margin-top: 13px; }
.c35 { margin-left: -79px; margin-top: 41px; }
.c36 { margin-left: 49px; margin-top: -71px; }
.c37 { margin-left: 81px; margin-top: -15px; }

/* Animations par rings */
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

.r3 {
  animation-name: hexPulse;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-delay: 0.6s;
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

.r3 > .hex-brick {
  animation-name: hexFade;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-delay: 0.6s;
}

/* Couleurs par rareté */
.common .hex-brick {
  background: #50C5B7;
}

.rare .hex-brick {
  background: #496DDB;
}

.legendary .hex-brick {
  background: #8B4DB8; /* Violet plus foncé pour contraster avec le fond */
}

.mythic .hex-brick {
  background: #FFD700;
}

/* Couleurs spéciales pour mythique par ring */
.mythic-gold {
  background: #B8860B !important; /* Ring 0 - Or plus foncé */
}

.mythic-orange {
  background: #FF8C00 !important; /* Ring 1 - Orange foncé */
}

.mythic-red {
  background: #DC143C !important; /* Ring 2 - Rouge cramoisi */
}

.mythic-purple {
  background: #8A2BE2 !important; /* Ring 3 - Violet bleu */
}

/* Animations */
@keyframes hexPulse {
  0% { transform: scale(1); }
  50% { transform: scale(0.01); }
  100% { transform: scale(1); }
}

@keyframes hexFade {
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
}

/* Performance */
@media (prefers-reduced-motion: reduce) {
  .hex-gel,
  .hex-brick {
    animation: none !important;
  }
}
</style>