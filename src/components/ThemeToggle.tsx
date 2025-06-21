'use client'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useWeatherStore } from '@/store/weatherStore'

const ThemeToggle = () => {
  const theme = useWeatherStore(state => state.theme)
  const toggleTheme = () => {
    useWeatherStore.getState().toggleTheme()
  }

  return (
    <div className="flex items-center justify-center">
      <motion.button
        onClick={toggleTheme}
        className={`
          relative w-20 h-12 rounded-full p-1 cursor-pointer
          transition-colors duration-300 ease-in-out
          bg-theme-tertiary
        `}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
          <Sun 
            size={20} 
            className={`transition-all duration-300 ${
              theme === 'dark' ? 'text-gray-500 scale-90' : 'text-amber-500 scale-100'
            }`}
          />
          <Moon 
            size={20} 
            className={`transition-all duration-300 ${
              theme === 'dark' ? 'text-blue-300 scale-100' : 'text-gray-400 scale-90'
            }`}
          />
        </div>

        {/* Knob */}
        <motion.div
          className={`
            relative w-10 h-10 rounded-full shadow-lg
            flex items-center justify-center z-10
            ${theme === 'dark' 
              ? 'bg-slate-800 border border-slate-600' 
              : 'bg-white border border-gray-100'
            }
          `}
          animate={{
            x: theme === 'dark' ? 40 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 0.8
          }}
        >
          <motion.div
            initial={false}
            animate={{
              rotate: theme === 'dark' ? 180 : 0,
              scale: theme === 'dark' ? 1.1 : 1
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            {theme === 'dark' ? (
              <Moon 
                size={24} 
                className="text-blue-300 fill-blue-300/20" 
              />
            ) : (
              <Sun 
                size={24} 
                className="text-amber-500 fill-amber-500/20" 
              />
            )}
          </motion.div>
        </motion.div>

        {/* Glow Effect */}
        <motion.div
          className={`absolute inset-0 rounded-full pointer-events-none ${
            theme === 'dark' ? 'bg-blue-500/10' : 'bg-amber-500/10'
          }`}
          animate={{
            opacity: theme === 'dark' ? 0.5 : 0.3,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

    </div>
  )
}

export default ThemeToggle