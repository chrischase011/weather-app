<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  city: String,
  weather: [String, Object],
});

const weatherCategory = ref("");
const weatherDescription = ref("");
const weatherIconCode = ref("");
const weatherTemp = ref(0);
const weatherWind = ref<Record<string, number>>({ speed: 0, deg: 0 });

const weatherImages = ref<Record<string, string>>({
  Clear: "clear.jpg",
  Clouds: "cloudy.jpg",
  Rain: "rain.jpg",
  Snow: "snow.jpg",
  Thunderstorm: "thunderstorm.jpg",
  Drizzle: "drizzle.jpg",
  Mist: "mist.jpg",
  Smoke: "smoke.jpg",
  Haze: "haze.jpg",
  Dust: "sandstorm.jpg",
  Sand: "sandstorm.jpg",
  Ash: "smoke.jpg",
  Fog: "fog.jpg",
  Squall: "rainy.jpg",
  Tornado: "tornado.jpg",
});

const weatherIcon = (code: string) => {
  return `http://openweathermap.org/img/wn/${code}.png`;
};

const weatherImage = (weather: string) => {
  return `/images/${weatherImages.value[weather] || "/images/clear.jpg"}`;
};

const updateBackgroundImage = (imagePath: string) => {
  if (imagePath) {
    document.body.style.backgroundImage = `url(${imagePath})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  } else {
    document.body.style.backgroundImage = "";
  }
};

// Watch for changes in the weather prop
watch(
  () => props.weather,
  (newWeatherVal) => {
    if (newWeatherVal) {
      weatherCategory.value = newWeatherVal.weather[0].main;
      weatherDescription.value = newWeatherVal.weather[0].description;
      weatherIconCode.value = newWeatherVal.weather[0].icon;
      weatherTemp.value = newWeatherVal.main.temp;
      weatherWind.value = newWeatherVal.wind;

      updateBackgroundImage(weatherImage(weatherCategory.value));

      console.log(newWeatherVal);
    }
  },
  { immediate: true }
);

// Log the initial value of weather for debugging
console.log(props.weather);
</script>

<template>
  <div class="tw-w-full tw-py-5 tw-text-white">
    <div>Weather: {{ weatherCategory }}</div>
    <div>Description: {{ weatherDescription }}</div>
    <img :src="weatherIcon(weatherIconCode)" alt="Weather Icon" />
    <div>Temperature: {{ weatherTemp }}°C</div>
    <div>Wind Speed: {{ weatherWind.speed }} km/h</div>
    <div>Wind Direction: {{ weatherWind.deg }}°</div>
  </div>
</template>

<style scoped lang="scss">
/* Your styles here */
</style>
