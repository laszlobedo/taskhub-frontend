import type { SupportedLocale } from '@/i18n/locales';

type NavigationTranslations = {
  mainNav: {
    findJob: string;
    postJob: string;
  };
  actions: {
    logOut: string;
  };
};

export const navigationTranslations: Record<SupportedLocale, NavigationTranslations> = {
  en: {
    mainNav: {
      findJob: 'Find Job',
      postJob: 'Post a Job',
    },
    actions: {
      logOut: 'Log Out',
    },
  },
  ro: {
    mainNav: {
      findJob: 'Găsește job',
      postJob: 'Publică un job',
    },
    actions: {
      logOut: 'Deconectare',
    },
  },
  hu: {
    mainNav: {
      findJob: 'Munka keresése',
      postJob: 'Munka közzététele',
    },
    actions: {
      logOut: 'Kijelentkezés',
    },
  },
};
