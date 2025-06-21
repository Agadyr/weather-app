'use client'
import Layout from '@/components/Layout'
import { User, MapPin, Bell, Palette} from 'lucide-react'
import { useWeatherStore } from '@/store/weatherStore'
import { useState } from 'react'
import { getTranslations } from '@/utils/translations'

export default function Settings() {
  const { 
    userSettings, 
    theme,
    isHydrated,
    updateName, 
    updateEmail,
    setTemperatureUnit,
    setLanguage,
    toggleAutoDetectLocation,
    toggleWeatherAlerts,
    toggleDailyForecast,
    setTheme
  } = useWeatherStore()
  
  const t = getTranslations(isHydrated ? userSettings.language : 'ru')

  const [localName, setLocalName] = useState(userSettings.name)
  const [localEmail, setLocalEmail] = useState(userSettings.email)

  const handleNameSave = () => {
    updateName(localName)
  }

  const handleEmailSave = () => {
    updateEmail(localEmail)
  }

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as 'light' | 'dark')
  }

  const handleTemperatureUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTemperatureUnit(e.target.value as 'celsius' | 'fahrenheit')
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'ru' | 'en')
  }

  return (
    <Layout>
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-theme-primary">{t.settings}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Profile Settings */}
          <div className="bg-theme-card rounded-2xl p-4 md:p-6 shadow-theme-medium">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              <h3 className="text-base md:text-lg font-semibold text-theme-primary">{t.profile}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-theme-secondary mb-2">{t.name}</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="text" 
                    value={localName}
                    onChange={(e) => setLocalName(e.target.value)}
                    className="flex-1 bg-theme-tertiary px-4 py-2 rounded-lg text-theme-primary border border-theme-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <button
                    onClick={handleNameSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
                  >
                    {t.save}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-theme-secondary mb-2">{t.email}</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    value={localEmail}
                    onChange={(e) => setLocalEmail(e.target.value)}
                    className="flex-1 bg-theme-tertiary px-4 py-2 rounded-lg text-theme-primary border border-theme-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <button
                    onClick={handleEmailSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
                  >
                    {t.save}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Location Settings */}
          <div className="bg-theme-card rounded-2xl p-4 md:p-6 shadow-theme-medium">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
              <h3 className="text-base md:text-lg font-semibold text-theme-primary">Location</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-theme-secondary mb-2">Default Location</label>
                <input 
                  type="text" 
                  value={userSettings.defaultLocation ? 
                    `${userSettings.defaultLocation.city}, ${userSettings.defaultLocation.country}` : 
                    'No default location set'
                  }
                  disabled
                  className="w-full bg-theme-tertiary px-4 py-2 rounded-lg text-theme-primary border border-theme-secondary opacity-60"
                />
                <p className="text-xs text-theme-muted mt-1">
                  Set through search or location detection
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-theme-secondary">Auto-detect location</span>
                <button
                  onClick={toggleAutoDetectLocation}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    userSettings.autoDetectLocation ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      userSettings.autoDetectLocation ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Settings */}
          <div className="bg-theme-card rounded-2xl p-4 md:p-6 shadow-theme-medium">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
              <h3 className="text-base md:text-lg font-semibold text-theme-primary">Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-theme-secondary">Weather alerts</span>
                <button
                  onClick={toggleWeatherAlerts}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    userSettings.notifications.weatherAlerts ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      userSettings.notifications.weatherAlerts ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-theme-secondary">Daily forecast</span>
                <button
                  onClick={toggleDailyForecast}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    userSettings.notifications.dailyForecast ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      userSettings.notifications.dailyForecast ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-theme-card rounded-2xl p-4 md:p-6 shadow-theme-medium">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              <h3 className="text-base md:text-lg font-semibold text-theme-primary">Appearance</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-theme-secondary mb-2">Theme</label>
                <select 
                  value={theme}
                  onChange={handleThemeChange}
                  className="w-full bg-theme-tertiary px-4 py-2 rounded-lg text-theme-primary border border-theme-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-theme-secondary mb-2">{t.temperatureUnit}</label>
                <select 
                  value={userSettings.temperatureUnit}
                  onChange={handleTemperatureUnitChange}
                  className="w-full bg-theme-tertiary px-4 py-2 rounded-lg text-theme-primary border border-theme-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="celsius">{t.celsius} (°C)</option>
                  <option value="fahrenheit">{t.fahrenheit} (°F)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-theme-secondary mb-2">{t.language}</label>
                <select 
                  value={userSettings.language}
                  onChange={handleLanguageChange}
                  className="w-full bg-theme-tertiary px-4 py-2 rounded-lg text-theme-primary border border-theme-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="ru">{t.russian}</option>
                  <option value="en">{t.english}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 