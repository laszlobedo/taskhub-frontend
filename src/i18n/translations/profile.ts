import type { SupportedLocale } from '@/i18n/locales';

type ProfileTranslations = {
  loading: string;
  loadErrorFallback: string;
  unavailable: string;
  joinedRecently: string;
  joinedPrefix: string;
  recently: string;
  weekAgo: string;
  weeksAgoSuffix: string;
  cover: {
    editCover: string;
    updateCoverPhoto: string;
    addCoverPhoto: string;
    deleteCoverPhoto: string;
    deleteError: string;
    updateError: string;
  };
  avatar: {
    verifiedTitle: string;
    openActionsAria: string;
    viewProfilePhoto: string;
    updateProfilePhoto: string;
    deleteProfilePhoto: string;
    addProfilePhoto: string;
    deleteError: string;
    updateError: string;
  };
  verification: {
    verifiedPro: string;
    verificationNeeded: string;
    availableForWork: string;
  };
  actions: {
    share: string;
    editProfile: string;
    close: string;
  };
  stats: {
    rating: string;
    jobsDone: string;
    jobsPosted: string;
    ads: string;
  };
  tabs: {
    overview: string;
    reviews: string;
    givenReviews: string;
  };
  overview: {
    aboutMe: string;
  };
  reviews: {
    empty: string;
    noComment: string;
    showLess: string;
    showMore: string;
  };
  side: {
    contactInformation: string;
    messageMe: string;
    skills: string;
    languages: string;
    noLanguagesYet: string;
    verifications: string;
    idVerified: string;
    idVerificationNeeded: string;
    emailVerified: string;
    emailVerificationNeeded: string;
  };
};

export const profileTranslations: Record<SupportedLocale, ProfileTranslations> = {
  en: {
    loading: 'Loading profile...',
    loadErrorFallback: 'Failed to load profile data.',
    unavailable: 'Profile data is unavailable. Please refresh the page.',
    joinedRecently: 'Joined recently',
    joinedPrefix: 'Joined',
    recently: 'Recently',
    weekAgo: '1 week ago',
    weeksAgoSuffix: 'weeks ago',
    cover: {
      editCover: 'Edit Cover',
      updateCoverPhoto: 'Update cover photo',
      addCoverPhoto: 'Add cover photo',
      deleteCoverPhoto: 'Delete cover photo',
      deleteError: 'Failed to delete cover picture.',
      updateError: 'Failed to update cover picture.',
    },
    avatar: {
      verifiedTitle: 'Identity Verified',
      openActionsAria: 'Open profile picture actions',
      viewProfilePhoto: 'View profile photo',
      updateProfilePhoto: 'Update profile photo',
      deleteProfilePhoto: 'Delete profile photo',
      addProfilePhoto: 'Add profile photo',
      deleteError: 'Failed to delete profile picture.',
      updateError: 'Failed to update profile picture.',
    },
    verification: {
      verifiedPro: 'Verified Pro',
      verificationNeeded: 'Verification needed',
      availableForWork: 'Available for work',
    },
    actions: {
      share: 'Share',
      editProfile: 'Edit Profile',
      close: 'Close',
    },
    stats: {
      rating: 'Rating',
      jobsDone: 'Jobs Done',
      jobsPosted: 'Jobs Posted',
      ads: 'Ads',
    },
    tabs: {
      overview: 'Overview',
      reviews: 'Reviews',
      givenReviews: 'Given Reviews',
    },
    overview: {
      aboutMe: 'About Me',
    },
    reviews: {
      empty: 'No reviews yet.',
      noComment: 'No comment yet.',
      showLess: 'Show Less Reviews',
      showMore: 'Show More Reviews',
    },
    side: {
      contactInformation: 'Contact Information',
      messageMe: 'Message Me',
      skills: 'Skills',
      languages: 'Languages',
      noLanguagesYet: 'No languages added yet.',
      verifications: 'Verifications',
      idVerified: 'ID Verified',
      idVerificationNeeded: 'ID verification needed',
      emailVerified: 'Email Verified',
      emailVerificationNeeded: 'Email verification needed',
    },
  },
  ro: {
    loading: 'Se încarcă profilul...',
    loadErrorFallback: 'Nu s-au putut încărca datele profilului.',
    unavailable: 'Datele profilului nu sunt disponibile. Reîmprospătează pagina.',
    joinedRecently: 'Înscris recent',
    joinedPrefix: 'Înscris în',
    recently: 'Recent',
    weekAgo: 'acum 1 săptămână',
    weeksAgoSuffix: 'săptămâni în urmă',
    cover: {
      editCover: 'Editează coperta',
      updateCoverPhoto: 'Actualizează poza de copertă',
      addCoverPhoto: 'Adaugă poză de copertă',
      deleteCoverPhoto: 'Șterge poza de copertă',
      deleteError: 'Ștergerea pozei de copertă a eșuat.',
      updateError: 'Actualizarea pozei de copertă a eșuat.',
    },
    avatar: {
      verifiedTitle: 'Identitate verificată',
      openActionsAria: 'Deschide acțiuni poză profil',
      viewProfilePhoto: 'Vezi poza de profil',
      updateProfilePhoto: 'Actualizează poza de profil',
      deleteProfilePhoto: 'Șterge poza de profil',
      addProfilePhoto: 'Adaugă poză de profil',
      deleteError: 'Ștergerea pozei de profil a eșuat.',
      updateError: 'Actualizarea pozei de profil a eșuat.',
    },
    verification: {
      verifiedPro: 'Pro verificat',
      verificationNeeded: 'Verificare necesară',
      availableForWork: 'Disponibil pentru muncă',
    },
    actions: {
      share: 'Distribuie',
      editProfile: 'Editează profilul',
      close: 'Închide',
    },
    stats: {
      rating: 'Rating',
      jobsDone: 'Joburi finalizate',
      jobsPosted: 'Joburi publicate',
      ads: 'Anunțuri',
    },
    tabs: {
      overview: 'Prezentare',
      reviews: 'Recenzii',
      givenReviews: 'Recenzii oferite',
    },
    overview: {
      aboutMe: 'Despre mine',
    },
    reviews: {
      empty: 'Nu există recenzii încă.',
      noComment: 'Fără comentariu.',
      showLess: 'Arată mai puține recenzii',
      showMore: 'Arată mai multe recenzii',
    },
    side: {
      contactInformation: 'Informații de contact',
      messageMe: 'Trimite mesaj',
      skills: 'Competențe',
      languages: 'Limbi',
      noLanguagesYet: 'Nu au fost adăugate limbi.',
      verifications: 'Verificări',
      idVerified: 'ID verificat',
      idVerificationNeeded: 'Verificare ID necesară',
      emailVerified: 'Email verificat',
      emailVerificationNeeded: 'Verificare email necesară',
    },
  },
  hu: {
    loading: 'Profil betöltése...',
    loadErrorFallback: 'A profiladatok betöltése sikertelen.',
    unavailable: 'A profiladatok nem érhetők el. Frissítsd az oldalt.',
    joinedRecently: 'Nemrég csatlakozott',
    joinedPrefix: 'Csatlakozott',
    recently: 'Nemrég',
    weekAgo: '1 hete',
    weeksAgoSuffix: 'hete',
    cover: {
      editCover: 'Borítókép szerkesztése',
      updateCoverPhoto: 'Borítókép frissítése',
      addCoverPhoto: 'Borítókép hozzáadása',
      deleteCoverPhoto: 'Borítókép törlése',
      deleteError: 'A borítókép törlése sikertelen.',
      updateError: 'A borítókép frissítése sikertelen.',
    },
    avatar: {
      verifiedTitle: 'Azonosítás ellenőrizve',
      openActionsAria: 'Profilkép műveletek megnyitása',
      viewProfilePhoto: 'Profilkép megtekintése',
      updateProfilePhoto: 'Profilkép frissítése',
      deleteProfilePhoto: 'Profilkép törlése',
      addProfilePhoto: 'Profilkép hozzáadása',
      deleteError: 'A profilkép törlése sikertelen.',
      updateError: 'A profilkép frissítése sikertelen.',
    },
    verification: {
      verifiedPro: 'Ellenőrzött profi',
      verificationNeeded: 'Ellenőrzés szükséges',
      availableForWork: 'Munkára elérhető',
    },
    actions: {
      share: 'Megosztás',
      editProfile: 'Profil szerkesztése',
      close: 'Bezárás',
    },
    stats: {
      rating: 'Értékelés',
      jobsDone: 'Elvégzett munkák',
      jobsPosted: 'Közzétett munkák',
      ads: 'Hirdetések',
    },
    tabs: {
      overview: 'Áttekintés',
      reviews: 'Értékelések',
      givenReviews: 'Adott értékelések',
    },
    overview: {
      aboutMe: 'Rólam',
    },
    reviews: {
      empty: 'Még nincsenek értékelések.',
      noComment: 'Nincs megjegyzés.',
      showLess: 'Kevesebb értékelés',
      showMore: 'Több értékelés',
    },
    side: {
      contactInformation: 'Kapcsolati adatok',
      messageMe: 'Üzenet küldése',
      skills: 'Készségek',
      languages: 'Nyelvek',
      noLanguagesYet: 'Még nincsenek nyelvek hozzáadva.',
      verifications: 'Ellenőrzések',
      idVerified: 'Személyazonosító ellenőrizve',
      idVerificationNeeded: 'Személyazonosító ellenőrzése szükséges',
      emailVerified: 'Email ellenőrizve',
      emailVerificationNeeded: 'Email ellenőrzése szükséges',
    },
  },
};
