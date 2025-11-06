/**
 * Утилиты для работы с датами
 */

/**
 * Создаёт объект Date из строки формата YYYY-MM-DD
 */
export function parseDate(dateString: string): Date | null {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }

  // Проверка строгого формата YYYY-MM-DD (с ведущими нулями)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return null;
  }

  const parts = dateString.split('-').map((p) => parseInt(p, 10));
  
  if (parts.length !== 3 || parts.some(isNaN)) {
    return null;
  }

  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);
  
  // Проверка валидности даты
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

/**
 * Форматирует дату в строку YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Сравнивает две даты (без учёта времени)
 */
export function compareDates(date1: Date, date2: Date): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  return d1.getTime() - d2.getTime();
}

/**
 * Проверяет, является ли дата сегодняшней
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate.getTime() === today.getTime();
}

/**
 * Проверяет, находится ли дата в диапазоне
 */
export function isDateInRange(
  date: Date,
  minDate?: Date | null,
  maxDate?: Date | null
): boolean {
  if (minDate && compareDates(date, minDate) < 0) {
    return false;
  }
  if (maxDate && compareDates(date, maxDate) > 0) {
    return false;
  }
  return true;
}

/**
 * Получает первый день месяца
 */
export function getFirstDayOfMonth(year: number, month: number): Date {
  return new Date(year, month, 1);
}

/**
 * Получает последний день месяца
 */
export function getLastDayOfMonth(year: number, month: number): Date {
  return new Date(year, month + 1, 0);
}

/**
 * Получает количество дней в месяце
 */
export function getDaysInMonth(year: number, month: number): number {
  return getLastDayOfMonth(year, month).getDate();
}

/**
 * Получает день недели (0 = понедельник, 6 = воскресенье)
 */
export function getDayOfWeek(date: Date): number {
  const day = date.getDay(); // 0 = воскресенье, 1 = понедельник...
  return day === 0 ? 6 : day - 1; // 0 = понедельник, 6 = воскресенье
}

/**
 * Создаёт нормализованную дату (без времени)
 */
export function normalizeDate(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

