import { describe, it, expect } from 'vitest';
import {
  parseDate,
  formatDate,
  compareDates,
  isToday,
  isDateInRange,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getDaysInMonth,
  getDayOfWeek,
  normalizeDate,
} from '../../utils/dateUtils';

describe('dateUtils', () => {
  describe('parseDate', () => {
    it('should parse valid date string', () => {
      const date = parseDate('2024-01-15');
      expect(date).not.toBeNull();
      expect(date?.getFullYear()).toBe(2024);
      expect(date?.getMonth()).toBe(0); // January is 0
      expect(date?.getDate()).toBe(15);
    });

    it('should return null for invalid format', () => {
      expect(parseDate('invalid')).toBeNull();
      expect(parseDate('2024-1-15')).toBeNull();
      expect(parseDate('2024-01-32')).toBeNull(); // Invalid day
      expect(parseDate('2024-13-01')).toBeNull(); // Invalid month
    });

    it('should return null for empty string', () => {
      expect(parseDate('')).toBeNull();
    });

    it('should handle leap year correctly', () => {
      const date = parseDate('2024-02-29');
      expect(date).not.toBeNull();
      expect(date?.getDate()).toBe(29);
    });

    it('should return null for non-leap year February 29', () => {
      expect(parseDate('2023-02-29')).toBeNull();
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date(2024, 0, 15);
      expect(formatDate(date)).toBe('2024-01-15');
    });

    it('should pad single digit months and days', () => {
      const date = new Date(2024, 0, 5);
      expect(formatDate(date)).toBe('2024-01-05');
    });
  });

  describe('compareDates', () => {
    it('should return 0 for same dates', () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2024, 0, 15);
      expect(compareDates(date1, date2)).toBe(0);
    });

    it('should return negative for earlier date', () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2024, 0, 16);
      expect(compareDates(date1, date2)).toBeLessThan(0);
    });

    it('should return positive for later date', () => {
      const date1 = new Date(2024, 0, 16);
      const date2 = new Date(2024, 0, 15);
      expect(compareDates(date1, date2)).toBeGreaterThan(0);
    });

    it('should ignore time component', () => {
      const date1 = new Date(2024, 0, 15, 10, 30);
      const date2 = new Date(2024, 0, 15, 20, 45);
      expect(compareDates(date1, date2)).toBe(0);
    });
  });

  describe('isToday', () => {
    it('should return true for today', () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it('should return false for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });

    it('should return false for tomorrow', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isToday(tomorrow)).toBe(false);
    });
  });

  describe('isDateInRange', () => {
    const minDate = new Date(2024, 0, 10);
    const maxDate = new Date(2024, 0, 20);

    it('should return true for date in range', () => {
      const date = new Date(2024, 0, 15);
      expect(isDateInRange(date, minDate, maxDate)).toBe(true);
    });

    it('should return false for date before min', () => {
      const date = new Date(2024, 0, 5);
      expect(isDateInRange(date, minDate, maxDate)).toBe(false);
    });

    it('should return false for date after max', () => {
      const date = new Date(2024, 0, 25);
      expect(isDateInRange(date, minDate, maxDate)).toBe(false);
    });

    it('should return true when no min date', () => {
      const date = new Date(2024, 0, 5);
      expect(isDateInRange(date, null, maxDate)).toBe(true);
    });

    it('should return true when no max date', () => {
      const date = new Date(2024, 0, 25);
      expect(isDateInRange(date, minDate, null)).toBe(true);
    });
  });

  describe('getFirstDayOfMonth', () => {
    it('should return first day of month', () => {
      const date = getFirstDayOfMonth(2024, 0);
      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
    });
  });

  describe('getLastDayOfMonth', () => {
    it('should return last day of month', () => {
      const date = getLastDayOfMonth(2024, 0); // January
      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(31);
    });

    it('should handle February correctly', () => {
      const date = getLastDayOfMonth(2024, 1); // February 2024 (leap year)
      expect(date.getDate()).toBe(29);
    });
  });

  describe('getDaysInMonth', () => {
    it('should return correct days for January', () => {
      expect(getDaysInMonth(2024, 0)).toBe(31);
    });

    it('should return correct days for February in leap year', () => {
      expect(getDaysInMonth(2024, 1)).toBe(29);
    });

    it('should return correct days for February in non-leap year', () => {
      expect(getDaysInMonth(2023, 1)).toBe(28);
    });
  });

  describe('getDayOfWeek', () => {
    it('should return 0 for Monday', () => {
      const monday = new Date(2024, 0, 1); // January 1, 2024 is Monday
      expect(getDayOfWeek(monday)).toBe(0);
    });
  });

  describe('normalizeDate', () => {
    it('should remove time component', () => {
      const date = new Date(2024, 0, 15, 10, 30, 45, 123);
      const normalized = normalizeDate(date);
      expect(normalized.getHours()).toBe(0);
      expect(normalized.getMinutes()).toBe(0);
      expect(normalized.getSeconds()).toBe(0);
      expect(normalized.getMilliseconds()).toBe(0);
    });
  });
});

