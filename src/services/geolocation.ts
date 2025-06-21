import { LocationData } from '@/types/weather'

export interface GeolocationError {
  code: number
  message: string
}

export class GeolocationService {
  static async getCurrentPosition(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject({
          code: 0,
          message: 'Геолокация не поддерживается вашим браузером'
        })
        return
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 минут
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          let message = 'Неизвестная ошибка получения местоположения'
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'Доступ к геолокации запрещен пользователем'
              break
            case error.POSITION_UNAVAILABLE:
              message = 'Информация о местоположении недоступна'
              break
            case error.TIMEOUT:
              message = 'Превышено время ожидания запроса местоположения'
              break
          }
          
          reject({
            code: error.code,
            message
          })
        },
        options
      )
    })
  }

  static async reverseGeocode(lat: number, lng: number): Promise<LocationData> {
    try {
      // Используем OpenStreetMap Nominatim для обратного геокодирования
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ru`
      )
      
      if (!response.ok) {
        throw new Error('Ошибка геокодирования')
      }
      
      const data = await response.json()
      
      return {
        lat,
        lng,
        city: data.address?.city || data.address?.town || data.address?.village || 'Неизвестно',
        country: data.address?.country || 'Неизвестно'
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error)
      return { lat, lng }
    }
  }
} 