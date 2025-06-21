'use client'
import React from 'react'
import { useWeatherStore } from '@/store/weatherStore'
import { getTranslations } from '@/utils/translations'
import ForecastDayCard from './ForecastDayCard'

interface ForecastDay {
  day: string
  icon: string
  temperature: number
  condition: string
}

interface WeeklyForecastProps {
  forecast: ForecastDay[]
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ forecast }) => {
  const { userSettings } = useWeatherStore()
  const t = getTranslations(userSettings.language)

  return (
    <div className="bg-theme-card p-4 md:p-6 rounded-2xl shadow-theme-medium">
      <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-theme-primary">{t.dayForecast}</h3>
      <div className="flex flex-row gap-3 md:gap-4 justify-between overflow-x-auto scrollbar-hide">
        {forecast.map((day, index) => (
          <ForecastDayCard key={index} {...day} />
        ))}
      </div>
    </div>
  )
}

export default WeeklyForecast 