import { WeatherApiResponse, LocationSearchResult } from '@/types/weather'

const API_KEY = '1a846683440a461abe3173417252006'
const BASE_URL = 'https://api.weatherapi.com/v1'

export class WeatherApiService {
  private static instance: WeatherApiService
  
  private constructor() {}

  private async safeJsonParse(response: Response) {
    const text = await response.text()
    if (!text.trim()) {
      throw new Error('Empty response from API')
    }
    try {
      return JSON.parse(text)
    } catch (error) {
      console.error('JSON parse error:', error, 'Response text:', text)
      throw new Error('Invalid JSON response from API')
    }
  }
  
  public static getInstance(): WeatherApiService {
    if (!WeatherApiService.instance) {
      WeatherApiService.instance = new WeatherApiService()
    }
    return WeatherApiService.instance
  }

  async getCurrentWeather(location: string, lang: string = 'ru'): Promise<WeatherApiResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=yes&lang=${lang}`
      )
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`)
      }
      
      return await this.safeJsonParse(response)
    } catch (error) {
      console.error('Error fetching current weather:', error)
      throw error
    }
  }

  async getForecast(location: string, days: number = 10, lang: string = 'ru'): Promise<WeatherApiResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=${days}&aqi=yes&alerts=yes&lang=${lang}`
      )
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`)
      }
      
      return await this.safeJsonParse(response)
    } catch (error) {
      console.error('Error fetching forecast:', error)
      throw error
    }
  }

  async getHistory(location: string, date: string, lang: string = 'ru'): Promise<WeatherApiResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/history.json?key=${API_KEY}&q=${location}&dt=${date}&aqi=yes&lang=${lang}`
      )
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`)
      }
      
      return await this.safeJsonParse(response)
    } catch (error) {
      console.error('Error fetching history:', error)
      throw error
    }
  }

  async getFuture(location: string, date: string, lang: string = 'ru'): Promise<WeatherApiResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/future.json?key=${API_KEY}&q=${location}&dt=${date}&aqi=yes&lang=${lang}`
      )
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`)
      }
      
      return await this.safeJsonParse(response)
    } catch (error) {
      console.error('Error fetching future:', error)
      throw error
    }
  }

  async getAstronomy(location: string, date?: string): Promise<WeatherApiResponse> {
    try {
      const dateParam = date || new Date().toISOString().split('T')[0]
      const response = await fetch(
        `${BASE_URL}/astronomy.json?key=${API_KEY}&q=${location}&dt=${dateParam}`
      )
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`)
      }
      
      return await this.safeJsonParse(response)
    } catch (error) {
      console.error('Error fetching astronomy data:', error)
      throw error
    }
  }

  async searchLocations(query: string): Promise<LocationSearchResult[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`
      )
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`)
      }
      
      return await this.safeJsonParse(response)
    } catch (error) {
      console.error('Error searching locations:', error)
      throw error
    }
  }
}

export const weatherApi = WeatherApiService.getInstance() 