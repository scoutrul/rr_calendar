import { describe, it, expect } from 'vitest';
import { generateCalendarGrid } from '../../utils/calendarGrid';
import { parseDate, normalizeDate } from '../../utils/dateUtils';

describe('calendarGrid', () => {
  describe('generateCalendarGrid', () => {
    it('should generate grid with 42 days (6 weeks)', () => {
      const grid = generateCalendarGrid(2024, 0, null); // January 2024
      expect(grid.length).toBe(42);
    });

    it('should mark today correctly', () => {
      const today = normalizeDate(new Date());
      const grid = generateCalendarGrid(
        today.getFullYear(),
        today.getMonth(),
        null
      );
      const todayDay = grid.find(day => day.isToday);
      expect(todayDay).toBeDefined();
      expect(todayDay?.isToday).toBe(true);
    });

    it('should mark selected date correctly', () => {
      const selectedDate = parseDate('2024-01-15');
      if (!selectedDate) throw new Error('Failed to parse date');
      
      const grid = generateCalendarGrid(2024, 0, selectedDate);
      const selectedDay = grid.find(day => day.isSelected);
      expect(selectedDay).toBeDefined();
      expect(selectedDay?.isSelected).toBe(true);
      expect(selectedDay?.dayOfMonth).toBe(15);
    });

    it('should mark days from current month', () => {
      const grid = generateCalendarGrid(2024, 0, null); // January 2024
      const currentMonthDays = grid.filter(day => day.isCurrentMonth);
      expect(currentMonthDays.length).toBe(31); // January has 31 days
    });

    it('should handle minDate constraint', () => {
      const minDate = parseDate('2024-01-10');
      if (!minDate) throw new Error('Failed to parse date');
      
      const grid = generateCalendarGrid(2024, 0, null, minDate);
      const daysBeforeMin = grid.filter(day => 
        day.date < minDate && day.isCurrentMonth
      );
      expect(daysBeforeMin.every(day => day.isDisabled)).toBe(true);
    });

    it('should handle maxDate constraint', () => {
      const maxDate = parseDate('2024-01-20');
      if (!maxDate) throw new Error('Failed to parse date');
      
      const grid = generateCalendarGrid(2024, 0, null, null, maxDate);
      const daysAfterMax = grid.filter(day => 
        day.date > maxDate && day.isCurrentMonth
      );
      expect(daysAfterMax.every(day => day.isDisabled)).toBe(true);
    });

    it('should handle disabledDates', () => {
      const disabledDates = ['2024-01-15', '2024-01-20'];
      const grid = generateCalendarGrid(2024, 0, null, null, null, disabledDates);
      
      const disabledDay1 = grid.find(day => day.dayOfMonth === 15 && day.isCurrentMonth);
      const disabledDay2 = grid.find(day => day.dayOfMonth === 20 && day.isCurrentMonth);
      
      expect(disabledDay1?.isDisabled).toBe(true);
      expect(disabledDay2?.isDisabled).toBe(true);
    });

    it('should handle February correctly', () => {
      const grid = generateCalendarGrid(2024, 1, null); // February 2024 (leap year)
      const currentMonthDays = grid.filter(day => day.isCurrentMonth);
      expect(currentMonthDays.length).toBe(29);
    });
  });
});

