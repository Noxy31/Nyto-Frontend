<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Check, Zap, Crown, Globe } from 'lucide-vue-next'

// Props
interface PricingSectionProps {
  isVisible: boolean
}
const props = defineProps<PricingSectionProps>()

// Animation state
const cardsVisible = ref(false)
const billingCycle = ref<'monthly' | 'yearly'>('monthly')

// Currency detection (pour l'implémentation future avec Stripe)
const userCurrency = ref('EUR')
const userCountry = ref('FR')

// Prix selon la devise
const pricing = computed(() => {
  const prices = {
    EUR: {
      monthly: 12.90,
      yearly: 99.90,
      lifetime: 149.90,
      symbol: '€'
    },
    USD: {
      monthly: 13.99,
      yearly: 109.99,
      lifetime: 159.99,
      symbol: '$'
    },
    GBP: {
      monthly: 11.99,
      yearly: 89.99,
      lifetime: 139.99,
      symbol: '£'
    }
  }
  return prices[userCurrency.value as keyof typeof prices] || prices.EUR
})

// Plans de paiement
const plans = computed(() => [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    description: 'Perfect for getting started',
    price: pricing.value.monthly,
    period: '/month',
    originalPrice: null,
    savings: null,
    features: [
      'Full access to Nyto learning platform',
      'Complete Mojidex dictionary',
      'Gamified learning experience',
      'Progress tracking & analytics',
      'Community forums access',
      'Mobile app access'
    ],
    color: 'teal',
    icon: Zap,
    popular: false,
    cta: 'Start Monthly Plan'
  },
  {
    id: 'yearly',
    name: 'Yearly Plan',
    description: 'Best value for serious learners',
    price: pricing.value.yearly,
    period: '/year',
    originalPrice: pricing.value.monthly * 12,
    savings: Math.round(((pricing.value.monthly * 12 - pricing.value.yearly) / (pricing.value.monthly * 12)) * 100),
    features: [
      'Full access to Nyto learning platform',
      'Complete Mojidex dictionary',
      'Gamified learning experience',
      'Progress tracking & analytics',
      'Community forums access',
      'Mobile app access'
    ],
    color: 'blue',
    icon: Crown,
    popular: true,
    cta: 'Choose Yearly Plan'
  },
  {
    id: 'lifetime',
    name: 'Lifetime Access',
    description: 'One-time payment, lifetime learning',
    price: pricing.value.lifetime,
    period: 'one-time',
    originalPrice: null,
    savings: null,
    features: [
      'Full access to Nyto learning platform',
      'Complete Mojidex dictionary',
      'Gamified learning experience',
      'Progress tracking & analytics',
      'Community forums access',
      'Mobile app access'
    ],
    color: 'lavender',
    icon: Globe,
    popular: false,
    cta: 'Get Lifetime Access'
  }
])

// Fonction pour détecter la localisation (à implémenter avec une API)
const detectUserLocation = async () => {
  try {
    // Ici vous pourrez utiliser une API comme ipapi.co ou une autre
    // const response = await fetch('https://ipapi.co/json/')
    // const data = await response.json()
    // userCountry.value = data.country_code
    // userCurrency.value = getCurrencyByCountry(data.country_code)
    
    // Pour l'instant, on garde EUR par défaut
    console.log('Location detection will be implemented with API')
  } catch (error) {
    console.log('Using default location settings')
  }
}

const handlePlanSelection = (planId: string) => {
  // Ici vous intégrerez Stripe
  console.log(`Selected plan: ${planId}`)
  // Redirection vers Stripe Checkout ou ouverture du modal de paiement
}

const toggleBilling = () => {
  billingCycle.value = billingCycle.value === 'monthly' ? 'yearly' : 'monthly'
}

onMounted(() => {
  detectUserLocation()
  setTimeout(() => {
    cardsVisible.value = true
  }, 200)
})
</script>

<template>
  <section id="pricing" class="pricing-section">
    <!-- Background effects similaires à HeroSection -->
    <div class="pricing-bg-effects">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>

    <div class="pricing-container">
      <!-- Header Section -->
      <div class="pricing-header slide-up-fade" :class="{ 'element-visible': props.isVisible }">
        <h2 class="pricing-title">
          <span class="title-line">Choose Your</span>
          <span class="title-gradient">Learning Journey</span>
        </h2>
        <p class="pricing-subtitle">
          Start mastering Japanese today with our flexible pricing plans. 
          All plans include full access to our learning platform and Mojidex dictionary.
        </p>
        
        <!-- Currency Info -->
        <div class="currency-info">
          <Globe class="w-4 h-4" />
          <span>Prices in {{ userCurrency }} • {{ userCountry }}</span>
        </div>
      </div>

      <!-- Billing Toggle (si vous voulez ajouter cette fonctionnalité plus tard) -->
      <!-- <div class="billing-toggle slide-up-fade" :class="{ 'element-visible': props.isVisible }" style="transition-delay: 0.1s;">
        <span :class="{ active: billingCycle === 'monthly' }">Monthly</span>
        <button @click="toggleBilling" class="toggle-switch">
          <div class="toggle-slider" :class="{ 'slide-right': billingCycle === 'yearly' }"></div>
        </button>
        <span :class="{ active: billingCycle === 'yearly' }">Yearly</span>
        <span class="savings-badge">Save 35%</span>
      </div> -->

      <!-- Pricing Cards -->
      <div class="pricing-cards slide-up-fade" :class="{ 'element-visible': cardsVisible }" style="transition-delay: 0.2s;">
        <div 
          v-for="(plan, index) in plans" 
          :key="plan.id"
          class="pricing-card"
          :class="[
            `card-${plan.color}`,
            { 'card-popular': plan.popular }
          ]"
          :style="{ 'transition-delay': `${0.3 + index * 0.1}s` }"
        >
          <!-- Popular badge -->
          <div v-if="plan.popular" class="popular-badge">
            <Crown class="w-4 h-4" />
            Most Popular
          </div>

          <!-- Card Header -->
          <div class="card-header">
            <div class="plan-icon">
              <component :is="plan.icon" class="w-8 h-8" />
            </div>
            <h3 class="plan-name">{{ plan.name }}</h3>
            <p class="plan-description">{{ plan.description }}</p>
          </div>

          <!-- Pricing -->
          <div class="card-pricing">
            <div class="price-main">
              <span class="currency">{{ pricing.symbol }}</span>
              <span class="amount">{{ plan.price.toFixed(2) }}</span>
              <span class="period">{{ plan.period }}</span>
            </div>
            
            <div v-if="plan.savings" class="savings-info">
              <span class="original-price">{{ pricing.symbol }}{{ plan.originalPrice?.toFixed(2) }}</span>
              <span class="savings-percent">Save {{ plan.savings }}%</span>
            </div>
          </div>

          <!-- Features -->
          <div class="card-features">
            <ul class="features-list">
              <li v-for="feature in plan.features" :key="feature" class="feature-item">
                <Check class="w-5 h-5 feature-check" />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>

          <!-- CTA Button -->
          <button 
            @click="handlePlanSelection(plan.id)"
            class="plan-cta"
            :class="`cta-${plan.color}`"
          >
            {{ plan.cta }}
          </button>
        </div>
      </div>

      <!-- Trust signals -->
      <div class="trust-signals slide-up-fade" :class="{ 'element-visible': cardsVisible }" style="transition-delay: 0.6s;">
        <div class="trust-item">
          <Check class="w-5 h-5" />
          <span>Cancel anytime</span>
        </div>
        <div class="trust-item">
          <Check class="w-5 h-5" />
          <span>Secure payment with Stripe</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Section principale */
.pricing-section {
  min-height: 100vh;
  padding: 8rem 0 6rem 0;
  position: relative;
  overflow: hidden;
  
  /* Mode clair */
  background: linear-gradient(135deg, var(--color-cream) 0%, #f8f9fa 100%);
}

.dark .pricing-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

/* Background effects */
.pricing-bg-effects {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--color-teal) 0%, transparent 70%);
  top: 10%;
  left: -10%;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--color-blue) 0%, transparent 70%);
  top: 60%;
  right: -5%;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, var(--color-lavender) 0%, transparent 70%);
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
}

.dark .orb-1 {
  background: radial-gradient(circle, #22d3ee 0%, transparent 70%);
  opacity: 0.4;
}

.dark .orb-2 {
  background: radial-gradient(circle, #a855f7 0%, transparent 70%);
  opacity: 0.4;
}

.dark .orb-3 {
  background: radial-gradient(circle, #c084fc 0%, transparent 70%);
  opacity: 0.4;
}

/* Container */
.pricing-container {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.pricing-header {
  text-align: center;
  margin-bottom: 4rem;
}

.pricing-title {
  font-size: 3.5rem;
  line-height: 1.2;
  font-weight: 800;
  color: var(--color-dark-green);
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .pricing-title {
    font-size: 4.5rem;
  }
}

.dark .pricing-title {
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

.pricing-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(20, 52, 43, 0.8);
  max-width: 600px;
  margin: 0 auto 2rem auto;
}

.dark .pricing-subtitle {
  color: #cbd5e1;
}

.currency-info {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(80, 197, 183, 0.1);
  border: 1px solid rgba(80, 197, 183, 0.3);
  border-radius: 20px;
  font-size: 0.875rem;
  color: var(--color-dark-green);
}

.dark .currency-info {
  background: rgba(34, 211, 238, 0.2);
  border-color: rgba(34, 211, 238, 0.4);
  color: #f8fafc;
}

/* Pricing Cards */
.pricing-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .pricing-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

.pricing-card {
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(80, 197, 183, 0.2);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 600px;
}

.pricing-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.dark .pricing-card {
  background: rgba(31, 41, 55, 0.8);
  border-color: rgba(80, 197, 183, 0.3);
}

.dark .pricing-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Card variants */
.card-teal {
  border-color: rgba(80, 197, 183, 0.4);
}

.card-teal:hover {
  border-color: var(--color-teal);
  box-shadow: 0 20px 40px rgba(80, 197, 183, 0.2);
}

.card-blue {
  border-color: rgba(73, 109, 219, 0.4);
}

.card-blue:hover {
  border-color: var(--color-blue);
  box-shadow: 0 20px 40px rgba(73, 109, 219, 0.2);
}

.card-lavender {
  border-color: rgba(222, 192, 241, 0.4);
}

.card-lavender:hover {
  border-color: var(--color-lavender);
  box-shadow: 0 20px 40px rgba(222, 192, 241, 0.2);
}

.card-popular {
  transform: scale(1.05);
  border-color: var(--color-blue) !important;
  box-shadow: 0 15px 35px rgba(73, 109, 219, 0.2);
}

.card-popular:hover {
  transform: scale(1.05) translateY(-10px);
}

/* Popular badge */
.popular-badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  color: var(--color-dark-green) !important;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(73, 109, 219, 0.4);
  z-index: 999;
  border: 3px solid var(--color-blue);
}

.popular-badge svg {
  color: var(--color-dark-green) !important;
}

.dark .popular-badge {
  background: #0f172a;
  color: white !important;
  border-color: #a855f7;
}

.dark .popular-badge svg {
  color: white !important;
}

/* Card content */
.card-header {
  margin-bottom: 2rem;
}

.plan-icon {
  width: 60px;
  height: 60px;
  background: rgba(80, 197, 183, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
  color: var(--color-teal);
}

.card-blue .plan-icon {
  background: rgba(73, 109, 219, 0.1);
  color: var(--color-blue);
}

.card-lavender .plan-icon {
  background: rgba(222, 192, 241, 0.1);
  color: var(--color-lavender);
}

.dark .plan-icon {
  background: rgba(34, 211, 238, 0.2);
  color: #22d3ee;
}

.dark .card-blue .plan-icon {
  background: rgba(168, 85, 247, 0.2);
  color: #a855f7;
}

.dark .card-lavender .plan-icon {
  background: rgba(192, 132, 252, 0.2);
  color: #c084fc;
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-dark-green);
  margin-bottom: 0.5rem;
}

.dark .plan-name {
  color: #f8fafc;
}

.plan-description {
  color: rgba(20, 52, 43, 0.7);
  font-size: 1rem;
}

.dark .plan-description {
  color: #cbd5e1;
}

/* Pricing */
.card-pricing {
  margin-bottom: 2rem;
}

.price-main {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.currency {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-dark-green);
}

.dark .currency {
  color: #f8fafc;
}

.amount {
  font-size: 3rem;
  font-weight: 800;
  color: var(--color-dark-green);
}

.dark .amount {
  color: #f8fafc;
}

.period {
  font-size: 1rem;
  color: rgba(20, 52, 43, 0.6);
}

.dark .period {
  color: #94a3b8;
}

.savings-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.original-price {
  text-decoration: line-through;
  color: rgba(20, 52, 43, 0.5);
  font-size: 0.875rem;
}

.dark .original-price {
  color: #64748b;
}

.savings-percent {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Features */
.card-features {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: var(--color-dark-green);
  font-size: 0.95rem;
}

.dark .feature-item {
  color: #e2e8f0;
}

.feature-check {
  color: #10b981;
  flex-shrink: 0;
}

/* CTA Buttons */
.plan-cta {
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  letter-spacing: 0.3px;
  flex-shrink: 0;
}

.plan-cta:hover {
  transform: translateY(-2px);
}

.cta-teal {
  background: linear-gradient(135deg, var(--color-teal) 0%, #3da89b 100%);
  color: var(--color-dark-green);
  box-shadow: 0 4px 15px rgba(80, 197, 183, 0.3);
}

.dark .cta-teal {
  background: linear-gradient(135deg, #22d3ee 0%, #0891b2 100%);
  color: white;
}

.cta-blue {
  background: linear-gradient(135deg, var(--color-blue) 0%, #3d56b2 100%);
  color: var(--color-dark-green);
  box-shadow: 0 4px 15px rgba(73, 109, 219, 0.3);
}

.dark .cta-blue {
  background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
  color: white;
}

.cta-lavender {
  background: linear-gradient(135deg, var(--color-lavender) 0%, #c399e0 100%);
  color: var(--color-dark-green);
  box-shadow: 0 4px 15px rgba(222, 192, 241, 0.3);
}

.dark .cta-lavender {
  background: linear-gradient(135deg, #c084fc 0%, #9333ea 100%);
  color: white;
}

/* Trust signals */
.trust-signals {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(80, 197, 183, 0.2);
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(20, 52, 43, 0.7);
  font-size: 0.875rem;
}

.dark .trust-item {
  color: #cbd5e1;
}

.trust-item .w-5 {
  color: #10b981;
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

/* Variables CSS */
:root {
  --color-cream: #EFD9CE;
  --color-lavender: #DEC0F1;
  --color-teal: #50C5B7;
  --color-blue: #496DDB;
  --color-dark-green: #14342B;
}
@media (max-width: 768px) {
  .pricing-title {
    font-size: 2.5rem;
  }
  
  .pricing-card {
    padding: 2rem 1.5rem;
  }
  
  .card-popular {
    transform: none;
  }
  
  .card-popular:hover {
    transform: translateY(-10px);
  }
  
  .trust-signals {
    flex-direction: column;
    align-items: center;
  }
}
</style>