import { LucideIcon } from 'lucide-react'

interface WeatherMetricProps {
  icon: LucideIcon
  iconColor: string
  title: string
  value: string | number
  unit: string
  description: string
}

const WeatherMetric = ({ 
  icon: Icon, 
  iconColor, 
  title, 
  value, 
  unit, 
  description 
}: WeatherMetricProps) => {
  return (
    <div className="bg-theme-tertiary rounded-xl p-4 shadow-theme-light">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <span className="text-theme-secondary">{title}</span>
      </div>
      <div className="text-2xl font-bold mb-1 text-theme-primary">
        {value} <span className="text-sm text-theme-muted">{unit}</span>
      </div>
      <div className="text-xs text-theme-muted">{description}</div>
    </div>
  )
}

export default WeatherMetric 