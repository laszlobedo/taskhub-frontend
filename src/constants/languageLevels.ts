export enum LanguageLevel {
  Beginner = 1,
  Advanced = 2,
  Fluent = 3,
  Native = 4,
}

export const LANGUAGE_LEVEL_LABEL: Record<LanguageLevel, string> = {
  [LanguageLevel.Beginner]: 'Beginner',
  [LanguageLevel.Advanced]: 'Advanced',
  [LanguageLevel.Fluent]: 'Fluent',
  [LanguageLevel.Native]: 'Native',
};

const LANGUAGE_LEVEL_LABELS_BY_LOCALE: Record<
  'en' | 'ro' | 'hu',
  Record<LanguageLevel, string>
> = {
  en: LANGUAGE_LEVEL_LABEL,
  ro: {
    [LanguageLevel.Beginner]: 'Începător',
    [LanguageLevel.Advanced]: 'Avansat',
    [LanguageLevel.Fluent]: 'Fluent',
    [LanguageLevel.Native]: 'Nativ',
  },
  hu: {
    [LanguageLevel.Beginner]: 'Kezdő',
    [LanguageLevel.Advanced]: 'Haladó',
    [LanguageLevel.Fluent]: 'Folyékony',
    [LanguageLevel.Native]: 'Anyanyelvi',
  },
};

export const getLanguageLevelLabel = (
  locale: 'en' | 'ro' | 'hu',
  level: LanguageLevel,
): string => LANGUAGE_LEVEL_LABELS_BY_LOCALE[locale][level];

export const LANGUAGE_LEVEL_COLOR: Record<LanguageLevel, { badge: string; bar: string }> = {
  [LanguageLevel.Beginner]: {
    badge: 'text-red-700 bg-red-50',
    bar: 'bg-red-500',
  },
  [LanguageLevel.Advanced]: {
    badge: 'text-yellow-700 bg-yellow-50',
    bar: 'bg-yellow-500',
  },
  [LanguageLevel.Fluent]: {
    badge: 'text-blue-700 bg-blue-50',
    bar: 'bg-blue-500',
  },
  [LanguageLevel.Native]: {
    badge: 'text-green-700 bg-green-50',
    bar: 'bg-green-500',
  },
};

export const normalizeLanguageLevel = (rawLevel: string): LanguageLevel => {
  const normalized = rawLevel.trim().toLowerCase();

  switch (normalized) {
    case '1':
    case 'beginner':
      return LanguageLevel.Beginner;
    case '2':
    case 'advanced':
      return LanguageLevel.Advanced;
    case '3':
    case 'fluent':
      return LanguageLevel.Fluent;
    case '4':
    case 'native':
      return LanguageLevel.Native;
    default:
      return LanguageLevel.Beginner;
  }
};
