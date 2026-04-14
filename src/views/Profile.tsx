import React, { useEffect, useState } from 'react';
import { Camera, MapPin, Star, ShieldCheck, CheckCircle, Clock, Briefcase, Languages, ThumbsUp, Calendar, Mail, Phone, Globe, Edit3, Share2 } from 'lucide-react';
import type { MeResponseDto } from '@/api/dto/user.dto';
import { useNavigate } from 'react-router-dom';
import {
  LANGUAGE_LEVEL_COLOR,
  LANGUAGE_LEVEL_LABEL,
  LanguageLevel,
  normalizeLanguageLevel,
} from '../constants/languageLevels';
import { userService } from '@/api/services/user.service';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');
  const [currentUser, setCurrentUser] = useState<MeResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const response = await userService.me();

        if (!isMounted) {
          return;
        }

        setCurrentUser(response);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : 'Failed to load profile data.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const env = ((import.meta as ImportMeta & { env?: Record<string, string | boolean | undefined> }).env ?? {}) as Record<string, string | boolean | undefined>;
  const imageBaseUrl = (typeof env.VITE_API_IMAGE_URL === 'string' ? env.VITE_API_IMAGE_URL : '').trim().replace(/\/+$/, '');
  const defaultProfileImage = (typeof env.VITE_DEFAULT_PROFILE_IMAGE === 'string' ? env.VITE_DEFAULT_PROFILE_IMAGE : '').trim().replace(/\/+$/, '');
  const profilePicturePath = currentUser?.profile_picture?.trim();
  const coverPicturePath = currentUser?.cover_picture?.trim();
  const isAbsoluteProfileUrl = Boolean(profilePicturePath?.match(/^https?:\/\//i));
  const isAbsoluteCoverUrl = Boolean(coverPicturePath?.match(/^https?:\/\//i));
  const profileImage = profilePicturePath
    ? (isAbsoluteProfileUrl ? profilePicturePath : `${imageBaseUrl}/${profilePicturePath.replace(/^\/+/, '')}`)
    : `${imageBaseUrl}/${defaultProfileImage}`;
  const coverImage = coverPicturePath
    ? (isAbsoluteCoverUrl ? coverPicturePath : `${imageBaseUrl}/${coverPicturePath.replace(/^\/+/, '')}`)
    : null;
  const displayName = currentUser?.name ?? currentUser?.username;
  const displayEmail = currentUser?.email;
  const joinedAtLabel = (() => {
    const raw = currentUser?.created_at;
    if (!raw) {
      return 'Joined recently';
    }
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) {
      return 'Joined recently';
    }

    const formatted = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(date);

    return `Joined ${formatted}`;
  })();

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-gray-600 font-medium">
          Loading profile...
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700 font-medium">
          {errorMessage}
        </div>
      </div>
    );
  }

  if (!currentUser || !displayName || !displayEmail) {
    return (
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-gray-600 font-medium">
          Profile data is unavailable. Please refresh the page.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto animate-fadeIn min-h-screen">
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden mb-6 relative group">
          <div className="h-56 md:h-80 bg-gradient-to-r from-gray-900 to-gray-800 relative">
             <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
             {coverImage && <img src={coverImage} className="w-full h-full object-cover opacity-40" />}
             <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition opacity-0 group-hover:opacity-100">
                 <Camera size={16}/> Edit Cover
             </button>
          </div>

          <div className="px-6 md:px-10 pb-8 relative">
              <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative group/avatar -mt-16 md:-mt-20 flex-shrink-0 z-10">
                      <div className="p-1.5 bg-white rounded-[2rem] shadow-sm">
                        <img src={profileImage} className="w-32 h-32 md:w-40 md:h-40 rounded-[1.8rem] object-cover border border-gray-100 shadow-inner" />
                      </div>
                      <div className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full border-4 border-white shadow-sm" title="Identity Verified">
                          <ShieldCheck size={20} fill="currentColor" />
                      </div>
                      <div className="absolute inset-0 bg-black/40 rounded-[2rem] m-1.5 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition cursor-pointer">
                          <Camera size={24} className="text-white"/>
                      </div>
                  </div>

                  <div className="flex-1 w-full md:w-auto pt-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                              <div className="flex flex-wrap items-center gap-3 mb-1">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                                    {displayName}
                                </h1>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 border whitespace-nowrap ${
                                    currentUser.is_verified
                                      ? 'bg-green-100 text-green-700 border-green-200'
                                      : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                  }`}
                                >
                                    <CheckCircle
                                      size={12}
                                      fill="currentColor"
                                      className={currentUser.is_verified ? 'text-green-500' : 'text-yellow-500'}
                                    />
                                    {currentUser.is_verified ? 'Verified Pro' : 'Verification needed'}
                                </span>
                              </div>

                              <p className="text-gray-500 font-medium text-lg">{currentUser.bio}</p>

                              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 font-bold">
                                  <span className="flex items-center gap-1.5"><MapPin size={16} className="text-gray-400"/> {currentUser.address}</span>
                                  <span className="hidden md:inline text-gray-300">|</span>
                                  <span className="flex items-center gap-1.5"><Calendar size={16} className="text-gray-400"/> {joinedAtLabel}</span>
                                  <span className="hidden md:inline text-gray-300">|</span>
                                  <span className={`flex items-center gap-1.5 ${currentUser.is_verified ? 'text-green-600' : 'text-yellow-700'}`}>
                                    <div className={`w-2 h-2 rounded-full animate-pulse ${currentUser.is_verified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    {currentUser.is_verified ? 'Available for work' : 'Verification needed'}
                                  </span>
                              </div>
                          </div>

                          <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                              <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm flex items-center justify-center gap-2">
                                  <Share2 size={18}/> Share
                              </button>
                              <button
                                onClick={() => navigate('/dashboard/settings')}
                                className="flex-1 md:flex-none px-6 py-3 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
                              >
                                  <Edit3 size={18} /> Edit Profile
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="xl:col-span-2 space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-row items-center gap-4 hover:border-green-200 transition-colors">
                      <div className="text-yellow-600 flex-shrink-0">
                          <Star size={28} fill="currentColor"/>
                      </div>
                      <div>
                          <span className="block text-2xl font-extrabold text-gray-900 leading-none">4.9</span>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rating (24)</span>
                      </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-row items-center gap-4 hover:border-green-200 transition-colors">
                      <div className="text-blue-600 flex-shrink-0">
                          <Briefcase size={28}/>
                      </div>
                      <div>
                          <span className="block text-2xl font-extrabold text-gray-900 leading-none">142</span>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Jobs Done</span>
                      </div>
                  </div>
                  {/* <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-row items-center gap-4 hover:border-green-200 transition-colors">
                      <div className="text-green-600 flex-shrink-0">
                          <ThumbsUp size={28}/>
                      </div>
                      <div>
                          <span className="block text-2xl font-extrabold text-gray-900 leading-none">98%</span>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Success Rate</span>
                      </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-row items-center gap-4 hover:border-green-200 transition-colors">
                      <div className="text-purple-600 flex-shrink-0">
                          <Clock size={28}/>
                      </div>
                      <div>
                          <span className="block text-2xl font-extrabold text-gray-900 leading-none">1h</span>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Response Time</span>
                      </div>
                  </div> */}
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide">
                      {[
                          { id: 'overview', label: 'Overview' },
                          { id: 'reviews', label: 'Reviews' }
                      ].map((tab: any) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 min-w-[120px] px-6 py-4 font-bold text-sm border-b-2 transition-colors flex items-center justify-center gap-2 ${
                                activeTab === tab.id
                                ? 'border-green-700 text-green-700 bg-green-50/30'
                                : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                              {tab.label}
                          </button>
                      ))}
                  </div>

                  <div className="p-6 md:p-8 min-h-[400px]">
                      {activeTab === 'overview' && (
                          <div className="space-y-8 animate-fadeIn">
                              <div>
                                  <h3 className="text-lg font-bold text-gray-900 mb-4">About Me</h3>
                                  <p className="text-gray-600 leading-relaxed text-base">
                                      {currentUser.description}
                                  </p>
                              </div>

                              {/* <div>
                                  <h3 className="text-lg font-bold text-gray-900 mb-4">Why Hire Me?</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                                          <CheckCircle className="text-green-600 mt-0.5" size={20}/>
                                          <div>
                                              <h4 className="font-bold text-gray-900 text-sm">Professional Tools</h4>
                                              <p className="text-xs text-gray-500 mt-1">Equipped with high-end drills, levels, and specialized bits.</p>
                                          </div>
                                      </div>
                                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                                          <CheckCircle className="text-green-600 mt-0.5" size={20}/>
                                          <div>
                                              <h4 className="font-bold text-gray-900 text-sm">Punctual & Reliable</h4>
                                              <p className="text-xs text-gray-500 mt-1">I value your time and always arrive as scheduled.</p>
                                          </div>
                                      </div>
                                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                                          <CheckCircle className="text-green-600 mt-0.5" size={20}/>
                                          <div>
                                              <h4 className="font-bold text-gray-900 text-sm">100% Guarantee</h4>
                                              <p className="text-xs text-gray-500 mt-1">If something isn't right, I'll fix it for free.</p>
                                          </div>
                                      </div>
                                  </div>
                              </div> */}
                          </div>
                      )}

                      {activeTab === 'reviews' && (
                          <div className="space-y-6 animate-fadeIn">
                              {[1, 2, 3].map((i) => (
                                  <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                      <div className="flex justify-between items-start mb-2">
                                          <div className="flex items-center gap-3">
                                              <img src={`https://i.pravatar.cc/150?img=${i + 20}`} className="w-10 h-10 rounded-full bg-gray-200 object-cover" />
                                              <div>
                                                  <h4 className="font-bold text-gray-900 text-sm">Client Name {i}</h4>
                                                  <p className="text-xs text-gray-400">2 weeks ago</p>
                                              </div>
                                          </div>
                                          <div className="flex text-yellow-400">
                                              {[...Array(5)].map((_, idx) => <Star key={idx} size={14} fill="currentColor"/>)}
                                          </div>
                                      </div>
                                      <p className="text-gray-600 text-sm leading-relaxed mt-2 bg-gray-50 p-4 rounded-xl rounded-tl-none">
                                          "Alexandru did an amazing job! He was punctual, polite, and finished the assembly much faster than I expected. Highly recommended!"
                                      </p>
                                  </div>
                              ))}
                              <button className="w-full py-3 border border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition">Show More Reviews</button>
                          </div>
                      )}
                  </div>
              </div>
          </div>

          <div className="space-y-6">

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">Contact Information</h3>
                  <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><Mail size={16}/></div>
                          <span>{displayEmail}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><Phone size={16}/></div>
                          <span>{currentUser.phone}</span>
                      </div>
                  </div>
                  <button className="w-full bg-green-700 text-white py-3 rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-900/10">
                      Message Me
                  </button>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                      {currentUser?.skills?.map(skill => (
                          <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200">
                              {skill}
                          </span>
                      ))}
                  </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2"><Languages size={20}/> Languages</h3>
                  <div className="space-y-3">
                    {currentUser.languages && currentUser.languages.length > 0 ? (
                      currentUser.languages.map((item) => {
                        const level = normalizeLanguageLevel(item.level);
                        const levelLabel = LANGUAGE_LEVEL_LABEL[level];
                        const levelColor = LANGUAGE_LEVEL_COLOR[level];
                        const widthPercent = (level / LanguageLevel.Native) * 100;

                        return (
                          <div key={`${item.language}-${item.level}`} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold text-gray-700">{item.language}</span>
                              <span className={`text-xs font-bold px-2 py-1 rounded ${levelColor.badge}`}>
                                {levelLabel}
                              </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div
                                className={`${levelColor.bar} h-1.5 rounded-full`}
                                style={{ width: `${widthPercent}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm text-gray-500 font-medium">No languages added yet.</p>
                    )}
                  </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                   <h3 className="font-bold text-gray-900 text-lg mb-4">Verifications</h3>
                   <div className="space-y-3">
                      <div className={`flex items-center gap-3 text-sm text-gray-700`}>
                          {currentUser.is_verified ? (
                            <CheckCircle size={18} className="text-green-600" />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-700 flex items-center justify-center text-xs font-extrabold">
                              !
                            </div>
                          )}
                          {currentUser.is_verified ? 'ID Verified' : 'ID verification needed'}
                      </div>
                      <div className={`flex items-center gap-3 text-sm text-gray-700`}>
                          {currentUser.email_verified_at ? (
                            <CheckCircle size={18} className="text-green-600" />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-700 flex items-center justify-center text-xs font-extrabold">
                              !
                            </div>
                          )}
                          {currentUser.email_verified_at ? 'Email Verified' : 'Email verification needed'}
                      </div>
                   </div>
               </div>

          </div>
      </div>
    </div>
  );
};

export default Profile;
