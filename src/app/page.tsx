'use client'
import { useEffect, useCallback, useMemo, useState } from 'react'
import Layout from '@/components/Layout'
import WeatherCard from '@/components/Weather/WeatherCard'
import OtherCountries from '@/components/OtherCountries'
import TodaysHighlight from '@/components/Weather/TodaysHighlight'
import WeeklyForecast from '@/components/Weather/WeeklyForecast'
import { useWeather } from '@/hooks/useWeather'
import { useWeatherStore } from '@/store/weatherStore'
import { initializeWeatherApp } from '@/store/weatherStore'
import { LocationData } from '@/types/weather'
import { motion } from 'framer-motion'
import iconHelper from '@/helpers/iconHelper'
import { getTranslations } from '@/utils/translations'

export default function Home() {

  const {
    weatherData,
    isLoading,
    error,
    fetchWeatherData
  } = useWeather()
  
  const { updateDefaultLocation, userSettings } = useWeatherStore()
  const t = getTranslations(userSettings.language)
  
  useEffect(() => {
    initializeWeatherApp()
  }, [])
  
  const getWeatherCardData = useCallback(() => {
    if (!weatherData) return null
    
    const current = weatherData.current
    const location = weatherData.location
    const today = weatherData.forecast.forecastday[0]
    return {
      location: location.name,
      country: location.country,
      day: new Date().toLocaleDateString(userSettings.language === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'long' }),
      date: new Date().toLocaleDateString(userSettings.language === 'ru' ? 'ru-RU' : 'en-US', { 
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      temperature: Math.round(current.temp_c),
      lowTemp: Math.round(today?.day.mintemp_c || current.temp_c - 5),
      condition: current.condition.text,
      feelsLike: Math.round(current.feelslike_c),
      weatherIcon: iconHelper(current.condition.text)
    }
  }, [weatherData, userSettings.language])

  const getCountriesData = useCallback(() => [
    {
      country: t.australia,
      city: t.canberra, 
      condition: t.sunny,
      temperature: 32,
      lowTemp: 24,
      icon: "sun" as const
    },
    {
      country: t.japan,
      city: t.tokyo,
      condition: t.mostlySunny, 
      temperature: 30,
      lowTemp: 19,
      icon: "cloudy-sun" as const
    }
  ], [t])

  const getHighlightData = useCallback(() => {
    if (!weatherData) return null
    
    const current = weatherData.current
    const astro = weatherData.forecast.forecastday[0]?.astro

    return {
      windSpeed: current.wind_kph,
      windTime: new Date().toLocaleTimeString(userSettings.language === 'ru' ? 'ru-RU' : 'en-US', { 
        hour: '2-digit',
        minute: '2-digit'
      }),
      humidity: current.humidity,
      humidityDescription: current.humidity > 70 ? t.highHumidity : 
                           current.humidity > 40 ? t.normalHumidity : t.lowHumidity,
      uvIndex: current.uv,
      uvDescription: current.uv > 6 ? t.highUV : 
                     current.uv > 3 ? t.moderateUV : t.lowUV,
      visibility: current.vis_km,
      visibilityTime: new Date().toLocaleTimeString(userSettings.language === 'ru' ? 'ru-RU' : 'en-US', { 
        hour: '2-digit',
        minute: '2-digit'
      }),
      sunrise: astro?.sunrise || "6:00 AM",
      sunset: astro?.sunset || "6:00 PM"
    }
  }, [weatherData, userSettings.language, t])

  const getForecastData = useCallback(() => {
    if (!weatherData?.forecast.forecastday) return []
    
    return weatherData.forecast.forecastday.map((day, index) => ({
      day: index === 0 ? t.today : 
           new Date(day.date).toLocaleDateString(userSettings.language === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'short' }),
      icon: iconHelper(day.day.condition.text),
      temperature: Math.round(day.day.maxtemp_c),
      condition: day.day.condition.text.toLowerCase().replace(/\s+/g, '-')
    }))
  }, [weatherData, userSettings.language, t])

  const handleLocationChange = useCallback((location: LocationData) => {
    updateDefaultLocation(location)
    fetchWeatherData(location)
  }, [updateDefaultLocation, fetchWeatherData])

  const handleRetry = useCallback(() => {
    initializeWeatherApp()
  }, [])

  const weatherCardData = useMemo(() => getWeatherCardData(), [getWeatherCardData])
  const countriesData = useMemo(() => getCountriesData(), [getCountriesData])
  const highlightData = useMemo(() => getHighlightData(), [getHighlightData])
  const forecastData = useMemo(() => getForecastData(), [getForecastData])

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  if (error) {
    return (
      <Layout onLocationChange={handleLocationChange}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center bg-theme-card p-6 rounded-xl shadow-theme-medium">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={handleRetry}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {t.tryAgain}
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  if (isLoading || !weatherData) {
    return (
      <Layout onLocationChange={handleLocationChange}>
        <div className="flex items-center justify-center h-64">
          <motion.div
            className="flex flex-col items-center bg-theme-card p-8 rounded-xl shadow-theme-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex space-x-1 mb-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
            <p className="text-theme-secondary">{t.loadingWeatherData}</p>
          </motion.div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout onLocationChange={handleLocationChange}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-6">
          {weatherCardData && <WeatherCard {...weatherCardData} />}
          <OtherCountries countries={countriesData} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          {highlightData && <TodaysHighlight {...highlightData} />}
          <WeeklyForecast forecast={forecastData} />
        </div>
      </div>
    </Layout>
  )
}
