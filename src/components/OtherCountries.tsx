'use client'
import React from 'react'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useWeatherStore } from '@/store/weatherStore'
import { getTranslations } from '@/utils/translations'

interface CountryWeather {
  country: string
  city: string
  condition: string
  temperature: number
  lowTemp: number
  icon: 'sun' | 'cloudy-sun' | 'cloudy' | 'rainy' | 'snowy'
}

interface OtherCountriesProps {
  countries: CountryWeather[]
}

const OtherCountries: React.FC<OtherCountriesProps> = ({ countries }) => {
  const { userSettings } = useWeatherStore()
  const t = getTranslations(userSettings.language)

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case 'sun':
        return <Image src="/icons/image 8.svg" alt="sun" width={55} height={55} />
      case 'cloudy-sun':
        return <Image src="/icons/image 7.svg" alt="cloudy-sun" width={55} height={55} />
      default:
        return <Image src="/icons/image 8.svg" alt="sun" width={55} height={55} />
    }
  }

  return (
    <div className="bg-theme-card rounded-2xl p-4 md:p-6 shadow-theme-medium">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-theme-primary">{t.otherCountries}</h3>
        <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm">
          {t.seeAll}
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
      
      <div className="space-y-4">
        {countries.map((country, index) => (
          <div key={index} className="flex items-center justify-between bg-theme-tertiary rounded-3xl p-4 hover:bg-theme-hover transition-colors cursor-pointer">
            <div className='w-[20%]'>
              <p className="text-theme-muted text-sm">{country.country}</p>
              <p className="font-semibold text-lg my-2 text-theme-primary">{country.city}</p>
              <p className="text-theme-secondary text-xs">{country.condition}</p>
            </div>
            <div className="w-14 h-14 flex items-center justify-center">
              {getWeatherIcon(country.icon)}
            </div>
            <div className="font-semibold text-theme-primary flex items-end">
              <span className="text-lg">{country.temperature}°</span>
              <span className="text-theme-muted text-xs">/{country.lowTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OtherCountries 