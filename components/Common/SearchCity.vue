<script setup lang="ts">
const search = ref<String>("");

const emit = defineEmits(["handleSearch"]);

const handleSearch = (e: Event) => {
  emit("handleSearch", e);
};
</script>

<template>
  <div class="">
    <v-form @submit.prevent="handleSearch">
      <v-text-field
        v-model="search"
        label="Search City"
        placeholder="Enter a city name"
        outlined
      />
    </v-form>
  </div>
</template>

<style scoped></style>
