
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Star, Wallet, ArrowUpRight, Download, CreditCard, Shield, Lock, FileText, Award, Gift, Zap, Settings, User, Bell, ChevronRight, LogOut, LayoutDashboard, Share2, Copy, Users, Eye, EyeOff, Smartphone, Mail, Globe, Trash2, Upload, History, Check, AlertTriangle, MapPin, Camera, Save, Briefcase, Calendar, MessageSquare, Send, ChevronLeft, CalendarDays, Medal, Trophy, ThumbsUp, Heart, Target, Flame, Lightbulb, Rocket, Crown, Smile, Plus, X, ShieldCheck, DownloadCloud, Facebook, Twitter, Link, Instagram, Phone, Archive } from 'lucide-react';

interface DashboardProps {
    initialTab?: 'overview' | 'wallet' | 'milestones' | 'referrals' | 'settings' | 'calendar' | 'messages';
    initialSettingsTab?: 'account' | 'security' | 'notifications' | 'cv' | 'privacy';
}

const Dashboard: React.FC<DashboardProps> = ({ initialTab = 'overview', initialSettingsTab = 'account' }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'wallet' | 'milestones' | 'referrals' | 'settings' | 'calendar' | 'messages'>(initialTab);
  const [settingsSubTab, setSettingsSubTab] = useState<'account' | 'security' | 'notifications' | 'cv' | 'privacy'>('account');
  const [messagesTab, setMessagesTab] = useState<'inbox' | 'archived'>('inbox');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 29));
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{ day: number; list: any[] } | null>(null);
  const [mobileSelectedChat, setMobileSelectedChat] = useState<number | null>(null);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
      setActiveTab(initialTab);
      if (initialTab === 'settings' && initialSettingsTab) {
          setSettingsSubTab(initialSettingsTab);
      }
  }, [initialTab, initialSettingsTab]);

  const handleDashboardTabChange = (tab: DashboardProps['initialTab']) => {
    const tabPathMap: Record<NonNullable<DashboardProps['initialTab']>, string> = {
      overview: '/dashboard/overview',
      wallet: '/dashboard/wallet',
      milestones: '/dashboard/milestones',
      referrals: '/dashboard/referrals',
      settings: '/dashboard/settings',
      calendar: '/dashboard/calendar',
      messages: '/dashboard/messages',
    };

    setActiveTab(tab);
    navigate(tabPathMap[tab]);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateEvents = (year: number, month: number) => {
      const isPast = year < 2025 || (year === 2025 && month < 10);
      const days = getDaysInMonth(new Date(year, month, 1));
      const events = [];
      
      const count = isPast ? 8 : 4;
      for(let i=0; i<count; i++) {
          const day = Math.floor(Math.random() * days) + 1;
          const types = ['Plumbing', 'Moving', 'Assembly', 'Repair', 'Cleaning'];
          const type = types[Math.floor(Math.random() * types.length)];
          events.push({
              id: i,
              day,
              title: `${type} Job`,
              type: isPast ? 'completed' : (Math.random() > 0.5 ? 'upcoming' : 'urgent'),
              time: '14:00',
              description: 'Client needs help with ' + type.toLowerCase() + '.',
              location: 'Sector 3, București',
              price: '150 RON'
          });
      }
      if (month === 10 && year === 2025) {
          events.push({
              id: 99, day: 29, title: 'Meeting with Client', type: 'urgent', time: '10:00 AM', description: 'Discuss project details.', location: 'Online', price: '-'
          });
      }
      return events;
  };

  const events = generateEvents(currentDate.getFullYear(), currentDate.getMonth());
  const transactions = [
      { id: 'TXN-8492', date: 'Nov 28, 2025', desc: 'Payout to Visa ...4242', amount: '-450.00 RON', status: 'completed' },
      { id: 'TXN-8491', date: 'Nov 25, 2025', desc: 'Furniture Assembly', amount: '+150.00 RON', status: 'completed' },
      { id: 'TXN-8490', date: 'Nov 22, 2025', desc: 'Moving Help', amount: '+200.00 RON', status: 'completed' },
      { id: 'TXN-8489', date: 'Nov 20, 2025', desc: 'Payout to Bank ...8812', amount: '-800.00 RON', status: 'completed' },
      { id: 'TXN-8488', date: 'Nov 18, 2025', desc: 'Plumbing Repair', amount: '+350.00 RON', status: 'completed' },
      { id: 'TXN-8487', date: 'Nov 15, 2025', desc: 'Cleaning Service', amount: '+120.00 RON', status: 'completed' },
      { id: 'TXN-8486', date: 'Nov 12, 2025', desc: 'Referral Bonus', amount: '+50.00 RON', status: 'completed' },
      { id: 'TXN-8485', date: 'Nov 10, 2025', desc: 'Payout to Visa ...4242', amount: '-200.00 RON', status: 'completed' },
      { id: 'TXN-8484', date: 'Nov 05, 2025', desc: 'Garden Maintenance', amount: '+180.00 RON', status: 'completed' },
      { id: 'TXN-8483', date: 'Nov 01, 2025', desc: 'TV Mounting', amount: '+100.00 RON', status: 'completed' },
  ];

  const inboxMessages = [
      { id: 1, name: "Elena G.", time: "12:30 PM", msg: "Are you available tomorrow?", online: true },
      { id: 2, name: "Andrei M.", time: "Yesterday", msg: "Thanks for the great work!", online: false },
      { id: 3, name: "Maria S.", time: "2 Days ago", msg: "Can we reschedule?", online: true },
      { id: 4, name: "Ionut P.", time: "Nov 25", msg: "Details for the plumbing job.", online: false },
      { id: 5, name: "Cristina D.", time: "Nov 20", msg: "Is the price negotiable?", online: false },
  ];

  const archivedMessages = [
      { id: 101, name: "Support", time: "Oct 15", msg: "Ticket #28392 resolved.", online: false },
      { id: 102, name: "George B.", time: "Oct 10", msg: "Job completed successfully.", online: false },
      { id: 103, name: "Ana K.", time: "Sep 28", msg: "Thank you!", online: false },
      { id: 104, name: "Vlad T.", time: "Sep 15", msg: "Address confirmed.", online: false },
      { id: 105, name: "System", time: "Aug 01", msg: "Welcome to RomaniaWorkflow!", online: false },
  ];

  const milestones = [
    { id: '1', title: 'First Task', description: 'Complete your first task', icon: Trophy, isUnlocked: true, progress: 100, total: 100 },
    { id: '2', title: 'Power User', description: 'Complete 50 tasks', icon: Zap, isUnlocked: false, progress: 24, total: 50 },
    { id: '3', title: 'Top Rated', description: 'Maintain 5.0 rating for a month', icon: Star, isUnlocked: true, progress: 100, total: 100 },
    { id: '4', title: 'Fast Responder', description: 'Reply within 10 mins', icon: Clock, isUnlocked: true, progress: 100, total: 100 },
    { id: '5', title: 'Verified ID', description: 'Verify your identity', icon: ShieldCheck, isUnlocked: true, progress: 100, total: 100 },
    { id: '6', title: 'Early Bird', description: 'Complete 5 morning tasks', icon: Clock, isUnlocked: false, progress: 3, total: 5 },
  ];

  const renderSettingsSectionContent = (sectionId: string) => {
      switch(sectionId) {
          case 'account':
              return (
                  <div className="space-y-6 animate-fadeIn">
                       <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
                           <div className="hidden md:flex items-center justify-between mb-6">
                               <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <User className="text-green-700" size={24}/> Personal Information
                               </h3>
                               <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-800 transition shadow-lg shadow-green-900/10">
                                   <Save size={16}/> Save Changes
                               </button>
                           </div>

                           <div className="flex items-center gap-6 mb-8 border-b border-gray-100 pb-8">
                               <div className="relative group cursor-pointer">
                                   <img src="https://i.pravatar.cc/150?img=68" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
                                   <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                       <Camera className="text-white" size={24} />
                                   </div>
                               </div>
                               <div>
                                   <h4 className="font-bold text-gray-900">Profile Picture</h4>
                                   <p className="text-sm text-gray-500 mb-2">PNG, JPG up to 5MB</p>
                                   <button className="text-xs font-bold text-green-700 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-50 transition">Upload New</button>
                               </div>
                           </div>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                               <div>
                                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">First Name</label>
                                   <input type="text" defaultValue="Alexandru" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 font-medium text-gray-900" />
                               </div>
                               <div>
                                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Last Name</label>
                                   <input type="text" defaultValue="Popescu" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 font-medium text-gray-900" />
                               </div>
                               <div>
                                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
                                   <input type="email" defaultValue="alex.popescu@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 font-medium text-gray-900" />
                               </div>
                               <div>
                                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Phone Number</label>
                                   <input type="tel" defaultValue="+40 712 345 678" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 font-medium text-gray-900" />
                               </div>
                           </div>

                            {/* Mobil: Mentés gomb */}
                           <div className="md:hidden pt-4">
                                <button className="w-full flex items-center justify-center gap-2 bg-green-700 text-white px-4 py-3 rounded-xl font-bold hover:bg-green-800 transition shadow-lg">
                                   <Save size={18}/> Save Changes
                               </button>
                           </div>
                       </div>
                  </div>
              );
          case 'security':
              return (
                <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-8 animate-fadeIn">
                     <h3 className="hidden md:flex text-xl font-bold text-gray-900 mb-6 items-center gap-2">
                        <Lock className="text-green-700" size={24}/> Security Settings
                     </h3>
                     
                     <div className="space-y-4">
                         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                             <div>
                                 <h4 className="font-bold text-gray-900">Two-Factor Authentication</h4>
                                 <p className="text-sm text-gray-500">Secure your account with 2FA.</p>
                             </div>
                             <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                 <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-green-600 checked:bg-green-600"/>
                                 <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                             </div>
                         </div>
                         <button className="text-green-700 font-bold text-sm hover:underline">Change Password</button>
                     </div>
                </div>
              );
          case 'notifications':
              return (
                  <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm animate-fadeIn">
                      <h3 className="hidden md:flex text-xl font-bold text-gray-900 mb-6 items-center gap-2">
                        <Bell className="text-green-700" size={24}/> Notification Preferences
                     </h3>
                     
                     <div className="space-y-8">
                         <div>
                            <h4 className="font-bold text-gray-800 mb-3 text-lg border-b border-gray-100 pb-2">Email Notifications</h4>
                            <div className="space-y-3">
                                {['Job Alerts', 'Messages', 'Account Updates', 'Promotions & News'].map(item => (
                                    <div key={item} className="flex items-center justify-between">
                                        <span className="font-medium text-gray-600">{item}</span>
                                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                            <input type="checkbox" defaultChecked name={`email-${item}`} id={`email-${item}`} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-green-600 checked:bg-green-600"/>
                                            <label htmlFor={`email-${item}`} className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>

                         <div>
                            <h4 className="font-bold text-gray-800 mb-3 text-lg border-b border-gray-100 pb-2">Push Notifications</h4>
                            <div className="space-y-3">
                                {['New Messages', 'Task Status Changes', 'Reminders'].map(item => (
                                    <div key={item} className="flex items-center justify-between">
                                        <span className="font-medium text-gray-600">{item}</span>
                                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                            <input type="checkbox" defaultChecked={item !== 'Reminders'} name={`push-${item}`} id={`push-${item}`} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-green-600 checked:bg-green-600"/>
                                            <label htmlFor={`push-${item}`} className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>
                     </div>
                  </div>
              );
          case 'cv':
               return (
                  <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm animate-fadeIn">
                       <h3 className="hidden md:flex text-xl font-bold text-gray-900 mb-6 items-center gap-2">
                        <FileText className="text-green-700" size={24}/> CV & Documents
                       </h3>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                           <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-green-50/50 hover:border-green-300 transition cursor-pointer group">
                               <div className="w-12 h-12 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition">
                                   <Upload size={24} />
                               </div>
                               <h4 className="font-bold text-gray-900">Upload Resume</h4>
                               <p className="text-sm text-gray-500 mb-4">PDF, DOCX up to 5MB</p>
                               <button className="text-xs font-bold text-green-700 border border-green-200 px-3 py-1.5 rounded-lg bg-white">Browse</button>
                           </div>

                           <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-blue-50/50 hover:border-blue-300 transition cursor-pointer group">
                               <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition">
                                   <ShieldCheck size={24} />
                               </div>
                               <h4 className="font-bold text-gray-900">Upload ID / Certs</h4>
                               <p className="text-sm text-gray-500 mb-4">JPG, PNG up to 10MB</p>
                               <button className="text-xs font-bold text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg bg-white">Browse</button>
                           </div>
                       </div>

                       <h4 className="font-bold text-gray-900 mb-4">My Documents</h4>
                       <div className="space-y-3">
                           <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                               <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                                       <FileText size={20} />
                                   </div>
                                   <div>
                                       <p className="font-bold text-gray-900 text-sm">Alexandru_Resume_2025.pdf</p>
                                       <p className="text-xs text-gray-500">Uploaded on Nov 10, 2025</p>
                                   </div>
                               </div>
                               <div className="flex gap-2">
                                   <button className="p-2 text-gray-400 hover:text-green-700 hover:bg-white rounded-lg transition"><Download size={18}/></button>
                                   <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded-lg transition"><Trash2 size={18}/></button>
                               </div>
                           </div>
                       </div>
                  </div>
               );
          case 'privacy':
              return (
                  <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm animate-fadeIn">
                       <h3 className="hidden md:flex text-xl font-bold text-gray-900 mb-6 items-center gap-2">
                        <Shield className="text-green-700" size={24}/> Privacy & Data
                       </h3>

                       <div className="space-y-8">
                           <div>
                               <h4 className="font-bold text-gray-800 mb-4 text-lg">Profile Visibility</h4>
                               <div className="space-y-4">
                                   <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                                       <div>
                                           <p className="font-bold text-gray-900 text-sm">Public Profile</p>
                                           <p className="text-xs text-gray-500">Allow others to see your profile details.</p>
                                       </div>
                                       <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                            <input type="checkbox" defaultChecked name="public-profile" id="public-profile" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-green-600 checked:bg-green-600"/>
                                            <label htmlFor="public-profile" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                        </div>
                                   </div>
                               </div>
                           </div>

                           <div>
                               <h4 className="font-bold text-gray-800 mb-4 text-lg">Data Management</h4>
                               <div className="space-y-3">
                                   <button className="w-full flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition text-left">
                                       <span className="font-medium text-gray-700">Download My Data</span>
                                       <DownloadCloud size={18} className="text-gray-400"/>
                                   </button>
                                   <button className="w-full flex items-center justify-between p-4 border border-red-100 bg-red-50 rounded-xl hover:bg-red-100 transition text-left">
                                       <span className="font-bold text-red-700">Delete Account</span>
                                       <Trash2 size={18} className="text-red-500"/>
                                   </button>
                               </div>
                           </div>
                       </div>
                  </div>
              );
           default: return null;
      }
  }

  const renderContent = () => {
    switch(activeTab) {
        case 'wallet':
            return (
                <div className="space-y-8 animate-fadeIn">
                     <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900">Wallet & Payments</h2>
                        <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-800 transition">
                            <ArrowUpRight size={16} /> Request Payout
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-8 opacity-10"><Wallet size={128}/></div>
                             <p className="text-gray-400 font-bold uppercase tracking-wider text-sm mb-1">Total Balance</p>
                             <h3 className="text-5xl font-extrabold mb-8">4,500 <span className="text-2xl text-gray-400">RON</span></h3>
                             <div className="flex gap-4">
                                 <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                     <p className="text-xs text-gray-400 font-bold uppercase">Pending</p>
                                     <p className="font-bold">250 RON</p>
                                 </div>
                                 <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                     <p className="text-xs text-gray-400 font-bold uppercase">Available</p>
                                     <p className="font-bold">4,250 RON</p>
                                 </div>
                             </div>
                        </div>

                        <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="font-bold text-gray-900">Payment Methods</h4>
                                <button className="text-green-700 text-sm font-bold hover:underline">+ Add New</button>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition cursor-pointer">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <CreditCard size={20} className="text-gray-600"/>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900 text-sm">Visa ending in 4242</p>
                                        <p className="text-xs text-gray-500">Expires 12/25</p>
                                    </div>
                                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Default</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><History size={20} className="text-green-700"/> Transaction History</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Description</th>
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {transactions.map((txn, i) => (
                                        <tr key={i} className="group hover:bg-gray-50 transition">
                                            <td className="py-4">
                                                {txn.status === 'completed' ? (
                                                    <span className="flex items-center gap-2 text-green-700 font-bold text-xs bg-green-50 w-fit px-2 py-1 rounded-full"><CheckCircle size={12}/> Paid</span>
                                                ) : (
                                                    <span className="flex items-center gap-2 text-gray-500 font-bold text-xs bg-gray-100 w-fit px-2 py-1 rounded-full"><Clock size={12}/> Pending</span>
                                                )}
                                            </td>
                                            <td className="py-4 font-bold text-gray-900">{txn.desc}</td>
                                            <td className="py-4 text-gray-500">{txn.date}</td>
                                            <td className="py-4 text-gray-400 font-mono text-xs">{txn.id}</td>
                                            <td className={`py-4 font-bold text-right ${txn.amount.startsWith('-') ? 'text-gray-900' : 'text-green-700'}`}>{txn.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );

        case 'calendar':
            const daysInMonth = getDaysInMonth(currentDate);
            const firstDay = getFirstDayOfMonth(currentDate);
            
            return (
                <div className="flex flex-col gap-6 animate-fadeIn h-full relative">
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                         <div>
                             <h2 className="text-3xl font-extrabold text-gray-900 mb-1">My Schedule</h2>
                             <p className="text-gray-500 text-sm">Manage your upcoming tasks and appointments.</p>
                         </div>
                         <div className="flex gap-3 items-center">
                             <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex p-1 items-center">
                                 <button onClick={prevMonth} className="p-2 hover:bg-gray-50 rounded-lg text-gray-500"><ChevronLeft size={20}/></button>
                                 <div className="px-4 py-2 font-bold text-gray-900 min-w-[140px] text-center">
                                     {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                                 </div>
                                 <button onClick={nextMonth} className="p-2 hover:bg-gray-50 rounded-lg text-gray-500"><ChevronRight size={20}/></button>
                             </div>
                             <button onClick={() => setIsAddEventOpen(true)} className="bg-green-700 text-white px-4 py-2 rounded-xl font-bold shadow-lg shadow-green-900/10 hover:bg-green-800 transition flex items-center gap-2 whitespace-nowrap">
                                 <Plus size={18}/> Add New
                             </button>
                         </div>
                     </div>

                     <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden flex-col flex-1 min-h-[600px]">
                         <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
                             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                 <div key={day} className="py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                                     {day}
                                 </div>
                             ))}
                         </div>
                         
                         <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-white">
                             {Array.from({ length: 42 }).map((_, i) => {
                                 const dayNum = i - firstDay + 1;
                                 const isCurrentMonth = dayNum > 0 && dayNum <= daysInMonth;
                                 const isToday = isCurrentMonth && dayNum === 29 && currentDate.getMonth() === 10 && currentDate.getFullYear() === 2025;
                                 const dayEvents = isCurrentMonth ? events.filter(e => e.day === dayNum) : [];
                                 const isSelected = selectedEvent?.day === dayNum;

                                 return (
                                     <div 
                                        key={i} 
                                        onClick={() => {
                                            if(isCurrentMonth) setSelectedEvent(dayEvents.length > 0 ? {day: dayNum, list: dayEvents} : null);
                                        }}
                                        className={`
                                            min-h-[80px] md:min-h-[120px] border-b border-r border-gray-50 p-2 relative group transition-colors cursor-pointer
                                            ${!isCurrentMonth ? 'bg-gray-50/30 text-gray-300 pointer-events-none' : 'bg-white hover:bg-gray-50/50'}
                                            ${isSelected ? 'bg-green-50 ring-2 ring-inset ring-green-100' : ''}
                                        `}
                                     >
                                         {isCurrentMonth && (
                                             <>
                                                 <div className="flex justify-between items-start mb-1">
                                                     <span className={`text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full ${isToday ? 'bg-green-700 text-white shadow-md' : 'text-gray-700'}`}>
                                                         {dayNum}
                                                     </span>
                                                     <span className="hidden md:inline text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md">{dayEvents.length > 0 ? dayEvents.length : ''}</span>
                                                 </div>
                                                 
                                                 <div className="hidden md:flex flex-col gap-1.5 overflow-y-auto max-h-[100px] custom-scrollbar">
                                                     {dayEvents.map((ev, idx) => (
                                                         <div 
                                                            key={idx} 
                                                            className={`
                                                                text-[10px] font-bold px-2 py-1.5 rounded-lg border shadow-sm select-none
                                                                ${ev.type === 'completed' ? 'bg-gray-100 text-gray-500 border-gray-200 line-through decoration-gray-400 opacity-60' : 
                                                                  ev.type === 'urgent' ? 'bg-red-50 text-red-700 border-red-100' :
                                                                  'bg-[#dcfce7] text-[#14532d] border-green-200'}
                                                            `}
                                                         >
                                                             <div className="truncate">{ev.time} - {ev.title}</div>
                                                         </div>
                                                     ))}
                                                 </div>

                                                 <div className="md:hidden flex gap-1 justify-center mt-2 flex-wrap">
                                                     {dayEvents.map((ev, idx) => (
                                                         <div key={idx} className={`w-1.5 h-1.5 rounded-full ${ev.type === 'urgent' ? 'bg-red-500' : ev.type === 'completed' ? 'bg-gray-300' : 'bg-green-500'}`}></div>
                                                     ))}
                                                 </div>
                                             </>
                                         )}
                                     </div>
                                 );
                             })}
                         </div>
                     </div>

                     {selectedEvent && (
                         <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 z-50 animate-slideInRight max-h-[50vh] overflow-y-auto">
                             <div className="flex justify-between items-center mb-6">
                                 <div>
                                     <h3 className="font-bold text-xl text-gray-900">{months[currentDate.getMonth()]} {selectedEvent.day}</h3>
                                     <p className="text-gray-500 text-sm">{selectedEvent.list.length} Events</p>
                                 </div>
                                 <button onClick={() => setSelectedEvent(null)} className="p-2 bg-gray-100 rounded-full"><X size={20}/></button>
                             </div>
                             <div className="space-y-3">
                                 {selectedEvent.list.map((ev: any, i: number) => (
                                     <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                         <div className="flex justify-between items-start mb-2">
                                             <h4 className="font-bold text-gray-900">{ev.title}</h4>
                                             <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${ev.type === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{ev.type}</span>
                                         </div>
                                         <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                                             <span className="flex items-center gap-1"><Clock size={14}/> {ev.time}</span>
                                             <span className="flex items-center gap-1"><MapPin size={14}/> {ev.location}</span>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                     )}
                </div>
            );

        case 'messages':
            return (
                <div className="animate-fadeIn h-full flex flex-col relative">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">2 Unread</span>
                    </div>
                    
                    {/* Mobil: teljes képernyős csevegés */}
                    {mobileSelectedChat !== null && (
                        <div className="fixed inset-0 z-50 bg-white flex flex-col md:hidden animate-slideInRight">
                            <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setMobileSelectedChat(null)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-full">
                                        <ChevronLeft size={24} />
                                    </button>
                                    <img src={`https://picsum.photos/seed/msg${mobileSelectedChat}/128/128`} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{inboxMessages.find(m => m.id === mobileSelectedChat)?.name || 'User'}</h4>
                                        <span className="text-xs text-green-600 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
                                <div className="flex justify-center"><span className="text-[10px] font-bold text-gray-300 uppercase">Today</span></div>
                                <div className="flex gap-3">
                                    <img src={`https://picsum.photos/seed/msg${mobileSelectedChat}/128/128`} className="w-8 h-8 rounded-full self-end" />
                                    <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-sm text-gray-700 max-w-[85%]">
                                        Hi! I saw your profile. Are you available for a moving job tomorrow at 10 AM?
                                    </div>
                                </div>
                                <div className="flex gap-3 flex-row-reverse">
                                    <div className="bg-green-700 text-white p-3 rounded-2xl rounded-br-none shadow-md text-sm max-w-[85%]">
                                        Hello! Yes, I am available. Where is the location?
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-4 bg-white border-t border-gray-100">
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Type a message..." className="flex-1 bg-gray-50 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500" />
                                    <button className="bg-green-700 text-white p-3 rounded-xl hover:bg-green-800 transition"><Send size={20} /></button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row bg-white rounded-3xl border border-gray-100 shadow-sm flex-1 overflow-hidden min-h-[600px]">
                        <div className="w-full md:w-80 border-r border-gray-100 flex flex-col">
                            <div className="p-4 pb-0 flex gap-1">
                                <button 
                                    onClick={() => setMessagesTab('inbox')}
                                    className={`flex-1 text-sm font-bold py-2 rounded-lg transition-colors ${messagesTab === 'inbox' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-50'}`}
                                >
                                    Inbox
                                </button>
                                <button 
                                    onClick={() => setMessagesTab('archived')}
                                    className={`flex-1 text-sm font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${messagesTab === 'archived' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-50'}`}
                                >
                                    <Archive size={14}/> Archived
                                </button>
                            </div>
                            
                            <div className="p-4 border-b border-gray-50 hidden md:block">
                                <div className="relative">
                                    <input type="text" placeholder="Search..." className="w-full bg-gray-50 border border-transparent rounded-xl py-2 px-4 text-sm font-medium focus:outline-none focus:border-green-200"/>
                                </div>
                            </div>
                            <div className="overflow-y-auto flex-1">
                                {messagesTab === 'inbox' ? (
                                    <>
                                        {inboxMessages.map((msg, i) => (
                                            <div 
                                                key={msg.id} 
                                                onClick={() => setMobileSelectedChat(msg.id)}
                                                className={`p-4 border-l-4 cursor-pointer transition ${i === 0 ? 'bg-green-50/50 border-green-700 md:bg-gray-50' : 'hover:bg-gray-50 border-transparent'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <img src={`https://picsum.photos/seed/msg${msg.id}/128/128`} className="w-10 h-10 rounded-full object-cover" />
                                                        {msg.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-baseline">
                                                            <h4 className="font-bold text-gray-900 text-sm truncate">{msg.name}</h4>
                                                            <span className="text-[10px] text-gray-400 font-bold">{msg.time}</span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 truncate mt-0.5">{msg.msg}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {archivedMessages.map((msg, i) => (
                                            <div key={msg.id} className="p-4 hover:bg-gray-50 border-l-4 border-transparent cursor-pointer transition opacity-70">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <img src={`https://picsum.photos/seed/arch${msg.id}/128/128`} className="w-10 h-10 rounded-full object-cover grayscale" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-baseline">
                                                            <h4 className="font-bold text-gray-900 text-sm truncate">{msg.name}</h4>
                                                            <span className="text-[10px] text-gray-400 font-bold">{msg.time}</span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 truncate mt-0.5">{msg.msg}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="hidden md:flex flex-1 flex-col bg-gray-50/50">
                            <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src="https://picsum.photos/seed/msg1/128/128" className="w-8 h-8 rounded-full" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Elena G.</h4>
                                        <span className="text-xs text-green-600 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                                <div className="flex justify-center"><span className="text-[10px] font-bold text-gray-300 uppercase">Today</span></div>
                                <div className="flex gap-3">
                                    <img src="https://picsum.photos/seed/msg1/128/128" className="w-8 h-8 rounded-full self-end" />
                                    <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-sm text-gray-700 max-w-xs">
                                        Hi! I saw your profile. Are you available for a moving job tomorrow at 10 AM?
                                    </div>
                                </div>
                                <div className="flex gap-3 flex-row-reverse">
                                    <div className="bg-green-700 text-white p-3 rounded-2xl rounded-br-none shadow-md text-sm max-w-xs">
                                        Hello Elena! Yes, I am available. Where is the location?
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-white border-t border-gray-100">
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Type a message..." className="flex-1 bg-gray-50 border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-500" />
                                    <button className="bg-green-700 text-white p-2 rounded-xl hover:bg-green-800 transition"><Send size={20} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        case 'referrals':
            return (
                <div className="animate-fadeIn space-y-8">
                    {/* Referral: nagy stat blokk (Invite Friends…) */}
                    <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-[32px] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                        
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <span className="bg-green-800 text-green-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-green-700 mb-6 inline-block">Referral Program</span>
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Invite Friends, <br/><span className="text-green-300">Earn Unlimited Cash</span></h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">1</div>
                                    <h4 className="font-bold text-sm">Send Invite</h4>
                                    <p className="text-xs text-green-200 mt-1">Share your unique link.</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">2</div>
                                    <h4 className="font-bold text-sm">Friend Joins</h4>
                                    <p className="text-xs text-green-200 mt-1">They get 20 RON off.</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">3</div>
                                    <h4 className="font-bold text-sm">You Earn</h4>
                                    <p className="text-xs text-green-200 mt-1">Get 50 RON instantly.</p>
                                </div>
                            </div>
                            
                            <div className="bg-white p-2 rounded-2xl flex flex-col md:flex-row items-center gap-2 max-w-lg mx-auto shadow-lg">
                                <div className="flex-1 px-4 py-2 w-full text-center md:text-left truncate font-mono font-bold text-gray-800 text-lg">
                                    romaniaworkflow.com/r/ALEX50
                                </div>
                                <button className="bg-green-700 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-green-800 transition flex items-center justify-center gap-2 w-full md:w-auto">
                                    <Copy size={16} /> Copy Link
                                </button>
                            </div>
                            
                            <div className="flex justify-center gap-4 mt-8">
                                <button className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:scale-110 transition"><Facebook size={20}/></button>
                                <button className="w-10 h-10 bg-[#E1306C] rounded-full flex items-center justify-center text-white hover:scale-110 transition"><Instagram size={20}/></button>
                                <button className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:scale-110 transition"><Phone size={20}/></button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Stats</h3>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <p className="text-gray-400 font-bold text-xs uppercase mb-2">Total Earned</p>
                                    <p className="text-3xl font-extrabold text-green-700">300 RON</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <p className="text-gray-400 font-bold text-xs uppercase mb-2">Friends Joined</p>
                                    <p className="text-3xl font-extrabold text-gray-900">12</p>
                                </div>
                             </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Referral History</h3>
                            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                                {[
                                    { name: "Mihai Popa", date: "Nov 28, 2025", status: "Completed", amount: "+50 RON" },
                                    { name: "Elena Stan", date: "Nov 25, 2025", status: "Pending", amount: "---" },
                                    { name: "Radu Ionescu", date: "Nov 20, 2025", status: "Completed", amount: "+50 RON" },
                                ].map((ref, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-xs">{ref.name[0]}</div>
                                            <div>
                                                <p className="font-bold text-sm text-gray-900">{ref.name}</p>
                                                <p className="text-xs text-gray-500">{ref.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ref.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{ref.status}</span>
                                            <p className="text-sm font-bold text-gray-900 mt-1">{ref.amount}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );

        case 'milestones':
            return (
                <div className="animate-fadeIn space-y-8">
                     <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900">Rewards & Badges</h2>
                        <div className="bg-yellow-50 text-yellow-800 px-4 py-2 rounded-xl font-bold text-sm border border-yellow-200 flex items-center gap-2">
                            <Trophy size={16}/> Level 5 Tasker
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {milestones.map((milestone) => (
                            <div key={milestone.id} className={`bg-white p-6 rounded-3xl border shadow-sm transition-all hover:-translate-y-1 ${milestone.isUnlocked ? 'border-green-200' : 'border-gray-100 opacity-75'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${milestone.isUnlocked ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                        <milestone.icon size={24} />
                                    </div>
                                    {milestone.isUnlocked && <CheckCircle className="text-green-500" size={20} />}
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 mb-1">{milestone.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{milestone.description}</p>
                                
                                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                                    <div className="bg-green-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${(milestone.progress / milestone.total) * 100}%` }}></div>
                                </div>
                                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
                                    <span>{milestone.progress}/{milestone.total}</span>
                                    <span>{milestone.progress === milestone.total ? 'Completed' : 'In Progress'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'settings':
            const settingTabs = [
                 { id: 'account', label: 'Account Info', icon: User },
                 { id: 'security', label: 'Security', icon: Lock },
                 { id: 'notifications', label: 'Notifications', icon: Bell },
                 { id: 'cv', label: 'CV & Documents', icon: FileText },
                 { id: 'privacy', label: 'Privacy', icon: Shield },
            ];
            
            return (
                <div className="flex flex-col md:flex-row gap-8 h-full animate-fadeIn">
                     <div className="hidden md:block w-64 space-y-1 flex-shrink-0">
                         {settingTabs.map(tab => (
                             <button
                                key={tab.id}
                                onClick={() => setSettingsSubTab(tab.id as any)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${settingsSubTab === tab.id ? 'bg-white text-green-700 shadow-sm border border-gray-100' : 'text-gray-500 hover:bg-white/50'}`}
                             >
                                 <tab.icon size={18} /> {tab.label}
                             </button>
                         ))}
                     </div>

                     <div className="flex-1 min-w-0">
                         {/* Mobil: beállítások egymás alatt */}
                         <div className="md:hidden space-y-8">
                             {settingTabs.map(tab => (
                                 <div key={tab.id} className="scroll-mt-20">
                                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">{tab.label}</h3>
                                      {renderSettingsSectionContent(tab.id)}
                                 </div>
                             ))}
                         </div>

                         {/* Asztal: egy kiválasztott szekció tartalma */}
                         <div className="hidden md:block">
                             {renderSettingsSectionContent(settingsSubTab)}
                         </div>
                     </div>
                </div>
            );

        default:
             // Alapértelmezett: Áttekintés
             return (
                 <div className="space-y-6 md:space-y-8 animate-fadeIn">
                    {/* Üdvözlő sáv: „Welcome back” + rating, job success */}
                    <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6 w-full relative">
                            <div className="relative flex-shrink-0">
                                {/* Mobilra nagyobb avatar */}
                                <img src="https://i.pravatar.cc/150?img=68" className="w-[72px] h-[72px] md:w-20 md:h-20 rounded-full object-cover border-4 border-gray-50" />
                                {/* Verified pajacs jobb alul */}
                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                    <ShieldCheck size={20} className="text-blue-500 fill-blue-50"/>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 flex flex-wrap items-center gap-2">
                                    Welcome back, Alexandru!
                                </h2>
                                <p className="text-gray-500 font-medium text-sm md:text-base">Verified Professional • Top Rated</p>
                            </div>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                             <div className="text-center md:text-right px-4 md:px-6 md:border-r border-gray-100">
                                 <span className="block text-2xl font-bold text-gray-900">4.8</span>
                                 <span className="text-xs text-gray-500 font-bold uppercase">Rating</span>
                             </div>
                             <div className="text-center md:text-right px-4 md:px-6">
                                 <span className="block text-2xl font-bold text-gray-900 whitespace-nowrap">98%</span>
                                 <span className="text-xs text-gray-500 font-bold uppercase whitespace-nowrap">Job Success</span>
                             </div>
                        </div>
                    </div>

                    {/* Stat kártyák: bevétel, munkák, profilnézetek */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {/* Bevétel: mobilnál teljes szélesség */}
                        <div className="bg-[#3d7a48] text-white rounded-2xl p-6 relative overflow-hidden shadow-lg shadow-green-900/10 col-span-2 md:col-span-2">
                            <div className="absolute top-4 right-4 opacity-20"><Wallet size={48} /></div>
                            <div className="flex items-start justify-between">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-6 backdrop-blur-sm">
                                    <span className="font-serif text-lg">$</span>
                                </div>
                                <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded backdrop-blur-sm">THIS MONTH</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold mb-1">4,500 RON</h3>
                            <p className="text-green-100 text-sm font-medium opacity-80">Total Earnings</p>
                        </div>

                        {/* Munkák és profilnézetek mobilnál egymás mellett */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-center">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                                <Briefcase size={24}/>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">24</h3>
                            <p className="text-gray-500 text-sm font-medium">Jobs Completed</p>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-center">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                                <Eye size={24} />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">142</h3>
                            <p className="text-gray-500 text-sm font-medium">Profile Views</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Teendők (pl. profil kiegészítés, olvasatlan üzenetek) */}
                         <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
                             <h3 className="text-xl font-bold text-gray-900 mb-6">Action Items</h3>
                             <div className="space-y-4">
                                 <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-green-100 bg-green-50/50 rounded-xl gap-4">
                                     <div className="flex items-center gap-4">
                                         <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
                                             <CheckCircle size={20} />
                                         </div>
                                         <div>
                                             <h4 className="font-bold text-gray-900 text-sm">Complete your profile</h4>
                                             <p className="text-xs text-gray-500">Add a portfolio item to reach 100% completion.</p>
                                         </div>
                                     </div>
                                     <button className="text-xs font-bold text-green-700 bg-white px-3 py-2 rounded-lg border border-green-200 hover:bg-green-50 transition w-full md:w-auto">Complete Now</button>
                                 </div>
                                 <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition gap-4">
                                     <div className="flex items-center gap-4">
                                         <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                                             <Mail size={20} />
                                         </div>
                                         <div>
                                             <h4 className="font-bold text-gray-900 text-sm">2 Unread Messages</h4>
                                             <p className="text-xs text-gray-500">You have messages from pending jobs.</p>
                                         </div>
                                     </div>
                                     <button className="text-xs font-bold text-gray-700 border border-gray-200 px-3 py-2 rounded-lg hover:bg-white transition w-full md:w-auto">View</button>
                                 </div>
                             </div>
                         </div>

                         {/* Legutóbbi tevékenységek */}
                         <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
                             <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                             <div className="space-y-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition flex-shrink-0">
                                                <CheckCircle size={18} />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-gray-900 text-sm truncate">Furniture Assembly</h4>
                                                <p className="text-xs text-gray-400 font-medium">2 days ago</p>
                                            </div>
                                        </div>
                                        {/* Összeg jobbra igazítva */}
                                        <div className="flex items-center">
                                            <span className="font-bold text-green-700 text-sm whitespace-nowrap">+150 RON</span>
                                        </div>
                                    </div>
                                ))}
                             </div>
                             <button className="w-full mt-6 py-2 text-sm font-bold text-gray-500 hover:text-green-700 transition border-t border-gray-100">View All History</button>
                         </div>
                    </div>
                 </div>
             );
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#f8fafc] overflow-hidden">
       {/* Oldalsáv (asztal) / felső sáv rejtve mobilnál */}
       {/* Mobilnál rejtve (lg:flex), csak asztalon látszik */}
       <div className="hidden lg:flex lg:w-64 bg-white border-r border-gray-100 flex-col flex-shrink-0 z-20">
           <div className="p-6 pb-2 hidden lg:block">
               <h1 className="text-xl font-extrabold text-gray-900">My Hub</h1>
           </div>
           
           {/* Görgethető tab lista (Overview, Calendar, …) */}
           <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible px-4 lg:px-6 py-4 gap-2 scrollbar-hide border-b lg:border-b-0 border-gray-100 bg-white">
               {[
                   { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                   { id: 'calendar', label: 'My Calendar', icon: Calendar },
                   { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '2' },
                   { id: 'wallet', label: 'Wallet', icon: Wallet },
                   { id: 'milestones', label: 'Rewards', icon: Award },
                   { id: 'referrals', label: 'Invite', icon: Users },
                   { id: 'settings', label: 'Settings', icon: Settings },
               ].map((item) => (
                   <button 
                    key={item.id}
                    onClick={() => handleDashboardTabChange(item.id as DashboardProps['initialTab'])}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all relative whitespace-nowrap flex-shrink-0 ${
                        activeTab === item.id 
                        ? 'bg-green-50 text-green-700' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                   >
                       <item.icon size={20} />
                       {item.label}
                       {item.badge && <span className="ml-auto lg:absolute lg:right-2 lg:top-3 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider">{item.badge}</span>}
                   </button>
               ))}
           </div>
       </div>

       {/* Fő tartalom (wallet, naptár, üzenetek, stb.) */}
       <div className="flex-1 overflow-y-auto p-4 md:p-10 relative">
           {renderContent()}
       </div>
    </div>
  );
};

export default Dashboard;
