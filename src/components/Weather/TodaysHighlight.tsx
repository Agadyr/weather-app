'use client'
import React from 'react'
import { useWeatherStore } from '@/store/weatherStore'
import { getTranslations } from '@/utils/translations'
import { Wind, Droplets, Sun, Eye, Sunrise, Sunset } from 'lucide-react'
import WeatherMetric from './WeatherMetric'

interface TodaysHighlightProps {
  windSpeed: number
  windTime: string
  humidity: number
  humidityDescription: string
  uvIndex: number
  uvDescription: string
  visibility: number
  visibilityTime: string
  sunrise: string
  sunset: string
}

const TodaysHighlight: React.FC<TodaysHighlightProps> = ({
  windSpeed,
  windTime,
  humidity,
  humidityDescription,
  uvIndex,
  uvDescription,
  visibility,
  visibilityTime,
  sunrise,
  sunset
}) => {
  const { userSettings } = useWeatherStore()
  const t = getTranslations(userSettings.language)

  return (
    <div className="bg-theme-card rounded-2xl p-4 md:p-6 shadow-theme-medium">
      <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-theme-primary">{t.todaysHighlight}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <WeatherMetric
          icon={Wind}
          iconColor="text-blue-400"
          title={t.windStatus}
          value={windSpeed}
          unit="km/h"
          description={windTime}
        />
        
        <WeatherMetric
          icon={Droplets}
          iconColor="text-blue-400"
          title={t.humidityLabel}
          value={humidity}
          unit="%"
          description={humidityDescription}
        />
        
        <WeatherMetric
          icon={Sun}
          iconColor="text-yellow-400"
          title={t.uvIndexLabel}
          value={uvIndex}
          unit="UV"
          description={uvDescription}
        />
        
        <WeatherMetric
          icon={Eye}
          iconColor="text-blue-400"
          title={t.visibilityLabel}
          value={visibility}
          unit="km"
          description={visibilityTime}
        />
        
        <div className="bg-theme-tertiary rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sunrise className="w-6 h-6 text-orange-400" />
            <div>
              <p className="text-sm text-theme-secondary">{t.sunriseLabel}</p>
              <p className="text-xl font-bold text-theme-primary">{sunrise}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-theme-tertiary rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sunset className="w-6 h-6 text-orange-400" />
            <div>
              <p className="text-sm text-theme-secondary">{t.sunsetLabel}</p>
              <p className="text-xl font-bold text-theme-primary">{sunset}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodaysHighlight 