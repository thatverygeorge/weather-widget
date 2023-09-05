<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
import TheHeader from '@/components/TheHeader.vue';
import WeatherView from '@/views/WeatherView.vue';
import SettingsView from '@/views/SettingsView.vue';
import TheFooter from '@/components/TheFooter.vue';

const settingsStore = useSettingsStore();
</script>

<template>
  <div id="weather-widget">
    <TheHeader />

    <main>
      <WeatherView v-show="!settingsStore.toShow" />
      <SettingsView v-show="settingsStore.toShow" />
    </main>

    <TheFooter />
  </div>
</template>

<style>
@import url('./assets/index.css');
</style>
