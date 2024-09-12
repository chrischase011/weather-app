<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  city: String,
  weather: [String, Object],
});

const labels = reactive({
  0: "SU",
  1: "MO",
  2: "TU",
  3: "WED",
  4: "TH",
  5: "FR",
  6: "SA",
});
const expand = ref(false);
const time = ref(0);

const wCity = ref("");
const weatherCategory = ref("");
const weatherDescription = ref("");
const weatherIconCode = ref("");
const weatherTemp = ref(0);
const weatherWind = ref<Record<string, number>>({ speed: 0, deg: 0 });
const weatherRain = ref<Record<string, number>>({ "1h": 0 });

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

const weatherIcons = ref<Record<string, string>>({});

const weatherIcon = (code: string) => {
  return `http://openweathermap.org/img/wn/${code}@2x.png`;
};

const weatherImage = (weather: string) => {
  return `/images/${weatherImages.value[weather] || "clear.jpg"}`;
};

const updateBackgroundImage = (imagePath: string) => {
  if (imagePath) {
    document.body.style.background = `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${imagePath})`;
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
      wCity.value = newWeatherVal.name;
      weatherCategory.value = newWeatherVal.weather[0].main;
      weatherDescription.value = newWeatherVal.weather[0].description;
      weatherIconCode.value = newWeatherVal.weather[0].icon;
      weatherTemp.value = parseFloat(newWeatherVal.main.temp).toFixed(1);
      weatherWind.value = newWeatherVal.wind;
      weatherRain.value = newWeatherVal.rain ? newWeatherVal.rain["1h"] : null;

      updateBackgroundImage(weatherImage(weatherCategory.value));
    }
  },
  { immediate: true }
);

const capCity = computed(() => {
  const city = props.city || "";
  return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
});

const capDescription = computed(() => {
  const description = weatherDescription.value || "";
  return (
    description.charAt(0).toUpperCase() + description.slice(1).toLowerCase()
  );
});
</script>

<template>
  <!-- <div class="tw-w-full tw-py-5 tw-text-white">
    <div>Weather: {{ weatherCategory }}</div>
    <div>Description: {{ weatherDescription }}</div>
    <img :src="weatherIcon(weatherIconCode)" alt="Weather Icon" />
    <div>Temperature: {{ weatherTemp }}°C</div>
    <div>Wind Speed: {{ weatherWind.speed }} km/h</div>
    <div>Wind Direction: {{ weatherWind.deg }}°</div>
  </div> -->

  <v-card class="mx-auto glass-fx" max-width="368" variant="outlined">
    <v-card-item>
      <template v-slot:title>
        <span class="tw-text-white">
          {{ wCity }}
        </span>
      </template>
      <template v-slot:subtitle>
        <v-icon
          class="me-1 pb-1 tw-text-white"
          color="success"
          icon="mdi-information-slab-circle-outline"
          size="18"
        ></v-icon>

        <span class="tw-text-white">{{ capDescription }}</span>
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col class="text-h2 tw-text-white" cols="8">
          {{ weatherTemp }}°C
        </v-col>

        <v-col class="text-right tw-text-white" cols="4">
          <!-- <v-icon color="error" icon="mdi-weather-hurricane" size="88"></v-icon> -->
          <img
            :src="weatherIcon(weatherIconCode)"
            class="weather-icon"
            alt="Weather Icon"
          />
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact">
        <v-list-item-subtitle class="tw-text-white">
          <v-icon color="white" icon="mdi-weather-windy" />
          {{ weatherWind.speed }} km/h</v-list-item-subtitle
        >
      </v-list-item>

      <v-list-item density="compact" v-if="weatherRain">
        <v-list-item-subtitle class="tw-text-white"
          ><v-icon color="white" icon="mdi-weather-pouring" />
          {{ weatherRain }} mm</v-list-item-subtitle
        >
      </v-list-item>
    </div>

    <!-- <v-expand-transition>
      <div v-if="expand">
        <div class="py-2">
          <v-slider
            v-model="time"
            :max="6"
            :step="1"
            :ticks="labels"
            class="mx-4"
            color="primary"
            density="compact"
            show-ticks="always"
            thumb-size="10"
            hide-details
          ></v-slider>
        </div>

        <v-list class="bg-transparent">
          <v-list-item
            v-for="item in forecast"
            :key="item.day"
            :append-icon="item.icon"
            :subtitle="item.temp"
            :title="item.day"
          >
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition> -->

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :text="!expand ? 'Full Report' : 'Hide Report'"
        @click="expand = !expand"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped lang="scss">
/* Your styles here */
.weather-icon {
  width: 100px;
  height: 100px;
}

.v-list-item__prepend {
  & > .v-icon {
    color: white !important;
  }
}

.glass-fx {
  background: transparent;
  border: 1px solid #f3f3f349 !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
}
</style>
