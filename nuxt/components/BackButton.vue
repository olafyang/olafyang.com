<script setup lang="ts">
const router = useRouter();

function handleBackClick() {
  if (window.history.length > 1) {
    router.back();
  }
}
</script>

<template>
  <button
    type="button"
    class="back-button"
    aria-label="Go Back"
    @click="router.back()"
  >
    <NuxtImg class="back-icon" src="/arrow_back.svg" alt="Back" />
  </button>
</template>

<style>
.back-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  height: 2.5rem;
  width: 2.5rem;
  margin-right: 1em;
}
.back-icon {
  cursor: pointer;
}
</style>
