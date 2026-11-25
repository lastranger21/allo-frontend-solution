<script setup lang="ts">
import { reactive } from 'vue';
import type { NewRocketPayload } from '@/types/rocket';

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit', payload: NewRocketPayload): void;
}>();

const form = reactive({
  full_name: '',
  description: '',
  image_url: '',
  launch_cost: '' as string | number,
  country_code: 'USA',
  maiden_flight: '',
});

function handleSubmit() {
  if (!form.full_name.trim()) return;

  const parsedCost =
    form.launch_cost !== '' && !Number.isNaN(Number(form.launch_cost))
      ? Number(form.launch_cost)
      : null;

  emit('submit', {
    full_name: form.full_name,
    description: form.description,
    image_url: form.image_url,
    launch_cost: parsedCost,
    country_code: form.country_code,
    maiden_flight: form.maiden_flight,
  });

  emit('close');
}
</script>

<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Add New Rocket</h2>
        <button type="button" class="btn-close" @click="$emit('close')">&times;</button>
      </div>

      <form @submit.prevent="handleSubmit" class="rocket-form">
        <label>
          <span>Rocket Name *</span>
          <input v-model="form.full_name" type="text" required placeholder="e.g. Starship Block 2" />
        </label>

        <label>
          <span>Description</span>
          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Brief description of the launch vehicle..."
          ></textarea>
        </label>

        <label>
          <span>Image URL (Optional)</span>
          <input v-model="form.image_url" type="url" placeholder="https://example.com/rocket.jpg" />
        </label>

        <div class="form-row">
          <label>
            <span>Cost per Launch (USD)</span>
            <input v-model="form.launch_cost" type="number" min="0" placeholder="e.g. 67000000" />
          </label>

          <label>
            <span>Country Code</span>
            <input v-model="form.country_code" type="text" maxlength="5" placeholder="USA" />
          </label>
        </div>

        <label>
          <span>First Flight Date</span>
          <input v-model="form.maiden_flight" type="date" />
        </label>

        <div class="form-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancel</button>
          <button type="submit" class="btn-primary">Save Rocket</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 50;
}

.modal-content {
  background: #ffffff;
  width: 100%;
  max-width: 480px;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #0f172a;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
}

.rocket-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.rocket-form label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
}

.rocket-form input,
.rocket-form textarea {
  padding: 0.6rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: inherit;
  color: #0f172a;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.btn-secondary {
  background: #f1f5f9;
  color: #334155;
  border: 1px solid #cbd5e1;
  padding: 0.6rem 1.1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary {
  background: #2563eb;
  color: #ffffff;
  border: none;
  padding: 0.6rem 1.25rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary:hover {
  background: #1d4ed8;
}
</style>