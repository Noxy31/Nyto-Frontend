import { ref, computed, watch, onMounted } from 'vue'

type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme-preference'

const storedTheme = ref<Theme>('system')
const systemPrefersDark = ref(false)

export const useTheme = () => {
  const currentTheme = computed(() => {
    if (storedTheme.value === 'system') {
      return systemPrefersDark.value ? 'dark' : 'light'
    }
    return storedTheme.value
  })

  const isDark = computed(() => currentTheme.value === 'dark')

  const initTheme = () => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      systemPrefersDark.value = mediaQuery.matches

      mediaQuery.addEventListener('change', (e) => {
        systemPrefersDark.value = e.matches
      })

      const stored = localStorage.getItem(STORAGE_KEY) as Theme
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        storedTheme.value = stored
      }
    }
  }

  const applyTheme = (theme: 'light' | 'dark') => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      
      if (theme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
      
      root.classList.add('theme-transition')
      setTimeout(() => {
        root.classList.remove('theme-transition')
      }, 300)
    }
  }

  const setTheme = (theme: Theme) => {
    storedTheme.value = theme
    localStorage.setItem(STORAGE_KEY, theme)
  }

  const toggleTheme = () => {
    if (storedTheme.value === 'light') {
      setTheme('dark')
    } else if (storedTheme.value === 'dark') {
      setTheme('light')
    } else {
      setTheme(systemPrefersDark.value ? 'light' : 'dark')
    }
  }

  watch(currentTheme, applyTheme, { immediate: true })

  onMounted(() => {
    initTheme()
  })

  return {
    currentTheme: storedTheme,
    resolvedTheme: currentTheme,
    isDark,
    systemPrefersDark,
    
    setTheme,
    toggleTheme,
    initTheme
  }
}