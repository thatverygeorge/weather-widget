<script setup lang="ts">
import { ref } from 'vue';
import { useLocationsStore } from '@/stores/locations';
import IconBurger from '@/components/icons/IconBurger.vue';
import IconTrashBin from '@/components/icons/IconTrashBin.vue';

const locationsStore = useLocationsStore();

const isDraggedByIcon = ref(false);

function handleDragStart(evt: DragEvent, index: number) {
  if (!isDraggedByIcon.value) {
    evt.preventDefault();
    return;
  }

  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('dragIndex', index.toString());
  }
}

function handleDrop(evt: DragEvent, dropIndex: number) {
  isDraggedByIcon.value = false;

  if (evt.dataTransfer) {
    locationsStore.handleDragAndDrop(parseInt(evt.dataTransfer.getData('dragIndex')), dropIndex);
  }
}
</script>

<template>
  <ul class="locations" v-if="locationsStore.locations.length > 0" role="list">
    <li
      v-for="(location, index) in locationsStore.locations"
      :key="location.id"
      draggable="true"
      @dragstart="handleDragStart($event, index)"
      @drop="handleDrop($event, index)"
      @dragover.prevent
    >
      <article class="location-card locations__card">
        <IconBurger
          class="location-card__icon-move"
          @mousedown.left="isDraggedByIcon = true"
          @mouseup.left="isDraggedByIcon = false"
        />
        <p>{{ location.name }}, {{ location.country }}</p>
        <button
          class="location-card__button-delete"
          type="button"
          @click="locationsStore.deleteLocation(location.id)"
        >
          <span class="visually-hidden">delete location</span>
          <IconTrashBin />
        </button>
      </article>
    </li>
  </ul>
  <p v-else>Nothing to show yet</p>
</template>
