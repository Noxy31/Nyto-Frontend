<script setup lang="ts">
import { ref } from 'vue';

// Footer category interface
interface FooterCategory {
  title: string;
  links: FooterLink[];
}

// Footer link interface
interface FooterLink {
  text: string;
  url: string;
}

// Social link interface
interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// Language interface
interface Language {
  code: string;
  name: string;
}

// Footer link categories
const footerLinks = ref<FooterCategory[]>([
  {
    title: 'Learn',
    links: [
      { text: 'Courses', url: '#' },
      { text: 'JLPT Prep', url: '#' },
      { text: 'Vocabulary', url: '#' },
      { text: 'Grammar', url: '#' }
    ]
  },
  {
    title: 'Company',
    links: [
      { text: 'About Us', url: '#' },
      { text: 'Careers', url: '#' },
      { text: 'Blog', url: '#' },
      { text: 'Press Kit', url: '#' }
    ]
  },
  {
    title: 'Support',
    links: [
      { text: 'Help Center', url: '#' },
      { text: 'Contact Us', url: '#' },
      { text: 'Privacy', url: '#' },
      { text: 'Terms', url: '#' }
    ]
  }
]);

// Social media links
const socialLinks = ref<SocialLink[]>([
  { 
    name: 'Facebook', 
    url: '#',
    icon: `<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>`
  },
  { 
    name: 'Twitter', 
    url: '#',
    icon: `<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>`
  },
  { 
    name: 'Instagram', 
    url: '#',
    icon: `<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>`
  },
  { 
    name: 'LinkedIn', 
    url: '#',
    icon: `<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>`
  }
]);

// Available languages
const languages = ref<Language[]>([
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' }
]);

// Form states
const email = ref<string>('');
const isEmailValid = ref<boolean>(true);
const isSubscribed = ref<boolean>(false);
const selectedLanguage = ref<string>('en');

// Subscribe to newsletter
const subscribeToNewsletter = (): void => {
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isEmailValid.value = emailRegex.test(email.value);
  
  if (isEmailValid.value && email.value) {
    // Simulating a successful subscription
    isSubscribed.value = true;
    setTimeout(() => {
      email.value = '';
      isSubscribed.value = false;
    }, 3000);
  }
};

// Change selected language
const changeLanguage = (event: Event): void => {
  const target = event.target as HTMLSelectElement;
  selectedLanguage.value = target.value;
};

// Hover effects for links
const hoveredLink = ref<string | null>(null);
const setHoveredLink = (index: string | null): void => {
  hoveredLink.value = index;
};
</script>

<template>
  <footer class="relative pt-24 pb-12 footer-bg">
    <!-- Wave divider -->
    <div class="absolute top-0 left-0 right-0 transform -translate-y-full h-24 overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" class="h-full w-full">
        <path class="wave-path" d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,138.7C672,139,768,181,864,170.7C960,160,1056,96,1152,69.3C1248,43,1344,53,1392,58.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
  
    <div class="container mx-auto px-6 md:px-12">
      <!-- Logo and primary links -->
      <div class="flex flex-col md:flex-row justify-between mb-16">
        <div class="mb-8 md:mb-0">
          <!-- Logo -->
          <div class="flex items-center mb-4">
            <div class="text-3xl font-bold logo-text">
              Nyto<span class="logo-dot">.ai</span>
            </div>
          </div>
          
          <!-- Tagline -->
          <p class="max-w-xs tagline">
            Revolutionizing Japanese language learning through immersive AI technology.
          </p>
          
          <!-- Social links -->
          <div class="flex space-x-4 mt-6">
            <a v-for="(social, index) in socialLinks" 
               :key="social.name"
               :href="social.url"
               class="w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:scale-110 social-link"
               :class="{ 'active': hoveredLink === `social-${index}` }"
               @mouseenter="setHoveredLink(`social-${index}`)"
               @mouseleave="setHoveredLink(null)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" v-html="social.icon"></svg>
            </a>
          </div>
        </div>
        
        <!-- Footer navigation links -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div v-for="(category, i) in footerLinks" :key="i">
            <h5 class="text-lg font-bold mb-4 footer-category">{{ category.title }}</h5>
            <ul class="space-y-3">
              <li v-for="(link, j) in category.links" :key="j">
                <a :href="link.url" 
                   class="hover:underline footer-link"
                   :class="{ 'active': hoveredLink === `link-${i}-${j}` }"
                   @mouseenter="setHoveredLink(`link-${i}-${j}`)"
                   @mouseleave="setHoveredLink(null)">
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Newsletter subscription -->
      <div class="py-8 my-8 border-t border-b newsletter-container">
        <div class="flex flex-col md:flex-row md:items-center justify-between">
          <div class="mb-6 md:mb-0 md:mr-8">
            <h5 class="text-lg font-bold mb-2 newsletter-title">Stay up to date</h5>
            <p class="newsletter-text">Subscribe to our newsletter for learning tips and updates.</p>
          </div>
          
          <div class="flex flex-col sm:flex-row w-full md:w-auto">
            <div class="relative flex-grow">
              <input 
                v-model="email"
                type="email" 
                placeholder="Enter your email" 
                class="px-4 py-3 rounded-l-full sm:w-64 focus:outline-none newsletter-input" 
                :class="{ 'error': !isEmailValid }"
              >
              <div v-if="!isEmailValid" class="absolute -bottom-6 left-0 text-xs text-red-500">
                Please enter a valid email address
              </div>
              <div v-if="isSubscribed" class="absolute -bottom-6 left-0 text-xs text-green-500">
                Successfully subscribed!
              </div>
            </div>
            <button 
              @click="subscribeToNewsletter"
              class="px-6 py-3 rounded-r-full font-medium newsletter-button">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <!-- Copyright and language selector -->
      <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="mb-4 md:mb-0 text-sm copyright">
          © {{ new Date().getFullYear() }} Nyto.ai. All rights reserved.
        </div>
        
        <div class="flex items-center space-x-6">
          <div class="relative">
            <select 
              v-model="selectedLanguage"
              @change="changeLanguage"
              class="appearance-none px-4 py-2 pr-8 rounded-lg cursor-pointer focus:outline-none language-selector">
              <option v-for="lang in languages" :key="lang.code" :value="lang.code">
                {{ lang.name }}
              </option>
            </select>
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none dropdown-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <a href="#" class="text-sm hover:underline policy-link">Privacy Policy</a>
          <a href="#" class="text-sm hover:underline policy-link">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
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

.footer-bg {
  background-color: var(--color-bg);
}

.wave-path {
  fill: var(--color-secondary);
}

/* Logo styling */
.logo-text {
  color: var(--color-primary);
}

.logo-dot {
  color: var(--color-secondary);
}

.tagline {
  color: var(--color-secondary);
}

/* Social links */
.social-link {
  background-color: var(--color-primary);
  color: var(--color-bg);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.social-link:hover,
.social-link.active {
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(75, 59, 71, 0.3);
}

/* Footer categories and links */
.footer-category {
  color: var(--color-primary);
}

.footer-link {
  color: var(--color-secondary);
  transition: all 0.2s ease;
}

.footer-link:hover,
.footer-link.active {
  color: var(--color-primary);
  text-decoration: underline;
}

/* Newsletter section */
.newsletter-container {
  border-color: rgba(106, 98, 98, 0.2);
}

.newsletter-title {
  color: var(--color-primary);
}

.newsletter-text {
  color: var(--color-secondary);
}

.newsletter-input {
  border: 2px solid var(--color-light);
  border-right: none;
  color: var(--color-primary);
}

.newsletter-input.error {
  border-color: #e53e3e;
}

.newsletter-input:focus {
  border-color: var(--color-primary);
}

.newsletter-button {
  background-color: var(--color-primary);
  color: var(--color-light);
  transition: all 0.3s ease;
}

.newsletter-button:hover {
  background-color: #594453;
}

/* Copyright and language selector */
.copyright {
  color: var(--color-secondary);
}

.language-selector {
  background-color: rgba(207, 210, 178, 0.3);
  color: var(--color-primary);
  transition: all 0.3s ease;
}

.language-selector:hover {
  background-color: rgba(207, 210, 178, 0.5);
}

.dropdown-icon {
  color: var(--color-primary);
}

.policy-link {
  color: var(--color-secondary);
  transition: all 0.2s ease;
}

.policy-link:hover {
  color: var(--color-primary);
}
</style>