
import React, { useRef, useState } from 'react';
import { ArrowRight, CheckCircle, FileText, UserCheck, Shield } from 'lucide-react';
import type { RegisterRequestDto } from '../api/dto/auth.dto';
import { authService } from '../api/services/auth.service';
import { LanguageLevel, LANGUAGE_LEVEL_LABEL } from '../constants/languageLevels';
import { toApiError } from '../api/errors/ApiError';
import type { SupportedLocale } from '@/i18n/locales';
import { registerTranslations } from '@/i18n/translations/register';

interface RegisterProps {
  onRegisterComplete: () => void;
  onCancel: () => void;
  onLogin: () => void;
  locale: SupportedLocale;
  onLocaleChange: (locale: SupportedLocale) => void;
}

type RegisterRequestDraftDto = Omit<
  RegisterRequestDto,
  'government_id' | 'address' | 'bio' | 'description' | 'skills' | 'languages' | 'profile_picture' | 'cover_picture' | 'resume'
> & {
  government_id: File | null;
  profile_picture: File | null;
  cover_picture: File | null;
  resume: File | null;
  address: string | null;
  bio: string | null;
  description: string | null;
  skills: string[] | null;
  languages: RegisterRequestDto['languages'] | null;
};

type StepOneField =
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'phone'
  | 'password'
  | 'password_confirmation';

const LOCALE_OPTIONS: Array<{ locale: SupportedLocale; flag: string }> = [
  { locale: 'en', flag: '🇬🇧' },
  { locale: 'ro', flag: '🇷🇴' },
  { locale: 'hu', flag: '🇭🇺' },
];

const Register: React.FC<RegisterProps> = ({ onRegisterComplete, onCancel, onLogin, locale, onLocaleChange }) => {
  const rowIdCounterRef = useRef(2);
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [stepOneErrors, setStepOneErrors] = useState<Partial<Record<StepOneField, string>>>({});
  const [languageRowIds, setLanguageRowIds] = useState<string[]>(['lang-0']);
  const [skillRowIds, setSkillRowIds] = useState<string[]>(['skill-1']);
  const t = registerTranslations[locale];
  const [user, setUser] = useState<RegisterRequestDraftDto>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    government_id: null,
    profile_picture: null,
    cover_picture: null,
    resume: null,
    bio: null,
    description: null,
    address: null,
    skills: [''],
    languages: [{ language: '', level: String(LanguageLevel.Beginner) }],
  });

  const nextStep = async () => {
      if (step === 0) {
          const requiredFields: Array<{ key: StepOneField; label: string }> = [
            { key: 'first_name', label: t.fields.firstName },
            { key: 'last_name', label: t.fields.lastName },
            { key: 'email', label: t.fields.emailAddress },
            { key: 'phone', label: t.fields.phoneNumber },
            { key: 'password', label: t.fields.password },
            { key: 'password_confirmation', label: t.fields.confirmPassword },
          ];

          const errors = requiredFields.reduce<Partial<Record<StepOneField, string>>>((acc, field) => {
            if (!user[field.key].trim()) {
              acc[field.key] = `${field.label} ${t.validation.requiredSuffix}`;
            }
            return acc;
          }, {});

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!errors.email && !emailRegex.test(user.email.trim())) {
            errors.email = t.validation.validEmail;
          }

          const phoneRegex = /^\d+$/;
          if (!errors.phone && !phoneRegex.test(user.phone.trim())) {
            errors.phone = t.validation.phoneNumeric;
          }

          if (!errors.password && user.password.length < 8) {
            errors.password = t.validation.passwordMin;
          }

          if (
            !errors.password &&
            !errors.password_confirmation &&
            user.password !== user.password_confirmation
          ) {
            errors.password_confirmation = t.validation.confirmMatch;
          }

          setStepOneErrors(errors);

          if (Object.keys(errors).length > 0) {
            return;
          }
      }

      if (step === 5) {
          setLoading(true);
          setRegisterError(null);
          try {
              if (!user.government_id) {
                throw new Error(t.validation.governmentFileRequired);
              }

              const normalizedLanguages = (user.languages ?? [])
                .map((item) => ({
                  language: item.language.trim(),
                  level: item.level,
                }))
                .filter((item) => item.language.length > 0);

              const normalizedSkills = (user.skills ?? [])
                .map((item) => item.trim())
                .filter((item) => item.length > 0);

              const payload: RegisterRequestDto = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
                password_confirmation: user.password_confirmation,
                phone: user.phone,
                government_id: user.government_id,
                profile_picture: user.profile_picture ?? undefined,
                cover_picture: user.cover_picture ?? undefined,
                resume: user.resume ?? undefined,
                bio: user.bio ?? undefined,
                description: user.description ?? undefined,
                address: user.address ?? undefined,
                skills: normalizedSkills.length > 0 ? normalizedSkills : undefined,
                languages: normalizedLanguages.length > 0 ? normalizedLanguages : undefined,
              };
              await authService.register(payload);
              setRegisterSuccess(true);
          } catch (error) {
              const apiError = toApiError(error);
              setRegisterError(apiError.message);
          } finally {
              setLoading(false);
          }
      } else {
          if (step === 4 && !user.government_id) {
            setRegisterError(t.validation.governmentRequiredBeforeContinue);
            return;
          }
          setStep(prev => prev + 1);
      }
  };

  const skipStep = () => {
      // „Kihagyom”: következő lépés validáció/feltöltés nélkül
      if (step === 5) {
          onRegisterComplete();
      } else if (step === 1) {
          setUser((prev) => ({
            ...prev,
            address: null,
            bio: null,
            description: null,
          }));
          setStep((prev) => prev + 1);
      } else if (step === 2) {
          setUser((prev) => ({
            ...prev,
            languages: null,
            skills: null,
          }));
          setStep((prev) => prev + 1);
      } else if (step === 3) {
          setUser((prev) => ({
            ...prev,
            profile_picture: null,
            cover_picture: null,
          }));
          setStep((prev) => prev + 1);
      } else {
          setStep(prev => prev + 1);
      }
  };

  const prevStep = () => {
      setStep(prev => Math.max(0, prev - 1));
  };

  const addLanguageRow = () => {
      const nextId = `lang-${rowIdCounterRef.current++}`;
      setLanguageRowIds((prev) => [...prev, nextId]);
      setUser((prev) => ({
        ...prev,
        languages: [...(prev.languages ?? []), { language: '', level: String(LanguageLevel.Beginner) }],
      }));
  };

  const addSkillRow = () => {
      const nextId = `skill-${rowIdCounterRef.current++}`;
      setSkillRowIds((prev) => [...prev, nextId]);
      setUser((prev) => ({
        ...prev,
        skills: [...(prev.skills ?? []), ''],
      }));
  };

  const updateSkillRow = (index: number, value: string) => {
      setUser((prev) => ({
        ...prev,
        skills: (prev.skills ?? []).map((item, itemIndex) => (itemIndex === index ? value : item)),
      }));
  };

  const removeSkillRow = (index: number) => {
      setSkillRowIds((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
      setUser((prev) => ({
        ...prev,
        skills: (() => {
          const nextSkills = (prev.skills ?? []).filter((_, itemIndex) => itemIndex !== index);
          return nextSkills.length > 0 ? nextSkills : null;
        })(),
      }));
  };

  const updateLanguageRow = (index: number, field: 'language' | 'level', value: string) => {
      setUser((prev) => ({
        ...prev,
        languages: (prev.languages ?? []).map((item, itemIndex) =>
          itemIndex === index ? { ...item, [field]: value } : item,
        ),
      }));
  };

  const removeLanguageRow = (index: number) => {
      setLanguageRowIds((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
      setUser((prev) => ({
        ...prev,
        languages: (() => {
          const nextLanguages = (prev.languages ?? []).filter((_, itemIndex) => itemIndex !== index);
          return nextLanguages.length > 0 ? nextLanguages : null;
        })(),
      }));
  };

  const inputClassName = (hasError: boolean) =>
    `w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none ${
      hasError ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
    }`;

  const renderStepContent = () => {
      switch(step) {
          case 0:
            return (
                <div className="animate-fadeIn max-w-md mx-auto w-full">
                    <div className="mb-6">
                        <span className="text-green-700 font-bold text-xs uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full mb-4 inline-block">
                            {t.common.stepBadge[0]}
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900">{t.steps.accountDetails.title}</h2>
                        <p className="text-gray-500 mt-2">{t.steps.accountDetails.subtitle}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t.fields.firstName}</label>
                                <input
                                    required
                                    type="text"
                                    value={user.first_name}
                                    onChange={(event) => {
                                      const value = event.target.value;
                                      setUser((prev) => ({ ...prev, first_name: value }));
                                      if (stepOneErrors.first_name && value.trim()) {
                                        setStepOneErrors((prev) => ({ ...prev, first_name: undefined }));
                                      }
                                    }}
                                    className={inputClassName(Boolean(stepOneErrors.first_name))}
                                />
                                {stepOneErrors.first_name && <p className="mt-1 text-sm text-red-600">{stepOneErrors.first_name}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t.fields.lastName}</label>
                                <input
                                    required
                                    type="text"
                                    value={user.last_name}
                                    onChange={(event) => {
                                      const value = event.target.value;
                                      setUser((prev) => ({ ...prev, last_name: value }));
                                      if (stepOneErrors.last_name && value.trim()) {
                                        setStepOneErrors((prev) => ({ ...prev, last_name: undefined }));
                                      }
                                    }}
                                    className={inputClassName(Boolean(stepOneErrors.last_name))}
                                />
                                {stepOneErrors.last_name && <p className="mt-1 text-sm text-red-600">{stepOneErrors.last_name}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t.fields.emailAddress}</label>
                            <input
                                required
                                type="email"
                                value={user.email}
                                onChange={(event) => {
                                  const value = event.target.value;
                                  setUser((prev) => ({ ...prev, email: value }));
                                  if (stepOneErrors.email && value.trim()) {
                                    setStepOneErrors((prev) => ({ ...prev, email: undefined }));
                                  }
                                }}
                                className={inputClassName(Boolean(stepOneErrors.email))}
                            />
                            {stepOneErrors.email && <p className="mt-1 text-sm text-red-600">{stepOneErrors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t.fields.phoneNumber}</label>
                            <input
                                required
                                type="tel"
                                value={user.phone}
                                onChange={(event) => {
                                  const value = event.target.value;
                                  setUser((prev) => ({ ...prev, phone: value }));
                                  if (stepOneErrors.phone && value.trim()) {
                                    setStepOneErrors((prev) => ({ ...prev, phone: undefined }));
                                  }
                                }}
                                className={inputClassName(Boolean(stepOneErrors.phone))}
                            />
                            {stepOneErrors.phone && <p className="mt-1 text-sm text-red-600">{stepOneErrors.phone}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t.fields.password}</label>
                            <input
                                required
                                type="password"
                                value={user.password}
                                onChange={(event) => {
                                  const value = event.target.value;
                                  setUser((prev) => ({ ...prev, password: value }));
                                  if (stepOneErrors.password && value.trim()) {
                                    setStepOneErrors((prev) => ({ ...prev, password: undefined }));
                                  }
                                }}
                                className={inputClassName(Boolean(stepOneErrors.password))}
                            />
                            {stepOneErrors.password && <p className="mt-1 text-sm text-red-600">{stepOneErrors.password}</p>}
                        </div>
                         <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t.fields.confirmPassword}</label>
                            <input
                                required
                                type="password"
                                value={user.password_confirmation}
                                onChange={(event) => {
                                  const value = event.target.value;
                                  setUser((prev) => ({ ...prev, password_confirmation: value }));
                                  if (stepOneErrors.password_confirmation && value.trim()) {
                                    setStepOneErrors((prev) => ({ ...prev, password_confirmation: undefined }));
                                  }
                                }}
                                className={inputClassName(Boolean(stepOneErrors.password_confirmation))}
                            />
                            {stepOneErrors.password_confirmation && <p className="mt-1 text-sm text-red-600">{stepOneErrors.password_confirmation}</p>}
                        </div>
                    </div>
                </div>
            );

          case 1:
            return (
                <div className="animate-fadeIn max-w-md mx-auto w-full">
                     <div className="mb-6">
                        <span className="text-green-700 font-bold text-xs uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full mb-4 inline-block">
                            {t.common.stepBadge[1]}
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900">{t.steps.profileDetails.title}</h2>
                        <p className="text-gray-500 mt-2">{t.steps.profileDetails.subtitle}</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t.fields.address}</label>
                            <input
                                type="text"
                                value={user.address ?? ''}
                                onChange={(event) => {
                                  const value = event.target.value;
                                  setUser((prev) => ({ ...prev, address: value === '' ? null : value }));
                                }}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t.fields.bio}</label>
                            <input
                                type="text"
                                value={user.bio ?? ''}
                                onChange={(event) => {
                                  const value = event.target.value;
                                  setUser((prev) => ({ ...prev, bio: value === '' ? null : value }));
                                }}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t.fields.description}</label>
                            <textarea
                                rows={5}
                                value={user.description ?? ''}
                                onChange={(event) => {
                                  const value = event.target.value;
                                  setUser((prev) => ({ ...prev, description: value === '' ? null : value }));
                                }}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 resize-y"
                            />
                        </div>
                    </div>
                </div>
            );

          case 2:
            return (
                <div className="animate-fadeIn max-w-md mx-auto w-full">
                     <div className="mb-6">
                        <span className="text-green-700 font-bold text-xs uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full mb-4 inline-block">
                            {t.common.stepBadge[2]}
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900">{t.steps.languagesSkills.title}</h2>
                        <p className="text-gray-500 mt-2">{t.steps.languagesSkills.subtitle}</p>
                    </div>

                    <div className="space-y-4">
                        {(user.languages ?? []).map((languageItem, index) => (
                            <div key={languageRowIds[index] ?? `lang-fallback-${index}`} className="grid grid-cols-[1fr_1fr_auto] gap-4 items-end">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t.fields.language}</label>
                                    <input
                                        type="text"
                                        value={languageItem.language}
                                        onChange={(event) => updateLanguageRow(index, 'language', event.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t.fields.level}</label>
                                    <select
                                        value={languageItem.level}
                                        onChange={(event) => updateLanguageRow(index, 'level', event.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
                                    >
                                        {Object.values(LanguageLevel)
                                          .filter((value): value is LanguageLevel => typeof value === 'number')
                                          .map((value) => (
                                            <option key={value} value={String(value)}>
                                                {LANGUAGE_LEVEL_LABEL[value]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeLanguageRow(index)}
                                    className="h-[46px] px-4 rounded-xl border border-gray-200 text-gray-500 font-bold hover:text-gray-700 hover:border-gray-300"
                                >
                                    -
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addLanguageRow}
                            className="text-sm font-bold text-green-700 hover:text-green-800"
                        >
                            {t.steps.languagesSkills.addLanguage}
                        </button>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t.fields.skills}</label>
                            {(user.skills ?? []).map((skill, index) => (
                                <div key={skillRowIds[index] ?? `skill-fallback-${index}`} className="grid grid-cols-[1fr_auto] gap-4 items-end">
                                    <input
                                        type="text"
                                        value={skill}
                                        onChange={(event) => updateSkillRow(index, event.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSkillRow(index)}
                                        className="h-[46px] px-4 rounded-xl border border-gray-200 text-gray-500 font-bold hover:text-gray-700 hover:border-gray-300"
                                    >
                                        -
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addSkillRow}
                                className="text-sm font-bold text-green-700 hover:text-green-800"
                            >
                                {t.steps.languagesSkills.addSkill}
                            </button>
                        </div>
                    </div>
                </div>
            );

          case 3:
            return (
                <div className="animate-fadeIn max-w-md mx-auto w-full">
                     <div className="mb-6">
                        <span className="text-green-700 font-bold text-xs uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full mb-4 inline-block">
                            {t.common.stepBadge[3]}
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900">{t.steps.uploadPictures.title}</h2>
                        <p className="text-gray-500 mt-2">{t.steps.uploadPictures.subtitle}</p>
                    </div>

                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-500 hover:bg-green-50/50 transition cursor-pointer">
                            <h3 className="font-bold text-gray-900">{t.steps.uploadPictures.profilePicture}</h3>
                            <p className="text-sm text-gray-500 mt-2">{t.common.fileTypesImages}</p>
                            <label className="mt-4 inline-block text-sm font-bold text-green-700 cursor-pointer">
                                {t.common.browseFiles}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(event) => {
                                      const file = event.target.files?.[0] ?? null;
                                      setUser((prev) => ({ ...prev, profile_picture: file }));
                                    }}
                                />
                            </label>
                            {user.profile_picture && <p className="text-xs text-gray-500 mt-2">{user.profile_picture.name}</p>}
                        </div>
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-500 hover:bg-green-50/50 transition cursor-pointer">
                            <h3 className="font-bold text-gray-900">{t.steps.uploadPictures.coverPicture}</h3>
                            <p className="text-sm text-gray-500 mt-2">{t.common.fileTypesImages}</p>
                            <label className="mt-4 inline-block text-sm font-bold text-green-700 cursor-pointer">
                                {t.common.browseFiles}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(event) => {
                                      const file = event.target.files?.[0] ?? null;
                                      setUser((prev) => ({ ...prev, cover_picture: file }));
                                    }}
                                />
                            </label>
                            {user.cover_picture && <p className="text-xs text-gray-500 mt-2">{user.cover_picture.name}</p>}
                        </div>
                    </div>
                </div>
            );

          case 4:
            return (
                <div className="animate-fadeIn max-w-md mx-auto w-full">
                     <div className="mb-6">
                        <span className="text-green-700 font-bold text-xs uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full mb-4 inline-block">
                            {t.common.stepBadge[4]}
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900">{t.steps.verifyIdentity.title}</h2>
                        <p className="text-gray-500 mt-2">{t.steps.verifyIdentity.subtitle}</p>
                    </div>

                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-500 hover:bg-green-50/50 transition cursor-pointer">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserCheck size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900">{t.steps.verifyIdentity.uploadGovernmentId}</h3>
                            <p className="text-sm text-gray-500 mt-2">{t.steps.verifyIdentity.governmentIdHint}</p>
                            <label className="mt-4 inline-block text-sm font-bold text-green-700 cursor-pointer">
                                {t.common.browseFiles}
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(event) => {
                                      const file = event.target.files?.[0] ?? null;
                                      setUser((prev) => ({ ...prev, government_id: file }));
                                    }}
                                />
                            </label>
                            {user.government_id && <p className="text-xs text-gray-500 mt-2">{user.government_id.name}</p>}
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-blue-800 text-sm">
                            <Shield className="flex-shrink-0" size={20} />
                            <p>{t.steps.verifyIdentity.securityInfo}</p>
                        </div>
                    </div>
                </div>
            );

        case 5:
             return (
                <div className="animate-fadeIn max-w-md mx-auto w-full">
                     <div className="mb-6">
                        <span className="text-green-700 font-bold text-xs uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full mb-4 inline-block">
                            {t.common.stepBadge[5]}
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900">{t.steps.finishProfile.title}</h2>
                        <p className="text-gray-500 mt-2">{t.steps.finishProfile.subtitle}</p>
                    </div>

                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-500 hover:bg-green-50/50 transition cursor-pointer">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900">{t.steps.finishProfile.uploadResume}</h3>
                            <p className="text-sm text-gray-500 mt-2">{t.steps.finishProfile.resumeHint}</p>
                            <label className="mt-4 inline-block text-sm font-bold text-green-700 cursor-pointer">
                                {t.common.browseFiles}
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={(event) => {
                                      const file = event.target.files?.[0] ?? null;
                                      setUser((prev) => ({ ...prev, resume: file }));
                                    }}
                                />
                            </label>
                            {user.resume && <p className="text-xs text-gray-500 mt-2">{user.resume.name}</p>}
                        </div>
                    </div>
                </div>
            );

          default:
            return null;
      }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
       <nav className="p-6 border-b border-gray-100 flex items-center justify-between">
           <div className="flex items-center gap-2 cursor-pointer" onClick={onCancel}>
                <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <span className="font-bold text-xl text-gray-900 tracking-tight">Task<span className="text-green-700">Hub</span></span>
                <select
                  value={locale}
                  onClick={(event) => event.stopPropagation()}
                  onChange={(event) => onLocaleChange(event.target.value as SupportedLocale)}
                  className="text-lg font-bold border border-gray-200 rounded-lg bg-white px-2 py-1 leading-none text-gray-700"
                  aria-label="Select language"
                >
                  {LOCALE_OPTIONS.map((option) => (
                    <option key={option.locale} value={option.locale}>
                      {option.flag}
                    </option>
                  ))}
                </select>
            </div>
            <div className="text-sm font-medium text-gray-500">
                <span className="hidden md:inline">{t.nav.alreadyHaveAccount} </span>
                <span className="text-green-700 font-bold cursor-pointer" onClick={onLogin}>{t.nav.logIn}</span>
            </div>
       </nav>

       <div className="flex-1 flex items-center justify-center p-4">
           <div className="max-w-4xl w-full">
               {registerSuccess ? (
                   <div className="max-w-md mx-auto text-center animate-fadeIn">
                       <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                           <CheckCircle size={64} className="text-green-600" />
                       </div>
                       <h2 className="text-3xl font-extrabold text-gray-900">{t.success.title}</h2>
                       <p className="text-gray-500 mt-3">
                           {t.success.line1}
                       </p>
                       <p className="text-gray-500 mt-2">
                           {t.success.line2}
                       </p>
                       <button
                           onClick={onRegisterComplete}
                           className="mt-8 bg-green-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-900/20"
                       >
                           {t.success.continue}
                       </button>
                   </div>
               ) : (
                   <>
                       {renderStepContent()}
                       <div className="max-w-md mx-auto mt-8 flex justify-between items-center pt-6 border-t border-gray-100">
                            {step > 0 ? (
                                <button
                                    onClick={prevStep}
                                    className="text-gray-500 font-bold text-sm hover:text-gray-900 px-4 py-2"
                                >
                                    {t.common.back}
                                </button>
                            ) : (
                                <div />
                            )}

                            <div className="flex items-center gap-3">
                                {(step === 1 || step === 2 || step === 3) && (
                                    <button
                                        onClick={skipStep}
                                        className="text-gray-400 font-bold text-sm hover:text-gray-600 px-4 py-2"
                                    >
                                        {t.common.skipForNow}
                                    </button>
                                )}

                                <button
                                    onClick={nextStep}
                                    disabled={loading}
                                    className="bg-green-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-900/20 flex items-center gap-2"
                                >
                                    {loading ? t.common.creatingAccount : (step === 5 ? t.common.createAccount : t.common.nextStep)}
                                    {!loading && step < 5 && <ArrowRight size={18} />}
                                </button>
                            </div>
                       </div>
                       {registerError && (
                           <p className="max-w-md mx-auto mt-4 text-sm text-red-600">{registerError}</p>
                       )}
                   </>
               )}
           </div>
       </div>
    </div>
  );
};

export default Register;
