import { ref } from "vue";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const query = event.context.query;
  const city = 'London'; // Default city if none is provided
  const apiKey = config.OPEN_WEATHER_MAP_API_KEY = "bd14fe6212a38b8f7e109fc105715afc"
    ;

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  if (!response.ok) {
    return { error: 'Failed to fetch weather data' };
  }

  const data = await response.json();
  return data;
});