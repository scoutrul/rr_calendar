import { ref, Ref } from 'vue';

export type Language = 'en' | 'ru';

interface LocaleData {
  months: string[];
  daysOfWeek: string[];
  daysOfWeekShort: string[];
  title: string;
  description: string;
  selectedDateLabel: string;
  noDateSelected: string;
}

const translations: Record<Language, LocaleData> = {
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
  },
};

export function useLocalization() {
  const currentLanguage: Ref<Language> = ref<Language>('ru');

  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang;
  };

  return {
    currentLanguage,
    translations,
    setLanguage,
  };
}

