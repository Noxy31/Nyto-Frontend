<script setup lang="ts">
import { ref } from 'vue';

// Social link interface
interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// Social media links
const socialLinks = ref<SocialLink[]>([
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

// Hover effects for links
const hoveredLink = ref<string | null>(null);
const setHoveredLink = (index: string | null): void => {
  hoveredLink.value = index;
};
</script>

<template>
  <footer class="relative py-12 footer-bg">
    <div class="container mx-auto px-6 md:px-12">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Left side: Logo and social links -->
        <div class="flex flex-col md:flex-row items-center gap-6">
          <!-- Logo -->
          <div class="text-2xl font-bold logo-text">
            Nyto<span class="logo-accent">.ai</span>
          </div>
          
          <!-- Social links -->
          <div class="flex items-center gap-3">
            <a v-for="(social, index) in socialLinks" 
               :key="social.name"
               :href="social.url"
               class="social-link"
               :class="{ 'active': hoveredLink === `social-${index}` }"
               @mouseenter="setHoveredLink(`social-${index}`)"
               @mouseleave="setHoveredLink(null)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" v-html="social.icon"></svg>
            </a>
          </div>
        </div>
        
        <!-- Right side: Credits, legal and copyright -->
        <div class="flex flex-col md:flex-row items-center gap-6 text-sm">
          <div class="developer-credit">
            Developed by <span class="developer-name">Nox</span>
          </div>
          <div class="legal-links">
            <a href="#" class="legal-link">Privacy Policy</a>
            <span class="separator">•</span>
            <a href="#" class="legal-link">Terms of Service</a>
          </div>
          <div class="copyright">
            © {{ new Date().getFullYear() }} Nyto.ai
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Color variables */
:root {
  --color-cream: #EFD9CE;
  --color-lavender: #DEC0F1;
  --color-teal: #50C5B7;
  --color-blue: #496DDB;
  --color-dark-green: #14342B;
}

/* Background with subtle gradient */
.footer-bg {
  background: linear-gradient(135deg, 
    var(--color-cream) 0%, 
    rgba(222, 192, 241, 0.3) 50%, 
    rgba(80, 197, 183, 0.2) 100%
  );
  border-top: 1px solid rgba(20, 52, 43, 0.1);
}

/* Logo styling */
.logo-text {
  color: var(--color-dark-green);
}

.logo-accent {
  color: var(--color-teal);
}

/* Social links */
.social-link {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-teal) 0%, var(--color-lavender) 100%);
  color: white;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.social-link:hover,
.social-link.active {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(80, 197, 183, 0.3);
}

/* Credits and copyright */
.developer-credit {
  color: var(--color-dark-green);
  opacity: 0.8;
}

.developer-name {
  font-weight: 700;
  color: var(--color-blue);
}

.copyright {
  color: var(--color-dark-green);
  opacity: 0.7;
}

/* Legal links */
.legal-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-dark-green);
  opacity: 0.7;
}

.legal-link {
  color: var(--color-dark-green);
  opacity: 0.8;
  transition: all 0.2s ease;
}

.legal-link:hover {
  color: var(--color-teal);
  opacity: 1;
}

.separator {
  opacity: 0.5;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .footer-bg {
    padding: 2rem 0;
  }
  
  .logo-text {
    font-size: 1.5rem;
  }
  
  .legal-links {
    order: 3;
  }
}
</style>