<script setup lang="ts">
import SettingsAddLocationForm from '@/components/SettingsAddLocationForm.vue';
import SettingsLocationList from '@/components/SettingsLocationList.vue';
</script>

<template>
  <section class="settings" aria-labelledby="heading-settings">
    <h2 id="heading-settings">Settings</h2>

    <SettingsAddLocationForm />
    <SettingsLocationList />
  </section>
</template>
