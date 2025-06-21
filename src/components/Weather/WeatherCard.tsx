import Image from 'next/image'
import { MapPin, ChevronDown } from 'lucide-react'
import { useWeatherStore } from '@/store/weatherStore'
import { getTranslations } from '@/utils/translations'

interface WeatherCardProps {
  location: string
  country: string
  day: string
  date: string
  temperature: number
  lowTemp: number
  condition: string
  feelsLike: number
  weatherIcon: string
}

const WeatherCard = ({ 
  location, 
  country, 
  day, 
  date, 
  temperature, 
  lowTemp, 
  condition, 
  feelsLike,
  weatherIcon 
}: WeatherCardProps) => {
  const { userSettings, convertTemperature, getTemperatureSymbol, setTemperatureUnit } = useWeatherStore()
  const t = getTranslations(userSettings.language)
  const toggleTemperatureUnit = () => {
    const newUnit = userSettings.temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius'
    setTemperatureUnit(newUnit)
  }

  return (
    <div className="bg-theme-card rounded-2xl p-4 md:p-6 shadow-theme-medium">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center bg-theme-tertiary text-theme-primary text-xs px-3 py-1 rounded-full font-medium border border-theme-secondary">
            <MapPin className="w-4 h-4 mr-1 text-theme-secondary" />
            <span className="truncate max-w-[150px] md:max-w-none">{location}, {country}</span>
          </span>
        </div>
        <span 
          className="flex items-center bg-theme-tertiary text-theme-primary text-xs px-3 py-1 rounded-full font-medium border border-theme-secondary cursor-pointer hover:bg-theme-hover transition-colors" 
          onClick={toggleTemperatureUnit}
        >
          {getTemperatureSymbol()} <ChevronDown className="w-3 h-3 ml-1 text-theme-muted" />
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-center">
          <span className="text-2xl md:text-3xl font-bold text-theme-primary leading-tight mb-1">{day}</span>
          <span className="text-theme-secondary text-xs mb-2">{date}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-3xl md:text-4xl font-bold text-theme-primary leading-tight">
            {Math.round(convertTemperature(temperature))}{getTemperatureSymbol()}
          </span>
          <span className="text-theme-secondary text-base md:text-lg -mt-1">
            /{Math.round(convertTemperature(lowTemp))}{getTemperatureSymbol()}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-2 mb-2">
        <Image src={weatherIcon} alt={condition} width={80} height={80} className="mx-auto md:w-[100px] md:h-[100px]" />
      </div>
      <div className="text-center md:text-right">
        <span className="font-semibold text-theme-primary text-sm md:text-base">{condition}</span>
        <br />
        <span className="text-theme-secondary text-xs">
          {t.feelsLike} {Math.round(convertTemperature(feelsLike))}{getTemperatureSymbol()}
        </span>
      </div>
    </div>
  )
}

export default WeatherCard 