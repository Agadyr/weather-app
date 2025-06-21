import { Language } from '@/store/weatherStore'

export interface Translations {
  // Common
  loading: string
  error: string
  save: string
  cancel: string
  close: string
  
  // Navigation
  dashboard: string
  calendar: string
  notifications: string
  settings: string
  
  // Weather
  temperature: string
  humidity: string
  windSpeed: string
  visibility: string
  uvIndex: string
  precipitation: string
  chanceOfRain: string
  chanceOfSnow: string
  pressure: string
  
  // Time
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moonPhase: string
  illumination: string
  
  // Calendar
  weatherCalendar: string
  history: string
  forecast: string
  hasData: string
  overview: string
  hourly: string
  astronomy: string
  dataUnavailable: string
  historicalDataNote: string
  forecastDataNote: string
  clickDayForDetails: string
  historicalAndExtendedNote: string
  
  // Days of week
  daysShort: string[]
  daysLong: string[]
  
  // Months
  months: string[]
  
  // Settings
  profile: string
  name: string
  email: string
  defaultLocation: string
  autoDetectLocation: string
  temperatureUnit: string
  celsius: string
  fahrenheit: string
  language: string
  russian: string
  english: string
  weatherAlerts: string
  dailyForecast: string
  
  // Greetings
  goodMorning: string
  goodAfternoon: string
  goodEvening: string
  goodNight: string
  hello: string
  
  // Weather conditions (common ones)
  sunny: string
  cloudy: string
  partlyCloudy: string
  overcast: string
  rain: string
  feelsLike: string
  snow: string
  thunderstorm: string
  fog: string
  clear: string
  mostlySunny: string
  
  // Countries and cities
  australia: string
  canberra: string
  japan: string
  tokyo: string
  
  // Common phrases
  today: string
  tryAgain: string
  loadingWeatherData: string
  
  // Humidity descriptions
  highHumidity: string
  normalHumidity: string
  lowHumidity: string
  
  // UV descriptions
  highUV: string
  moderateUV: string
  lowUV: string
  
  // Component titles
  todaysHighlight: string
  dayForecast: string
  otherCountries: string
  seeAll: string
  
  // Weather metric titles
  windStatus: string
  humidityLabel: string
  uvIndexLabel: string
  visibilityLabel: string
  sunriseLabel: string
  sunsetLabel: string
}

const translations: Record<Language, Translations> = {
  ru: {
    // Common
    loading: 'Загрузка...',
    error: 'Ошибка',
    save: 'Сохранить',
    cancel: 'Отмена',
    close: 'Закрыть',
    
    // Navigation
    dashboard: 'Главная',
    calendar: 'Календарь',
    notifications: 'Уведомления',
    settings: 'Настройки',
    
    // Weather
    temperature: 'Температура',
    humidity: 'Влажность',
    windSpeed: 'Скорость ветра',
    visibility: 'Видимость',
    uvIndex: 'УФ индекс',
    precipitation: 'Осадки',
    chanceOfRain: 'Вероятность дождя',
    chanceOfSnow: 'Вероятность снега',
    pressure: 'Давление',
    
    // Time
    sunrise: 'Восход',
    sunset: 'Закат',
    moonrise: 'Восход луны',
    moonset: 'Заход луны',
    moonPhase: 'Фаза луны',
    illumination: 'Освещенность',
    
    // Calendar
    weatherCalendar: 'Календарь погоды',
    history: 'История',
    forecast: 'Прогноз',
    hasData: 'Есть данные',
    overview: 'Обзор',
    hourly: 'По часам',
    astronomy: 'Астрономия',
    dataUnavailable: 'Данные для этой даты недоступны',
    historicalDataNote: 'Исторические данные доступны только для последних 7 дней',
    forecastDataNote: 'Прогноз доступен только на ближайшие 14 дней',
    clickDayForDetails: 'Нажмите на день чтобы увидеть подробный прогноз',
    historicalAndExtendedNote: 'Исторические данные и расширенный прогноз загружаются по клику',
    
    // Days of week
    daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    daysLong: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    
    // Months
    months: [
      'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
      'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ],
    
    // Settings
    profile: 'Профиль',
    name: 'Имя',
    email: 'Email',
    defaultLocation: 'Местоположение по умолчанию',
    autoDetectLocation: 'Автоопределение местоположения',
    temperatureUnit: 'Единицы температуры',
    celsius: 'Цельсий',
    fahrenheit: 'Фаренгейт',
    language: 'Язык',
    russian: 'Русский',
    english: 'English',
    weatherAlerts: 'Погодные предупреждения',
    dailyForecast: 'Ежедневный прогноз',
    
    // Greetings
    goodMorning: 'Доброе утро',
    goodAfternoon: 'Добрый день',
    goodEvening: 'Добрый вечер',
    goodNight: 'Доброй ночи',
    hello: 'Привет',
    
    // Weather conditions
    sunny: 'Солнечно',
    cloudy: 'Облачно',
    partlyCloudy: 'Переменная облачность',
    overcast: 'Пасмурно',
    rain: 'Дождь',
    snow: 'Снег',
    thunderstorm: 'Гроза',
    fog: 'Туман',
    clear: 'Ясно',
    feelsLike: 'Ощущается как',
    mostlySunny: 'Преимущественно солнечно',
    
    // Countries and cities
    australia: 'Австралия',
    canberra: 'Канберра',
    japan: 'Япония',
    tokyo: 'Токио',
    
    // Common phrases
    today: 'Сегодня',
    tryAgain: 'Попробовать снова',
    loadingWeatherData: 'Загрузка данных о погоде...',
    
    // Humidity descriptions
    highHumidity: 'Высокая влажность',
    normalHumidity: 'Нормальная влажность',
    lowHumidity: 'Низкая влажность',
    
    // UV descriptions
    highUV: 'Высокий УФ',
    moderateUV: 'Умеренный УФ',
    lowUV: 'Низкий УФ',
    
    // Component titles
    todaysHighlight: 'Сегодняшние показатели',
    dayForecast: '10-дневный прогноз',
    otherCountries: 'Другие страны',
    seeAll: 'Показать все',
    
    // Weather metric titles
    windStatus: 'Состояние ветра',
    humidityLabel: 'Влажность',
    uvIndexLabel: 'УФ индекс',
    visibilityLabel: 'Видимость',
    sunriseLabel: 'Восход',
    sunsetLabel: 'Закат'
  },
  
  en: {
    // Common
    loading: 'Loading...',
    error: 'Error',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    
    // Navigation
    dashboard: 'Dashboard',
    calendar: 'Calendar',
    notifications: 'Notifications',
    settings: 'Settings',
    
    // Weather
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    feelsLike: 'Feels Like',
    visibility: 'Visibility',
    uvIndex: 'UV Index',
    precipitation: 'Precipitation',
    chanceOfRain: 'Chance of Rain',
    chanceOfSnow: 'Chance of Snow',
    pressure: 'Pressure',
    
    // Time
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    moonrise: 'Moonrise',
    moonset: 'Moonset',
    moonPhase: 'Moon Phase',
    illumination: 'Illumination',
    
    // Calendar
    weatherCalendar: 'Weather Calendar',
    history: 'History',
    forecast: 'Forecast',
    hasData: 'Has Data',
    overview: 'Overview',
    hourly: 'Hourly',
    astronomy: 'Astronomy',
    dataUnavailable: 'Data for this date is unavailable',
    historicalDataNote: 'Historical data is only available for the last 7 days',
    forecastDataNote: 'Forecast is only available for the next 14 days',
    clickDayForDetails: 'Click on a day to see detailed forecast',
    historicalAndExtendedNote: 'Historical data and extended forecast are loaded on click',
    
    // Days of week
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysLong: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    
    // Months
    months: [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ],
    
    // Settings
    profile: 'Profile',
    name: 'Name',
    email: 'Email',
    defaultLocation: 'Default Location',
    autoDetectLocation: 'Auto-detect Location',
    temperatureUnit: 'Temperature Unit',
    celsius: 'Celsius',
    fahrenheit: 'Fahrenheit',
    language: 'Language',
    russian: 'Русский',
    english: 'English',
    weatherAlerts: 'Weather Alerts',
    dailyForecast: 'Daily Forecast',
    
    // Greetings
    goodMorning: 'Good morning',
    goodAfternoon: 'Good afternoon',
    goodEvening: 'Good evening',
    goodNight: 'Good night',
    hello: 'Hello',
    
    // Weather conditions
    sunny: 'Sunny',
    cloudy: 'Cloudy',
    partlyCloudy: 'Partly Cloudy',
    overcast: 'Overcast',
    rain: 'Rain',
    snow: 'Snow',
    thunderstorm: 'Thunderstorm',
    fog: 'Fog',
    clear: 'Clear',
    mostlySunny: 'Mostly Sunny',
    
    // Countries and cities
    australia: 'Australia',
    canberra: 'Canberra',
    japan: 'Japan',
    tokyo: 'Tokyo',
    
    // Common phrases
    today: 'Today',
    tryAgain: 'Try Again',
    loadingWeatherData: 'Loading weather data...',
    
    // Humidity descriptions
    highHumidity: 'High humidity',
    normalHumidity: 'Normal humidity',
    lowHumidity: 'Low humidity',
    
    // UV descriptions
    highUV: 'High UV',
    moderateUV: 'Moderate UV',
    lowUV: 'Low UV',
    
    // Component titles
    todaysHighlight: 'Today\'s Highlight',
    dayForecast: '10 Day Forecast',
    otherCountries: 'Other Countries',
    seeAll: 'See All',
    
    // Weather metric titles
    windStatus: 'Wind Status',
    humidityLabel: 'Humidity',
    uvIndexLabel: 'UV Index',
    visibilityLabel: 'Visibility',
    sunriseLabel: 'Sunrise',
    sunsetLabel: 'Sunset'
  }
}

export const getTranslations = (language: Language): Translations => {
  return translations[language]
}

export const formatDate = (date: Date, language: Language, options?: Intl.DateTimeFormatOptions): string => {
  const locale = language === 'ru' ? 'ru-RU' : 'en-US'
  return date.toLocaleDateString(locale, options)
}

export const formatTime = (time: string, language: Language): string => {
  // Convert 24-hour format to 12-hour for English, keep 24-hour for Russian
  if (language === 'en') {
    const [hours, minutes] = time.split(':')
    const hour24 = parseInt(hours)
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24
    const ampm = hour24 >= 12 ? 'PM' : 'AM'
    return `${hour12}:${minutes} ${ampm}`
  }
  return time
}

export default translations 