
import React, { useRef, useState } from 'react';
import { ArrowRight, CheckCircle, FileText, UserCheck, Shield } from 'lucide-react';
import type { RegisterRequestDto } from '../api/dto/auth.dto';
import { authService } from '../api/services/auth.service';
import { LanguageLevel, LANGUAGE_LEVEL_LABEL } from '../constants/languageLevels';
import { toApiError } from '../api/errors/ApiError';

interface RegisterProps {
  onRegisterComplete: () => void;
  onCancel: () => void;
  onLogin: () => void;
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

const Register: React.FC<RegisterProps> = ({ onRegisterComplete, onCancel, onLogin }) => {
  const rowIdCounterRef = useRef(2);
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [stepOneErrors, setStepOneErrors] = useState<Partial<Record<StepOneField, string>>>({});
  const [languageRowIds, setLanguageRowIds] = useState<string[]>(['lang-0']);
  const [skillRowIds, setSkillRowIds] = useState<string[]>(['skill-1']);
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
            { key: 'first_name', label: 'First Name' },
            { key: 'last_name', label: 'Last Name' },
            { key: 'email', label: 'Email Address' },
            { key: 'phone', label: 'Phone Number' },
            { key: 'password', label: 'Password' },
            { key: 'password_confirmation', label: 'Confirm Password' },
          ];

          const errors = requiredFields.reduce<Partial<Record<StepOneField, string>>>((acc, field) => {
            if (!user[field.key].trim()) {
              acc[field.key] = `${field.label} is required!`;
            }
            return acc;
          }, {});

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!errors.email && !emailRegex.test(user.email.trim())) {
            errors.email = 'Email Address must be a valid email format!';
          }

          const phoneRegex = /^\d+$/;
          if (!errors.phone && !phoneRegex.test(user.phone.trim())) {
            errors.phone = 'Phone Number must be numeric!';
          }

          if (!errors.password && user.password.length < 8) {
            errors.password = 'Password must be at least 8 characters!';
          }

          if (
            !errors.password &&
            !errors.password_confirmation &&
            user.password !== user.password_confirmation
          ) {
            errors.password_confirmation = 'Confirm Password must match Password!';
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
                throw new Error('Government ID file is required.');
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
            setRegisterError('Government ID is required before continuing.');
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
                            Step 1 of 6
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900">Account Details</h2>
                        <p className="text-gray-500 mt-2">Let's start with the basics.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">First Name</label>
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
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Last Name</label>
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
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
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
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Phone Number</label>
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
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Password</label>
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
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Confirm Password</label>
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
                            Step 2 of 6
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900">Profile Details</h2>
                        <p className="text-gray-500 mt-2">Tell us a bit more about yourself.</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Address</label>
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
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Bio</label>
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
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Description</label>
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
                            Step 3 of 6
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900">Languages and Skills</h2>
                        <p className="text-gray-500 mt-2">Add your language level and core skills.</p>
                    </div>

                    <div className="space-y-4">
                        {(user.languages ?? []).map((languageItem, index) => (
                            <div key={languageRowIds[index] ?? `lang-fallback-${index}`} className="grid grid-cols-[1fr_1fr_auto] gap-4 items-end">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Language</label>
                                    <input
                                        type="text"
                                        value={languageItem.language}
                                        onChange={(event) => updateLanguageRow(index, 'language', event.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Level</label>
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
                            + Add language
                        </button>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Skills</label>
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
                                + Add skill
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
                            Step 4 of 6
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900">Upload Pictures</h2>
                        <p className="text-gray-500 mt-2">Add your profile and cover images.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-500 hover:bg-green-50/50 transition cursor-pointer">
                            <h3 className="font-bold text-gray-900">Upload Profile Picture</h3>
                            <p className="text-sm text-gray-500 mt-2">JPG, PNG or WEBP</p>
                            <label className="mt-4 inline-block text-sm font-bold text-green-700 cursor-pointer">
                                Browse Files
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
                            <h3 className="font-bold text-gray-900">Upload Cover Picture</h3>
                            <p className="text-sm text-gray-500 mt-2">JPG, PNG or WEBP</p>
                            <label className="mt-4 inline-block text-sm font-bold text-green-700 cursor-pointer">
                                Browse Files
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
                            Step 5 of 6
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900">Verify Identity</h2>
                        <p className="text-gray-500 mt-2">We require ID verification to ensure safety for all users.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-500 hover:bg-green-50/50 transition cursor-pointer">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserCheck size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900">Upload Government ID</h3>
                            <p className="text-sm text-gray-500 mt-2">Passport, Driver's License, or National ID</p>
                            <label className="mt-4 inline-block text-sm font-bold text-green-700 cursor-pointer">
                                Browse Files
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
                            <p>Your data is encrypted and securely stored. We only use this for identity verification purposes.</p>
                        </div>
                    </div>
                </div>
            );

        case 5:
             return (
                <div className="animate-fadeIn max-w-md mx-auto w-full">
                     <div className="mb-6">
                        <span className="text-green-700 font-bold text-xs uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full mb-4 inline-block">
                            Step 6 of 6
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900">Finish Profile</h2>
                        <p className="text-gray-500 mt-2">Upload your CV to stand out (Optional).</p>
                    </div>

                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-500 hover:bg-green-50/50 transition cursor-pointer">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900">Upload CV / Resume</h3>
                            <p className="text-sm text-gray-500 mt-2">PDF, DOCX up to 5MB</p>
                            <label className="mt-4 inline-block text-sm font-bold text-green-700 cursor-pointer">
                                Browse Files
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
            </div>
            <div className="text-sm font-medium text-gray-500">
                <span className="hidden md:inline">Already have an account? </span>
                <span className="text-green-700 font-bold cursor-pointer" onClick={onLogin}>Log In</span>
            </div>
       </nav>

       <div className="flex-1 flex items-center justify-center p-4">
           <div className="max-w-4xl w-full">
               {registerSuccess ? (
                   <div className="max-w-md mx-auto text-center animate-fadeIn">
                       <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                           <CheckCircle size={64} className="text-green-600" />
                       </div>
                       <h2 className="text-3xl font-extrabold text-gray-900">Registration Successful</h2>
                       <p className="text-gray-500 mt-3">
                           Your account was created successfully.
                       </p>
                       <p className="text-gray-500 mt-2">
                           You will receive a confirmation email shortly.
                       </p>
                       <button
                           onClick={onRegisterComplete}
                           className="mt-8 bg-green-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-900/20"
                       >
                           Continue
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
                                    Back
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
                                        Skip for now
                                    </button>
                                )}

                                <button
                                    onClick={nextStep}
                                    disabled={loading}
                                    className="bg-green-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-900/20 flex items-center gap-2"
                                >
                                    {loading ? 'Creating Account...' : (step === 5 ? 'Create Account' : 'Next Step')}
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
