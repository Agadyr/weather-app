'use client'
import { Search } from 'lucide-react'
import { useState, useRef, useCallback } from 'react'
import { weatherApi } from '@/services/weatherApi'
import { LocationData, LocationSearchResult } from '@/types/weather'
import { useWeatherStore } from '@/store/weatherStore'
import ThemeToggle from './ThemeToggle'
import { getTranslations } from '@/utils/translations'

interface TopbarProps {
  onLocationChange?: (location: LocationData) => void
}

const Topbar: React.FC<TopbarProps> = ({ 
  onLocationChange
}) => {
  const { userSettings, updateDefaultLocation, theme } = useWeatherStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const t = getTranslations(userSettings.language)

  const getRandomColors = useCallback(() => {
    const colors = theme === 'dark' ? ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#FF3333', '#33FF33', '#3333FF', '#FF33A1', '#A133FF'] : ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#FF3333', '#33FF33', '#3333FF', '#FF33A1', '#A133FF']
    return colors[Math.floor(Math.random() * colors.length)]
  }, [theme])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 6) return t.goodNight
    if (hour < 12) return t.goodMorning
    if (hour < 17) return t.goodAfternoon
    if (hour < 22) return t.goodEvening
    return t.goodNight
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    try {
      const results = await weatherApi.searchLocations(query)
      setSearchResults(results.slice(0, 5))
      setShowResults(results.length > 0)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
      setShowResults(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    // Debounce search
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      handleSearch(value)
    }, 300)
  }

  const handleLocationSelect = (location: LocationSearchResult) => {
    const locationData: LocationData = {
      lat: location.lat,
      lng: location.lon,
      city: location.name,
      country: location.country
    }
    
    setSearchQuery(`${location.name}, ${location.country}`)
    setShowResults(false)
    
    // Save as default location
    updateDefaultLocation(locationData)
    
    if (onLocationChange) {
      onLocationChange(locationData)
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      {/* Левая часть: приветствие + аватар на мобильных */}
      <div className="flex items-center gap-3">
        {/* Профиль на мобильных рядом с приветствием */}
        <div className="w-10 h-10 md:hidden rounded-full overflow-hidden border-2 border-gray-600 flex-shrink-0">
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: getRandomColors() }}>
              <p className="text-theme-primary text-sm font-bold">
                {userSettings.name.charAt(0).toUpperCase()}
              </p>
            </div>
          </div>
        <div>
          <p className="text-theme-secondary text-sm">
            {t.hello}, {userSettings.name}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-theme-primary">{getGreeting()}</h1>
        </div>
      </div>
      
      {/* Правая часть: поиск + элементы управления */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        {/* Поиск */}
        <div className="relative flex-1 md:flex-none md:w-72">
          <Search className="text-theme-muted w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search your location" 
            className="bg-theme-secondary px-4 py-3 pl-11 rounded-full w-full text-theme-primary placeholder-theme-muted focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
          />
          
          {/* Результаты поиска */}
          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-theme-modal rounded-xl border border-theme-primary shadow-theme-heavy overflow-hidden z-50">
              {searchResults.map((location) => (
                <div
                  key={`${location.lat}-${location.lon}`}
                  className="px-4 py-3 cursor-pointer hover:bg-theme-hover transition-colors border-b border-theme-secondary last:border-b-0"
                  onClick={() => handleLocationSelect(location)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-theme-primary font-medium truncate">
                        {location.name}
                      </p>
                      <p className="text-theme-secondary text-sm truncate">
                        {location.region && `${location.region}, `}{location.country}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Toggle переключения темы только на десктопе */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        
        {/* Профиль только на десктопе */}
        <div className="hidden md:block w-12 h-12 rounded-full overflow-hidden border-2 border-gray-600 flex-shrink-0">
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: getRandomColors() }}>
            <p className="text-theme-primary text-sm font-bold">
              {userSettings.name.charAt(0).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
