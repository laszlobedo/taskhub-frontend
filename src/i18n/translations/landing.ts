export type LandingLocale = 'en' | 'ro' | 'hu';

type LandingTranslations = {
  auth: {
    logIn: string;
    signUp: string;
  };
  nav: {
    home: string;
    findJob: string;
    postJob: string;
  };
  profileMenu: {
    dashboard: string;
    myProfile: string;
    settings: string;
    signOut: string;
  };
  hero: {
    needA: string;
    professional: string;
    needDescription: string;
    postJobCta: string;
    wantTo: string;
    earnMoney: string;
    earnDescription: string;
    findWorkCta: string;
  };
  services: {
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    seeAllJobsCta: string;
  };
  howItWorks: {
    title: string;
    description: string;
    steps: Array<{
      step: string;
      title: string;
      desc: string;
    }>;
    cta: string;
  };
  trust: {
    title: string;
    description: string;
  };
  footer: {
    brandDescription: string;
  };
};

export const landingTranslations: Record<LandingLocale, LandingTranslations> = {
  en: {
    auth: {
      logIn: 'Log In',
      signUp: 'Sign Up',
    },
    nav: {
      home: 'Home',
      findJob: 'Find Job',
      postJob: 'Post a Job',
    },
    profileMenu: {
      dashboard: 'Dashboard',
      myProfile: 'My Profile',
      settings: 'Settings',
      signOut: 'Sign Out',
    },
    hero: {
      needA: 'I need a',
      professional: 'Professional',
      needDescription:
        "Find verified local help for any project. From renovations to digital tasks, we've got you covered.",
      postJobCta: 'Post a Job',
      wantTo: 'I want to',
      earnMoney: 'Earn Money',
      earnDescription:
        'Join thousands of Romanian professionals. Remote or on-site, set your own rates and get paid.',
      findWorkCta: 'Find Work Now',
    },
    services: {
      titlePrefix: 'Get it done,',
      titleHighlight: 'hassle-free',
      description: 'From home repairs to digital services, find the right professional for any job.',
      seeAllJobsCta: 'See all jobs',
    },
    howItWorks: {
      title: 'How it works',
      description: "Simple for both sides. Whether you're hiring or working, we make it seamless.",
      steps: [
        {
          step: '01',
          title: 'Post or Find',
          desc: 'Clients post their needs. Workers browse jobs that fit their skills.',
        },
        {
          step: '02',
          title: 'Connect & Agree',
          desc: 'Chat securely, check reviews, and agree on price and details.',
        },
        {
          step: '03',
          title: 'Work & Pay',
          desc: 'Job gets done. Payment is released securely upon completion.',
        },
      ],
      cta: 'Find Work Now',
    },
    trust: {
      title: 'Trusted by Romania',
      description: 'Join thousands of verified users who trust our platform.',
    },
    footer: {
      brandDescription:
        'Connecting people who need help with trusted local professionals. The easiest way to get things done in Romania.',
    },
  },
  ro: {
    auth: {
      logIn: 'Autentificare',
      signUp: 'Înregistrare',
    },
    nav: {
      home: 'Acasă',
      findJob: 'Găsește job',
      postJob: 'Publică un job',
    },
    profileMenu: {
      dashboard: 'Tablou de bord',
      myProfile: 'Profilul meu',
      settings: 'Setări',
      signOut: 'Deconectare',
    },
    hero: {
      needA: 'Am nevoie de un',
      professional: 'Profesionist',
      needDescription:
        'Găsește ajutor local verificat pentru orice proiect. De la renovări la task-uri digitale, te ajutăm noi.',
      postJobCta: 'Publică un job',
      wantTo: 'Vreau să',
      earnMoney: 'Câștig bani',
      earnDescription:
        'Alătură-te miilor de profesioniști din România. Remote sau la locație, îți setezi tarifele și ești plătit.',
      findWorkCta: 'Găsește de lucru',
    },
    services: {
      titlePrefix: 'Rezolvă rapid,',
      titleHighlight: 'fără bătăi de cap',
      description:
        'De la reparații în casă la servicii digitale, găsește profesionistul potrivit pentru orice job.',
      seeAllJobsCta: 'Vezi toate joburile',
    },
    howItWorks: {
      title: 'Cum funcționează',
      description:
        'Simplu pentru ambele părți. Fie că angajezi sau lucrezi, noi facem totul ușor.',
      steps: [
        {
          step: '01',
          title: 'Publică sau caută',
          desc: 'Clienții publică nevoile lor. Lucrătorii găsesc joburi potrivite pentru competențele lor.',
        },
        {
          step: '02',
          title: 'Conectează-te și stabiliți detaliile',
          desc: 'Discutați în siguranță, verifică recenzii și stabiliți prețul și detaliile.',
        },
        {
          step: '03',
          title: 'Lucrează și primește plata',
          desc: 'Jobul este finalizat. Plata este eliberată în siguranță la final.',
        },
      ],
      cta: 'Găsește de lucru',
    },
    trust: {
      title: 'De încredere în România',
      description: 'Alătură-te miilor de utilizatori verificați care au încredere în platforma noastră.',
    },
    footer: {
      brandDescription:
        'Conectăm oameni care au nevoie de ajutor cu profesioniști locali de încredere. Cel mai ușor mod de a rezolva lucrurile în România.',
    },
  },
  hu: {
    auth: {
      logIn: 'Bejelentkezés',
      signUp: 'Regisztráció',
    },
    nav: {
      home: 'Főoldal',
      findJob: 'Munka keresése',
      postJob: 'Munka közzététele',
    },
    profileMenu: {
      dashboard: 'Vezérlőpult',
      myProfile: 'Profilom',
      settings: 'Beállítások',
      signOut: 'Kijelentkezés',
    },
    hero: {
      needA: 'Szükségem van egy',
      professional: 'Szakemberre',
      needDescription:
        'Találj ellenőrzött helyi segítséget bármilyen projekthez. Felújítástól a digitális feladatokig mindenben segítünk.',
      postJobCta: 'Munka közzététele',
      wantTo: 'Szeretnék',
      earnMoney: 'Pénzt keresni',
      earnDescription:
        'Csatlakozz több ezer romániai szakemberhez. Távmunkában vagy helyszínen, állítsd be a díjaidat és kapj fizetést.',
      findWorkCta: 'Munka keresése',
    },
    services: {
      titlePrefix: 'Intézd el gyorsan,',
      titleHighlight: 'gond nélkül',
      description:
        'Otthoni javításoktól a digitális szolgáltatásokig, találd meg a megfelelő szakembert bármilyen munkára.',
      seeAllJobsCta: 'Összes munka megtekintése',
    },
    howItWorks: {
      title: 'Hogyan működik',
      description:
        'Mindkét félnek egyszerű. Akár megbízol valakit, akár munkát vállalsz, mi zökkenőmentessé tesszük.',
      steps: [
        {
          step: '01',
          title: 'Közzététel vagy keresés',
          desc: 'Az ügyfelek közzéteszik igényeiket. A munkavállalók a készségeikhez illő munkákat böngészik.',
        },
        {
          step: '02',
          title: 'Kapcsolat és megállapodás',
          desc: 'Biztonságos chat, értékelések ellenőrzése, majd ár és részletek egyeztetése.',
        },
        {
          step: '03',
          title: 'Munka és fizetés',
          desc: 'A munka elkészül. A fizetés biztonságosan felszabadul a teljesítés után.',
        },
      ],
      cta: 'Munka keresése',
    },
    trust: {
      title: 'Románia megbízik bennünk',
      description: 'Csatlakozz több ezer ellenőrzött felhasználóhoz, akik megbíznak a platformunkban.',
    },
    footer: {
      brandDescription:
        'Összekötjük azokat, akik segítségre szorulnak, megbízható helyi szakemberekkel. A legegyszerűbb módja a feladatok elvégzésének Romániában.',
    },
  },
};
