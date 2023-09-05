import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', () => {
  const toShow = ref<Boolean>(false);

  const toggleToShow = () => {
    toShow.value = !toShow.value;
  };

  return { toShow, toggleToShow };
});
