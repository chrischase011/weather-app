<script setup lang="ts">
import { fetchLocation } from "~/composables/api/fetchLocation";

const _city = ref("");
const weather = ref("");
const latitude = ref(0);
const longitude = ref(0);

const { location, city, error, getLocation } = fetchLocation();
onMounted(() => {
  getLocation();

  watch(city, (newCityVal) => {
    _city.value = newCityVal;
    const { data: _weather, error } = useFetch(
      `/api/fetchWeather?city=${newCityVal}`
    );
    weather.value = _weather.value.weather[0].description;
    console.log(_weather);
  });
});
</script>

<template>
  <main class="tw-flex tw-justify-center">
    <div class="tw-container tw-py-8 tw-h-screen">
      <SearchCity />
      <WeatherCity />
    </div>
  </main>
</template>

<style scoped></style>
