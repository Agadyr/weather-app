'use client'
import LocationModal from './LocationModal'
import Navbar from './Navbar'
import Topbar from './Topbar'
import ThemeProvider from './ThemeProvider'
import { LocationData } from '@/types/weather'

interface LayoutProps {
  children: React.ReactNode
  onLocationChange?: (location: LocationData) => void
}

const Layout = ({ children, onLocationChange }: LayoutProps) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-theme-primary text-theme-primary flex transition-all duration-300">
        <Navbar />
        <LocationModal />
        <main className="flex-1 ml-0 md:ml-20 p-4 md:p-8 pb-20 md:pb-8">
          <Topbar 
            onLocationChange={onLocationChange}
          />
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default Layout 