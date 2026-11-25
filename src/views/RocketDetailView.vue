<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRocketStore } from '@/stores/rocketStore';
import type { rocket } from '@/types/rocket';
import StateFeedback from '@/components/StateFeedback.vue';

const route = useRoute();
const rocketStore = useRocketStore();

const rocket = ref<rocket | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

const FALLBACK_IMAGE = 'https://placehold.co/800x450/1e293b/f8fafc?text=No+Rocket+Image';
const imageFailed = ref(false);

const displayImage = computed(() => {
  if (imageFailed.value || !rocket.value?.image_url) {
    return FALLBACK_IMAGE;
  }
  return rocket.value.image_url;
});

const formattedCost = computed(() => {
  const cost = rocket.value?.launch_cost;
  if (cost === null || cost === undefined) return 'Unknown / Not Disclosed';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(cost);
});

async function loadDetail() {
  const id = Number(route.params.id);
  if (Number.isNaN(id)) {
    error.value = 'Invalid rocket ID.';
    return;
  }

  isLoading.value = true;
  error.value = null;
  imageFailed.value = false;

  try {
    rocket.value = await rocketStore.getRocketDetail(id);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load rocket details.';
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadDetail();
});
</script>

<template>
  <section class="detail-container">
    <RouterLink to="/" class="back-link">&larr; Back to Rocket List</RouterLink>

    <StateFeedback :is-loading="isLoading" :error="error" @retry="loadDetail" />

    <article v-if="!isLoading && !error && rocket" class="detail-card">
      <div class="hero-image">
        <img :src="displayImage" :alt="rocket.full_name||undefined" @error="imageFailed = true" />
      </div>

      <div class="detail-content">
        <div class="title-row">
          <h1>{{ rocket.full_name }}</h1>
          <span v-if="rocket.isCustom" class="badge-custom">Custom Rocket</span>
        </div>

        <p class="description">
          {{ rocket.description || 'No description provided for this launch vehicle.' }}
        </p>

        <dl class="specs-grid">
          <div class="spec-item">
            <dt>Cost per Launch</dt>
            <dd>{{ formattedCost }}</dd>
          </div>

          <div class="spec-item">
            <dt>Country</dt>
            <dd>{{ rocket.manufacturer?.country_code || 'Unknown' }}</dd>
          </div>

          <div class="spec-item">
            <dt>First Flight</dt>
            <dd>{{ rocket.maiden_flight || 'Not Available' }}</dd>
          </div>
        </dl>
      </div>
    </article>
  </section>
</template>

