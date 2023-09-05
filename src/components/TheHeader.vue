<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
import IconSettingsGear from '@/components/icons/IconSettingsGear.vue';
import IconClose from '@/components/icons/IconClose.vue';

const settingsStore = useSettingsStore();
</script>

<template>
  <header>
    <h1>Weather Widget</h1>

    <button v-if="settingsStore.toShow" type="button" @click="settingsStore.toggleToShow">
      <span class="visually-hidden">go to settings</span>
      <IconClose />
    </button>
    <button v-else type="button" @click="settingsStore.toggleToShow">
      <span class="visually-hidden">go to main screen</span>
      <IconSettingsGear />
    </button>
  </header>
</template>
