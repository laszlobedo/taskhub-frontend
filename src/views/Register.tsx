
import React, { useState } from 'react';
import { Briefcase, Search, ArrowRight, CheckCircle, ChevronLeft, Upload, FileText, UserCheck, Shield } from 'lucide-react';
import { ViewState } from '../types';

interface RegisterProps {
  onRegisterComplete: () => void;
  onCancel: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterComplete, onCancel }) => {
  const [step, setStep] = useState<number>(0); // 0: típus, 1: alapadatok, 2: igazolvány, 3: CV (opcionális)
  const [userType, setUserType] = useState<'client' | 'worker'>('client');
  const [loading, setLoading] = useState(false);

  const handleTypeSelect = (type: 'client' | 'worker') => {
    setUserType(type);
    setStep(1);
  };

  const nextStep = () => {
      if (step === 3) {
          setLoading(true);
          setTimeout(() => {
             setLoading(false);
             onRegisterComplete();
          }, 1500);
      } else {
          setStep(prev => prev + 1);
      }
  };

  const skipStep = () => {
      // „Kihagyom”: következő lépés validáció/feltöltés nélkül
      if (step === 3) {
          onRegisterComplete();
      } else {
          setStep(prev => prev + 1);
      }
  };

  const prevStep = () => {
      setStep(prev => Math.max(0, prev - 1));
  };

  const renderStepContent = () => {
      switch(step) {
          case 0: // Ügyfél vagy munkavállaló
            return (
                <div className="animate-fadeIn">
                       <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-4">Join TaskHub</h1>
                       <p className="text-gray-500 text-center mb-12 text-lg">How do you want to use the platform?</p>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div
                                onClick={() => handleTypeSelect('client')}
                                className="bg-white border-2 border-gray-100 p-8 rounded-3xl cursor-pointer hover:border-green-600 hover:shadow-xl hover:-translate-y-1 transition-all group"
                           >
                                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                                    <Search size={32} className="text-green-700 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">I want to hire</h3>
                                <p className="text-gray-500">Find trusted professionals for your projects, home repairs, and tasks.</p>
                           </div>

                           <div
                                onClick={() => handleTypeSelect('worker')}
                                className="bg-white border-2 border-gray-100 p-8 rounded-3xl cursor-pointer hover:border-green-600 hover:shadow-xl hover:-translate-y-1 transition-all group"
                           >
                                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                                    <Briefcase size={32} className="text-green-700 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">I want to work</h3>
                                <p className="text-gray-500">Earn money by completing tasks. Set your own schedule and rates.</p>
                           </div>
                       </div>
                   </div>
            );

          case 1: // Név, email, jelszó
            return (
                <div className="animate-fadeIn max-w-md mx-auto w-full">
                    <div className="mb-6">
                        <span className="text-green-700 font-bold text-xs uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full mb-4 inline-block">
                            Step 1 of 3
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900">Account Details</h2>
                        <p className="text-gray-500 mt-2">Let's start with the basics.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">First Name</label>
                                <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Last Name</label>
                                <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
                            <input required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Phone Number</label>
                            <input required type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Password</label>
                            <input required type="password" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500" />
                        </div>
                         <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Confirm Password</label>
                            <input required type="password" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500" />
                        </div>
                    </div>
                </div>
            );

          case 2: // Igazolvány feltöltés
            return (
                <div className="animate-fadeIn max-w-md mx-auto w-full">
                     <div className="mb-6">
                        <span className="text-green-700 font-bold text-xs uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full mb-4 inline-block">
                            Step 2 of 3
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900">Verify Identity</h2>
                        <p className="text-gray-500 mt-2">We require ID verification to ensure safety for all users.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-500 hover:bg-green-50/50 transition cursor-pointer">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserCheck size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900">Upload Government ID</h3>
                            <p className="text-sm text-gray-500 mt-2">Passport, Driver's License, or National ID</p>
                            <button className="mt-4 text-sm font-bold text-green-700">Browse Files</button>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-blue-800 text-sm">
                            <Shield className="flex-shrink-0" size={20} />
                            <p>Your data is encrypted and securely stored. We only use this for identity verification purposes.</p>
                        </div>
                    </div>
                </div>
            );

        case 3: // CV feltöltés (opcionális), majd kész
             return (
                <div className="animate-fadeIn max-w-md mx-auto w-full">
                     <div className="mb-6">
                        <span className="text-green-700 font-bold text-xs uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full mb-4 inline-block">
                            Step 3 of 3
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900">Finish Profile</h2>
                        <p className="text-gray-500 mt-2">Upload your CV to stand out (Optional).</p>
                    </div>

                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-500 hover:bg-green-50/50 transition cursor-pointer">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900">Upload CV / Resume</h3>
                            <p className="text-sm text-gray-500 mt-2">PDF, DOCX up to 5MB</p>
                            <button className="mt-4 text-sm font-bold text-green-700">Browse Files</button>
                        </div>
                    </div>
                </div>
            );

          default:
            return null;
      }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
       <nav className="p-6 border-b border-gray-100 flex items-center justify-between">
           <div className="flex items-center gap-2 cursor-pointer" onClick={onCancel}>
                <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <span className="font-bold text-xl text-gray-900 tracking-tight">Task<span className="text-green-700">Hub</span></span>
            </div>
            <div className="text-sm font-medium text-gray-500">
                <span className="hidden md:inline">Already have an account? </span>
                <span className="text-green-700 font-bold cursor-pointer" onClick={onCancel}>Log In</span>
            </div>
       </nav>

       <div className="flex-1 flex items-center justify-center p-4">
           <div className="max-w-4xl w-full">
               {renderStepContent()}

               {step > 0 && (
                   <div className="max-w-md mx-auto mt-8 flex justify-between items-center pt-6 border-t border-gray-100">
                        <button
                            onClick={prevStep}
                            className="text-gray-500 font-bold text-sm hover:text-gray-900 px-4 py-2"
                        >
                            Back
                        </button>

                        <div className="flex items-center gap-3">
                            {/* 2. és 3. lépésnél: Kihagyom */}
                            {(step === 2 || step === 3) && (
                                <button
                                    onClick={skipStep}
                                    className="text-gray-400 font-bold text-sm hover:text-gray-600 px-4 py-2"
                                >
                                    Skip for now
                                </button>
                            )}

                            <button
                                onClick={nextStep}
                                disabled={loading}
                                className="bg-green-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 transition shadow-lg shadow-green-900/20 flex items-center gap-2"
                            >
                                {loading ? 'Creating Account...' : (step === 3 ? 'Create Account' : 'Next Step')}
                                {!loading && step < 3 && <ArrowRight size={18} />}
                            </button>
                        </div>
                   </div>
               )}
           </div>
       </div>
    </div>
  );
};

export default Register;
