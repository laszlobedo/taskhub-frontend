
import React, { useEffect, useState } from 'react';
import {
  Palette, Grid, LogOut, Star, User, Lock, Send, Search, CheckCircle, Award, LayoutDashboard, Calendar, Mail, Settings, Users, Menu, PlusCircle, Edit3, Trash2, Share2, Filter, Upload, Download, AlertCircle, Info, Zap, ShieldCheck, Briefcase, Clock, MapPin, DollarSign, Globe, Phone, Camera, FileText, Layers, Move, Monitor
} from 'lucide-react';

import Landing from '../views/Landing';
import Dashboard from '../views/Dashboard';
import FindTasks from '../views/FindTasks';
import PostTask from '../views/PostTask';
import Profile from '../views/Profile';

interface DesignPreviewProps {
  onExit: () => void;
}

const SectionHeader = ({ title, subtitle, icon: Icon, badge }: { title: string, subtitle: string, icon: any, badge?: string }) => (
  <div className="flex flex-col items-start mb-12 max-w-5xl border-b border-gray-200 pb-10">
     <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-gray-900/20">
            <Icon size={28} strokeWidth={1.5}/>
        </div>
        <div>
            <div className="flex items-center gap-3 mb-1">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase">{title}</h2>
                {badge && <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-green-200">{badge}</span>}
            </div>
            <div className="h-1 w-24 bg-green-500 rounded-full mt-2"></div>
        </div>
     </div>
     <p className="text-gray-500 text-xl font-medium leading-relaxed max-w-3xl">{subtitle}</p>
  </div>
);

const ColorSwatch = ({ name, hex, usage, className, darkText = false }: { name: string, hex: string, usage: string, className: string, darkText?: boolean }) => (
  <div className="flex flex-col group cursor-pointer">
    <div className={`h-40 w-full rounded-3xl shadow-sm border border-black/5 ${className} relative overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1`}>
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className={`absolute bottom-6 left-6 right-6 flex justify-between items-end ${darkText ? 'text-gray-900' : 'text-white'}`}>
            <span className="font-mono text-sm font-bold opacity-80">{hex}</span>
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <Grid size={16} />
            </div>
        </div>
    </div>
    <div className="mt-4 px-2">
      <div className="flex justify-between items-center mb-1">
          <p className="font-bold text-gray-900 text-lg">{name}</p>
      </div>
      <p className="text-sm text-gray-500 font-medium">{usage}</p>
    </div>
  </div>
);

const Artboard = ({ title, url, children, width = "w-full", height = "h-auto", className = "", annotations = [] }: any) => (
  <div className="relative group">
      <div className={`rounded-2xl overflow-hidden border border-gray-200 shadow-2xl bg-gray-900 flex flex-col ${width} ${className} ring-1 ring-gray-900/5 mx-auto transition-transform duration-700`}>
            <div className="bg-[#1e293b] text-gray-400 text-xs px-4 py-3 flex items-center gap-4 font-sans border-b border-gray-700 sticky top-0 z-[60]">
                <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] hover:bg-[#dc2626] transition-colors"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24] hover:bg-[#d97706] transition-colors"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] hover:bg-[#16a34a] transition-colors"></span>
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="bg-gray-800/50 hover:bg-gray-800 transition-colors rounded-lg py-1 px-24 text-center text-gray-400 flex items-center gap-2 text-[10px] tracking-wide font-mono border border-gray-700/50">
                        <Lock size={10} className="text-green-500" /> https://{url}
                    </div>
                </div>
                <div className="w-10"></div>
            </div>
            <div className={`relative ${height} bg-white overflow-hidden`}>
            {children}
            </div>
      </div>
      {annotations.map((note: any, i: number) => (
          <div key={i} style={{ top: note.top }} className="absolute w-full pointer-events-none">
              <div className={`absolute top-10 ${note.position === 'right' ? '-right-64' : '-left-64'} w-56 hidden xl:block pointer-events-auto`}>
                <div className="relative bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow-sm text-sm">
                    <div className={`absolute top-4 ${note.position === 'right' ? '-left-3 border-r-yellow-200 border-r-8' : '-right-3 border-l-yellow-200 border-l-8'} border-y-transparent border-y-8 h-0 w-0`}></div>
                    <h4 className="font-bold text-yellow-900 mb-1 flex items-center gap-2"><Info size={14}/> {note.title}</h4>
                    <p className="text-yellow-800 leading-snug text-xs">{note.text}</p>
                </div>
                <div className={`absolute top-8 ${note.position === 'right' ? '-left-8' : 'left-full'} w-8 h-px bg-yellow-300 border-t border-dashed border-yellow-500`}></div>
                <div className={`absolute top-7 ${note.position === 'right' ? '-left-9' : 'left-[calc(100%+8px)]'} w-2 h-2 rounded-full bg-yellow-500`}></div>
            </div>
          </div>
      ))}
  </div>
);

const IconShowcase = ({ icon: Icon, name, size = "24px" }: { icon: any, name: string, size?: string }) => (
    <div className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition group cursor-pointer bg-white shadow-sm hover:shadow-md">
        <Icon size={24} className="text-gray-700 group-hover:text-green-700 mb-3 transition-colors" strokeWidth={1.5} />
        <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 transition-colors">{name}</span>
        <span className="text-[10px] text-gray-500 font-mono mt-1 group-hover:text-green-600 font-bold">{size}</span>
    </div>
);

const DesignPreview: React.FC<DesignPreviewProps> = ({ onExit }) => {
  const [activeSection, setActiveSection] = useState<string>('brand');

  const tocLinks = [
      { id: 'brand', label: '01. Brand' },
      { id: 'typography', label: '02. Typography' },
      { id: 'color', label: '03. Color' },
      { id: 'icons', label: '04. Iconography' },
      { id: 'labels', label: '05. Labels' },
      { id: 'components', label: '06. Components' },
      { id: 'motion', label: '07. Motion' },
      { id: 'landing', label: '08. Landing' },
      { id: 'app', label: '09. Dashboard' },
      { id: 'profile', label: '10. Profile' },
      { id: 'post', label: '11. Flows' },
  ];

  const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
          const offset = 140;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
          });
      }
  };

  useEffect(() => {
    const handleScroll = () => {
        const scrollPosition = window.scrollY + 200;

        for (const link of tocLinks) {
            const element = document.getElementById(link.id);
            if (element) {
                const { offsetTop, offsetHeight } = element;
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    setActiveSection(link.id);
                    break;
                }
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-40 relative selection:bg-green-200 selection:text-green-900">

      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '40px 40px'
      }}></div>

      <header className="bg-white/80 backdrop-blur-md text-gray-900 h-20 px-8 fixed top-0 left-0 right-0 z-[100] flex justify-between items-center shadow-sm border-b border-gray-200">
        <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg">B</div>
             <div>
                <h1 className="font-bold text-base tracking-tight text-gray-900">Boabo Webstudio <span className="text-gray-400 font-normal">/ ROW40</span></h1>
                <p className="text-[10px] text-green-600 uppercase tracking-widest font-bold flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> UX/UI BRANDING (OTILIA)</p>
             </div>
        </div>
        <div className="flex items-center gap-6">
            <button
                onClick={onExit}
                className="group bg-white hover:bg-red-50 text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
            >
                <LogOut size={14} className="group-hover:-translate-x-1 transition-transform"/> Exit Preview
            </button>
        </div>
      </header>

      <nav className="fixed top-20 left-0 right-0 h-14 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-[90] flex items-center justify-center px-8 gap-2 overflow-x-auto shadow-sm custom-scrollbar">
          {tocLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`relative whitespace-nowrap px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${
                        isActive
                        ? 'bg-gray-900 text-white shadow-md scale-105'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                    {link.label}
                </button>
                );
            })}
      </nav>

      <main className="block pt-48 px-6 lg:px-24 max-w-[1920px] mx-auto space-y-32 relative z-10">

          <section id="brand" className="scroll-mt-48">
            <SectionHeader
                title="Brand Identity"
                subtitle="The TaskHub brand is built on three pillars: Trust, Simplicity, and Local Growth. The visual language uses clean geometry (hexagons) and natural, professional greens."
                icon={Award}
                badge="Core Foundation"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center space-y-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-50/30 opacity-50 pattern-checkered pointer-events-none"></div>

                    <div className="scale-150 p-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center shadow-green-700/30 shadow-lg relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                </svg>
                            </div>
                            <span className="font-bold text-3xl tracking-tight text-gray-900">Task<span className="text-green-700">Hub</span></span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 w-full border-t border-gray-100 pt-8 mt-4">
                        <div className="text-center">
                            <span className="block font-bold text-gray-900 text-sm mb-1">Logomark</span>
                            <span className="text-xs text-gray-500 font-medium">The Hexagon</span>
                        </div>
                        <div className="text-center border-x border-gray-100">
                            <span className="block font-bold text-gray-900 text-sm mb-1">Typeface</span>
                            <span className="text-xs text-gray-500 font-medium">Inter Tight</span>
                        </div>
                        <div className="text-center">
                            <span className="block font-bold text-gray-900 text-sm mb-1">Primary Color</span>
                            <span className="text-xs text-green-700 font-bold font-mono bg-green-50 px-2 py-0.5 rounded">#15803d</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100">
                        <h3 className="font-bold text-xl text-gray-900 mb-6">Brand Mission & Values</h3>
                        <div className="space-y-6">
                            {[
                                { title: 'Trust & Verification', desc: 'Every user is verified. Safety is our #1 priority. We use blue badges to signify verified status.', icon: CheckCircle },
                                { title: 'Simplicity', desc: 'No clutter. Clear paths to "Post" or "Find" work. Minimalist interface with high contrast.', icon: Zap },
                                { title: 'Local Growth', desc: 'Empowering Romanian professionals to earn more. We use local imagery and language nuances.', icon: MapPin }
                            ].map((val, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 flex-shrink-0">
                                        <val.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg mb-1">{val.title}</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed font-medium">{val.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          </section>

          <section id="typography" className="scroll-mt-48">
            <SectionHeader
                title="Typography System"
                subtitle="We utilize the 'Inter' variable font family. It is chosen for its excellent legibility on computer screens and its modern, neutral aesthetic. We utilize a tight tracking for headings to give a punchy, modern feel."
                icon={FileText}
                badge="Inter Family"
            />

            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="col-span-4 bg-gray-50 p-12 border-r border-gray-100 flex flex-col justify-between">
                        <div>
                            <div className="text-[120px] font-black text-gray-900 leading-none mb-4 tracking-tighter">Aa</div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">Inter</h3>
                            <p className="text-gray-600 font-medium mb-8">Sans-serif / Variable / Grotesque</p>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Weights Used</span>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-700">Regular 400</span>
                                        <span className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-900">Medium 500</span>
                                        <span className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-extrabold text-gray-900">Bold 700</span>
                                        <span className="px-3 py-1 bg-black text-white border border-black rounded text-xs font-black">Black 900</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 font-medium mt-8">
                            Google Fonts License (OFL)
                        </div>
                    </div>

                    <div className="col-span-8 p-12 space-y-12">
                        {[
                            { label: 'Display XL', size: '72px', weight: 'ExtraBold', sample: 'Empowering Work.', class: 'text-7xl font-extrabold tracking-tight text-gray-900' },
                            { label: 'Heading 1', size: '48px', weight: 'Bold', sample: 'Find the perfect pro.', class: 'text-5xl font-bold tracking-tight text-gray-900' },
                            { label: 'Heading 2', size: '30px', weight: 'Bold', sample: 'Recent Activity', class: 'text-3xl font-bold text-gray-900' },
                            { label: 'Heading 3', size: '24px', weight: 'Bold', sample: 'Job Details', class: 'text-2xl font-bold text-gray-900' },
                            { label: 'Body Large', size: '18px', weight: 'Regular', sample: 'TaskHub connects clients with trusted pros.', class: 'text-lg text-gray-700' },
                            { label: 'Body Small', size: '14px', weight: 'Medium', sample: 'Verified • 2 days ago • Sector 1', class: 'text-sm font-medium text-gray-600' },
                        ].map((type, i) => (
                            <div key={i} className="flex items-baseline gap-12 group hover:bg-gray-50 p-4 rounded-xl -mx-4 transition-colors border-b border-gray-100 last:border-0 pb-8 last:pb-0">
                                <div className="w-32 flex-shrink-0">
                                    <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{type.label}</span>
                                    <span className="block text-[10px] text-gray-500 font-mono mt-1 font-bold">{type.size} / {type.weight}</span>
                                </div>
                                <div className={type.class}>
                                    {type.sample}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </section>

          <section id="color" className="scroll-mt-48">
            <SectionHeader
                title="Color Palette"
                subtitle="Our palette is derived from nature but optimized for digital screens. The primary green inspires growth and money, while the slate neutrals provide a professional, modern backdrop."
                icon={Palette}
                badge="Accessibility Compliant"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                <ColorSwatch name="Forest Green" hex="#14532d" usage="Primary Text, Headers" className="bg-green-900" />
                <ColorSwatch name="Kelly Green" hex="#15803d" usage="Primary Buttons, Accents" className="bg-green-700" />
                <ColorSwatch name="Vivid Green" hex="#22c55e" usage="Success States, Icons" className="bg-green-500" />
                <ColorSwatch name="Mint Light" hex="#dcfce7" usage="Backgrounds, Badges" className="bg-green-100" darkText />
                <ColorSwatch name="Slate Dark" hex="#0f172a" usage="Footer, Dark Mode UI" className="bg-[#0f172a]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><AlertCircle size={18}/> Semantic Colors</h4>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-red-500 shadow-sm"></div>
                            <div>
                                <p className="font-bold text-gray-900">Error Red</p>
                                <p className="text-xs text-gray-500">#ef4444 • Destructive actions</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-yellow-400 shadow-sm"></div>
                            <div>
                                <p className="font-bold text-gray-900">Warning Yellow</p>
                                <p className="text-xs text-gray-500">#facc15 • Boosts, Alerts</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-500 shadow-sm"></div>
                            <div>
                                <p className="font-bold text-gray-900">Info Blue</p>
                                <p className="text-xs text-gray-500">#3b82f6 • Verification, Links</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 col-span-2">
                    <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><Layers size={18}/> Neutral Scale</h4>
                    <div className="flex h-16 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(level => (
                            <div key={level} className={`flex-1 bg-gray-${level} hover:flex-[2] transition-all flex items-end justify-center pb-2 text-[10px] font-bold ${level > 400 ? 'text-white' : 'text-gray-900'}`}>
                                {level}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                        We use the <strong>Slate</strong> scale from Tailwind CSS. It introduces a subtle blue tint to the grays, making the interface feel cooler and more premium compared to standard neutral grays.
                        <br/><strong>Gray-50</strong> is used for page backgrounds, <strong>Gray-200</strong> for borders, and <strong>Gray-500</strong> for secondary text.
                    </p>
                </div>
            </div>
          </section>

          <section id="icons" className="scroll-mt-48">
            <SectionHeader
                title="Iconography"
                subtitle="We use the Lucide React library. Icons are rendered with a 1.5px or 2px stroke width for clarity. They are used to support navigation, actions, and status indications."
                icon={Grid}
                badge="Lucide React"
            />

            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-12">
                <div className="space-y-12">

                    <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Navigation & Menu</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                            <IconShowcase icon={LayoutDashboard} name="Dashboard" />
                            <IconShowcase icon={Search} name="Search" />
                            <IconShowcase icon={Calendar} name="Calendar" />
                            <IconShowcase icon={Mail} name="Messages" />
                            <IconShowcase icon={Settings} name="Settings" />
                            <IconShowcase icon={Users} name="Users" />
                            <IconShowcase icon={Menu} name="Menu" />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Actions & Interface</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                            <IconShowcase icon={PlusCircle} name="Add" />
                            <IconShowcase icon={Edit3} name="Edit" />
                            <IconShowcase icon={Trash2} name="Delete" />
                            <IconShowcase icon={Share2} name="Share" />
                            <IconShowcase icon={Filter} name="Filter" />
                            <IconShowcase icon={Upload} name="Upload" />
                            <IconShowcase icon={Download} name="Download" />
                            <IconShowcase icon={LogOut} name="Logout" />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Status & Indicators</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                            <IconShowcase icon={CheckCircle} name="Success" />
                            <IconShowcase icon={AlertCircle} name="Alert" />
                            <IconShowcase icon={Info} name="Info" />
                            <IconShowcase icon={Star} name="Rating" />
                            <IconShowcase icon={ShieldCheck} name="Verified" />
                            <IconShowcase icon={Zap} name="Boost" />
                            <IconShowcase icon={Award} name="Award" />
                            <IconShowcase icon={Lock} name="Secure" />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">Content Categories</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                            <IconShowcase icon={Briefcase} name="Job" />
                            <IconShowcase icon={Clock} name="Time" />
                            <IconShowcase icon={MapPin} name="Location" />
                            <IconShowcase icon={DollarSign} name="Money" />
                            <IconShowcase icon={Globe} name="Web" />
                            <IconShowcase icon={Phone} name="Phone" />
                            <IconShowcase icon={Camera} name="Photo" />
                            <IconShowcase icon={FileText} name="Doc" />
                        </div>
                    </div>

                </div>
            </div>
          </section>

          <section id="labels" className="scroll-mt-48">
            <SectionHeader
                title="Labels & Badges"
                subtitle="Badges are used to communicate status, category, or attributes of an item. They are designed to be compact and highly readable with high-contrast colors."
                icon={Award}
            />

            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    <div className="space-y-6">
                        <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Status Indicators</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-green-200">
                                    <CheckCircle size={12} fill="currentColor" className="text-green-500"/> Active
                                </span>
                                <span className="text-xs font-mono text-gray-400">bg-green-100</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-yellow-200">
                                    <Clock size={12} /> Pending
                                </span>
                                <span className="text-xs font-mono text-gray-400">bg-yellow-100</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-red-200">
                                    <AlertCircle size={12} /> Error
                                </span>
                                <span className="text-xs font-mono text-gray-400">bg-red-100</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Feature Tags</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-blue-100">
                                    <ShieldCheck size={12}/> Verified Pro
                                </span>
                                <span className="text-xs font-mono text-gray-400">bg-blue-50</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-purple-100">
                                    <Globe size={12}/> Remote
                                </span>
                                <span className="text-xs font-mono text-gray-400">bg-purple-50</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-lg text-xs font-extrabold flex items-center gap-1 uppercase tracking-wider shadow-sm">
                                    <Zap size={12} fill="currentColor"/> Boosted
                                </span>
                                <span className="text-xs font-mono text-gray-400">bg-yellow-400</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Category Pills</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Design', 'Plumbing', 'Cleaning', 'Transport', 'Legal'].map((cat, i) => (
                                <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md text-xs font-bold border border-gray-200 hover:bg-gray-200 transition cursor-default">
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Used for job categories and skill lists. Neutral colors to avoid drawing too much attention.</p>
                    </div>

                </div>
            </div>
          </section>

          <section id="components" className="scroll-mt-48">
            <SectionHeader
                title="Component Library"
                subtitle="Reusable atomic elements built for consistency and speed. Our components are designed with a mobile-first approach, ensuring large touch targets and clear hierarchy."
                icon={Grid}
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                        <h3 className="font-bold text-xl text-gray-900">Buttons</h3>
                        <span className="text-xs font-mono text-gray-400">component/Button</span>
                    </div>

                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-8 items-center">
                            <div>
                                <button className="w-full bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-900/10">Primary Action</button>
                                <span className="block text-center text-xs text-gray-400 mt-2 font-mono">Default</span>
                            </div>
                            <div>
                                <button className="w-full bg-green-700 text-white px-6 py-3 rounded-xl font-bold opacity-50 cursor-not-allowed">Disabled</button>
                                <span className="block text-center text-xs text-gray-400 mt-2 font-mono">Disabled</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 items-center">
                            <div>
                                <button className="w-full bg-white border-2 border-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition">Secondary</button>
                            </div>
                            <div>
                                <button className="w-full bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-100 transition flex items-center justify-center gap-2"><LogOut size={18}/> Destructive</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                        <h3 className="font-bold text-xl text-gray-900">Form Inputs</h3>
                        <span className="text-xs font-mono text-gray-400">component/Input</span>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Default Input</label>
                            <div className="relative">
                                <input type="text" placeholder="Enter text..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 font-medium text-gray-900 transition-colors" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Active / Focus</label>
                            <div className="relative">
                                <input type="text" value="Focused state" readOnly className="w-full bg-white border-2 border-green-500 rounded-xl px-4 py-3 font-medium text-gray-900 shadow-sm ring-4 ring-green-500/10" />
                                <CheckCircle size={18} className="absolute right-4 top-3.5 text-green-500" />
                            </div>
                        </div>
                        <div className="flex gap-4">
                             <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition flex-1">
                                 <input type="checkbox" className="w-5 h-5 text-green-600 rounded focus:ring-green-500 border-gray-300" defaultChecked />
                                 <span className="text-sm font-bold text-gray-700">Checkbox</span>
                             </label>
                             <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition flex-1">
                                 <input type="radio" className="w-5 h-5 text-green-600 focus:ring-green-500 border-gray-300" defaultChecked />
                                 <span className="text-sm font-bold text-gray-700">Radio</span>
                             </label>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm xl:col-span-2">
                    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                        <h3 className="font-bold text-xl text-gray-900">Card Architecture</h3>
                        <span className="text-xs font-mono text-gray-400">structure/Card</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50">
                            <span className="absolute top-2 left-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Padding: 24px</span>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
                                <div className="h-14 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center text-xs text-red-400 font-mono">Header (User/Title)</div>
                                <div className="h-20 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center text-xs text-blue-400 font-mono">Body (Description)</div>
                                <div className="flex gap-2">
                                    <div className="flex-1 h-8 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-center text-xs text-yellow-600 font-mono">Meta</div>
                                    <div className="flex-1 h-8 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-center text-xs text-yellow-600 font-mono">Tags</div>
                                </div>
                                <div className="h-12 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center text-xs text-green-600 font-mono">Footer (Action)</div>
                            </div>
                        </div>

                        <div>
                            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:border-green-300 transition-all duration-300 group relative">
                                <div className="absolute top-6 right-6">
                                     <span className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-500 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm uppercase tracking-wider cursor-default">
                                        <Calendar size={12} className="text-gray-400"/> Nov 24
                                     </span>
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <img src="https://i.pravatar.cc/150?img=12" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 group-hover:text-green-700 transition">Web Design Project</h4>
                                        <p className="text-xs text-gray-500">Posted by Sarah J. • 2h ago</p>
                                    </div>
                                    <span className="ml-auto bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">NEW</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">Looking for a talented UI designer to create a landing page for our new coffee shop brand.</p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="font-extrabold text-gray-900 text-lg">1,200 RON</span>
                                    <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition">Apply Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          <section id="motion" className="scroll-mt-48">
            <SectionHeader
                title="Motion System"
                subtitle="Animations are used to guide attention, not distract. We use snappy, ease-out curves (approx 300ms) for most interactions to feel responsive."
                icon={Move}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { name: 'Fade In Up', class: 'animate-fadeIn', desc: 'Used for page loads and staggered lists.' },
                    { name: 'Pulse', class: 'animate-pulse', desc: 'Used for status indicators and loading skeletons.' },
                    { name: 'Hover Lift', class: 'hover:-translate-y-2 transition-transform duration-300 shadow-lg', desc: 'Used for interactive cards.' }
                ].map((anim, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center h-64 group cursor-pointer">
                        <div className={`w-20 h-20 bg-green-100 rounded-2xl mb-6 flex items-center justify-center text-green-600 ${anim.class}`}>
                            <Zap size={32} />
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg mb-2">{anim.name}</h4>
                        <p className="text-sm text-gray-500">{anim.desc}</p>
                    </div>
                ))}
            </div>
          </section>

          <section id="landing" className="scroll-mt-48">
              <SectionHeader
                title="Page: Landing"
                subtitle="The primary conversion point. Designed to segment users immediately into 'Workers' or 'Clients' with a clear 50/50 split hero section."
                icon={Monitor}
              />
              <Artboard
                title="TaskHub - Home"
                url="taskhub.com"
                height="h-auto"
                annotations={[
                    { title: "Split Hero", text: "50/50 split allows equal weight for both user personas (Hire vs Work).", top: "20%", position: "right" },
                    { title: "Trust Signals", text: "Stats bar immediately follows the hero to build credibility.", top: "65%", position: "left" }
                ]}
              >
                  <Landing onGetStarted={() => {}} isLoggedIn={false} onLogin={() => {}} onLogout={() => {}} />
              </Artboard>
          </section>

          <section id="app" className="scroll-mt-48">
              <SectionHeader
                title="Page: Dashboard & Marketplace"
                subtitle="Complex interfaces requiring high data density while maintaining clarity. We use a card-based layout with a sidebar for filters and navigation."
                icon={LayoutDashboard}
              />

              <div className="space-y-32">
                  <Artboard
                    title="User Dashboard"
                    url="taskhub.com/dashboard"
                    height="h-auto"
                    annotations={[
                        { title: "Widget Grid", text: "Modular bento-grid layout adapts to different content types.", top: "30%", position: "right" }
                    ]}
                  >
                      <Dashboard initialTab="overview" />
                  </Artboard>

                  <Artboard
                    title="Find Jobs (Marketplace)"
                    url="taskhub.com/jobs"
                    height="h-[800px]"
                    className="overflow-y-auto custom-scrollbar"
                    annotations={[
                        { title: "Facet Filters", text: "Left sidebar allows deep filtering without hiding results.", top: "15%", position: "right" },
                        { title: "Card Density", text: "Job cards show key metadata (price, location) at a glance.", top: "40%", position: "right" }
                    ]}
                  >
                        <FindTasks />
                  </Artboard>
              </div>
          </section>

          <section id="profile" className="scroll-mt-48">
              <SectionHeader
                title="Page: User Profile"
                subtitle="Designed to build trust immediately. High-emphasis verification badges and clear call-to-actions."
                icon={User}
              />
              <Artboard
                title="User Profile View"
                url="taskhub.com/u/alexandru"
                height="h-auto"
                className="bg-gray-50"
                annotations={[
                    { title: "Trust Header", text: "Large verification badges and rating summaries appear instantly next to the name.", top: "15%", position: "right" },
                    { title: "Sticky Action", text: "The 'Hire' button is prominent and always accessible.", top: "25%", position: "left" },
                    { title: "Tabbed Content", text: "Organizes complex data (Portfolio, Reviews, Services) without cluttering the view.", top: "45%", position: "right" }
                ]}
              >
                  <Profile />
              </Artboard>
          </section>

          <section id="post" className="scroll-mt-48">
              <SectionHeader
                title="Flow: Post a Task"
                subtitle="A wizard-style interface broken into bite-sized steps to reduce drop-off rates."
                icon={PlusCircle}
              />
              <Artboard
                title="Post New Job"
                url="taskhub.com/post"
                height="h-auto"
                annotations={[
                    { title: "Progress Stepper", text: "Visual indicator keeps users motivated and aware of how much is left.", top: "10%", position: "left" },
                    { title: "Monetization", text: "Boost packages are presented as an optional upgrade at the end of the flow.", top: "70%", position: "right" }
                ]}
              >
                  <PostTask />
              </Artboard>
          </section>

      </main>

      <footer className="bg-[#111827] text-white py-24 text-center mt-32 border-t-8 border-green-600 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
           </div>

           <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center justify-center">
               <div className="w-24 h-24 bg-green-600 rounded-3xl flex items-center justify-center font-bold text-5xl text-white mb-8 shadow-2xl shadow-green-900/50">B</div>

               <h2 className="text-3xl font-bold mb-4 tracking-tight">TaskHub Design System</h2>
               <p className="text-gray-400 mb-8 max-w-lg">A comprehensive UI/UX framework designed for trust, speed, and local growth.</p>

               <div className="flex items-center gap-2 text-sm text-gray-500 font-mono border border-gray-800 px-4 py-2 rounded-full bg-black/20">
                   <span>Designed by</span>
                   <span className="text-green-400 font-bold">Boabo Webstudio</span>
               </div>
               <a href="https://www.boabowebstudio.hu" className="mt-4 text-green-400 hover:text-green-300 text-xs font-bold hover:underline transition-all opacity-50 hover:opacity-100">www.boabowebstudio.hu</a>
           </div>
      </footer>

    </div>
  );
};

export default DesignPreview;
