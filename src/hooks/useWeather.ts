"use client";
import { useWeatherStore } from '@/store/weatherStore'

export const useWeather = () => {
  const weatherData = useWeatherStore(state => state.weatherData)
  const isLoading = useWeatherStore(state => state.isLoading)
  const error = useWeatherStore(state => state.error)
  
  const isLocationModalOpen = useWeatherStore(state => state.isLocationModalOpen)
  const isLocationLoading = useWeatherStore(state => state.isLocationLoading)
  const locationError = useWeatherStore(state => state.locationError)
  
  const fetchWeatherData = useWeatherStore(state => state.fetchWeatherData)
  const setError = useWeatherStore(state => state.setError)
  const requestLocation = useWeatherStore(state => state.requestLocation)
  const denyLocation = useWeatherStore(state => state.denyLocation)
  const showLocationModal = useWeatherStore(state => state.showLocationModal)
  const hideLocationModal = useWeatherStore(state => state.hideLocationModal)

  return {
    weatherData,
    isLoading,
    error,
    
    isLocationModalOpen,
    isLocationLoading,
    locationError,
    
    fetchWeatherData,
    setError,
    requestLocation,
    denyLocation,
    showLocationModal,
    hideLocationModal,
  }
}
