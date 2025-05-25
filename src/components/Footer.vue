<script setup lang="ts">
import { ref } from 'vue';


// Simple hover state
const hoveredSocial = ref<number | null>(null);
</script>

<template>
  <footer class="relative py-12 footer-bg">
    <div class="container mx-auto px-6 md:px-12">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Left side: Logo and social links -->
        <div class="flex flex-col md:flex-row items-center gap-6">
          <!-- Logo -->
          <div class="flex items-center">
            <img src="@/assets/Logos/Logo1.png" alt="Nyto.ai Logo" class="h-10 md:h-12" />
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

/* Background */
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
  transition: all 0.3s ease;
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
</style>