import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateTheme()
  }

  const setTheme = (theme) => {
    isDark.value = theme === 'dark'
    updateTheme()
  }

  const updateTheme = () => {
    const theme = isDark.value ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }

  const initTheme = () => {
    // Comprobar preferencia guardada o preferencia del sistema
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      isDark.value = prefersDark
    }
    
    updateTheme()
  }

  onMounted(() => {
    initTheme()
    
    // Escuchar cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        isDark.value = e.matches
        updateTheme()
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleChange)
  })

  return {
    isDark,
    toggleTheme,
    setTheme
  }
}
