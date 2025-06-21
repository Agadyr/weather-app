'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { useWeatherStore } from '@/store/weatherStore'
import { weatherApi } from '@/services/weatherApi'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDay } from '@/types/weather'
import iconHelper from '@/helpers/iconHelper'
import Image from 'next/image'
import { getTranslations, formatDate, formatTime } from '@/utils/translations'


interface DayDetailModalProps {
  day: CalendarDay | null
  onClose: () => void
  temperatureUnit: 'celsius' | 'fahrenheit'
}

function DayDetailModal({ day, onClose, temperatureUnit }: DayDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'hourly' | 'astro'>('overview')
  const { userSettings } = useWeatherStore()
  const t = getTranslations(userSettings.language)
  
  if (!day) return null


  const convertTemp = (temp: number) => {
    return temperatureUnit === 'celsius' ? temp : Math.round(temp * 9/5 + 32)
  }

  const getTempUnit = () => temperatureUnit === 'celsius' ? '°C' : '°F'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-2 md:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-theme-card rounded-2xl p-4 md:p-6 max-w-2xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto shadow-theme-strong"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start md:items-center mb-4 md:mb-6">
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-lg md:text-xl font-bold text-theme-primary break-words">
                {formatDate(new Date(day.fullDate), userSettings.language, {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                {day.isHistorical && (
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                    {t.history}
                  </span>
                )}
                {day.isFuture && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                    {t.forecast}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-theme-secondary hover:text-theme-primary transition-colors text-lg md:text-xl flex-shrink-0"
            >
              ✕
            </button>
          </div>

          {day.hasData ? (
            <>
              {/* Main Weather Info */}
              <div className="bg-theme-tertiary rounded-xl p-3 md:p-4 mb-4 md:mb-6">
                <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    {day.condition && (
                      <Image
                        width={48}
                        height={48}
                        src={iconHelper(day.condition.text)}
                        alt={day.condition.text}
                        className="md:w-16 md:h-16"
                      />
                    )}
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-theme-primary">
                        {day.temperature && `${convertTemp(day.temperature.max)}${getTempUnit()}`}
                      </div>
                      <div className="text-xs md:text-sm text-theme-secondary">
                        Мин: {day.temperature && `${convertTemp(day.temperature.min)}${getTempUnit()}`}
                      </div>
                      <div className="text-xs md:text-sm text-theme-secondary">
                        Средн: {day.temperature && `${convertTemp(day.temperature.avg)}${getTempUnit()}`}
                      </div>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    {day.condition && (
                      <p className="text-theme-primary font-medium text-sm md:text-base">{day.condition.text}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 mb-3 md:mb-4 bg-theme-background rounded-lg p-1">
                {[
                  { id: 'overview', label: t.overview },
                  { id: 'hourly', label: t.hourly },
                  { id: 'astro', label: t.astronomy }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'overview' | 'hourly' | 'astro')}
                    className={`flex-1 py-2 px-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-theme-card text-theme-primary shadow-sm'
                        : 'text-theme-secondary hover:text-theme-primary'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-3 md:space-y-4">
                {activeTab === 'overview' && day.detailedData && (
                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <div className="bg-theme-tertiary rounded-lg p-2 md:p-3">
                      <div className="text-xs md:text-sm text-theme-secondary">{t.humidity}</div>
                      <div className="text-base md:text-lg font-semibold text-theme-primary">
                        {day.detailedData.humidity}%
                      </div>
                    </div>
                    <div className="bg-theme-tertiary rounded-lg p-2 md:p-3">
                      <div className="text-xs md:text-sm text-theme-secondary">{t.uvIndex}</div>
                      <div className="text-base md:text-lg font-semibold text-theme-primary">
                        {day.detailedData.uv}
                      </div>
                    </div>
                    <div className="bg-theme-tertiary rounded-lg p-2 md:p-3">
                      <div className="text-xs md:text-sm text-theme-secondary">{t.windSpeed}</div>
                      <div className="text-base md:text-lg font-semibold text-theme-primary break-words">
                        {day.detailedData.windSpeed} {userSettings.language === 'ru' ? 'км/ч' : 'km/h'} {day.detailedData.windDir}
                      </div>
                    </div>
                    <div className="bg-theme-tertiary rounded-lg p-2 md:p-3">
                      <div className="text-xs md:text-sm text-theme-secondary">{t.visibility}</div>
                      <div className="text-base md:text-lg font-semibold text-theme-primary">
                        {day.detailedData.visibility} {userSettings.language === 'ru' ? 'км' : 'km'}
                      </div>
                    </div>
                    <div className="bg-theme-tertiary rounded-lg p-2 md:p-3">
                      <div className="text-xs md:text-sm text-theme-secondary">{t.precipitation}</div>
                      <div className="text-base md:text-lg font-semibold text-theme-primary">
                        {day.detailedData.precipitation} {userSettings.language === 'ru' ? 'мм' : 'mm'}
                      </div>
                    </div>
                    <div className="bg-theme-tertiary rounded-lg p-2 md:p-3">
                      <div className="text-xs md:text-sm text-theme-secondary">{t.chanceOfRain}</div>
                      <div className="text-base md:text-lg font-semibold text-theme-primary">
                        {day.detailedData.chanceOfRain}%
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'hourly' && day.detailedData?.hourlyData && (
                  <div className="space-y-2 max-h-60 md:max-h-80 overflow-y-auto">
                    {day.detailedData.hourlyData.map((hour, index) => (
                      <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between bg-theme-tertiary rounded-lg p-2 md:p-3 gap-2 md:gap-0">
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <span className="text-xs md:text-sm text-theme-secondary w-10 md:w-12 flex-shrink-0">
                            {hour.time.split(' ')[1]}
                          </span>
                          <Image
                            src={`https:${hour.icon}`}
                            alt={hour.condition}
                            width={24}
                            height={24}
                            className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0"
                          />
                          <span className="text-xs md:text-sm text-theme-primary truncate">
                            {hour.condition}
                          </span>
                        </div>
                        <div className="flex items-center justify-between md:space-x-4 text-xs md:text-sm">
                          <span className="text-theme-primary font-medium">
                            {convertTemp(hour.temp)}{getTempUnit()}
                          </span>
                          <span className="text-theme-secondary">
                            {hour.humidity}%
                          </span>
                          <span className="text-theme-secondary">
                            {hour.windSpeed} км/ч
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'astro' && day.detailedData?.astro && (
                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <div className="bg-theme-tertiary rounded-lg p-3 md:p-4">
                      <div className="text-center">
                        <div className="text-xl md:text-2xl mb-2">🌅</div>
                        <div className="text-xs md:text-sm text-theme-secondary">{t.sunrise}</div>
                        <div className="text-sm md:text-lg font-semibold text-theme-primary">
                          {formatTime(day.detailedData.astro.sunrise, userSettings.language)}
                        </div>
                      </div>
                    </div>
                    <div className="bg-theme-tertiary rounded-lg p-3 md:p-4">
                      <div className="text-center">
                        <div className="text-xl md:text-2xl mb-2">🌇</div>
                        <div className="text-xs md:text-sm text-theme-secondary">{t.sunset}</div>
                        <div className="text-sm md:text-lg font-semibold text-theme-primary">
                          {formatTime(day.detailedData.astro.sunset, userSettings.language)}
                        </div>
                      </div>
                    </div>
                    <div className="bg-theme-tertiary rounded-lg p-3 md:p-4">
                      <div className="text-center">
                        <div className="text-xl md:text-2xl mb-2">🌙</div>
                        <div className="text-xs md:text-sm text-theme-secondary">{t.moonrise}</div>
                        <div className="text-sm md:text-lg font-semibold text-theme-primary">
                          {formatTime(day.detailedData.astro.moonrise, userSettings.language)}
                        </div>
                      </div>
                    </div>
                    <div className="bg-theme-tertiary rounded-lg p-3 md:p-4">
                      <div className="text-center">
                        <div className="text-xl md:text-2xl mb-2">🌑</div>
                        <div className="text-xs md:text-sm text-theme-secondary">{t.moonset}</div>
                        <div className="text-sm md:text-lg font-semibold text-theme-primary">
                          {formatTime(day.detailedData.astro.moonset, userSettings.language)}
                        </div>
                      </div>
                    </div>
                    <div className="bg-theme-tertiary rounded-lg p-3 md:p-4 col-span-2">
                      <div className="text-center">
                        <div className="text-xs md:text-sm text-theme-secondary">{t.moonPhase}</div>
                        <div className="text-sm md:text-lg font-semibold text-theme-primary">
                          {day.detailedData.astro.moonPhase}
                        </div>
                        <div className="text-xs md:text-sm text-theme-secondary mt-1">
                          {t.illumination}: {day.detailedData.astro.moonIllumination}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-theme-secondary text-lg mb-2">
                {t.dataUnavailable}
              </p>
              <p className="text-sm text-theme-muted">
                {day.isHistorical 
                  ? t.historicalDataNote
                  : t.forecastDataNote
                }
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Calendar() {
  const { weatherData, isLoading, userSettings, fetchWeatherData } = useWeatherStore()
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const t = getTranslations(userSettings.language)

  // Генерируем дни календаря
  useEffect(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    // Первый день месяца
    const firstDay = new Date(year, month, 1)
    
    // Первый день недели (0 = воскресенье, 1 = понедельник, ...)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days: CalendarDay[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Генерируем 42 дня (6 недель)
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      
      const isCurrentMonth = date.getMonth() === month
      const fullDate = date.toISOString().split('T')[0]
      
      // Определяем тип даты
      const isHistorical = date < today
      const isFuture = date > today
      
      // Проверяем, есть ли данные для этого дня в прогнозе
      const forecastDay = weatherData?.forecast?.forecastday?.find(f => f.date === fullDate)
      
      let detailedData = undefined
      if (forecastDay) {
        detailedData = {
          humidity: forecastDay.day.avghumidity,
          uv: forecastDay.day.uv,
          windSpeed: forecastDay.day.maxwind_kph,
          windDir: '', // Направление ветра доступно в hourly данных
          precipitation: forecastDay.day.totalprecip_mm || 0,
          chanceOfRain: forecastDay.day.daily_chance_of_rain || 0,
          chanceOfSnow: forecastDay.day.daily_chance_of_snow || 0,
          visibility: forecastDay.day.avgvis_km,
          astro: forecastDay.astro ? {
            sunrise: forecastDay.astro.sunrise,
            sunset: forecastDay.astro.sunset,
            moonrise: forecastDay.astro.moonrise,
            moonset: forecastDay.astro.moonset,
            moonPhase: forecastDay.astro.moon_phase,
            moonIllumination: forecastDay.astro.moon_illumination
          } : undefined,
          hourlyData: forecastDay.hour ? forecastDay.hour.map(h => ({
            time: h.time,
            temp: h.temp_c,
            condition: h.condition.text,
            icon: h.condition.icon,
            humidity: h.humidity,
            windSpeed: h.wind_kph,
            precipitation: h.precip_mm || 0
          })) : undefined
        }
      }
      
      days.push({
        date: date.getDate(),
        isCurrentMonth,
        fullDate,
        temperature: forecastDay ? {
          max: forecastDay.day.maxtemp_c,
          min: forecastDay.day.mintemp_c,
          avg: forecastDay.day.avgtemp_c
        } : undefined,
        condition: forecastDay?.day.condition,
        hasData: !!forecastDay,
        isHistorical,
        isFuture,
        detailedData
      })
    }
    
    setCalendarDays(days)
  }, [currentDate, weatherData])

  // Получаем прогноз при загрузке
  useEffect(() => {
    const fetchInitialForecast = async () => {
      if (weatherData?.location) {
        // Используем уже загруженное местоположение
        const location = {
          lat: weatherData.location.lat,
          lng: weatherData.location.lon
        }
        await fetchWeatherData(location)
      } else if (userSettings.defaultLocation) {
        // Используем местоположение по умолчанию
        await fetchWeatherData(userSettings.defaultLocation)
      }
    }

    fetchInitialForecast()
  }, [weatherData?.location, userSettings.defaultLocation, fetchWeatherData])

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleDayClick = async (day: CalendarDay) => {
    if (!day.isCurrentMonth || !weatherData?.location) return
    
    // Если у дня нет данных, пытаемся их загрузить
    if (!day.hasData) {
      try {
        const location = `${weatherData.location.lat},${weatherData.location.lon}`
        
        let dayData
        const currentLang = userSettings.language
        
        if (day.isHistorical) {
          // Загружаем исторические данные
          dayData = await weatherApi.getHistory(location, day.fullDate, currentLang)
        } else if (day.isFuture) {
          // Загружаем будущие данные (если поддерживается API)
          try {
            dayData = await weatherApi.getFuture(location, day.fullDate, currentLang)
          } catch {
            console.log('Future API не поддерживается, используем обычный прогноз')
            dayData = await weatherApi.getForecast(location, 14, currentLang)
          }
        }
        
        if (dayData?.forecast?.forecastday?.[0]) {
          const forecastDay = dayData.forecast.forecastday[0]
          
          // Обновляем данные дня
          const updatedDay: CalendarDay = {
            ...day,
            hasData: true,
            temperature: {
              max: forecastDay.day.maxtemp_c,
              min: forecastDay.day.mintemp_c,
              avg: forecastDay.day.avgtemp_c
            },
            condition: forecastDay.day.condition,
            detailedData: {
              humidity: forecastDay.day.avghumidity,
              uv: forecastDay.day.uv,
              windSpeed: forecastDay.day.maxwind_kph,
              windDir: '',
              precipitation: forecastDay.day.totalprecip_mm || 0,
              chanceOfRain: forecastDay.day.daily_chance_of_rain || 0,
              chanceOfSnow: forecastDay.day.daily_chance_of_snow || 0,
              visibility: forecastDay.day.avgvis_km,
              astro: forecastDay.astro ? {
                sunrise: forecastDay.astro.sunrise,
                sunset: forecastDay.astro.sunset,
                moonrise: forecastDay.astro.moonrise,
                moonset: forecastDay.astro.moonset,
                moonPhase: forecastDay.astro.moon_phase,
                moonIllumination: forecastDay.astro.moon_illumination
              } : undefined,
              hourlyData: forecastDay.hour ? forecastDay.hour.map(h => ({
                time: h.time,
                temp: h.temp_c,
                condition: h.condition.text,
                icon: h.condition.icon,
                humidity: h.humidity,
                windSpeed: h.wind_kph,
                precipitation: h.precip_mm || 0
              })) : undefined
            }
          }
          
          // Обновляем календарь
          setCalendarDays(prev => prev.map(d => 
            d.fullDate === day.fullDate ? updatedDay : d
          ))
          
          setSelectedDay(updatedDay)
        } else {
          setSelectedDay(day)
        }
      } catch (error) {
        console.error('Ошибка загрузки данных для дня:', error)
        setSelectedDay(day)
      }
    } else {
      setSelectedDay(day)
    }
  }

  const monthName = formatDate(currentDate, userSettings.language, { 
    month: 'long', 
    year: 'numeric' 
  })

  return (
    <Layout>
      <div className="space-y-3 md:space-y-4">
        <h2 className="text-lg md:text-2xl font-bold text-theme-primary">{t.weatherCalendar}</h2>
        
        <div className="bg-theme-card rounded-2xl p-3 md:p-6 shadow-theme-medium">
          {/* Заголовок с навигацией */}
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-lg bg-theme-tertiary hover:bg-theme-hover transition-colors text-lg md:text-xl"
            >
              ←
            </button>
            <h3 className="text-lg md:text-xl font-semibold text-theme-primary capitalize">
              {monthName}
            </h3>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg bg-theme-tertiary hover:bg-theme-hover transition-colors text-lg md:text-xl"
            >
              →
            </button>
          </div>

          {/* Дни недели */}
          <div className="grid grid-cols-7 gap-1 md:gap-2 mb-3 md:mb-4">
            {t.daysShort.map(day => (
              <div key={day} className="p-1 md:p-2 text-center text-theme-secondary font-semibold text-xs md:text-sm">
                {day}
              </div>
            ))}
          </div>

          {/* Календарная сетка */}
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {calendarDays.map((day, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: day.isCurrentMonth ? 1.05 : 1 }}
                whileTap={{ scale: day.isCurrentMonth ? 0.95 : 1 }}
                className={`
                  p-2 md:p-3 rounded-lg transition-all cursor-pointer border min-h-[50px] md:min-h-[60px]
                  ${day.isCurrentMonth 
                    ? 'bg-theme-tertiary border-theme-secondary hover:bg-theme-hover' 
                    : 'bg-theme-background border-transparent opacity-50 cursor-not-allowed'
                  }
                  ${day.hasData && day.isCurrentMonth ? 'ring-1 md:ring-2 ring-blue-500/20' : ''}
                  ${day.isHistorical && day.isCurrentMonth ? 'border-l-2 md:border-l-4 border-l-blue-400' : ''}
                  ${day.isFuture && day.isCurrentMonth ? 'border-l-2 md:border-l-4 border-l-green-400' : ''}
                `}
                onClick={() => handleDayClick(day)}
              >
                <div className={`text-xs md:text-sm font-medium ${
                  day.isCurrentMonth ? 'text-theme-primary' : 'text-theme-muted'
                }`}>
                  {day.date}
                </div>
                
                {day.isCurrentMonth && day.hasData && day.temperature && (
                  <div className="text-xs text-theme-secondary mt-1">
                    {userSettings.temperatureUnit === 'celsius'
                      ? `${Math.round(day.temperature.max)}°`
                      : `${Math.round(day.temperature.max * 9/5 + 32)}°`
                    }
                  </div>
                )}
                
                {day.isCurrentMonth && !day.hasData && (
                  <div className="text-xs text-theme-muted mt-1">--°</div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Легенда */}
          <div className="mt-4 md:mt-6 flex flex-wrap justify-center items-center gap-3 md:gap-6 text-xs text-theme-secondary">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 md:w-4 md:h-4 border-l-2 md:border-l-4 border-l-blue-400 bg-theme-tertiary rounded"></div>
              <span>{t.history}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 md:w-4 md:h-4 border-l-2 md:border-l-4 border-l-green-400 bg-theme-tertiary rounded"></div>
              <span>{t.forecast}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 md:w-4 md:h-4 ring-1 md:ring-2 ring-blue-500/20 bg-theme-tertiary rounded"></div>
              <span>{t.hasData}</span>
            </div>
          </div>

          {/* Подсказка */}
          <div className="mt-3 md:mt-4 text-center text-xs md:text-sm text-theme-secondary">
            {isLoading ? (
              t.loading
            ) : (
              <>
                {t.clickDayForDetails}
                <br />
                <span className="text-xs text-theme-muted">
                  {t.historicalAndExtendedNote}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно с деталями дня */}
      <DayDetailModal
        day={selectedDay}
        onClose={() => setSelectedDay(null)}
        temperatureUnit={userSettings.temperatureUnit}
      />
    </Layout>
  )
} 