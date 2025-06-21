import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { WeatherData, LocationData } from '@/types/weather'
import { weatherApi } from '@/services/weatherApi'
import { GeolocationService } from '@/services/geolocation'

export type Theme = 'light' | 'dark'
export type TemperatureUnit = 'celsius' | 'fahrenheit'
export type Language = 'ru' | 'en'

interface UserSettings {
  name: string
  email: string
  defaultLocation: LocationData | null
  autoDetectLocation: boolean
  temperatureUnit: TemperatureUnit
  language: Language
  notifications: {
    weatherAlerts: boolean
    dailyForecast: boolean
  }
}

interface WeatherStore {
  // Weather data
  weatherData: WeatherData | null
  isLoading: boolean
  error: string | null
  
  // Location modal
  isLocationModalOpen: boolean
  isLocationLoading: boolean
  locationError: string | null
  
  // Theme
  theme: Theme
  
  // User settings
  userSettings: UserSettings
  
  // Actions
  setWeatherData: (data: WeatherData | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  fetchWeatherData: (location: LocationData) => Promise<void>
  
  // Location modal actions
  showLocationModal: () => void
  hideLocationModal: () => void
  requestLocation: () => Promise<void>
  denyLocation: () => void
  
  // Theme actions
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  
  // Settings actions
  updateUserSettings: (settings: Partial<UserSettings>) => void
  updateName: (name: string) => void
  updateEmail: (email: string) => void
  updateDefaultLocation: (location: LocationData | null) => void
  toggleAutoDetectLocation: () => void
  setTemperatureUnit: (unit: TemperatureUnit) => void
  setLanguage: (language: Language) => void
  toggleWeatherAlerts: () => void
  toggleDailyForecast: () => void
  
  // Utility functions
  convertTemperature: (temp: number) => number
  getTemperatureSymbol: () => string
  hydrateSettings: () => void
  
  // New fields
  isHydrated: boolean
  setHydrated: () => void
}

const DEFAULT_USER_SETTINGS: UserSettings = {
  name: 'Пользователь',
  email: '',
  defaultLocation: null,
  autoDetectLocation: true,
  temperatureUnit: 'celsius',
  language: 'ru',
  notifications: {
    weatherAlerts: true,
    dailyForecast: false
  }
}

// Load settings from localStorage (только на клиенте)
const loadSettings = (): { theme: Theme; userSettings: UserSettings } => {
  // Всегда возвращаем дефолтные значения (избегаем hydration mismatch)
  return {
    theme: 'dark' as Theme,
    userSettings: DEFAULT_USER_SETTINGS
  }
}

// Save settings to localStorage
const saveSettings = (userSettings: UserSettings) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('weather-app-settings', JSON.stringify(userSettings))
    } catch (error) {
      console.error('Error saving settings:', error)
    }
  }
}

const saveTheme = (theme: Theme) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('weather-app-theme', theme)
    } catch (error) {
      console.error('Error saving theme:', error)
    }
  }
}

const initialState = loadSettings()

export const useWeatherStore = create<WeatherStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    weatherData: null,
    isLoading: false,
    error: null,
    isLocationModalOpen: false,
    isLocationLoading: false,
    locationError: null,
    theme: initialState.theme,
    userSettings: initialState.userSettings,
    isHydrated: false,
    
    // Weather actions
    setWeatherData: (data) => set({ weatherData: data }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    
    fetchWeatherData: async (location: LocationData) => {
      set({ isLoading: true, error: null })
      try {
        const lang = get().userSettings.language
        const data = await weatherApi.getForecast(`${location.lat},${location.lng}`, 10, lang)
        set({ weatherData: data, isLoading: false })
      } catch (error) {
        console.error('Error fetching weather:', error)
        set({ 
          error: get().userSettings.language === 'ru' 
            ? 'Не удалось загрузить данные о погоде' 
            : 'Failed to load weather data', 
          isLoading: false 
        })
      }
    },
    
    // Location modal actions
    showLocationModal: () => set({ isLocationModalOpen: true }),
    hideLocationModal: () => set({ isLocationModalOpen: false }),
    
    requestLocation: async () => {
      set({ isLocationLoading: true, locationError: null })
      try {
        const location = await GeolocationService.getCurrentPosition()
        
        await get().fetchWeatherData(location)
        set({ 
          isLocationModalOpen: false, 
          isLocationLoading: false 
        })
      } catch (err) {
        console.error('Geolocation error:', err)
        set({ 
          locationError: 'Не удалось получить местоположение',
          isLocationLoading: false 
        })
      }
    },
    
    denyLocation: () => {
      set({ isLocationModalOpen: false, locationError: null })
    },
    
    // Theme actions
    setTheme: (theme) => {
      set({ theme })
      saveTheme(theme)
    },
    
    toggleTheme: () => {
      const newTheme = get().theme === 'light' ? 'dark' : 'light'
      get().setTheme(newTheme)
    },
    
    // Settings actions
    updateUserSettings: (newSettings) => {
      const updatedSettings = { ...get().userSettings, ...newSettings }
      set({ userSettings: updatedSettings })
      saveSettings(updatedSettings)
    },
    
    updateName: (name) => {
      get().updateUserSettings({ name })
    },
    
    updateEmail: (email) => {
      get().updateUserSettings({ email })
    },
    
    updateDefaultLocation: (location) => {
      get().updateUserSettings({ defaultLocation: location })
    },
    
    toggleAutoDetectLocation: () => {
      const current = get().userSettings.autoDetectLocation
      get().updateUserSettings({ autoDetectLocation: !current })
    },
    
    setTemperatureUnit: (unit) => {
      get().updateUserSettings({ temperatureUnit: unit })
    },
    
    setLanguage: (language) => {
      get().updateUserSettings({ language })
    },
    
    toggleWeatherAlerts: () => {
      const current = get().userSettings.notifications.weatherAlerts
      get().updateUserSettings({ 
        notifications: { 
          ...get().userSettings.notifications, 
          weatherAlerts: !current 
        } 
      })
    },
    
    toggleDailyForecast: () => {
      const current = get().userSettings.notifications.dailyForecast
      get().updateUserSettings({ 
        notifications: { 
          ...get().userSettings.notifications, 
          dailyForecast: !current 
        } 
      })
    },
    
    // Utility functions
    convertTemperature: (temp: number) => {
      const unit = get().userSettings.temperatureUnit
      return unit === 'fahrenheit' ? (temp * 9/5) + 32 : temp
    },
    
    getTemperatureSymbol: () => {
      const unit = get().userSettings.temperatureUnit
      return unit === 'fahrenheit' ? '°F' : '°C'
    },
    
    // Hydrate settings from localStorage after component mount
    hydrateSettings: () => {
      if (typeof window === 'undefined') return
      
      try {
        const savedTheme = localStorage.getItem('weather-app-theme') as Theme
        const savedSettings = localStorage.getItem('weather-app-settings')
        
        const updates: Partial<{ theme: Theme; userSettings: UserSettings }> = {}
        
        if (savedTheme) {
          updates.theme = savedTheme
        }
        
        if (savedSettings && savedSettings.trim() !== '') {
          try {
            const parsedSettings = JSON.parse(savedSettings)
            updates.userSettings = { ...DEFAULT_USER_SETTINGS, ...parsedSettings }
          } catch (parseError) {
            console.error('Error parsing saved settings:', parseError)
            // Remove corrupted data
            localStorage.removeItem('weather-app-settings')
          }
        }
        
        if (Object.keys(updates).length > 0) {
          set(updates)
        }
      } catch (error) {
        console.error('Error hydrating settings:', error)
      }
    },
    
    // New fields
    setHydrated: () => set({ isHydrated: true }),
  }))
)

// Initialize app with settings
export const initializeWeatherApp = async () => {
  const store = useWeatherStore.getState()
  
  // Auto-detect location if enabled
  if (store.userSettings.autoDetectLocation) {
    try {
      const location = await GeolocationService.getCurrentPosition()
      await store.fetchWeatherData(location)
    } catch {
      console.log('Auto-location detection failed, showing modal')
      // If auto-detect fails, use default location or show modal
      if (store.userSettings.defaultLocation) {
        await store.fetchWeatherData(store.userSettings.defaultLocation)
      } else {
        store.showLocationModal()
      }
    }
  } else if (store.userSettings.defaultLocation) {
    // Use default location
    await store.fetchWeatherData(store.userSettings.defaultLocation)
  } else {
    // Show location modal
    store.showLocationModal()
  }
} 