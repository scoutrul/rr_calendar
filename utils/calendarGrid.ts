import type { CalendarDay } from '../types/calendar';
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getDaysInMonth,
  getDayOfWeek,
  normalizeDate,
  compareDates,
  formatDate,
} from './dateUtils';

/**
 * Создаёт сетку календаря для указанного месяца
 */
export function generateCalendarGrid(
  year: number,
  month: number,
  selectedDate: Date | null,
  minDate?: Date | null,
  maxDate?: Date | null,
  disabledDates?: string[]
): CalendarDay[] {
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const startDayOfWeek = getDayOfWeek(firstDay);

  const lastDayOfPrevMonth = getLastDayOfMonth(year, month - 1);
  const daysInPrevMonth = lastDayOfPrevMonth.getDate();

  const grid: CalendarDay[] = [];
  const today = normalizeDate(new Date());
  const normalizedSelected = selectedDate ? normalizeDate(selectedDate) : null;

  // Дни предыдущего месяца
  for (let i = 0; i < startDayOfWeek; i++) {
    const day = daysInPrevMonth - startDayOfWeek + 1 + i;
    const date = new Date(year, month - 1, day);
    const normalizedDate = normalizeDate(date);
    
    grid.push(createCalendarDay(
      normalizedDate,
      day,
      false,
      today,
      normalizedSelected,
      minDate,
      maxDate,
      disabledDates
    ));
  }

  // Дни текущего месяца
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const normalizedDate = normalizeDate(date);
    
    grid.push(createCalendarDay(
      normalizedDate,
      i,
      true,
      today,
      normalizedSelected,
      minDate,
      maxDate,
      disabledDates
    ));
  }

  // Дни следующего месяца - заполняем до 42 ячеек (6 недель)
  for (let i = 1; grid.length < 42; i++) {
    const date = new Date(year, month + 1, i);
    const normalizedDate = normalizeDate(date);
    
    grid.push(createCalendarDay(
      normalizedDate,
      i,
      false,
      today,
      normalizedSelected,
      minDate,
      maxDate,
      disabledDates
    ));
  }

  return grid;
}

/**
 * Создаёт объект дня календаря
 */
function createCalendarDay(
  date: Date,
  dayOfMonth: number,
  isCurrentMonth: boolean,
  today: Date,
  selectedDate: Date | null,
  minDate?: Date | null,
  maxDate?: Date | null,
  disabledDates?: string[]
): CalendarDay {
  const isSelected = selectedDate ? compareDates(date, selectedDate) === 0 : false;
  const isTodayDate = compareDates(date, today) === 0;
  
  // Проверка на отключённые даты
  let isDisabled = false;
  
  if (minDate && compareDates(date, minDate) < 0) {
    isDisabled = true;
  }
  if (maxDate && compareDates(date, maxDate) > 0) {
    isDisabled = true;
  }
  if (disabledDates && disabledDates.length > 0) {
    const dateString = formatDate(date);
    isDisabled = isDisabled || disabledDates.includes(dateString);
  }

  return {
    date,
    dayOfMonth,
    isCurrentMonth,
    isToday: isTodayDate,
    isSelected,
    isDisabled,
  };
}

