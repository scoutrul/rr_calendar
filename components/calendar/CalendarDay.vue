<template>
  <button
    :disabled="day.isDisabled"
    :aria-label="dayLabel"
    :aria-pressed="day.isSelected"
    :aria-current="day.isToday ? 'date' : undefined"
    :tabindex="day.isDisabled ? -1 : 0"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
    :class="[
      'flex items-center justify-center w-10 h-10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500',
      {
        'text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50': day.isDisabled,
        'text-gray-800 dark:text-gray-200': day.isCurrentMonth && !day.isSelected && !day.isDisabled,
        'text-gray-400 dark:text-gray-500': !day.isCurrentMonth && !day.isSelected && !day.isDisabled,
        'bg-blue-600 text-white font-bold': day.isSelected,
        'hover:bg-gray-100 dark:hover:bg-gray-700': !day.isSelected && !day.isDisabled,
        'ring-2 ring-blue-500': day.isToday && !day.isSelected,
      }
    ]">
    {{ day.dayOfMonth }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CalendarDay as CalendarDayType } from '../../types/calendar';
import { formatDate } from '../../utils/dateUtils';

interface Props {
  day: CalendarDayType;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  select: [date: Date];
}>();

const dayLabel = computed(() => {
  const dateStr = formatDate(props.day.date);
  const parts = [];
  if (props.day.isToday) parts.push('Today');
  if (props.day.isSelected) parts.push('Selected');
  return `${dateStr}${parts.length > 0 ? `, ${parts.join(', ')}` : ''}`;
});

const handleClick = () => {
  if (!props.day.isDisabled) {
    emit('select', props.day.date);
  }
};
</script>

