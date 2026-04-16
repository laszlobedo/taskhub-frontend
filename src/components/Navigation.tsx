
import React, { useState, useRef, useEffect } from 'react';
import { LayoutDashboard, Search, PlusCircle, MessageSquare, User, LogOut, Menu, X, Calendar, Settings, ChevronUp, ChevronDown, Hexagon, Wallet, Award, Users } from 'lucide-react';
import { ViewState } from '../types';
import type { AuthUserDto } from '../api/dto/auth.dto';
import type { SupportedLocale } from '@/i18n/locales';
import { navigationTranslations } from '@/i18n/translations/navigation';

interface NavigationProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isLoggedIn: boolean;
  currentUser: AuthUserDto | null;
  onLogout: () => void;
  locale: SupportedLocale;
  onLocaleChange: (locale: SupportedLocale) => void;
}

const LOCALE_OPTIONS: Array<{ locale: SupportedLocale; flag: string; label: string }> = [
  { locale: 'en', flag: '🇬🇧', label: '' },
  { locale: 'ro', flag: '🇷🇴', label: '' },
  { locale: 'hu', flag: '🇭🇺', label: '' },
];

const Navigation: React.FC<NavigationProps> = ({ currentView, onChangeView, isMobileMenuOpen, setIsMobileMenuOpen, isLoggedIn, currentUser, onLogout, locale, onLocaleChange }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const env = ((import.meta as ImportMeta & { env?: Record<string, string | boolean | undefined> }).env ?? {}) as Record<string, string | boolean | undefined>;
  const imageBaseUrl = (typeof env.VITE_API_IMAGE_URL === 'string' ? env.VITE_API_IMAGE_URL : '').trim().replace(/\/+$/, '');
  const defaultProfileImage = (typeof env.VITE_DEFAULT_PROFILE_IMAGE === 'string' ? env.VITE_DEFAULT_PROFILE_IMAGE : '').trim().replace(/\/+$/, '');
  const profileImage = currentUser?.profile_picture
    ? `${imageBaseUrl}/${currentUser?.profile_picture}`
    : `${imageBaseUrl}/${defaultProfileImage}`;
  const profileName = currentUser?.name ?? currentUser?.username ?? 'User';
  const profileEmail = currentUser?.email ?? 'No email';
  const t = navigationTranslations[locale];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainNavItems = [
    { id: 'find-job', label: t.mainNav.findJob, icon: Search },
    { id: 'post-job', label: t.mainNav.postJob, icon: PlusCircle },
  ];

  const hubItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'calendar', label: 'My Calendar', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 2 },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'milestones', label: 'Rewards', icon: Award },
    { id: 'referrals', label: 'Invite', icon: Users },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full text-gray-600 font-sans relative overflow-y-auto">
      <div className="p-6 flex items-center justify-between gap-3 mb-2 flex-shrink-0">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onChangeView('landing')}>
          <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center shadow-sm relative overflow-hidden">
              <Hexagon size={20} className="text-white fill-white relative z-10" strokeWidth={0} />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">Task<span className="text-green-700">Hub</span></span>
        </div>
        <select
          value={locale}
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

      <div className="px-6 mb-6">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Menu</div>
        <nav className="space-y-1 mb-8">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onChangeView(item.id as ViewState);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-[#1e293b] text-white shadow-lg shadow-slate-900/10'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-900'} />
                  <span className="font-medium">{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {isLoggedIn && (
            <div className="lg:hidden">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">My Hub</div>
                <nav className="space-y-1 mb-6">
                {hubItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id || (currentView === 'dashboard' && item.id === 'overview');
                    return (
                    <button
                        key={item.id}
                        onClick={() => {
                            onChangeView(item.id as ViewState);
                            setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                            isActive
                                ? 'bg-green-50 text-green-700 font-bold'
                                : 'hover:bg-gray-100 text-gray-600'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <Icon size={20} className={isActive ? 'text-green-700' : 'text-gray-500 group-hover:text-gray-900'} />
                            <span className="font-medium">{item.label}</span>
                        </div>
                        {item.badge && (
                            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {item.badge}
                            </span>
                        )}
                    </button>
                    );
                })}
                </nav>
            </div>
        )}
      </div>

      {isLoggedIn && (
        <div className="mt-auto p-4 border-t border-gray-100" ref={profileMenuRef}>
            <div className="flex flex-col gap-2">
                <div className="w-full flex items-center gap-3 p-2 rounded-xl">
                    <img src={profileImage} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" alt="Profile" />
                    <div className="flex-1 text-left min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{profileName}</p>
                        <p className="text-xs text-gray-500 truncate">{profileEmail}</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl text-left transition-colors"
                >
                    <LogOut size={18} />
                    <span>{t.actions.logOut}</span>
                </button>
            </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-50 px-4 py-3 shadow-sm flex items-center justify-between border-b border-gray-100">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                <Hexagon size={20} className="text-white fill-white relative z-10" strokeWidth={0} />
            </div>
            <span className="font-bold text-lg text-gray-900">Task<span className="text-green-700">Hub</span></span>
            <select
              value={locale}
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

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="rounded-full border border-gray-100 p-0.5 relative">
             <img src={isLoggedIn ? profileImage : `${imageBaseUrl}/${defaultProfileImage}`} className="w-9 h-9 rounded-full object-cover" alt="Profile" />
             {isMobileMenuOpen && (
                 <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
                     <X size={16} className="text-white"/>
                 </div>
             )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 bg-white border-r border-gray-100 z-50 w-72 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:static lg:h-screen lg:flex-shrink-0
      `}>
        <NavContent />
      </aside>
    </>
  );
};

export default Navigation;
