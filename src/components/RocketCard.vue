<script setup lang="ts">
import { ref } from 'vue';
import type { rocket } from '@/types/rocket';

const props = defineProps<{
  rocket: rocket;
}>();

const FALLBACK_IMAGE = 'https://placehold.co/600x400/1e293b/f8fafc?text=No+Rocket+Image';
const imgSrc = ref(props.rocket.image_url || FALLBACK_IMAGE);

function handleImageError() {
  imgSrc.value = FALLBACK_IMAGE;
}
</script>

<template>
  <RouterLink :to="{ name: 'rocket-detail', params: { id: rocket.id } }" class="rocket-card">
    <div class="image-wrapper">
      <img :src="imgSrc" :alt="rocket.full_name||undefined" @error="handleImageError" loading="lazy" />
      <span v-if="rocket.isCustom" class="badge-custom">Custom</span>
    </div>

    <div class="card-body">
      <h3 class="rocket-name">{{ rocket.full_name }}</h3>
      <p class="rocket-desc">
        {{ rocket.description || 'No description available for this rocket.' }}
      </p>
    </div>
  </RouterLink>
</template>

<style scoped>
.rocket-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.rocket-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #1e293b;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge-custom {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #2563eb;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
}

.card-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.rocket-name {
  margin: 0;
  font-size: 1.15rem;
  color: #0f172a;
}

.rocket-desc {
  margin: 0;
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>