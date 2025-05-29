<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue'
import './assets/base.css';
import './assets/tailwind.css'; // Import Tailwind v4

// Logique du thème simplifiée (temporaire)
const initTheme = () => {
  // Vérifier la préférence stockée
  const stored = localStorage.getItem('theme-preference')
  let isDark = false
  
  if (stored === 'dark') {
    isDark = true
  } else if (stored === 'light') {
    isDark = false
  } else {
    // Vérifier la préférence système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    isDark = mediaQuery.matches
  }
  
  // Appliquer le thème
  const root = document.documentElement
  if (isDark) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
  
  console.log('Theme initialized:', isDark ? 'dark' : 'light')
}

onMounted(() => {
  initTheme()
})
</script>

<template>
  <main class="min-h-screen bg-theme text-theme transition-all duration-300">
    <RouterView />
  </main>
</template>

<style>
/* Styles globaux qui s'adaptent au thème */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Scrollbar personnalisée qui s'adapte au thème */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, var(--color-teal), var(--color-blue));
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, var(--color-blue), var(--color-lavender));
}

.dark ::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

.dark ::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, var(--color-teal), var(--color-lavender));
}

/* Sélection de texte stylée */
::selection {
  background-color: rgba(80, 197, 183, 0.3);
  color: var(--color-dark-green);
}

.dark ::selection {
  background-color: rgba(80, 197, 183, 0.4);
  color: white;
}

/* Amélioration des focus pour l'accessibilité */
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid var(--color-teal);
  outline-offset: 2px;
  border-radius: 4px;
}

.dark button:focus-visible,
.dark a:focus-visible,
.dark input:focus-visible,
.dark textarea:focus-visible,
.dark select:focus-visible {
  outline-color: var(--color-lavender);
}
</style>