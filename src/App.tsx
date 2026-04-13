import React, { useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Landing from './views/Landing';
import Dashboard from './views/Dashboard';
import FindTasks from './views/FindTasks';
import PostTask from './views/PostTask';
import Profile from './views/Profile';
import Schedule from './views/Schedule';
import Register from './views/Register';
import DesignPreview from './components/DesignPreview';
import { ViewState } from './types';

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

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentView = getViewFromPathname(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleViewNavigation = (view: ViewState | string) => {
    const nextPath = isViewState(view) ? VIEW_TO_PATH[view] : '/';
    navigate(nextPath);
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
          onLogout={handleLogout}
        />
      )}

      <main className={`flex-1 transition-all duration-300 ${currentView !== 'landing' && currentView !== 'register' && currentView !== 'preview' ? 'lg:ml-0 pt-16 lg:pt-0' : ''}`}>
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                onGetStarted={handleViewNavigation}
                isLoggedIn={isLoggedIn}
                onLogin={handleLogin}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                onRegisterComplete={() => {
                  setIsLoggedIn(true);
                  handleViewNavigation('dashboard');
                }}
                onCancel={() => handleViewNavigation('landing')}
              />
            }
          />
          {DASHBOARD_TAB_ROUTES.map((route) => (
            <React.Fragment key={route.path}>
              <Route path={route.path} element={<Dashboard initialTab={route.tab} />} />
            </React.Fragment>
          ))}
          <Route
            path="/find-job"
            element={
              <FindTasks
                onNavigate={(view) => {
                  if (isViewState(view)) {
                    handleViewNavigation(view);
                  }
                }}
                isLoggedIn={isLoggedIn}
                onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            }
          />
          <Route path="/post-job" element={<PostTask />} />
          <Route path="/calendar" element={<Schedule />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/preview" element={<DesignPreview onExit={() => handleViewNavigation('landing')} />} />

          {LEGACY_REDIRECTS.map((redirect) => (
            <React.Fragment key={redirect.from}>
              <Route path={redirect.from} element={<Navigate to={redirect.to} replace />} />
            </React.Fragment>
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

    </div>
  );
};

export default App;

