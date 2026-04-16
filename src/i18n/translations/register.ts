import type { SupportedLocale } from '@/i18n/locales';

type RegisterTranslations = {
  nav: {
    alreadyHaveAccount: string;
    logIn: string;
  };
  common: {
    stepBadge: string[];
    back: string;
    skipForNow: string;
    nextStep: string;
    createAccount: string;
    creatingAccount: string;
    browseFiles: string;
    fileTypesImages: string;
  };
  fields: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    address: string;
    bio: string;
    description: string;
    language: string;
    level: string;
    skills: string;
  };
  validation: {
    requiredSuffix: string;
    validEmail: string;
    phoneNumeric: string;
    passwordMin: string;
    confirmMatch: string;
    governmentFileRequired: string;
    governmentRequiredBeforeContinue: string;
  };
  steps: {
    accountDetails: { title: string; subtitle: string };
    profileDetails: { title: string; subtitle: string };
    languagesSkills: { title: string; subtitle: string; addLanguage: string; addSkill: string };
    uploadPictures: { title: string; subtitle: string; profilePicture: string; coverPicture: string };
    verifyIdentity: { title: string; subtitle: string; uploadGovernmentId: string; governmentIdHint: string; securityInfo: string };
    finishProfile: { title: string; subtitle: string; uploadResume: string; resumeHint: string };
  };
  success: {
    title: string;
    line1: string;
    line2: string;
    continue: string;
  };
};

export const registerTranslations: Record<SupportedLocale, RegisterTranslations> = {
  en: {
    nav: {
      alreadyHaveAccount: 'Already have an account?',
      logIn: 'Log In',
    },
    common: {
      stepBadge: ['Step 1 of 6', 'Step 2 of 6', 'Step 3 of 6', 'Step 4 of 6', 'Step 5 of 6', 'Step 6 of 6'],
      back: 'Back',
      skipForNow: 'Skip for now',
      nextStep: 'Next Step',
      createAccount: 'Create Account',
      creatingAccount: 'Creating Account...',
      browseFiles: 'Browse Files',
      fileTypesImages: 'JPG, PNG or WEBP',
    },
    fields: {
      firstName: 'First Name',
      lastName: 'Last Name',
      emailAddress: 'Email Address',
      phoneNumber: 'Phone Number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      address: 'Address',
      bio: 'Bio',
      description: 'Description',
      language: 'Language',
      level: 'Level',
      skills: 'Skills',
    },
    validation: {
      requiredSuffix: 'is required!',
      validEmail: 'Email Address must be a valid email format!',
      phoneNumeric: 'Phone Number must be numeric!',
      passwordMin: 'Password must be at least 8 characters!',
      confirmMatch: 'Confirm Password must match Password!',
      governmentFileRequired: 'Government ID file is required.',
      governmentRequiredBeforeContinue: 'Government ID is required before continuing.',
    },
    steps: {
      accountDetails: { title: 'Account Details', subtitle: "Let's start with the basics." },
      profileDetails: { title: 'Profile Details', subtitle: 'Tell us a bit more about yourself.' },
      languagesSkills: { title: 'Languages and Skills', subtitle: 'Add your language level and core skills.', addLanguage: '+ Add language', addSkill: '+ Add skill' },
      uploadPictures: { title: 'Upload Pictures', subtitle: 'Add your profile and cover images.', profilePicture: 'Upload Profile Picture', coverPicture: 'Upload Cover Picture' },
      verifyIdentity: {
        title: 'Verify Identity',
        subtitle: 'We require ID verification to ensure safety for all users.',
        uploadGovernmentId: 'Upload Government ID',
        governmentIdHint: "Passport, Driver's License, or National ID",
        securityInfo: 'Your data is encrypted and securely stored. We only use this for identity verification purposes.',
      },
      finishProfile: { title: 'Finish Profile', subtitle: 'Upload your CV to stand out (Optional).', uploadResume: 'Upload CV / Resume', resumeHint: 'PDF, DOCX up to 5MB' },
    },
    success: {
      title: 'Registration Successful',
      line1: 'Your account was created successfully.',
      line2: 'You will receive a confirmation email shortly.',
      continue: 'Continue',
    },
  },
  ro: {
    nav: {
      alreadyHaveAccount: 'Ai deja un cont?',
      logIn: 'Autentificare',
    },
    common: {
      stepBadge: ['Pasul 1 din 6', 'Pasul 2 din 6', 'Pasul 3 din 6', 'Pasul 4 din 6', 'Pasul 5 din 6', 'Pasul 6 din 6'],
      back: 'Înapoi',
      skipForNow: 'Sari peste acum',
      nextStep: 'Pasul următor',
      createAccount: 'Creează cont',
      creatingAccount: 'Se creează contul...',
      browseFiles: 'Alege fișier',
      fileTypesImages: 'JPG, PNG sau WEBP',
    },
    fields: {
      firstName: 'Prenume',
      lastName: 'Nume',
      emailAddress: 'Adresă email',
      phoneNumber: 'Număr de telefon',
      password: 'Parolă',
      confirmPassword: 'Confirmă parola',
      address: 'Adresă',
      bio: 'Bio',
      description: 'Descriere',
      language: 'Limbă',
      level: 'Nivel',
      skills: 'Competențe',
    },
    validation: {
      requiredSuffix: 'este obligatoriu!',
      validEmail: 'Adresa de email trebuie să fie validă!',
      phoneNumeric: 'Numărul de telefon trebuie să conțină doar cifre!',
      passwordMin: 'Parola trebuie să aibă cel puțin 8 caractere!',
      confirmMatch: 'Confirmarea parolei trebuie să corespundă parolei!',
      governmentFileRequired: 'Fișierul pentru actul de identitate este obligatoriu.',
      governmentRequiredBeforeContinue: 'Actul de identitate este obligatoriu înainte de continuare.',
    },
    steps: {
      accountDetails: { title: 'Detalii cont', subtitle: 'Să începem cu baza.' },
      profileDetails: { title: 'Detalii profil', subtitle: 'Spune-ne mai multe despre tine.' },
      languagesSkills: { title: 'Limbi și competențe', subtitle: 'Adaugă nivelul tău de limbă și competențele principale.', addLanguage: '+ Adaugă limbă', addSkill: '+ Adaugă competență' },
      uploadPictures: { title: 'Încarcă poze', subtitle: 'Adaugă poza de profil și cea de copertă.', profilePicture: 'Încarcă poza de profil', coverPicture: 'Încarcă poza de copertă' },
      verifyIdentity: {
        title: 'Verificare identitate',
        subtitle: 'Solicităm verificarea identității pentru siguranța tuturor utilizatorilor.',
        uploadGovernmentId: 'Încarcă actul de identitate',
        governmentIdHint: 'Pașaport, permis de conducere sau carte de identitate',
        securityInfo: 'Datele tale sunt criptate și stocate securizat. Le folosim doar pentru verificarea identității.',
      },
      finishProfile: { title: 'Finalizează profilul', subtitle: 'Încarcă CV-ul tău pentru a te evidenția (Opțional).', uploadResume: 'Încarcă CV / Rezumat', resumeHint: 'PDF, DOCX până la 5MB' },
    },
    success: {
      title: 'Înregistrare reușită',
      line1: 'Contul tău a fost creat cu succes.',
      line2: 'Vei primi în curând un email de confirmare.',
      continue: 'Continuă',
    },
  },
  hu: {
    nav: {
      alreadyHaveAccount: 'Már van fiókod?',
      logIn: 'Bejelentkezés',
    },
    common: {
      stepBadge: ['1 / 6. lépés', '2 / 6. lépés', '3 / 6. lépés', '4 / 6. lépés', '5 / 6. lépés', '6 / 6. lépés'],
      back: 'Vissza',
      skipForNow: 'Most kihagyom',
      nextStep: 'Következő lépés',
      createAccount: 'Fiók létrehozása',
      creatingAccount: 'Fiók létrehozása...',
      browseFiles: 'Fájl tallózása',
      fileTypesImages: 'JPG, PNG vagy WEBP',
    },
    fields: {
      firstName: 'Keresztnév',
      lastName: 'Vezetéknév',
      emailAddress: 'Email cím',
      phoneNumber: 'Telefonszám',
      password: 'Jelszó',
      confirmPassword: 'Jelszó megerősítése',
      address: 'Cím',
      bio: 'Rövid bemutatkozás',
      description: 'Leírás',
      language: 'Nyelv',
      level: 'Szint',
      skills: 'Készségek',
    },
    validation: {
      requiredSuffix: 'kötelező!',
      validEmail: 'Az email cím formátuma érvénytelen!',
      phoneNumeric: 'A telefonszám csak számokat tartalmazhat!',
      passwordMin: 'A jelszónak legalább 8 karakterből kell állnia!',
      confirmMatch: 'A jelszó megerősítése nem egyezik!',
      governmentFileRequired: 'Személyazonosító okmány feltöltése kötelező.',
      governmentRequiredBeforeContinue: 'A folytatáshoz személyazonosító okmány szükséges.',
    },
    steps: {
      accountDetails: { title: 'Fiók adatai', subtitle: 'Kezdjük az alapokkal.' },
      profileDetails: { title: 'Profil adatai', subtitle: 'Mesélj egy kicsit magadról.' },
      languagesSkills: { title: 'Nyelvek és készségek', subtitle: 'Add meg a nyelvtudásod és fő készségeid.', addLanguage: '+ Nyelv hozzáadása', addSkill: '+ Készség hozzáadása' },
      uploadPictures: { title: 'Képek feltöltése', subtitle: 'Adj hozzá profil- és borítóképet.', profilePicture: 'Profilkép feltöltése', coverPicture: 'Borítókép feltöltése' },
      verifyIdentity: {
        title: 'Személyazonosság ellenőrzése',
        subtitle: 'A felhasználók biztonsága érdekében személyazonosság-ellenőrzést kérünk.',
        uploadGovernmentId: 'Személyi okmány feltöltése',
        governmentIdHint: 'Útlevél, jogosítvány vagy személyi igazolvány',
        securityInfo: 'Az adataid titkosítva és biztonságosan tárolva vannak. Kizárólag az azonosításra használjuk.',
      },
      finishProfile: { title: 'Profil befejezése', subtitle: 'Töltsd fel az önéletrajzod, hogy kitűnj (opcionális).', uploadResume: 'Önéletrajz feltöltése', resumeHint: 'PDF, DOCX max. 5MB' },
    },
    success: {
      title: 'Sikeres regisztráció',
      line1: 'A fiókod sikeresen létrejött.',
      line2: 'Hamarosan megerősítő emailt kapsz.',
      continue: 'Folytatás',
    },
  },
};
