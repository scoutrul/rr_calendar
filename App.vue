<template>
  <main class="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md mx-auto">
      <div class="p-6 mb-6">     
        <div class="flex justify-center mb-6">
          <button 
            @click="toggleLanguage" 
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
            {{ languageButtonText }}
          </button>
        </div>
  
        <p class="text-center text-gray-800 dark:text-gray-200 mb-4">
          <span class="font-semibold">{{ translations[currentLanguage as Language].selectedDateLabel }}:</span>
          <span class="block mt-1 text-blue-600 dark:text-blue-400">{{ selectedDateFormatted }}</span>
        </p>
      </div>
  
      <Calendar 
        :initial-date="initialDate"
        :language="currentLanguage"
        @dateSelected="onDateSelected"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Calendar from './components/calendar/Calendar.vue';
import { useLocalization, type Language } from './composables/useLocalization';

const { currentLanguage, translations, setLanguage } = useLocalization();

const selectedDate = ref<Date | undefined>(undefined);

const initialDate = ref<string | undefined>(undefined);

const selectedDateFormatted = computed(() => {
  const date = selectedDate.value;
  const lang = currentLanguage.value as Language;
  if (!date) {
    return translations[lang].noDateSelected;
  }
  return date.toLocaleDateString(currentLanguage.value, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

const toggleLanguage = () => {
  const newLang = currentLanguage.value === 'ru' ? 'en' : 'ru';
  setLanguage(newLang);
};

const onDateSelected = (date: Date) => {
  selectedDate.value = date;
};

const languageButtonText = computed(() => {
  return currentLanguage.value === 'ru' ? 'English' : 'Русский';
});
</script>

