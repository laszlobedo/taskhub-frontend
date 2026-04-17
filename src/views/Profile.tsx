import React, { useEffect, useRef, useState } from 'react';
import { Camera, MapPin, Star, ShieldCheck, CheckCircle, Clock, Briefcase, Languages, ThumbsUp, Calendar, Mail, Phone, Globe, Edit3, Share2, ClipboardList, Megaphone } from 'lucide-react';
import type { DetailedUserDto } from '@/api/dto/user.dto';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  LANGUAGE_LEVEL_COLOR,
  getLanguageLevelLabel,
  LanguageLevel,
  normalizeLanguageLevel,
} from '../constants/languageLevels';
import { userService } from '@/api/services/user.service';
import type { SupportedLocale } from '@/i18n/locales';
import { profileTranslations } from '@/i18n/translations/profile';

interface ProfileProps {
  locale: SupportedLocale;
}

const Profile: React.FC<ProfileProps> = ({ locale }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'given-reviews'>('overview');
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isCoverMenuOpen, setIsCoverMenuOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [viewerImageSrc, setViewerImageSrc] = useState<string | null>(null);
  const [viewerImageAlt, setViewerImageAlt] = useState('Profile image');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showAllGivenReviews, setShowAllGivenReviews] = useState(false);
  const avatarMenuRef = useRef<HTMLDivElement | null>(null);
  const coverMenuRef = useRef<HTMLDivElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const profileInputRef = useRef<HTMLInputElement | null>(null);
  const t = profileTranslations[locale];

  const {
    data: currentUser,
    isLoading,
    error: profileQueryError,
  } = useQuery<DetailedUserDto>({
    queryKey: ['profile', 'me'],
    queryFn: () => userService.me(),
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(event.target as Node)) {
        setIsAvatarMenuOpen(false);
      }
      if (coverMenuRef.current && !coverMenuRef.current.contains(event.target as Node)) {
        setIsCoverMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const env = ((import.meta as ImportMeta & { env?: Record<string, string | boolean | undefined> }).env ?? {}) as Record<string, string | boolean | undefined>;
  const imageBaseUrl = (typeof env.VITE_API_IMAGE_URL === 'string' ? env.VITE_API_IMAGE_URL : '').trim().replace(/\/+$/, '');
  const defaultProfileImage = (typeof env.VITE_DEFAULT_PROFILE_IMAGE === 'string' ? env.VITE_DEFAULT_PROFILE_IMAGE : '').trim().replace(/\/+$/, '');
  const profilePicturePath = currentUser?.profile_picture?.trim();
  const coverPicturePath = currentUser?.cover_picture?.trim();
  const hasProfilePicture = Boolean(profilePicturePath);
  const hasCoverPicture = Boolean(coverPicturePath);
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
      return t.joinedRecently;
    }
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) {
      return t.joinedRecently;
    }

    const formatted = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(date);

    return `${t.joinedPrefix} ${formatted}`;
  })();

  const openImageViewer = (imageSrc: string | null, imageAlt: string) => {
    if (!imageSrc) {
      return;
    }

    setViewerImageSrc(imageSrc);
    setViewerImageAlt(imageAlt);
    setIsImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsImageViewerOpen(false);
    setViewerImageSrc(null);
  };

  const formatWeeksAgo = (createdAt: string): string => {
    const createdDate = new Date(createdAt);
    if (Number.isNaN(createdDate.getTime())) {
      return t.recently;
    }

    const diffMs = Date.now() - createdDate.getTime();
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    if (diffMs < weekMs) {
      return t.recently;
    }
    const weeks = Math.floor(diffMs / weekMs);

    return weeks === 1 ? t.weekAgo : `${weeks} ${t.weeksAgoSuffix}`;
  };

  const resolveUserImage = (imagePath?: string): string => {
    const trimmed = imagePath?.trim();
    if (!trimmed) {
      return `${imageBaseUrl}/${defaultProfileImage}`;
    }
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }
    return `${imageBaseUrl}/${trimmed.replace(/^\/+/, '')}`;
  };

  const receivedFeedbacks = currentUser?.received_feedbacks ?? [];
  const visibleFeedbacks = showAllReviews ? receivedFeedbacks : receivedFeedbacks.slice(0, 3);
  const sentFeedbacks = currentUser?.sent_feedbacks ?? [];
  const visibleSentFeedbacks = showAllGivenReviews ? sentFeedbacks : sentFeedbacks.slice(0, 3);

  const handleOpenCoverPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsCoverMenuOpen(false);
    coverInputRef.current?.click();
  };

  const handleDeleteCover = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    try {
      setActionErrorMessage(null);
      const updatedUser = await userService.update({
        _method: 'PATCH',
        remove_cover_picture: true,
      });
      queryClient.setQueryData(['profile', 'me'], updatedUser);
      setIsCoverMenuOpen(false);
    } catch (error) {
      setActionErrorMessage(error instanceof Error ? error.message : t.cover.deleteError);
    }
  };

  const handleOpenProfilePicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsAvatarMenuOpen(false);
    profileInputRef.current?.click();
  };

  const handleProfileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    try {
      setActionErrorMessage(null);
      const updatedUser = await userService.update({
        _method: 'PATCH',
        profile_picture: selectedFile,
      });
      queryClient.setQueryData(['profile', 'me'], updatedUser);
      setIsAvatarMenuOpen(false);
    } catch (error) {
      setActionErrorMessage(error instanceof Error ? error.message : t.avatar.updateError);
    } finally {
      event.target.value = '';
    }
  };

  const handleDeleteProfile = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    try {
      setActionErrorMessage(null);
      const updatedUser = await userService.update({
        _method: 'PATCH',
        remove_profile_picture: true,
      });
      queryClient.setQueryData(['profile', 'me'], updatedUser);
      setIsAvatarMenuOpen(false);
    } catch (error) {
      setActionErrorMessage(error instanceof Error ? error.message : t.avatar.deleteError);
    }
  };

  const handleCoverSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    try {
      setActionErrorMessage(null);
      const updatedUser = await userService.update({
        _method: 'PATCH',
        cover_picture: selectedFile,
      });
      queryClient.setQueryData(['profile', 'me'], updatedUser);
    } catch (error) {
      setActionErrorMessage(error instanceof Error ? error.message : t.cover.updateError);
    } finally {
      event.target.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-gray-600 font-medium">
          {t.loading}
        </div>
      </div>
    );
  }

  const profileErrorMessage = actionErrorMessage
    ?? (profileQueryError instanceof Error ? profileQueryError.message : null)
    ?? (profileQueryError ? t.loadErrorFallback : null);

  if (profileErrorMessage) {
    return (
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700 font-medium">
          {profileErrorMessage}
        </div>
      </div>
    );
  }

  if (!currentUser || !displayName || !displayEmail) {
    return (
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-gray-600 font-medium">
          {t.unavailable}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto animate-fadeIn min-h-screen">
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden mb-6 relative group">
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverSelected}
          />
          <input
            ref={profileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileSelected}
          />
          <div
            role="button"
            tabIndex={coverImage ? 0 : -1}
            onClick={() => openImageViewer(coverImage, `${displayName} cover`)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openImageViewer(coverImage, `${displayName} cover`);
              }
            }}
            className="h-56 md:h-80 bg-gradient-to-r from-gray-900 to-gray-800 relative"
          >
             <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
             {coverImage && <img src={coverImage} className="w-full h-full object-cover opacity-40" />}
             <div ref={coverMenuRef} className="absolute top-4 right-4">
               <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsCoverMenuOpen((prev) => !prev);
                  }}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition opacity-0 group-hover:opacity-100"
               >
                   <Camera size={16}/> {t.cover.editCover}
               </button>
               {isCoverMenuOpen && (
                 <div className="absolute right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg p-1.5 w-48 z-30">
                   <button
                     type="button"
                     onClick={handleOpenCoverPicker}
                     className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                   >
                     {hasCoverPicture ? t.cover.updateCoverPhoto : t.cover.addCoverPhoto}
                   </button>
                   {hasCoverPicture && (
                     <button
                       type="button"
                       onClick={handleDeleteCover}
                       className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50"
                     >
                       {t.cover.deleteCoverPhoto}
                     </button>
                   )}
                 </div>
               )}
             </div>
          </div>

          <div className="px-6 md:px-10 pb-8 relative">
              <div className="flex flex-col md:flex-row items-start gap-6">
                  <div ref={avatarMenuRef} className="relative group/avatar -mt-16 md:-mt-20 flex-shrink-0 z-10">
                      <div className="p-1.5 bg-white rounded-[2rem] shadow-sm">
                        <img src={profileImage} className="w-32 h-32 md:w-40 md:h-40 rounded-[1.8rem] object-cover border border-gray-100 shadow-inner" />
                      </div>
                      <div className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full border-4 border-white shadow-sm" title={t.avatar.verifiedTitle}>
                          <ShieldCheck size={20} fill="currentColor" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAvatarMenuOpen((prev) => !prev)}
                        className="absolute inset-0 bg-black/40 rounded-[2rem] m-1.5 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition cursor-pointer"
                        aria-label={t.avatar.openActionsAria}
                      >
                          <Camera size={24} className="text-white"/>
                      </button>
                      {isAvatarMenuOpen && (
                        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white border border-gray-100 rounded-xl shadow-lg p-1.5 w-56 z-30">
                          {hasProfilePicture ? (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  openImageViewer(profileImage, `${displayName} profile`);
                                  setIsAvatarMenuOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                              >
                                {t.avatar.viewProfilePhoto}
                              </button>
                              <button
                                type="button"
                                onClick={handleOpenProfilePicker}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                              >
                                {t.avatar.updateProfilePhoto}
                              </button>
                              <button
                                type="button"
                                onClick={handleDeleteProfile}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50"
                              >
                                {t.avatar.deleteProfilePhoto}
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={handleOpenProfilePicker}
                              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                            >
                              {t.avatar.addProfilePhoto}
                            </button>
                          )}
                        </div>
                      )}
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
                                    {currentUser.is_verified ? t.verification.verifiedPro : t.verification.verificationNeeded}
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
                                    {currentUser.is_verified ? t.verification.availableForWork : t.verification.verificationNeeded}
                                  </span>
                              </div>
                          </div>

                          <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                              <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm flex items-center justify-center gap-2">
                                  <Share2 size={18}/> {t.actions.share}
                              </button>
                              <button
                                onClick={() => navigate('/dashboard/settings')}
                                className="flex-1 md:flex-none px-6 py-3 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
                              >
                                  <Edit3 size={18} /> {t.actions.editProfile}
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {isImageViewerOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center p-4 pt-8">
          <button
            type="button"
            onClick={closeImageViewer}
            className="absolute inset-0 cursor-default"
            aria-label="Close image viewer backdrop"
          />
          <div className="relative z-10 w-[90vw] h-[90vh] flex items-start justify-center">
            <button
              type="button"
              onClick={closeImageViewer}
              className="absolute top-3 right-3 text-white text-sm font-bold px-3 py-1.5 rounded-lg bg-black/50 hover:bg-black/70"
            >
              {t.actions.close}
            </button>
            <img
              src={viewerImageSrc ?? profileImage}
              alt={viewerImageAlt}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="xl:col-span-2 space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-row items-center gap-4 hover:border-green-200 transition-colors">
                      <div className="text-yellow-600 flex-shrink-0">
                          <Star size={28} fill="currentColor"/>
                      </div>
                      <div>
                          <span className="block text-2xl font-extrabold text-gray-900 leading-none">
                            {typeof currentUser.rating_average === 'number' ? currentUser.rating_average.toFixed(1) : '-'}
                          </span>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            {t.stats.rating} ({currentUser.received_feedbacks_count ?? 0})
                          </span>
                      </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-row items-center gap-4 hover:border-green-200 transition-colors">
                      <div className="text-blue-600 flex-shrink-0">
                          <Briefcase size={28}/>
                      </div>
                      <div>
                          <span className="block text-2xl font-extrabold text-gray-900 leading-none">142</span>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.stats.jobsDone}</span>
                      </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-row items-center gap-4 hover:border-green-200 transition-colors">
                      <div className="text-indigo-600 flex-shrink-0">
                          <ClipboardList size={28}/>
                      </div>
                      <div>
                          <span className="block text-2xl font-extrabold text-gray-900 leading-none">0</span>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.stats.jobsPosted}</span>
                      </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-row items-center gap-4 hover:border-green-200 transition-colors">
                      <div className="text-orange-600 flex-shrink-0">
                          <Megaphone size={28}/>
                      </div>
                      <div>
                          <span className="block text-2xl font-extrabold text-gray-900 leading-none">0</span>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.stats.ads}</span>
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
                          { id: 'overview', label: t.tabs.overview },
                          { id: 'reviews', label: t.tabs.reviews },
                          { id: 'given-reviews', label: t.tabs.givenReviews }
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
                                  <h3 className="text-lg font-bold text-gray-900 mb-4">{t.overview.aboutMe}</h3>
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
                              {receivedFeedbacks.length === 0 && (
                                <div className="text-sm font-medium text-gray-500 bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                                  {t.reviews.empty}
                                </div>
                              )}

                              {visibleFeedbacks.map((feedback) => (
                                <div key={feedback.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                      <img
                                        src={resolveUserImage(feedback.sender.profile_picture)}
                                        className="w-10 h-10 rounded-full bg-gray-200 object-cover"
                                      />
                                      <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{feedback.sender.name}</h4>
                                        <p className="text-xs text-gray-400">{formatWeeksAgo(feedback.created_at)}</p>
                                      </div>
                                    </div>
                                    <div className="flex text-yellow-400">
                                      {[...Array(5)].map((_, idx) => (
                                        <Star
                                          key={idx}
                                          size={14}
                                          fill={idx < Math.round(feedback.rating) ? 'currentColor' : 'none'}
                                          className={idx < Math.round(feedback.rating) ? 'text-yellow-400' : 'text-gray-300'}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-gray-600 text-sm leading-relaxed mt-2 bg-gray-50 p-4 rounded-xl rounded-tl-none">
                                    {feedback.overview?.trim() ? `"${feedback.overview}"` : t.reviews.noComment}
                                  </p>
                                </div>
                              ))}

                              {receivedFeedbacks.length > 3 && (
                                <button
                                  type="button"
                                  onClick={() => setShowAllReviews((prev) => !prev)}
                                  className="w-full py-3 border border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition"
                                >
                                  {showAllReviews ? t.reviews.showLess : t.reviews.showMore}
                                </button>
                              )}
                          </div>
                      )}

                      {activeTab === 'given-reviews' && (
                        <div className="space-y-6 animate-fadeIn">
                          {sentFeedbacks.length === 0 && (
                            <div className="text-sm font-medium text-gray-500 bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                              {t.reviews.empty}
                            </div>
                          )}

                          {visibleSentFeedbacks.map((feedback) => (
                            <div key={feedback.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={resolveUserImage(feedback.receiver.profile_picture)}
                                    className="w-10 h-10 rounded-full bg-gray-200 object-cover"
                                  />
                                  <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{feedback.receiver.name}</h4>
                                    <p className="text-xs text-gray-400">{formatWeeksAgo(feedback.created_at)}</p>
                                  </div>
                                </div>
                                <div className="flex text-yellow-400">
                                  {[...Array(5)].map((_, idx) => (
                                    <Star
                                      key={idx}
                                      size={14}
                                      fill={idx < Math.round(feedback.rating) ? 'currentColor' : 'none'}
                                      className={idx < Math.round(feedback.rating) ? 'text-yellow-400' : 'text-gray-300'}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm leading-relaxed mt-2 bg-gray-50 p-4 rounded-xl rounded-tl-none">
                                {feedback.overview?.trim() ? `"${feedback.overview}"` : t.reviews.noComment}
                              </p>
                            </div>
                          ))}

                          {sentFeedbacks.length > 3 && (
                            <button
                              type="button"
                              onClick={() => setShowAllGivenReviews((prev) => !prev)}
                              className="w-full py-3 border border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition"
                            >
                              {showAllGivenReviews ? t.reviews.showLess : t.reviews.showMore}
                            </button>
                          )}
                        </div>
                      )}
                  </div>
              </div>
          </div>

          <div className="space-y-6">

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">{t.side.contactInformation}</h3>
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
                      {t.side.messageMe}
                  </button>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">{t.side.skills}</h3>
                  <div className="flex flex-wrap gap-2">
                      {currentUser?.skills?.map(skill => (
                          <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200">
                              {skill}
                          </span>
                      ))}
                  </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2"><Languages size={20}/> {t.side.languages}</h3>
                  <div className="space-y-3">
                    {currentUser.languages && currentUser.languages.length > 0 ? (
                      currentUser.languages.map((item) => {
                        const level = normalizeLanguageLevel(item.level);
                        const levelLabel = getLanguageLevelLabel(locale, level);
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
                      <p className="text-sm text-gray-500 font-medium">{t.side.noLanguagesYet}</p>
                    )}
                  </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                   <h3 className="font-bold text-gray-900 text-lg mb-4">{t.side.verifications}</h3>
                   <div className="space-y-3">
                      <div className={`flex items-center gap-3 text-sm text-gray-700`}>
                          {currentUser.is_verified ? (
                            <CheckCircle size={18} className="text-green-600" />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-700 flex items-center justify-center text-xs font-extrabold">
                              !
                            </div>
                          )}
                          {currentUser.is_verified ? t.side.idVerified : t.side.idVerificationNeeded}
                      </div>
                      <div className={`flex items-center gap-3 text-sm text-gray-700`}>
                          {currentUser.email_verified_at ? (
                            <CheckCircle size={18} className="text-green-600" />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-700 flex items-center justify-center text-xs font-extrabold">
                              !
                            </div>
                          )}
                          {currentUser.email_verified_at ? t.side.emailVerified : t.side.emailVerificationNeeded}
                      </div>
                   </div>
               </div>

          </div>
      </div>
    </div>
  );
};

export default Profile;
