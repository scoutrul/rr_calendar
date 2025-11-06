<template>
  <div class="flex items-center justify-between mb-4">
    <button 
      @click="$emit('previous')" 
      type="button"
      :aria-label="previousMonthLabel"
      class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
      <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 w-32 text-center" :aria-live="'polite'">
      {{ monthYearLabel }}
    </h2>
    <button 
      @click="$emit('next')" 
      type="button"
      :aria-label="nextMonthLabel"
      class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
      <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  monthYearLabel: string;
  previousMonthLabel: string;
  nextMonthLabel: string;
}>();

defineEmits<{
  previous: [];
  next: [];
}>();
</script>

