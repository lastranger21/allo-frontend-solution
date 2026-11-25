<script setup lang="ts">
defineProps<{
  isLoading: boolean;
  error: string | null;
}>();

defineEmits<{
  (e: 'retry'): void;
}>();
</script>

<template>
  <div v-if="isLoading" class="state-box loading">
    <div class="spinner"></div>
    <p>Loading rocket data...</p>
  </div>

  <div v-else-if="error" class="state-box error">
    <p class="error-title">Something went wrong</p>
    <p class="error-message">{{ error }}</p>
    <button type="button" class="btn-retry" @click="$emit('retry')">
      Retry
    </button>
  </div>
</template>

<style scoped>
.state-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  border-radius: 8px;
  text-align: center;
  margin: 2rem 0;
}

.loading {
  background-color: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 4px solid #cbd5e1;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  background-color: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.error-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
}

.error-message {
  margin: 0 0 1.25rem;
  font-size: 0.95rem;
}

.btn-retry {
  background-color: #dc2626;
  color: #ffffff;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btn-retry:hover {
  background-color: #b91c1c;
}
</style>