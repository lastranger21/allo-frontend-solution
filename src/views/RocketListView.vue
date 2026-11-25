<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRocketStore } from '@/stores/rocketStore';
import RocketCard from '@/components/RocketCard.vue';
import AddRocketModal from '@/components/AddRocketModal.vue';
import StateFeedback from '@/components/StateFeedback.vue';

const rocketStore = useRocketStore();
const isModalOpen = ref(false);

onMounted(() => {
  rocketStore.loadRockets();
});
</script>

<template>
  <section class="page-container">
    <header class="toolbar">
      <input
        v-model="rocketStore.searchQuery"
        type="search"
        placeholder="Filter rockets by name or description..."
        class="search-input"
      />
      <button type="button" class="btn-add" @click="isModalOpen = true">
        + Add Rocket
      </button>
    </header>

    <StateFeedback
      :is-loading="rocketStore.isLoading"
      :error="rocketStore.error"
      @retry="rocketStore.loadRockets(true)"
    />

    <div v-if="!rocketStore.isLoading && !rocketStore.error">
      <p v-if="rocketStore.filteredRockets.length === 0" class="empty-text">
        No rockets match "{{ rocketStore.searchQuery }}".
      </p>

      <div v-else class="rocket-grid">
        <RocketCard
          v-for="rocket in rocketStore.filteredRockets"
          :key="rocket.id"
          :rocket="rocket"
        />
      </div>
    </div>

    <AddRocketModal
      v-if="isModalOpen"
      @close="isModalOpen = false"
      @submit="rocketStore.addNewRocket"
    />
  </section>
</template>

