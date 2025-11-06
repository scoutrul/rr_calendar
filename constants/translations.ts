import type { LocaleData, Language } from '../types/calendar';

export const translations: Record<Language, LocaleData> = {
  en: {
    months: [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysOfWeekShort: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    title: 'Vue Calendar',
    description: 'A simple interactive calendar component.',
    selectedDateLabel: 'Selected Date',
    noDateSelected: 'No date selected',
    languageButtonText: 'Русский',
    languageButtonAriaLabel: 'Switch to Russian',
    dismissErrorText: 'Dismiss',
    dismissErrorLabel: 'Dismiss error message',
    previousMonthLabel: 'Previous month',
    nextMonthLabel: 'Next month',
    errorInvalidInitialDate: 'Invalid initial date format. Expected YYYY-MM-DD',
    errorFailedToInitialize: 'Failed to initialize date',
    errorFailedToSelect: 'Failed to select date',
    errorDateBeforeMin: 'Selected date is before minimum allowed date',
    errorDateAfterMax: 'Selected date is after maximum allowed date',
    errorDateDisabled: 'Selected date is disabled',
    errorMinDateAfterMax: 'minDate cannot be after maxDate',
  },
  ru: {
    months: [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ],
    daysOfWeek: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    daysOfWeekShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    title: 'Календарь на Vue',
    description: 'Простой интерактивный компонент календаря.',
    selectedDateLabel: 'Выбранная дата',
    noDateSelected: 'Дата не выбрана',
    languageButtonText: 'English',
    languageButtonAriaLabel: 'Переключить на английский',
    dismissErrorText: 'Закрыть',
    dismissErrorLabel: 'Закрыть сообщение об ошибке',
    previousMonthLabel: 'Предыдущий месяц',
    nextMonthLabel: 'Следующий месяц',
    errorInvalidInitialDate: 'Неверный формат начальной даты. Ожидается YYYY-MM-DD',
    errorFailedToInitialize: 'Не удалось инициализировать дату',
    errorFailedToSelect: 'Не удалось выбрать дату',
    errorDateBeforeMin: 'Выбранная дата раньше минимально допустимой даты',
    errorDateAfterMax: 'Выбранная дата позже максимально допустимой даты',
    errorDateDisabled: 'Выбранная дата отключена',
    errorMinDateAfterMax: 'minDate не может быть позже maxDate',
  },
};

