export interface WeatherData {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    localtime: string
  }
  current: {
    temp_c: number
    temp_f: number
    condition: {
      text: string
      icon: string
      code: number
    }
    wind_mph: number
    wind_kph: number
    wind_dir: string
    humidity: number
    uv: number
    vis_km: number
    vis_miles: number
    precip_mm: number
    precip_in: number
    precip_probability: number
    precip_type: string
    precip_time: string
    precip_end_time: string
    feelslike_c: number
    feelslike_f: number
  }
  forecast: {
    forecastday: Array<{
      date: string
      day: {
        maxtemp_c: number
        maxtemp_f: number
        mintemp_c: number
        mintemp_f: number
        avgtemp_c: number
        avgtemp_f: number
        condition: {
          text: string
          icon: string
          code: number
        }
        totalprecip_mm: number
        totalprecip_in: number
        daily_chance_of_rain: number
        daily_chance_of_snow: number
        uv: number
        avghumidity: number
        maxwind_kph: number
        maxwind_mph: number
        avgvis_km: number
        avgvis_miles: number
      }
      astro: {
        sunrise: string
        sunset: string
        moonrise: string
        moonset: string
        moon_phase: string
        moon_illumination: string
      }
      hour: Array<{
        time: string
        temp_c: number
        temp_f: number
        condition: {
          text: string
          icon: string
          code: number
        }
        wind_kph: number
        wind_mph: number
        humidity: number
        precip_mm: number
        uv: number
        vis_km: number
        vis_miles: number
      }>
    }>
  }
}

export interface LocationData {
  lat: number
  lng: number
  city?: string
  country?: string
}

export interface WeatherApiResponse {
  location: WeatherData['location']
  current: WeatherData['current']
  forecast: WeatherData['forecast']
}

export interface LocationSearchResult {
  lat: number
  lon: number
  name: string
  country: string
  region?: string
}

export interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  fullDate: string
  temperature?: {
    max: number
    min: number
    avg: number
  }
  condition?: {
    text: string
    icon: string
    code: number
  }
  hasData: boolean
  isHistorical: boolean
  isFuture: boolean
  detailedData?: {
    humidity: number
    uv: number
    windSpeed: number
    windDir: string
    precipitation: number
    chanceOfRain: number
    chanceOfSnow: number
    visibility: number
    pressure?: number
    astro?: {
      sunrise: string
      sunset: string
      moonrise: string
      moonset: string
      moonPhase: string
      moonIllumination: string
    }
    hourlyData?: Array<{
      time: string
      temp: number
      condition: string
      icon: string
      humidity: number
      windSpeed: number
      precipitation: number
    }>
  }
} 

export interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  fullDate: string
  temperature?: {
    max: number
    min: number
    avg: number
  }
  condition?: {
    text: string
    icon: string
    code: number
  }
  hasData: boolean
  isHistorical: boolean
  isFuture: boolean
  detailedData?: {
    humidity: number
    uv: number
    windSpeed: number
    windDir: string
    precipitation: number
    chanceOfRain: number
    chanceOfSnow: number
    visibility: number
    pressure?: number
    astro?: {
      sunrise: string
      sunset: string
      moonrise: string
      moonset: string
      moonPhase: string
      moonIllumination: string
    }
    hourlyData?: Array<{
      time: string
      temp: number
      condition: string
      icon: string
      humidity: number
      windSpeed: number
      precipitation: number
    }>
  }
}