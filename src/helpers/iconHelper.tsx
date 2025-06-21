const iconHelper = (icon: string) => {
    const iconLower = icon.toLowerCase()
    if (iconLower.includes('sun') || iconLower.includes('clear') || iconLower.includes('mostly sunny') || iconLower.includes('ясно') || iconLower.includes('солн')) {
        return '/icons/Image8.svg'
    } else if (iconLower.includes('cloudy') || iconLower.includes('облачно')) {
            return '/icons/Image7.svg'
    } else if (iconLower.includes('rain') || iconLower.includes('дождь')) {
        return '/icons/Raincloud.svg'
    } else if (iconLower.includes('storm') || iconLower.includes('drizzle') || iconLower.includes('thunder') || iconLower.includes('гроза') || iconLower.includes('гром')) {
        return '/icons/storm.svg'
    } else if (iconLower.includes('fog')) {
        return '/icons/fog.svg'
    } else if (iconLower.includes('wind')) {
        return '/icons/wind.svg'
    }
    return '/icons/Image7.svg'
}

export default iconHelper