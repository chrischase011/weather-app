export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { city } = getQuery(event);
  // const city = getRouterParam(event, 'city') || 'Pasay';
  const apiKey = config.OPEN_WEATHER_MAP_API_KEY;

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  if (!response.ok) {
    return { error: 'Failed to fetch weather data' };
  }

  const data = await response.json();
  return data;
});