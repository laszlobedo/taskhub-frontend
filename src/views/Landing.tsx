
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Search, Star, Briefcase, ChevronDown, User, LogOut, Settings, LayoutDashboard, CheckCircle, Quote, MessageCircle, Hexagon, Menu, X, Wallet, Award, Users, Calendar } from 'lucide-react';
import { ViewState } from '../types';
import type { AuthUserDto } from '../api/dto/auth.dto';

interface LandingProps {
  onGetStarted: (view: ViewState) => void;
  isLoggedIn: boolean;
  currentUser: AuthUserDto | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Landing: React.FC<LandingProps> = ({ onGetStarted, isLoggedIn, currentUser, onLogin, onLogout }) => {
  const [activeTab, setActiveTab] = useState<ViewState>('landing');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const profileRef = useRef<HTMLDivElement>(null);
  const env = ((import.meta as ImportMeta & { env?: Record<string, string | boolean | undefined> }).env ?? {}) as Record<string, string | boolean | undefined>;
  const imageBaseUrl = (typeof env.VITE_API_IMAGE_URL === 'string' ? env.VITE_API_IMAGE_URL : '').trim().replace(/\/+$/, '');
  const profileImage = currentUser?.profile_picture
    ? `${imageBaseUrl}/${currentUser?.profile_picture}`
    : 'https://via.placeholder.com/150';
  const profileName = currentUser?.name ?? currentUser?.username ?? 'User';
  const shortProfileName = (() => {
    const parts = profileName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) {
      return 'User';
    }
    if (parts.length === 1) {
      return parts[0];
    }
    return `${parts[0]} ${parts[1][0]}.`;
  })();
  const profileEmail = currentUser?.email ?? 'No email';
  const profileBadge = currentUser?.is_verified ? 'Verified Pro' : 'Member';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const reviews = [
      { text: "I found an electrician in 10 minutes. He arrived within an hour and fixed my issue perfectly!", author: "Andrei M.", location: "București", role: "Employer" },
      { text: "RomaniaWorkflow helped me find consistent freelance web design work. The platform is super easy to use.", author: "Elena S.", location: "Cluj-Napoca", role: "Worker" },
      { text: "Great experience getting my furniture assembled. Saved me so much time and frustration.", author: "Mihai D.", location: "Timișoara", role: "Employer" },
      { text: "The payments are secure and I feel safe using the platform for all my home repairs.", author: "Cristina V.", location: "Iași", role: "Employer" },
      { text: "As a student, this is the best way to earn extra money on weekends. Highly recommend!", author: "Radu I.", location: "Brașov", role: "Worker" },
      { text: "Found a great translator for my documents. Fast and professional service.", author: "Ioana P.", location: "Constanța", role: "Employer" },
      { text: "Cleaning services are top notch. I use this app every week.", author: "George T.", location: "Sibiu", role: "Employer" },
      { text: "Virtual assistance gigs here pay better than other platforms.", author: "Alina B.", location: "Remote", role: "Worker" },
      { text: "Moved my entire apartment with help found here. Lifesavers!", author: "Vlad K.", location: "Oradea", role: "Employer" },
  ];

  useEffect(() => {
      const interval = setInterval(() => {
          setCurrentReviewIndex((prev) => (prev + 3) % reviews.length);
      }, 5000);
      return () => clearInterval(interval);
  }, [reviews.length]);

  const navLinks: Array<{ id: ViewState; label: string }> = [
    { id: 'landing', label: 'Home' },
    { id: 'find-job', label: 'Find Job' },
    { id: 'post-job', label: 'Post a Job' },
  ];

  const AppleLogo = () => (
      <svg width="18" height="18" viewBox="0 0 384 512" fill="currentColor">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
      </svg>
  );

  const categories = [
      {
          image: "https://i.postimg.cc/rF4vZRNZ/bernie-almanzar-e-Fc-Rl-Qm9k-I4-unsplash.jpg",
          label: "Home Repairs",
          subtitle: "Avg: 200 RON",
          description: "Plumbing, electrical, and general fixes."
      },
      {
          image: "https://i.postimg.cc/pXjgc5JD/anton_Sn_Kfm_C1I9f_U_unsplash.jpg",
          label: "Cleaning",
          subtitle: "Avg: 150 RON",
          description: "Apartment and deep cleaning services."
      },
      {
          image: "https://i.postimg.cc/J4X9YH5Z/richard_stachmann_Ggm_Z23gr_WNY_unsplash.jpg",
          label: "Moving",
          subtitle: "Avg: 300 RON",
          description: "Heavy lifting and furniture transport."
      },
      {
          image: "https://i.postimg.cc/zD6skFKn/annie_spratt_ch_j5g_H6INY_unsplash.jpg",
          label: "Gardening",
          subtitle: "Avg: 180 RON",
          description: "Lawn care, planting, and maintenance."
      },
      {
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
          label: "Web Design",
          subtitle: "Avg: 1200 RON",
          description: "Websites, UI/UX, and graphic design."
      },
      {
          image: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=600&auto=format&fit=crop",
          label: "Translation",
          subtitle: "Avg: 50 RON/pg",
          description: "Professional document translation."
      },
      {
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
          label: "Virtual Assistant",
          subtitle: "Avg: 40 RON/hr",
          description: "Admin support and data entry."
      },
      {
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
          label: "Digital Marketing",
          subtitle: "Avg: 800 RON",
          description: "SEO, social media, and ads."
      }
  ];

  const currentReviews = [
      reviews[currentReviewIndex % reviews.length],
      reviews[(currentReviewIndex + 1) % reviews.length],
      reviews[(currentReviewIndex + 2) % reviews.length],
  ];

  const mobileHubItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'calendar', label: 'My Calendar', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'milestones', label: 'Rewards', icon: Award },
    { id: 'referrals', label: 'Invite', icon: Users },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans text-gray-900">
      <div className="md:hidden flex flex-col bg-white border-b-2 border-gray-100 sticky top-0 z-50 shadow-md">
            <div className="flex justify-between items-center px-4 py-4">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => onGetStarted('landing')}>
                    <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center shadow-md relative overflow-hidden">
                        <Hexagon size={20} className="text-white fill-white relative z-10" strokeWidth={0} />
                    </div>
                    <span className="font-bold text-lg tracking-tight">Romania<span className="text-green-700">Workflow</span></span>
                </div>

                {!isLoggedIn ? (
                    <div className="flex items-center gap-2">
                        <button onClick={onLogin} className="text-gray-600 font-bold text-sm">Log In</button>
                        <button onClick={() => onGetStarted('register')} className="bg-gray-900 text-white px-3 py-1.5 rounded-lg font-bold text-sm">Sign Up</button>
                    </div>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="w-10 h-10 rounded-full border border-gray-200 p-0.5"
                        >
                            <img src={profileImage} className="w-full h-full rounded-full object-cover" alt="Profile" />
                        </button>
                    </div>
                )}
            </div>

            {isLoggedIn && isProfileOpen && (
                 <div className="fixed inset-0 z-50 flex justify-end md:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setIsProfileOpen(false)}></div>
                    <div className="relative w-[300px] h-full bg-white shadow-2xl overflow-y-auto animate-slideInRight flex flex-col">
                         <div className="p-6 border-b border-gray-100 flex items-center justify-center gap-3">
                             <div className="flex items-center gap-3">
                                 <img src={profileImage} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                                 <div>
                                     <p className="font-bold text-gray-900 text-sm">{profileName}</p>
                                     <p className="text-xs text-gray-500">{profileBadge}</p>
                                 </div>
                             </div>
                             <button onClick={() => setIsProfileOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500">
                                 <X size={18} />
                             </button>
                         </div>

                         <div className="p-6 space-y-1">
                             <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">My Hub</div>
                             {mobileHubItems.map(item => (
                                 <button
                                    key={item.id}
                                    onClick={() => {
                                        onGetStarted(item.id as ViewState);
                                        setIsProfileOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors text-left"
                                 >
                                     <item.icon size={18} className="text-gray-500" />
                                     {item.label}
                                 </button>
                             ))}

                             <div className="h-px bg-gray-100 my-4"></div>

                             <button
                                onClick={() => {
                                    onLogout();
                                    setIsProfileOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 font-bold transition-colors text-left"
                             >
                                 <LogOut size={18} />
                                 Log Out
                             </button>
                         </div>
                    </div>
                 </div>
            )}
      </div>

      <nav className="border-b border-gray-100 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-50 transition-all duration-300 shadow-sm md:shadow-none hidden md:flex">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onGetStarted('landing')}>
            <div className="w-9 h-9 bg-green-700 rounded-xl flex items-center justify-center shadow-green-700/20 shadow-lg relative overflow-hidden">
               <Hexagon size={20} className="text-white fill-white relative z-10" strokeWidth={0} />
               <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
            </div>
            <span className="font-bold text-xl tracking-tight">Romania<span className="text-green-700">Workflow</span></span>
        </div>

        <div className="flex bg-gray-100/80 p-1 rounded-xl md:rounded-full relative backdrop-blur-sm shadow-inner w-full md:w-auto overflow-x-auto md:overflow-visible justify-between md:justify-start">
            {navLinks.map((link) => (
                <button
                    key={link.id}
                    onClick={() => {
                        setActiveTab(link.id);
                        onGetStarted(link.id);
                    }}
                    className={`
                        relative px-3 md:px-5 py-2 rounded-lg md:rounded-full text-xs md:text-sm font-bold transition-all duration-300 z-10 whitespace-nowrap flex-1 md:flex-none text-center
                        ${activeTab === link.id ? 'text-gray-900 bg-white shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}
                    `}
                >
                    {link.label}
                </button>
            ))}
        </div>

        <div className="hidden md:block">
            {isLoggedIn ? (
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-3 rounded-xl transition-all border border-transparent hover:border-gray-100"
                    >
                        <div className="flex flex-col items-end mr-1">
                            <span className="text-xs font-bold text-gray-900">{shortProfileName}</span>
                        </div>
                        <img src={profileImage} className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover" />
                        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 animate-fadeIn z-50 transform origin-top-right">
                            <div className="p-3 border-b border-gray-50 mb-2">
                                <p className="font-bold text-gray-900">{profileName}</p>
                                <p className="text-xs text-gray-500 truncate">{profileEmail}</p>
                            </div>
                            <button onClick={() => onGetStarted('dashboard')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl text-left">
                                <LayoutDashboard size={16} /> Dashboard
                            </button>
                            <button onClick={() => onGetStarted('profile')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl text-left">
                                <User size={16} /> My Profile
                            </button>
                            <button onClick={() => onGetStarted('settings')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl text-left">
                                <Settings size={16} /> Settings
                            </button>
                            <div className="h-px bg-gray-50 my-2"></div>
                            <button
                                onClick={() => {
                                    onLogout();
                                    setIsProfileOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl text-left"
                            >
                                <LogOut size={16} /> Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <button
                        onClick={onLogin}
                        className="text-gray-600 font-bold text-sm hover:text-gray-900 px-3 py-2"
                    >
                        Log In
                    </button>
                    <button
                        onClick={() => onGetStarted('register')}
                        className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition shadow-lg shadow-gray-900/10 whitespace-nowrap"
                    >
                        Sign Up
                    </button>
                </div>
            )}
        </div>
      </nav>

      <section className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[80vh] min-h-[600px]">
            <div className="bg-white p-8 md:p-20 flex flex-col justify-center items-start border-r border-gray-100 relative group overflow-hidden">
                 <div className="absolute inset-0 bg-green-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                 <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 border border-gray-100 shadow-sm">
                    <Search size={32} className="text-gray-900" strokeWidth={2.5}/>
                 </div>
                 <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1] mb-8 relative z-10 text-left md:text-left">
                    I need a <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500">Professional</span>
                 </h1>
                 <p className="text-lg text-gray-500 mb-10 max-w-md leading-relaxed font-medium relative z-10">
                    Find verified local help for any project. From renovations to digital tasks, we've got you covered.
                 </p>
                 <button
                    onClick={() => onGetStarted('post-job')}
                    className="relative z-10 group bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-gray-900/10 transform hover:-translate-y-1 w-full md:w-auto justify-center md:justify-start"
                >
                    Post a Job <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                </button>
            </div>

            <div className="relative p-8 md:p-20 flex flex-col justify-center items-start text-left md:items-end md:text-right overflow-hidden group h-[500px] md:h-full">
                 <div className="absolute inset-0 z-0">
                    <img
                        src="https://i.postimg.cc/D0s3Gxfw/g9-3-800x450.jpg"
                        className="w-full h-full object-cover transform scale-105"
                        alt="Professional working"
                    />
                    <div className="absolute inset-0 bg-green-900/40 mix-blend-multiply transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
                 </div>

                 <div className="relative z-10 w-full flex flex-col items-start md:items-end">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20 backdrop-blur-sm">
                        <Briefcase size={32} className="text-white" strokeWidth={2.5}/>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1] mb-8 drop-shadow-lg text-left md:text-right">
                        I want to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-400">Earn Money</span>
                    </h1>
                    <p className="text-lg text-white mb-10 max-w-md leading-relaxed font-medium drop-shadow-md">
                        Join thousands of Romanian professionals. Remote or on-site, set your own rates and get paid.
                    </p>
                    <button
                        onClick={() => onGetStarted('find-job')}
                        className="group bg-green-600 text-white px-8 py-3 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-green-500 transition-all shadow-xl shadow-green-900/50 transform hover:-translate-y-1 w-full md:w-auto justify-center md:justify-start"
                    >
                        Find Work Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                 </div>
            </div>
        </div>
      </section>

      <section className="bg-[#0f172a] py-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }}></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 md:divide-x divide-gray-800/50">
                  <div className="text-center md:px-4">
                      <h3 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">15k+</h3>
                      <p className="text-gray-400 font-medium text-xs tracking-[0.2em] uppercase">Verified Workers</p>
                  </div>

                  <div className="text-center md:px-4">
                      <h3 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">50k+</h3>
                      <p className="text-gray-400 font-medium text-xs tracking-[0.2em] uppercase">Jobs Completed</p>
                  </div>

                  <div className="text-center md:px-4">
                      <h3 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">4.9/5</h3>
                      <p className="text-gray-400 font-medium text-xs tracking-[0.2em] uppercase">Average Rating</p>
                  </div>

                  <div className="text-center md:px-4">
                      <h3 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">100%</h3>
                      <p className="text-gray-400 font-medium text-xs tracking-[0.2em] uppercase">Secure Payments</p>
                  </div>
              </div>
          </div>
      </section>

      <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      Get it done, <br className="block md:hidden" />
                      <span className="text-green-700">hassle-free</span>
                  </h2>
                  <p className="text-gray-500 text-lg max-w-2xl mx-auto">From home repairs to digital services, find the right professional for any job.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
                  {categories.map((cat, i) => (
                      <div key={i} className="group relative h-64 md:h-80 rounded-[32px] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500">
                          <img
                            src={cat.image}
                            alt={cat.label}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 bg-[#15803d] text-white backdrop-blur-md">
                                  {cat.subtitle}
                              </span>
                              <h3 className="font-bold text-white text-lg md:text-xl lg:text-2xl mb-1 leading-tight">{cat.label}</h3>
                              <p className="text-gray-300 text-xs font-medium mt-2 hidden md:block">
                                  {cat.description}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>

              <div className="flex justify-center">
                  <button
                    onClick={() => onGetStarted('find-job')}
                    className="bg-white border-2 border-green-700 text-green-700 px-8 py-3 rounded-2xl font-bold hover:bg-green-700 hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                      See all jobs <ArrowRight size={18} />
                  </button>
              </div>
          </div>
      </section>

      <section className="py-24 relative overflow-hidden text-white">
          <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop"
                className="w-full h-full object-cover"
                alt="Background"
              />
              <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="flex flex-col md:flex-row items-center gap-16">
                   <div className="w-full md:w-2/3 space-y-12">
                        <div>
                             <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">How it works</h2>
                             <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed drop-shadow-md">Simple for both sides. Whether you're hiring or working, we make it seamless.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { step: "01", title: "Post or Find", desc: "Clients post their needs. Workers browse jobs that fit their skills." },
                                { step: "02", title: "Connect & Agree", desc: "Chat securely, check reviews, and agree on price and details." },
                                { step: "03", title: "Work & Pay", desc: "Job gets done. Payment is released securely upon completion." }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-4 group bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm">
                                    <div className="w-12 h-12 bg-green-600 text-white border-2 border-green-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:bg-green-500 group-hover:scale-110 group-hover:shadow-green-900/50 transition-all duration-300 transform hover:-translate-y-1">
                                        {item.step}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-300 leading-relaxed text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => onGetStarted('find-job')}
                            className="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-green-500 transition-all shadow-xl shadow-gray-900/50 transform hover:-translate-y-1 border-2 border-transparent hover:border-green-400 w-full md:w-auto flex items-center justify-center gap-3 whitespace-nowrap"
                        >
                            Find Work Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                        </button>
                   </div>
               </div>
          </div>
      </section>

      <section className="py-24 bg-[#f8fafc] border-t border-gray-100 relative overflow-hidden">

          <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="text-center mb-16">
                   <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Romania</h2>
                   <p className="text-gray-500 text-lg">Join thousands of verified users who trust our platform.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ease-in-out">
                    {currentReviews.map((review, i) => (
                        <div key={`${currentReviewIndex}-${i}`} className="animate-fadeIn">
                             <div className="bg-white/90 backdrop-blur-sm p-8 rounded-[32px] shadow-lg shadow-gray-200/50 border border-white h-full flex flex-col relative group hover:-translate-y-2 transition-transform duration-300">
                                 <div className="absolute top-8 right-8 text-green-100 group-hover:text-green-500 transition-colors">
                                     <Quote size={32} fill="currentColor" className="opacity-80"/>
                                 </div>

                                 <div className="flex items-center gap-4 mb-6">
                                     <div className="relative">
                                         <img src={`https://picsum.photos/seed/${currentReviewIndex + i + 50}/64/64`} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" alt={review.author} />
                                         <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-white">
                                             <ShieldCheck size={10} fill="currentColor"/>
                                         </div>
                                     </div>
                                     <div>
                                         <h4 className="font-bold text-gray-900">{review.author}</h4>
                                         <div className="flex text-yellow-400 gap-0.5">
                                             {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor"/>)}
                                         </div>
                                     </div>
                                 </div>

                                 <p className="text-gray-600 font-medium leading-relaxed mb-6 flex-1 relative z-10">
                                     "{review.text}"
                                 </p>

                                 <div className="flex items-center gap-2 pt-6 border-t border-gray-100">
                                     <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${review.role === 'Employer' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                                         {review.role}
                                     </span>
                                     <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                                         <div className="w-1 h-1 rounded-full bg-gray-300"></div> {review.location}
                                     </span>
                                 </div>
                             </div>
                        </div>
                    ))}
               </div>

               <div className="flex justify-center gap-2 mt-12">
                   {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, i) => (
                       <button
                            key={i}
                            onClick={() => setCurrentReviewIndex(i * 3)}
                            className={`transition-all duration-300 rounded-full ${
                                Math.floor(currentReviewIndex / 3) === i
                                    ? 'w-8 h-2 bg-green-700'
                                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                       />
                   ))}
               </div>
          </div>
      </section>

      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                  <div className="col-span-2 lg:col-span-2">
                       <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                                <Hexagon size={20} className="text-white fill-white relative z-10" strokeWidth={0} />
                            </div>
                            <span className="font-bold text-xl text-gray-900 tracking-tight">Romania<span className="text-green-700">Workflow</span></span>
                        </div>
                        <p className="text-gray-500 max-w-sm mb-6">
                            Connecting people who need help with trusted local professionals. The easiest way to get things done in Romania.
                        </p>
                  </div>

                  <div>
                      <h4 className="font-bold text-gray-900 mb-4">Discover</h4>
                      <ul className="space-y-3 text-sm text-gray-500">
                          <li className="hover:text-green-700 cursor-pointer">All services</li>
                          <li className="hover:text-green-700 cursor-pointer">Find a job</li>
                          <li className="hover:text-green-700 cursor-pointer">Post a job</li>
                          <li className="hover:text-green-700 cursor-pointer">Services in Romania</li>
                          <li className="hover:text-green-700 cursor-pointer">Help</li>
                      </ul>
                  </div>

                  <div>
                      <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                      <ul className="space-y-3 text-sm text-gray-500">
                          <li className="hover:text-green-700 cursor-pointer">About us</li>
                          <li className="hover:text-green-700 cursor-pointer">Careers</li>
                          <li className="hover:text-green-700 cursor-pointer">Blog</li>
                          <li className="hover:text-green-700 cursor-pointer">Referral Program</li>
                          <li className="hover:text-green-700 cursor-pointer">FAQ</li>
                      </ul>
                  </div>

                  <div>
                      <h4 className="font-bold text-gray-900 mb-4">Download App</h4>
                      <div className="flex flex-row gap-2 flex-nowrap">
                          <button className="flex-1 bg-[#1e293b] text-white py-3 px-3 rounded-xl flex items-center justify-center gap-3 hover:bg-black transition shadow-lg group whitespace-nowrap min-w-[140px]">
                              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                <AppleLogo />
                              </div>
                              <div className="flex flex-col items-start leading-none">
                                  <span className="text-[9px] font-medium uppercase tracking-wide opacity-80">Download on the</span>
                                  <span className="text-xs font-bold mt-0.5">App Store</span>
                              </div>
                          </button>

                          <button className="flex-1 bg-[#1e293b] text-white py-3 px-3 rounded-xl flex items-center justify-center gap-3 hover:bg-black transition shadow-lg group whitespace-nowrap min-w-[140px]">
                               <div className="w-5 h-5 flex items-center justify-center relative">
                                   <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" alt="Play" className="w-full h-full" />
                               </div>
                               <div className="flex flex-col items-start leading-none">
                                  <span className="text-[9px] font-medium uppercase tracking-wide opacity-80">Get it on</span>
                                  <span className="text-xs font-bold mt-0.5">Google Play</span>
                              </div>
                          </button>
                      </div>
                  </div>
              </div>

              <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 text-center md:text-left">
                  <p>© 2025 Romania Workflow. All rights reserved.</p>
                  <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-500">Designed by <span className="text-green-700 font-bold">Boabo Webstudio</span></p>
                      <span className="text-gray-300 hidden md:inline">|</span>
                      <button onClick={() => onGetStarted('preview')} className="text-xs font-bold text-gray-400 hover:text-green-700 uppercase tracking-wider hidden md:block">Preview design mód</button>
                  </div>
                  <div className="flex gap-6">
                      <span className="hover:text-gray-900 cursor-pointer">Privacy</span>
                      <span className="hover:text-gray-900 cursor-pointer">Terms</span>
                      <span className="hover:text-gray-900 cursor-pointer">Security</span>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
};

export default Landing;
