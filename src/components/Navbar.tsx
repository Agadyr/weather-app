'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, LayoutDashboard, Calendar, Bell, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

interface NavItem {
  id: string
  icon: React.ComponentType<{ className?: string }>
  labelKey: keyof import('@/utils/translations').Translations
  path: string
}

const getNavItems = (): NavItem[] => [
  { id: 'home', icon: Home, labelKey: 'dashboard', path: '/' },
  { id: 'dashboard', icon: LayoutDashboard, labelKey: 'dashboard', path: '/dashboard' },
  { id: 'calendar', icon: Calendar, labelKey: 'calendar', path: '/calendar' },
  { id: 'notifications', icon: Bell, labelKey: 'notifications', path: '/notifications' },
]

const Navbar = () => {
  const pathname = usePathname()
  const navItems = getNavItems()

  const getActiveItem = () => {
    if (pathname === '/') return 'home'
    if (pathname === '/dashboard') return 'dashboard'
    if (pathname === '/calendar') return 'calendar'
    if (pathname === '/notifications') return 'notifications'
    if (pathname === '/settings') return 'settings'
    return 'home'
  }

  const activeItem = getActiveItem()

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex w-20 h-screen bg-theme-secondary flex-col items-center py-8 fixed left-0 top-0 z-50">
      {/* Navigation Items */}
      <div className="flex flex-col gap-8 flex-1 mt-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id
          
          return (
            <Link key={item.id} href={item.path}>
              <motion.div
                className="relative w-full flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Активная белая линия слева */}
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 rounded-r-lg h-12 bg-white shadow-lg z-10"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
                
                {/* Фон и подсветка для активного элемента */}
                <div 
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 relative ${
                    isActive 
                      ? 'bg-theme-accent bg-opacity-20 backdrop-blur-sm shadow-theme-medium' 
                      : 'hover:bg-theme-hover'
                  }`}
                >
                  <Icon 
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? 'text-theme-accent' : 'text-theme-muted hover:text-theme-secondary'
                    }`} 
                  />
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>

      {/* Settings в середине снизу */}
      <div className="mb-12">
        <Link href="/settings">
          <motion.div
            className="relative w-full flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Активная белая линия слева */}
            {activeItem === 'settings' && (
              <motion.div
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 rounded-r-lg h-12 bg-white shadow-lg z-10"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
            
            <div 
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                activeItem === 'settings' 
                  ? 'bg-theme-accent bg-opacity-20 backdrop-blur-sm shadow-theme-medium' 
                  : 'hover:bg-theme-hover'
              }`}
            >
              <Settings 
                className={`w-5 h-5 transition-colors duration-300 ${
                  activeItem === 'settings' ? 'text-theme-accent' : 'text-theme-muted hover:text-theme-secondary'
                }`} 
              />
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Help/Support внизу */}
      <div className="mb-4">
        <motion.div
          className="w-12 h-12 rounded-full bg-theme-tertiary flex items-center justify-center cursor-pointer hover:bg-theme-hover transition-all duration-300 border border-theme-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-theme-primary font-bold text-sm">N</span>
        </motion.div>
      </div>
    </div>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-theme-secondary border-t border-theme-primary z-50 pb-safe">
        <div className="flex justify-around items-center py-3 px-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            
            return (
              <Link key={item.id} href={item.path}>
                <motion.div
                  className="relative flex flex-col items-center justify-center cursor-pointer py-2 px-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Активная линия сверху */}
                  {isActive && (
                    <motion.div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-1 rounded-full bg-white shadow-lg"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  )}
                  
                  {/* Фон для активного элемента */}
                  <motion.div 
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-theme-accent bg-opacity-20 backdrop-blur-sm shadow-theme-medium border border-theme-accent border-opacity-30' 
                        : 'hover:bg-theme-hover'
                    }`}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon 
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isActive ? 'text-theme-accent' : 'text-theme-muted'
                      }`} 
                    />
                  </motion.div>
                </motion.div>
              </Link>
            )
          })}
          
          {/* Settings в мобильном навбаре */}
          <Link href="/settings">
            <motion.div
              className="relative flex flex-col items-center justify-center cursor-pointer py-2 px-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Активная линия сверху */}
              {activeItem === 'settings' && (
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-1 rounded-full bg-white shadow-lg"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              )}
              
              <motion.div 
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  activeItem === 'settings' 
                    ? 'bg-theme-accent bg-opacity-20 backdrop-blur-sm shadow-theme-medium border border-theme-accent border-opacity-30' 
                    : 'hover:bg-theme-hover'
                }`}
                animate={{
                  scale: activeItem === 'settings' ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <Settings 
                  className={`w-5 h-5 transition-colors duration-300 ${
                    activeItem === 'settings' ? 'text-theme-accent' : 'text-theme-muted'
                  }`} 
                />
              </motion.div>
            </motion.div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
