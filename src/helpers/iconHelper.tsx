// Универсальный хелпер для иконок и видео по погоде

const weatherAssets = [
  {
    keys: ['sun', 'clear', 'mostly sunny', 'ясно', 'солн'],
    icon: '/icons/image8.svg',
    videos: ['/videos/sunny.mp4', '/videos/sunny2.mp4'],
  },
  {
    keys: ['cloudy', 'облачно'],
    icon: '/icons/image7.svg',
    videos: ['/videos/cloudy.mp4', '/videos/cloudy2.mp4'],
  },
  {
    keys: ['rain', 'дождь'],
    icon: '/icons/Raincloud.svg',
    videos: ['/videos/rain.mp4', '/videos/rain2.mp4'],
  },
  {
    keys: ['storm', 'drizzle', 'thunder', 'гроза', 'гром'],
    icon: '/icons/storm.svg',
    videos: ['/videos/thunder.mp4', '/videos/thunder2.mp4'],
  },
  {
    keys: ['fog'],
    icon: '/icons/fog.svg',
    videos: [],
  },
  {
    keys: ['wind'],
    icon: '/icons/wind.svg',
    videos: [],
  },
]

const getWeatherAsset = (icon: string) => {
  const iconLower = icon.toLowerCase()
  for (const asset of weatherAssets) {
    if (asset.keys.some(key => iconLower.includes(key))) {
      return asset
    }
  }
  return weatherAssets[1]
}

export const getWeatherIcon = (icon: string) => {
  return getWeatherAsset(icon).icon
}

export const getWeatherVideo = (icon: string) => {
  const videos = getWeatherAsset(icon).videos
  if (videos && videos.length > 0) {
    return videos[Math.floor(Math.random() * videos.length)]
  }
  return null
}
