<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import { useLocationsStore } from '@/stores/locations';
import IconEnter from '@/components/icons/IconEnter.vue';

const locationsStore = useLocationsStore();
const name = ref<string>('');
const submitButton = ref<HTMLButtonElement | null>(null);
const error = ref<string>('');
const errorTimer = ref<ReturnType<typeof setTimeout> | undefined>(undefined);

async function addLocation() {
  if (submitButton.value) submitButton.value.disabled = true;

  if (name.value) {
    try {
      await locationsStore.addLocationByName(name.value);
    } catch (err) {
      error.value = `Couldn't add location ${name.value.toLocaleUpperCase()}`;
    }
  }

  name.value = '';
  if (submitButton.value) submitButton.value.disabled = false;
}

watch(error, () => {
  clearTimeout(errorTimer.value);
  errorTimer.value = setTimeout(() => {
    error.value = '';
  }, 5000);
});

onUnmounted(() => {
  clearTimeout(errorTimer.value);
});
</script>

<template>
  <form class="form" @submit.prevent="addLocation" aria-label="add location">
    <label for="name">Add location:</label>
    <input v-model.trim="name" id="name" type="text" name="name" autocomplete="off" />
    <button ref="submitButton" type="submit" name="submit">
      <span class="visually-hidden">submit</span>
      <IconEnter />
    </button>
    <span aria-live="polite" role="alert">{{ error }}</span>
  </form>
</template>
