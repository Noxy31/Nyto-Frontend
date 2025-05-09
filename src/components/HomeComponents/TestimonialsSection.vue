<script setup lang="ts">
import { ref, computed } from 'vue';

// Props
interface TestimonialsSectionProps {
  isVisible: boolean;
}

const props = defineProps<TestimonialsSectionProps>();

// Testimonial interface
interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  initial: string;
  bgColor: string;
  textColor: string;
  avatarBgColor: string;
  avatarTextColor: string;
  delay: string;
}

// Stat interface
interface Stat {
  number: string;
  label: string;
}

// Testimonial data
const testimonials = ref<Testimonial[]>([
  {
    id: 1,
    quote: "After 6 months with Nyto.ai, I passed the JLPT N3 exam with flying colors. The adaptive approach kept me engaged and challenged at just the right level.",
    name: "Michael T.",
    role: "Business Professional",
    initial: "M",
    bgColor: "#CFD2B2",
    textColor: "#4B3B47",
    avatarBgColor: "#E0D8DE",
    avatarTextColor: "#4B3B47",
    delay: "0.1s"
  },
  {
    id: 2,
    quote: "The conversation practice feels like talking with a real person! My Japanese friends are amazed at how natural my speaking sounds after just a few months.",
    name: "Sara K.",
    role: "University Student",
    initial: "S",
    bgColor: "#E0D8DE",
    textColor: "#4B3B47",
    avatarBgColor: "#CFD2B2",
    avatarTextColor: "#4B3B47",
    delay: "0.2s"
  },
  {
    id: 3,
    quote: "The kanji learning system is brilliant! The visual mnemonics and stroke order animations made characters stick in my memory like never before.",
    name: "Ryan J.",
    role: "Software Engineer",
    initial: "R",
    bgColor: "#4B3B47",
    textColor: "#CFD2B2",
    avatarBgColor: "#9C9990",
    avatarTextColor: "#E0D8DE",
    delay: "0.3s"
  }
]);

// Stats data
const stats = ref<Stat[]>([
  {number: '40K+', label: 'Active Learners'},
  {number: '4.9', label: 'App Store Rating'},
  {number: '12M+', label: 'Words Learned'},
  {number: '92%', label: 'Completion Rate'}
]);

// Active testimonial
const activeTestimonial = ref<number>(0);

// Methods to control testimonial navigation
const nextTestimonial = (): void => {
  activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.value.length;
};

const prevTestimonial = (): void => {
  activeTestimonial.value = (activeTestimonial.value - 1 + testimonials.value.length) % testimonials.value.length;
};

// Helper to determine if a testimonial is active
const isActive = (id: number): boolean => {
  return id === testimonials.value[activeTestimonial.value].id;
};

// Set up auto-rotation with an interval - can be enabled if desired
// onMounted(() => {
//   const interval = setInterval(() => {
//     nextTestimonial();
//   }, 6000);
//   
//   onUnmounted(() => {
//     clearInterval(interval);
//   });
// });
</script>

<template>
  <section id="testimonials" class="py-24 relative testimonials-bg">
    <div class="container mx-auto px-6 md:px-12">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 transition-all duration-1000 transform"
          :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
          style="color: #E0D8DE;">
        Success Stories
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- Testimonial cards -->
        <div v-for="testimonial in testimonials" 
             :key="testimonial.id"
             class="rounded-3xl p-8 transition-all duration-500 transform testimonial-card"
             :class="[
               props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
               isActive(testimonial.id) ? 'hover:scale-105 z-10 shadow-xl' : 'md:scale-95 opacity-80 testimonial-inactive'
             ]"
             :style="{ 
               backgroundColor: testimonial.bgColor, 
               color: testimonial.textColor,
               transitionDelay: testimonial.delay
             }"
             @click="activeTestimonial = testimonials.findIndex(t => t.id === testimonial.id)">
          <div class="text-5xl mb-4 testimonial-quote">"</div>
          <p class="mb-6 italic testimonial-text">
            {{ testimonial.quote }}
          </p>
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl testimonial-avatar" 
                 :style="{ 
                   backgroundColor: testimonial.avatarBgColor, 
                   color: testimonial.avatarTextColor 
                 }">
              {{ testimonial.initial }}
            </div>
            <div>
              <div class="font-bold testimonial-name" :style="{ color: testimonial.textColor }">
                {{ testimonial.name }}
              </div>
              <div class="testimonial-role" :style="{ 
                color: testimonial.id === 3 ? '#9C9990' : '#6A6262' 
              }">
                {{ testimonial.role }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Navigation dots for mobile -->
        <div class="md:hidden flex justify-center mt-6 space-x-2">
          <button v-for="(testimonial, index) in testimonials" 
                  :key="testimonial.id"
                  class="w-3 h-3 rounded-full transition-all duration-200 focus:outline-none"
                  :class="activeTestimonial === index ? 'bg-light scale-125' : 'bg-accent opacity-60'"
                  @click="activeTestimonial = index">
          </button>
        </div>
        
        <!-- Floating achievement badges -->
        <div class="absolute -top-12 -right-8 hidden lg:block achievement-badge rotate-badge">
          <div class="bg-white rounded-full shadow-lg p-5 w-24 h-24 flex flex-col items-center justify-center">
            <div class="text-xl font-bold badge-number">98%</div>
            <div class="text-xs text-center badge-label">Success Rate</div>
          </div>
        </div>
        
        <div class="absolute -bottom-8 -left-8 hidden lg:block achievement-badge negative-rotate-badge">
          <div class="bg-white rounded-full shadow-lg p-5 w-24 h-24 flex flex-col items-center justify-center">
            <div class="text-xl font-bold badge-number">4.9</div>
            <div class="text-xs text-center badge-label">User Rating</div>
          </div>
        </div>
      </div>
      
      <!-- Statistics counter section -->
      <div class="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        <div v-for="(stat, index) in stats" 
             :key="index"
             class="p-6 rounded-2xl text-center transition-all duration-1000 transform stat-card"
             :class="props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
             :style="{
               backgroundColor: index % 2 === 0 ? '#CFD2B2' : '#E0D8DE',
               transitionDelay: `${0.3 + index * 0.1}s`
             }">
          <div class="text-3xl md:text-4xl font-bold mb-2 stat-number">{{ stat.number }}</div>
          <div class="stat-label">{{ stat.label }}</div>
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

.testimonials-bg {
  background-color: var(--color-accent);
}

.bg-light {
  background-color: var(--color-light);
}

.bg-accent {
  background-color: var(--color-accent);
}

/* Testimonial card styling */
.testimonial-card {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.testimonial-inactive {
  transition: all 0.5s ease;
}

@media (min-width: 768px) {
  .testimonial-inactive:hover {
    transform: scale(0.98);
    opacity: 0.9;
  }
}

.testimonial-quote {
  font-family: Georgia, serif;
  line-height: 1;
}

.testimonial-avatar {
  transition: transform 0.3s ease;
}

.testimonial-card:hover .testimonial-avatar {
  transform: scale(1.1);
}

/* Achievement badges */
.achievement-badge {
  transition: transform 0.5s ease;
}

.rotate-badge {
  transform: rotate(12deg);
}

.negative-rotate-badge {
  transform: rotate(-6deg);
}

.achievement-badge:hover {
  transform: rotate(0) scale(1.1);
}

.badge-number {
  color: var(--color-primary);
}

.badge-label {
  color: var(--color-secondary);
}

/* Statistics styling */
.stat-card {
  transition: all 0.4s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.stat-number {
  color: var(--color-primary);
}

.stat-label {
  color: var(--color-primary);
}
</style>