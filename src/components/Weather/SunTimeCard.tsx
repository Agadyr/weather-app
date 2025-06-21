import { LucideIcon } from 'lucide-react'

interface SunTimeCardProps {
  icon: LucideIcon
  iconColor: string
  title: string
  time: string
}

const SunTimeCard = ({ 
  icon: Icon, 
  iconColor, 
  title, 
  time 
}: SunTimeCardProps) => {
  return (
    <div className="bg-theme-tertiary rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <span className="text-theme-secondary">{title}</span>
      </div>
      <div className="text-2xl font-bold text-theme-primary">{time}</div>
    </div>
  )
}

export default SunTimeCard 