
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Clock, Zap, ChevronDown, Filter, ArrowRight, X, Globe, DollarSign, Calendar, CheckCircle, Shield, ShieldCheck, Star, ArrowLeft, Briefcase, ThumbsUp, MessageSquare, Flag, Award, Activity, History } from 'lucide-react';
import { Task, UserProfileViewProps } from '../types';

const ROMANIAN_COUNTIES = [
  "All Romania", "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani", "Brașov", "Brăila", "București", "Buzău",
  "Caraș-Severin", "Călărași", "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu", "Gorj", "Harghita",
  "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureș", "Mehedinți", "Mureș", "Neamț", "Olt", "Prahova", "Satu Mare",
  "Sălaj", "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", "Vaslui", "Vâlcea", "Vrancea"
];

const CATEGORIES = [
  'All Categories',
  'Home & Garden',
  'Transport & Logistics',
  'Cleaning & Housekeeping',
  'Events & Organization',
  'Maintenance & Outdoor',
  'Farming & Agriculture',
  'Webdesign & Branding',
  'Social Media & Marketing'
];

export const generateMockJobs = (): Task[] => {
    const jobs: Task[] = [];
    const categories = CATEGORIES.slice(1);
    const locations = ROMANIAN_COUNTIES.slice(1);

    const titlesByCategory: Record<string, string[]> = {
        'Home & Garden': ["Lawn Mowing & Care", "Planting Trees", "Garden Design Help", "Hedge Trimming", "Backyard Cleanup"],
        'Transport & Logistics': ["Moving Furniture", "Delivery Driver Needed", "Help Loading Van", "Airport Pickup", "Package Delivery"],
        'Cleaning & Housekeeping': ["Deep Apartment Clean", "Window Washing", "Carpet Cleaning", "Office Cleaning", "Post-Renovation Clean"],
        'Events & Organization': ["Wedding Photography", "Party Planner Help", "Catering Assistant", "Event Setup Crew", "DJ for Birthday"],
        'Maintenance & Outdoor': ["Fix Broken Fence", "Gutter Cleaning", "Pressure Washing Driveway", "Paint Exterior Wall", "Roof Repair"],
        'Farming & Agriculture': ["Harvest Help Needed", "Tractor Driver", "Feeding Animals", "Vineyard Maintenance", "Farm Hand"],
        'Webdesign & Branding': ["WordPress Website Redesign", "Shopify Store Setup", "Logo Design", "Brand Identity Pack", "UI/UX for App"],
        'Social Media & Marketing': ["Instagram Content Creator", "Facebook Ads Manager", "TikTok Video Editing", "SEO Optimization", "Community Manager"]
    };

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    for (let i = 1; i <= 60; i++) {
        const category = categories[i % categories.length];
        const titleList = titlesByCategory[category] || ["General Task"];
        const title = titleList[i % titleList.length] + (Math.random() > 0.8 ? " ASAP" : "");

        const isRemote = ['Webdesign & Branding', 'Social Media & Marketing'].includes(category);
        const location = isRemote ? "Remote" : locations[Math.floor(Math.random() * locations.length)];
        const isBoosted = i <= 3;

        const monthIndex = Math.random() > 0.5 ? 10 : 11;
        const day = Math.floor(Math.random() * 30) + 1;

        const jobDateObj = new Date(2025, monthIndex, day);
        const year = jobDateObj.getFullYear();
        const m = String(jobDateObj.getMonth() + 1).padStart(2, '0');
        const d = String(jobDateObj.getDate()).padStart(2, '0');
        const jobDateStr = `${year}-${m}-${d}`;
        const formattedDateDisplay = `${months[monthIndex]} ${day}`;

        jobs.push({
            id: i.toString(),
            title: title,
            category: category,
            price: Math.floor(Math.random() * 800) + 100,
            location: location,
            timeEstimate: Math.floor(Math.random() * 8) + 1 + " Hours",
            datePosted: formattedDateDisplay,
            jobDate: jobDateStr,
            isBoosted: isBoosted,
            description: `Looking for a professional to help with ${title.toLowerCase()}. Must be reliable and experienced.`,
            requirements: ['Previous Experience', 'Reliability', 'Good Communication'],
            images: [`https://picsum.photos/seed/${i}/800/600`, `https://picsum.photos/seed/${i+500}/800/600`],
            author: {
                name: `User ${i}`,
                avatar: `https://i.pravatar.cc/150?img=${i % 70}`,
                rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1) as unknown as number,
                isVerified: Math.random() > 0.3,
                completedTasks: Math.floor(Math.random() * 50) + 1,
                bio: "I am a regular user on TaskHub looking for reliable professionals.",
                joinedDate: "2023",
                reviewsCount: Math.floor(Math.random() * 20) + 2
            }
        });
    }

    return jobs;
};

export const MOCK_TASKS = generateMockJobs();

export const UserProfileView: React.FC<UserProfileViewProps> = ({ profile, onClose, isStatic = false, onContact }) => {
    const [profileTab, setProfileTab] = useState<'about' | 'reviews' | 'history'>('about');

    return (
        <div className={`bg-white shadow-2xl h-full flex flex-col ${isStatic ? 'w-full shadow-none border border-gray-100 rounded-3xl overflow-hidden' : 'w-full md:max-w-lg overflow-y-auto animate-slideInRight'}`}>
            {!isStatic && onClose && (
                <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-white/20 hover:bg-black/10 rounded-full text-white transition"
            >
                <X size={24} />
            </button>
            )}

            {/* Profil borítókép */}
            <div className="h-40 bg-gradient-to-r from-green-800 to-green-600 relative flex-shrink-0">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
            </div>

            <div className="px-6 pb-8 relative flex-1">
            {/* Név, rating, avatar */}
            <div className="flex items-end -mt-10 mb-6 gap-4">
                    <div className="relative">
                        <img src={profile.avatar} className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover bg-white" alt={profile.name} />
                        {profile.isVerified && (
                            <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full border-2 border-white" title="Identity Verified">
                                <ShieldCheck size={16} fill="currentColor" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 pb-1">
                        <h2 className="text-xl font-bold text-gray-900 leading-tight">{profile.name}</h2>
                        <div className="flex items-center gap-1 mt-1">
                        <Star size={14} className="text-yellow-400 fill-current"/>
                        <span className="font-bold text-sm text-gray-900">{profile.rating}</span>
                        <span className="text-gray-400 text-xs">• {profile.reviewsCount} reviews</span>
                        </div>
                    </div>
            </div>

            {/* Contact / View History gombok */}
            <div className="flex gap-3 mb-8">
                <button
                    onClick={onContact}
                    className="flex-1 bg-green-700 text-white py-2.5 rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-900/10 text-sm flex items-center justify-center gap-2"
                >
                        <MessageSquare size={16} /> Contact
                </button>
                <button
                    onClick={() => setProfileTab('history')}
                    className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition text-sm flex items-center justify-center gap-2"
                >
                        <History size={16} /> View History
                </button>
            </div>

            {/* About / Reviews / History tabok */}
            <div className="flex border-b border-gray-100 mb-6">
                    <button onClick={() => setProfileTab('about')} className={`flex-1 pb-3 font-bold text-sm border-b-2 transition-colors ${profileTab === 'about' ? 'border-green-700 text-green-700' : 'border-transparent text-gray-400 hover:text-gray-700'}`}>About</button>
                    <button onClick={() => setProfileTab('reviews')} className={`flex-1 pb-3 font-bold text-sm border-b-2 transition-colors ${profileTab === 'reviews' ? 'border-green-700 text-green-700' : 'border-transparent text-gray-400 hover:text-gray-700'}`}>Reviews</button>
                    <button onClick={() => setProfileTab('history')} className={`flex-1 pb-3 font-bold text-sm border-b-2 transition-colors ${profileTab === 'history' ? 'border-green-700 text-green-700' : 'border-transparent text-gray-400 hover:text-gray-700'}`}>History</button>
            </div>

            {/* Tab tartalma */}
            <div>
                    {profileTab === 'about' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Bio</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {profile.bio}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Badges & Achievements</h3>
                                <div className="flex gap-2 flex-wrap">
                                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                                        <Award size={14} /> Top Rated
                                    </div>
                                    <div className="bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                                        <ShieldCheck size={14} /> ID Verified
                                    </div>
                                    <div className="bg-green-50 border border-green-200 text-green-800 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                                        <Activity size={14} /> Quick Responder
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {profileTab === 'reviews' && (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-2xl">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-bold text-sm text-gray-900">Happy Client {i}</span>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, idx) => <Star key={idx} size={10} fill="currentColor"/>)}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 italic">"Excellent work, very punctual and polite."</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {profileTab === 'history' && (
                        <div className="space-y-4 animate-fadeIn">
                             <div className="flex items-center gap-2 mb-4">
                                <History size={16} className="text-gray-400" />
                                <span className="text-sm font-bold text-gray-500">Completed Tasks ({profile.completedTasks})</span>
                             </div>
                             {[...Array(4)].map((_, i) => (
                                 <div key={i} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between">
                                     <div>
                                         <p className="font-bold text-gray-900 text-sm">Task Name</p>
                                         <p className="text-xs text-gray-500">2 weeks ago</p>
                                     </div>
                                     <div className="text-right">
                                         <span className="block font-bold text-green-700 text-sm">Completed</span>
                                         <div className="flex text-yellow-400 text-xs justify-end">
                                             <Star size={10} fill="currentColor"/>
                                             <Star size={10} fill="currentColor"/>
                                             <Star size={10} fill="currentColor"/>
                                             <Star size={10} fill="currentColor"/>
                                             <Star size={10} fill="currentColor"/>
                                         </div>
                                     </div>
                                 </div>
                             ))}
                        </div>
                    )}
            </div>
            </div>
        </div>
    );
};

export interface TaskDetailViewProps {
  task: Task;
  onClose: () => void;
}

export const TaskDetailView: React.FC<TaskDetailViewProps> = ({ task, onClose }) => {
  return (
    <div className="bg-white w-full md:max-w-2xl h-full shadow-2xl overflow-y-auto animate-slideInRight relative flex flex-col">
       <div className="sticky top-0 bg-white z-20 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="font-bold text-xl text-gray-900">Job Details</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
             <X size={20} />
          </button>
       </div>

       <div className="p-6 md:p-8 space-y-8 flex-1">
           {/* Címkék, cím, kategória */}
           <div>
               <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide border flex items-center gap-1 ${task.location === 'Remote' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                      {task.location === 'Remote' ? <Globe size={12}/> : <MapPin size={12}/>} {task.location}
                  </span>
                  <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide border border-gray-200 flex items-center gap-1">
                      <Clock size={12}/> {task.timeEstimate}
                  </span>
                  {/* Munka napja (részleteknél) */}
                  <span className="bg-[#dcfce7] text-green-800 border border-green-200 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide flex items-center gap-1">
                      <Calendar size={12}/> {task.datePosted}
                  </span>
               </div>
               <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">{task.title}</h1>
               <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                   <span>Posted {task.datePosted}</span>
                   <span>•</span>
                   <span>{task.category}</span>
               </div>
           </div>

           {/* Összeg + Apply Now */}
           <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center justify-between">
               <div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Budget</p>
                   <p className="text-3xl font-extrabold text-green-700">{task.price} <span className="text-lg text-gray-500">RON</span></p>
               </div>
               <button className="bg-green-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-900/10">
                   Apply Now
               </button>
           </div>

           {/* Leírás */}
           <div>
               <h3 className="font-bold text-gray-900 text-lg mb-3">Description</h3>
               <p className="text-gray-600 leading-relaxed text-base">
                   {task.description}
                   <br/><br/>
                   Looking for someone reliable who can start as soon as possible. Please provide examples of previous work if available.
               </p>
           </div>

           {/* Követelmények */}
           {task.requirements && (
               <div>
                   <h3 className="font-bold text-gray-900 text-lg mb-3">Requirements</h3>
                   <ul className="space-y-2">
                       {task.requirements.map((req, i) => (
                           <li key={i} className="flex items-start gap-3 text-gray-700">
                               <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                               <span>{req}</span>
                           </li>
                       ))}
                   </ul>
               </div>
           )}

           {/* Fotók */}
           {task.images && task.images.length > 0 && (
               <div>
                   <h3 className="font-bold text-gray-900 text-lg mb-3">Photos</h3>
                   <div className="grid grid-cols-2 gap-4">
                       {task.images.map((img, i) => (
                           <img key={i} src={img} className="rounded-xl w-full h-40 object-cover border border-gray-100" alt={`Task ${i}`} />
                       ))}
                   </div>
               </div>
           )}

           {/* Hirdető (ügyfél) infó */}
           <div className="border-t border-gray-100 pt-8">
               <h3 className="font-bold text-gray-900 text-lg mb-4">About the Client</h3>
               <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                   <img src={task.author.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" alt={task.author.name} />
                   <div className="flex-1">
                       <h4 className="font-bold text-gray-900">{task.author.name}</h4>
                       <div className="flex items-center gap-2 mt-1">
                           <div className="flex text-yellow-400">
                               <Star size={12} fill="currentColor"/>
                               <span className="text-gray-700 text-xs font-bold ml-1">{task.author.rating}</span>
                           </div>
                           <span className="text-gray-300 text-xs">•</span>
                           <span className="text-xs text-gray-500 font-medium">{task.author.reviewsCount} Reviews</span>
                       </div>
                   </div>
                   <button className="text-xs font-bold text-gray-700 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition">View Profile</button>
               </div>
           </div>
       </div>
    </div>
  );
};


interface FindTasksProps {
    onNavigate?: (view: string) => void;
    isLoggedIn?: boolean;
    onToggleMobileMenu?: () => void;
}

const FindTasks: React.FC<FindTasksProps> = ({ onNavigate, isLoggedIn, onToggleMobileMenu }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Romania');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewingProfile, setViewingProfile] = useState<Task['author'] | null>(null);
  const [locationType, setLocationType] = useState<'all' | 'remote' | 'onsite'>('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const filteredTasks = MOCK_TASKS.filter(task => {
    const matchesCategory = selectedCategory === 'All Categories' || task.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All Romania' || task.location === selectedLocation || (task.location === 'Remote' && selectedLocation === 'All Romania');

    let matchesType = true;
    if (locationType === 'remote') matchesType = task.location === 'Remote';
    if (locationType === 'onsite') matchesType = task.location !== 'Remote';

    let matchesDate = true;
    if (selectedDate && task.jobDate) {
        matchesDate = task.jobDate === selectedDate;
    }

    return matchesCategory && matchesLocation && matchesType && matchesDate;
  });

  const handleProfileClick = (e: React.MouseEvent, author: Task['author']) => {
      e.stopPropagation();
      e.preventDefault();
      setViewingProfile(author);
  }

  const handleContact = () => {
      if (onNavigate) {
          onNavigate('messages');
      }
      setViewingProfile(null);
  }

  const handleDateFilterClick = () => {
      if (dateInputRef.current) {
          dateInputRef.current.showPicker();
      }
  };

  const FiltersContent = () => (
      <div className="space-y-6">
          <div className="relative md:hidden mb-4">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input type="text" placeholder="Search Jobs" className="w-full bg-white pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-green-500 font-medium transition shadow-sm focus:ring-2 focus:ring-green-50/50" />
          </div>

          <div>
             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Location Type</label>
             <div className="flex flex-col gap-2">
                 <button
                  onClick={() => setLocationType('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold text-left transition ${locationType === 'all' ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                 >
                     All Types
                 </button>
                 <button
                  onClick={() => setLocationType('remote')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold text-left transition ${locationType === 'remote' ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                 >
                     Remote Only
                 </button>
                 <button
                  onClick={() => setLocationType('onsite')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold text-left transition ${locationType === 'onsite' ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                 >
                     On-Site Only
                 </button>
             </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Location</label>
            <div className="relative">
              <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-white border border-gray-200 text-gray-900 py-3 px-4 rounded-xl appearance-none focus:outline-none focus:border-green-500 font-bold text-sm shadow-sm cursor-pointer"
              >
                {ROMANIAN_COUNTIES.map(county => (
                    <option key={county} value={county}>{county}</option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-4 top-3.5 text-gray-900 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                 CHOOSE DATE
            </label>
            <div className="relative group cursor-pointer" onClick={handleDateFilterClick}>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-green-50 rounded-full p-1 text-green-700 pointer-events-none z-10">
                    <Calendar size={14}/>
                </div>
                <input
                    ref={dateInputRef}
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white border border-gray-200 text-gray-900 py-3 pl-12 pr-4 rounded-xl focus:outline-none focus:border-green-500 font-bold text-sm shadow-sm cursor-pointer min-h-[48px] appearance-none"
                    style={!selectedDate ? { color: 'transparent' } : {}}
                />
                {!selectedDate && (
                    <div className="absolute left-12 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 pointer-events-none">
                        Choose date
                    </div>
                )}
            </div>

            {selectedDate && (
                <button onClick={() => setSelectedDate('')} className="text-xs text-red-500 font-bold mt-2 hover:underline flex items-center gap-1">
                    <X size={12}/> Clear Date Filter
                </button>
            )}
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Category</label>
            <div className="space-y-1">
              {CATEGORIES.map(cat => (
                  <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedCategory === cat
                          ? 'bg-[#3d7a48] text-white shadow-lg shadow-green-900/10'
                          : 'text-gray-600 hover:bg-white hover:shadow-sm hover:text-gray-900'
                      }`}
                  >
                      {cat}
                  </button>
              ))}
            </div>
          </div>
      </div>
  );

  return (
    <div className="p-4 lg:p-10 max-w-7xl mx-auto relative min-h-screen">

      {viewingProfile && (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-gray-900/60" onClick={() => setViewingProfile(null)}/>
            <UserProfileView
                profile={viewingProfile}
                onClose={() => setViewingProfile(null)}
                onContact={handleContact}
            />
        </div>
      )}

      {selectedTask && (
        <div className="fixed inset-0 z-50 flex justify-end">
             <div className="absolute inset-0 bg-gray-900/60" onClick={() => setSelectedTask(null)}/>
             <TaskDetailView task={selectedTask} onClose={() => setSelectedTask(null)} />
        </div>
      )}

      {showMobileFilters && (
          <div className="fixed inset-0 z-50 flex justify-end md:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
              <div className="relative w-[300px] h-full bg-white shadow-2xl overflow-y-auto animate-slideInRight">
                  <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                          <h3 className="font-bold text-lg text-gray-900">Filters</h3>
                          <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-100 rounded-full">
                              <X size={20} />
                          </button>
                      </div>
                      <FiltersContent />
                  </div>
              </div>
          </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 gap-4 text-center md:text-left">
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
             {isLoggedIn && (
                 <button onClick={onToggleMobileMenu} className="md:hidden relative">
                     <img src="https://i.pravatar.cc/150?img=68" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" alt="Profile" />
                 </button>
             )}
              <div>
                  <h1 className="text-3xl font-bold text-gray-900">Available Jobs</h1>
                  <p className="text-gray-500 mt-1">Browse tasks and find your next paid project.</p>
              </div>
          </div>
           <span className="bg-[#dcfce7] text-green-800 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm border border-green-200 flex items-center gap-2">
             <Briefcase size={16} /> {filteredTasks.length} Jobs Found
           </span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-72 flex-shrink-0 space-y-8 hidden md:block">

          <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input type="text" placeholder="Search Jobs" className="w-full bg-white pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-green-500 font-medium transition shadow-sm focus:ring-2 focus:ring-green-50/50" />
          </div>

          <FiltersContent />
        </div>

        <div className="flex-1 space-y-6 min-w-0">
            <style>{`
                @keyframes slideInRight {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slideInRight {
                    animation: slideInRight 0.3s ease-out forwards;
                }
            `}</style>

            <div className="md:hidden mb-4">
                <button
                    onClick={() => setShowMobileFilters(true)}
                    className="w-full py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 flex items-center justify-center gap-2 shadow-sm active:bg-gray-50"
                >
                    <Filter size={16}/> Filter Jobs
                </button>
            </div>

            {filteredTasks.map((task) => (
                <div
                    key={task.id}
                    className={`bg-white rounded-[24px] p-2 transition-all hover:shadow-xl hover:-translate-y-1 duration-300 border relative overflow-hidden group ${
                        task.isBoosted
                            ? 'border-yellow-400 shadow-md shadow-yellow-100/50'
                            : 'border-gray-100 shadow-sm'
                    }`}
                >
                    <div className="flex flex-col lg:flex-row gap-0 lg:gap-6 relative z-10">

                        {/* Left Column: Job Info & Author */}
                        <div className="flex-1 p-4 md:p-6">
                            {/* Author Header */}
                            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100 border-dashed cursor-pointer" onClick={(e) => handleProfileClick(e, task.author)}>
                                <div className="relative hover:scale-105 transition-transform flex-shrink-0">
                                    <img src={task.author.avatar} className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-md" alt={task.author.name} />
                                    {task.author.isVerified && (
                                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                                            <CheckCircle size={16} className="text-green-600 fill-green-100" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="font-bold text-gray-900 truncate hover:text-green-700 transition">{task.author.name}</h4>
                                        <div className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
                                            <Star size={10} className="text-yellow-500 fill-current" />
                                            {task.author.rating}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-0.5 font-medium flex items-center gap-1 flex-wrap">
                                        {task.author.completedTasks} jobs posted <span className="text-gray-300">•</span> Joined {task.author.joinedDate}
                                    </p>
                                </div>
                                {task.isBoosted && (
                                    <span className="bg-yellow-400 text-yellow-900 text-[10px] font-extrabold px-2 md:px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm uppercase tracking-wider animate-pulse flex-shrink-0">
                                        <Zap size={12} fill="currentColor"/> BUMP
                                    </span>
                                )}
                            </div>

                            {/* Job Details */}
                            <div className="cursor-pointer" onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTask(task);
                            }}>
                                {/* Címkék: hely, idő, kategória */}
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                     <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide border flex items-center gap-1 ${task.location === 'Remote' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                        {task.location === 'Remote' ? <Globe size={10}/> : <MapPin size={10}/>} {task.location}
                                    </span>
                                    <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide border border-gray-200">
                                        {task.timeEstimate}
                                    </span>
                                    <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide border border-gray-200">
                                        {task.category}
                                    </span>
                                </div>

                                <h3 className="font-extrabold text-lg md:text-xl lg:text-2xl text-gray-900 mb-2 group-hover:text-green-700 transition-colors leading-tight">
                                    {task.title}
                                </h3>

                                {/* Date moved below title for better aesthetic with requested greenish style */}
                                <div className="mb-3">
                                     <span className="text-[10px] font-bold text-green-800 bg-[#dcfce7] border border-green-200 px-2 py-1 rounded-md inline-flex items-center gap-1 uppercase tracking-wider">
                                        <Calendar size={10} className="text-green-700"/> DATE {task.datePosted}
                                     </span>
                                </div>

                                <p className="text-gray-500 text-sm mb-0 line-clamp-2 leading-relaxed">{task.description}</p>
                            </div>
                        </div>

                        {/* Right Column: Price & Action */}
                        <div className="lg:w-48 bg-gray-50 rounded-b-[20px] lg:rounded-r-[20px] lg:rounded-bl-none p-4 md:p-6 flex lg:flex-col justify-between items-center lg:items-end border-t lg:border-t-0 lg:border-l border-gray-100">
                            <div className="text-left lg:text-right">
                                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Budget</span>
                                <span className="block text-xl md:text-2xl font-extrabold text-green-700">{task.price} <span className="text-sm text-gray-500 font-bold">RON</span></span>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTask(task);
                                }}
                                className="bg-green-700 text-white px-5 md:px-6 py-2 md:py-3 rounded-xl text-sm font-bold hover:bg-green-800 transition shadow-lg shadow-green-900/10 flex items-center justify-center gap-2 group/btn whitespace-nowrap"
                            >
                                Details <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform"/>
                            </button>
                        </div>

                    </div>
                </div>
            ))}

            {filteredTasks.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[20px] border border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <Search size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-500">Try adjusting your filters (date, category) to see results.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FindTasks;
