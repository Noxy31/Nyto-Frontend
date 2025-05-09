<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Props
interface FeaturesSectionProps {
  isVisible: boolean;
}

const props = defineProps<FeaturesSectionProps>();

// Features interface
interface Feature {
  title: string;
  description: string;
  icon: string;
  active: boolean;
}

// Features data
const features = ref<Feature[]>([
  { 
    title: "Immersive Learning",
    description: "Experience Japanese through interactive scenarios and real-world conversations.",
    icon: "✨",
    active: true
  },
  { 
    title: "AI-Powered Feedback",
    description: "Get instant pronunciation and grammar feedback tailored to your unique learning style.",
    icon: "🔄",
    active: false
  },
  { 
    title: "Adaptive Curriculum",
    description: "Our system evolves with you, focusing on what you need to learn most right now.",
    icon: "📈",
    active: false
  },
  { 
    title: "Cultural Context",
    description: "Learn the language alongside cultural nuances for authentic communication skills.",
    icon: "🏮",
    active: false
  }
]);

// Activate feature by index or hovering
const activateFeature = (index: number): void => {
  features.value.forEach((f, i) => {
    f.active = i === index;
  });
};

// Rotate through features automatically
let featureInterval: number | undefined;

onMounted(() => {
  // Start feature rotation with interval
  featureInterval = window.setInterval(() => {
    const activeIndex = features.value.findIndex(f => f.active);
    const nextIndex = (activeIndex + 1) % features.value.length;
    activateFeature(nextIndex);
  }, 4000);
});

// Clean up interval when component is unmounted
onUnmounted(() => {
  if (featureInterval) {
    clearInterval(featureInterval);
  }
});
</script>

<template>
  <section id="features" class="py-24 relative features-bg">
    <div class="container mx-auto px-6 md:px-12">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 transition-all duration-1000 transform text-light"
          :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
        The Nyto Experience
      </h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Feature list with active highlight -->
        <div class="space-y-6">
          <div v-for="(feature, index) in features" 
               :key="index"
               @mouseenter="activateFeature(index)"
               class="p-6 rounded-2xl transition-all duration-500 cursor-pointer transform feature-card"
               :class="feature.active ? 'active' : 'inactive'">
            <div class="flex items-start space-x-4">
              <div class="text-3xl feature-icon">{{ feature.icon }}</div>
              <div>
                <h3 class="text-xl font-bold mb-2 feature-title">{{ feature.title }}</h3>
                <p class="feature-description">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Interactive display -->
        <div class="rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-1000 feature-display"
             :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
          <div class="aspect-w-16 aspect-h-9 rounded-t-3xl overflow-hidden feature-display-content">
            <!-- Feature showcase -->
            <div class="w-full h-full flex items-center justify-center p-4">
              <div class="text-center">
                <div v-for="feature in features" 
                     v-show="feature.active"
                     class="transition-all duration-500 feature-display-item">
                  <div class="text-6xl mb-4">{{ feature.icon }}</div>
                  <h4 class="text-2xl font-bold mb-2">{{ feature.title }}</h4>
                  <p class="text-lg feature-display-description">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="py-5 px-6 feature-display-footer">
            <div class="flex justify-between items-center">
              <div class="font-medium feature-display-label">Explore Features</div>
              <div class="flex space-x-2">
                <div v-for="(feature, index) in features" 
                     :key="index"
                     class="w-3 h-3 rounded-full transition-all duration-300 feature-indicator"
                     :class="feature.active ? 'active' : ''">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Color variables */
:root {
  --color-primary: #4B3B47;
  --color-secondary: #6A6262;
  --color-accent: #9C9990;
  --color-light: #CFD2B2;
  --color-bg: #E0D8DE;
}

.features-bg {
  background-color: var(--color-primary);
}

.text-light {
  color: var(--color-light);
}

/* Feature card styling */
.feature-card {
  transition: all 0.4s ease;
}

.feature-card.active {
  background-color: var(--color-light);
  color: var(--color-primary);
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.feature-card.inactive {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--color-light);
  opacity: 0.8;
}

.feature-title {
  transition: color 0.3s ease;
}

.feature-description {
  transition: color 0.3s ease;
}

.feature-card.active .feature-description {
  color: var(--color-secondary);
}

.feature-card.inactive .feature-description {
  color: var(--color-accent);
}

/* Feature display styling */
.feature-display {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.feature-display-content {
  background-color: var(--color-secondary);
}

.feature-display-item {
  color: var(--color-bg);
}

.feature-display-description {
  color: var(--color-light);
}

.feature-display-footer {
  background-color: var(--color-light);
}

.feature-display-label {
  color: var(--color-primary);
}

.feature-indicator {
  background-color: var(--color-accent);
  transform: scale(1);
  transition: all 0.3s ease;
}

.feature-indicator.active {
  background-color: var(--color-primary);
  transform: scale(1.2);
}

/* Aspect ratios */
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
}

.aspect-w-16 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>