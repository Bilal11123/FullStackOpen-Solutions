const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_API_KEY

  useEffect(() => {
    if (!capital) return

    // 1️⃣ First get coordinates
    axios
      .get(`https://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${apiKey}`)
      .then(response => {
        if (response.data.length === 0) return
        const { lat, lon } = response.data[0]

        // 2️⃣ Then get actual weather
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        )
      })
      .then(response => {
        if (response) setWeather(response.data)
      })
      .catch(err => console.error('Error fetching weather:', err))
  }, [capital])

  if (!weather) return <div>Loading weather for {capital}...</div>
  console.log(weather)

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather