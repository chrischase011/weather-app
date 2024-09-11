<script setup lang="ts"></script>

<template>
  <nav
    class="tw-flex tw-w-full tw-h-14 tw-shadow-lg tw-p-6 tw-gap-5 tw-items-center"
  >
    <div id="logo" class="">
      <nuxt-link to="/" class="tw-text-2xl tw-font-bold tw-text-lime-400">
        <v-icon icon="mdi-weather-pouring" /> WeatherApp
      </nuxt-link>
    </div>
    <div
      id="nav-links"
      class="tw-flex tw-items-center tw-gap-5 tw-text-base tw-font-semibold tw-text-white"
    >
      <nuxt-link to="/"> Home </nuxt-link>
      <nuxt-link to="/about"> About </nuxt-link>
    </div>
  </nav>
</template>

<style scoped></style>
