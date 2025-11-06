<template>
  <div 
    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-full max-w-sm mx-auto font-sans"
    role="application"
    :aria-label="calendarLabel"
    aria-live="polite"
    @keydown="handleKeydown"
    tabindex="0">
    <CalendarHeader
      :month-year-label="monthYearLabel"
      :previous-month-label="previousMonthLabel"
      :next-month-label="nextMonthLabel"
      @previous="previousMonth"
      @next="nextMonth"
    />
  
    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-1 text-center" role="grid" :aria-label="calendarGridLabel">
      <!-- Days of week -->
      <div 
        v-for="day in daysOfWeek" 
        :key="day" 
        class="text-xs font-medium text-gray-500 dark:text-gray-400 py-2"
        role="columnheader">
        {{ day }}
      </div>

      <!-- Calendar days -->
      <CalendarDay
        v-for="day in calendarGrid" 
        :key="`${day.date.getTime()}-${day.isSelected}`"
        :day="day"
        @select="selectDate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useLocalization } from '../../composables/useLocalization';
import type { Language, CalendarProps } from '../../types/calendar';
import { parseDate, normalizeDate } from '../../utils/dateUtils';
import { generateCalendarGrid } from '../../utils/calendarGrid';
import CalendarHeader from './CalendarHeader.vue';
import CalendarDay from './CalendarDay.vue';

const props = withDefaults(defineProps<CalendarProps>(), {
  initialDate: undefined,
  language: 'ru',
  minDate: undefined,
  maxDate: undefined,
  disabledDates: undefined,
});

const emit = defineEmits<{
  dateSelected: [date: Date];
  error: [error: Error];
}>();

const { currentLanguage, translations } = useLocalization();
const displayedDate = ref<Date>(new Date());
const selectedDate = ref<Date | null>(null);
const error = ref<Error | null>(null);

// Синхронизация языка из props с локализацией
if (props.language) {
  currentLanguage.value = props.language;
}

// Парсинг дат ограничений
const minDateParsed = computed(() => {
  if (!props.minDate) return null;
  return parseDate(props.minDate);
});

const maxDateParsed = computed(() => {
  if (!props.maxDate) return null;
  return parseDate(props.maxDate);
});

// Инициализация даты с обработкой ошибок
const initializeDate = () => {
  try {
    error.value = null;
    const lang = currentLanguage.value as Language;
    
    if (props.initialDate) {
      const date = parseDate(props.initialDate);
      if (!date) {
        throw new Error(translations[lang].errorInvalidInitialDate);
      }
      displayedDate.value = date;
      selectedDate.value = normalizeDate(date);
    } else {
      useCurrentDate();
    }
  } catch (err) {
    const lang = currentLanguage.value as Language;
    error.value = err instanceof Error ? err : new Error(translations[lang].errorFailedToInitialize);
    emit('error', error.value);
    useCurrentDate();
  }
};

const useCurrentDate = () => {
  const today = new Date();
  displayedDate.value = today;
  selectedDate.value = normalizeDate(today);
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

// Мемоизация для оптимизации производительности
const calendarGrid = computed(() => {
  const date = displayedDate.value;
  const year = date.getFullYear();
  const month = date.getMonth();

  return generateCalendarGrid(
    year,
    month,
    selectedDate.value,
    minDateParsed.value,
    maxDateParsed.value,
    props.disabledDates
  );
});

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

const selectDate = (date: Date) => {
  try {
    const normalized = normalizeDate(date);
    const lang = currentLanguage.value as Language;
    
    // Проверка на отключённые даты
    if (minDateParsed.value && normalized < minDateParsed.value) {
      throw new Error(translations[lang].errorDateBeforeMin);
    }
    if (maxDateParsed.value && normalized > maxDateParsed.value) {
      throw new Error(translations[lang].errorDateAfterMax);
    }
    if (props.disabledDates) {
      const dateString = normalized.toISOString().split('T')[0];
      if (props.disabledDates.includes(dateString)) {
        throw new Error(translations[lang].errorDateDisabled);
      }
    }

    // Если выбран день из другого месяца, переключаем отображаемый месяц
    if (normalized.getMonth() !== displayedDate.value.getMonth() ||
        normalized.getFullYear() !== displayedDate.value.getFullYear()) {
      displayedDate.value = new Date(normalized);
    }
    
    selectedDate.value = normalized;
    emit('dateSelected', normalized);
    error.value = null;
  } catch (err) {
    const lang = currentLanguage.value as Language;
    error.value = err instanceof Error ? err : new Error(translations[lang].errorFailedToSelect);
    emit('error', error.value);
  }
};

// Локализованные метки для accessibility
const calendarLabel = computed(() => {
  const lang = currentLanguage.value as Language;
  return translations[lang].title;
});

const calendarGridLabel = computed(() => {
  const lang = currentLanguage.value as Language;
  return `${translations[lang].title} - ${monthYearLabel.value}`;
});

const previousMonthLabel = computed(() => {
  const lang = currentLanguage.value as Language;
  return translations[lang].previousMonthLabel;
});

const nextMonthLabel = computed(() => {
  const lang = currentLanguage.value as Language;
  return translations[lang].nextMonthLabel;
});

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

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      previousMonth();
      break;
    case 'ArrowRight':
      event.preventDefault();
      nextMonth();
      break;
    case 'Home':
      event.preventDefault();
      // Переход к первому дню месяца
      if (selectedDate.value) {
        const firstDay = new Date(displayedDate.value.getFullYear(), displayedDate.value.getMonth(), 1);
        selectDate(firstDay);
      }
      break;
    case 'End':
      event.preventDefault();
      // Переход к последнему дню месяца
      if (selectedDate.value) {
        const lastDay = new Date(displayedDate.value.getFullYear(), displayedDate.value.getMonth() + 1, 0);
        selectDate(lastDay);
      }
      break;
  }
};

// Валидация props при изменении
watch([() => props.minDate, () => props.maxDate], ([min, max]) => {
  if (min && max) {
    const minDate = parseDate(min);
    const maxDate = parseDate(max);
    if (minDate && maxDate && minDate > maxDate) {
      const lang = currentLanguage.value as Language;
      error.value = new Error(translations[lang].errorMinDateAfterMax);
      emit('error', error.value);
    }
  }
});
</script>
