<script setup lang="ts">

const props = defineProps({
  city: String,
  weather: Object
});


</script>

<template>
  <div class="tw-py-5">
    City: {{ city }} <br /><br />

    Weather: {{ weather }}
  </div>
</template>

<style scoped></style>
