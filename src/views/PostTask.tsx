
import React, { useState } from 'react';
import { Check, ChevronRight, Zap, CheckCircle, ChevronDown, MapPin, DollarSign, Calendar, Star, Crown, Feather, Clock } from 'lucide-react';

const ROMANIAN_COUNTIES = [
  "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani", "Brașov", "Brăila", "București", "Buzău",
  "Caraș-Severin", "Călărași", "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu", "Gorj", "Harghita",
  "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureș", "Mehedinți", "Mureș", "Neamț", "Olt", "Prahova", "Satu Mare",
  "Sălaj", "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", "Vaslui", "Vâlcea", "Vrancea"
];

const PostTask: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedBoost, setSelectedBoost] = useState<string | null>(null);
  const [taskLocation, setTaskLocation] = useState('București');

  const steps = [
    { num: 1, label: 'Task Basics' },
    { num: 2, label: 'Details & Location' },
    { num: 3, label: 'Boost Visibility' },
  ];

  const boostPackages = [
      {
          id: '24h',
          title: 'Lite Boost',
          duration: '24 Hours',
          price: 15,
          colorClass: 'border-green-400 bg-green-50 shadow-green-100',
          activeClass: 'border-green-500 ring-1 ring-green-500',
          iconBg: 'bg-green-400 text-green-900',
          features: ['Top of Search Results', 'Standard Badge', '1x Email Alert']
      },
      {
          id: '3day',
          title: 'Power Boost',
          duration: '3 Days',
          price: 35,
          colorClass: 'border-purple-400 bg-purple-50 shadow-purple-100',
          activeClass: 'border-purple-500 ring-1 ring-purple-500',
          iconBg: 'bg-purple-400 text-purple-900',
          features: ['Top of Search Results', 'Premium Gold Badge', '3x Email Alerts', 'Homepage Feature']
      },
      {
          id: '7day',
          title: 'Ultimate Visibility',
          duration: '7 Days',
          price: 60,
          colorClass: 'border-yellow-400 bg-yellow-50 shadow-yellow-100',
          activeClass: 'border-yellow-500 ring-1 ring-yellow-500',
          iconBg: 'bg-yellow-400 text-yellow-900',
          features: ['Permanent Top Spot', 'Elite Badge', 'Daily Email Alerts', 'Homepage Feature', 'Social Media Share']
      }
  ];

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="p-4 lg:p-10 max-w-4xl mx-auto flex flex-col h-full animate-fadeIn">
      <div className="bg-white rounded-t-3xl border-b border-gray-100 px-4 md:px-10 py-8 overflow-x-auto scrollbar-hide">
        <div className="flex justify-between items-center relative max-w-2xl mx-auto min-w-[300px]">
            <div className="absolute left-0 right-0 top-1/2 h-[3px] bg-gray-100 -z-0 rounded-full"></div>
            {steps.map((s) => (
                <div key={s.num} className="relative z-10 bg-white px-2 md:px-3 cursor-pointer" onClick={() => setStep(s.num)}>
                    <div className="flex flex-col items-center gap-2">
                         <div className={`
                            w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm border-[3px] transition-all duration-300
                            ${step >= s.num ? 'bg-white border-[#3d7a48] text-[#3d7a48]' : 'bg-white border-gray-200 text-gray-300'}
                            ${step === s.num ? 'scale-110 shadow-md' : ''}
                        `}>
                            {step > s.num ? <Check size={18} strokeWidth={3} /> : s.num}
                        </div>
                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${step >= s.num ? 'text-[#3d7a48]' : 'text-gray-300'}`}>{s.label}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="bg-white rounded-b-3xl shadow-sm border border-gray-100 p-6 md:p-10 min-h-[500px] flex flex-col">
        <div className="flex-1 max-w-2xl mx-auto w-full">
            {step === 1 && (
                <div className="space-y-8 animate-fadeIn">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Task Basics</h2>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Task Title</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Help moving a sofa" 
                            className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-green-500 transition font-medium text-gray-900 text-base"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Category</label>
                        <div className="relative">
                            <select className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl px-6 py-4 appearance-none focus:outline-none focus:border-green-500 transition font-medium text-gray-900 cursor-pointer text-base">
                                <optgroup label="Home Services">
                                    <option>Cleaning & Housekeeping</option>
                                    <option>Home & Garden</option>
                                    <option>Maintenance & Outdoor</option>
                                </optgroup>
                                <optgroup label="Logistics">
                                    <option>Transport & Logistics</option>
                                    <option>Events & Organization</option>
                                </optgroup>
                                <optgroup label="Professional">
                                    <option>Webdesign & Branding</option>
                                    <option>Social Media & Marketing</option>
                                    <option>Farming & Agriculture</option>
                                </optgroup>
                            </select>
                             <ChevronDown size={20} className="absolute right-6 top-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-8 animate-fadeIn">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Details & Location</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Location</label>
                            <div className="relative">
                                <select 
                                    value={taskLocation}
                                    onChange={(e) => setTaskLocation(e.target.value)}
                                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl px-6 py-4 appearance-none focus:outline-none focus:border-green-500 transition font-medium text-gray-900 cursor-pointer text-base"
                                >
                                    <option value="Remote">Online / Remote</option>
                                    {ROMANIAN_COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <ChevronDown size={20} className="absolute right-6 top-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        {taskLocation !== 'Remote' && (
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Address / Area</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Sector 1, Victoriei"
                                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-green-500 transition font-medium text-gray-900 text-base"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Description</label>
                        <textarea 
                            rows={5}
                            placeholder="Describe your task in detail..."
                            className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-green-500 transition resize-none font-medium text-gray-900 text-base"
                        ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Budget (RON)</label>
                            <div className="relative group">
                                <input 
                                    type="number" 
                                    defaultValue={100}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 pl-12 focus:outline-none focus:border-green-500 focus:shadow-md transition font-extrabold text-xl text-green-700"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-green-50 p-1.5 rounded-lg text-green-700 pointer-events-none">
                                    <DollarSign size={16}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Duration</label>
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    placeholder="e.g. 4 Hours"
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 pl-12 focus:outline-none focus:border-green-500 font-bold text-gray-700 focus:shadow-md transition text-base"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-green-50 p-1.5 rounded-lg text-green-700 pointer-events-none">
                                    <Clock size={16}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-8 animate-fadeIn">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Boost Visibility</h2>
                    <p className="text-gray-500">Get your task seen by more professionals. Choose a BAMP package.</p>
                    
                    <div className="flex flex-col gap-4">
                        {boostPackages.map((pkg) => (
                            <div 
                                key={pkg.id}
                                onClick={() => setSelectedBoost(selectedBoost === pkg.id ? null : pkg.id)}
                                className={`
                                    cursor-pointer rounded-2xl p-6 transition-all relative overflow-hidden group border
                                    ${selectedBoost === pkg.id 
                                        ? `${pkg.activeClass} ${pkg.colorClass}` 
                                        : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
                                    }
                                `}
                            >
                                {selectedBoost === pkg.id && <div className="absolute inset-0 opacity-10 -z-10" style={{backgroundColor: 'currentColor'}}></div>}
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${selectedBoost === pkg.id ? pkg.iconBg : 'bg-gray-100 text-gray-400'}`}>
                                            {pkg.id === '7day' ? <Crown size={24} fill="currentColor"/> : 
                                             pkg.id === '3day' ? <Zap size={24} fill="currentColor"/> :
                                             <Feather size={24} strokeWidth={2.5}/>}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-base md:text-lg text-gray-900">{pkg.title}</h3>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{pkg.duration}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xl md:text-2xl font-extrabold text-gray-900 whitespace-nowrap">{pkg.price} <span className="text-xs font-bold text-gray-400">RON</span></span>
                                    </div>
                                </div>

                                <div className="mt-4 pl-0 md:pl-16 grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {pkg.features.map((feat, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                            <Check size={14} className="text-green-600 flex-shrink-0" />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>

                                {selectedBoost === pkg.id && (
                                    <div className="absolute top-4 right-4 text-green-600">
                                        <CheckCircle size={24} fill="currentColor" className="text-white"/>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#f8fafc] rounded-3xl p-6 md:p-8 space-y-4">
                        <h4 className="font-bold text-gray-900">Payment Summary</h4>
                        <div className="flex justify-between text-sm text-gray-600 font-medium">
                            <span>Standard Listing</span>
                            <span>Free</span>
                        </div>
                        {selectedBoost && (
                            <div className="flex justify-between text-sm text-gray-900 font-bold bg-gray-50 p-2 rounded-lg -mx-2">
                                <span className="flex items-center gap-2">
                                    {selectedBoost === '24h' ? <Feather size={14}/> : <Zap size={14}/>} 
                                    {boostPackages.find(p => p.id === selectedBoost)?.title}
                                </span>
                                <span>{boostPackages.find(p => p.id === selectedBoost)?.price} RON</span>
                            </div>
                        )}
                        <div className="border-t border-gray-200 pt-4 mt-2 flex justify-between font-extrabold text-2xl text-gray-900">
                            <span>Total</span>
                            <span>{selectedBoost ? boostPackages.find(p => p.id === selectedBoost)?.price : '0'} RON</span>
                        </div>
                    </div>
                </div>
            )}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 flex justify-between items-center max-w-2xl mx-auto w-full">
            <button 
                onClick={prevStep}
                className={`text-gray-500 font-bold text-sm hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50 transition ${step === 1 ? 'invisible' : ''}`}
            >
                Back
            </button>

            <button 
                onClick={step === 3 ? () => alert('Job Posted!') : nextStep}
                className="bg-[#3d7a48] text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold shadow-lg shadow-green-900/20 hover:bg-[#346a3e] transition flex items-center gap-2 transform active:scale-95 duration-200 text-sm md:text-base whitespace-nowrap"
            >
                {step === 3 ? 'Post Task Now' : 'Next Step'}
                {step === 3 ? <CheckCircle size={20}/> : null}
            </button>
        </div>
      </div>
    </div>
  );
};

export default PostTask;
