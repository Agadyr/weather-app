import Layout from '@/components/Layout'
import { Bell, AlertTriangle, Info } from 'lucide-react'

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Heavy Rain Alert',
      message: 'Heavy rainfall expected in Dhaka from 2:00 PM to 6:00 PM',
      time: '30 mins ago',
      icon: AlertTriangle
    },
    {
      id: 2,
      type: 'info',
      title: 'UV Index High',
      message: 'UV index will reach 8 tomorrow. Use sun protection.',
      time: '1 hour ago',
      icon: Info
    },
    {
      id: 3,
      type: 'normal',
      title: 'Weather Update',
      message: 'Temperature will drop by 5°C tonight',
      time: '2 hours ago',
      icon: Bell
    }
  ]

  return (
    <Layout>
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-theme-primary">Notifications</h2>
        
        <div className="space-y-3 md:space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon
            const colorClass = {
              warning: 'text-yellow-400',
              info: 'text-blue-400',
              normal: 'text-theme-muted'
            }[notification.type]

            return (
              <div key={notification.id} className="bg-theme-card rounded-2xl p-4 md:p-6 border border-theme-primary shadow-theme-medium hover:bg-theme-hover transition-colors cursor-pointer">
                <div className="flex items-start gap-3 md:gap-4">
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${colorClass} mt-1 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-theme-primary mb-1">{notification.title}</h3>
                    <p className="text-sm md:text-base text-theme-secondary mb-2 break-words">{notification.message}</p>
                    <span className="text-xs md:text-sm text-theme-muted">{notification.time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
} 