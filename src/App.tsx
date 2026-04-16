import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Landing from './views/Landing';
import Dashboard from './views/Dashboard';
import FindTasks from './views/FindTasks';
import PostTask from './views/PostTask';
import Profile from './views/Profile';
import Schedule from './views/Schedule';
import Register from './views/Register';
import Login from './views/Login';
import DesignPreview from './components/DesignPreview';
import { ViewState } from './types';
import { authService } from './api/services/auth.service';
import type { AuthUserDto, LoginRequestDto } from './api/dto/auth.dto';
import { setUnauthorizedHandler } from './api/client';
import { authStorage } from './auth/storage';
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  isSupportedLocale,
  stripLocaleFromPathname,
  type SupportedLocale,
  withLocalePath,
} from './i18n/locales';

const VIEW_TO_PATH: Record<ViewState, string> = {
  landing: '/',
  register: '/register',
  dashboard: '/dashboard',
  'find-job': '/find-job',
  'post-job': '/post-job',
  messages: '/dashboard/messages',
  profile: '/profile',
  calendar: '/dashboard/calendar',
  settings: '/dashboard/settings',
  'my-jobs': '/dashboard/my-jobs',
  adds: '/dashboard/adds',
  preview: '/preview',
};

const PATH_TO_VIEW: Record<string, ViewState> = {
  '/': 'landing',
  '/register': 'register',
  '/dashboard': 'dashboard',
  '/dashboard/overview': 'dashboard',
  '/dashboard/settings': 'settings',
  '/dashboard/messages': 'messages',
  '/dashboard/wallet': 'dashboard',
  '/dashboard/milestones': 'dashboard',
  '/dashboard/referrals': 'dashboard',
  '/dashboard/calendar': 'calendar',
  '/find-job': 'find-job',
  '/post-job': 'post-job',
  '/profile': 'profile',
  '/calendar': 'calendar',
  '/settings': 'settings',
  '/my-jobs': 'my-jobs',
  '/adds': 'adds',
  '/preview': 'preview',
};

const DASHBOARD_TAB_ROUTES: Array<{ path: string; tab: React.ComponentProps<typeof Dashboard>['initialTab'] }> = [
  { path: '/dashboard', tab: 'overview' },
  { path: '/dashboard/overview', tab: 'overview' },
  { path: '/dashboard/settings', tab: 'settings' },
  { path: '/dashboard/messages', tab: 'messages' },
  { path: '/dashboard/wallet', tab: 'wallet' },
  { path: '/dashboard/milestones', tab: 'milestones' },
  { path: '/dashboard/referrals', tab: 'referrals' },
  { path: '/dashboard/calendar', tab: 'calendar' },
];

const LEGACY_REDIRECTS: Array<{ from: string; to: string }> = [
  { from: '/settings', to: '/dashboard/settings' },
  { from: '/messages', to: '/dashboard/messages' },
  { from: '/wallet', to: '/dashboard/wallet' },
  { from: '/milestones', to: '/dashboard/milestones' },
  { from: '/referrals', to: '/dashboard/referrals' },
  { from: '/calendar', to: '/dashboard/calendar' },
  { from: '/overview', to: '/dashboard/overview' },
];

const getViewFromPathname = (pathname: string): ViewState => PATH_TO_VIEW[pathname] ?? 'landing';

const isViewState = (value: string): value is ViewState => value in VIEW_TO_PATH;

const ProtectedRoute: React.FC<{ isAllowed: boolean; redirectTo: string; children: React.ReactNode }> = ({
  isAllowed,
  redirectTo,
  children,
}) => {
  const isLogoutTransition = window.sessionStorage.getItem('taskhub.logoutTransition') === 'true';

  if (isLogoutTransition) {
    return <>{children}</>;
  }

  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const localeFromPath = getLocaleFromPathname(location.pathname);
  const currentLocale: SupportedLocale = localeFromPath ?? DEFAULT_LOCALE;
  const localePathname = stripLocaleFromPathname(location.pathname);
  const currentView = getViewFromPathname(localePathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => authService.isAuthenticated());
  const [currentUser, setCurrentUser] = useState<AuthUserDto | null>(null);

  useEffect(() => {
    if (!localeFromPath) {
      navigate(withLocalePath(DEFAULT_LOCALE, localePathname), { replace: true });
    }
  }, [localeFromPath, localePathname, navigate]);

  useEffect(() => {
    const storedUser = authService.getStoredUser();
    setCurrentUser(storedUser);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      authStorage.clearSession();
      setCurrentUser(null);
      setIsLoggedIn(false);

      if (stripLocaleFromPathname(window.location.pathname) !== '/login') {
        navigate(withLocalePath(currentLocale, '/login'));
      }
    });

    return () => {
      setUnauthorizedHandler(null);
    };
  }, [currentLocale, navigate]);

  const handleOpenLogin = () => {
    navigate(withLocalePath(currentLocale, '/login'));
  };

  const handleLogin = async (payload: LoginRequestDto) => {
    const user = await authService.login(payload);
    setCurrentUser(user);
    setIsLoggedIn(true);
    navigate(withLocalePath(currentLocale, '/'));
  };

  const handleLogout = async () => {
    window.sessionStorage.setItem('taskhub.logoutTransition', 'true');
    navigate(withLocalePath(currentLocale, '/'));
    await authService.logout();
    setCurrentUser(null);
    setIsLoggedIn(false);
    window.sessionStorage.removeItem('taskhub.logoutTransition');
  };

  const handleViewNavigation = (view: ViewState | string) => {
    const nextPath = isViewState(view) ? VIEW_TO_PATH[view] : '/';
    navigate(withLocalePath(currentLocale, nextPath));
  };

  const handleLocaleChange = (locale: SupportedLocale) => {
    navigate(withLocalePath(locale, localePathname));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col lg:flex-row font-sans relative">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .wavy-underline {
            text-decoration: underline;
            text-decoration-style: wavy;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      {currentView !== 'landing' && currentView !== 'register' && currentView !== 'preview' && (
        <Navigation
          currentView={currentView}
          onChangeView={handleViewNavigation}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLogout={handleLogout}
          locale={currentLocale}
          onLocaleChange={handleLocaleChange}
        />
      )}

      <main className={`flex-1 transition-all duration-300 ${currentView !== 'landing' && currentView !== 'register' && currentView !== 'preview' ? 'lg:ml-0 pt-16 lg:pt-0' : ''}`}>
        <Routes>
          <Route path="/" element={<Navigate to={withLocalePath(DEFAULT_LOCALE, '/')} replace />} />
          <Route
            path="/:lang"
            element={
              <Landing
                onGetStarted={handleViewNavigation}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onLogin={handleOpenLogin}
                onLogout={handleLogout}
                locale={currentLocale}
                onLocaleChange={handleLocaleChange}
              />
            }
          />
          <Route
            path="/:lang/login"
            element={
              <ProtectedRoute isAllowed={!isLoggedIn} redirectTo={withLocalePath(currentLocale, '/')}>
                <Login
                  onLogin={handleLogin}
                  onCancel={() => handleViewNavigation('landing')}
                  onGoToRegister={() => handleViewNavigation('register')}
                  locale={currentLocale}
                  onLocaleChange={handleLocaleChange}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:lang/register"
            element={
              <Register
                onRegisterComplete={() => {
                  handleViewNavigation('landing');
                }}
                onCancel={() => handleViewNavigation('login')}
                onLogin={handleOpenLogin}
                locale={currentLocale}
                onLocaleChange={handleLocaleChange}
              />
            }
          />
          {DASHBOARD_TAB_ROUTES.map((route) => (
            <React.Fragment key={route.path}>
              <Route
                path={`/:lang${route.path}`}
                element={(
                  <ProtectedRoute isAllowed={isLoggedIn} redirectTo={withLocalePath(currentLocale, '/login')}>
                    <Dashboard initialTab={route.tab} />
                  </ProtectedRoute>
                )}
              />
            </React.Fragment>
          ))}
          <Route
            path="/:lang/find-job"
            element={
              <ProtectedRoute isAllowed={isLoggedIn} redirectTo={withLocalePath(currentLocale, '/login')}>
              <FindTasks
                  onNavigate={(view) => {
                    if (isViewState(view)) {
                      handleViewNavigation(view);
                    }
                  }}
                  isLoggedIn={isLoggedIn}
                  onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:lang/post-job"
            element={(
              <ProtectedRoute isAllowed={isLoggedIn} redirectTo={withLocalePath(currentLocale, '/login')}>
                <PostTask />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/:lang/calendar"
            element={(
              <ProtectedRoute isAllowed={isLoggedIn} redirectTo={withLocalePath(currentLocale, '/login')}>
                <Schedule />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/:lang/profile"
            element={(
              <ProtectedRoute isAllowed={isLoggedIn} redirectTo={withLocalePath(currentLocale, '/login')}>
                <Profile locale={currentLocale} />
              </ProtectedRoute>
            )}
          />
          <Route path="/:lang/preview" element={<DesignPreview onExit={() => handleViewNavigation('landing')} />} />

          {LEGACY_REDIRECTS.map((redirect) => (
            <React.Fragment key={redirect.from}>
              <Route
                path={`/:lang${redirect.from}`}
                element={<Navigate to={withLocalePath(currentLocale, redirect.to)} replace />}
              />
            </React.Fragment>
          ))}
          <Route
            path="*"
            element={
              isSupportedLocale(location.pathname.split('/').filter(Boolean)[0] ?? '')
                ? <Navigate to={withLocalePath(currentLocale, '/')} replace />
                : <Navigate to={withLocalePath(DEFAULT_LOCALE, '/')} replace />
            }
          />
        </Routes>
      </main>

    </div>
  );
};

export default App;

