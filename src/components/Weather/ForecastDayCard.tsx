import Image from 'next/image'
import { useWeatherStore } from '@/store/weatherStore'

interface ForecastDayCardProps {
  day: string
  icon: string
  temperature: number
  condition: string
}

const ForecastDayCard = ({ day, icon, temperature, condition }: ForecastDayCardProps) => {
  const { convertTemperature, getTemperatureSymbol } = useWeatherStore()
  return (
    <div className="flex flex-col items-center justify-between bg-theme-tertiary rounded-2xl shadow-theme-light px-4 py-4 min-w-[80px] max-w-[90px] mx-auto hover:bg-theme-hover transition-colors">
      <span className="text-xs text-theme-muted mb-1">{day}</span>
      <div className="w-14 h-14 flex items-center justify-center my-3">
        {icon.startsWith('/') ? (
          <Image src={icon} alt={condition} width={53} height={53} />
        ) : (
          <span className="text-2xl">{icon}</span>
        )}
      </div>
      <span className="text-lg font-semibold text-theme-primary">
        {Math.round(convertTemperature(temperature))}{getTemperatureSymbol()}
      </span>
    </div>
  )
}

export default ForecastDayCard 