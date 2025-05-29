<script setup lang="ts">
import { ref } from 'vue';
</script>

<template>
  <footer class="relative py-12 footer-bg">
    <div class="container mx-auto px-6 md:px-12">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Left side: Logo -->
        <div class="flex flex-col md:flex-row items-center gap-6">
          <!-- Logo -->
          <div class="flex items-center">
            <img src="@/assets/Logos/Logo1.png" alt="Nyto.ai Logo" class="h-10 md:h-12 transition-transform duration-300 hover:scale-105" />
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

/* Background with dark mode support */
.footer-bg {
  background: linear-gradient(135deg,
    var(--color-cream) 0%,
    rgba(222, 192, 241, 0.3) 50%,
    rgba(80, 197, 183, 0.2) 100%
  );
  border-top: 1px solid rgba(20, 52, 43, 0.1);
  transition: all 0.3s ease;
}

.dark .footer-bg {
  background: linear-gradient(135deg,
    #1f2937 0%,
    rgba(55, 65, 81, 0.4) 50%,
    rgba(31, 41, 55, 0.3) 100%
  );
  border-top: 1px solid rgba(156, 163, 175, 0.2);
}

/* Logo styling with dark mode */
.logo-text {
  color: var(--color-dark-green);
  transition: color 0.3s ease;
}

.dark .logo-text {
  color: #f9fafb;
}

.logo-accent {
  color: var(--color-teal);
  transition: color 0.3s ease;
}

.dark .logo-accent {
  color: #38b2ac;
}

/* Social links (si ajoutés plus tard) */
.social-link {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-teal) 0%, var(--color-lavender) 100%);
  color: white;
  transition: all 0.3s ease;
}

.social-link:hover,
.social-link.active {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(80, 197, 183, 0.3);
}

.dark .social-link {
  background: linear-gradient(135deg, #38b2ac 0%, #a78bfa 100%);
}

.dark .social-link:hover,
.dark .social-link.active {
  box-shadow: 0 5px 15px rgba(56, 178, 172, 0.4);
}

/* Credits and copyright with dark mode */
.developer-credit {
  color: var(--color-dark-green);
  opacity: 0.8;
  transition: all 0.3s ease;
}

.dark .developer-credit {
  color: var(--color-dark-green);
  opacity: 0.9;
}

.developer-name {
  font-weight: 700;
  color: var(--color-blue);
  transition: color 0.3s ease;
}

.dark .developer-name {
  color: var(--color-dark-green);
}

.copyright {
  color: var(--color-dark-green);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.dark .copyright {
  color: var(--color-dark-green);
  opacity: 0.8;
}

/* Legal links with dark mode */
.legal-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-dark-green);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.dark .legal-links {
  color: var(--color-dark-green);
  opacity: 0.8;
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

.dark .legal-link {
  color: var(--color-dark-green);
  opacity: 0.9;
}

.dark .legal-link:hover {
  color: var(--color-teal);
  opacity: 1;
}

.separator {
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.dark .separator {
  opacity: 0.6;
}

/* Responsive */
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

/* Performance optimizations */
.footer-bg {
  will-change: background-color;
}

.developer-credit,
.copyright,
.legal-link {
  will-change: color, opacity;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
  }
}
</style>