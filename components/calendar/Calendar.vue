<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-full max-w-sm mx-auto font-sans">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <button 
        @click="previousMonth" 
        type="button" 
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 w-32 text-center">
        {{ monthYearLabel }}
      </h2>
      <button 
        @click="nextMonth" 
        type="button" 
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  
    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-1 text-center">
      <!-- Days of week -->
      <div 
        v-for="day in daysOfWeek" 
        :key="day" 
        class="text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
        {{ day }}
      </div>
  
      <!-- Calendar days -->
      <div 
        v-for="day in calendarGrid" 
        :key="day.date.getTime()"
        @click="selectDate(day)"
        :class="[
          'flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors',
          {
            'text-gray-400 dark:text-gray-500': !day.isCurrentMonth,
            'text-gray-800 dark:text-gray-200': day.isCurrentMonth && !day.isSelected,
            'bg-blue-600 text-white font-bold': day.isSelected,
            'hover:bg-gray-100 dark:hover:bg-gray-700': !day.isSelected,
            'ring-2 ring-blue-500': day.isToday && !day.isSelected
          }
        ]">
        {{ day.dayOfMonth }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useLocalization, type Language } from '../../composables/useLocalization';

interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

interface Props {
  initialDate?: string; // YYYY-MM-DD format
  language?: 'en' | 'ru';
}

const props = withDefaults(defineProps<Props>(), {
  initialDate: undefined,
  language: 'ru'
});

const emit = defineEmits(['dateSelected']);

const { currentLanguage, translations } = useLocalization();
const displayedDate = ref<Date>(new Date());
const selectedDate = ref<Date | null>(null);

// Синхронизация языка из props с локализацией
if (props.language) {
  currentLanguage.value = props.language;
}

// Инициализация даты
const initializeDate = () => {
  if (props.initialDate) {
    const parts = props.initialDate.split('-').map((p: string) => parseInt(p, 10));
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    if (!isNaN(date.getTime())) {
      displayedDate.value = date;
      selectedDate.value = date;
    } else {
      useCurrentDate();
    }
  } else {
    useCurrentDate();
  }
};

const useCurrentDate = () => {
  const today = new Date();
  displayedDate.value = today;
  selectedDate.value = today;
};

const monthYearLabel = computed(() => {
  const date = displayedDate.value;
  const lang = currentLanguage.value as Language;
  const monthName = translations[lang].months[date.getMonth()];
  return `${monthName} ${date.getFullYear()}`;
});

const daysOfWeek = computed(() => {
  const lang = currentLanguage.value as Language;
  return translations[lang].daysOfWeekShort;
});

const calendarGrid = computed<CalendarDay[]>(() => {
  const date = displayedDate.value;
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  let startDayOfWeek = firstDayOfMonth.getDay(); // 0=Sun, 1=Mon...
  startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1; // 0=Mon, 1=Tue... 6=Sun
  
  const lastDayOfPrevMonth = new Date(year, month, 0);
  const daysInPrevMonth = lastDayOfPrevMonth.getDate();

  const grid: CalendarDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Days from previous month
  for (let i = 0; i < startDayOfWeek; i++) {
    const day = daysInPrevMonth - startDayOfWeek + 1 + i;
    const d = new Date(year, month - 1, day);
    grid.push(createCalendarDay(d, day, false, today));
  }

  // Days from current month
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    grid.push(createCalendarDay(d, i, true, today));
  }

  // Days from next month - fill up to 42 cells (6 weeks)
  for (let i = 1; grid.length < 42; i++) {
    const d = new Date(year, month + 1, i);
    grid.push(createCalendarDay(d, i, false, today));
  }
  
  return grid;
});

const createCalendarDay = (
  date: Date, 
  dayOfMonth: number, 
  isCurrentMonth: boolean, 
  today: Date
): CalendarDay => {
  date.setHours(0, 0, 0, 0);
  const selDate = selectedDate.value;
  return {
    date,
    dayOfMonth,
    isCurrentMonth,
    isToday: date.getTime() === today.getTime(),
    isSelected: selDate ? date.getTime() === selDate.getTime() : false
  };
};

const previousMonth = () => {
  const newDate = new Date(displayedDate.value);
  newDate.setMonth(displayedDate.value.getMonth() - 1);
  displayedDate.value = newDate;
};

const nextMonth = () => {
  const newDate = new Date(displayedDate.value);
  newDate.setMonth(displayedDate.value.getMonth() + 1);
  displayedDate.value = newDate;
};

const selectDate = (day: CalendarDay) => {
  if (!day.isCurrentMonth) {
    displayedDate.value = day.date;
  }
  selectedDate.value = day.date;
  emit('dateSelected', day.date);
};

// Следить за изменениями языка из props
watch(() => props.language, (newLang: Language | undefined) => {
  if (newLang) {
    currentLanguage.value = newLang;
  }
});

// Инициализация при монтировании и при изменении initialDate
onMounted(() => {
  initializeDate();
});

watch(() => props.initialDate, () => {
  initializeDate();
});
</script>

