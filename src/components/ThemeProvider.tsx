'use client'
import { useEffect } from 'react'
import { useWeatherStore } from '@/store/weatherStore'

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useWeatherStore(state => state.theme)
  const hydrateSettings = useWeatherStore(state => state.hydrateSettings)
  const setHydrated = useWeatherStore(state => state.setHydrated)

  useEffect(() => {
    hydrateSettings()
    setHydrated()
  }, [hydrateSettings, setHydrated])

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    
    if (theme === 'light') {
      root.classList.add('theme-light')
      root.classList.remove('theme-dark')
      body.classList.add('theme-light')
      body.classList.remove('theme-dark')
    } else {
      root.classList.add('theme-dark')
      root.classList.remove('theme-light')
      body.classList.add('theme-dark')
      body.classList.remove('theme-light')
    }
  }, [theme])

  return (
    <div className={`theme-wrapper ${theme === 'light' ? 'theme-light' : 'theme-dark'}`}>
      {children}
    </div>
  )
}

export default ThemeProvider 