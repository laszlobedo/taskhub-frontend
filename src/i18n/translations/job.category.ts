export const JOB_CATEGORY_SLUGS = [
  'home_repairs',
  'cleaning',
  'moving',
  'gardening',
  'web_design',
  'translation',
  'virtual_assistant',
  'digital_marketing',
] as const;

export type JobCategorySlug = (typeof JOB_CATEGORY_SLUGS)[number];
export type JobCategoryLocale = 'en' | 'ro' | 'hu';

type JobCategoryTranslation = {
  label: string;
  description: string;
};

export const jobCategoryTranslations: Record<
  JobCategoryLocale,
  Record<JobCategorySlug, JobCategoryTranslation>
> = {
  en: {
    home_repairs: { label: 'Home Repairs', description: 'Plumbing, electrical, and general fixes.' },
    cleaning: { label: 'Cleaning', description: 'Apartment and deep cleaning services.' },
    moving: { label: 'Moving', description: 'Heavy lifting and furniture transport.' },
    gardening: { label: 'Gardening', description: 'Lawn care, planting, and maintenance.' },
    web_design: { label: 'Web Design', description: 'Websites, UI/UX, and graphic design.' },
    translation: { label: 'Translation', description: 'Professional document translation.' },
    virtual_assistant: { label: 'Virtual Assistant', description: 'Admin support and data entry.' },
    digital_marketing: { label: 'Digital Marketing', description: 'SEO, social media, and ads.' },
  },
  ro: {
    home_repairs: { label: 'Reparații locuință', description: 'Instalații sanitare, electrice și reparații generale.' },
    cleaning: { label: 'Curățenie', description: 'Servicii de curățenie pentru apartamente și curățenie în profunzime.' },
    moving: { label: 'Mutări', description: 'Ridicare greutăți și transport mobilier.' },
    gardening: { label: 'Grădinărit', description: 'Îngrijirea gazonului, plantare și mentenanță.' },
    web_design: { label: 'Web design', description: 'Website-uri, UI/UX și design grafic.' },
    translation: { label: 'Traduceri', description: 'Traduceri profesionale de documente.' },
    virtual_assistant: { label: 'Asistent virtual', description: 'Suport administrativ și introducere de date.' },
    digital_marketing: { label: 'Marketing digital', description: 'SEO, social media și reclame.' },
  },
  hu: {
    home_repairs: { label: 'Otthoni javítások', description: 'Víz-, villany- és általános javítási munkák.' },
    cleaning: { label: 'Takarítás', description: 'Lakástakarítás és nagytakarítási szolgáltatások.' },
    moving: { label: 'Költöztetés', description: 'Nehéz tárgyak emelése és bútorszállítás.' },
    gardening: { label: 'Kertészkedés', description: 'Fűápolás, ültetés és karbantartás.' },
    web_design: { label: 'Web design', description: 'Weboldalak, UI/UX és grafikai tervezés.' },
    translation: { label: 'Fordítás', description: 'Professzionális dokumentumfordítás.' },
    virtual_assistant: { label: 'Virtuális asszisztens', description: 'Adminisztratív támogatás és adatbevitel.' },
    digital_marketing: { label: 'Digitális marketing', description: 'SEO, közösségi média és hirdetések.' },
  },
};
