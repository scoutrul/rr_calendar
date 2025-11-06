import { describe, it, expect, beforeEach } from 'vitest';
import { useLocalization } from '../../composables/useLocalization';

describe('useLocalization', () => {
  it('should initialize with Russian language', () => {
    const { currentLanguage } = useLocalization();
    expect(currentLanguage.value).toBe('ru');
  });

  it('should change language', () => {
    const { currentLanguage, setLanguage } = useLocalization();
    setLanguage('en');
    expect(currentLanguage.value).toBe('en');
    
    setLanguage('ru');
    expect(currentLanguage.value).toBe('ru');
  });

  it('should have translations for both languages', () => {
    const { translations } = useLocalization();
    expect(translations.en).toBeDefined();
    expect(translations.ru).toBeDefined();
  });

  it('should have all required translation keys', () => {
    const { translations } = useLocalization();
    const requiredKeys = [
      'months',
      'daysOfWeek',
      'daysOfWeekShort',
      'title',
      'description',
      'selectedDateLabel',
      'noDateSelected',
      'languageButtonText',
      'languageButtonAriaLabel',
      'dismissErrorText',
      'dismissErrorLabel',
      'previousMonthLabel',
      'nextMonthLabel',
      'errorInvalidInitialDate',
      'errorFailedToInitialize',
      'errorFailedToSelect',
      'errorDateBeforeMin',
      'errorDateAfterMax',
      'errorDateDisabled',
      'errorMinDateAfterMax',
    ];

    requiredKeys.forEach(key => {
      expect(translations.en).toHaveProperty(key);
      expect(translations.ru).toHaveProperty(key);
    });
  });

  it('should have 12 months', () => {
    const { translations } = useLocalization();
    expect(translations.en.months.length).toBe(12);
    expect(translations.ru.months.length).toBe(12);
  });

  it('should have 7 days of week', () => {
    const { translations } = useLocalization();
    expect(translations.en.daysOfWeek.length).toBe(7);
    expect(translations.ru.daysOfWeek.length).toBe(7);
    expect(translations.en.daysOfWeekShort.length).toBe(7);
    expect(translations.ru.daysOfWeekShort.length).toBe(7);
  });
});

