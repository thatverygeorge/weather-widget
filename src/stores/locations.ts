import { ref, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import type { Data, Location } from '@/types';
import { nanoid } from 'nanoid';

const API_KEY = import.meta.env.VITE_API_KEY;

export const useLocationsStore = defineStore('locations', () => {
  const locations = ref<Location[]>(JSON.parse(localStorage.getItem('savedLocations') ?? '[]'));

  if (locations.value.length === 0) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await addLocationByCoords(pos.coords.latitude, pos.coords.longitude);
        } catch (err: any) {
          console.error(`ERROR(${err.code}): ${err.message}`);
        }
      },
      (err: any) => {
        console.error(`ERROR(${err.code}): ${err.message}`);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  async function addLocationByCoords(lat: number, lon: number): Promise<void> {
    if (lat === undefined || lon === undefined) return;

    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );
    const data = await res.json();
    locations.value.push({
      id: nanoid(),
      name: data[0].name,
      country: data[0].country,
      coord: {
        lat: data[0].lat,
        lon: data[0].lon,
      },
    });
  }

  async function addLocationByName(name: string): Promise<void> {
    if (!name) return;
    if (locations.value.some((location) => location.name === name)) return;

    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${API_KEY}`
    );
    const data = await res.json();
    locations.value.push({
      id: nanoid(),
      name: data[0].name,
      country: data[0].country,
      coord: {
        lat: data[0].lat,
        lon: data[0].lon,
      },
    });
  }

  function deleteLocation(id: string): void {
    if (id === undefined) return;

    locations.value = locations.value.filter((loc) => loc.id !== id);
  }

  async function fetchCurrentWeatherByCoords(lat: number, lon: number): Promise<Data | undefined> {
    if (lat === undefined || lon === undefined) return;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    return;
  }

  function handleDragAndDrop(dragIndex: number, dropIndex: number) {
    if (dragIndex === dropIndex) return;

    if (dragIndex < dropIndex) {
      locations.value.splice(dropIndex + 1, 0, locations.value[dragIndex]);
      locations.value.splice(dragIndex, 1);
    }

    if (dragIndex > dropIndex) {
      locations.value.splice(dropIndex, 0, locations.value[dragIndex]);
      locations.value.splice(dragIndex + 1, 1);
    }
  }

  watchEffect(() => {
    localStorage.setItem('savedLocations', JSON.stringify(locations.value));
  });

  return {
    locations,
    addLocationByName,
    deleteLocation,
    fetchCurrentWeatherByCoords,
    handleDragAndDrop,
  };
});
