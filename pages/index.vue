<script setup lang="ts">
import { fetchLocation } from "~/composables/api/fetchLocation";

useHead({
  title: "Chase Weather App",
  meta: [
    {
      name: "description",
      content: "Weather Application using Nuxt and OpenWeatherMap API",
    },
  ],
});

useSeoMeta({
  ogTitle: "Chase Weather App",
  description: "Weather Application using Nuxt and OpenWeatherMap API",
  ogDescription: "Weather Application using Nuxt and OpenWeatherMap API",
})

const search = ref("");
const _city = ref("");
const weather = ref("");
const latitude = ref(0);
const longitude = ref(0);

const { location, city, error, getLocation } = fetchLocation();

async function fetchWeatherData(cityName: string) {
  const { data: _weather, refresh } = await useFetch(
    `/api/fetchWeather?city=${cityName}`
  );

  // if (_weather.value === null) {
  //   await refresh();
  // }

  if (_weather.value) {
    weather.value = _weather.value || "Unknown weather data";
  }
}

const handleSearch = (e: Event) => {
  e.preventDefault();
  if (search.value) {
    _city.value = search.value;
    city.value = search.value;
    weather.value = null;
    console.log(search.value);
    fetchWeatherData(search.value);
  }
};

onMounted(() => {
  getLocation();

  watch(city, (newCityVal) => {
    _city.value = newCityVal;

    if (newCityVal) {
      fetchWeatherData(newCityVal);
    }
  });
});
</script>

<template>
  <main class="tw-flex tw-justify-center">
    <div class="tw-container tw-pt-8 tw-h-screen">
      <v-form class="tw-pb-10" @submit.prevent="handleSearch">
        <v-text-field
          id="search"
          class="input-search"
          v-model="search"
          variant="outlined"
          placeholder="Enter City Name"
        >
          <template v-slot:label>
            <span class="label-search">Search City</span>
          </template>
        </v-text-field>
      </v-form>
      <WeatherCity v-if="weather" :city="city" :weather="weather" />
      <!-- Optionally show a loading message -->
      <p v-else class="tw-text-white">Loading weather data...</p>
    </div>
  </main>
</template>

<style scoped>
.label-search {
  color: #f3f4f6 !important;
}
</style>
