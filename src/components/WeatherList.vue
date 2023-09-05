<script setup lang="ts">
import { ref } from 'vue';
import { useLocationsStore } from '@/stores/locations';
import WeatherCard from '@/components/WeatherCard.vue';
import WeatherCardSkeleton from './WeatherCardSkeleton.vue';
import IconUpdate from '@/components/icons/IconUpdate.vue';

const locationsStore = useLocationsStore();
const key = ref<number>(0);

function updateData() {
  key.value += 1;
}
</script>

<template>
  <section class="current-weather" aria-labelledby="heading-current-weather">
    <h2 id="heading-current-weather">Current weather</h2>

    <button type="button" :disabled="locationsStore.locations.length === 0" @click="updateData">
      <span class="visually-hidden">update weather data</span>
      <IconUpdate />
    </button>

    <ul :key="key" v-if="locationsStore.locations.length > 0" role="list">
      <li v-for="location in locationsStore.locations" :key="location.id">
        <Suspense>
          <WeatherCard v-bind="location" />
          <template #fallback>
            <WeatherCardSkeleton />
          </template>
        </Suspense>
      </li>
    </ul>
    <p v-else>Nothing to show yet</p>
  </section>
</template>
