<template>
  <main class="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md mx-auto">
      <div class="p-6 mb-6">     
        <div class="flex justify-center mb-6">
          <button 
            @click="toggleLanguage"
            :aria-label="languageButtonAriaLabel"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
            {{ languageButtonText }}
          </button>
        </div>
  
        <p class="text-center text-gray-800 dark:text-gray-200 mb-4" role="status" aria-live="polite">
          <span class="font-semibold">{{ translations[currentLanguage as Language].selectedDateLabel }}:</span>
          <span class="block mt-1 text-blue-600 dark:text-blue-400">{{ selectedDateFormatted }}</span>
        </p>

        <!-- Error message -->
        <div 
          v-if="error" 
          role="alert" 
          aria-live="assertive"
          class="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-md">
          <p class="text-sm font-medium">{{ error.message }}</p>
          <button 
            @click="dismissError"
            class="mt-2 text-xs underline hover:no-underline"
            :aria-label="dismissErrorLabel">
            {{ dismissErrorText }}
          </button>
        </div>
      </div>
  
      <Calendar 
        :initial-date="initialDate"
        :language="currentLanguage"
        @dateSelected="onDateSelected"
        @error="onError"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import { useLocalization } from './composables/useLocalization';
import type { Language } from './types/calendar';

// Lazy load calendar component for better performance
import CalendarSkeleton from './components/calendar/CalendarSkeleton.vue';

const Calendar = defineAsyncComponent({
  loader: () => import('./components/calendar/Calendar.vue'),
  loadingComponent: CalendarSkeleton,
  delay: 200,
  timeout: 3000,
});

const { currentLanguage, translations, setLanguage } = useLocalization();

const selectedDate = ref<Date | undefined>(undefined);
const initialDate = ref<string | undefined>(undefined);
const error = ref<Error | null>(null);

const selectedDateFormatted = computed(() => {
  const date = selectedDate.value;
  const lang = currentLanguage.value as Language;
  if (!date) {
    return translations[lang].noDateSelected;
  }
  
  try {
    return date.toLocaleDateString(currentLanguage.value, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (err) {
    // Fallback форматирование при ошибке локализации
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }
});

const toggleLanguage = () => {
  const newLang = currentLanguage.value === 'ru' ? 'en' : 'ru';
  setLanguage(newLang);
  error.value = null; // Сбрасываем ошибку при смене языка
};

const onDateSelected = (date: Date) => {
  selectedDate.value = date;
  error.value = null; // Сбрасываем ошибку при успешном выборе
};

const onError = (err: Error) => {
  error.value = err;
  // Автоматически скрываем ошибку через 5 секунд
  setTimeout(() => {
    if (error.value === err) {
      error.value = null;
    }
  }, 5000);
};

const dismissError = () => {
  error.value = null;
};

const languageButtonText = computed(() => {
  const lang = currentLanguage.value as Language;
  return translations[lang].languageButtonText;
});

const languageButtonAriaLabel = computed(() => {
  const lang = currentLanguage.value as Language;
  return translations[lang].languageButtonAriaLabel;
});

const dismissErrorText = computed(() => {
  const lang = currentLanguage.value as Language;
  return translations[lang].dismissErrorText;
});

const dismissErrorLabel = computed(() => {
  const lang = currentLanguage.value as Language;
  return translations[lang].dismissErrorLabel;
});
</script>

