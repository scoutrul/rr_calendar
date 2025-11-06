export type Language = 'en' | 'ru';

export interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled?: boolean;
}

export interface LocaleData {
  months: string[];
  daysOfWeek: string[];
  daysOfWeekShort: string[];
  title: string;
  description: string;
  selectedDateLabel: string;
  noDateSelected: string;
  languageButtonText: string;
  languageButtonAriaLabel: string;
  dismissErrorText: string;
  dismissErrorLabel: string;
  previousMonthLabel: string;
  nextMonthLabel: string;
  errorInvalidInitialDate: string;
  errorFailedToInitialize: string;
  errorFailedToSelect: string;
  errorDateBeforeMin: string;
  errorDateAfterMax: string;
  errorDateDisabled: string;
  errorMinDateAfterMax: string;
}

export interface CalendarProps {
  initialDate?: string; // YYYY-MM-DD format
  language?: Language;
  minDate?: string; // YYYY-MM-DD format
  maxDate?: string; // YYYY-MM-DD format
  disabledDates?: string[]; // YYYY-MM-DD format
}

