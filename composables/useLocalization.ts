import { ref, Ref } from 'vue';
import type { Language } from '../types/calendar';
import { translations } from '../constants/translations';

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

