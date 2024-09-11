export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  // Get the 'city' parameter from the query string
  const { city = 'Pasay' } = getQuery(event)

  const apiKey = config.openWeatherMapApiKey;

  // const data = {
  //   "coord": { "lon": 121.0235, "lat": 14.5569 },
  //   "weather": [
  //     { "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }
  //   ],
  //   "base": "stations",
  //   "main": {
  //     "temp": 29.33,
  //     "feels_like": 36.33,
  //     "temp_min": 28.78,
  //     "temp_max": 29.84,
  //     "pressure": 1009,
  //     "humidity": 84,
  //     "sea_level": 1009,
  //     "grnd_level": 1005
  //   },
  //   "visibility": 9000,
  //   "wind": { "speed": 3.09, "deg": 290 },
  //   "rain": { "1h": 0.1 },
  //   "clouds": { "all": 75 },
  //   "dt": 1726017997,
  //   "sys": {
  //     "type": 1,
  //     "id": 8160,
  //     "country": "PH",
  //     "sunrise": 1726004674,
  //     "sunset": 1726048852
  //   },
  //   "timezone": 28800,
  //   "id": 1692193,
  //   "name": "Makati",
  //   "cod": 200
  // };


  // return data;

  // Fetch weather data from OpenWeatherMap
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

  if (!response.ok) {
    return { error: 'Failed to fetch weather data' };
  }

  const data = await response.json();
  return data;
});