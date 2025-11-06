<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-full max-w-sm mx-auto font-sans animate-pulse">
    <div class="flex items-center justify-between mb-4">
      <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div class="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
    </div>
    <div class="grid grid-cols-7 gap-1">
      <div 
        v-for="i in 42" 
        :key="i"
        class="h-10 bg-gray-200 dark:bg-gray-700 rounded-full">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

