<script setup lang="ts">
const search = ref<String>("");

const emit = defineEmits(["handleSearch"]);

const handleSearch = (e: Event) => {
  emit("handleSearch", e);
};
</script>

<template>
  <div class="">
    
  </div>
</template>

<style scoped>
.label-search {
  color: #f3f4f6;
}

#search {
  color: #f3f4f6 !important;
}
</style>
