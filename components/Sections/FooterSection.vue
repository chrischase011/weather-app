<script setup lang="ts"></script>

<template>
  <footer class="tw-text-center tw-py-10">
    <p class="tw-text-white">
      All rights reserved &copy; {{ new Date().getFullYear() }} - WeatherApp
    </p>
    <p class="tw-flex tw-items-center tw-justify-center tw-gap-2">
      <span class="tw-text-blue-500">Christopher Robin Chase</span>
      <nuxt-link
        to="https://github.com/chrischase011"
        target="_blank"
        class="tw-text-black tw-flex tw-items-center"
        ><v-icon icon="mdi-github"
      /></nuxt-link>
    </p>
  </footer>
</template>

<style scoped lang="scss">
footer {
  position: relative;
  bottom: 0;
}
</style>
