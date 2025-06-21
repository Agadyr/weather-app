'use client'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { MapPin, X, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useWeatherStore } from '@/store/weatherStore'

const LocationModal: React.FC = () => {
  const { 
    isLocationModalOpen, 
    isLocationLoading, 
    locationError,
    requestLocation,
    denyLocation,
    hideLocationModal 
  } = useWeatherStore()
  
  const [isDenied, setIsDenied] = useState(false)

  const handleDeny = () => {
    setIsDenied(true)
    setTimeout(() => {
      denyLocation()
    }, 500)
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  }

  const iconVariants = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
        delay: 0.2
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  }

  return (
    <AnimatePresence>
      {isLocationModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={hideLocationModal}
        >
          <motion.div
            className="bg-theme-modal rounded-3xl p-8 max-w-md w-full mx-4 shadow-theme-heavy border border-theme-primary"
            variants={modalVariants as Variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <motion.button
              className="absolute top-4 right-4 text-theme-muted hover:text-theme-primary transition-colors"
              onClick={hideLocationModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Иконка */}
            <motion.div
              className="flex justify-center mb-6"
              variants={iconVariants as Variants}
              initial="initial"
              animate={isLocationLoading ? "pulse" : "animate"}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                {locationError ? (
                  <AlertCircle className="w-10 h-10 text-white" />
                ) : (
                  <MapPin className="w-10 h-10 text-white" />
                )}
              </div>
            </motion.div>

            {/* Заголовок и описание */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-theme-primary mb-3">
                {locationError ? 'Ошибка доступа' : 'Доступ к местоположению'}
              </h2>
              <p className="text-theme-secondary leading-relaxed">
                {locationError ? (
                  locationError
                ) : isLocationLoading ? (
                  'Получаем ваше местоположение...'
                ) : (
                  'Разрешите доступ к вашему местоположению для получения точного прогноза погоды в вашем регионе'
                )}
              </p>
            </motion.div>

            {/* Кнопки */}
            {!isLocationLoading && (
              <motion.div
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {!locationError && (
                  <motion.button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-theme-medium hover:shadow-theme-heavy transition-all duration-300"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={requestLocation}
                    disabled={isDenied}
                  >
                    Разрешить доступ
                  </motion.button>
                )}
                
                <motion.button
                  className="w-full bg-theme-tertiary text-theme-secondary py-4 rounded-xl font-semibold hover:bg-theme-hover border border-theme-primary transition-all duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={locationError ? hideLocationModal : handleDeny}
                >
                  {locationError ? 'Закрыть' : 'Не сейчас'}
                </motion.button>
              </motion.div>
            )}

            {/* Индикатор загрузки */}
            {isLocationLoading && (
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LocationModal 