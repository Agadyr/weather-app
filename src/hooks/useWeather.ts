"use client";
import { useWeatherStore } from '@/store/weatherStore'

// Простой хук для удобства использования в компонентах
export const useWeather = () => {
  // Данные
  const weatherData = useWeatherStore(state => state.weatherData)
  const isLoading = useWeatherStore(state => state.isLoading)
  const error = useWeatherStore(state => state.error)
  
  // Location modal
  const isLocationModalOpen = useWeatherStore(state => state.isLocationModalOpen)
  const isLocationLoading = useWeatherStore(state => state.isLocationLoading)
  const locationError = useWeatherStore(state => state.locationError)
  
  // Actions
  const fetchWeatherData = useWeatherStore(state => state.fetchWeatherData)
  const setError = useWeatherStore(state => state.setError)
  const requestLocation = useWeatherStore(state => state.requestLocation)
  const denyLocation = useWeatherStore(state => state.denyLocation)
  const showLocationModal = useWeatherStore(state => state.showLocationModal)
  const hideLocationModal = useWeatherStore(state => state.hideLocationModal)

  return {
    // Данные
    weatherData,
    isLoading,
    error,
    
    // Location modal состояния
    isLocationModalOpen,
    isLocationLoading,
    locationError,
    
    // Действия
    fetchWeatherData,
    setError,
    requestLocation,
    denyLocation,
    showLocationModal,
    hideLocationModal,
  }
}
