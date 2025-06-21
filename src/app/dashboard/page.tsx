import Layout from '@/components/Layout'

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-theme-primary">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-theme-card rounded-2xl p-4 md:p-6 border border-theme-primary shadow-theme-medium hover:shadow-theme-heavy transition-all duration-300">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-theme-primary">Weather Overview</h3>
            <p className="text-sm md:text-base text-theme-secondary">Detailed weather analytics and trends</p>
          </div>
          
          <div className="bg-theme-card rounded-2xl p-4 md:p-6 border border-theme-primary shadow-theme-medium hover:shadow-theme-heavy transition-all duration-300">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-theme-primary">Forecasts</h3>
            <p className="text-sm md:text-base text-theme-secondary">Extended weather forecasts</p>
          </div>
          
          <div className="bg-theme-card rounded-2xl p-4 md:p-6 border border-theme-primary shadow-theme-medium hover:shadow-theme-heavy transition-all duration-300">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-theme-primary">Alerts</h3>
            <p className="text-sm md:text-base text-theme-secondary">Weather alerts and notifications</p>
          </div>
        </div>
      </div>
    </Layout>
  )
} 